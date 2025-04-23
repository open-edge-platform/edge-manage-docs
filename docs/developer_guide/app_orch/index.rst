Edge Application Orchestrator
=============================

Open Edge Platform |software_prod_name| is a cloud-native
platform for edge computing that enables developers to deploy,
manage, and orchestrate applications at the edge. It provides a
scalable, secure, and flexible infrastructure for running AI and
other applications on edge devices.

Edge Application Orchestration is part of the |software_prod_name|
services provided by the Open Edge Platform, along with Edge Infrastructure
Management and Edge Cluster Orchestrator. It leverages the same set of
services provided by the Orchestration Platform Services, UI, and Observability
framework.

The value of Edge Application Orchestration is to deploy customer applications
at scale, across multiple edge nodes in a way that simplifies the skill set
necessary for deployment, while still facilitating deployment of more complex
applications.

Edge Application Orchestration builds on industry standards such as Helm\*
chart and Docker\* platform to provide an intuitive interface to deploying those workloads
at scale and manage their lifecycle by utilizing |software_prod_name| Edge
Infrastructure Management and |software_prod_name| Edge Cluster Orchestrator.

Customers Highlights
^^^^^^^^^^^^^^^^^^^^^

* **Simplified Application Management**: Aggregate applications and profiles
  into Deployment Packages, streamline the deployment process for complex
  solutions across various environments.
* **Centralized Deployment Management**: Manage multiple edge devices as a
  logical group, ensuring consistent deployment status and configuration across
  all targets.
* **Consistent Workload Management and Access**: Package and deploy containers
  and virtual machines in a uniform manner, allowing them to run side by side
  with capabilities to view, access, and control workloads.
* **Seamless Integration with Edge Cluster Orchestration**: Enable Zero Touch
  Provisioning for efficient and automated deployment.

Developers Highlights
^^^^^^^^^^^^^^^^^^^^^^

* Model-based design naturally extends the concepts of Helm charts, containers,
  and VMs with configuration in a cloud-native way.
* CRUD-based APIs for managing applications, packages, and deployments.
* Built-in proxy to expose edge services for debugging and demonstration,
  even when deployed behind a NAT.

.. toctree::
   :hidden:
   :maxdepth: 1

   arch/index
   tutorials/index


