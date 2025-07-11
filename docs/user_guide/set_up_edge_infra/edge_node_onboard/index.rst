Onboard Edge Nodes
=============================================================================

This section describes high-level steps to perform Zero Touch Provisioning of Edge Nodes at scale with |software_prod_name|.

Zero-Touch Provisioning with |software_prod_name| consists of the following steps.

Register Edge Nodes
-------------------

First, Edge Nodes must be registered to |software_prod_name| via their Serial Number or UUID
(make sure to grab these hardware identifiers from your Edge Nodes to proceed). This step
also authorizes Edge Nodes with |software_prod_name|.

See :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`.

Configure and boot Edge Nodes
-----------------------------

.. note::
   Secure Boot (SB) is disabled by default. To enable it, follow the steps below to configure SB in the BIOS.
   After that, refer to the instructions in :doc:`/shared/shared_secure_boot_opt_in` for enabling SB in |software_prod_name|\ .

As a pre-requisite, you must comply with the following steps to guarantee a successful onboarding (steps differ depending on the vendor - see the specific vendor onboarding sections to learn more):

- HTTPS-assisted boot:
   - Ensure that the edge node is connected to the network and has access to the orchestrator.
   - Retrieve the provisioning certificate and create an HTTPs boot option for the interface providing upstream connectivity.
   - Configure the edge node to boot from the HTTPs boot option.
   - Configure the edge node to boot from the hard disk as second boot option.

- USB-assisted boot:
   - Ensure that the edge node is connected to the network and has access to the orchestrator.
   - Prepare the USB drive with the iPXE EFI file (see the specific vendor onboarding sections below to learn more).
   - Configure the edge node to boot from the USB boot option.
   - Configure the edge node to boot from the hard disk as second boot option.

- PXE-assisted boot:
   - Ensure that

Observe Edge Node status
------------------------



#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`

   This step

#. Configure and boot Edge Node

#. Observe Edge Node status

Systems from different vendors may have different BIOS interfaces. |software_prod_name| supports different boot methodologies,
to flexibly support a variety of devices and vendors.
As part of this documentation we describe generic boot options, together with examples of supported Edge Nodes from different vendors.
Contact us on the community channels if you need help with onboarding your specific Edge Node.

.. note::
   Secure Boot (SB) is disabled by default. To enable it, follow the steps below to configure SB in the BIOS.
   After that, refer to the instructions in :doc:`/shared/shared_secure_boot_opt_in` for enabling SB in |software_prod_name|\ .


Some of the supported edge node configurations and the boot methodologies are as follows:

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

Boot through a third-party provider:

- Lenovo\* Open Cloud Automation (LOC-A) stack.
   - Lenovo ThinkEdge servers

If you have access to your edge node’s UUID or serial number, you can :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration` to facilitate faster onboarding.

The following sections will guide you through setting up and configuring edge nodes to work with |software_prod_name|.

- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/index`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/index`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/index`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/3rd_party_examples/index`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/index`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`

.. toctree::
   :maxdepth: 6
   :hidden:

   prerequisites/index
   edge_node_registration
   https_boot/index
   usb_boot/index
   pxe_boot/index
   3rd_party_examples/index
   onboarding_actions/index
   common
