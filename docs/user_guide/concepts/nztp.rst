Near Zero-Touch Provisioning (nZTP)
===================================

|software_prod_name|\  can install an Operating System (OS) on edge devices
with just a few clicks.

Once a device gets onboarded, the |software_prod_name|\  automatically installs
an OS (the default OS) on it without the need for additional configuration on
the device from the user.

This nZTP feature is disabled by default but you can enable it at installation
or run time.  See :doc:`/shared/shared_update_provider`. Also see the
:doc:`/api/edge_infra_manager` API.

You can either disable the nZTP feature, or change the default OS to one of the
supported OSes described in :doc:`/shared/shared_os_profile`.

Each project may have its own automatic provisioning configuration, with
different default OS profiles specified.
