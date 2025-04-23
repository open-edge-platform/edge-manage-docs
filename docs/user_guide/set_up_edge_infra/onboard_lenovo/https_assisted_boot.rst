Onboard Edge Node Using HTTPs-Assisted Boot
====================================================

You will need the HTTPS boot to onboard devices securely.

Prepare the Virtual Media
^^^^^^^^^^^^^^^^^^^^^^^^^^

Prepare the ISO image one time, so that it will be mounted as Virtual Media on the server used to load the keys and certificates needed for secure boot:

#. Use the following command to download the iPXE EFI file and secure boot certificates from the provided source.
   Replace CLUSTER_FQDN with the name of the domain that is used during installation.

   .. code-block:: shell

      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/db.der --no-check-certificate --no-proxy
      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/Full_server.crt --no-check-certificate --no-proxy

#. Prepare the ISO image using the following steps:

   .. code-block:: shell

      mkdir -p ISO
      mv db.der ISO/
      mv Full_server.crt ISO/
      mkisofs -R -J -o cerificate.iso ISO/

#. Load the ISO image as virtual media using the local remote disk on card (RDOC) functionality:

   .. image:: ../images/vmedia.png
      :alt: Load Virtual Media
      :width: 750px

#. Alternatively, the same content can be stored in an USB stick that will be automatically mounted by the Lenovo servers.

.. note::
   You can mount the same ISO image as virtual media into multiple edge nodes to do the provisioning flow; you do not have to prepare a new ISO image every time.

Enable HTTPs-Assisted Boot
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Boot the system in the `System Setup` by pressing the `F1` key.

#. Navigate to `System Settings` > `Network` > `Network Stack Settings`.

#. At `IPv4 HTTP Support` change from Disabled to Enabled:

   .. image:: ../images/httpv4-enabled.png
      :alt: HTTPv4 Enabled
      :width: 750px

#. Do the same for IPv6 if needed:

   .. image:: ../images/httpv4v6-enabled.png
      :alt: HTTP Enabled
      :width: 750px

#. Load the HTTPs boot certificate. Navigate to `System Settings` > `Network` > `Tls Auth Configuration` > `Server CA Confiuration` > `Enroll Cert`:

   .. image:: ../images/tls.png
      :alt: Enroll Certificate
      :width: 750px

#. Select the virtual media from the storage menu and load `Full_server.crt`.

#. Select `Commit Changes and Exit`. You can verify that the certificate was enrolled by trying to `Delete Certificate`.

Enable UEFI Secure Boot (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Secure Boot is disabled by default. To enable it, perform the following steps to configure secure boot in the BIOS. After that, see :doc:`/shared/shared_secure_boot_opt_in` to enable secure boot in |software_prod_name|\ .

#. To enable secure boot, navigate to `System Settings` > `Security` > `Secure Boot Configuration`. Enable secure boot and change the policy to Custom:

   .. image:: ../images/secure-boot.png
      :alt: Enable secure boot
      :width: 750px

#. Append the `db.der` public key through the `Secure Boot Custom Policy` page:

   .. image:: ../images/add-db.png
      :alt: Append db.der
      :width: 750px

#. Save and reboot the node in System Setup.

#. Reset the trusted platform module hierarchy and clear the trusted platform module by navigating to `System Settings`, `Security`, `Secure Boot Configuration`, `TPM`, `TPM2`. Select `Clear` in the `TPM2 Operation` dialog:

   .. image:: ../images/clear-tpm.png
      :alt: Clear TPM
      :width: 750px

#. Save and reboot the node in System Setup.

HTTP Boot Option
^^^^^^^^^^^^^^^^^

#. To create the HTTP boot option, navigate to `System Settings` > `Network` > `HTTP Boot Configuration`. Select the interface that has upstream connectivity with |software_prod_name| \ . Create a boot option:

   .. image:: ../images/boot-option.png
      :alt: Boot Option
      :width: 750px

#. Set **Boot URI** to ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi``. This value is defined during installation of |software_prod_name|\ .

   .. note:: Replace CLUSTER_FQDN with the domain name of |software_prod_name|\ .

#. Save and reboot the node in System Setup.

#. Select UEFI HTTP from the one-time boot option:

   .. image:: ../images/start-options.png
      :alt: Start Options
      :width: 750px

The system now boots through the iPXE environment. The next steps are in
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard_common`.
