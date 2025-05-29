Deployment Package YAML Reference
=====================================

This document provides a reference for the YAML structure used in Deployment Packages
within the |software_prod_name| Application Orchestration framework. It outlines
the key components and placeholders that can be utilized to define applications,
their configurations, and deployment settings.

Overview
------------

The source definition of the `DeploymentPackage` definition is derived from the Application
Catalog API definition message **DeploymentPackage** in the Protobuf file
`resources.proto <https://github.com/open-edge-platform/app-orch-catalog/blob/main/api/catalog/v3/resources.proto>`_.

The `deployment_package.yaml` file serves as a way to import and export DeploymentPackage
definitions in to the Application Catalog database. Its format is generated automatically
from the Protobuf definition above.

The :doc:`/api/app_catalog` is which relates to the DeploymentPackage is auto generated
from this Protobuf.

A guide on creating an DeploymentPackage through the Orchestrator Web UI
:doc:`/user_guide/package_software/add_deploy_pack`
provides a high-level overview of the process of creating an DeploymentPackage, but
does not cover all aspects of the DeploymentPackage definition.

Since the DeploymentPackage is essentially a collections of Applications, this
reference can be used alongside the corresponding :doc:`application-yaml-reference`.

When using the YAML format, the user must use `yamllint <https://yamllint.readthedocs.io/en/stable/>`_
to check the syntax of the YAML files and the `YAML schema
<https://github.com/open-edge-platform/cluster-extensions/blob/main/catalog-orchestrator-0.1.schema.yaml>`_
to validate that the file is structured correctly. Many integrated development
environments (IDEs) allow importing a YAML schema to aid in the editing
process. These checks will also be applied by the API and UI when the files are
uploaded.

Definition
-------------

`specSchema`
~~~~~~~~~~~~~~

This field specifies the schema type of the file. For a DeploymentPackage, it should
be set to `DeploymentPackage`.

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

Name is a human readable identifier for the DeploymentPackage. It must be present and
should be 1-40 chars long and can contain only lowercase letters, numbers, and hyphens.

The `name` and `version` fields together form a unique identifier for the DeploymentPackage
within a |software_prod_name| multi-tenancy Project.

`version`
~~~~~~~~~~~~~~~

Version of the application. Used in combination with the `name` to identify a unique
DeploymentPackage within a project. It must be present and should be 1-20 chars
long and can contain only lowercase letters, numbers, and hyphens

`displayName`
~~~~~~~~~~~~~~

Display name is an optional human-readable name for the DeploymentPackage. When
specified, it must be unique among all DeploymentPackages within a project. It is
used for display purposes on user interfaces. If no `displayName` is provided the
Application Catalog will copy the `name` field to the `displayName` field.

`description`
~~~~~~~~~~~~~~~

A description of the DeploymentPackage. Displayed on user interfaces.

`kind`
~~~~~~~~~~~~~~~

An optional field designating whether the DeploymentPackage is a system add-on,
system extension, or a normal DeploymentPackage. Valid values are **normal**,
**extension** or **addon**. If omitted the default value is **normal**, and is
suitable for customer applications.

`applications`
~~~~~~~~~~~~~~~~~~~~~~~~

A list of references to the applications that are part of this DeploymentPackage
expressed as (name, version) pairs. It is usual to have multiple applications
in a DeploymentPackage, but at least one is required. At import time, the
Application Catalog will check that the Application is in the bundle or already
present in the catalog.

`applications.name`
^^^^^^^^^^^^^^^^^^^^

Name of the referenced application.

`applications.version`
^^^^^^^^^^^^^^^^^^^^^^^

Version of the referenced application.

`deploymentProfiles`
~~~~~~~~~~~~~~~~~~~~~~

A list of Deployment Profiles that define how the Applications in the DeploymentPackage
are to be deployed. Each Deployment Profile can contain multiple Application Profiles.

`deploymentProfiles.name`
^^^^^^^^^^^^^^^^^^^^^^^^^

Name of the Deployment Profile. It must be unique within the DeploymentPackage.

`deploymentProfiles.displayName`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An optional human-readable name for the Deployment Profile. If not specified, the
Application Catalog will copy the `name` field to the `displayName` field.

`deploymentProfiles.description`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An optional description of the Deployment Profile. Displayed on user interfaces.

`deploymentProfiles.applicationProfiles`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A list of Application Profiles that define which Application Profile to use for
each Application in the DeploymentPackage.

`deploymentProfiles.applicationProfiles.application`
"""""""""""""""""""""""""""""""""""""""""""""""""""""

Name of the Application for which the profile is defined. It must match one of
the names in the `applications` list at the top level of the DeploymentPackage.

`deploymentProfiles.applicationProfiles.profile`
"""""""""""""""""""""""""""""""""""""""""""""""""""""

Name of the Application Profile for the named Application. Application Profiles
are defined in the Application's `application.yaml` file.

`defaultProfileName`
~~~~~~~~~~~~~~~~~~~~~~

An optional field that specifies the name of the default Deployment Profile to
use when deploying the DeploymentPackage. If not specified, the first Deployment
Profile in the `deploymentProfiles` list will be used as the default.

`applicationDependencies`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An optional list of dependencies between applications in the DeploymentPackage.
This can be used to define the order in which Applications should be deployed.

Many Applications can depend on the same Application, and an Application can
depend on multiple Applications. The list should not include circular dependencies.

This is an optional field and can be omitted if all the Applications can be
installed in parallel without any dependencies.

In a normal deployment the Application Deployment Manager will deploy the Applications
in parallel as would happen with a Helm\* "umbrella" chart. This `dependencies`
feature is useful when Jobs or Hooks in one Application expect something from another
Application to be in place before it runs.

In the case of a Deployment Package with multiple Applications, the deployment
may be faster if the Applications can be deployed in order, rather than in parallel.
This could be the case when larger applications have dependencies on resources
from smaller applications.


`applicationDependencies.application`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Name of the Application that has a dependency. This must be one of the Applications
listed in the `applications` section of the DeploymentPackage

`applicationDependencies.dependsOn`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Name of the Application that the first Application depends on. This must be
one of the Applications listed in the `applications` section of the DeploymentPackage.

`defaultNamespaces`
~~~~~~~~~~~~~~~~~~~~

A list of default namespaces for each Application in the DeploymentPackage.

The list is given as a map of Application names to namespace names. If not specified,
the Application Deployment Manager will create a default namespace for each Application
in the format `deployment-<hash>`. Many applications can share the same namespace.

If specified, the Application Deployment Manager will deploy the Application to
the Edge Node cluster in the specified namespace. It is the equivalent to specifying
a namespace when using the `helm install` command.

Regardless of whether a namespace is prescribed like this or default is used, the
Deployment Manager will create a NetworkPolicy for the namespace with full Ingress
and Egress permissions for Applications in the namespace.

.. note::

   While individual resources in a Helm\* Chart can explicitly specify a namespace,
   this is discouraged, as it will ignore this `defaultNamespaces` for that resources
   and lead to confusion about which namespace the Application is deployed to. See
   this, and other Helm Chart best practices in :doc:`../deployment-helm/index`.


`defaultNamespaces.<application>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The name of the Application for which the namespace is specified. This must be
one of the Applications listed in the `applications` section of the DeploymentPackage.

The `namespace` value given must be a valid Kubernetes namespace name, which means
it must be 1-63 characters long, start with a lowercase letter or number, and
contain only lowercase letters, numbers, and hyphens. It must not start or end with a hyphen.

The `default` namespace is not allowed, as it is reserved for the Kubernetes system.

`namespaces`
~~~~~~~~~~~~~~~~~~~~

An optional list of `namespaces` to create **in advance** of deploying the Applications
in the DeploymentPackage. This is useful if the Application requires a namespace
with specific labels or annotations to be created before any other resources. All
Applications in the DeploymentPackage will then become **dependencies** of the namespace
deployment.

.. note::

    This can be useful when a namespace label is used as a trigger for the injection
    of a sidecar container, such as the Istio\* sidecar.

The `namespaces` works independently of the `defaultNamespaces` list. The `namespaces`
list will be created explicitly before any dependencies. If the `defaultNamespaces`
has a corresponding namespace defined, there will be no conflict, and the Application
specified will be deployed as normal.

If the `defaultNamespaces` has a namespace not on the `namespaces` list, then that
namespace will be created on demand as the Application is deployed, much like the
`--create-namespaces` flag when using the `helm install` command.

`namespaces.name`
^^^^^^^^^^^^^^^^^^^

Name of the namespace to be created. It must be a valid Kubernetes namespace name.

`namespaces.labels`
^^^^^^^^^^^^^^^^^^^^

A map of labels to be applied to the namespace. Labels are key-value pairs that
can be used to organize and select resources in Kubernetes.

`namespaces.annotations`
^^^^^^^^^^^^^^^^^^^^^^^^

A map of annotations to be applied to the namespace. Annotations are key-value
pairs that can be used to store arbitrary metadata about the namespace.


Example
--------

An example of an `application.yaml` from the
:doc:`Tutorial </developer_guide/app_orch/tutorials/deployment-packages/index>`

.. code:: yaml

    specSchema: DeploymentPackage
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    description: Application Orchestration Tutorial Deployment Package
    name: app-orch-tutorial-dp
    displayName: "Tutorial DP"
    version: "0.1.0"

    applications:
    - name: tutorial-server
      version: "0.1.0"
    - name: tutorial-web-ui
      version: "0.1.0"

    deploymentProfiles:
      - name: "default-profile"
        displayName: "Default Configuration"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "default"
          - application: "tutorial-web-ui"
            profile: "default"
      - name: "alternate"
        displayName: "Alternate Configuration"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "alternate"
          - application: "tutorial-web-ui"
            profile: "default"
      - name: "alternate-pt"
        displayName: "Alternate with Parameter Templates"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "alternate-pt"
          - application: "tutorial-web-ui"
            profile: "default"

    defaultNamespaces:
        tutorial-server: tutorial
        tutorial-web-ui: tutorial

