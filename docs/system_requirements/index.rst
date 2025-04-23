System Requirements
===================

Edge Node Hardware Requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|software_prod_name| does not mandate the use of these specific hardware SKUs.
It supports a wide variety of processors including Intel® Xeon® processors,
Intel® Core™ processors, Intel® Core™ Ultra processors and Intel® Atom™
processors along with Intel® ARC™ graphics cards.
Actual hardware requirements depend on the desired applications performance
requirements that get deployed on the edge node.

Minimum hardware requirements for an edge node:

* CPU:

  * 3rd Gen or newer Intel® Xeon®  Processor
  * 12th Gen or newer Intel® Core™ or Core Ultra Processor
  * 8th Gen or newer Intel® Atom® Processor
  * 4 cores minimum

* RAM 8GB

* Storage

  * 1 Dedicated Data disk with minimum capacity of 100GiB(*)
  * SSD, NVME and SATA disk types
  * Priority order for provisioning is SSD, NVME, SATA. If multiple disk
    have the same name and type the smaller size one is selected.

* Network interface Card Supported by inbox Linux kernel drivers (one of):

  * Intel® Ethernet Network Adapter
    `X710 family <https://www.intel.com/content/www/us/en/products/details/ethernet/700-network-adapters/x710-network-adapters/products.html>`_
  * Intel® Ethernet Network Adapter
    `E810 family <https://www.intel.com/content/www/us/en/products/details/ethernet/800-network-adapters/e810-network-adapters/products.html>`_\ ,
    recommended firmware version `22.5.7`
  * Intel® Ethernet Network Onboard Core Network Adapters

    * `i226 & i226-V <https://ark.intel.com/content/www/us/en/ark/products/series/184686/intel-ethernet-controller-i225-series.html?wapkw=i225>`_
    * `i225-V & i225-LM <https://ark.intel.com/content/www/us/en/ark/products/series/184686/intel-ethernet-controller-i225-series.html?wapkw=i225>`_

  * Broadcom\* LAN On Motherboard (LOM), validated with BCM57504 card

* Network

  * Connectivity outbound to the centralized |software_prod_name| software.
  * Connectivity outbound to the public Internet.
  * Upstream 1 Gbps bandwidth is preferred, but 512 Mbps has also been
    validated.

* Boot mechanism (either one of the two)

   * USB boot
   * HTTPs boot if fully remote provisioning is required.

* BIOS version 1.12.1 or higher (if supported) for Dell devices

.. note::
   Actual resource requirements will widely vary depending on user deployed
   applications (for example, AI inferencing)

Validated Hardware
^^^^^^^^^^^^^^^^^^

The following hardware has been validated by Intel as part of our
periodic release process:

* Dell\* PowerEdge R760, xR8000, xR12, 5200 (Xeon Processor)
* Lenovo\* SE360v2, SE450, SE350 (Xeon Processor)
* ASRock\* iEP-7020E (Core Processor)
* ASUS\* NUC 13, NUC 14, PE300G
* AAEON\* Up Squared 7000 Series (Atom Processor)

This list is constantly expanded based on Intel roadmap and in collaboration
with our partners and their usecases.

Supported Operating Systems and Browsers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|software_prod_name| does not require local installation on your OS. You can
access it using your browser.  Thus, it does not requires any specific OS
version, as long as a graphical user interface and a web browser are available.

The supported browsers are as follows:

* Chrome\*
* Edge\*
* Safari\*
* Firefox\*

For the best |software_prod_name| experience, use the Chrome browser.
