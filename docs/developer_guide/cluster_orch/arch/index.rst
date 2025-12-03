Architecture
============

Cluster Orchestrator is the cluster life cycle management solution in |software_prod_name|. It is the platform that enables the management
of edge clusters.

In this section, you will find the solutions and architecture documentation for
projects under the umbrella of Cluster Orchestration. Cluster Orchestration consists of
components in |software_prod_name|, such as Cluster Manager, Cluster API Provider
Intel, and Cluster Connect Gateway and Agent, that are responsible for the life
cycle management of edge clusters, including creation, deletion, upgrade, scaling,
and monitoring. Cluster Orchestration is built on top of Cluster API (CAPI) and hides the complexity
of managing Kubernetes* clusters from the end user by providing a generic API to
manage clusters.

Features
^^^^^^^^

- **Cluster Management**: Provides capabilities to create, update, delete, and
  monitor edge clusters.
- **Cluster API Operator**: Manages the lifecycle of Kubernetes clusters using
  a declarative approach provided by Cluster API (CAPI).
- **Multi-tenancy**: Allows multiple projects to coexist within the same
  infrastructure while maintaining isolation and security.
- **Authentication and RBAC**: Integrates with authentication and role-based
  access control (RBAC) systems to ensure secure access to cluster resources.



.. toctree::
   :hidden:

   architecture
   workflows
   deployment
   technology_stack
