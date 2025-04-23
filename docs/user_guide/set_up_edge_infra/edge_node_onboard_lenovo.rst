Onboard Edge Node: Lenovo\* ThinkEdge Servers
=============================================

Edge Onboarding securely configures the Lenovo\* ThinkSystem SE350 Edge Server, Lenovo ThinkEdge SE360 V2 Edge Server, and Lenovo ThinkEdge SE450 Edge Server into |software_prod_name|\ .

.. note::

   - You can use a USB stick as storage for HTTPs boot or to load the certificates into the UEFI or BIOS.
   - In most cases, you can do the same operations described in the following
     `instructions <https://pubs.lenovo.com/lxpm/UEFI_setup>`_,
     with Lenovo\* XClarity Provisioning Manager.

You can then configure, provision, lifecycle manage, and add the edge nodes or hosts in the UI to clusters for workload deployment. The main sections are as follows:

* :doc:`/user_guide/set_up_edge_infra/onboard_lenovo/prerequisites`
* :doc:`/user_guide/set_up_edge_infra/onboard_lenovo/setup_loca`
* :doc:`/user_guide/set_up_edge_infra/onboard_lenovo/https_assisted_boot`
* :doc:`/user_guide/set_up_edge_infra/onboard_lenovo/usb_assisted_boot`
* :doc:`/user_guide/set_up_edge_infra/onboard_lenovo/loca_assisted_boot`

.. note:: You can only use one of the above options (HTTPs, USB, or LOC-A) to onboard Lenovo ThinkEdge servers during the edge node configuration cycle:

.. toctree::
   :hidden:

   onboard_lenovo/prerequisites
   onboard_lenovo/setup_loca
   onboard_lenovo/https_assisted_boot
   onboard_lenovo/usb_assisted_boot
   onboard_lenovo/loca_assisted_boot

