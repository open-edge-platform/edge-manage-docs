Onboard Edge Nodes
=============================================================================

Systems from different vendors may have different BIOS interfaces. |software_prod_name| supports different boot methodologies, depending on the vendor. This section describes the onboarding of some of the selected edge node configurations from different vendors. Contact your Intel support team if you need help with onboarding your specific edge node.

If you have access to your edge node’s UUID or serial number, you can register it in the |software_prod_name| to facilitate faster onboarding.  You will still need to follow one of the following processes but you can skip the steps for entering credentials.

- HTTPs assisted boot:
   - Dell PowerEdge\* XR12, R760 rack server
   - ASRock\* iEP-7020E
   - ASUS\* IoT PE3000G system
   - Lenovo\* ThinkEdge servers

- USB assisted boot:
   - Dell PowerEdge XR12, R760 rack server
   - ASUS\* IoT PE3000G system
   - ASRock\* iEP-7020E
   - Lenovo ThinkEdge servers

- Boot through a third-party provider:
   - Lenovo\* Open Cloud Automation (LOC-A) stack.

The following sections will guide you through the process of setting up and configuring edge nodes to work with |software_prod_name|.

- :doc:`/user_guide/set_up_edge_infra/edge_node_registration`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_dell_server`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_asus_system`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_lenovo`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common`


.. toctree::
   :maxdepth: 6
   :hidden:

   edge_node_registration
   edge_node_onboard_dell_server
   edge_node_onboard_asus_system
   edge_node_onboard_lenovo
   edge_node_onboard_common

