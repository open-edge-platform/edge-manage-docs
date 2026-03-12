.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

EMF Composability (Choose at Day-0)
===================================

Edge Orchestrator is **composable**. At deployment time, you can disable the
**Application Orchestrator (AO)**, **Cluster Orchestrator (CO)**, or
**Observability (O11Y)** profiles. **By default, all three are enabled.**

Choose your composability profile **before deployment** and keep the same
values during upgrades to maintain state consistency.

Quick Decision
--------------

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Profile
     - Use Case
   * - **EMF Full (AO + CO + O11Y)**
     - Full platform: infrastructure, clusters, applications, observability. **Default.**
   * - **EIM-only (no AO, CO, O11Y)**
     - Host provisioning only. Enable profiles later without re-onboarding.
   * - **EIM + CO (no AO)**
     - Infrastructure and clusters. External tools manage applications.
   * - **EIM + CO + AO (no O11Y)**
     - Full platform. External tools provide monitoring/alerts.

Deployment Flags
----------------

Set these **before running the installer**:

.. code-block:: bash

   export DISABLE_AO_PROFILE=true      # Disable Application Orchestrator
   export DISABLE_CO_PROFILE=true      # Disable Cluster Orchestrator
   export DISABLE_O11Y_PROFILE=true    # Disable Observability

.. note::

   Defaults are "all enabled" (unset or false). **Use same values during
   upgrades** to avoid unintended profile changes.

Verify Enabled Profiles
-----------------------

After deployment, verify which profiles are active:

.. code-block:: bash

   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli login <USERNAME> <PASSWORD>
   orch-cli list features

This shows which components (AO, CO, O11Y) are enabled on your deployment.
