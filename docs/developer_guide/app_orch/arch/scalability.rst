Scalability
===========

The Application Orchestration components are designed to be scalable
and to support large-scale deployments. This section provides an overview
of the scalability considerations, the importance of scalability for the
project, and the key supports.

Scalability Support
-------------------

The Application Catalog component is designed to be scalable and can be
deployed currently in a single-node configuration.

Application Deployment Manager and Application Resource Manager
are designed using the Kubernetes\* operator
pattern and can be scaled horizontally by deploying multiple
instances.

The Application Service Proxy performs stateless proxying and
scales horizontally by deploying multiple instances. It is loaded
in proportion to the number of services it is proxying, rather
than the number deployed.

Tenant Provisioner is invoked only at the time of project creation
and deletion and is designed to be stateless and scalable.

Scalability Mechanisms
----------------------

The Application Orchestration components are designed to be scalable
by leveraging the scaling mechanisms of the underlying Kubernetes\*
platform.

