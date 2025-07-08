Onboard Lenovo ThinkEdge Using HTTPs-Assisted Boot
==================================================

You will need the HTTPS boot to onboard devices securely.

Prepare the Virtual Media
^^^^^^^^^^^^^^^^^^^^^^^^^^

Prepare the ISO image one time, so that it will be mounted as Virtual Media on the server used to load the keys and certificates needed for secure boot:

#. Use the following command to download the iPXE EFI file and secure boot certificates from the provided source.
   Replace CLUSTER_FQDN with the name of the domain that is used during installation.

   .. code-block:: shell

      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/Full_server.crt --no-check-certificate --no-proxy

#. Use the following command to download the secure boot certificate for iPXE and Hook Os, independent of final OS.
   This is step is not required if **Secure Boot** is not enabled.
   Replace CLUSTER_FQDN with the name of the domain that is used during installation.

   .. code-block:: shell

      wget https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/db.der --no-check-certificate --no-proxy

   For Edge Microvisor Toolkit, if Secure Boot (SB) is enabled (Not required for Ubuntu):

   #. Then, you must download the `db-emt.der` file from Release Service.

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

#. Prepare the ISO image using the following steps:

   .. code-block:: shell

      mkdir -p ISO
      mv *.der ISO/
      mv Full_server.crt ISO/
      mkisofs -R -J -o certificate.iso ISO/

#. Load the ISO image as virtual media using the local remote disk on card (RDOC) functionality:

   .. image:: ../../images/vmedia.png
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

   .. image:: ../../images/httpv4-enabled.png
      :alt: HTTPv4 Enabled
      :width: 750px

#. Do the same for IPv6 if needed:

   .. image:: ../../images/httpv4v6-enabled.png
      :alt: HTTP Enabled
      :width: 750px

#. Load the HTTPs boot certificate. Navigate to `System Settings` > `Network` > `Tls Auth Configuration` > `Server CA Configuration` > `Enroll Cert`:

   .. image:: ../../images/tls.png
      :alt: Enroll Certificate
      :width: 750px

#. Select the virtual media from the storage menu and load `Full_server.crt`.

#. Select `Commit Changes and Exit`. You can verify that the certificate was enrolled by trying to `Delete Certificate`.

Acquiring the Edge Microvisor Toolkit repository URL path from Edge Orchestrator API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Edge Microvisor Toolkit, the repository URL path of the certificate can
be acquired from Edge Orchestrator API with the following command, where `PROFILE_NAME`
is set to the OS Profile name you are trying to install (e.g. `microvisor-nonrt`, see
:doc:`/user_guide/advanced_functionality/view_os_profiles`):

.. note::

   To interact with Edge Orchestrator API, you must authenticate with a user who is
   part of the `Host Manager Group <./../../shared/shared_iam_groups.html#project-id-host-manager-group>`__ and obtain a JSON Web Token (JWT)
   used here as `JWT_TOKEN` variable (see `Obtaining a JSON Web Token (JWT) <./../../shared/shared_gs_iam.html#obtaining-a-json-web-token-jwt>`__ for instructions).

   The variables `CLUSTER_FQDN` are `PROJECT_NAME` should be the same as used
   for obtaining the `JTW_TOKEN` value.

.. code-block:: bash

   export PROFILE_NAME=<OS Profile name to be installed>
   # example:
   # export PROFILE_NAME="microvisor-nonrt"
   export MICROVISOR_REPO_URL=$(curl -k -X GET https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/compute/os \
         -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT_TOKEN}" \
         | jq -r ".OperatingSystemResources[] | select(.profileName==\"${PROFILE_NAME}\") | .repoUrl" | sed 's/\.raw\.gz$//')

Enable UEFI Secure Boot (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Secure Boot is disabled by default. To enable it, perform the following steps to configure secure boot in the BIOS. After that,
see :doc:`/shared/shared_secure_boot_opt_in` to enable secure boot in |software_prod_name|\ .

#. To enable secure boot, navigate to `System Settings` > `Security` > `Secure Boot Configuration`. Enable secure boot and change the policy to Custom:

   .. image:: ../../images/secure-boot.png
      :alt: Enable secure boot
      :width: 750px

#. Append the `db.der` and `db-emt.der` public keys through the `Secure Boot Custom Policy` page:

   .. image:: ../../images/add-db.png
      :alt: Append db.der
      :width: 750px

#. Save and reboot the node in System Setup.

#. Reset the trusted platform module hierarchy and clear the trusted platform module by navigating
   to `System Settings`, `Security`, `Secure Boot Configuration`, `TPM`, `TPM2`. Select `Clear` in the `TPM2 Operation` dialog:

   .. image:: ../../images/clear-tpm.png
      :alt: Clear TPM
      :width: 750px

#. Save and reboot the node in System Setup.

HTTP Boot Option
^^^^^^^^^^^^^^^^^

#. To create the HTTP boot option, navigate to `System Settings` > `Network` > `HTTP Boot Configuration`.
   Select the interface that has upstream connectivity with |software_prod_name| \ . Create a boot option:

   .. image:: ../../images/boot-option.png
      :alt: Boot Option
      :width: 750px

#. Set **Boot URI** to ``https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi``. This value is defined during installation of |software_prod_name|\ .

   .. note:: Replace CLUSTER_FQDN with the domain name of |software_prod_name|\ .

#. Save and reboot the node in System Setup.

#. Select UEFI HTTP from the one-time boot option:

   .. image:: ../../images/start-options.png
      :alt: Start Options
      :width: 750px

The system now boots through the iPXE environment. The next steps are in
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/common`.
