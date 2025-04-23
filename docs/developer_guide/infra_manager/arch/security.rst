.. _security:

Security
====================

Security is a critical aspect of Edge Infrastructure Manager. This section
provides an overview of the security measures and mitigations in place such as
security policies, authentication, access control, auditing, and incident
response.

All data is designed to be secure and encrypted at rest and in transit. The
security policies are designed to protect data, user privacy, and ensure
compliance with industry standards.

Security Policies
----------------------

Security of Edge Infrastructure Manager is provided in the first instance by
the underlying |software_prod_name| Platform Services. The platform services
and Edge Infrastructure Manager security features are designed to maximize and
are built on top of the security features of the Kubernetes Platform. The
security mechanisms include:

* Isolation of namespaces and secure communication between components provided
  by the service mesh `Istio <https://istio.io/>`_

* Role-based access control (RBAC) and Attribute-based access control (ABAC)

* Identity and Access Management (IAM)

* Network Policies

* Secure communication between the |software_prod_name| and external services
  such as Release Service

* Reduction of attack surface by limiting the number of exposed services

* Secure storage of secrets and configuration data into the secrets management
  service

* Common library to flag potential security events

* Containers are distributed in images with security settings to the most
  stringent ones (defined security contexts are the least privileged ones) and
  disable unnecessary services and modules

* Related to data management, Edge Infrastructure Manager provides instructions
  to migrate data schemas in its inventory system and how to build smooth
  migrations between releases

* As of backup and restore of data, Edge Infrastructure Manager relies on an
  external Postgres database service

Given the nature of the data handled by Edge Infrastructure Manager, privacy
guidelines and best practice for handling personal data are not applicable.

The REST API of Edge Infrastructure Manager is further hardened to defend in
depth API endpoints with rate limiter and allowed burst size of requests.
Limits to max sizes for body and headers are imposed; the system validates the
content and enforce format of the fields of resources in the requests. Enforces
timeout of read and write of requests, and maximum amount of seconds to wait
for the next request when keepalives are enabled.

Additionally, defines HTTP header settings for protection against:
clickjacking; cross-site scripting attack; overriding Content-Type header; code
injection attacks resulting from execution of malicious content in the trusted
web page context. It does not allow method overrides, enforces a set of allowed
methods per each endpoint and enables COR with custom settings of allowed
methods and headers.

At the southbound, secure communication, authentication and authorization
mechanisms between the edge devices and the Edge Infrastructure Manager backend
services are also in use to guarantee proper security standards.

Finally as regards edge devices onboarding and provisioning, Edge
Infrastructure Manager leverages Secure Boot security standard and full disk
encryption. In particular, the digital signatures used during the secure boot
verify the integrity of the iPXE payload, the micro-OS used to drive the
provisioning process and the final OS that is installed in the devices.

Authentication
--------------

In the |software_prod_name| platform, authentication is handled by the
`Keycloak <https://www.keycloak.org/>`_ Identity and Access Management (IAM)
platform. User details and permissions are stored in the Keycloak database.
Keycloak's authentication can be extended by connecting to upstream Identity
Providers such as Azure or LDAP.

Edge Infrastructure Manager endpoints are secured using OpenIDConnect generated
JWT tokens for defense-in-depth. The tokens are passed as a Bearer tokens in
all API calls, and are validated against Keycloak's public keys (rotated
regularly). The tokens are used to authenticate the user and authorize the
user's access to the API endpoints and later to perform access control (see
next section). This builds on top of a first cursory check performed by the
|software_prod_name| API Gateway.

Access Control
-----------------

The set of roles in the token are extracted and checked against a set of
policies that are written using `OPA <https://www.openpolicyagent.org/>`_ query
language (REGO rules) and verified at run time by the OPA module that is loaded
in the boundary components (micro-services exposing an API) and in the
Inventory service.

Role based Access Control (RBAC) is performed right after the authentication
phase to ensure that the user has the necessary permissions to perform
read/write operations.

Attribute-based access control (ABAC) is also implemented in the system to
provide fine-grained access control on the resources. The ABAC policies are
defined in the Inventory service and enforced before accessing the persistent
storage.  Components in Edge Infrastructure Manager adhere to different
policies: for example, API is allowed to modify the desired state of the
resources whereas the Resource Managers are allowed to modify the current state
of the resources.

These access control mechanisms builds on top of the multi-tenancy mechanisms
that ensure proper isolation across tenants.

Auditing
-----------

API calls are logged to the |software_prod_name| logging system. Auditing is
performed in a transparent way by injecting a middleware in the Edge
Infrastructure Manager API component. The path, operation request, response,
errors, status and the user (extracted from the JWT) are logged. The gRPC calls
to Inventory are also intercepted; both incoming and outgoing of the gRPC
handler. The operation, request, response, errors, status, and the user are
logged. However, by default the auditing interceptor is disabled in Inventory.

The auditing logs are available through the |software_prod_name| Observability
platform.

Incident Response
---------------------

Overall incident response is managed by the |software_prod_name| Platform and
Observability components. The Edge Infrastructure Manager components are
designed to logs activities clearly and concisely to the |software_prod_name|
logging system which is used by the upper-level components to detect and
respond to incidents.
