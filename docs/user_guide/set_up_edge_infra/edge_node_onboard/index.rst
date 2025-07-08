Onboard Edge Nodes
=============================================================================

Systems from different vendors may have different BIOS interfaces. |software_prod_name| supports different boot methodologies, depending on the vendor.
This section describes the onboarding of some of the selected edge node configurations from different vendors.
Contact us on the community channels if you need help with onboarding your specific edge node.

.. note::
   Secure Boot (SB) is disabled by default. To enable it, follow the steps below to configure SB in the BIOS.
   After that, refer to the instructions in :doc:`/shared/shared_secure_boot_opt_in` for enabling SB in |software_prod_name|\ .

As a pre-requisite, you must comply with the following steps to guarantee a successful onboarding (steps differ depending on the vendor - see the specific vendor onboarding sections to learn more):

- HTTPs assisted boot:
   - Ensure that the edge node is connected to the network and has access to the orchestrator.
   - Retrieve the provisioning certificate and create an HTTPs boot option for the interface providing upstream connectivity.
   - Configure the edge node to boot from the HTTPs boot option.
   - Configure the edge node to boot from the hard disk as second boot option.

- USB assisted boot:
   - Ensure that the edge node is connected to the network and has access to the orchestrator.
   - Prepare the USB drive with the iPXE EFI file (see the specific vendor onboarding sections below to learn more).
   - Configure the edge node to boot from the USB boot option.
   - Configure the edge node to boot from the hard disk as second boot option.

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

- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_dell_server`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_asus_system`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_lenovo`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common`

.. note::
   Provisioning Ubuntu on a node that was previously provisioned and not cleaned up will not succeed. User should manually remove the persistent volumes before re-provisioning either of these below options:

   1. :doc:`/user_guide/set_up_edge_infra/delete_clusters` from the edge devices using web-UI
   2. Run the command from the edge node ``dd`` command (change the `disk name`): `dd if=/dev/zero of="/dev/<disk_name>" bs=1G count=100`

.. toctree::
   :maxdepth: 6
   :hidden:

   hardware_prerequisites
   edge_node_registration
   edge_node_onboard_dell_server
   edge_node_onboard_asus_system
   edge_node_onboard_lenovo
   common

