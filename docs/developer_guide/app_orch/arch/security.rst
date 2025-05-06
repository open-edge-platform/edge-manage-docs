Security
========

Security is a critical aspect of Application Orchestration. This section provides
an overview of the security measures in place, security policies, authentication,
access control, auditing, and incident response.

All data is designed to be secure and encrypted at rest and in transit. The
security policies are designed to protect data, user privacy, and ensure
compliance with industry standards.

Security Policies
-----------------

Security of the Application Orchestration components is provided in the first
instance by the underlying |software_prod_name| Platform Services. It is designed
to maximize the security features of the Kubernetes\* Platform that the
|software_prod_name| is installed on, by the following security policies:

* Isolation of namespaces by Service Mesh
* Role-based access control (RBAC)
* Identity and Access Management (IAM)
* Network Policies
* Secure communication between components
* Secure communication between the |software_prod_name| and the
  |software_prod_name| Release Service
* Reduction of attack surface by limiting the number of exposed services
* Defense in depth on API endpoints
* Secure storage of secrets and configuration data in Vault

Authentication
--------------

In the |software_prod_name| platform, authentication is handled by the Keycloak\*
Identity and Access Management (IAM) platform. User details and permissions are
stored in the Keycloak database. Keycloak database's authentication can be extended by
connecting to upstream Identity Providers such as Microsoft Azure\* or LDAP.

Application Orchestration endpoints sit behind the Multi-Tenancy API Gateway. At both levels they are secured using OpenIDConnect-generated JSON Web Tokens (JWTs) for
defence in depth. The tokens are passed as a Bearer tokens in all API calls, and
are validated against Keycloak database's public keys (rotated every on a regular basis).

Access Control
--------------

As the Application Orchestration components APIs are accessed, the set of roles in
the token are extracted and checked against a set of policies (REGO rules) in the
Open Policy Agent (OPA sidecar). This ensures the user has the necessary
permissions to access the resource (thereby implementing Role Based Access
Control).

Auditing
--------

As part of the Application Orchestration components, API calls are logged to the
|software_prod_name| logging system. These logs are available through the
|software_prod_name| Observability platform. Where the API call is from an
external system, it will include a JWT that includes the name of the user
and this will be added to the log entry, thereby enforcing an Audit trail.

Incident Response
-----------------

Overall incident response is managed by the |software_prod_name| Platform and
Observability components. The Application Orchestration components are designed
to logs activities clearly and concisely to the |software_prod_name| logging
system, which are used by the upper-level components to detect and respond to
incidents.
