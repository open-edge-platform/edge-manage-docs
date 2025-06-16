RACADM on Windows PC
=====================================================

.. note::
   Because of limitations in Dell iDRAC it is not possible to load certificates
   through the iDRAC Web UI, so it must be done through the  RACADM tool. This
   section describes how this can be done on a Windows PC. The Linux based
   alternative is given in the next page
   :doc:`/user_guide/set_up_edge_infra/onboard_dell/racadm_on_linux`.

Install RACADM on Windows PC
----------------------------

#. On the local PC machine, download and install
   `Dell Remote Access Control Admin (RACADM) <https://www.dell.com/support/home/en-in/drivers/driversdetails?driverid=3d7tf&oscode=naa&productcode=poweredge-xr12>`_.
#. Launch the command prompt as Administrator.
#. Go to the RACADM CLI installation directory.

Download and import Certificates with Windows PC
------------------------------------------------

Importing certificates requires the iDRAC IP address.

#. On the Windows PC, launch the command prompt as an administrator.
#. View the previously downloaded certificates.

   .. code-block:: bash

      # View certificates
      racadm.exe -r {iDRAC IP address} -u [iDRAC username] -p [iDRAC password] bioscert view --all

   .. note::
            Ensure that you understand proxy settings in your network.
            If the ``curl`` or ``wget`` operation fails, verify the network proxy settings.

#. Import the certificates to the local PC. The certificates are in
   the directory created previously.

   .. note::
      Download all certificates necessary to configure the edge node and
      establish communication with |software_prod_name|\ . Edit the ``curl`` commands to add the CLUSTER_FQDN established when deploying |software_prod_name|\ .

      Navigate to a directory on the PC where the certificates will be stored.
      For example, you may want to store certificates in a ``/certificates/``
      directory. Go to that directory and run the ``curl`` commands below.

For iPXE and Hook Os, independent of final operating system:

.. code-block:: bash

   # Replace **CLUSTER_FQDN** with name of the domain of the orchestrator
   curl "https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/db.der" -O --insecure

``db.der`` is the public key to trust the `ipxe.efi` and `Hook Os` during the Secure Boot.

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

Finally, you can Upload the certificates to the server with the `racadm` command and reboot the device

.. note:: The `racadm` commands below issue a warning error:

    Security Alert: Certificate is invalid - Certificate is not signed by Trusted Third Party
    Continuing execution. Use -S option for racadm to stop execution on certificate-related err

    This is expected and the commands proceed with no issue.

.. code-block:: bash

    # Upload the BIOS Certificate
    racadm.exe -r {iDRAC IP address} - u [iDRAC username] -p [iDRAC password] bioscert import -t 2 -k 0 -f C:\\\<{path_to_certificates}\>\\db.der

    # Import BIOS Certificate (Only required for Edge Microvisor Toolkit in case Secure Boot is enabled)
    racadm.exe -r {iDRAC IP address} - u [iDRAC username] -p [iDRAC password] bioscert import -t 2 -k 0 -f C:\\\<{path_to_certificates}\>\\db-emt.der

    # Reboot or Power Cycle in this step only if USB assisted boot is used
    racadm.exe -r {iDRAC IP address} - u [iDRAC username] -p [iDRAC password] serveraction powercycle

.. note:: Skip this part for "USB-assisted boot" as there is no need to enroll the httpsbootcert.

``Full_server.crt`` is the provisioning certificate used during the HTTPs boot.

.. code-block:: bash

    # Replace **CLUSTER_FQDN** with the name of the domain of the orchestrator
    curl "https://tinkerbell-nginx.${CLUSTER_FQDN}/tink-stack/keys/Full_server.crt" -O --insecure

    # Full_server.crt - TLS authorization with cluster for HTTPS boot.
    racadm.exe -r {iDRAC IP address} - u [iDRAC username] -p [iDRAC password] httpsbootcert import -i 1 -f C:\\\<{path_to_certificates}\>\\Full_server.crt
    racadm.exe -r {iDRAC IP address} - u [iDRAC username] -p [iDRAC password] serveraction powercycle

Skip the :doc:`/user_guide/set_up_edge_infra/onboard_dell/racadm_on_linux` page
and go to :doc:`/user_guide/set_up_edge_infra/onboard_dell/https_assisted_boot`.

Acquiring the Edge Microvisor Toolkit repository URL path from Edge Orchestrator API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For Edge Microvisor Toolkit, the repository URL path of the certificate can
be acquired from Edge Orchestrator API with the following command, where `PROFILE_NAME`
is set to the OS Profile name you are trying to install (e.g. `microvisor-nonrt`, see
:doc:`/user_guide/advanced_functionality/view_os_profiles`):

.. note::

   To interact with Edge Orchestrator API, you must authenticate with a user who is
   part of the Edge Manager Group <./../../shared/shared_iam_groups.html#project-id-host-manager-group>`__ and obtain a JWT token
   used here as `JWT_TOKEN` variable (see `Obtaining a JSON Web Token (JWT) <./../../../shared/shared_gs_iam.html#obtaining-a-json-web-token-jwt>`__ for instructions).

   The variables `CLUSTER_FQDN` are `PROJECT_NAME` should be the same as used
   for obtaining the `JTW_TOKEN` value.

.. code-block:: bash

   export PROFILE_NAME=<OS Profile name to be installed>
   # example:
   # export PROFILE_NAME="microvisor-nonrt"
   export MICROVISOR_REPO_URL=$(curl -k -X GET https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/compute/os \
         -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT_TOKEN}" \
         | jq -r ".OperatingSystemResources[] | select(.profileName==\"${PROFILE_NAME}\") | .repoUrl" | sed 's/\.raw\.gz$//')
