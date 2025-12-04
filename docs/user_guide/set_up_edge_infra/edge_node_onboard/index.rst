Onboard Edge Nodes
=============================================================================

This section describes high-level steps to perform Zero Touch Provisioning of Edge Nodes at scale with |software_prod_name|.

Zero-Touch Provisioning with |software_prod_name| consists of the following steps.

.. note:: Ensure you meet prerequisites (see :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/index`).

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

Systems from different vendors may have different BIOS interfaces. |software_prod_name| supports different boot methodologies,
to flexibly support a variety of devices and vendors.
As part of this documentation we describe generic boot options, together with examples of supported Edge Nodes from different vendors.
Contact us on the community channels if you need help with onboarding your specific Edge Node.

As of now, |software_prod_name| supports the following boot options:

#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/index` leverages UEFI HTTP boot capabilities
   to download the iPXE bootloader from |software_prod_name| and start the Edge Node onboarding process.
   Some of the Edge Node models supporting HTTPS-assisted boot are as follows:

   - Dell PowerEdge\* XR12, R760 rack server
   - ASRock\* iEP-7020E
   - ASUS\* IoT PE3000G system
   - Lenovo\* ThinkEdge servers

#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/index` uses the USB drive to store the iPXE bootloader
   and boots from the USB drive to start the Edge Node onboarding process.
   Some of the Edge Node models supporting HTTPS-assisted boot are as follows:

   - Dell PowerEdge XR12, R760 rack server
   - ASUS\* IoT PE3000G system
   - ASRock\* iEP-7020E
   - Lenovo ThinkEdge servers

#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/pxe_boot/index` leverages legacy PXE boot method to download
   iPXE bootloader from local DHCP/TFTP server and start the Edge Node onboarding process.
   It requires local Layer-2 network connectivity between Edge Nodes and local DHCP/TFTP server,
   and it's primarily dedicated for the use with the :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile`.

#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/3rd_party_examples/index` - |software_prod_name| can also be integrated
   with 3rd-party boot providers. An example of 3rd-party provider is Lenovo\* Open Cloud Automation (LOC-A)
   that can be used to simplify Edge Node onboarding of Lenovo ThinkEdge servers.

Observe Edge Node status
------------------------

Once Edge Nodes are booted, you can observe their status via |software_prod_name|.
See :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`.

.. toctree::
   :hidden:

   prerequisites/index
   edge_node_registration
   https_boot/index
   usb_boot/index
   pxe_boot/index
   3rd_party_examples/index
   onboarding_actions/index
   common
