Recover from Edge Node Initialization or Provisioning Failed
=============================================================

This page describes how to recover a failed node during provisioning or
initialization.

Symptom
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Edge Node can fail in two phases:

* INITIALIZATION_FAILED
* PROVISION_FAILED

Edge Orchestrator will provide the reason for the failure and the provisioning
step of failure.

Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Edge Node provisioning can fail for various reasons :

Network Issue

* Network timeout
* Network disruption during micro OS (µOS) download
* Network disruption during OS download
* Resource download (either OS or µOS) does not resume after a network
  disruption

Configuration Mismatch

* Secure boot mismatch between Edge Orchestrator UI and Edge Node

Solution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Edge Orchestrator UI will indicate the step and reason for the initialization or provisioning failure.

.. note::
   Automatic error recovery is not supported during remote onboarding and
   provisioning. Manual intervention is required following the steps below.

Recovery Steps for Network Issues
-----------------------------------
1. Delete the configured Host in UI :doc:`/user_guide/set_up_edge_infra/delete_host`
2. Reboot the Edge Node from the management console or power button
3. Edge Orchestrator will automatically start provisioning again; follow the
   process in :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index`

Recovery Steps for Configuration Mismatch
-------------------------------------------
1. Delete the configured Host in UI :doc:`/user_guide/set_up_edge_infra/delete_host`
2. Re-register the host following :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`
   and ensure configuration (Secure Boot) settings match between Edge Orchestrator UI and Edge Node
3. Reboot the Edge Node from the management console or power button
4. Edge Orchestrator will automatically start provisioning again; follow the
   process in :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index`

Secure Boot Configuration
----------------------------

   For detailed Secure Boot information, see :doc:`/shared/shared_secure_boot_opt_in`

   To configure Secure Boot:

    * Edge Orchestrator UI (during registration):
      :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`
    * Edge Node configuration:
      :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index`
