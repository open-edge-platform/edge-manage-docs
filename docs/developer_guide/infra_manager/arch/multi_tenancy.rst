Multi-Tenancy
=============

Multi-tenancy is a key feature of |software_prod_name| and is integrated
into the Edge Infrastructure Manager's internal implementation. All APIs, both
at the north (REST API) and south (gRPC APIs towards the Edge Node) of the
system, are designed to be multi-tenant, and all components in the system are
multi-tenant aware.

Assumptions
-----------

- Tenants in |software_prod_name| are uniquely identified by a Tenant ID.

- Tenant ID are UUID strings, and are created and managed outside the Edge
  Manageability Framework.

- Resources within Edge Infrastructure Manager cannot be shared across tenants.

- All API calls (south and north) must be uniquely identified by a Tenant ID.

- In Edge Infrastructure Manager terms, a tenant is equivalent to a project
  within an organization in |software_prod_name|.

- Each Edge Node belongs to a single tenant.

- Resources cannot be moved across tenants, including Edge Nodes.

- Tenant updates are not handled within Edge Infrastructure Manager. Therefore,
  the system does not support tenant updates. The only supported operations are
  tenant creation and deletion.

Multi-tenant Data Model
-----------------------

Multi-tenancy is supported in the data model by adding a Tenant ID column to each
table in the database, providing a virtual slice of each table to every tenant.
Apart from very few queries (highlighted below), all queries in the database must
be filtered by Tenant ID, using a ``WHERE tenant_id = <tenant_id>`` clause in the
SQL query. This is enforced by using an ORM level interceptor (`Ent Interceptors <https://entgo.io/docs/interceptors/>`_)
that adds the clause to all queries.

A Tenant table is available in the database, containing the list of all tenants
in the system. This table is also used for internal synchronization between
services in the Edge Infrastructure Manager that collaborate for tenant
bootstrap and teardown. Creation and deletion of entries in this table are
handled only by the Edge Infrastructure Manager Tenant Controller. The Tenant
table contains the following fields:

- `tenant_id`: The Tenant ID (UUID) created and managed outside the Edge
  Manageability Framework.

- `desired_state`: The desired state of the tenant, which can be `UNKNOWN`,
  `CREATED`, or `DELETED`.

- `current_state`: The state last reported to the Platform Tenant Manager by the
  Tenant Controller, using the same states as `desired_state`. Updated by the
  Tenant Controller.

- `watcher\*`: Boolean fields used to synchronize the bootstrap and teardown
  process between the Tenant Controller and other Resource Managers. One
  per-each Resource Manager. These fields are set to `true` when the resource
  manager has completed the bootstrap process. The fields are set by the
  Resource Managers and read by the Tenant Controller.

Inventory
---------

The Inventory client is multi-tenant aware, and all internal gRPC APIs require a
Tenant ID to be provided; otherwise, the API call will be rejected. The only
internal APIs that allow for cross-tenant queries are the `ListResources` and
`FindResources` APIs. These APIs provide custom filters for resource filtering
but do not explicitly require a Tenant ID. If a user wants to query within a
single tenant, a Tenant ID filter must be explicitly provided.

Tenant Controller and OS Resource Manager
-----------------------------------------

The `platform-provided Tenant Manager <https://github.com/open-edge-platform/orch-utils/tree/main/tenancy-manager>`_
provides events to the `Edge Infrastructure Manager Tenant Controller (TC) <https://github.com/open-edge-platform/infra-core/tree/main/tenant-controller>`_
for handling the tenant lifecycle (creation, updates, and deletion). The TC is
responsible for handling tenants in the Edge Infrastructure Manager. During the
bootstrap process, it first creates an entry in the Tenant table, then coordinate
other components within Edge Infrastructure Manager. This is done by listening
to internal tenant events from other components and watching for changes to the
watcher in the Tenant table. When other components complete their bootstrap process,
they signal the TC by acknowledging the watcher in the Tenant table.

Currently, only the OS Resource Manager participates in the tenant bootstrap
process, but the system is designed to be extended if more components need to
collaborate. The OS Resource Manager handles the creation of OS Profiles within
Edge Infrastructure Manager, fetching them from the Release Service. The TC
handles the creation of the Provider and its configuration, which requires the
OS Profile creation. Therefore, the TC needs to wait for the OS Resource Manager
to complete its bootstrap before continuing with the tenant bootstrap. Once the
bootstrap process is completed, the TC signals the Tenant Manager that the
tenant is ready.

The teardown process is handled by the TC, which orderly deletes all resources.
Some resources require collaboration with other Resource Managers. For example,
when deleting an Edge Node, the TC waits for the de-authorization of the Edge
Node credentials before continuing with the tenant teardown. The TC also
implements a fallback mechanism; if other Resource Managers do not collaborate,
it proceeds to forcefully delete all resources.

The TC does not handle tenant updates, as mentioned in the assumptions.

REST APIs
---------

The REST APIs are multi-tenant aware, and all APIs require a Tenant ID to be
provided in the request. This is achieved by using a custom header in the
request called ActiveProjectID, which contains the Tenant ID. Additionally, each
request contains a JWT (JSON Web Token) where all assigned roles are defined.
Roles are expected to be provided in the format TenantID_Role.

When the REST API component receives a request, it performs the usual JWT checks
for validity and roles. Additionally, the component determines if the provided
Tenant ID matches the Tenant ID in the roles part of the JWT, acting as the
Policy Enforcement Point (PEP) for external northbound requests. If there is a
match, the request is allowed; if there is no match, the request is denied.

Given the above, the REST APIs cannot perform cross-tenant queries, as the
ActiveProjectID header is mandatory and the JWT must contain the Tenant ID in
the roles.

gRPC APIs
----------

Almost all southbound gRPC interfaces require the presence of the Tenant ID. The
only exception is the Non-Interactive Onboarding streaming gRPC APIs. The Tenant
ID is not explicit in our gRPC API definition; instead, we rely on the
assumption that each Edge Node belongs to a single tenant. As mentioned above,
roles in the JWT are defined in the format TenantID_Role. Given these
assumptions, we can infer the Tenant ID from the roles. In the Resource
Managers, we have a special interceptor on our gRPC APIs that extracts the
Tenant ID from the roles and adds it to the context of the request. The server
code implementation of the API extracts the Tenant ID from the context and uses
it explicitly in all internal subsequent requests (e.g., to Inventory).

Resource Managers also act as PEPs by validating the roles in the JWT.

As mentioned earlier, the only API that does not require and enforce Tenant ID
presence is the Non-Interactive Onboarding API. The reason is clear from the
workflow: a blank, booted edge node does not know to which tenant it belongs and
discovers that by reaching out to the Edge Orchestrator for the first time.
