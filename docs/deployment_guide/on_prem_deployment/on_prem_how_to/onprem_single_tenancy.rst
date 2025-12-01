Single Tenancy Deployment
============================================================

This document provides end-to-end guidance on Deploying orchestration with Default Tenancy,
   including how to enable or disable it using composability flags.


----------------------------------------------------
1. Single Tenancy Overview
----------------------------------------------------

During orchestration deployment, the Single Tenancy profile is **disabled by default**. 
This profile is controlled through **environment flag** set before starting the orchestration deployment.

.. important::

   The flag must be defined **before** orchestration deployment begins.
   For upgrades, ensure the same flag is used to maintain consistent orchestration state
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
