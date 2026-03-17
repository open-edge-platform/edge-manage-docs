============================
App Orchestration Services
============================

This document provides guidance on troubleshooting issues related to app orchestration services,
focusing on application deployment, workload management, VM operations, app service proxy, and other related functionalities.

Prerequisites
=============

.. note::
    Before commencing troubleshooting, it is recommended
    to be familiar with the following documents:

    - :doc:`../app_orch/arch/technology_stack` used for App Orchestration services.
    - :doc:`../app_orch/arch/deployment` of the App Orchestration services.
    - :doc:`../app_orch/arch/key_components` of the App Orchestration services in a k8s cluster.
    - :doc:`../app_orch/arch/data_model`  for top-level objects managed by App Orchestration services for orchestrating applications.

.. note::
   This guide is intended for experienced SRE / DevOps engineers who have been granted permissions/roles to access the console and further intervention is
   needed to troubleshoot the issue after using logs gathered from observability. See: :doc:`capture_logs`
   The following commands are executed against an Edge Orchestrator's Kubernetes\* Cluster. To troubleshoot, access to the KUBECONFIG is required. Similar logs information can be obtained
   from the observability-admin UI. See: :doc:`../../../user_guide/monitor_deployments/grafana_content`.

.. note::
   This troubleshooting guide assumes that the user has followed all the steps in the :doc:`../../user_guide/package_software/index`
   to package and deploy an application to the edge node cluster. If the application is not installed successfully or is not running as expected,
   and the :doc:`../../user_guide/troubleshooting/deploy_issue` document was not sufficient to debug the issue, the user can use this guide to troubleshoot further.

Troubleshooting Deployment States
==================================

This section provides guidance on resolving issues related to `Deployment` states in the App Deployment Manager (ADM).
Below are common `Deployment` states and their potential causes, along with steps to debug and resolve them.

Deployment is stuck in Deploying or Updating state
--------------------------------------------------
It is not always possible for ADM to distinguish between a `Deployment` experiencing an Error condition and one that is slowly making progress.
If a `Deployment` has been in the Deploying or Updating state for a long time, refer to the section :ref:`Deployment-Error-State`. Some of the common causes for a deployment
to be stuck in the Deploying or Updating state include:

- Can the Docker images be downloaded on a target Cluster?
- Do the Pods successfully start on a target Cluster?

To troubleshoot:

- One possible action is to check the status of the Pods in the affected cluster using the UI or by
  downloading the kubeconfig of the affected cluster and using the `kubectl` command to check the status of the Pods.

.. note::
  You can use this guideline :doc:`../../user_guide/set_up_edge_infra/clusters/accessing_clusters` to download the kubeconfig of a target edge cluster.


Deployment is in No Target Clusters state
-----------------------------------------
When a deployment is in the `No Target Clusters` state, it means that its bundle has not been mapped to any clusters.

To troubleshoot:

- Verify that the deployment target labels are correct and that they match the targeted cluster labels.
- If the metadata is incorrect, recreate the deployment with the correct metadata.

Deployment is in Down state
---------------------------
When a deployment is in the `Down` state, this means that at least one of its application Pods is no longer running for some reason. For example:

- The Pod may have crashed and is in the process of restarting.
- A node has been restarted, and some Pods are not able to come up.

To troubleshoot:

- Use the UI to identify which cluster is experiencing the issue.
- Check the status of the Pods in the affected cluster.
- Investigate the logs of the affected Pods or describe them using `kubectl` to identify the root cause.

Deployment is in Unknown state
------------------------------
When a deployment is in the Unknown state, this means that the Fleet Agent on at least one of its clusters has not reported in for a configurable
period (default is 32 minutes, controlled by the `fleet.agentCheckIn` value). Possible causes include:

- The cluster may be offline.
- The Fleet Agent may have crashed and is not able to restart.

To troubleshoot:

- Use the UI to identify which cluster is experiencing the issue.
- Check the status of the Fleet Agent on the affected cluster using the following command:


.. code:: shell

  $ kubectl get pods -n cattle-fleet-system

- Investigate the logs of the Fleet Agent for errors.


.. _Deployment-Error-State:

Deployment is in Error or InternalError state
---------------------------------------------
When a deployment is in the `Error` state, the troubleshooting process involves determining which step of the deployment process
has failed and then rectifying the underlying issue. Below is a summary of the deployment process and steps to debug:

Deployment Process and Troubleshooting Checklist
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When a user clicks "Deploy" in the UI, the following steps occur:

1. ADM fetches the Deployment Package from the Catalog.
2. ADM generates Fleet configuration files representing the desired state of the deployment and uploads them to a Git repository.

  - If this is a new deployment, a unique repository is created.
  - For existing deployments, the existing repository is updated.

3. Fleet downloads the deployment configuration files from Git and fetches the Helm charts specified by the configuration.
4. Fleet combines each Helm chart with user-specified profile and override values to render it into a Bundle.

  - Bundles are mapped to edge clusters based on user input.

5. The Fleet Agent on each edge cluster downloads the matching Bundles and deploys them on the cluster.
6. Kubernetes resources specified in the Bundle are created on the edge cluster.
7. Relevant Docker images are downloaded, and Pods are launched on the cluster.
8. Once all Kubernetes resources are created and Pods are Ready, the applications are considered up and running.

If issues arise during deployment, use the following checklist to troubleshoot:

- **Is the Git repository created/updated with Fleet configs?**

  - Verify access to the Git server and ensure credentials are correct.
  - Check network connectivity to the Git server.

- **Can the Git repository be accessed by Fleet?**

  - Ensure the Git server is reachable and credentials are valid.

- **Can the Helm charts be downloaded by Fleet?**

  - Verify the chart repository URL, name, and version in the Catalog.
  - Check credentials for accessing the Helm repository, if required.

- **Can each Helm chart be rendered to a Bundle?**

  - Ensure the provided profile values are compatible with the Helm chart.
  - Debug rendering issues using tools like `helm template`.

- **Can the Bundle be installed on a Cluster?**

  - Check for resource conflicts (e.g., duplicate Kubernetes resources).
  - Resolve conflicts by adjusting profile values or resource names.

- **Can the Docker images be downloaded on a Cluster?**

  - Verify edge cluster connectivity to the Docker image registry.
  - Ensure the image name, version, and credentials are correct.

- **Do the Pods successfully start on a Cluster?**

  - Investigate reasons why Pods may not start (e.g., security policies, resource limits).
  - Debug application-specific issues preventing Pods from starting.


Checking List of App Services
=============================

To check the list of app services in the orchestration Kubernetes (K8s) environment, you can use the following `kubectl` command:

.. code:: shell

  $ kubectl get pods -n orch-app

For example, the output might look like this:

.. code:: shell

  $ kubectl get pods -n orch-app
  NAME                                             READY   STATUS    RESTARTS   AGE
  app-deployment-api-74f8b9f687-b6w5n              4/4     Running   0          48m
  app-deployment-manager-6c5d999699-z6dvp          2/2     Running   0          48m
  app-orch-catalog-776f84b67b-npqsb                4/4     Running   0          50m
  app-orch-tenant-controller-7cf9f5bc76-vnsdh      2/2     Running   0          51m
  app-resource-manager-574849769-4d4t5             4/4     Running   0          48m
  app-service-proxy-67d84fc6c-pvwcg                3/3     Running   0          48m
  vnc-proxy-app-resource-manager-b957b4d8d-9d7v4   3/3     Running   0          48m

Checking Logs for App Orchestration Services
============================================

When troubleshooting issues with app orchestration services, it is important to check the logs for the relevant services.
Each service captures errors and warnings in the logs, which can help identify the root cause of the issue.
It is recommended to filter logs based on error or warning messages to quickly identify potential issues. Below is a guide on when to check the logs for each service.

App Deployment Manager (ADM)
-----------------------------

If the user cannot deploy an application, check the logs for the App Deployment Manager.
The App Deployment Manager deploys two deployments: `app-deployment-api` and `app-deployment-manager`. The `app-deployment-api` is
the API service for the App Deployment Manager, and `app-deployment-manager` is the controller that manages the deployment of applications.

To check the logs for the `app-deployment-api`, use the following command:

.. code:: shell

  $ kubectl logs -n orch-app deployments/app-deployment-api app-deployment-api

To check the logs for the `app-deployment-manager`, use the following command:

.. code:: shell

  $ kubectl logs -n orch-app deployments/app-deployment-manager app-deployment-manager


Check `app-deployment-api` logs when the you observe one of the following issues:
    - UI is not showing the list of deployments or deployment instances per cluster.
    - A deployment secret is not created or found successfully.
    - Any Git / Helm related issues.
    - Deployment Package is not found or unable to access it.

Check `app-deployment-manager` logs when the user observes one of the following issues:
    - A deployment package is not deployed successfully (i.e., if deployment status is not "Running").
    - Any Fleet / Bundle related issues.
    - The deployment status is not as expected (e.g., "Deploying", "Updating", "Error", "InternalError", etc.).


App Resource Manager
--------------------
Check `app-resource-manager` logs using the following command for potential issues:

.. code:: shell

  $ kubectl logs -n orch-app deployments/app-resource-manager app-resource-manager

Check `app-resource-manager` logs when the user observes one of the following issues:
  - If the application is deployed but the user cannot see the list of VMs, pods, or service endpoints from the UI.
  - If the user cannot perform operations on the VMs (e.g., start/stop/restart VM) or delete the pod.

Check `vnc-proxy-app-resource-manager` logs using the following command for potential issues:

.. code:: shell

  $ kubectl logs -n orch-app deployments/vnc-proxy-app-resource-manager vncproxy

Check `vnc-proxy-app-resource-manager` logs when the user observes one of the following issues:
    - If the user cannot access the VNC console of the VM from the UI.

Application Orchestrator Catalog
--------------------------------
Check `app-orch-catalog` logs using the following command for potential issues:

.. code:: shell

  $ kubectl logs -n orch-app deployments/app-orch-catalog app-orch-catalog-server

Check `app-orch-catalog` logs when the user observes one of the following issues:
    - If the user cannot see the list of applications, extensions,  deployment packages, or registries in the UI.
    - If the user cannot add a new application, registry, or deployment package to the catalog.

App Service Proxy
-------------------
Check `app-service-proxy` logs using the following command for potential issues:

.. code:: shell

     $ kubectl logs -n orch-app deployments/app-service-proxy app-service-proxy

Check `app-service-proxy` logs when the application service link does not work.


App Deployment Manager Custom Resources
=========================================

App Deployment Manager k8s CRs are used to manage the deployment of applications. Here are some of the ADM CRDs and their purposes:

* **Deployment**: Represents a deployment of a deployment package. It contains information about the list of applications, target clusters, and the status of the deployment
* **DeploymentCluster**: Represents a deployment of a deployment package to a specific cluster.
  It contains information about the status of the deployment and the list of application instances in the cluster.
* **Cluster**: Represents an edge cluster that will be used by ADM to deploy applications.
  This resource is created by ADM for App deployment purposes when the cluster is provisioned by cluster orchestration.

Here examples of using `kubectl` commands to check the status of the CRs with a output similar to the following:

.. code:: shell

  $ kubectl get deployments.app.edge-orchestrator.intel.com -A
    NAMESPACE                              NAME               DISPLAY NAME                 PKG NAME          VERSION   PROFILE      STATE              STATUS (T/R/D/U)              MESSAGE
    a62749b3-b1f1-46f7-a959-e54613a626da   deployment-b64d7   base-extensions-privileged   base-extensions   0.7.7     privileged   NoTargetClusters   Clusters: 0/0/0/0, Apps: 12
    a62749b3-b1f1-46f7-a959-e54613a626da   deployment-ddhbp   base-extensions-baseline     base-extensions   0.7.7     baseline     Deploying          Clusters: 1/0/1/0, Apps: 12
    a62749b3-b1f1-46f7-a959-e54613a626da   deployment-jv9bq   base-extensions-restricted   base-extensions   0.7.7     restricted   NoTargetClusters   Clusters: 0/0/0/0, Apps: 12


.. code:: shell

  $ kubectl get deploymentclusters.app.edge-orchestrator.intel.com -A
   NAMESPACE                                                         NAME                                      STATE     APPS-READY   MESSAGE
   cluster-778de82b-482e-40a9-b700-a0bcb73bca54-demo-cluster-2a9e6   dc-19e58901-3ea6-5fbd-b749-b770ea44cf49   Running   1/1

.. code:: shell

  $ kubectl get clusters.app.edge-orchestrator.intel.com -A
   NAMESPACE                              NAME           DISPLAY NAME   STATE     STATUS                          MESSAGE
   778de82b-482e-40a9-b700-a0bcb73bca54   demo-cluster   demo-cluster   Running   Running:KubeconfigReady(True)   Complete
   fleet-local                            local                         Running   Running:KubeconfigReady(True)   Complete

.. note:: you can use `kubectl describe` to get more details about each CR.


