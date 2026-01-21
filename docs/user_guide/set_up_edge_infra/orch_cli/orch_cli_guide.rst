Orch CLI User Guide
===================

The orch-cli tool is a binary executable that provides a command-line interface for managing the orchestration of edge infrastructure.
It allows users to perform various tasks related to the deployment and management of edge devices and services.

.. _cli-download:

Download
^^^^^^^^

Ensure that you have ``oras`` available on your system or follow the instructions in the
`oras documentation <https://oras.land/docs/installation>`_ to install it.

The tool is made available in the public AWS* Elastic Container Registry. It can be pulled without any credentials using commands like below:

.. code-block:: bash

    oras pull registry-rs.edgeorchestration.intel.com/edge-orch/files/orch-cli:v2025.2.0

The package will be an archive which needs to be unpacked to access the binary named orch-cli.
Together with the binary as part of the archive the source code and the package signatures are downloaded.

.. code-block:: bash

    tar xf orch-cli-package.tar.gz

The orch-cli binary can be verified using the `cosign software <https://docs.sigstore.dev/cosign/system_config/installation/>`_ and the provided public key and signature files.

.. code-block:: bash

    cosign verify-blob \
            --bundle "cosign.bundle.json" \
            --certificate-identity-regexp "https://github.com/open-edge-platform/.*/.*/.*\\.yml@.*" \
            --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
            orch-cli

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

The orch-cli does not support Identity and Access Management at Keycloak level. To manage Keycloak users and assign roles/groups See:
:doc:`/shared/shared_gs_iam`

The organization and project management is supported by the orch-cli.

The Keycloak's `kcadm Admin CLI <https://www.keycloak.org/docs/latest/server_admin/index.html#admin-cli>`_ can be used to achieve terminal based user management along with the orch-cli's organization/project creation.

The combined usage of kcadm and orch-cli to initially set up the IAM/tenancy can be found at:
:doc:`/shared/shared_ht_iam_mt_cli`

.. note::
    
     Certain modular deployments/workflows of Edge Manageability Framework or it's components may not include support for 
     multitenancy - in those cases a default user/tenant is created and configuring user management may not be needed.

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

Autocompletion
^^^^^^^^^^^^^^^

The orch-cli supports autocompletion for the CLI commands. To enable autocompletion in bash shell create the completion file and reload the terminal:

    .. code-block:: bash

        ./orch-cli completion bash | sudo tee /etc/bash_completion.d/orch-cli
        source ~/.bashrc

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

Dynamic EMF feature support within CLI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The orch-cli tool supports dynamic feature detection based on the connected Edge Orchestrator's capabilities exposed by the Edge Orchestrator's "Component Status" service.
When a command is executed the tool queries the orchestrator for supported features and only presents the commands that are supported.
This allows the same tool to be used across different versions and deployments of Edge Orchestrator without compatibility issues.

.. note::
    
     For the dynamic feature detection to work the Edge Orchestrator must have the "Component Status" service enabled and accessible.
     Previous versions of Edge Orchestrator may not have this service available - in those cases the tool will assume all features are supported.

Currently the CLI dynamically enables/disables groups of commands based on the following features criteria:

- Multitenancy support - organization and project management commands.
- Host onboarding support - host onboarding commands.
- Host provisioning support - host provisioning commands and management of resources related to provisioning.
- Out-of-band (OOB) support - AMT profile management commands and AMT/vPRO related features.
- Day 2 OS Update support - day 2 OS update commands.
- Cluster management support - cluster management commands.
- Application management support - application management commands.

To get the current version of the CLI and the connected Edge Orchestrator run the following command:

.. code-block:: bash

    ./orch-cli version

To get the list of supported features of the connected Edge Orchestrator run the following command:

.. code-block:: bash

    ./orch-cli list features

To get information about which specific commands are enabled/disabled based on the connected Edge Orchestrator's capabilities run the following command:

.. code-block:: bash

    ./orch-cli list features --show-disabled --show-enabled

.. note::
    
     It is possible to override the dynamic feature detection for debugging or experimental purposes - for more information see: `Overriding dynamic feature detection`_

Organization Management
^^^^^^^^^^^^^^^^^^^^^^^

Edge Orchestrator offers a two-level tenancy structure, with organizations that can contain one or more projects.
To create an organization the orch-cli user must part of the "Org Admin Group". See :doc:`/shared/shared_mt_overview`

To create an organization run the create command, --description is an optional field.

.. code-block:: bash

    ./orch-cli create organization myorg --description "myorg"

To list organizations run the list command.

.. code-block:: bash

    ./orch-cli list organizations

To get information about specific organization run the get command.

.. code-block:: bash

    ./orch-cli get organization myorg

To delete an organization run the delete command.

.. code-block:: bash

    ./orch-cli delete organization myorg

.. note::
    
     Certain modular deployments/workflows of Edge Manageability Framework or it's components may not include support for 
     multitenancy - in those cases a default organization is created and configuring it is not needed.

Project Management
^^^^^^^^^^^^^^^^^^

To create a project the orch-cli user must associated with the organization group. See :doc:`/shared/shared_mt_overview`

To create an project run the create command, --description is an optional field.

.. code-block:: bash

    ./orch-cli create project myproject --description "myproject"

To list project run the list command.

.. code-block:: bash

    ./orch-cli list project

To get information about specific project run the get command.

.. code-block:: bash

    ./orch-cli get project myproject

To delete a project run the delete command.

.. code-block:: bash

    ./orch-cli delete project myproject

.. note::
    
     Certain modular deployments/workflows of Edge Manageability Framework or it's components may not include support for 
     multitenancy - in those cases a default organization is created and configuring it is not needed.

Local SSH Account Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The orch-cli supports adding public SSH keys that can be later used for accessing EN.

To create a local account containing the key run the create command, specify the name of the user/key and the path to the key.

.. code-block:: bash

    ./orch-cli create sshkey mysshkey /path/to/publickey.pub

To list the local SSH accounts run the list command.

.. code-block:: bash

    ./orch-cli list sshkey

To get specific information about local SSH keys run the get command.

.. code-block:: bash

    ./orch-cli get sshkey mysshkey

To delete a local SSH key run the delete command.

.. code-block:: bash

    ./orch-cli delete sshkey mysshkey

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

Cluster Template Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The orch-cli can be used to list available cluster templates.
To list the templates use the list command.

.. code-block:: bash

    ./orch-cli list clustertemplates

To get more detailed view and content of the template in JSON format run the list command with verbose option.

.. code-block:: bash

    ./orch-cli list clustertemplates -v

Cluster Management
^^^^^^^^^^^^^^^^^^

A single node K3s cluster can be deployed to an onboarded/provisioned host using the orch-cli.

To create a cluster with a default template and all roles run the create command --nodes <nodeUUID>:<role> flag requires the ENs UUID and the expected roles (all = etcd,control plane,worker roles).

.. code-block:: bash

    ./orch-cli create cluster cli-cluster --nodes d7911144-3010-11f0-a1c2-370d26b04195:all

To create a cluster with specific template and specific labels use the following create command:

.. code-block:: bash

    ./orch-cli create cluster cli-cluster --nodes d7911144-3010-11f0-a1c2-370d26b04195:all --labels sample-label=samplevalue,another-label=another-value

To list clusters use the list command.

.. code-block:: bash

    ./orch-cli list clusters

To get information about a specific cluster use the get command.

.. code-block:: bash

    ./orch-cli get cluster mycluster

To delete a specific cluster use the delete command.

.. code-block:: bash

    ./orch-cli delete cluster mycluster

OS Update Policy Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^

OS Update Policies are used to define how an update should be performed on an Edge Node.
For detailed steps on how to effectively use the OS Update Policies see the Day 2 updates document.

To create an OS Update Policy use the create command. A path to a policy definition must be provided.

.. code-block:: bash

    ./orch-cli create osupdatepolicy path/to/osupdatepolicy.yaml

To list OS Update Policies run the list command:

.. code-block:: bash

    ./orch-cli list osupdatepolicy

To get information about a specific OS Update Policy run the get command with the policy's resource ID as an input.

.. code-block:: bash

    ./orch-cli get osupdatepolicy <POLICY_ID>

To delete an OS Update Policy run the delete command.

.. code-block:: bash

    ./orch-cli get osupdatepolicy <POLICY_ID>

To associate a policy with an Edge Node to be used during a scheduled update run the "set host <host-id>" command.

.. code-block:: bash

    ./orch-cli set host host-1234abcd --osupdatepolicy <resourceID>

Schedule Management
^^^^^^^^^^^^^^^^^^^

The orch-cli supports schedule of maintenance window for either general maintenance or OS Update of the Edge Nodes.
The schedules can be a one off or repeated cron jobs either by day of a week or day of a month for specified months.
The schedules can target a specific Edge Node, a whole Site, or a whole Region.

To create a repeated OS Update schedule use the create command.

.. code-block:: bash

    ./orch-cli create schedules my-schedule --timezone GMT --frequency-type repeated --maintenance-type osupdate --target site-532d1d07 --frequency weekly --start-time "10:10" --day-of-week "1-3,5" --months "2,4,7-8" --duration 3600

To create a single maintenance schedule use the create command.

.. code-block:: bash

    ./orch-cli create schedules my-schedule --timezone GMT --frequency-type single --maintenance-type maintenance --target region-65c0d433 --start-time "2026-12-01 20:20" --end-time "2027-12-01 20:20"


See --help on how to create other combinations for schedule.

To list schedules run the list command.

.. code-block:: bash

    ./orch-cli list schedules

To get details of a specific schedule run the get command.

.. code-block:: bash

    ./orch-cli get schedule <schedule ID>

To edit an existing single schedule run the set command.

.. code-block:: bash

    ./orch-cli set schedules singleschedule-abcd1234 --timezone GMT --maintenance-type osupdate --start-time "2026-02-02 10:10" --end-time "2026-02-02 10:10"

To edit an existing repeated schedule run the set command.

.. code-block:: bash

    ./orch-cli set schedules repeatedschedule-abcd1234 --timezone GMT --maintenance-type osupdate --frequency weekly --start-time "10:10" --day-of-week "1-3,5" --months "2,4,7-8" --duration 3600

See --help on how to set other combinations for schedule.

To  delete a schedule run the delete command.

.. code-block:: bash

    ./orch-cli delete schedule <schedule ID>

OS Update Run Management
^^^^^^^^^^^^^^^^^^^^^^^^

After a scheduled maintenance window is completed an OS Update Run resource is created.

To list OS Update Runs run the list command.

.. code-block:: bash

    ./orch-cli list osupdaterun

To get specific OS Update Run information run the get command.

.. code-block:: bash

    ./orch-cli get osupdaterun <RUN_ID>

To delete an OS Update Run run the delete command.

.. code-block:: bash

    ./orch-cli delete osupdaterun <RUN_ID>

One-click Host Update
^^^^^^^^^^^^^^^^^^^^^

The orch-cli provides a simplified procedure for one off OS Updates of host OS to be run via a single command.
Executing the **update-os** on a host will result in a near immediate schedule of a single, open ended OS Update for a host.
The update can be performed on an single host or a bulk of host with .csv file as an input.

To update a single host with an already assigned OS Update Policy.

.. code-block:: bash

    ./orch-cli update-os host <HOST_ID>

To update a single host and assign a new OS Update Policy.

.. code-block:: bash

    ./orch-cli update-os host <HOST_ID> --osupdatepolicy <OSUPDATEPOLICY_ID>

To generate a blank file for bulk update of hosts.

.. code-block:: bash

    ./orch-cli update-os host --generate-csv test.csv

To generate a file for bulk update of hosts which includes a number of existing hosts and their OS Update Policies based on a required filter.
To establish available filters see:

* `API-160 filtering <https://google.aip.dev/160>`_
* `EIM API spec <https://github.com/open-edge-platform/orch-utils/blob/main/tenancy-api-mapping/openapispecs/generated/amc-infra-core-edge-infrastructure-manager-openapi-all.yaml>`_

.. code-block:: bash

    orch-cli update-os host --generate-csv test.csv --filter=<filter>

To generate a file for bulk update of hosts which includes a number of existing hosts and their OS Update Policies based on a required site or region.
Note --site and --region flags are mutually exclusive, either can be used with conjunction of --filter flag.

.. code-block:: bash

    orch-cli update-os host --generate-csv test.csv --site <SITE_ID>
    orch-cli update-os host --generate-csv test.csv --region <REGION_ID>

The required input .csv file should be of following format to execute the update.

.. code-block:: bash

    Name - Name of the machine - mandatory field
    ResourceID - Unique Identifier of host - mandatory field
    OSUpdatePolicy - Desired update policy - optional field - currently set policy for the host will be used if not provided

    Name,ResourceID,OSUpdatePolicy
    host-1,host-1234abcd,osupdatepolicy-1234abcd
    host-2,host-2234abcd
    host-3,host-3234abcd,osupdatepolicy-1234abcd

To execute bulk OS Update on multiple hosts

.. code-block:: bash

    orch-cli update-os host --import-from-csv test.csv

To view existing OS Update schedules

.. code-block:: bash

    orch-cli list schedules  -v

Help
^^^^

For help with any of the commands run the command with `--help`.

Additional commands
^^^^^^^^^^^^^^^^^^^

The application level CLI commands are covered under the :doc:`/user_guide/package_software/orch_cli/orch_cli_guide`

See "./orch-cli <verb> <noun> --help" for current usage and capabilities of these commands.

Overriding dynamic feature detection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The dynamic feature detection can be overridden temporarily for debug or experimental purposes by overriding the viper configuration which stores the detected features.
The viper configuration file is located at **~/.orch-cli/orch-cli.yaml**

To override and unlock or lock the execution of commands and their subsequent API calls edit the file directly or run the following commands and set the feature to `true` or `false` as an example:

.. code-block:: bash

    # To unlock application orchestration commands
    orch-cli config set orchestrator.features.application-orchestration.installed true
    # To lock cluster orchestration commands
    orch-cli config set orchestrator.features.cluster-orchestration.installed false
    # To lock multitenancy commands
    orch-cli config set orchestrator.features.multitenancy.installed false
    # To unlock the EIM onboarding commands
    orch-cli config set orchestrator.features.edge-infrastructure-manager.onboarding.installed true
    # To unlock the EIM provisioning commands
    orch-cli config set orchestrator.features.edge-infrastructure-manager.provisioning.installed true
    # To unlock the EIM Day2 updates commands
    orch-cli config set orchestrator.features.edge-infrastructure-manager.day2.installed true
    # To lock the EIM OOB commands
    orch-cli config set orchestrator.features.edge-infrastructure-manager.oob.installed false

The overridden configuration will persist until a *login* or a *logout* command is run - which will reset the configuration to the dynamically detected features or defaults.
Note that overriding the features in this way does not change the actual capabilities of the connected Edge Orchestrator - attempting to run commands that are not supported
by the Edge Orchestrator will result in error responses.

