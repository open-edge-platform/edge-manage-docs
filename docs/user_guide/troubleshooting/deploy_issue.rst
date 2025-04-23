Deployment Issues
=======================

This section covers troubleshooting issues while deploying Edge Orchestrator.


* :ref:`failure_appinstall`
* :ref:`deploystatus_unknown`
* :ref:`o11y_grafana_mimir_querying_issue`
* :ref:`deploymentpage_errors`

.. _failure_appinstall:

Failure of application installation
-----------------------------------------

**Symptom:** Failure of application installation. For example, the application
status does not transition to running within the Deployments menu.

.. note::
   This assumes the application has been properly tested and verified to be
   running in a lab environment.


**Solution:**

1. If the application does not launch successfully, look for error messages
   within the Deployments menu.
#. Verify Application, Deployment Package, and Deployment configurations.
#. If the deployment status remains as `No target_clusters`.
   a. Verify that the deployment metadata labels match the targeted cluster(s)
   labels.
   #. If the issue persists, contact Intel support for assistance.
#. If error message says "Internal error: 100.", then it could be either
   because of missing configuration in the deployment or because of hitting the
   limit of unique deployments. The maximum number of unique, i.e. different in
   applications chosen, deployments is limited to 1000 per orchestrator
   instance. Refer to the `Limitations` section in release notes
   :doc:`/release_notes/rel_notes_3.0`.
   If the number of unique deployments is lower
   than 300 there is no limit on the total amount of deployment replicas.
   Contact Intel engineering or support for assistance.
#. If error messages or configuration verification do not help, it is possible
   that there are broken Kubernetes\* cluster extensions. In this case, there
   is no end-user process for this condition. Contact Intel engineering or
   support for assistance.

.. _deploystatus_unknown:

The deployment status remains as *Unknown* within the Deployments menu
-----------------------------------------------------------------------

**Symptom:** The deployment status remains as `Unknown` within the Deployments
menu.

**Solution:** The cluster has a configurable periodic status check (default is
every 15 minutes). If the cluster is not reachable in that period, the
deployment status will become `Unknown`.

Check the cluster network connection and confirm that it can reach the
|software_prod_name|. Reference the
:doc:`/user_guide/set_up_edge_infra/clusters_main` page for more information.
If the issue persists, contact Intel support for assistance.

.. toctree::
   :hidden:

   o11y_grafana_mimir


.. _deploymentpage_errors:

Deployments page shows continous errors after deleting a cluster
----------------------------------------------------------------

**Symptom:** deployments page shows continous errors after deleting a cluster even through
there are other instantiations of the application/extension successfully running on other clusters.

.. figure:: images/deployment_error.png
      :alt: Deployments Errors

**Solution:**
   If you see a deployment error in the UI, it may be due to a bundle
   deployment that is still present in the management cluster, even though the
   fleet cluster has been deleted. Follow the commands here to do a cleanup


1. Here's a command that does the following:

   - Lists only `bundledeployments` where
     `status.conditions[].reason == "Error"`
   - Prints:
     - `bundle-deployment-namespace`
     - `project-id`
     - `fleet-cluster`

   .. code-block:: bash

      echo "bundle-deployment-namespace, project-id, fleet-cluster" && \
      kubectl get bundledeployments --all-namespaces -o json | \
      jq -r '
      .items[] |
      select(
         .status.conditions != null and
         (.status.conditions[]?.reason == "Error")
      ) |
      "\(.metadata.namespace)," +
      (.metadata.labels["app.edge-orchestrator.intel.com/project-id"] // "Not Found") + "," +
      (.metadata.labels["fleet.cattle.io/cluster"] // "Not Found")
      ' | sort | uniq


   **Sample output when such bundle deployments exist:**

   .. code-block:: text

      bundle-deployment-namespace, project-id, fleet-cluster
      cluster-bff2b105-16d5-44e7-a1d1-d7eca454af5e-emt-privileg-3b325,\
      bff2b105-16d5-44e7-a1d1-d7eca454af5e,emt-privileged

   **Sample output when no such bundle deployments exist:**

   .. code-block:: text

      bundle-deployment-namespace, project-id, fleet-cluster

2. You can cross-verify via the UI or by checking the project to confirm if the
   cluster exists. If the cluster does **not** exist, you may proceed to delete
   the `bundle-deployment` namespace.

3. Delete the `bundle-deployment` namespace to clean up bundles. For the above
   example:

   .. code-block:: bash

      kubectl delete ns \
      cluster-bff2b105-16d5-44e7-a1d1-d7eca454af5e-emt-privileg-3b325

**Optional Additional Cleanup:**
   If you want to perform a clean-up of all the deployment-bundles which are not
   being used by any of the Clusters. Follow the steps here to do a cleanup

4. Here's a command which does the following:

   - Lists only those bundle deployments for which the fleet cluster does
     **not** exist in the management cluster.
   - Prints:
     - `bundle-deployment-namespace` (with count of all the bundles in this ns)
     - `fleet-cluster-name`
     - `project-id`

   .. code-block:: bash

      echo "bundle-deployment-namespace (count), fleet-cluster, project-id" && \
      kubectl get bundledeployments --all-namespaces -o json | \
      jq -r '
      .items[] |
      select(
         .metadata.labels["fleet.cattle.io/cluster"] != null and
         .metadata.labels["app.edge-orchestrator.intel.com/project-id"] != null
      ) |
      {
         namespace: .metadata.namespace,
         fleet_cluster: .metadata.labels["fleet.cattle.io/cluster"],
         project_id: .metadata.labels["app.edge-orchestrator.intel.com/project-id"]
      } |
      "\(.namespace),\(.fleet_cluster),\(.project_id)"
      ' | while IFS=, read ns fc pid; do
      if ! kubectl get clusters.fleet.cattle.io --all-namespaces --no-headers \
            -o custom-columns=":metadata.name" | grep -q "^$fc$"; then
         echo "$ns,$fc,$pid"
      fi
      done | sort | uniq | while IFS=, read ns fc pid; do
      count=$(kubectl get bundledeployments -n "$ns" --no-headers 2>/dev/null \
            | wc -l)
      echo "$ns ($count), $fc, $pid"
      done



   **Sample output when such bundle deployments exist:**

   .. code-block:: text

      bundle-deployment-namespace (count), fleet-cluster, project-id
      cluster-bff2b105-16d5-44e7-a1d1-d7eca454af5e-emt-privileg-3b325 (13), \
      emt-privileged, bff2b105-16d5-44e7-a1d1-d7eca454af5e

   **Sample output when no such bundle deployments exist:**

   .. code-block:: text

      bundle-deployment-namespace (count), fleet-cluster, project-id

5. You can cross-verify via the UI or by checking the project to confirm if the
   cluster exists. If the cluster does **not** exist, you may proceed to delete
   the `bundle-deployment` namespace.

6. Delete the `bundle-deployment` namespace, which will clean up all associated
   bundles. For the example above:

   .. code-block:: bash

      kubectl delete ns \
      cluster-bff2b105-16d5-44e7-a1d1-d7eca454af5e-emt-privileg-3b325

---


