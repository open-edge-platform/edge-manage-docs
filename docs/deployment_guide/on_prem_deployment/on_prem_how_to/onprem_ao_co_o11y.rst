====================================================
README: AO / CO / Observability Composability & Edge Node Onboarding
====================================================

This document provides comprehensive guidance for:

1. Deploying orchestration with **Application Orchestrator (AO)**,
   **Cluster Orchestrator (CO)**, and **Observability (O11Y)** profiles —
   including how to enable or disable them via composability flags.
2. Onboarding edge nodes in **NIO mode** using a **custom CloudInit configuration**
   when **CO is disabled**.

----------------------------------------------------
1. AO / CO / Observability Composability Overview
----------------------------------------------------

By default, the following profiles are **enabled** during orchestration deployment:

- **Application Orchestrator (AO)** — manages edge application orchestration.
- **Cluster Orchestrator (CO)** — manages cluster-level orchestration and scaling.
- **Observability (O11Y)** — provides telemetry, metrics, and monitoring integration.

This feature introduces **environment flags** that enable composability and
granular control to include or exclude these profiles dynamically at deployment time.  
The flags must be defined **before orchestration deployment starts** to ensure
the desired profiles are configured correctly.

During **upgrade operations**, the same flag settings must be retained to maintain
a consistent orchestration state and ensure predictable composability behavior.

----------------------------------------------------
2. Configuration Flags
----------------------------------------------------

All profiles are **enabled by default** (flags unset or set to ``false``).

Set the following environment variables **before starting orchestration deployment or upgrade**
to control profile composability:

.. code-block:: bash

   export DISABLE_AO_PROFILE=true      # Disable Application Orchestrator
   export DISABLE_CO_PROFILE=true      # Disable Cluster Orchestrator
   export DISABLE_O11Y_PROFILE=true    # Disable Observability

.. note::

   These flags must be exported to the environment **prior to both deployment and upgrade**
   to ensure consistent composability behavior across lifecycle operations.

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After orchestration deployment or upgrade, verify which profiles are enabled or disabled
using the following one-liner command:

.. code-block:: bash

   root_app_ns=$(kubectl get application -A | grep root-app | awk '{print $1}')
   VALUE_FILES=$(kubectl get application root-app -n $root_app_ns -o yaml)
   echo "$VALUE_FILES" | grep -q "enable-cluster-orch.yaml" && echo "✅ CO enabled" || echo "⛔ CO disabled"
   echo "$VALUE_FILES" | grep -q "enable-app-orch.yaml" && echo "✅ AO enabled" || echo "⛔ AO disabled"
   echo "$VALUE_FILES" | grep -qE "(enable-o11y)" && echo "✅ O11Y enabled" || echo "⛔ O11Y disabled"

**Example Output:**

.. code-block:: text

   ✅ CO enabled
   ✅ AO enabled
   ⛔ O11Y disabled   --> if observability disabled

You can also verify the same status from the ArgoCD ``root-app`` application view.  
For pre-deployment verification (before cluster creation), use the **orchestration clustername.yaml** file.

----------------------------------------------------
4. Custom CloudInit Configuration for Disabled CO
----------------------------------------------------

When the **Cluster Orchestrator (CO)** is disabled, edge node registration must be
performed using a **custom CloudInit configuration** via the ``orch-cli`` tool.
This section provides detailed steps to onboard edge nodes in **NIO mode**.

----------------------------------------------------
4.1 Prerequisites
----------------------------------------------------

- ``orch-cli`` installed
- Access to the cluster API and Keycloak

.. note::

   The ``orch-cli`` binary and its dependencies are managed through the
   `orch-utils <https://github.com/open-edge-platform/orch-utils>`_ repository.  
   Ensure ``orch-cli`` is installed and configured properly.

----------------------------------------------------
4.2 Configure Environment Variables
----------------------------------------------------

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

   Replace ``PROJECT_NAME``, ``ORCH_DEFAULT_USER``, and ``ORCH_DEFAULT_PASSWORD``
   with valid credentials for your deployment.

----------------------------------------------------
4.3 Create Region and Site (if not available)
----------------------------------------------------

.. code-block:: bash

   # Create a region
   orch-cli create region <region-name> --type <region-type>
   orch-cli list region

   # Create a site under the region
   orch-cli create site <site-name> --region <region-id>
   orch-cli list site

----------------------------------------------------
4.4 Create a Custom CloudInit Configuration
----------------------------------------------------

When CO is disabled, create a **custom CloudInit file** to disable or modify
the ``cluster-agent`` service and ensure successful node registration.

**Example Custom CloudInit (``ao-co-disable.yaml``):**

.. code-block:: yaml

   #cloud-config
   merge_how: 'dict(recurse_array,no_replace)+list(append)'
   runcmd:
     - |
        # Wait until node-agent configuration file is present
        while [ ! -f /etc/edge-node/node/confs/node-agent.yaml ]; do
          sleep 10
        done

        # Wait for cluster-agent service to appear
        until systemctl list-units --type=service | grep -q cluster-agent; do
          sleep 10
        done

        # Disable and stop cluster-agent service
        systemctl stop cluster-agent
        systemctl disable cluster-agent

        # Remove cluster-agent from serviceClients
        sed -i '/serviceClients:/ s/,\s*cluster-agent//; /serviceClients:/ s/cluster-agent,\s*//; /serviceClients:/ s/cluster-agent//' /etc/edge-node/node/confs/node-agent.yaml

        # Restart node-agent service to apply the change
        systemctl restart node-agent

**Create and Verify the Custom Config:**

.. code-block:: bash

   orch-cli create customconfig aoco-disable ./ao-co-disable.yaml
   orch-cli list customconfig
   orch-cli get customconfig aoco-disable

----------------------------------------------------
4.5 View Available OS Profiles
----------------------------------------------------

.. code-block:: bash

   orch-cli list osprofile

----------------------------------------------------
4.6 Register Host in NIO Mode
----------------------------------------------------

Hosts can be registered individually or in bulk using a CSV configuration file.

.. code-block:: bash

   orch-cli create host -i host-config.csv
   orch-cli list host
   orch-cli get host host-868ee99c

**Sample Host CSV (``host-config.csv``):**

.. code-block:: csv

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   aocotest0001,,Edge Microvisor Toolkit 3.0.20250813,site-bcbbbbf8,FALSE,,,,aoco-disable,,,,,

.. note::

   Update the values as per your cluster configuration and OS profile.

----------------------------------------------------
4.7 Create a Cluster (if CO is enabled)
----------------------------------------------------

.. code-block:: bash

   orch-cli create cluster cli-cluster --nodes cb0e877d-aac4-4852-5d4e-216de5e66027:all
   orch-cli list cluster
