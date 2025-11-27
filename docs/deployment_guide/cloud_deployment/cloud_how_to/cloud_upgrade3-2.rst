EMF Cloud Upgrade Guide
=======================

**Upgrade Path:** EMF Cloud v3.1 → v3.2  
**Document Version:** 1.0

Overview
--------

This document provides step-by-step instructions to upgrade Cloud Edge
Manageability Framework (EMF) from version **3.1** to **3.2**.

Prerequisites
-------------

System Requirements
~~~~~~~~~~~~~~~~~~~

- Existing EMF Cloud installation version 3.1
- Root/sudo privileges on the orchestrator node
- PostgreSQL service running and reachable
- Docker credentials (if pull rate limit issues occur)

Pre-Upgrade Checklist
~~~~~~~~~~~~~~~~~~~~~

- [ ] Back up critical application data from edge nodes
- [ ] Document current edge node configurations
- [ ] Remove all edge clusters and hosts:

  - `Delete clusters <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/clusters/delete_clusters.html>`_
  - `De-authorize hosts <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/deauthorize_host.html>`_
  - `Delete hosts <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/delete_host.html>`_

Upgrade Procedure
-----------------

Step 1: Prepare Edge Orchestrator Upgrade Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps listed under the **Prerequisites** section from the official
documentation:

`Installer prerequisites <https://docs.openedgeplatform.intel.com/edge-manage-docs/3.1/deployment_guide/cloud_deployment/cloud_get_started/cloud_start_installer.html>`_

Apply the changes below during the upgrade to version 3.1.

1. Pull the 3.1 Cloud Installer Image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   # Replace <3.1-TAG> with the actual version tag
   oras pull registry-rs.edgeorchestration.intel.com/edge-orch/common/files/cloud-orchestrator-installer:<3.1-TAG>
   tar -xzf _build/cloud-orchestrator-installer.tgz

2. Start the Installation Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the orchestrator installer:

.. code-block:: bash

   ./start-orchestrator-install.sh

- Select **Option 2** for managing an existing cluster.
- Enter cluster name and AWS region (same as original install).
- Provide installer settings location (same as used during provisioning).

3. Provision the Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to the pod-configs directory:

.. code-block:: bash

   orchestrator-admin:~$ cd ~/pod-configs

Configure provisioning parameters:

.. code-block:: bash

   orchestrator-admin:~/pod-configs$ ./utils/provision.sh config \
     --aws-account [AWS account] \
     --customer-state-prefix [S3 prefix for provision state] \
     --environment [Cluster name] \
     --parent-domain [Root deployment domain] \
     --region [AWS region] \
     --jumphost-ip-allow-list [Admin allowed IPs]

.. note::
   Refer to official documentation for parameter details:

   https://docs.openedgeplatform.intel.com/edge-manage-docs/3.1/deployment_guide/cloud_deployment/cloud_get_started/cloud_orchestrator_install.html#create-provisioning-configuration

Run the upgrade:

.. code-block:: bash

   orchestrator-admin:~/pod-configs$ ./utils/provision.sh upgrade \
     --aws-account [AWS account] \
     --customer-state-prefix [S3 prefix] \
     --environment [Cluster name] \
     --parent-domain [Root domain] \
     --region [AWS region] \
     --jumphost-ip-allow-list [Admin IPs]

4. Upgrade Edge Orchestrator
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to home directory:

.. code-block:: bash

   orchestrator-admin:~$ cd ~

Configure cluster deployment options:

.. code-block:: bash

   orchestrator-admin:~$ ./configure-cluster.sh

This redeploys upgraded apps starting with **root-app**.

You will notice **infra-external** app failing due to
`orch-infra-rps` and `orch-infra-mps` database inconsistencies.

Proceed to **patch External Secrets and Vault**.

Step 2: Patch External Secrets and Vault
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to clean up old External Secrets resources, remove
finalizers, reinstall CRDs, and recover ArgoCD applications.

1. Patch ArgoCD Application Finalizer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl patch application -n $namespace external-secrets \
     -p '{"metadata": {"finalizers": ["resources-finalizer.argocd.argoproj.io"]}}' \
     --type merge

2. Delete External Secrets Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl delete application -n $namespace external-secrets --cascade=background &

3. Delete Remaining External Secrets Resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl get all -A | grep external

Delete leftover deployments, services, or pods manually.

4. Remove Finalizers from Hanging CRDs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl patch crd/MY_CRD_NAME \
     -p '{"metadata":{"finalizers":[]}}' --type=merge

5. Delete Stuck External Secrets CRDs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl delete crd clustersecretstores.external-secrets.io
   kubectl delete crd secretstores.external-secrets.io

6. Confirm CRDs Are Fully Removed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl delete -f https://raw.githubusercontent.com/external-secrets/external-secrets/main/deploy/crds/bundle.yaml

7. Reinstall External Secrets CRDs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl apply --server-side=true --force-conflicts \
     -f https://raw.githubusercontent.com/external-secrets/external-secrets/refs/tags/v0.20.4/deploy/crds/bundle.yaml || true

8. Refresh in ArgoCD UI
^^^^^^^^^^^^^^^^^^^^^^^

Refresh all affected apps through the ArgoCD UI.

9. Fix NGINX PXE Sync Issues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl delete secret tls-boots -n orch-boots

10. Delete All Vault Pods
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   kubectl get pods -n orch-platform | grep vault

Delete:

- vault-0
- vault-1
- vault-2

11. Resync Affected Applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If apps remain out-of-sync:

- Delete stuck jobs/pods
- Manually trigger **Sync** in UI

12. Force Sync via CLI
^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   sudo mkdir -p /tmp/argo-cd

   cat <<EOF | sudo tee /tmp/argo-cd/sync-patch.yaml >/dev/null
   operation:
     sync:
       syncStrategy:
         hook: {}
   EOF

   kubectl patch -n <NAMESPACE> application <APP NAME> \
     --patch-file /tmp/argo-cd/sync-patch.yaml --type merge

Step 3: Verification
~~~~~~~~~~~~~~~~~~~~

Log into web UI of the orchestrator. Go to Settings->OS profiles. There you should see the any of the toolkit version upgraded to latest.

Post-Upgrade Steps Edgenode onboarding process
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
After a successful upgrade, follow the EN onboarding process as outlined in the official documentation:
`Set Up Edge Infrastructure – Intel Open Edge Platform <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/index.html>`_

