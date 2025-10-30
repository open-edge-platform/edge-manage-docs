====================================================
README: AO / CO / Observability Composability Feature
====================================================

This document describes the release of the **Composability Feature** that allows
selective enablement or disablement of **Application Orchestrator (AO)**,
**Cluster Orchestrator (CO)**, and **Observability (O11Y)** profiles
within the orchestration layer.

----------------------------------------------------
1. Overview
----------------------------------------------------

By default, the following profiles are **enabled** during orchestration deployment:

- **Application Orchestrator (AO)** — manages edge application orchestration.
- **Cluster Orchestrator (CO)** — manages cluster-level orchestration and scaling.
- **Observability (O11Y)** — provides telemetry, metrics, and monitoring integration.

This feature introduces **environment flags** that provide composability and
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
    ⛔ O11Y disabled   --> if observablity disabled

You can also verify the same status from the ArgoCD root-app application view. 
For pre-deployment verification (before cluster creation), use the orchestration clustername.yaml file.

