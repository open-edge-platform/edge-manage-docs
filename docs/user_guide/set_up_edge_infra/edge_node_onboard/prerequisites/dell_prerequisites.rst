Dell Prerequisites
=================================================

* A Linux* PC or Windows* PC to run the command line tool RACADM to
  load the HTTPS certificates in to iDRAC on the edge node,
  on the same network as the edge node. Only RACADM can be used for this task
  as it is not currently possible to load certificates through the Web based iDRAC interface.

Edge Node Requirements
-------------------------

* The `Integrated Dell\* Remote Access Controller (iDRAC) service
  <https://www.dell.com/support/kbdoc/en-us/000194572/how-to-install-ism-and-start-idrac-gui-launcher>`_
  configured on the edge node
* iDRAC IP address for the edge node
  * `Find on XR12 LCD <https://www.dell.com/support/kbdoc/en-us/000120517/how-to-check-the-idrac-ip-address-on-the-poweredge-lcd>`_
* iDRAC user name and password for the edge node
* Two LAN ports
  * One port for edge node Internet access
  * One port to connect to the iDRAC PC
* The Fully Qualified Domain Name for the Edge Orchestrator (CLUSTER_FQDN).

Hardware Requirements
-------------------------

Dell PowerEdge\* XR12 Rack Server

* Intel® Xeon® processor 4314 (single socket)
* BIOS version 1.12.1 or higher
* iDRAC firmware version 7.00.60.00 or higher
* 128GB RAM
* 1/2/3 SSDs (Minimum 1 SSD with 500GB)
* Intel® Ethernet Network Adapter X710-T2L Dual Port 10GbE BASE-T
* USB drive (minimum 4GB)

Set up iDRAC
------------

- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/prepare_idrac`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/racadm_on_linux`
- :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/racadm_on_windows`
