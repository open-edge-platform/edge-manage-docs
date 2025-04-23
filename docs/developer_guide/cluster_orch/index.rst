Edge Cluster Orchestrator
=========================

Overview
---------
A lightweight multi-cluster orchestrator based the Cluster API (CAPI) standard. It is
designed to automate the deployment and lifecycle management of Kubernetes* clusters
at scale across distributed edges, providing centralized monitoring and access control.

Customers Highlights
^^^^^^^^^^^^^^^^^^^^^

* Create Kubernetes clusters on Edge Infrastructure Manager-managed physical or virtual hosts and manage their
  lifecycle using a REST API or a web-based UI.
* Import existing Kubernetes clusters anywhere for centralized monitoring and consistent
  operation.
* Uniformly define cluster specifications and deploy default security policies and
  applications across a fleet of clusters using cluster templates.
* Securely access the clusters through a built-in proxy for deploying workloads or
  troubleshooting.
* Upgrade existing clusters to apply security patches or new versions with minimal
  downtime.
* Label clusters to create a logical group and schedule workloads efficiently.

Developers Highlights
^^^^^^^^^^^^^^^^^^^^^^

* Built with Kubernetes operators and cloud-native principles for scalability,
  maintenance, and extensibility.
* Expose CRUD-based APIs and declarative K8s style CRDs for UI/User for managing clusters
  and cluster templates.
* Expose APIs and K8s CRDs to application orchestrator to manage workloads on fleet of
  clusters.

Key Performance Indicators
---------------------------

* Create cluster in less than 10 minutes and delete in 5 minutes, on par with industry
  standard
* Support a wide range of Kubernetes distributions through integration with Cluster API
* Support on-prem environments behind FW/NAT without the need to expose the edge to
  external network
* Centralized authentication and role-based access control for accessing workload
  clusters through a built-in proxy
* Catalog of pre-curated K8 add-ons that implement security best practices and bootstrap
  cluster for application deployment
* Centralized monitoring and alerting with comprehensive observability deck including
  logs and metrics

.. toctree::
   :hidden:
   :maxdepth: 1

   arch/index


