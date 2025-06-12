Registry YAML Reference
==================================================

This document provides a reference for the YAML structure used in the `registry.yaml`
file of a Registry object within the |software_prod_name| Application Orchestration
framework. It outlines the key components that can be utilized to represent a
container registry, which is essential for managing Helm Charts and their associated
images.

Overview
------------

The source definition of the `Registry` is derived from the Application
Catalog API definition message **Registry** in the Protobuf file
`resources.proto <https://github.com/open-edge-platform/app-orch-catalog/blob/main/api/catalog/v3/resources.proto>`_.

The `registry.yaml` file serves as a way to import and export Registry definitions
in to the Application Catalog database. Its format is generated automatically from
the Protobuf definition above.

The :doc:`/api/app_catalog` is which relates to the Registry is auto generated
from this Protobuf.

A guide on creating an Registry through the Orchestrator Web UI
:doc:`/user_guide/package_software/add_registry`
provides a high-level overview of the process of creating an Registry, but
does not cover all aspects of the Registry definition.

Definition
------------

`specSchema`
~~~~~~~~~~~~~~

This field specifies the schema type of the file. For a Registry, it should
be set to `Registry`.

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

Name is a human readable identifier for the Registry. It must be present and
should be 1-40 chars long and can contain only lowercase letters, numbers, and hyphens.

The `name` is the unique identifier for the Registry within a |software_prod_name|
multi-tenancy Project.

`displayName`
~~~~~~~~~~~~~~

Display name is an optional human-readable name for the Registry. When
specified, it must be unique among all Registries within a project. It is
used for display purposes on user interfaces. If no `displayName` is provided the
Application Catalog will copy the `name` field to the `displayName` field.

`description`
~~~~~~~~~~~~~~~

A description of the Registry. Displayed on user interfaces.

`type`
~~~~~~~~~~~~~~~

A required field designating whether the Registry is `Helm` or `Image`.

`rootUrl`
~~~~~~~~~~~~~~~

Root URL for retrieving artifacts, e.g. Docker images and Helm charts, from the
registry. This URL should point to the base path of the registry service.
It can start with `http://` or `https://` or `oci://` and can include a path,
if the registry service is partitioned in to projects or otherwise.

`inventoryUrl`
~~~~~~~~~~~~~~~

Optional URL of the API for accessing inventory of artifacts hosted by the registry.
This URL is only useful when type is `HELM` and when the registry is backed by
Harbor 2.10 or later (OCI only).

`userName`
~~~~~~~~~~~~~~~

Username for authenticating with the registry. This field is optional and only necessary
for private registries that require authentication.x

`authToken`
~~~~~~~~~~~~~~~

Password for authenticating with the registry. This field is optional and only necessary
for private registries that require authentication. This is expected to be present
when the `userName` is present.

Once loaded in to the Application Catalog the username and password to a registry
are stored as a Secret in the Orchestrator.

`caCerts`
~~~~~~~~~~~~~~~

Optional CA certificates for accessing the registry using secure channels, such
as HTTPS or OCI protocols when the Certificate does not come from a public
Certificate Authority (CA). The certificates should be in PEM format, and a chain
of certificates can be provided as a single string, with each certificate separated
by a newline character (`\n`).

Example
-------------

.. code:: yaml

    specSchema: "Registry"
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    name: "bitnami-helm-oci"
    description: "Bitnami helm registry"
    type: "HELM"

    rootUrl: "oci://registry-1.docker.io/bitnamicharts"
