:orphan:

Observability Composability
===========================

This document provides end-to-end guidance on:

1. Deploying Edge Out-of-Band Manageability with **Observability (O11Y)**
   enabled or disabled, using the ``EOM_ENABLE_O11Y`` flag in ``post-orch.env``.
2. Onboarding edge nodes in **NIO mode** using ``orch-cli``.

----------------------------------------------------
1. Observability Composability Overview
----------------------------------------------------

Edge Out-of-Band Manageability supports optional **Observability (O11Y)** — integrating
telemetry, metrics, and monitoring for both the orchestrator and edge nodes.

By default, Observability is **disabled**. It can be enabled before deployment by setting
``EOM_ENABLE_O11Y=true`` in ``post-orch/post-orch.env``.

When enabled, the following Helm releases are deployed:

- ``orchestrator-observability`` — orchestrator-side metrics and log aggregation
- ``edgenode-observability`` — edge-node metrics and log collection
- ``orchestrator-prometheus-agent`` — Prometheus scraping agent
- ``observability-tenant-controller`` — per-tenant observability configuration
- ``observability-crds`` — Custom Resource Definitions for observability stack

.. important::

   Set ``EOM_ENABLE_O11Y`` **before** running ``post-orch-deploy.sh install``.
   For upgrades, keep the same value to maintain a consistent deployment state.

----------------------------------------------------
2. Configuration
----------------------------------------------------

Observability is controlled by a single variable in ``post-orch/post-orch.env``:

.. list-table::
   :widths: 30 50 20
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``EOM_ENABLE_O11Y``
     - Enable edge-node and orchestrator observability (metrics, logs, dashboards)
     - ``false``

**To enable Observability**, set the flag in ``post-orch/post-orch.env`` before running the deployment:

.. code-block:: bash

   # In post-orch/post-orch.env
   EOM_ENABLE_O11Y=true

**To disable Observability** (default):

.. code-block:: bash

   # In post-orch/post-orch.env
   EOM_ENABLE_O11Y=false

.. note::

   This variable must be set **before** running ``post-orch-deploy.sh install`` or
   ``post-orch-deploy.sh upgrade`` to ensure a consistent deployment state.

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After deployment, verify whether Observability is enabled by checking the Helm release
status:

.. code-block:: bash

   helm list -A | grep -E "orchestrator-observability|edgenode-observability"

**Example output when O11Y is enabled:**

.. code-block:: text

   orchestrator-observability    orch-o11y    1    deployed    ...
   edgenode-observability        orch-o11y    1    deployed    ...

**Example output when O11Y is disabled** (no output or releases show ``uninstalled``):

.. code-block:: text

   (no output)

Alternatively, list all enabled releases for the active profile:

.. code-block:: bash

   cd post-orch
   ./post-orch-deploy.sh list

----------------------------------------------------
4. Edge Node Onboarding in NIO Mode
----------------------------------------------------

Edge nodes can be onboarded in **NIO mode** using the ``orch-cli`` tool.

This section walks through the complete process of onboarding edge nodes in **NIO mode**
using the ``orch-cli`` tool.

----------------------------------------------------
4.1 Prerequisites
----------------------------------------------------

- ``orch-cli`` installed on your system
- Access to the cluster API and Keycloak

.. note::

   The ``orch-cli`` binary and dependencies are managed through the
   `orch-cli <https://github.com/open-edge-platform/orch-cli>`_ repository.
   Ensure ``orch-cli`` is available and configured correctly in your environment.

----------------------------------------------------
4.2 Configure Environment Variables
----------------------------------------------------

Set the following environment variables and authenticate with Keycloak:

.. code-block:: bash

   export CLUSTER_FQDN=<cluster.example.com>
   export EP=https://api.${CLUSTER_FQDN}
   export PROJECT_NAME=itep
   export ORCH_DEFAULT_USER=itep-user
   export ORCH_DEFAULT_PASSWORD=itep-user-password

   # Login to orch-cli using Keycloak
   orch-cli logout
   orch-cli login $ORCH_DEFAULT_USER $ORCH_DEFAULT_PASSWORD --keycloak https://keycloak.${CLUSTER_FQDN}/realms/master

   # Set default project and API endpoint
   orch-cli config set project $PROJECT_NAME
   orch-cli config set api-endpoint $EP

.. note::

   Replace ``CLUSTER_FQDN``, ``PROJECT_NAME``, ``ORCH_DEFAULT_USER``, and ``ORCH_DEFAULT_PASSWORD``
   with valid credentials for your deployment.

----------------------------------------------------
4.3 Create Region and Site (if not available)
----------------------------------------------------

Before registering hosts, ensure the required **region** and **site** are created.

.. code-block:: bash

   # Create a region
   orch-cli create region <region-name> --type <region-type>
   orch-cli list region

   # Create a site under the region
   orch-cli create site <site-name> --region <region-id>
   orch-cli list site

----------------------------------------------------
4.4 View Available OS Profiles
----------------------------------------------------

To list all available OS profiles:

.. code-block:: bash

   orch-cli list osprofile

----------------------------------------------------
4.5 Register Host in NIO Mode
----------------------------------------------------

Hosts can be registered individually or in bulk using a CSV file.

.. code-block:: bash

   orch-cli create host -i host-config.csv
   orch-cli list host
   orch-cli get host host-868ee99c

**Sample Host CSV (``host-config.csv``):**

.. code-block:: bash

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   aocotest0001,,Edge Microvisor Toolkit 3.0.20251204,site-bcbbbbf8,FALSE,,,,,,

.. note::

   Update values as needed for your specific environment.

--------------------------------------------------------------
4.6 Collecting Edge Node Logs When Observability is Disabled
--------------------------------------------------------------

When **Observability (O11Y)** is disabled, the centralized log collection and monitoring
capabilities are not available. In this scenario, you must collect logs directly from
each edge node by connecting via SSH.

.. important::

   To access edge nodes when observability is disabled, the edge node must be onboarded
   with **SSH enabled** in the configuration.

   For details on how to add SSH users, refer to the `Local SSH Account Management <../user_guide/set_up_edge_infra/orch_cli/orch_cli_guide.html#local-ssh-account-management>`_ section in the orch-cli guide.

----------------------------------------------------
4.6.1 SSH Login to Edge Node
----------------------------------------------------

Once the edge node is onboarded successfully with SSH enabled, you can log in to collect logs.

Get the edge node IP address after onboarding:

.. code-block:: bash

   orch-cli list host
   orch-cli get host <host-id> | grep NIC

Login to the edge node:

.. code-block:: bash

   ssh <ssh-enabled-username>@<edge-node-ip>

----------------------------------------------------
4.6.2 Collect Edge Node Logs
----------------------------------------------------

After logging in to the edge node, you can collect logs from various edge services.

**Check Node Agent Logs:**

.. code-block:: bash

   sudo journalctl -u node-agent -f
   sudo systemctl status node-agent

**Check Other Service Logs:**

.. code-block:: bash

   sudo journalctl -u <service-name> -f


