Onboard Edge Node: Dell PowerEdge\* XR12 Rack Server
======================================================================

Edge Onboarding securely configures edge nodes into the |software_prod_name|
service. The edge nodes, or hosts in the UI, can be configured and fully
provisioned, lifecycle managed, and added to clusters for workload deployment.


Configure Edge Node
-------------------------

Onboarding involves booting the Edge Node through iPXE binary
retrieved from the Edge Orchestrator.


* :doc:`/user_guide/set_up_edge_infra/onboard_dell/prerequisites`
* :doc:`/user_guide/set_up_edge_infra/onboard_dell/prepare_idrac`
* :doc:`/user_guide/set_up_edge_infra/onboard_dell/racadm_on_windows`
* :doc:`/user_guide/set_up_edge_infra/onboard_dell/racadm_on_linux`
* :doc:`/user_guide/set_up_edge_infra/onboard_dell/https_assisted_boot`
* :doc:`/user_guide/set_up_edge_infra/onboard_dell/usb_assisted_boot`
* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common`

.. note:: The options **HTTPs** or **USB** are *mutually exclusive* when onboarding Dell XR12 servers

.. toctree::
   :hidden:

   onboard_dell/prerequisites
   onboard_dell/prepare_idrac
   onboard_dell/racadm_on_windows
   onboard_dell/racadm_on_linux
   onboard_dell/https_assisted_boot
   onboard_dell/usb_assisted_boot
   edge_node_onboard_common
