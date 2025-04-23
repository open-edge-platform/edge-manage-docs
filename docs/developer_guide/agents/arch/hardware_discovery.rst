Edge Node Hardware Discovery Agent
==================================

Background
----------

This document provides high-level design and implementation guidelines. Refer
to `Hardware Discovery Agent <https://github.com/open-edge-platform/edge-node-agents/tree/main/hardware-discovery-agent>`_ in the Edge Node Agents' GitHub repository for
implementation details.

Target Audience
~~~~~~~~~~~~~~~

The target audience for this document is:

- Developers interested in contributing to the implementation of the Hardware
  Discovery Agent.

- Administrators and System Architects interested in the architecture, design,
  and functionality of the Hardware Discovery Agent.

Overview
--------

Hardware Discovery Agent is part of the Open Edge Platform's Edge Node
Zero Touch Provisioning. It is installed, configured and automatically executed
at Provisioning time.

The main responsibility of the Hardware Discovery Agent is to report
information on the hardware available on the Edge Node to the Hardware Resource
Manager service.

It uses system tools (for example, ``lscpu``, ``lsmem``, ``lsblk``, ``lsusb``)
to obtain hardware information and passes it over to Hardware Resource Manager.
Updates are sent cyclically at regular intervals.

Architecture Diagram
--------------------

The Hardware Discovery Agents follows the architecture and design principles
set out in :doc:`hl_architecture`

.. figure:: ./images/hda-architecture.drawio.svg
   :alt: High-Level Architecture of the Hardware Discovery Agent

   Figure 1: High-Level Architecture of Hardware Discovery Agent

Key Components
--------------

1. The Hardware Discovery Agent is a system daemon packaged as a `.deb` or
   `.rpm` package (depending on target Operating System).

2. The `hd-agent.yaml` file stores Hardware Discovery Agent's configuration.

3. The Hardware Discovery Agent requires a designated JSON Web Token (JWT).

Data Flow
---------

The data flow of the Hardware Discovery Agent is called out in `Workflow
Stages` section.

Workflow Stages
~~~~~~~~~~~~~~~

1. **Hardware Discovery Agent Workflow**:

   The Hardware Discovery Agent retrieves its access token on start, gathers
   the Edge Node's hardware information and sends the data to the Hardware
   Resource Manager on the Edge Orchestrator.

   It then pauses and repeats the HW information gathering and forwarding
   steps.

   .. mermaid::

      %%{wrap}%%
      sequenceDiagram
         participant na as Node Agent
         participant hda as Hardware Discovery Agent
         participant os as Edge Node OS/Filesystem
         participant hrm as Hardware Resource Manager
      autonumber
      loop Token provisioning
         na ->> os : Store [access_token] at /etc/intel_edge_node/tokens
         os ->> hda : Read [access_token] at /etc/intel_edge_node/tokens/hd-agent
      end
         os ->> hda : Read [configuration file] at /etc/edge-node/node/confs/hd-agent.yaml
         hda ->> hda : Apply configuration settings to agent
         hda ->> hrm : Initialize gRPC connection with Orchestrator
      loop HW Information collection
         hda ->> os : Query edge node disk information
         os ->> hda : Provide edge node disk information
         hda ->> os : Query edge node serial number
         os ->> hda : Provide edge node serial number
         hda ->> os : Query edge node system information
         os ->> hda : Provide edge node system information
         hda ->> os : Query edge node OS information
         os ->> hda : Provide edge node OS information
         hda ->> os : Query edge node BIOS information
         os ->> hda : Provide edge node BIOS information
         hda ->> os : Query edge node CPU information
         os ->> hda : Provide edge node CPU information
         hda ->> os : Query edge node GPU information
         os ->> hda : Provide edge node GPU information
         hda ->> os : Query edge node memory information
         os ->> hda : Provide edge node memory information
         hda ->> os : Query edge node network interface information
         os ->> hda : Provide edge node network interface information
         hda ->> os : Query edge node USB device information
         os ->> hda : Provide edge node USB device information
         hda ->> hda : Parse the HW information into UpdateHostSystemInfoByGUIDRequest
         hda ->> hrm : gRPC call to UpdateHostSystemInfoByGUID
         hrm ->> hda : gRPC status response
         hda ->> hda : Pause for refresh interval
      end

Figure 2: Hardware Discovery Agent workflow

Extensibility
-------------

The Hardware Discovery Agent functionality can be extended by making source
code changes.

Deployment
----------

The Hardware Discovery Agent is deployed as a system daemon via installation of
a *.deb* package during the provisioning or *.rpm* package as part of the
Edge Microvisor Toolkit.

Technology Stack
----------------

The following sections provide an overview of various aspects of the Hardware
Discovery Agent's technology stack.

Implementation
~~~~~~~~~~~~~~

The Hardware Discovery Agent is written in the Go\* programming language.

Hardware discovery is performed using 3rd party tools. These tools should be
executed as non-root where possible or with sudo only when required. This
includes tools such as:

- ``lsmem`` and ``lsblk``, which provide Memory information for the Edge Node.
  These tools can provide the output in the JSON format.

- ``lscpu``, which provides CPU information for the Edge Node.

- ``lsusb``, which provides information on USB devices connected to the Edge
  Node.

- ``lshw`` and ``lspci``, which provides information on GPU devices on the Edge
  Node.

- ``ip``, which provides information on IP addresses associated with interfaces
  on the Edge Node.

- ``uname`` and ``lsb_release``, which provide information on the kernel and OS
  versions installed on the Edge Node.

- ``dmidecode`` and ``ipmitool``, which provide BIOS and BMC information for
  the Edge Node. Both of these tools require sudo in order to run correctly

Hardware Discovery Agent does not persist any data on disk nor in database -
all state is in memory. Previous state is re-created after reboot by
discovering hardware description from scratch.

This implementation allows for crash recovery and updates to not require
special attention.

System Diagram
~~~~~~~~~~~~~~

Hardware Discovery Agent is dependent on DKAM, Node Agent, and Hardware
Resource Manager.

Required OS tools dependencies are listed in the Hardware Discovery Agent's
Debian Control file in the source repository.

   .. mermaid::

      graph TD
         dkam[Provisioning: DKAM] -->|/etc/edge-node/node/confs/hd-agent.yaml| hda[Edge Node: Hardware Discovery Agent]
         na[Edge Node: Node Agent] -->|/etc/intel_edge_node/tokens/hd-agent/access_token| hda[Edge Node: Hardware Discovery Agent]
         hda -->|Hardware details| hrm[Orchestrator: Hardware Resource Manager]

Figure 3: System diagram

Integrations
~~~~~~~~~~~~

Hardware Discovery Agent does not expose any API. It consumes APIs from the
Hardware Resource Manager.  Communication with Hardware Resource Manager is
implemented using gRPC. Hardware Resource Manager acts as a server, Hardware
Discovery Agent acts as a client.

Security
--------

Security Policies
~~~~~~~~~~~~~~~~~

Hardware Discovery adheres to Edge Node Agents :doc:`hl_architecture` security
design principle.

Auditing
~~~~~~~~

Hardware Discovery adheres to Edge Node Agents :doc:`hl_architecture`
observability design principle.

Upgrades
~~~~~~~~

Hardware Discovery adheres to Edge Node Agents :doc:`hl_architecture` upgrade
design principle.
