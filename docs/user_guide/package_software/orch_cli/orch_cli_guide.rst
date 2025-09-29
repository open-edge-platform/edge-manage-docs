Orch CLI User Guide
===================

The orch-cli tool is a binary executable that provides a command-line interface
for managing application packaging and deployment. It allows users to perform
various tasks related to application registry management, package creation,
and deployment lifecycle operations on edge platform.

Download
^^^^^^^^

Ensure that you have ``oras`` available on your system or follow the
instructions in the `oras documentation <https://oras.land/docs/installation>`_
to install it.

The tool is made available in the public AWS* Elastic Container Registry. It
can be pulled without any credentials using commands like below:

.. code-block:: bash

    oras pull registry-rs.edgeorchestration.intel.com/edge-orch/files/orch-cli:3.1
    chmod +x orch-cli

The package will be an archive which needs to be unpacked to access the binary.

Authentication
^^^^^^^^^^^^^^

The orch-cli authenticates with the edge orchestrator by logging in to the
orchestrator and obtaining a JWT token for further communication. The JWT token
is cached locally after logging in and valid for one hour. The network
communication happens over HTTPS using TLS v1.3 and JWT token. The token is
removed on logout. User must logout and login after token expiry.

The keycloak service endpoint for containing the CLUSTER_FQDN of a given edge
orchestrator must be provided during login.

There are two login methods available:

#. **Interactive shell** - The default way to authenticate with Edge
   Orchestrator is to log in by providing username as first argument and using
   an interactive prompt. The prompt will ask for password. This is the
   recommended way to log in.

   .. code-block:: bash

       ./orch-cli login <USER> --keycloak https://keycloak.<CLUSTER_FQDN>/realms/master
       Enter Password:

#. **Password argument** - Alternatively the password can be provided as a
   second command line argument - the recommended way is to use prompt based
   login above. When using this method, be cautious as the password may be
   exposed in the command line history. If using this method exporting the
   password as an environment variable is recommended.

   .. code-block:: bash

       ./orch-cli login <USER> <PASSWORD> --keycloak https://keycloak.<CLUSTER_FQDN>/realms/master

Running commands
^^^^^^^^^^^^^^^^

Generally the orch-cli commands follow this pattern for execution:

.. code-block:: bash

    ./orch-cli <verb> <noun> <subject(s)> --<options>

The endpoint and the project must be specified for most commands.

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
        --registry-type <REGISTRY_TYPE> --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

Where ``<REGISTRY_TYPE>`` can be ``HELM`` for Helm charts or ``IMAGE`` for
Docker images.

For Helm registries, you can optionally specify an inventory URL:

.. code-block:: bash

    ./orch-cli create registry <REGISTRY_NAME> --root-url <REGISTRY_URL> \
        --registry-type HELM --inventory <INVENTORY_URL> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

For private registries that require authentication, provide credentials:

.. code-block:: bash

    ./orch-cli create registry <REGISTRY_NAME> --root-url <REGISTRY_URL> \
        --registry-type <REGISTRY_TYPE> --username <USERNAME> \
        --auth-token <AUTHENTICATION_TOKEN> \
        --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

.. note::
   Enter the Username and Password of the registry if required. The Password
   may be the authentication token or an actual password.

To list all configured registries run the list command.

.. code-block:: bash

    ./orch-cli list registries --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

To get individual registry details run the get command.

.. code-block:: bash

    ./orch-cli get registry <REGISTRY_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To update registry configuration run the update command. You can update the
root-url (location), inventory, and type:

.. code-block:: bash

    ./orch-cli set registry <REGISTRY_NAME> --root-url <NEW_REGISTRY_URL> \
        --registry-type <NEW_TYPE> --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

.. note::
   Registry username and password cannot be updated through the edit
   functionality. The registry name also cannot be changed. Intel recommends
   assigning a meaningful name that will help you remember the registry.

To delete registries run the delete command.

.. code-block:: bash

    ./orch-cli delete registry <REGISTRY_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

Application Management
^^^^^^^^^^^^^^^^^^^^^^

Applications define the workloads that can be deployed to edge nodes. An
application is defined by a single Helm chart with predefined runtime
configurations or profiles. The application management commands allow you to
create, list, update, and delete application definitions.

Applications must fulfill the following criteria:

- Deployable on CNCF-certified Kubernetes version v1.27
- All Helm charts stored in Helm or OCI registry and downloadable through the
  network
- Deployable using Helm install, upgradable using Helm upgrade, and removable
  using Helm delete

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

    ./orch-cli create application <APPLICATION_YAML_FILE> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To create an application from a Helm chart run the create command with chart
details.

.. code-block:: bash

    ./orch-cli create application <APPLICATION_NAME> <VERSION> \
        --chart-name <CHART_NAME> --chart-version <CHART_VERSION> \
        --chart-registry <REGISTRY_NAME> --project <PROJECT_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN>

To list all applications run the list command.

.. code-block:: bash

    ./orch-cli list applications --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

To get information about a specific application run the get command.

.. code-block:: bash

    ./orch-cli get application <APPLICATION_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To update an application run the update command with the updated manifest.

.. code-block:: bash

    ./orch-cli set application <APPLICATION_YAML_FILE> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

Alternatively, to update an application using direct CLI parameters:

.. code-block:: bash

    ./orch-cli set application <APPLICATION_NAME> <VERSION> \
        --chart-name <CHART_NAME> --chart-version <CHART_VERSION> \
        --chart-registry <REGISTRY_NAME> --project <PROJECT_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN>

To delete an application run the delete command.

.. code-block:: bash

    ./orch-cli delete application <APPLICATION_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

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
        --chart-values <VALUES_FILE> --project <PROJECT_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN>

To create an application profile with parameter templates for runtime
customization:

.. code-block:: bash

    ./orch-cli create profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --display-name '<DISPLAY_NAME>' --description '<DESCRIPTION>' \
        --chart-values <VALUES_FILE> \
        --parameter-template <PARAM>=<TYPE>:"<DESCRIPTION>"."<DEFAULT>" \
        --project <PROJECT_NAME> --api-endpoint https://api.<CLUSTER_FQDN>

**Example - Creating a profile with parameter templates:**

.. code-block:: bash

    orch-cli create profile my-app 1.0.0 my-profile \
        --display-name 'My Profile' --description 'This is my profile' \
        --chart-values ~/values.yaml \
        --parameter-template env.HOST_IP=string:"IP address of target Edge Node":"" \
        --project my-project --api-endpoint https://api.intel.com

To list all application profiles run the list command.

.. code-block:: bash

    ./orch-cli list profiles <APPLICATION_NAME> <VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To get information about a specific application profile run the get command.

.. code-block:: bash

    ./orch-cli get profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To update an application profile run the set command.

.. code-block:: bash

    ./orch-cli set profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --display-name '<NEW_DISPLAY_NAME>' --description '<NEW_DESCRIPTION>' \
        --chart-values <NEW_VALUES_FILE> --project <PROJECT_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN>

To delete an application profile run the delete command.

.. code-block:: bash

    ./orch-cli delete profile <APPLICATION_NAME> <VERSION> <PROFILE_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

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
        --application-profile <APP_NAME>=<APP_PROFILE> \
        --project <PROJECT_NAME> --api-endpoint https://api.<CLUSTER_FQDN>

To list all deployment package profiles run the list command.

.. code-block:: bash

    ./orch-cli list deployment-package-profiles <PACKAGE_NAME> <VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To get information about a specific deployment package profile run the get
command.

.. code-block:: bash

    ./orch-cli get deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME> --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

To update an existing deployment package profile by mapping it to different
application profiles:

.. code-block:: bash

    ./orch-cli set deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME> --display-name "<DISPLAY_NAME>" \
        --application-profile <APP_NAME>=<APP_PROFILE> \
        --project <PROJECT_NAME> --api-endpoint https://api.<CLUSTER_FQDN>

To delete a deployment package profile run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment-package-profile <PACKAGE_NAME> <VERSION> \
        <PROFILE_NAME> --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

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
        --application-reference <APPLICATION2_NAME>:<VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To create a package from a package manifest file run the create command with
the manifest path. For more information about deployment package requirements and manifest
structure, see the
:doc:`/developer_guide/application_developer_workflow/deployment-packages/deployment-package-yaml-reference`.

.. code-block:: bash

    ./orch-cli create deployment-package <PACKAGE_YAML_FILE> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To list all packages run the list command.

.. code-block:: bash

    ./orch-cli list deployment-packages \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To get information about a specific package run the get command.

.. code-block:: bash

    ./orch-cli get deployment-package <PACKAGE_NAME> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To update a package run the update command with the updated manifest.

.. code-block:: bash

    ./orch-cli set deployment-package <PACKAGE_YAML_FILE> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

Alternatively, to update a package using direct CLI parameters:

.. code-block:: bash

    ./orch-cli set deployment-package <PACKAGE_NAME> <VERSION> \
        --description "<NEW_DESCRIPTION>" \
        --application-reference <APPLICATION1_NAME>:<VERSION> \
        --application-reference <APPLICATION2_NAME>:<VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To export a package run the export command.

.. code-block:: bash

    ./orch-cli export deployment-package <PACKAGE_NAME> <VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To delete a package run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment-package <PACKAGE_NAME> <VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

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

- **Metadata-based deployment**: Applies criteria used to automatically deploy
  and update packages to clusters based on cluster labels and metadata. Uses
  the `--application-label` parameter to define automatic deployment criteria.

- **Custom cluster deployment**: Targets a custom set of clusters for
  deployment by specifying explicit cluster IDs. Uses the
  `--application-cluster-id` parameter to manually specify target clusters.

To create a basic metadata-based deployment (automatic cluster selection):

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-label "<app>.<label>=<label-value>" \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To create a basic custom cluster deployment (manual cluster selection):

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-cluster-id "<app>=<cluster-id>" \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To create a deployment with parameter overrides and metadata-based targeting:

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-label "<app>.<label>=<label-value>" \
        --application-set <app>.<prop>=<prop-value> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To create a deployment with parameter overrides and manual cluster targeting:

.. code-block:: bash

    ./orch-cli create deployment <PACKAGE_NAME> <VERSION> \
        --display-name <DISPLAY_NAME> \
        --application-cluster-id "<app>=<cluster-id>" \
        --application-set <app>.<prop>=<prop-value> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To list all deployments run the list command.

.. code-block:: bash

    ./orch-cli list deployments --api-endpoint https://api.<CLUSTER_FQDN> \
        --project <PROJECT_NAME>

To get information about a specific deployment run the get command.

.. code-block:: bash

    ./orch-cli get deployment <DEPLOYMENT_ID> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To upgrade a deployment to a new package version run the upgrade command.

.. code-block:: bash

    ./orch-cli upgrade deployment <DEPLOYMENT_ID> \
        --package-version <NEW_VERSION> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

To delete a deployment run the delete command.

.. code-block:: bash

    ./orch-cli delete deployment <DEPLOYMENT_ID> \
        --api-endpoint https://api.<CLUSTER_FQDN> --project <PROJECT_NAME>

Help
^^^^

For help with any of the commands run the command with `--help`.

Additional commands:
^^^^^^^^^^^^^^^^^^^^

Additional commands are currently in place but in experimental stages.
See "./orch-cli <verb> <noun> --help" for current usage and capabilities of
these commands.
