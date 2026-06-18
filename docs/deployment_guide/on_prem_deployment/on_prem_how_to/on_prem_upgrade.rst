On-Prem Upgrade Guide
=========================

**Upgrade Path:** EOM On-Prem v2026.1.0 to v2026.2.0

**Document Version:** 2.0

Overview
--------

This document provides step-by-step instructions to upgrade
Edge Out-of-Band Manageability (EOM) On-Prem from version v2026.1.0 to v2026.2.0.

Prerequisites
-------------

System Requirements
~~~~~~~~~~~~~~~~~~~

- Current EOM On-Prem installation version v2026.1.0 or later
- Root/sudo privileges on orchestrator node
- PostgreSQL service running and accessible
- Sufficient disk space for backups (~200GB minimum)
- Docker Hub credentials (if pull rate limit is reached)

Pre-Upgrade Checklist
~~~~~~~~~~~~~~~~~~~~~

- [ ] Back up critical application data from edge nodes
- [ ] Document current edge node configurations
- [ ] Ensure network connectivity between orchestrator and edge nodes

Upgrade Procedure
-----------------

Step 1: Download the Latest On-Prem Upgrade Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Download the installation scripts from the
`Edge Out-of-Band Manageability repository
<https://github.com/open-edge-platform/edge-out-of-band-manageability>`_.

Configure Upgrade Environment
------------------------------

The upgrade uses the same two environment files as the installation:

* ``pre-orch/pre-orch.env`` — Kubernetes cluster and networking settings
* ``post-orch/post-orch.env`` — Helm deployment profile, registry, and feature flags

Configuration Workflow
~~~~~~~~~~~~~~~~~~~~~~

#. Ensure ``pre-orch/pre-orch.env`` is set to the correct Kubernetes provider and IP settings
#. Update ``post-orch/post-orch.env`` with the new ``EOM_REGISTRY`` version tag if needed
#. Run the backup, then upgrade the cluster and charts

pre-orch.env (Kubernetes Settings)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Key Variables
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default / Options
   * - ``PROVIDER``
     - Kubernetes distribution in use
     - ``k3s`` (options: ``kind``, ``k3s``, ``rke2``)
   * - ``DOCKER_USERNAME``
     - Docker Hub username (for K3s/RKE2 registry auth)
     - (empty)
   * - ``DOCKER_PASSWORD``
     - Docker Hub password or personal access token
     - (empty)
   * - ``EOM_ORCH_IP``
     - Single-IP mode — one IP shared by Traefik (:443) and HAProxy (:9443)
     - (empty)
   * - ``EOM_TRAEFIK_IP``
     - Multi-IP mode — IP for Traefik
     - (empty)
   * - ``EOM_HAPROXY_IP``
     - Multi-IP mode — IP for HAProxy
     - (empty)

post-orch.env (Deployment Settings)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Key Variables
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default / Example
   * - ``EOM_HELMFILE_ENV``
     - Deployment profile (``onprem-eim`` or ``onprem-vpro``)
     - ``onprem-eim``
   * - ``EOM_CLUSTER_DOMAIN``
     - Fully qualified domain name of the cluster
     - ``orch-10-0-0-1.example.com``
   * - ``EOM_REGISTRY``
     - Container and chart registry URL
     - ``registry-rs.edgeorchestration.intel.com``
   * - ``EOM_AMT_PASSWORD``
     - Intel AMT password (required)
     - (empty)
   * - ``EOM_ENABLE_O11Y``
     - Enable observability stack
     - ``false``
   * - ``EOM_HTTP_PROXY``
     - HTTP proxy for orchestrator components
     - (empty)
   * - ``EOM_NO_PROXY``
     - No-proxy list for orchestrator
     - (empty)

Step 2: Back Up Before Upgrading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the backup script from the ``pre-orch`` directory. This backs up PostgreSQL
data and critical Kubernetes secrets to ``upgrade-backup/``:

.. code-block:: bash

   cd pre-orch
   ./pre-orch-backup.sh

Step 3: Update Environment Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Review and update both environment files for the new version:

**In ``pre-orch/pre-orch.env``** — verify the Kubernetes provider and IP settings
are still correct. No changes are typically needed unless the cluster IP has changed.

**In ``post-orch/post-orch.env``** — update the registry URL or any changed settings:

.. code-block:: bash

   # Verify registry points to the correct release
   EOM_REGISTRY=registry-rs.edgeorchestration.intel.com

   # Ensure proxy and IP settings match the current environment
   EOM_CLUSTER_DOMAIN=<your-cluster-domain>

Step 4: Upgrade the Kubernetes Cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Upgrade the Kubernetes cluster and pre-orch components:

.. code-block:: bash

   cd pre-orch
   ./pre-orch.sh upgrade

This re-applies OpenEBS, MetalLB, and namespaces/secrets (idempotent).

Step 5: Upgrade Helm Charts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the Helm upgrade to deploy the new chart versions and restore PostgreSQL
data from the backup created in Step 2:

.. code-block:: bash

   cd post-orch
   ./post-orch-deploy.sh upgrade

The upgrade process:

- Restores Kubernetes secrets (Keycloak, PostgreSQL passwords)
- Runs ``helmfile sync`` to upgrade all releases to the new chart versions
- Cleans stale Keycloak JGroups cluster entries
- Restores PostgreSQL data from the backup

Step 6: Verify the Upgrade
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that all Helm releases deployed successfully:

.. code-block:: bash

   cd post-orch
   ./post-orch-deploy.sh list

Or with detailed pod status:

.. code-block:: bash

   ./watch-deploy.sh --debug

Post-Upgrade Verification
---------------------------

Check the console output from the upgrade script.
The **last line** should read:

.. code-block:: text

   UPGRADE COMPLETE  (env: onprem-eim)

System Health Check
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Check cluster node status
   kubectl get nodes
   kubectl get pods -A

   # List all Helm release statuses
   cd post-orch
   ./post-orch-deploy.sh list

Service Validation
~~~~~~~~~~~~~~~~~~~~

Watch all releases until they are in ``deployed`` state:

.. code-block:: bash

   ./watch-deploy.sh

Web UI Access Verification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After a successful upgrade, verify you can access the Web UI with the same
project, user, and credentials used before the upgrade.

Troubleshooting
===============
Issue#1 : If releases fail after upgrade:
   - Re-run the upgrade for the specific chart:

   .. code-block:: bash

      cd post-orch
      ./post-orch-deploy.sh install <chart-name>

   - Or re-run the full upgrade:

   .. code-block:: bash

      ./post-orch-deploy.sh upgrade

   .. note::
      If **external-secrets** or **copy-ca-cert** pods remain in a problematic state,
      delete the associated Jobs first, then re-run:

      .. code-block:: bash

         kubectl delete jobs -n <namespace> -l app=<chart-name>
         ./post-orch-deploy.sh install <chart-name>

#. After the upgrade completes successfully, wait approximately **5 minutes** to allow DKAM to
   fetch all dependent artifacts.
   Verify that the ``signed_ipxe.efi`` image is downloaded using the freshly issued ``Full_server.crt``.

#. Download the latest certificates:

   .. code-block:: bash

      # Delete both files before downloading
      rm -rf Full_server.crt signed_ipxe.efi
      export CLUSTER_DOMAIN=cluster.onprem
      wget https://tinkerbell-haproxy.$CLUSTER_DOMAIN/tink-stack/keys/Full_server.crt --no-check-certificate --no-proxy -q -O Full_server.crt
      wget --ca-certificate=Full_server.crt https://tinkerbell-haproxy.$CLUSTER_DOMAIN/tink-stack/signed_ipxe.efi -q -O signed_ipxe.efi

   Once the above steps are successful, the orchestrator (Orch) is ready for onboarding new Edge Nodes (EN).

Issue#2: Handling Helm Chart Upgrade Failures
---------------------------------------------------------

**Symptoms:**

``post-orch-deploy.sh upgrade`` exits with chart failures.

**Resolution:**

#. Check which releases failed:

   .. code-block:: bash

      ./post-orch-deploy.sh list

#. Re-install the failed chart:

   .. code-block:: bash

      ./post-orch-deploy.sh install <chart-name>

Issue#3: Unsupported Workflow for Pre-Upgrade Onboarded Edge Nodes
-------------------------------------------------------------------------

**Issue:**

If an Edge Node (EN) was onboarded before the EMF upgrade but the cluster installation was not completed,
running the cluster installation after the upgrade using the latest cluster template will not work. This fails because the EN still uses old OS profiles and pre-upgrade settings.

**Resolution:**

To continue successfully after the upgrade, choose one of the following options:

**Option 1: De-authorize and Re-Onboard the EN**

#. De-authorize the existing EN from the orchestrator
#. Re-onboard the EN to ensure it gets the correct post-upgrade templates and configurations

**Option 2: Update the OS Profile Using Day-2 Upgrade Process**

#. Update the EN to the latest available OS profile using the day-2 upgrade process
#. After the OS profile upgrade is complete, proceed with cluster installation
