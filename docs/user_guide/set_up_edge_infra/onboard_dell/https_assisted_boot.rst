Onboard Edge Node Using HTTPs-Assisted Boot
====================================================

.. note:: This HTTPS option is mutually exclusive with the USB assisted approach.

Identify NIC
------------

#. On the edge node, open iDRAC GUI.
#. Go to **System** > **Overview** > **Network Devices**.
#. Identify the device with a Link Status of ``Up``. Note the details of this device for the next steps.

Configure UEFI for HTTPS boot
-----------------------------

HTTPS boot is required to securely onboard devices.

#. In iDRAC, go to **Configuration** > **BIOS Settings** > **Network Settings**.
#. Set **HTTP Device1** to **Enabled**.
#. Go to **HTTP Device1 Settings** > **Interface** and choose the NIC identified previously.
#. Set the **URI** to ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi``
   path. This value is defined during installation of |software_prod_name|.

   .. note:: Replace CLUSTER_FQDN with the name of the domain of the Edge Orchestrator.

#. In **TLS Authentication Configuration**, set **TLS Authentication Mode**
   to ``One Way``.
#. Click **Apply** and then **Reboot**.

Set UEFI HTTPS boot through iDRAC
---------------------------------

#. Launch iDRAC Virtual Console.
#. Select **Boot menu**.
#. Select **UEFI HTTP boot**.
#. Go to **Power** > **Reset System (warm boot)**.

Skip the :doc:`/user_guide/set_up_edge_infra/onboard_dell/usb_assisted_boot`
page and go to :doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common` next.
