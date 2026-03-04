Modular vPro Workflow Architecture
==================================

Architecture Diagram
--------------------

The modular vPro workflow makes use of components from the Edge Infrastructure
Manager to provide an out-of-band (OOB) management pipeline for edge devices.
The high level architecture of the workflow is shown in the following diagram:

TODO: Add arch diagram

Key Components
--------------

To enable the vPro device management for edge devices, the modular workflow
uses the following Edge Infrastructure Manager services on the orchestrator:

`Inventory <https://github.com/open-edge-platform/infra-core/tree/main/inventory>`_ is the state store
in Edge Infrastructure Manager. The modular vPro workflow uses the inventory service to store the
status of edge devices, including the current state of the device as well as the desired state.

`API <https://github.com/open-edge-platform/infra-core/tree/main/apiv2>`_ provides a northbound REST based
API that users and services can use to access Open Edge Platform services.

`Orchestrator Command Line Interface (CLI) <https://github.com/open-edge-platform/orch-cli>`_ is a utility
which provides a command line interface that allows users to interact and manage the Orchestrator services
using the REST API.

`Host Manager <https://github.com/open-edge-platform/infra-managers/tree/main/host>`_ is a service used to
manager an edge node's hardware information. For the modular vPro workflow, this includes the status of the
edge node device and the agents running there. The manager stores this information to inventory along with
other information to identify the edge node.

`Device Management Manager <https://github.com/open-edge-platform/infra-external/tree/main/dm-manager>`_ is a service
that provides integration between the Intel® vPro™ Active Management Technology (AMT) and Intel® Standard Manageability (ISM)
on the edge node and the services provided by the Device Management Toolkit outlined below. This includes enabling
remote management of edge node devices, allowing for remote power management and system configuration.

On the edge node device, the workflow requires the following agents:

`Device Discovery Agent <https://github.com/open-edge-platform/edge-node-agents/tree/main/device-discovery-agent>`_ is an
agent deployed on the edge node that is responsible for discovering and registering that edge node with the Edge Infrastructure
Manager during onboarding. This includes collecting system information from the edge node and handling authentication with
the orchestrator. The agent can be run in either an interactive or non-interactive mode.

`Node Agent <https://github.com/open-edge-platform/edge-node-agents/tree/main/node-agent>`_ is an agent deployed on the edge node
that is responsible for creating and refreshing any authentication tokens for agents running on the edge node. It also
monitors the status of the edge node and the agents running on the node which it frequently reports to the Host Manager
service in the Edge Infrastructure Manager.

`Platform Manageability Agent <https://github.com/open-edge-platform/edge-node-agents/tree/main/platform-manageability-agent>`_ manages
platform level manageability features on the edge node. It integrates the Remote Provisioning Client service from the Device
Management Toolkit and Intel® vPro™ to enable OOB device management capabilities on the edge node.

The vPro modular workflow also uses the following components from the `Device Management Toolkit (DMT) <https://device-management-toolkit.github.io/docs/2.31/Reference/architectureOverview/>`_
on the orchestrator and edge node:

`Management Presence Server (MPS) <https://device-management-toolkit.github.io/docs/2.31/Reference/MPS/configuration/>`_ allows
edge nodes which have support for Intel® AMT to connect securely to remote manageability services.

`Remote Provisioning Server (RPS) <https://device-management-toolkit.github.io/docs/2.31/Reference/RPS/configuration/>`_ is
used to remotely connected to the Remote Provisioning Client service on an edge node device which supports Intel® AMT. It
provides the required configuration profiles and settings needed to enable Intel® AMT for remote manageability of
the device by MPS.

`Remote Prvosioning Client (RPC) <https://device-management-toolkit.github.io/docs/2.31/Reference/RPC/overview/>`_ is a
lightweight application written in Go that is installed on the edge node device and interacts directly with
Intel® AMT. It communicates with the RPS service and activates and manages Intel® AMT based on the
configuration profiles and settings sent by RPS.
