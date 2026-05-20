Orch CLI advanced usage
=======================

The orch-cli utility provides a command-line interface to interact with the Edge Manageability Framework.
This section covers advanced usage of the orch-cli, including custom templates, filters, and output formatting.

Custom Templates
^^^^^^^^^^^^^^^^

The orch-cli supports custom templates for output formatting of the ``orch-cli list`` and ``orch-cli get`` commands.
Users can create their own templates to display the output in a format that suits their needs.
Templates are defined as text files and can be specified when running the orch-cli commands.
The templates can be invoked using a flag to direct input into the command, a flag to read template from a file,
or by setting an environment variable containing the template.

To set a custom template inline as a string, use the ``--output-template`` flag:

.. code-block:: bash

    # Display only the ResourceId and Name of sites in a tabular format
    ./orch-cli list site --output-template 'table{{.ResourceId}}\t{{.Name}}'

    # Display only the ResourceId and Name of single site
    ./build/_output/orch-cli get site mysite --output-template 'Name:\t{{.Name}}\nResource ID:\t{{.ResourceId}}\n'

To read a template from a file, use the ``--output-template-file`` flag:

.. code-block:: bash

    # Display only the ResourceId and Name of sites in a tabular format from a template file
    echo -n 'table{{.ResourceId}}\t{{.Name}}' > listsite
    ./orch-cli list site --output-template-file /path/to/listsite

    # Display only the ResourceId and Name of single site from a template file
    echo -n 'Name:\t{{.Name}}\nResource ID:\t{{.ResourceId}}\n' > getsite
    ./orch-cli get site mysite --output-template-file /path/to/getsite

To set a custom template using an environment variable, use the ``ORCH_CLI_<RESOURCE_NAME>_OUTPUT_TEMPLATE`` variable
for list commands and the ``ORCH_CLI_<RESOURCE_NAME>_INSPECT_TEMPLATE`` variable for get commands,
note that the template will be persistent until the environment variable is unset. See the appendix for details of available environment variables:

.. note::

    For deployment and application related resources the ``ORCH_CLI_<RESOURCE_NAME>_OUTPUT_TEMPLATE`` controls both the 
    ``orch-cli list`` and ``orch-cli get`` output formatting, while the ``ORCH_CLI_<RESOURCE_NAME>_INSPECT_TEMPLATE``
    variable controls the ``--verbose`` output.

.. code-block:: bash

    export ORCH_CLI_SITE_OUTPUT_TEMPLATE='table{{.ResourceId}}\t{{.Name}}'
    ./orch-cli list site

    export ORCH_CLI_SITE_INSPECT_TEMPLATE='Name:\t{{.Name}}\nResource ID:\t{{.ResourceId}}\n'
    ./orch-cli get site mysite

TODO - provide instructions for creating and using custom templates, including examples of template syntax.

Filters
^^^^^^^


Output formatting
^^^^^^^^^^^^^^^^^


Sample paragraph
^^^^^^^^^^^^^^^

.. code-block:: bash

    ./orch-cli config set api-endpoint https://api.<CLUSTER_FQDN>
    ./orch-cli config set project <PROJECT>

The orch-cli configuration file can be found at **~/.orch-cli/orch-cli.yaml**

* ``list users`` and ``get user`` including optional group and realm-role output

For the step-by-step workflow, see :doc:`/shared/shared_ht_iam_mt_cli`.

.. note::

     Certain modular deployments/workflows of Edge Manageability Framework or it's components may not include support for
     multitenancy - in those cases a default user/tenant is created and configuring user management may not be needed.

Appendix: Environment Variables for Custom Templates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

    // Controls list only
    ORCH_CLI_AMTPROFILE_OUTPUT_TEMPLATE          orch-cli list amtprofile
    ORCH_CLI_CHARTS_OUTPUT_TEMPLATE              orch-cli list charts
    ORCH_CLI_CUSTOMCONFIG_OUTPUT_TEMPLATE        orch-cli list customconfig
    ORCH_CLI_GROUP_OUTPUT_TEMPLATE               orch-cli list groups
    ORCH_CLI_HOST_OUTPUT_TEMPLATE                orch-cli list host
    ORCH_CLI_METRICS_OUTPUT_TEMPLATE             orch-cli list metrics
    ORCH_CLI_ORGANIZATION_OUTPUT_TEMPLATE        orch-cli list organization
    ORCH_CLI_OSPROFILE_OUTPUT_TEMPLATE           orch-cli list osprofile
    ORCH_CLI_OSUPDATEPOLICY_OUTPUT_TEMPLATE      orch-cli list osupdatepolicy
    ORCH_CLI_OSUPDATERUN_OUTPUT_TEMPLATE         orch-cli list osupdaterun
    ORCH_CLI_PROJECT_OUTPUT_TEMPLATE             orch-cli list project
    ORCH_CLI_PROVIDER_OUTPUT_TEMPLATE            orch-cli list provider
    ORCH_CLI_REGION_OUTPUT_TEMPLATE              orch-cli list region
    ORCH_CLI_REGISTRY_OUTPUT_TEMPLATE            orch-cli list registries
    ORCH_CLI_SCHEDULE_OUTPUT_TEMPLATE            orch-cli list schedule
    ORCH_CLI_SITE_OUTPUT_TEMPLATE                orch-cli list site
    ORCH_CLI_SSHKEY_OUTPUT_TEMPLATE              orch-cli list sshkey
    ORCH_CLI_USER_OUTPUT_TEMPLATE                orch-cli list users

    // Controls get only
    ORCH_CLI_AMTPROFILE_INSPECT_TEMPLATE         orch-cli get amtprofile
    ORCH_CLI_CUSTOMCONFIG_INSPECT_TEMPLATE       orch-cli get customconfig
    ORCH_CLI_HOST_INSPECT_OUTPUT_TEMPLATE        orch-cli get host
    ORCH_CLI_METRIC_OUTPUT_TEMPLATE              orch-cli get metric
    ORCH_CLI_METRIC_INSPECT_TEMPLATE             orch-cli get metric --verbose
    ORCH_CLI_ORGANIZATION_INSPECT_TEMPLATE       orch-cli get organization
    ORCH_CLI_OSPROFILE_INSPECT_TEMPLATE          orch-cli get osprofile
    ORCH_CLI_OSUPDATEPOLICY_INSPECT_TEMPLATE     orch-cli get osupdatepolicy
    ORCH_CLI_OSUPDATERUN_INSPECT_TEMPLATE        orch-cli get osupdaterun
    ORCH_CLI_PROJECT_INSPECT_TEMPLATE            orch-cli get project
    ORCH_CLI_PROVIDER_INSPECT_TEMPLATE           orch-cli get provider
    ORCH_CLI_REGION_INSPECT_TEMPLATE             orch-cli get region
    ORCH_CLI_REGISTRY_INSPECT_TEMPLATE           orch-cli get registry
    ORCH_CLI_SCHEDULE_INSPECT_TEMPLATE           orch-cli get schedule
    ORCH_CLI_SITE_INSPECT_TEMPLATE               orch-cli get site
    ORCH_CLI_SSHKEY_INSPECT_TEMPLATE             orch-cli get sshkey
    ORCH_CLI_USER_INSPECT_TEMPLATE               orch-cli get user

    // Controls list and get standard (non-verbose) output
    ORCH_CLI_APPLICATION_OUTPUT_TEMPLATE         orch-cli list|get application
    ORCH_CLI_ARTIFACT_OUTPUT_TEMPLATE            orch-cli list|get artifact
    ORCH_CLI_CLUSTER_OUTPUT_TEMPLATE             orch-cli list|get cluster
    ORCH_CLI_DEPLOYMENT_OUTPUT_TEMPLATE          orch-cli list|get deployment
    ORCH_CLI_DEPLOYMENT_PACKAGE_OUTPUT_TEMPLATE  orch-cli list|get deployment-package
    ORCH_CLI_DEPLOYMENT_PROFILE_OUTPUT_TEMPLATE  orch-cli list|get deployment-package-profile
    ORCH_CLI_PROFILE_OUTPUT_TEMPLATE             orch-cli list|get profile

    // Controls list and get verbose output
    ORCH_CLI_APPLICATION_INSPECT_TEMPLATE        orch-cli list|get application --verbose
    ORCH_CLI_ARTIFACT_INSPECT_TEMPLATE           orch-cli list|get artifact --verbose
    ORCH_CLI_CLUSTER_INSPECT_TEMPLATE            orch-cli get cluster --verbose
    ORCH_CLI_CLUSTER_TEMPLATE_OUTPUT_TEMPLATE    orch-cli list clustertemplates
    ORCH_CLI_CLUSTER_TEMPLATE_INSPECT_TEMPLATE   orch-cli list clustertemplates --verbose
    ORCH_CLI_DEPLOYMENT_INSPECT_TEMPLATE         orch-cli list|get deployment --verbose
    ORCH_CLI_DEPLOYMENT_PACKAGE_INSPECT_TEMPLATE orch-cli list|get deployment-package --verbose
    ORCH_CLI_DEPLOYMENT_PROFILE_INSPECT_TEMPLATE orch-cli list|get deployment-package-profile --verbose
    ORCH_CLI_PROFILE_INSPECT_TEMPLATE            orch-cli list|get profile --verbose