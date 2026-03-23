=================
Resource Managers
=================

The Resource Managers are implemented as micro-services of the Edge Infrastructure Manager.
The managers communicate on the southbound with Edge Nodes.

**Table of contents:**

- `Host Resource Manager <#host-resource-manager>`__
- `Maintenance Manager <#maintenance-manager>`__
- `Networking Manager <#networking-manager>`__
- `OS Resource Manager <#os-resource-manager>`__
- `Telemetry Manager <#telemetry-manager>`__



Host Resource Manager
---------------------

The purpose of the
`Host Resource Manager <https://github.com/open-edge-platform/infra-managers/blob/main/host>`__
is to manage a host's hardware information.
It also implements connection tracking and reconciliation. The Host Resource Manager
collects all of this data, such as CPU, Memory, Disk, GPU, Interfaces and such,
with the help of Hardware Discovery Agent (HDA) on the Edge Node.
The Host Resource Manager stores this data in the
:doc:`Inventory <inventory>` so that other
components (like UI and Cluster Orchestration) can retrieve and act on it.

The Host Resource Manager uses TLS with JWT (Json Web Tokens) technology to make
the communication from the orchestrator to the edge node secure.

**Features:**

- Discovery of all device's information: CPU, Memory, Disk, GPU, Interfaces, Peripherals and state.
- Connection tracking with reconciliation.
- Scalable up to 10k of edge devices.

**References:**

- Check the `Instance-related workflow <https://github.com/open-edge-platform/infra-managers/blob/main/host/docs/Instance_workflow.md>`__
  between the Provisioning Server, Edge Node Agent(s), and Host-Manager components.
- To learn how to set up the Host Resource Manager on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-managers/tree/main/host/README.md#get-started>`__
- Check the `API reference <https://github.com/open-edge-platform/infra-managers/blob/main/host/docs/api/hostmgr.md>`__

Maintenance Manager
-------------------

The `Maintenance Manager <https://github.com/open-edge-platform/infra-managers/tree/main/maintenance>`__
service is designed to help manage maintenance tasks for
Edge Nodes. It acts as a bridge, passing down the maintenance and update
requests (`Schedules <https://github.com/open-edge-platform/infra-managers/blob/main/maintenance/docs/schedule.md>`__)
to the managed Edge Nodes. This service is responsible for ensuring that Edge
Nodes can perform the required maintenance and update tasks.
The Maintenance Manager handles schedule resources used to model time-based events,
such as administrative downtime, maintenance windows, or other events that may
happen either a single time or repeated on a schedule.

For more information on the schedule and how this translates on the Edge Node please check the Schedule.

**Features:**

- Top-down Edge Node maintenance scheduling, one off or recurring at specific times
- Single or per-group Edge Node updates
- Mutable OS Update: Day 2 update of the mutable Ubuntu OS using APT package manager (as per past releases).
- Immutable OS Update: Day 2 update of the immutable Edge Microvisor Toolkit via A/B partition swap and installation of a new OS image.

**References:**

- To learn how to set up the Maintenance Manager on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-managers/tree/main/maintenance/README.md#get-started>`__


Networking Manager
------------------

The Networking Manager constantly verifies the correctness of the networking
configuration and IP uniqueness on of the Edge Nodes within a site.

The Networking Manager handles Network Resources representing the network infrastructure
of a site and its relative addressing information. Most of the network resources are
unique within a single site, but not globally unique (e.g., multiple sites may have the
same IP Subnet definitions). This repository contains the Networking Manager implementation.

**Features:**

- Top-down Edge Node networking configuration and constant correctness monitoring, via reconciliation.
- Exemplar reconciliation implementation, can be taken for other elements.

**References:**

- To learn how to set up the Networking Manager on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-managers/tree/main/maintenance/README.md#get-started>`__

OS Resource Manager
-------------------

OS Resource Manager is responsible for creating a new OS Resource whenever a
new OS version is released to the Release Service. Additionally, it will optionally
link the new OS Resource to Edge Nodes currently using previous versions of the
same OS, ensuring seamless updates and version management.

- **Operation modes**


  OS Resource Manager can be configured to operate in two modes: automatic or manual.

  - **Automatic Mode (default):**

    OS Resource Manager creates new OS Resources and automatically attaches the latest
    OS Resource to all Instance Resources currently using the same profile name.
    OS Resource Manager will update defaultOs in the Provider Resource config field as
    during EN onboarding it is expected that the installed OS is the latest one.

  - **Manual Mode:**

    OS Resource Manager creates new OS Resources, and the user is
    responsible for attaching them to the Instance Resource for each EN via the CLI
    (using NB API). The user will also update defaultOs in the Provider Resource.

    To align with the Multitenancy concept each OS Resource must have a Tenant ID assigned.
    OS Resource Manager will create an OS Resource per each Tenant, thus, OS Resource Manager
    will need to control Tenant Resources in the Inventory and create new OS Resources per new tenants.

- **Clients**


  The OS Resource Manager will utilize two clients: HTTP Client and Inventory Client.

  .. image:: ../images/os_resource_manager.svg

  - **HTTP Client:**

    This client will access the file server within the Release Service, sending HTTP
    GET requests via the access proxy. The HTTP client will be implemented using Go's
    standard net/http library.

  - **Inventory Client:**

    This gRPC client will interact with the Inventory database to:
    - create OS Resources
    - listen for events from Inventory in regards to Tenant Resource, Provider Resource and Instance Resource
    - get Tenant Resources, Provider Resources, Instant Resources and OS Resources
    - update desired_os field in Instance Resources to the latest OS
    - update defaultOs in config string in Provider Resource


**Features:**

- Periodic Monitoring of Released Operations Systems and profiles.
- Creation of OS resources.
- Automatic and Manual assignment of OS resources to instances.

**References:**

- Check the `OS Resource Manager Initialization Flow <https://github.com/open-edge-platform/infra-managers/blob/main/os-resource/docs/architecture-internals.md#os-resource-manager-initialization-flow>`__
  section.
- To learn how to set up the OS Resource Manager on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-managers/tree/main/os-resource/README.md#get-started>`__


Telemetry Manager
-----------------

The Telemetry Manager is used to configure Telemetry components deployed within the fleet.
It allows the admin/ user to configure what observability data is being collected from the
Edge Node. To achieve the same the user shall be given an option to assign predefined
"Telemetry profile"('s) to a Region or Site which then gets applied to all the Edge Nodes
associated with them.

**Features:**

- Top-down Edge Node telemetry configuration for Metrics and Logs
- Different profiles and levels for fine grained information gathering

**References:**

- To learn how to set up the Telemetry Manager on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-managers/blob/main/telemetry/README.md#get-started>`__

Learn more
++++++++++

- Check out the source code repository on
  `GitHub <https://github.com/open-edge-platform/infra-managers>`__