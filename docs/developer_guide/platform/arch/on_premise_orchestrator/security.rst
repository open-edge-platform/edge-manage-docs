Security
========

Throughout development of Edge Orchestrator on-premise, security is always a top priority.
This section provides an overview of the security measures in place, the importance of security for the project, and the security policies that are enforced.


Security Policies
~~~~~~~~~~~~~~~~~
- Prevent unauthorized access of modification of disclosure of assets such as keys, certificates, credentials and date from network or unprivileged SW adversaries or unauthorized users
- Prevent unauthorized user or unprivileged SW adversary access to the Edge Orchestrator
- Protect authenticity and integrity of microservices inter and infra communications
- Protect availability of services from network or unprivileged SW adversaries
- Protect unauthorized access or modification and availability of each tenant's data and resources from other tenant or unprivileged SW adversaries
- Prevent exposure/disclosure and tampering of the following by network or unprivileged SW adversaries:
    User application/data (Images, input/output data), cluster logs, configurations, metrics and alerts.
- Prevent onboarding of unauthorized Edge Nodes and applications
- Prevent authorized but malicious user access to the Orchestrator resources


Authentication
~~~~~~~~~~~~~~

In Edge Orchestrator on-premise, authentication is handled by Keycloak* Identity and Access Management (IAM). User details and permissions are stored within the KeyCloak database.


Incident Response
~~~~~~~~~~~~~~~~~

Incident management is handled by the Edge Orchestrator team. On-Premise Edge Orchestrator components are designed to log activities and events for auditing and incident response purposes.
