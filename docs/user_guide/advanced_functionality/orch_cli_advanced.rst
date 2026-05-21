Orch CLI advanced usage
=======================

The orch-cli utility provides a command-line interface to interact with the Edge Manageability Framework.
This section covers advanced usage of the orch-cli, including custom templates, filters, and output formatting.

Custom Templates
^^^^^^^^^^^^^^^^

The orch-cli supports custom templates for output formatting of the ``orch-cli list`` and ``orch-cli get`` commands.
Users can create their own templates to display the output in a format that suits their needs.
Templates are defined as string inputs and can be specified when running the orch-cli commands.
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
    variable controls the ``--verbose`` output, see the appendix for more details.

.. code-block:: bash

    export ORCH_CLI_SITE_OUTPUT_TEMPLATE='table{{.ResourceId}}\t{{.Name}}'
    ./orch-cli list site

    export ORCH_CLI_SITE_INSPECT_TEMPLATE='Name:\t{{.Name}}\nResource ID:\t{{.ResourceId}}\n'
    ./orch-cli get site mysite

Template Syntax and Structure
"""""""""""""""""""""""""""""

Templates use Go's `text/template <https://pkg.go.dev/text/template>`_ syntax. Each field of the
resource is accessed with dot-notation ``{{.FieldName}}``. Nested fields are accessed with
additional dots, e.g. ``{{.Region.Name}}``.

**Table templates** must begin with the prefix ``table`` followed immediately by the first field
expression. Columns are separated by ``\t`` (a literal tab character). The CLI automatically
generates column headers from the field names:

.. code-block:: text

    table{{.ResourceId}}\t{{.Name}}\t{{.RegionId}}

**Inspect / detail templates** (for ``orch-cli get``) are free-form. Use ``\n`` for newlines and
``\t`` for alignment. A trailing ``\n`` is recommended:

.. code-block:: text

    Name:\t{{.Name}}\nResource ID:\t{{.ResourceId}}\n

.. note::

    The escape sequences ``\t``, ``\n``, and ``\r`` are interpreted when the template is provided
    via ``--output-template``, ``--output-template-file``, or an environment variable. They do not
    need to be pre-expanded in the source string.

Template Functions
""""""""""""""""""

The following helper functions are available inside every template:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Function
     - Description
   * - ``str .Field``
     - Safely dereferences a string pointer. Returns an empty string if the value is nil.
   * - ``none .Field``
     - Dereferences a string pointer. Returns ``<none>`` if the value is nil or empty.
   * - ``deref .Field``
     - Recursively dereferences a pointer (including slices and maps behind pointers). Useful with ``range``.
   * - ``fmttime .Field``
     - Formats a ``time.Time`` value as ``2006-01-02T15:04:05`` (no timezone).
   * - ``formatTime .Field``
     - Formats a timestamp value (Unix int, ``time.Time``, or protobuf Timestamp) as RFC3339.
   * - ``timestamp .Field``
     - Formats a protobuf Timestamp as RFC3339.
   * - ``since .Field``
     - Computes elapsed time since a protobuf Timestamp and returns it in ``HhMmSs`` format.
   * - ``gosince .Field``
     - Same as ``since`` but accepts a ``time.Time`` value.
   * - ``statusIndicator .Field``
     - Returns a single-character indicator (``✓``, ``⨯``, ``⏳``, ``-``) from a status object.
   * - ``statusMessage .Field``
     - Extracts the human-readable message string from a status object.
   * - ``nodeCount .Field``
     - Formats a node-count pointer, returning ``-`` when nil.

Available Fields by Resource
"""""""""""""""""""""""""""""

The table below lists the fields available for each resource. To discover all fields for a resource
not listed here, use ``--output-type json`` or ``--output-type yaml`` to inspect the raw API
response.

.. list-table::
   :header-rows: 1
   :widths: 15 40 45

   * - Resource
     - List (``orch-cli list``) fields
     - Get / Inspect (``orch-cli get``) additional fields
   * - ``site``
     - ``ResourceId``, ``Name``, ``RegionId``, ``Region.Name``, ``SiteLng``, ``SiteLat``
     - (same fields, shown in detail layout)
   * - ``region``
     - ``ResourceId``, ``Name``, ``ParentId``, ``TotalSites``, ``ParentRegion.Name``
     - (same fields, shown in detail layout)
   * - ``host``
     - ``ResourceId``, ``Name``, ``HostStatus``, ``SerialNumber``, ``Uuid``
     - ``OsProfile``, ``NicIps``, ``LvmSize``, ``HostStatusDetails``, ``ProvisioningStatus``,
       ``UpdateStatus``, ``OsUpdatePolicy``, ``OperatingSystem``, ``BiosVendor``, ``BiosVersion``,
       ``ProductName``, ``CustomConfigs``, ``Metadata``, ``CpuModel``, ``CpuCores``,
       ``CpuArchitecture``, ``CpuThreads``, ``CpuSockets``, ``MemoryGB``, ``Storage``, ``Gpus``,
       ``Usbs``, ``Nics``, ``Cves``, and AMT fields (``AmtEnabled``, ``AmtSku``,
       ``CurrentAmtState``, ``DesiredAmtState``, ``AmtControlMode``, ``AmtDnsSuffix``,
       ``DesiredKvmState``, ``CurrentKvmState``, ``KvmStatus``, ``KvmSessionStatus``,
       ``DesiredSolState``, ``CurrentSolState``, ``SolSessionStatus``, ``CurrentPower``,
       ``DesiredPower``, ``PowerStatus``, ``PowerOnTime``)
   * - ``cluster``
     - ``Name``, ``KubernetesVersion``, ``LifecyclePhase``, ``ProviderStatus``,
       ``ControlPlaneReady``, ``InfrastructureReady``, ``NodeHealth``, ``NodeQuantity``, ``Labels``
     - ``Template``, ``Nodes`` (each node has ``Id``, ``Role``)
   * - ``clustertemplates``
     - ``Name``, ``Description``, ``Version``, ``KubernetesVersion``
     - ``Controlplaneprovidertype``, ``Infraprovidertype``, ``ClusterLabels``, ``ClusterNetwork``
   * - ``deployment-package``
     - ``Name``, ``DisplayName``, ``Version``, ``Kind``, ``DefaultProfileName``, ``IsDeployed``,
       ``ApplicationReferences``
     - ``Description``, ``ApplicationDependencies``, ``Profiles``, ``DefaultNamespaces``,
       ``Extensions``, ``Artifacts``, ``CreateTime``, ``UpdateTime``
   * - ``deployment-package-profile``
     - ``Name``, ``DisplayName``, ``Description``, ``ApplicationProfiles``
     - ``CreateTime``, ``UpdateTime``
   * - ``osprofile``
     - ``Name``, ``Architecture``, ``SecurityFeature``
     - ``ProfileName``, ``OsResourceID``, ``ProfileVersion``, ``Sha256``, ``ImageId``,
       ``ImageUrl``, ``RepoUrl``, ``Description``, ``Metadata``, ``OsType``, ``OsProvider``
   * - ``osupdatepolicy``
     - ``Name``, ``ResourceId``, ``Description``
     - ``TargetOsId``, ``TargetOs.Name``, ``UpdateKernelCommand``, ``UpdatePackages``,
       ``UpdatePolicy``, ``UpdateSources``, ``Timestamps.CreatedAt``, ``Timestamps.UpdatedAt``
   * - ``amtprofile``
     - ``ProfileName``, ``DomainSuffix``
     - ``Version``, ``TenantId``, ``ProvisioningCertStorageFormat``, ``ExpirationDate``
   * - ``sshkey``
     - ``Username``, ``ResourceId``
     - ``SshKey``, ``InUse``, ``UseHosts``

Template Examples
""""""""""""""""""

**Compact table with selected fields:**

.. code-block:: bash

    # Show host serial numbers alongside status
    orch-cli list host \
      --output-template 'table{{.SerialNumber}}\t{{.Name}}\t{{.HostStatus}}'

**Detail view with a status function:**

.. code-block:: bash

    orch-cli get cluster my-cluster \
      --output-template 'Name:\t{{.Name}}\nK8s:\t{{none .KubernetesVersion}}\nPhase:\t{{statusMessage .LifecyclePhase}}\n'

**Iterate over a repeated field:**

.. code-block:: bash

    orch-cli get deployment-package my-pkg\
      --output-template 'Package: {{.Name}}:{{.Version}}
    Applications:{{range .ApplicationReferences}}
      - {{.Name}}:{{.Version}}{{end}}
    '

**Dereference a pointer-wrapped slice with** ``deref``:

.. code-block:: bash

    # OS update policy sources are stored as *[]string
    orch-cli get osupdatepolicy my-policy \
      --output-template 'Policy:\t{{.Name}}\nSources:{{range deref .UpdateSources}} {{.}}{{end}}\n'

.. tip::

    To discover all available fields for a resource, run
    ``orch-cli get <resource> <name> --output-type json``. Every top-level key in the JSON output
    corresponds to a template field accessible as ``{{.FieldName}}``.

Filters
^^^^^^^

The orch-cli supports filtering of the output of the ``orch-cli list`` command. Two types of filters are supported: server-side and client-side.
Server-side filters are paseed via API calls and applied by the server before the response is sent to the client.
These filters are specified using the ``--filter`` flag and support a syntax of ``field=value`` aligning with the https://google.aip.dev/160.
Server side filtering is more efficient as it reduces the amount of data sent over the network and processed by the client, but it may not support all possible filter expressions.
Client-side filters are applied after the data is received from the server and can support more complex expressions,
but they require more data to be transferred and processed by the client. Client-side filters are specified using the ``--output-filter`` flag and support a syntax of ``ffield<op>value``.
Server side filters are applied before client side filters, so if both are specified, the server side filter will narrow down the data set before the client side filter is applied.
Client-side filtering is applied to the output of the command, so it can be used in conjunction with custom templates and output formatting but it is not applied when
using ``--output-type json`` or ``--output-type yaml``.

Server-Side Filter (``--filter``)
""""""""""""""""""""""""""""""""""

The filter expression syntax is ``fieldName=value``. The ``*`` wildcard is supported within
values. For infra resources (``host``, ``site``, ``region``, etc.), values must be
single-quoted (``field='value'``); for catalog and deployment resources
(``deployment-package``, ``application``, ``deployment``), values must be unquoted
(``field=value``).

For infra resources, multiple conditions can be combined with ``AND``; multi-condition
filtering is not supported server-side for catalog and deployment resources.
Use ``--output-filter`` for operators beyond ``=`` or for multi-condition catalog filters.

.. code-block:: bash

    # Infra — exact match and wildcard
    orch-cli list host --filter "serialNumber='9D3Q6S3'"
    orch-cli list host --filter "serialNumber='9D3*'"
    orch-cli list host --filter "serialNumber='9D3*' AND hostStatus='provisioned'"

    # Catalog — exact match and wildcard (no quotes around value)
    orch-cli list deployment-packages --filter "name=observability"
    orch-cli list deployment-packages --filter "name=observ*"

.. note::

    When combining multiple conditions with ``AND``, only the first field name is normalized
    by the CLI. Fields following ``AND`` must use the exact camelCase API field name
    (e.g. ``hostStatus``, not ``host_status``). Comma-separated conditions are not supported
    for server-side filters — use ``AND`` instead.

Client-Side Filter (``--output-filter``)
"""""""""""""""""""""""""""""""""""""""""

Client-side filters are applied locally after the full result set has been received from the
server. The supported operators are ``=``, ``!=``, ``>``, ``<``, ``>=``, ``<=``, and ``~``
(regular expression match). Multiple conditions are combined with a comma (logical AND).
Field names are case-insensitive and accept camelCase, PascalCase, or snake_case variants
(e.g. ``HostStatus``, ``hostStatus``, and ``host_status`` are all equivalent). Nested fields
are accessed with dot notation (e.g. ``Region.Name``). Values may be quoted or unquoted.

.. note::

    ``--output-filter`` is only applied to table output. It has no effect when
    ``--output-type json`` or ``--output-type yaml`` is specified.

.. code-block:: bash

    # Regex match on name
    orch-cli list host --output-filter "Name~'name.*'"

    # Exclude hosts in a specific state
    orch-cli list host --output-filter "HostStatus!='Rebooting'"

    # Combine server-side and client-side: fetch provisioned hosts, then filter by name
    orch-cli list host --filter "hostStatus='provisioned'" --output-filter "Name~'^edge-'"

    # Filter deployment packages not yet deployed
    orch-cli list deployment-packages --output-filter "IsDeployed=false"

    # Multiple conditions (AND)
    orch-cli list host --output-filter "HostStatus=Rebooting,Name~'name.*'"

Ordering and sorting
^^^^^^^^^^^^^^^^^^^^

Output formatting
^^^^^^^^^^^^^^^^^

Orch-cli templates can be used to format output in various ways, such as templated tables or detailed views or JSON or YAML structures.
By deafult the orch-cli outputs in a human-friendly tabular format which is an equivelent of using ``--output-type table`` flag.
To display output in JSON or YAML format, use the ``--output-type`` flag with the desired format:

.. code-block:: bash

    orch-cli list site --output-type json
    orch-cli get host my-host --output-type yaml

.. note::

    When ``--output-type json`` or ``--output-type yaml`` is used, only server side filtering and ordering is applied when respective flags are provided.
    The output will be the raw API response in the specified format.

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