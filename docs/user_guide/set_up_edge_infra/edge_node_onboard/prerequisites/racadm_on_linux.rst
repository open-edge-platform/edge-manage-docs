RACADM on Linux\* PC
-----------------------

.. note::
   Because of limitations in Integrated Dell* Remote Access Controller (iDRAC), it is not possible
   to load certificates
   through the iDRAC Web UI, so it must be done through the RACADM tool. This
   section describes how this can be done on the Linux PC. See the alternative approach
   using a Windows\* PC at :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/racadm_on_windows`.


Install RACADM on Linux PC
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On a local Linux machine, download and install
   `iDRAC tools <https://dl.dell.com/FOLDER09667202M/1/Dell-iDRACTools-Web-LX-11.1.0.0-5294_A00.tar.gz>`_.
#. Use the ``readme.txt`` file in the iDRAC installation folder
   to install RACADM.
#. Run the following commands in a terminal.

   .. code-block:: bash

      # Install wget if not already installed

      sudo apt-get update
      sudo apt-get install wget
      # Install LibSSL-dev package if not already installed on the host machine.
      sudo apt-get install libssl-dev

      NODE_BMC_IP="Your iDRAC IP"
      NODE_BMC_USER="Your iDRAC username"
      NODE_BMC_PWD="Your iDRAC password"

      CLUSTER_FQDN="Your cluster FQDN established when deploying Edge Orchestrator"
      TINK_FQDN=tinkerbell-nginx.${CLUSTER_FQDN}

      # RACADM login
      LOGIN="-r ${NODE_BMC_IP} -u ${NODE_BMC_USER} -p ${NODE_BMC_PWD} --nocertwarn"

Import Certificates with Linux PC
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First you must need to download all the certificates to be uploaded.

For iPXE and Hook Os, independent of final operating system:

.. note::
      Ensure that you understand proxy settings in your network.
      If the ``curl or ``wget`` operation fails, verify the network proxy settings.

.. code-block:: bash

   wget https://"${TINK_FQDN}"/tink-stack/keys/db.der  --no-check-certificate -O "db.der"

``db.der`` is the public key to trust the `ipxe.efi` and `Hook Os` during the Secure Boot.

For Edge Microvisor Toolkit, if Secure Boot (SB) is enabled (Not required for Ubuntu):

#. Then, you must download the `db-emt.der` file from the Release Service.

   Repository URL path of Edge Microvisor Toolkit can be found by looking at the
   :doc:`OS Profile </user_guide/advanced_functionality/view_os_profiles>` you are trying to
   install and copying manually the `Repository URL` value without `raw.gz` suffix.
   microvisor image version `osImageVersion` can be fetched from microvisor profile defined in os profile
   Alternatively, it can be acquired using the Edge Orchestrator API - see the
   :ref:`acquire_emt_repo` section.

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

Finally, you can upload the certificates to the server with the `racadm` command and reboot the device

.. note:: The `racadm` commands issue a warning error as follows:

    Security Alert: Certificate is invalid - Certificate is not signed by Trusted Third Party
    Continuing execution. Use -S option for racadm to stop execution on certificate-related err

    This is expected and the commands proceed with no issue.

.. code-block:: bash

   # Import BIOS Certificate for iPXE and HookOS
   racadm ${LOGIN} bioscert import -t 2 -k 0 -f db.der

   # Import BIOS Certificate (Only required for Edge Microvisor Toolkit in case Secure Boot is enabled)
   racadm ${LOGIN} bioscert import -t 2 -k 0 -f db-emt.der

   # Reboot or Power Cycle in this step only if USB assisted boot is used
   racadm ${LOGIN} serveraction powercycle

``Full_server.crt`` is the provisioning certificate using during the HTTPs boot.

.. note:: Skip the following part for "USB assisted boot" as there is no need to enroll the httpsbootcert.

.. code-block:: bash

    wget https://"${TINK_FQDN}"/tink-stack/keys/Full_server.crt  --no-check-certificate -O "full_server.crt"

    # Import HTTPS Boot Certificate:
    racadm ${LOGIN} httpsbootcert import -i 1 -f full_server.crt

    # Reboot or Power Cycle
    racadm ${LOGIN} serveraction powercycle
