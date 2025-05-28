Application YAML Reference
==================================================

This document provides a reference for the YAML structure used in the `application.yaml`
file of a Deployment Package within the |software_prod_name| Application Orchestration
framework. It outlines the key components and placeholders that can be utilized
to define applications, their configurations, and deployment settings.

Overview
------------

The source definition of the `Application` is derived from the Application
Catalog API definition message **Application** in the Protobuf file
`resources.proto <https://github.com/open-edge-platform/app-orch-catalog/blob/main/api/catalog/v3/resources.proto>`_.

The `application.yaml` file serves as a way to import and export Application definitions
in to the Application Catalog database. Its format is generated automatically from
the Protobuf definition above.

The :doc:`/api/app_catalog` is which relates to the Application is auto generated
from this Protobuf.

A guide on creating an Application through the Orchestrator Web UI
:doc:`/user_guide/package_software/add_applications`
provides a high-level overview of the process of creating an Application, but
does not cover all aspects of the Application definition.

Definition
------------

`specSchema`
~~~~~~~~~~~~~~

This field specifies the schema type of the file. For an Application, it should
be set to `Application`.

`schemaVersion`
~~~~~~~~~~~~~~~~~

This field indicates the version of the schema being used. It should be set to
`"0.1"` for the current version.

`$schema`
~~~~~~~~~~~~~~

This field provides the URL of the schema definition for validation purposes.

It should be set to
`"https://schema.intel.com/catalog.orchestrator/0.1/schema"`.

`name`
~~~~~~~~~~~~~~

Name is a human readable identifier for the application. It must be present and
should be 1-26 chars long and can contain only lowercase letters, numbers, and hyphens.
It may be used in network URIs.

The `name` and `version` fields together form a unique identifier for the Application
within a |software_prod_name| multi-tenancy Project.

`version`
~~~~~~~~~~~~~~~

Version of the application. Used in combination with the name to identify a unique
Application within a project. It must be present and should be 1-20 chars long and
can contain only lowercase letters, numbers, and hyphens

`displayName`
~~~~~~~~~~~~~~

Display name is an optional human-readable name for the application. When specified,
it must be unique among all applications within a project. It is used for display
purposes on user interfaces. If no `displayName` is provided the Application Catalog
will copy the `name` field to the `displayName` field.

`description`
~~~~~~~~~~~~~~~

A description of the application. Displayed on user interfaces.

`kind`
~~~~~~~~~~~~~~~

An optional field designating whether the application is a system add-on, system extension,
or a normal application. Valid values are **normal**, **extension** or **addon**.
If omitted the default value is **normal**, and is suitable for customer applications.

`chartName`
~~~~~~~~~~~~~~~

The name of the Helm chart that defines the application. This will be concatenated
with the `rootUrl` (Location) of the associated Helm\* Registry.

`chartVersion`
~~~~~~~~~~~~~~~

The version of the Helm chart named above.

`helmRegistry`
~~~~~~~~~~~~~~~

The ID of the project's Registry object where the Helm chart of the application
is available for download. This is a mandatory field.

There are 2 types of registries supported: `HELM` and `IMAGE` in Application Catalog
- this entry must point to a `HELM` type registry. Both OCI and traditional Helm
chart repositories are supported, with certificates and authentication defined in
the Registry object.

Many Registry objects are configured in the Application Catalog by default - see
:doc:`/user_guide/package_software/registry` for details. You can also create
your own Registry object to point to a custom Helm chart repository through the
UI or in a `registry.yaml` file - see :doc:`registry-yaml-reference`.

`imageRegistry`
~~~~~~~~~~~~~~~~

An optional ID of the project's Registry object where the Docker image of the application
is available for download. This entry must point to an `IMAGE` type registry object.
Both OCI and traditional Docker registries are supported.

Many applications will not require this field, as they may have their images in
a public registry such as Docker Hub\*.

See description above on how to reuse or create a Registry object.

The main use of this field is to allow the images to be pulled from a private registry.
To use this private registry, you must create a Registry object in the Application Catalog
and use the :doc:`Placeholders <reference-placeholders>` `%GeneratedDockerCredential%`
and (optionally) `%ImageRegistryURL%` and `%PreHookCredential%` in the values override
for this chart.

`profiles`
~~~~~~~~~~~~~~~

This a repeated set of Application Profiles that can be used to customize the
application deployment. Each profile can have its own set of values files and
parameter templates. The profiles allow users to define different configurations
for the same application, which can be selected at deployment time.

At least one Profile must be defined. If more than one Profile is defined, the
default one will be the first one in the list, unless a `defaultProfileName` is
given.

`profiles.name`
^^^^^^^^^^^^^^^^^^^^^^

The name of the profile. This is a mandatory field of the `profiles` list item.

`profiles.displayName`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An optional human-readable name for the profile. If not specified, the `name` will
be copied in to the displayName.

`profiles.description`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An optional description of the profile. This is displayed on user interfaces.

`profiles.valuesFileName`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The name of the values file to use for this profile. This is a mandatory field
of the `profiles` list item. The values file should be located in the same directory
as the `application.yaml` file. It is used to override the default values of the
Helm chart for this profile.

Even if there is nothing to override, and empty values file should be provided
and named here.

`profiles.parameterTemplates`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A repeated set of parameter templates that can be used to override values in the
Helm chart at deployment time. Each parameter template can have its own name,
display name, default value, and type.

This allows users to customize the application deployment by providing different
values for the parameters defined in the Helm chart.

See the :doc:`/user_guide/package_software/param_template` for how it can be used
in the Web UI.

`profiles.parameterTemplates.name`
""""""""""""""""""""""""""""""""""

The name of the parameter template. This is a mandatory field and the primary key
of the `parameterTemplates` list item. It should match the name of the parameter
that it is overriding the Helm chart.

`profiles.parameterTemplates.displayName`
"""""""""""""""""""""""""""""""""""""""""""

An optional human-readable name for the parameter template. If not specified,
the `name` will be copied in to the `displayName`.

`profiles.parameterTemplates.type`
"""""""""""""""""""""""""""""""""""

The data type of the parameter template. This is a mandatory field and can be one of
`string`, `number`, `boolean`.

`profiles.parameterTemplates.validator`
"""""""""""""""""""""""""""""""""""""""

This is an optional field that can be used to specify a validation function. It is
currently not implemented and should be omitted.

`profiles.parameterTemplates.default`
"""""""""""""""""""""""""""""""""""""""

The default value for the parameter template. This is an optional field and should
not be specified if **mandatory** is `true`.

`profiles.parameterTemplates.suggestedValues`
""""""""""""""""""""""""""""""""""""""""""""""

An optional list of suggested values for the parameter template. This can be used
used to provide a list of values that the user can choose from when deploying.

`profiles.parameterTemplates.mandatory`
"""""""""""""""""""""""""""""""""""""""""

This is an optional boolean field that indicates a value must be given when deploying.

This is useful to prompt the user to provide a value for the parameter, especially
when the parameter cannot be predicted before deployment time, such as an ip address
or a password.

`profiles.parameterTemplates.secret`
"""""""""""""""""""""""""""""""""""""""""

This is an optional boolean field that indicates the parameter is a secret and should
not be displayed in the UI. Within the orchestrator this value will be stored in a
kubernetes Secret and will not be displayed in the UI or logs or be accessible
through the API. It is useful for sensitive information such as passwords or
API keys.

`profiles.deploymentRequirement`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an optional repeated set of references to Deployment Packages that must
be deployed first, before this Application.

.. note:: This may be useful for example with VM applications where the Virtualization
   deployment package must be deployed first.
   Since it has no way of handling `mandatory` parameterTemplates it is not
   possible to use this field to enforce the deployment of the LoadBalancer extension
   before the application that uses it.

`profile.deploymentRequirement.name`
""""""""""""""""""""""""""""""""""""

The name of the Deployment Package that must be deployed first. Together with the
`version` field, it uniquely identifies the Deployment Package that must be deployed
first. This is a mandatory field of the `deploymentRequirement` list item.

`profile.deploymentRequirement.version`
""""""""""""""""""""""""""""""""""""""""

The version of the Deployment Package that must be deployed first.
Together with the `name` field, it uniquely identifies the Deployment Package that
must be deployed first. This is a mandatory field of the `deploymentRequirement`
list item.

`profile.deploymentRequirement.deploymentProfileName`
""""""""""""""""""""""""""""""""""""""""""""""""""""""

This is the name of the Deployment Profile to use within the Deployment Package.
It is an optional field of the `deploymentRequirement` list item, and the default
Deployment Profile will be used if not specified.

`defaultProfileName`
~~~~~~~~~~~~~~~~~~~~

This is an optional field that specifies the name of the default profile to use
when deploying the application. If not specified, the first profile in the `profiles`
list will be used as the default profile.

`ignoredResources`
~~~~~~~~~~~~~~~~~~~

This is a repeated set of resources that should be ignored by the reconciliation
process of the Application Deployment Manager.

.. note::

    This feature is an advanced topic and is not needed for most applications.
    It should only be used when necessary.

It is useful for ignoring resources from the Helm Chart manifest that are modified
post deployment by an operator or other process. As the deployment manager checks
that all aspects of the application are deployed as specified in the Helm Chart,
it will not be able to reconcile the changes made to these resources. Therefore
they can be added to this list to prevent the reconciliation process from failing.

See the :doc:`Troubleshooting Guide "Deployment does not complete" </user_guide/troubleshooting/deploy_issue>`
for more information on how to identify when to use this field.

`ignoredResources.name`
^^^^^^^^^^^^^^^^^^^^^^^

The name of a resource to ignore. This is a mandatory field of the `ignoredResources`
list item.

`ignoredResources.kind`
^^^^^^^^^^^^^^^^^^^^^^^^

The Kind of the resource to ignore. This is a mandatory field of the `ignoredResources`.

Currently supported Kinds are:

- `ConfigMap`
- `Secret`
- `ValidatingWebhookConfiguration`
- `MutatingWebhookConfiguration`
- `CustomResourceDefinition`
- `EnvoyFilter`
- `Deployment`
- `Job`.

`ignoredResources.namespace`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The namespace of the resource to ignore. This is an optional field of the `ignoredResources`
list item. If the Kind is an object at the cluster scope, such as a `CustomResourceDefinition`,
then the namespace is not required and should be omitted. For other objects such
as `ConfigMap` or `Secret` the namespace should be specified.


Example
------------

An example of an `application.yaml` from the
:doc:`Tutorial </developer_guide/app_orch/tutorials/deployment-packages/index>`

.. code:: yaml

    specSchema: Application
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    name: tutorial-server
    version: "0.1.0"
    description: "Tutorial Server"

    imageRegistry: "harbor-docker-oci"
    helmRegistry: "harbor-helm-oci"
    chartName: "tutorial-server"
    chartVersion: "0.1.0"

    profiles:
    - name: "default"
      valuesFileName: "tutorial-server-values-default.yaml"
    - name: "alternate"
      valuesFileName: "tutorial-server-values-alternate.yaml"
    - name: "alternate-pt"
      valuesFileName: "tutorial-server-values-alternate-pt.yaml"
      parameterTemplates:
      - name: "greeting"
        displayName: Greeting message
        default: "Deployed by Application Orchestration (pt)"
        type: string
      - name: "initialCount"
        displayName: Initial count
        default: "0"
        type: string

