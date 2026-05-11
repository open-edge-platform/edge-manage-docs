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


Observe Edge Node status
------------------------

Once Edge Nodes are booted, you can observe their status via |software_prod_name|.
See :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`.

.. toctree::
   :hidden:

   prerequisites/index
   edge_node_registration
   https_boot/index
   onboarding_actions/index
   common
