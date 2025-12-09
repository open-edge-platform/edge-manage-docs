AO / CO / Observability Composability & Edge Node Onboarding
============================================================

This document provides end-to-end guidance on:

1. Deploying orchestration with **Application Orchestrator (AO)**,
   **Cluster Orchestrator (CO)**, and **Observability (O11Y)** profiles,
   including how to enable or disable them using composability flags.
2. Onboarding edge nodes in **NIO mode** with a **custom CloudInit configuration**
   when **CO is disabled**.

----------------------------------------------------
1. AO / CO / Observability Composability Overview
----------------------------------------------------

During orchestration deployment, the following profiles are **enabled by default**:

- **Application Orchestrator (AO)** — handles application orchestration at the edge.
- **Cluster Orchestrator (CO)** — manages cluster-level orchestration, scaling, and coordination.
- **Observability (O11Y)** — integrates telemetry, metrics, and monitoring.

Composability provides **flexibility and control**, allowing you to include or exclude specific profiles as needed.
These profiles are controlled through **environment flags** set before starting the orchestration deployment.

.. important::

   The flags must be defined **before** orchestration deployment begins.
   For upgrades, ensure the same flags are used to maintain consistent orchestration state
   and avoid unexpected composability changes.

----------------------------------------------------
2. Configuration Flags
----------------------------------------------------

By default, all profiles are enabled (flags unset or set to ``false``).

To modify which components are deployed, export the following environment variables
**before starting orchestration deployment or upgrade**:

.. code-block:: bash

   export DISABLE_AO_PROFILE=true      # Disable Application Orchestrator
   export DISABLE_CO_PROFILE=true      # Disable Cluster Orchestrator
   export DISABLE_O11Y_PROFILE=true    # Disable Observability

.. note::

   These flags must be exported to your environment **prior to both deployment and upgrade**
   to ensure consistent composability across lifecycle operations.

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After orchestration deployment or upgrade, you can verify which profiles are enabled or disabled
using the following one-liner command:

.. code-block:: bash

   root_app_ns=$(kubectl get application -A | grep root-app | awk '{print $1}')
   VALUE_FILES=$(kubectl get application root-app -n $root_app_ns -o yaml)
   echo "$VALUE_FILES" | grep -q "enable-cluster-orch.yaml" && echo "✅ CO enabled" || echo "⛔ CO disabled"
   echo "$VALUE_FILES" | grep -q "enable-app-orch.yaml" && echo "✅ AO enabled" || echo "⛔ AO disabled"
   echo "$VALUE_FILES" | grep -qE "(enable-o11y)" && echo "✅ O11Y enabled" || echo "⛔ O11Y disabled"

**Example Output:**

.. code-block:: text

   ⛔ CO disabled     --> if CO disabled
   ⛔ AO disabled     --> if AO disabled
   ✅ O11Y enabled    --> if observability enabled

You can also confirm the same from the ArgoCD ``root-app`` application view.
For pre-deployment verification (before cluster creation), review the **orchestration clustername.yaml** file.

----------------------------------------------------
4. Custom CloudInit Configuration for Disabled CO
----------------------------------------------------

When **Cluster Orchestrator (CO)** is disabled, edge nodes must be registered manually using
a **custom CloudInit configuration**.
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

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   aocotest0001,,Edge Microvisor Toolkit 3.0.20250813,site-bcbbbbf8,FALSE,,,,,,,,,

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

   For details on how to add SSH users, refer to the `Local SSH Account Management <../user_guide/set_up_edge_infra/orch_cli/orch_cli_guide.rst#local-ssh-account-management>`_ section in the orch-cli guide.

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

**Check Cluster Agent Logs (if CO is enabled):**

.. code-block:: bash

  sudo journalctl -u cluster-agent -f
  sudo systemctl status cluster-agent

**Check Other Service Logs:**

.. code-block:: bash

   sudo journalctl -u <service-name> -f

----------------------------------------------------
4.7 Create a Cluster (if CO is enabled)
----------------------------------------------------

If the **Cluster Orchestrator** is enabled, create and verify the cluster using the commands below:

.. code-block:: bash

   orch-cli create cluster cli-cluster --nodes <EDGENODE-UUID>:all
   orch-cli list cluster
