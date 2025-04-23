Onboard Edge Node Using USB-Assisted Boot
=====================================================

You can use USB-assisted boot to load the iPXE image.

Prepare the USB drive one time, so that the platform can use the USB-assisted boot to download the iPXE image. Use any Linux-based machine to do the following:

#. Run following command to find the device identifier for the connected USB drive:

   .. code-block:: shell

      lsblk --output NAME,TYPE | grep disk

#. Run the following command to download the iPXE EFI file from the
   provided source:

   .. code-block:: shell

      wget https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi --no-check-certificate --no-proxy

#. Clear disk partition table:

   .. code-block:: shell

      sudo dd if=/dev/zero of=/dev/sdb bs=512 count=1 conv=notrunc

#. Initialize the GUID partition table (GPT):

   .. code-block:: shell

      echo -e "g\nw\nY\n" | sudo gdisk /dev/sdb

#. Format the USB drive:

   .. code-block:: shell

      sudo mkfs.fat -F32 /dev/sdb

#. Mount the USB drive:

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive
      sudo mount /dev/sdb /tmp/efidrive

#. Create a boot Directory and copy ``signed_ipxe.efi`` to the drive:

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive/efi/boot
      sudo cp signed_ipxe.efi /tmp/efidrive/efi/boot/bootx64.efi

#. Unmount the USB drive from the Linux machine:

   .. code-block:: shell

      sudo umount /dev/sdb

.. note::

   - Replace /dev/sdb with the appropriate device identifier for your USB drive.
   - Replace CLUSTER_FQDN with the name of the domain that is used during installation.
   - You can plug the same USB drive into multiple edge nodes to do the
     provisioning flow; you do not have to prepare the USB drive every time.

Enable UEFI Secure Boot (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Secure boot is disabled by default. To enable it, follow the steps below to configure secure boot in the BIOS. After that, see :doc:`/shared/shared_secure_boot_opt_in` to enable secure boot in |software_prod_name|\ .

#. To enable the secure boot, navigate to `System Settings` > `Security` > `Secure Boot Configuration`. Enable the secure boot and change the policy to Custom:

   .. image:: ../images/secure-boot.png
      :alt: Enable secure boot
      :width: 750px

#. Append the `db.der` public key through the `Secure Boot Custom Policy` page:

   .. image:: ../images/add-db.png
      :alt: Append db.der
      :width: 750px

#. Save and reboot the node in System Setup.

#. Reset the trusted platform module hierarchy and clear the trusted platform module. Navigate to `System Settings` > `Security` > `Secure Boot Configuration` > `TPM` > `TPM2`. Select `Clear` in the `TPM2 Operation` dialog:

   .. image:: ../images/clear-tpm.png
      :alt: Clear TPM
      :width: 750px

#. Save and reboot the node in System Setup.

USB Boot Option
^^^^^^^^^^^^^^^

#. Select the one-time boot option:

   .. image:: ../images/start-options.png
      :alt: Start Options
      :width: 750px

#. Select USB and confirm:

   .. image:: ../images/usb-boot.png
      :alt: USB Boot
      :width: 750px

iPXE starts downloading and starts the chain loading process. The next steps are in
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common`.
