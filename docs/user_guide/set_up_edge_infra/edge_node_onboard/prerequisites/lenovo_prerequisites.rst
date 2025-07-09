Lenovo Prerequisites
====================

Edge Onboarding securely configures the Lenovo\* ThinkSystem SE350 Edge Server, Lenovo ThinkEdge SE360 V2 Edge Server, and Lenovo ThinkEdge SE450 Edge Server into |software_prod_name|\ .

.. note::

   - You can use a USB stick as storage for HTTPs boot or to load the certificates into the UEFI or BIOS.
   - In most cases, you can do the same operations described in the following
     `instructions <https://pubs.lenovo.com/lxpm/UEFI_setup>`_,
     with Lenovo\* XClarity Provisioning Manager.

You can then configure, provision, lifecycle manage, and add the edge nodes or hosts in the UI to clusters for workload deployment. The main sections are as follows:

* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/https_boot/https_boot_lenovo`
* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/usb_boot_lenovo`
* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/3rd_party_examples/setup_loca`
* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/3rd_party_examples/loca_assisted_boot`

.. note:: You can only use one of the above options (HTTPs, USB, or LOC-A) to provision Lenovo ThinkEdge servers during the edge node configuration cycle:

For HTTP-assisted boot and USB-assisted boot:

- A Linux\* PC that can access |software_prod_name|\ UI and connect with the XCC2
  service in the Lenovo servers to configure BIOS settings for the edge node,
  located on the same network as the edge node.

For LOC-A-assisted boot:

- A Linux\* or Windows\* PC that can access |software_prod_name|\ UI and LOC-A GUI.

Edge Node Requirements
-------------------------------

- The `Lenovo XClarity Controller 2 (XCC2) service <https://lenovopress.lenovo.com/lp1800-lenovo-xclarity-controller-2-xcc2>`_
  configured on the edge node.

- IP address configured using `Lenovo XClarity Provisioning Manager (LXPM) <https://support.lenovo.com/us/en/solutions/ht504674-lenovo-xclarity-provisioning-manager-lxpm>`_.

- XCC2 user name and password for the edge node.

- Two LAN ports:
  - One port for edge node Internet access.
  - One port to connect the PC to the XCC2 UI.

Hardware Requirements
-----------------------------

Lenovo ThinkEdge SE360 V2 Server:

- Intel® Xeon® processor D-2796TE
- UEFI version 2.10 or higher
- XCC version 2.10 or higher
- 128-GB RAM
- Two SSDs (a minimum of 500 GB)
- Intel® Ethernet Network Adapter X710-T2L Dual Port 10GbE BASE-T
- USB drive (a minimum of 4 GB)

Lenovo ThinkEdge SE450 Edge Server:

- Intel® Xeon® Gold processor 5318N
- UEFI version 2.10 or higher
- XCC version 2.10 or higher
- 128-GB RAM
- Two SSDs (a minimum of 500 GB)
- Intel® Ethernet Network Adapter X710-T2L Dual Port 10GbE BASE-T
- USB drive (a minimum of 4 GB)

Lenovo ThinkEdge SE350 V2 Server:

- Intel® Xeon® processor D-2733NT
- UEFI version 2.10 or higher
- XCC version 2.10 or higher
- 128-GB RAM
- Two SSDs (a minimum of 500 GB)
- Intel® Ethernet Network Adapter X710-T2L Dual Port 10GbE BASE-T
- USB drive (a minimum of 4 GB)

Identifying NIC (Optional for LOC-A-Assisted Boot)
---------------------------------------------------

#. On the edge node, go to the UEFI or BIOS UI.

#. Go to `System Settings`, `Network`, and then select an interface among the available ones.

#. Identify the device with a Link Status of ``Up``. Note the details of this device for the next steps.
