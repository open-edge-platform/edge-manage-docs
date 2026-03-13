On-Prem vPro Profile (AO / CO / Observability Disabled)
=======================================================

This document provides guidance on:

1. Deploying orchestration using the ``onprem-vpro`` installer profile.
2. Understanding which components are disabled in this profile.
3. Managing Intel® vPro devices manually using ``orch-cli``.

+----------------------------------+
| 1. On-Prem vPro Profile Overview |
+----------------------------------+

The ``onprem-vpro`` profile is intended for on-premise deployments
where:

-  UI is disabled
-  Auto OS provisioning is disabled
-  Device lifecycle operations are handled manually via ``orch-cli``

To enable this profile, update your environment configuration::

export ORCH_INSTALLER_PROFILE=onprem-vpro

.. important::

The profile must be set **before starting orchestration deployment**.
Changing the profile after deployment may lead to inconsistent behavior.

+-----------------------------------------------+
| 2. Components Disabled in onprem-vpro Profile |
+-----------------------------------------------+

When the ``onprem-vpro`` profile is enabled, the following components
are disabled:

-  Application Orchestrator (AO)
-  Cluster Orchestrator (CO)
-  Observability (O11Y)
-  Kyverno
-  UI

Key behavior changes:

-  Auto OS provisioning is disabled.
-  Since UI is disabled, NIO registration must confinued using orch-cli.
-  All vPro provisioning and power operations must be executed using
   ``orch-cli``.

+------------------------------------+
| 3. Manual vPro Device Provisioning |
+------------------------------------+

Because UI is disabled, provisioning and power management of Intel® vPro
devices must be performed via orch-cli.

Set required environment variables::

export CLUSTER_FQDN=<cluster.example.com> export
EP=https://api.${CLUSTER_FQDN} export PROJECT_NAME=itep

Provision a vPro device::

| orch-cli set host
| –project itep
| –api-endpoint https://api.${CLUSTER_FQDN}
| –amt-state provisioned

+------------------------------+
| 4. Power Management Commands |
+------------------------------+

Power Off::

| orch-cli set host
| –project itep
| –power off
| –api-endpoint https://api.${CLUSTER_FQDN}

Power On::

| orch-cli set host
| –project itep
| –power on
| –api-endpoint https://api.${CLUSTER_FQDN}

Power Cycle::

| orch-cli set host
| –project itep
| –power cycle
| –api-endpoint https://api.${CLUSTER_FQDN}

+-------------------------------+
| 5. Operational Considerations |
+-------------------------------+

Because AO, CO, Observability, Kyverno, and UI are disabled:

-  No UI-based operations are available.
-  No centralized monitoring stack is deployed.
-  No cluster orchestration capabilities are present.
-  No policy enforcement via Kyverno.

All operations must be executed manually using ``orch-cli``.

.. note::

Ensure secure API access and proper credentials management when
operating in production environments.

+------------+
| 6. Summary |
+------------+

The ``onprem-vpro`` profile provides a minimal, lightweight on-prem
orchestration setup focused on manual Intel® vPro device management.

Use this profile when:

-  UI is not required
-  Auto OS provisioning is not needed
-  Device lifecycle management is handled entirely via CLI
-  A reduced orchestration footprint is preferred

