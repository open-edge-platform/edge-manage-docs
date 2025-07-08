.. _kpi:

Key Performance Indicators (KPIs)
==================================

    * :ref:`provisioning_time`

.. _provisioning_time:

Provisioning Time
-----------------------

A panel for provisioning time is available in the Edge Node Host Performance Dashboard of Observability-UI.
This metric provides insights into the time taken for a node to transition
from the initial network configuration to having all necessary agents up
and running.

    .. figure:: images/provisioning_time.png
      :alt: Provisioning Time
      :width: 95 %

Understanding Provisioning Time
---------------------------------------

The Provisioning Time metric is a key performance indicator that tracks the
total time of the onboarding and provisioning process for a node.
It covers the entire lifecycle from the time when the node is first
booted up (via HTTPS-based or USB-based boot) and starts initial network configuration via iPXE,
through all the onboarding and provisioning steps (including iPXE, Micro-OS and OS installation phases),
until the node is fully operational with all required agents running (see :doc:`/user_guide/set_up_edge_infra/edge_node_states/provisioned_host_details`).

This metric is crucial for users to understand the duration required for
a node to complete its onboarding and provisioning processes. The Provisioning Time value may vary
depending on the node's hardware, network conditions, OS distribution, and the provisioning mode
(Zero-Touch or non Zero-Touch Provisioning). See the following pages for more details about provisioning modes:

* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`
* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`

Dashboard Visibility for Provisioning Time
---------------------------------------------------

The provisioning time data is visible on the dashboard once the node is
in a running state, and it will be retained for at least 15 days.
