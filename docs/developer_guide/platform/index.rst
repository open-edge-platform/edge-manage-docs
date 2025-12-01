Platform Services
=================

Learn more about how the Edge Orchestrator is deployed:


Key Components
--------------

Platform Services components include:

- `edge-manageability-framework
  <https://github.com/open-edge-platform/edge-manageability-framework>`_ - The
  central hub for deploying the Edge Orchestrator. It includes Argo\* CD
  applications, Helm\* charts, and deployment scripts necessary for setting up
  the Edge Orchestrator in various environments, including on-premise and
  cloud-based setups.

- `orch-utils <https://github.com/open-edge-platform/orch-utils>`_ - The
  orch-utils repository provides various utility functions and tools that
  support the deployment and management of the Edge Orchestrator. This includes
  Kubernetes\* jobs, Helm charts, Dockerfiles, and Go\* code for tasks such as
  namespace creation, policy management, Traefik route configuration, IAM and
  multitenancy.


.. toctree::

   arch/index
   buildall