Onboard Edge Node ASUS\* IoT PE3000G System
==============================================================

.. note:: Before reading this guide, make sure you meet :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/asus_prerequisites`.


Edge Node onboarding securely configures edge nodes into the
|software_prod_name| service. The edge nodes, or hosts in the
UI, can be configured and fully provisioned, lifecycle managed, and added to
clusters for workload deployment.

.. _prepare_usb_drive:

Prepare USB Drive
-----------------------------

Prepare the USB drive one time, so that the ASUS platform can use the USB-based
boot to download the iPXE image. Use any Linux based machine to perform the following steps:

.. note::
         Ensure that you understand proxy settings in your network.
         If the ``curl`` or ``wget`` operation fails, verify the network proxy settings.

#. Run following command to find the device identifier for the connected USB drive.

   .. code-block:: shell

      lsblk --output NAME,TYPE,TRAN | grep disk| grep usb | awk '{print $1}'

   .. note::
      The output of the above command is the USB device identifier. If the identifier is different from sdb, e.g. sdc then In any of the commands below where /dev/sdb is found, sdb it needs to be replaced with the correct device identifier, e.g. /dev/sdc

#. Use the following command to download the iPXE EFI.
   Replace CLUSTER_FQDN with the name of the domain that is used during installation.


   .. code-block:: shell

      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/signed_ipxe.efi --no-check-certificate --no-proxy

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
      `Acquiring the Edge Microvisor Toolkit repository URL path from Edge Orchestrator API`_
      section.

      Choose the correct values for the command and replace them in the variables as per the example and resulting command below. Make sure that resulting HTTP status is successful.

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

   #. Upload certificate to BIOS

#. Clear disk partition table.

   .. code-block:: shell

      sudo dd if=/dev/zero of=/dev/sdb bs=512 count=1 conv=notrunc

#. Initialize GPT Partition Table.

   .. code-block:: shell

      echo -e "g\nw\nY\n" | sudo gdisk /dev/sdb

#. Format the USB drive.

   .. code-block:: shell

      sudo mkfs.fat -F32 /dev/sdb

#. Mount USB Drive.

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive
      sudo mount /dev/sdb /tmp/efidrive

#. Create Boot Directory and copy the ``signed_ipxe.efi``, ``db.der`` and ``db-emt.der``
   to the drive.

   .. code-block:: shell

      sudo mkdir -p /tmp/efidrive/efi/boot
      sudo cp signed_ipxe.efi /tmp/efidrive/efi/boot/bootx64.efi
      sudo cp *.der /tmp/efidrive/efi/boot/

#. Unmount the USB drive from the Linux machine.

   .. code-block:: shell

      sudo umount /dev/sdb

.. note::
   - Replace /dev/sdb with the appropriate device identifier for your USB drive.
   - Replace CLUSTER_FQDN with the name of the domain that is used during installation.
   - If Secure Boot is enabled, enroll the certificates into BIOS as mentioned
     in the UEFI Secure Boot section.
   - The same USB drive can be plugged into multiple Edge Nodes to perform the
     provisioning flow, there is no need to prepare the USB drive every time.
   - Remember to unplug the USB stick once the Edge Node is provisioned.

.. include:: ../../prerequisites/acquire_emt_repo.rst

Set Boot Order Priorities:
--------------------------

.. note: The ASUS platform has boot-override option that overrides user-configured BIOS settings. Ensure that you configure only the required BIOS entries and disable other options.

#. Go to BIOS Setup > Boot > UEFI NETWORK Drive BSS Priorities.

#. Disable unwanted boot options:

   .. figure:: ../../../images/disable_unwanted_boot.png
      :scale: 100%
      :alt: Disable unwanted boot options

#. Choose the correct device in "Boot Option #1" with the configured HTTP device name:

   .. figure:: ../../../images/fixed_bootorder_settings.png
      :scale: 100%
      :alt: Boot order settings

#. Go to Boot > FIXED BOOT ORDER Priorities > Boot Option #1.

#. Choose the Second Boot Option as Hard Disk and disable other boot options if they are enabled:

   .. figure:: ../../../images/fixed_bootorder_settings.png
      :scale: 100%
      :alt: Boot order settings

#. Press F4 to Save & Exit the configuration.

Enable UEFI Secure Boot (Optional)
------------------------------------

#. Connect the USB drive to Edge node.
#. Press :kbd:`Del` to enter into BIOS setup.
#. Go to **BIOS Setup** > **Security** > **Key Management**.
#. Ensure the following are set to ``Factory`` in ``Key Source``:

   * Platform Key (PK)
   * Key Exchange Keys (KEK)
   * Authorized Signatures (db-emt)
   * Forbidden Signature (dbx)

#. Update the keys to ``Factory`` mode to enable modification of the
   Secure Boot option.
#. Go to **BIOS Setup** > **Security** > **Enable Secure Boot**
   > Set ``Custom`` Secure Boot Mode.
#. Go to **Security** > **Key Management** and append the
   ``Authorized Signature`` with ``db.der`` and ``db-emt.der``.
#. Press :kbd:`F4` to save and exit configuration.

Provision the Edge Node
------------------------------------

#. Press :kbd:`Del` to enter into BIOS setup.
#. Go to **Main** > **Exit**  and select the USB drive from the list.

iPXE starts downloading and starts the chain loading process. The next steps are in
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`.

Troubleshooting and Recommendations
------------------------------------

In a few Asus/NUC12 Pro platforms, it is observed that USB-based boot is not
working when the Network boot option is disabled in BIOS.
Expected to enable Network/HTTPS boot in BIOS, when performing the USB boot.

Intel also recommends to disable the `AMT` configuration in the
ASUS\* IoT PE3000G System.
Refer to this guide -
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/usb_boot/usb_boot_asus_system/configure_amt_asus`.
