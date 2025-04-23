Recover from Edge Node Initialization or Provisioning Failed
=============================================================

This page describes how to recover a failed node during provisioning or
initialization.

Symptom
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Edge Node can fail in two phases:

* INITIALIZATION_FAILED
* PROVISION_FAILED

Edge Orchestrator will provided the reason for the failure and the provisioning
step of failure.

Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Edge Node provisioning can fail for various reasons, mostly network-related:

* network timeout
* network disruption during micro OS (µOS) download
* network disruption during OS download
* resource download (either OS or µOS) does not resume after a network
  disruption

Solution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
UI will point out the step and the reason for the error that caused the
initialization or provisioning failure.

Automatic error recovery is not supported during remote onboarding and
provisioning; the following steps are needed to recover the host and
re-provision.

Steps:

* Delete the configured Host in UI :doc:`/user_guide/set_up_edge_infra/delete_host`.

* Reboot the Edge Node from the management console or power button.

* Edge Orchestrator will automatically start provisioning again; follow the
  process as in :doc:`/user_guide/set_up_edge_infra/edge_node_onboard` section.
