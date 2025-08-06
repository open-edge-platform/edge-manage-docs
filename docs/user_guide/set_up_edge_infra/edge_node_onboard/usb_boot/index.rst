USB-assisted boot
=================

This page provides high-level description of the USB-assisted boot.

For platform-specific steps see examples using USB-assisted boot:

- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/usb_boot_dell`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/usb_boot_asus`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/usb_boot_lenovo`

Requirements
------------

- Ensure that the edge node is connected to the network and has access to the orchestrator.
- Prepare the USB drive with the iPXE EFI file (see the platform-specific sections to learn more).
- Configure the edge node to boot from the USB boot option.
- Configure the edge node to boot from the hard disk as second boot option.

USB-assisted boot flow
----------------------

#. Prepare USB drive and inject the iPXE script downloaded from ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi``.
   See platform-specific instructions on how to prepare USB drive.

#. Optionally, if Edge Nodes have been configured with Secure Boot, configure BIOS to enable Secure Boot and upload |software_prod_name| CA certificates.

#. Manage boot order to boot from USB as the fist option and reboot Edge Nodes.

.. toctree::
   :maxdepth: 6
   :hidden:

   usb_boot_dell
   usb_boot_asus
   usb_boot_lenovo
