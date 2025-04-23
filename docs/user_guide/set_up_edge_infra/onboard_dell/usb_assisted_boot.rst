Onboard Edge Node Using USB-Assisted Boot
=====================================================

If the BIOS does not support HTTPS boot, you can use the USB-assisted boot solution to load the iPXE image.

.. note:: This USB option is mutually exclusive with the HTTPS-assisted approach.

Prepare the USB drive one time, so that the platform can use the USB-based
boot to download the iPXE image. Use any Linux\*-based machine to do the following:

#. Run following command to find the device identifier for the connected
   USB drive:

   .. code-block:: shell

      lsblk --output NAME,TYPE,TRAN | grep disk| grep usb | awk '{print $1}'

   .. note::
      The output of the above command is the USB device identifier. If the identifier is different from `sdb`, for example, `sdc`, in any of the following commands where `/dev/sdb`  is found, replace `sdb` with the correct device identifier, for example, `/dev/sdc`.

#. Use the following command to download the iPXE EFI file from the
   provided source:

   .. code-block:: shell

      wget https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi --no-check-certificate --no-proxy

  .. note:: Replace CLUSTER_FQDN with the FQDN of the Edge Orchestrator.

#. Clear the disk partition table:

   .. code-block:: shell

      sudo dd if=/dev/zero of=/dev/sdb bs=512 count=1 conv=notrunc

#. Initialize the GPT partition table:

   .. code-block:: shell

      echo -e "g\nw\nY\n" | sudo gdisk /dev/sdb

#. Format the USB drive:

   .. code-block:: shell

      sudo mkfs.fat -F32 /dev/sdb

#. Mount the USB drive:

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive
      sudo mount /dev/sdb /tmp/efidrive

#. Create boot directory and copy ``signed_ipxe.efi`` to the drive:

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive/efi/boot
      sudo cp signed_ipxe.efi /tmp/efidrive/efi/boot/bootx64.efi

#. Unmount the USB drive from the Linux machine:

   .. code-block:: shell

      sudo umount /dev/sdb


.. note::
   - Replace /dev/sdb with the appropriate device identifier for your USB drive.
   - Replace CLUSTER_FQDN with the name of the domain that is used during installation.
   - If secure boot is enabled, enroll the certificates into BIOS as mentioned in the
     :doc:`UEFI Secure Boot </user_guide/set_up_edge_infra/onboard_dell/prepare_idrac>` section.
   - You can plug in the same USB drive into multiple edge nodes to do the
     provisioning flow; you do not have to prepare the USB drive every time.
   - Ensure to unplug the USB stick once the edge node is provisioned.

Set USB Boot through iDRAC
----------------------------------

#. In iDRAC, go to **Configuration** > **Virtual Media** > **Attached Media**.
#. Set the drop-down option to **Enabled**.
#. Set the Boot Order: In the Boot Order section, move the USB option to the top of the list to prioritize USB boot over UEFI HTTP boot.
#. Save Changes: Click Apply to save the changes. Reboot the system for changes to reflect.

The system now boots through the iPXE environment.
