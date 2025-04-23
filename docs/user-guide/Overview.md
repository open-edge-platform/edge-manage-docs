---
orphan: true
---

<!-- This file provides the content for the Catalog card and detail page. Do not remove sections marked as required.-->

# Edge Orchestrator

<!--REQUIRED: Add a short description without including the name of the RI/Application/microservice in the description. Ensure it's at least 50 characters (excluding spaces) and doesn't exceed 150 characters (excluding spaces). This will enable the content to be properly displayed in the catalog's card layout.-->

Simplify edge infrastructure management and application deployment at scale
across geographically distributed edge sites.

## Overview

Welcome to the Edge Manageability Framework, a comprehensive solution designed
to streamline and enhance the deployment and management of infrastructure and
applications at the edge. This framework leverages cutting-edge technologies to
provide robust solutions for hardware onboarding, secure workload deployment,
and cluster lifecycle management, all centered around Kubernetes-based
application deployment for edge computing.

## How It Works

At the center of Edge Manageability Framework is Edge Orchestrator, the primary
solution to manage edge environments efficiently and securely. It encompasses a
range of features that cater to the unique demands of edge computing, ensuring
seamless integration and operation across diverse hardware and software
landscapes. Edge Orchestrator is designed to be the central hub for managing
edge infrastructure and edge application deployments at scale across
geographically distributed edge sites. It offers automated application
deployment based on customer-defined configuration & criteria, multitenancy and
identity & access management for tenants, observability & alerting capabilities,
dashboards for quick views of status & issue identification, and management of
all software deployments & infrastructure components including edge nodes (i.e.

### High-Level System View Diagram

![High Level Component Diagram](../developer_guide/images/edge_platform_arch.png)

### Key Components

Edge Orchestrator is used to centrally manage all Edge Nodes at sites and
perform all lifecycle management of OS, clusters, and applications in the
managed nodes. Edge Orchestrator consists of six main components, and it is
deployable on-premises or in the cloud:

- [Edge Infrastructure Manager](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/infra_manager/index.html):
  Policy-based secure life cycle management of a fleet of edge nodes/devices at
  scale, spread across distributed locations allowing onboarding, provisioning,
  inventory management, upgrades and more.
- [Edge Cluster Orchestrator](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/cluster_orch/index.html):
  A lightweight orchestrator based on the Cluster API (CAPI) standard designed
  to automate the deployment and lifecycle management of Kubernetes* clusters at
  scale across distributed edges, providing centralized monitoring and access
  control.
- [Edge Application Orchestrator](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/app_orch/index.html):
  Offers customers the ability to easily package, deploy and monitor
  cloud-native applications at scale across distributed edges
- [UI](https://github.com/open-edge-platform/orch-ui): The web user interface
  for the Edge Orchestrator, allowing the user to manage most of the features of
  the product in an intuitive, visual, manner without having to trigger a series
  of APIs individually.
- [Observability](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/observability/index.html):
  A modular observability stack that provides visibility into the health and
  performance of the system, including logging, reporting, alerts, and SRE data
  from Edge Orchestrator components and Edge Nodes.
- [Platform Services](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/platform/index.html):
  A collection of services that support the deployment and management of the
  Edge Orchestrator, including identity and access management, multitenancy
  management, ingress route configuration, secrets and certificate management,
  cloud and on-prem infrastruture life-cycle management and more.

## Learn More

There are multiple ways to begin to learn about, use, or contribute to Edge
Orchestrator.

- Start by deploying your own
  orchestrator [in the cloud or on-premises](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/deployment_guide/index.html)
- Read the latest [Release Notes](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/release_notes/index.html)
  including KPIs, container and Helm chart listing and 3rd party dependencies
- Explore the [User Guide](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/index.html)
  and [API Reference](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/api/index.html)
- Learn about all components, their architecture and inner workings, and how to
  contribute in the [Developer Guide](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/index.html)
- [CI based Developer workflow](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/contributor_guide/index.html)
  make changes to 1 or more components of the Edge Orchestrator, locally
  build your change, test locally with prebuilt images of the rest of the
  components, and then submit a PR to the component CI and
  the [Edge Manageability Framework CI](https://github.com/open-edge-platform/edge-manageability-framework/actions)
- [Buildall based Developer workflow](https://docs.openedgeplatform.intel.com/edge-manage-docs/main/developer_guide/platform/buildall.rst)
  if you do not wish to use our CI and pre-built images,
  the [buildall](https://github.com/open-edge-platform/edge-manageability-framework/tree/main/buildall)
  script can clone all the repos, build the Helm chart and container images
  required to deploy the Edge Orchestrator from source, push the artifacts
  to a repository of your choice, and locally test in your developer
  environment.

