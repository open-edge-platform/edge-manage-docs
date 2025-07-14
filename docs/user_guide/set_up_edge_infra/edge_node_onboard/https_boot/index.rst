HTTPS-assisted boot
===================

This page provides high-level description of the HTTPS-assisted boot.

For platform-specific steps see examples using HTTPS-assisted boot:

- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/https_boot_dell`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/https_boot_lenovo`

Requirements
------------

- Ensure that Edge Nodes are connected to the network and has access to the orchestrator.
- Retrieve the provisioning certificate and create an HTTPS boot option for the network interface providing upstream connectivity.
- Configure Edge Nodes to boot from the HTTPS boot option.
- Configure Edge Node to boot from the hard disk as second boot option.

HTTPS-assisted boot flow
------------------------

#. Configure BIOS with UEFI HTTP URL pointing to ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi``.

#. Optionally, if Edge Nodes have been configured with Secure Boot, configure BIOS to enable Secure Boot and upload |software_prod_name| CA certificates.

#. Manage boot order to boot from UEFI HTTP as the fist option and reboot Edge Nodes.

.. toctree::
   :maxdepth: 6
   :hidden:

   https_boot_dell
   https_boot_lenovo
