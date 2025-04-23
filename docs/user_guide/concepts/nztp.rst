Near Zero-Touch Provisioning (nZTP)
===================================

|software_prod_name|\  can install an Operating System (OS) on edge devices
with just a few clicks.

Once a device gets onboarded, the |software_prod_name|\  automatically installs
an OS on it without the need for additional configuration on the device.

This nZTP feature is enabled by default but you can disable it at installation
or run time.  See :doc:`/shared/shared_update_provider`. Also see the
:doc:`/api/edge_infra_manager` API.

You can either disable the nZTP feature, or keep it enabled **and** change the
default OS to one of the supported OSes described in
:doc:`/shared/shared_os_profile`. Also see the :doc:`/api/edge_infra_manager`
API.

.. list-table::
   :widths: 20, 20
   :header-rows: 1

   * - OS Profile Name
     - Description

   * - ubuntu-22.04-lts-generic
     - ubuntu-22.04-lts-generic is a pure Ubuntu\* 22.04.05 LTS system with
       Intel® Open Edge Platform agents.

   * - ubuntu-22.04-lts-generic-ext
     - ubuntu-22.04-lts-generic-ext is Ubuntu 22.04.05 LTS system with Edge
       Manageability Framework agents **and** additional packages such as
       out-of-tree Intel® GPU drivers.


   * - ubuntu-lenovo
     - ubuntu-lenovo is a pure Ubuntu 22.04.03 LTS system with edge node agents.

.. note::

  `ubuntu-lenovo` is available only when the integration with
  Lenovo\* Open Cloud Automation is enabled.

Each project may have its own automatic provisioning configuration, with
different default OS profiles specified.
