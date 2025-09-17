Orch CLI User Guide
===================

The orch-cli tool is a binary executable that provides a command-line interface for managing the orchestration of edge infrastructure.
It allows users to perform various tasks related to the deployment and management of edge devices and services.

Download
^^^^^^^^

Ensure that you have ``oras`` available on your system or follow the instructions in the
`oras documentation <https://oras.land/docs/installation>`_ to install it.

The tool is made available in the public AWS* Elastic Container Registry. It can be pulled without any credentials using commands like below:

.. code-block:: bash

    oras pull registry-rs.edgeorchestration.intel.com/edge-orch/files/orch-cli:3.1

The package will be an archive which needs to be unpacked to access the binary named orch-cli. Together with the binary as part of the archive the source code and the package signatures are downloaded.

.. code-block:: bash

    tar xf orch-cli-package.tar.gz

The orch-cli binary can be verified using the `cosign software <https://docs.sigstore.dev/cosign/system_config/installation/>`_ and the provided public key and signature files.

.. code-block:: bash

    cosign verify-blob --key orch-cli.pub --signature orch-cli.sig orch-cli

To install the binary on Linux system copy the file to an install path (/usr/local/bin or equivalent):

.. code-block:: bash

    cp orch-cli /usr/local/bin

Building from source
^^^^^^^^^^^^^^^^^^^^

The orch-cli binary can be build from source. The source code is available in te `orch-cli GitHub repository <https://github.com/open-edge-platform/orch-cli>`_
To build the binary from source run the make target from top level directory:

.. code-block:: bash

    make build

The binary will be available at **./build/_output/orch-cli**, it can be installed on a Linux system using:

.. code-block:: bash

    make install

.. _endpoint-and-project-configuration:

Endpoint and project configuration 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The orch-cli is expected to communicate with an edge orchestrator's exposed endpoints.
The endpoints can be provided during each command run with --project and --api-endpoint flags or pre-set
to be used seamlessly across command usage. To configure for project and endpoint to be used automatically with every command run the config command:

.. code-block:: bash

    ./orch-cli config set api-endpoint https://api.<CLUSTER_FQDN>
    ./orch-cli config set project <PROJECT>

The orch-cli configuration file can be found at **~/.orch-cli/orch-cli.yaml**

User management
^^^^^^^^^^^^^^^

The CLI does not support user, project and organization creation. See:
:doc:`/shared/shared_gs_iam`

Authentication
^^^^^^^^^^^^^^

The orch-cli authenticates with the edge orchestrator by logging in to the orchestrator and obtaining a JWT token for further communication.
The JWT token is cached locally after logging in and valid for one hour. The network communication happens over HTTPS using TLS v1.3 and JWT token.
The token is removed on logout. User must logout and login after token expiry.

The keycloak service endpoint for containing the CLUSTER_FQDN of a given edge orchestrator must be provided during login - this is automatically
done if the api-endpoint was provided as per :ref:`endpoint-and-project-configuration` - otherwise add **--keycloak https://keycloak.<CLUSTER_FQDN>/realms/master** to below commands.

There is two login methods available:

#. **Interactive shell** - The default way to authenticate with Edge Orchestrator is to log in by providing username as first argument and using an interactive prompt.
    The prompt will ask for password. This is the recommended way to log in.
    .. code-block:: bash

        ./orch-cli login <USER>
        Enter Password:

 #. **Password argument** - Alternatively the password can be provided as a second command line argument - the recommended way is to use prompt based login above.
    When using this method, be cautious as the password may be exposed in the command line history. If using this method exporting the password as an environment variable is recommended.

    .. code-block:: bash

        ./orch-cli login <USER> <PASSWORD>

Running commands
^^^^^^^^^^^^^^^^

Generally the orch-cli commands follow this pattern for execution:

.. code-block:: bash

    ./orch-cli <verb> <noun> <subject(s)> --<options>

The endpoint and the project must be specified for most commands - this is automatically
done if the api-endpoint and project was provided as per :ref:`endpoint-and-project-configuration` - otherwise add below to commands:

.. code-block:: bash

    --api-endpoint https://api.<CLUSTER_FQDN>
    --project <PROJECT_NAME>

For the *list* commands the --verbose flag can be used to include additional information in the output.

Note that some of the *get* and *delete* commands require usage of resource ID instead of resource name due to the fact that some resources do not have unique names.

OS Profile Management
^^^^^^^^^^^^^^^^^^^^^

The tool allows for management of OS profiles.
For an example of a valid OS profile see the `infra-core repo <https://github.com/open-edge-platform/infra-core/blob/main/os-profiles/microvisor-nonrt.yaml>`_.

To create an OS profile run the create command with a path to a valid OS profile YAML file.

.. code-block:: bash

    ./orch-cli create osprofile newosprofile.yaml

To list OS profiles run the list command.

.. code-block:: bash

    ./orch-cli list osprofile

To get individual OS profile details run the get command.

.. code-block:: bash

    ./orch-cli get osprofile <OS_PROFILE_NAME>

To delete OS profiles run the delete command.

.. code-block:: bash

    ./orch-cli delete osprofile <OS_PROFILE_NAME>

Region Management
^^^^^^^^^^^^^^^^^

Regions must be created in order to create a site and in turn associate edge node with a site.
To manage the regions the following commands are provided.

To create a region run the create command with a region name as an argument and --type flag,
additionally optional --parent-region flag can be provided to create a sub-region.
Accepted region types are country/state/county/region/city.

.. code-block:: bash

    ./orch-cli create region <NAME> --type <TYPE>

.. code-block:: bash

    ./orch-cli create region <NAME> --type <TYPE> --parent-region <REGION_ID>

To list all regions and their associated sites run list command. --region flag provides for listing specific region level.

.. code-block:: bash

    ./orch-cli list region

To get information about specific region run the get command.

.. code-block:: bash

    ./orch-cli get region <REGION_ID>

To delete a region run the delete command.

.. code-block:: bash

    ./orch-cli delete region <REGION_ID>

Site Management
^^^^^^^^^^^^^^^

Sites must be created and allocated to regions in order to provision edge nodes.
To manage sites the following commands are provided.

To create a site run the create command with a site name as an argument and --region flag to specify the region.
Optional --longitude and --latitude flags can be provided to specify the site's location.

.. code-block:: bash

    ./orch-cli create site <NAME> --region <REGION_ID>

To list all sites and their associated regions run the list command.

.. code-block:: bash

    ./orch-cli list site

To get information about specific site run the get command.

.. code-block:: bash

    ./orch-cli get site <SITE_ID>

To delete a site run the delete command.

.. code-block:: bash

    ./orch-cli delete site <SITE_ID>

Custom Cloud Init Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An optional custom cloud init can be created and used by the edge node during provisioning.
To create this custom configuration a path to a valid cloud init YAML file must be provided.

For more information on the custom cloud init feature see:
:doc:`/user_guide/advanced_functionality/custom_config`

To create this custom configuration run create command.

.. code-block:: bash

    ./orch-cli create customconfig <NAME> <PATH> --file <PATH_TO_CLOUD_INIT_YAML>

To list all custom configurations run the list command.

.. code-block:: bash

    ./orch-cli list customconfig

To get information about specific custom configuration run the get command.

.. code-block:: bash

    ./orch-cli get customconfig <NAME>

To delete a custom configuration run the delete command.

.. code-block:: bash

    ./orch-cli delete customconfig <NAME>

Host Management
^^^^^^^^^^^^^^^

The host management functionality of the orch-cli allows for provisioning and managing host machines.
The creation of a host takes care of registering and associating the host with the appropriate resource automatically.
It allows for registration of edge node in bulk.
For details on how to prepare the input .csv file and advanced options to create the hosts see:
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration`

To create a host run the create command with the --import-from-csv flag pointing to .csv filepath.

.. code-block:: bash

    ./orch-cli create host --import-from-csv <PATH_TO_CSV_FILE>
To list all hosts run the list command.

.. code-block:: bash

    ./orch-cli list host

To get a specific host run get command.

.. code-block:: bash

    ./orch-cli get host <HOST_ID>

To delete a specific host run the delete command.

.. code-block:: bash

    ./orch-cli delete host <HOST_ID>

AMT Policy Management
^^^^^^^^^^^^^^^^^^^^^

AMT domain profiles are necessary components for managing AMT-enabled devices. They define the configuration and policies applied to these devices during provisioning and operation.

To create an AMT domain profile run the create command. User will be prompted for certificate password.

.. code-block:: bash

    ./orch-cli create amtprofile <NAME> --cert <PATH_TO_CERTIFICATE> --cert-format <CERT_FORMAT> --domain-suffix <DOMAIN>

To list all AMT domain profiles run the list command.

.. code-block:: bash

    ./orch-cli list amtprofile

To get information about a specific AMT domain profile run the get command.

.. code-block:: bash

    ./orch-cli get amtprofile <NAME>

To delete an AMT domain profile run the delete command.

.. code-block:: bash

    ./orch-cli delete amtprofile <NAME>

Help
^^^^

For help with any of the commands run the command with `--help`.

Additional commands:
^^^^^^^^^^^^^^^^^^^^

Additional commands are currently in place but in experimental stages.
See "./orch-cli <verb> <noun> --help" for current usage and capabilities of these commands.
