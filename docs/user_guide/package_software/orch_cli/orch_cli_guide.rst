Orch CLI User Guide
===================

The orch-cli tool is a binary executable that provides a command-line interface
for managing application packaging and deployment. It allows users to perform
various tasks related to application registry management, package creation,
and deployment lifecycle operations on edge platform.

Download and Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For detailed instructions on downloading and authenticating with the orch-cli tool, see the :doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide` which provides comprehensive steps for:

- Installing the orch-cli binary
- Authentication methods and security considerations
- Configuration setup for endpoints and projects

.. note::
   The same orch-cli binary is used for both infrastructure management and application packaging operations.

Running commands
^^^^^^^^^^^^^^^^

Generally the orch-cli commands follow this pattern for execution:

.. code-block:: bash

    ./orch-cli <verb> <noun> <subject(s)> --<options>

**Configuration Setup**

For seamless command execution, configure the API endpoint and project settings
to avoid specifying them with each command. As detailed in the infrastructure CLI guide,
you can set these persistently using:

.. code-block:: bash

    ./orch-cli config set api-endpoint https://api.<CLUSTER_FQDN>
    ./orch-cli config set project <PROJECT_NAME>

After configuration, commands can be run without specifying ``--api-endpoint`` and ``--project``
flags. If not configured, these parameters must be included with each command:

.. code-block:: bash

    --api-endpoint https://api.<CLUSTER_FQDN>
    --project <PROJECT_NAME>

For the *get* commands the --verbose flag can be used to include additional
information in the output.

Note that some of the *get* and *delete* commands require usage of deployment
ID instead of deployment name due to the fact that some deployments do not
have unique names.

Registry Management
^^^^^^^^^^^^^^^^^^^

The tool allows for management of container registries and repository
configurations. There are two types of registries supported:

- **Helm Registries** hold Helm charts, packages consisting of YAML files and
  templates which convert into Kubernetes manifest files.
- **Docker Registries** hold container images that typically contain the
  executable binary representing the application.

To create a registry configuration run the create command with registry
details.

.. code-block:: bash

    ./orch-cli create registry <REGISTRY_NAME> --root-url <REGISTRY_URL> \
        --registry-type <REGISTRY_TYPE>

Where ``<REGISTRY_TYPE>`` can be ``HELM`` for Helm charts or ``IMAGE`` for
Docker images.

For Helm registries, you can optionally specify an inventory URL:

.. code-block:: bash

    ./orch-cli create registry <REGISTRY_NAME> --root-url <REGISTRY_URL> \
        --registry-type HELM --inventory <INVENTORY_URL>

For private registries that require authentication, provide credentials:

.. code-block:: bash

    ./orch-cli create registry <REGISTRY_NAME> --root-url <REGISTRY_URL> \
        --registry-type <REGISTRY_TYPE> --username <USERNAME> \
        --auth-token <AUTHENTICATION_TOKEN>

.. note::
   Enter the Username and Password of the registry if required. The Password
   may be the authentication token or an actual password.

For detailed information about registry credential security including transmission
and storage, see :doc:`/user_guide/package_software/registry_security`.

To list all configured registries run the list command.

.. code-block:: bash

    ./orch-cli list registries

To get individual registry details run the get command.

.. code-block:: bash

    ./orch-cli get registry <REGISTRY_NAME>

To update registry configuration run the update command. You can update the
root-url (location), inventory, credentials, and type:

.. code-block:: bash

    ./orch-cli set registry <REGISTRY_NAME> --root-url <NEW_REGISTRY_URL> \
        --registry-type <NEW_TYPE> --username <NEW_USERNAME> \
        --auth-token <NEW_AUTHENTICATION_TOKEN>

.. note::
   The registry name cannot be changed after creation. Intel recommends assigning
   a meaningful name during creation that will help you remember the registry purpose.

To delete registries run the delete command.

.. code-block:: bash

    ./orch-cli delete registry <REGISTRY_NAME>

Application Management
^^^^^^^^^^^^^^^^^^^^^^

Applications define the workloads that can be deployed to edge nodes. An
application is defined by a single Helm chart with predefined runtime
configurations or profiles. The application management commands allow you to
create, list, update, and delete application definitions.

Applications requirements that must be fulfilled,
see here :doc:`/user_guide/package_software/app_requirements`.

**Application Creation Methods**

Applications can be created using two approaches:

1. **Application Manifest File** - A YAML file defining the complete
   application specification including metadata, Helm chart information,
   deployment profiles, and configuration parameters. This method provides
   full control over application definition and supports advanced features
   like parameter templates and multiple deployment profiles.

2. **Direct CLI Parameters** - Specifying application details directly in
   the command line for quick creation of simple applications.

To create an application run the create command with an application
manifest file. For more information about application requirements and manifest
structure, see the
:doc:`/developer_guide/application_developer_workflow/deployment-packages/application-yaml-reference`.

.. code-block:: bash

    ./orch-cli create application <APPLICATION_YAML_FILE>

To create an application from a Helm chart run the create command with chart
details.

.. code-block:: bash

    ./orch-cli create application <APPLICATION_NAME> <VERSION> \
        --chart-name <CHART_NAME> --chart-version <CHART_VERSION> \
        --chart-registry <REGISTRY_NAME>

To list all applications run the list command.

.. code-block:: bash

    ./orch-cli list applications

To get information about a specific application run the get command.

.. code-block:: bash

    ./orch-cli get application <APPLICATION_NAME>

To update an application run the update command with the updated manifest.

.. code-block:: bash

    ./orch-cli set application <APPLICATION_YAML_FILE>

Alternatively, to update an application using direct CLI parameters:

.. code-block:: bash

    ./orch-cli set application <APPLICATION_NAME> <VERSION> \
        --chart-name <CHART_NAME> --chart-version <CHART_VERSION> \
        --chart-registry <REGISTRY_NAME>

To delete an application run the delete command.

.. code-block:: bash

    ./orch-cli delete application <APPLICATION_NAME>

Profile Management
^^^^^^^^^^^^^^^^^^

Profiles define configuration settings and deployment parameters for
applications and deployment packages. There are two types of profiles:

- **Application Profiles**: Define runtime configurations for individual
  applications
- **Deployment Package Profiles**: Allows to use a different set of
  application profiles

**Application Profile Management**

Application profiles provide custom configurations for applications including
Helm chart values and parameter templates that can be overridden at
deployment time.

To create an application profile run the create command with basic profile
details:

.. code-block:: bash

    ./orch-cli create profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --display-name '<DISPLAY_NAME>' --description '<DESCRIPTION>' \
        --chart-values <VALUES_FILE>

To create an application profile with parameter templates for runtime
customization:

.. code-block:: bash

    ./orch-cli create profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --display-name '<DISPLAY_NAME>' --description '<DESCRIPTION>' \
        --chart-values <VALUES_FILE> \
        --parameter-template <PARAM>=<TYPE>:"<DESCRIPTION>"."<DEFAULT>"

**Example - Creating a profile with parameter templates:**

.. code-block:: bash

    orch-cli create profile my-app 1.0.0 my-profile \
        --display-name 'My Profile' --description 'This is my profile' \
        --chart-values ~/values.yaml \
        --parameter-template env.HOST_IP=string:"IP address of target Edge Node":""

To list all application profiles run the list command.

.. code-block:: bash

    ./orch-cli list profiles <APPLICATION_NAME> <VERSION>

To get information about a specific application profile run the get command.

.. code-block:: bash

    ./orch-cli get profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME>

To update an application profile run the set command.

.. code-block:: bash

    ./orch-cli set profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --display-name '<NEW_DISPLAY_NAME>' --description '<NEW_DESCRIPTION>' \
        --chart-values <NEW_VALUES_FILE>

To delete an application profile run the delete command.

.. code-block:: bash

    ./orch-cli delete profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME>

.. note::
   When using application manifest files, profiles are defined within the
   manifest itself and do not require separate profile creation. Profile
   management commands are primarily used with applications created via direct
   CLI parameters.

.. _deployment-package-profile-management:

**Deployment Package Profile Management**

Default deployment package profiles are automatically created when packages are
created. Additional profiles can be created or existing profiles can be
updated to map to different application profiles.

To create a new deployment package profile:

.. code-block:: bash

    ./orch-cli create deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME> --display-name "<DISPLAY_NAME>" \
        --description "<DESCRIPTION>" \
        --application-profile <APP_NAME>=<APP_PROFILE>

To list all deployment package profiles run the list command.

.. code-block:: bash

    ./orch-cli list deployment-package-profiles <PACKAGE_NAME> <VERSION>

To get information about a specific deployment package profile run the get
command.

.. code-block:: bash

    ./orch-cli get deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME>

To update an existing deployment package profile by mapping it to different
application profiles:

.. code-block:: bash

    ./orch-cli set deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME> --display-name "<DISPLAY_NAME>" \
        --application-profile <APP_NAME>=<APP_PROFILE>

To delete a deployment package profile run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME>

Deployment Package Management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Deployment packages are collections of applications and deployment profiles.
They bundle applications with their dependencies and configuration for
deployment. Deployment packages simplify the deployment of applications to the
edge by grouping related applications together.

Package management commands allow you to create, list, update, and delete
application packages.

To create a package from an application run the create command with package
specifications.

.. code-block:: bash

    ./orch-cli create deployment-package <PACKAGE_NAME> <VERSION> \
        --description "<DESCRIPTION>" \
        --application-reference <APPLICATION1_NAME>:<VERSION> \
        --application-reference <APPLICATION2_NAME>:<VERSION>

To create a package from a package manifest file run the create command with
the manifest path. For more information about deployment package requirements and manifest
structure, see the
:doc:`/developer_guide/application_developer_workflow/deployment-packages/deployment-package-yaml-reference`.

.. code-block:: bash

    ./orch-cli create deployment-package <PACKAGE_YAML_FILE>

To list all packages run the list command.

.. code-block:: bash

    ./orch-cli list deployment-packages

To get information about a specific package run the get command.

.. code-block:: bash

    ./orch-cli get deployment-package <PACKAGE_NAME>

To update a package run the update command with the updated manifest.

.. code-block:: bash

    ./orch-cli set deployment-package <PACKAGE_YAML_FILE>

Alternatively, to update a package using direct CLI parameters:

.. code-block:: bash

    ./orch-cli set deployment-package <PACKAGE_NAME> <VERSION> \
        --description "<NEW_DESCRIPTION>" \
        --application-reference <APPLICATION1_NAME>:<VERSION> \
        --application-reference <APPLICATION2_NAME>:<VERSION>

To export a package run the export command.

.. code-block:: bash

    ./orch-cli export deployment-package <PACKAGE_NAME> <VERSION>

To delete a package run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment-package <PACKAGE_NAME> <VERSION>

.. note::
   For deployment package profile management details, see the
   **Deployment Package Profile Management** section above.

Deployment Management
^^^^^^^^^^^^^^^^^^^^^

Deployments represent running instances of applications on edge nodes. A
deployment contains a deployment package name, profile name, deployment type,
and target clusters. Deployment to clusters is initiated when one or more
clusters meet the deployment's target cluster criteria.

The deployment management commands allow you to create, monitor, and manage
application deployments.

Deployment Types:

- **Automatic deployment (metadata-based)**: Applies criteria used to automatically deploy
  and update packages to clusters based on cluster labels and metadata. Uses
  the `--application-label` parameter to define automatic deployment criteria.

- **Manual deployment (custom cluster)**: Targets a custom set of clusters for
  deployment by specifying explicit cluster IDs. Uses the
  `--application-cluster-id` parameter to manually specify target clusters.

To create a basic automatic deployment (metadata-based cluster selection):

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-label "<app>.<label>=<label-value>"

To create a basic manual deployment (custom cluster selection):

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-cluster-id "<app>=<cluster-id>"

To create a deployment with parameter overrides and automatic targeting:

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-label "<app>.<label>=<label-value>" \
        --application-set <app>.<prop>=<prop-value>

To create a deployment with parameter overrides and manual cluster targeting:

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-cluster-id "<app>=<cluster-id>" \
        --application-set <app>.<prop>=<prop-value>

To list all deployments run the list command.

.. code-block:: bash

    ./orch-cli list deployments

To get information about a specific deployment run the get command.

.. code-block:: bash

    ./orch-cli get deployment <DEPLOYMENT_ID>

To upgrade a deployment to a new package version run the upgrade command.

.. code-block:: bash

    ./orch-cli upgrade deployment <DEPLOYMENT_ID> \
        --package-version <NEW_VERSION>

To edit an existing deployment's configuration run the set command. You can update
the deployment name, target clusters, and parameter overrides:

.. code-block:: bash

    ./orch-cli set deployment <DEPLOYMENT_ID> \
        --display-name <NEW_DISPLAY_NAME> \
        --application-label "<app>.<label>=<new-label-value>" \
        --application-set <app>.<prop>=<new-prop-value>

For manual deployments, you can update the target clusters:

.. code-block:: bash

    ./orch-cli set deployment <DEPLOYMENT_ID> \
        --display-name <NEW_DISPLAY_NAME> \
        --application-cluster-id "<app>=<new-cluster-id>" \
        --application-set <app>.<prop>=<new-prop-value>

To delete a deployment run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment <DEPLOYMENT_ID>

Help
^^^^

For help with any of the commands run the command with `--help`.

Additional commands:
^^^^^^^^^^^^^^^^^^^^

Additional commands are currently in place but in experimental stages.
See "./orch-cli <verb> <noun> --help" for current usage and capabilities of
these commands.
