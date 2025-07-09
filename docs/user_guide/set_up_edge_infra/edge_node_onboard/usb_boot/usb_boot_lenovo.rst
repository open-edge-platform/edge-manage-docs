Onboard Lenovo ThinkEdge Using USB-Assisted Boot
================================================

.. note:: Before reading this guide, make sure you meet :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/lenovo_prerequisites`.

You can use USB-assisted boot to load the iPXE image.

Prepare the USB drive one time, so that the platform can use the USB-assisted boot to download the iPXE image. Use any Linux-based machine to do the following:

#. Run the following command to find the device identifier for the connected USB drive:

   .. code-block:: shell

      lsblk --output NAME,TYPE | grep disk

#. Run the following command to download the iPXE EFI file from the
   provided source:

   .. code-block:: shell

      wget https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi --no-check-certificate --no-proxy

#. Use the following command to download the secure boot certificate for iPXE and Hook Os, independent of final OS.
   This is step is not required if **Secure Boot** is not enabled.
   Replace CLUSTER_FQDN with the name of the domain that is used during installation.

   .. code-block:: shell

      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/db.der --no-check-certificate --no-proxy

   For Edge Microvisor Toolkit, if Secure Boot (SB) is enabled (Not required for Ubuntu\* OS):

   #. Following you need to download the `db-emt.der` file from Release Service.

      Repository URL path of Edge Microvisor Toolkit can be found by looking at the
      :doc:`OS Profile </user_guide/advanced_functionality/view_os_profiles>` you are trying to
      install and copying manually the `Repository URL` value without `raw.gz` suffix.
      Alternatively, it can be acquired using the Edge Orchestrator API - see the
      :ref:`acquire_emt_repo` section.

      Choose the correct values for the command and replace them in the variables as per the example and resulting following command. Make sure that resulting HTTP status is successful.

      .. code-block:: bash

         export FILES_RS_URL=<Files Release Service URL>
         export MICROVISOR_REPO_URL=<Repository URL path to OS Image without .raw.gz extension>
         export OS_IMAGE_VERSION=<Microvisor Image Version>

         # Following is an example of the variables and the expanded resulting command:
         # export FILES_RS_URL=files-rs.edgeorchestration.intel.com
         # export OS_IMAGE_VERSION=<Microvisor Image Version>
         # export MICROVISOR_REPO_URL=files-edge-orch/repository/microvisor/non_rt/edge-readonly-$OS_IMAGE_VERSION-signed
         # Command to download the microvisor der file
         wget https://$FILES_RS_URL/$MICROVISOR_REPO_URL.der

         # A real example with no variables
         # wget https://files-edge-orch/repository/microvisor/non_rt/edge-readonly-3.0.20250324.1008.der -o db-emt.der --write-out "\nHTTP Status: %{http_code}\n"

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
      sudo cp *.der /tmp/efidrive/efi/boot/

#. Unmount the USB drive from the Linux machine:

   .. code-block:: shell

      sudo umount /dev/sdb

.. note::

   - Replace /dev/sdb with the appropriate device identifier for your USB drive.
   - Replace CLUSTER_FQDN with the name of the domain that is used during installation.
   - You can plug the same USB drive into multiple edge nodes to do the
     provisioning flow; you do not have to prepare the USB drive every time.

.. include:: ../prerequisites/acquire_emt_repo.rst

Enable UEFI Secure Boot (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Secure boot is disabled by default. To enable it, follow the steps to configure secure boot in the BIOS. After that,
see :doc:`/shared/shared_secure_boot_opt_in` to enable secure boot in |software_prod_name|\ .

#. To enable the secure boot, navigate to `System Settings` > `Security` > `Secure Boot Configuration`. Enable the secure boot and change the policy to Custom:

   .. image:: ../../images/secure-boot.png
      :alt: Enable secure boot
      :width: 750px

#. Append the `db.der` and `db-emt.der` public key through the `Secure Boot Custom Policy` page:

   .. image:: ../../images/add-db.png
      :alt: Append db.der
      :width: 750px

#. Save and reboot the node in System Setup.

#. Reset the trusted platform module hierarchy and clear the trusted platform module.
   Navigate to `System Settings` > `Security` > `Secure Boot Configuration` > `TPM` > `TPM2`. Select `Clear` in the `TPM2 Operation` dialog:

   .. image:: ../../images/clear-tpm.png
      :alt: Clear TPM
      :width: 750px

#. Save and reboot the node in System Setup.

USB Boot Option
^^^^^^^^^^^^^^^

#. Select the one-time boot option:

   .. image:: ../../images/start-options.png
      :alt: Start Options
      :width: 750px

#. Select USB and confirm:

   .. image:: ../../images/usb-boot.png
      :alt: USB Boot
      :width: 750px

iPXE starts downloading and starts the chain loading process. The next steps are in
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`.
