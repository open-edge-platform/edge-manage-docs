PXE-assisted boot
=================

This page provides high-level description of the PXE-assisted boot.

**IMPORTANT!** The PXE-assisted boot has been developed to support provisioning of Standalone Edge Nodes at scale
(see :doc:`/user_guide/advanced_functionality/oxm_pxe_provisioning`) with the :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile`.
In this case, |software_prod_name| is deployed locally on-premises and Edge Nodes are attached to the same local network.
The OXM deployment profile should be the default environment for using PXE-assisted boot.
For cloud-based |software_prod_name| the recommended options are :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/index`
and :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/index`.
However, we provide :doc:`/user_guide/advanced_functionality/pxe_provisioning_with_cloud_emf` as an experimental feature.

Requirements
------------

- Ensure you deploy a local PXE server (DHCP+TFTP) that stores iPXE script (see instructions below).
- PXE-assisted boot can only be used if Edge Nodes have direct (Layer-2) connectivity to the PXE server.
- Ensure that Edge Nodes are connected to the network and has access to the orchestrator.
- Configure Edge Nodes to boot from the PXE boot option.
- Configure Edge Node to boot from the hard disk as second boot option.

PXE-assisted boot flow
----------------------

#. Prepare local PXE server deployment. It can be done via :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile`
   or :doc:`/user_guide/advanced_functionality/pxe_provisioning_with_cloud_emf` (experimental feature).
   The local PXE server must provide the iPXE script exposed at ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi`` via TFTP.

#. Optionally, if Edge Nodes have been configured with Secure Boot, configure BIOS to enable Secure Boot and upload |software_prod_name| CA certificates.

#. Manage boot order to boot from PXE as the fist option and reboot Edge Nodes.
