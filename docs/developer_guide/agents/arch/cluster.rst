Edge Node Cluster Agent
=======================

Background
----------

This document provides high-level design and implementation guidelines. Refer
to `Cluster Agent <https://github.com/open-edge-platform/edge-node-agents/tree/main/cluster-agent>`_ in the Edge Node Agents' GitHub\* repository for implementation
details.

Target Audience
~~~~~~~~~~~~~~~

The target audience for this document is:

- Developers interested in contributing to the implementation of the Cluster
  Agent.

- Administrators and System Architects interested in the architecture, design,
  and functionality of the Cluster Agent.

Overview
--------

Cluster Agent is part of the Open Edge Platform's Edge Node Zero Touch
Provisioning. It is installed, configured and automatically executed at
Provisioning time. It registers itself in Edge Cluster Manager of the Edge
Orchestrator service and bootstrap/uninstall the Kubernetes Engine on the Edge
Node on which it is executing.

Architecture Diagram
--------------------

The Cluster Agents follows the architecture and design principles set out in
:doc:`hl_architecture`

   .. figure:: ./images/ca-architecture.drawio.svg
      :alt: High-Level Architecture of the Cluster Agent

      Figure 1: High-Level Architecture of Cluster Agent

Key Components
--------------

1. The Cluster Agent is a system daemon packaged as a `.deb` or `.rpm` package
   (depending on target Operating System).

2. The `cluster-agent.yaml` file stores Cluster Agent's configuration.

3. The Cluster Agent requires a designated JWT token.

Data Flow
---------

The data flow of the Cluster Agent can be broken down into multiple concepts
called out in the `Workflow Stages` section.

Workflow Stages
~~~~~~~~~~~~~~~

1. **Cluster Agent state machine**:

   State machine is used to represent internal Cluster Agent state. Transition
   between states are only allowed by depicted triggers

   .. mermaid::

      %%{wrap}%%
      stateDiagram-v2
         [*] --> inactive
         inactive --> registering: UpdateClusterStatusResponse(register)
         inactive --> deregistering: UpdateClusterStatusResponse(deregister)
         registering --> install_in_progress: RegisterClusterResponse(success)
         install_in_progress --> active: installation command successful
         install_in_progress --> inactive: installation command failed
         active --> deregistering: UpdateClusterStatusResponse(deregister)
         deregistering --> uninstall_in_progress: uninstall command cached || RegisterClusterResponse(success)
         uninstall_in_progress --> inactive: uninstallation command successful || failed

Figure 2: Cluster Agent state machine

1. **Cluster Agent configuration**:

   Configuration consists of:

   - The config file, which is part of cluster-agent Debian/RPM package and
     installed at ``/etc/edge-node/node/confs/cluster-agent.yaml``

   - The JWT token at /etc/intel_edge_node/tokens/cluster-agent

   .. mermaid::

      %%{wrap}%%
      sequenceDiagram
         participant mi as Secrets Service
         participant na as Node Agent
         participant host as Edge Node filesystem
         participant ca as Cluster Agent
      autonumber
         par Certificates management
         na ->>+ mi: request fresh token
         mi ->> na: {access_token}
         na ->> host: persist access_token
         loop infinite
            na ->> na: sleep(refresh_period)
            na ->>+ mi: refresh token
            mi ->>- na: {access_token}
            na ->> host: update access_token
         end
         and Cluster Agent start up

         ca ->>+ host: open(cluster-agent.yaml)
         host ->>- ca: cluster-agent.yaml

         loop until token available
         ca ->>+ host: /etc/intel_edge_node/tokens/cluster-agent/access_token exists?
         host ->>- ca: yes/no
         end

         ca ->>+ host: open(cluster-agent.pem)
         host ->>- ca: cluster-agent.pem

         ca ->>+ host: open(cluster-agent-key.pem)
         host ->>- ca: cluster-agent-key.pem

         ca ->> ca: stateMachine(inactive)
         end

Figure 3: Cluster Agent configuration

1. **Cluster Agent status update**:

   Cluster Agent sends its current status to Edge Cluster Manager in |software_prod_name| on regular intervals. In response, it can receive a request
   to transition to a new state.

   .. mermaid::

      %%{wrap}%%
      sequenceDiagram
         participant ca as Cluster Agent
         participant mc as Edge Cluster Manager
      autonumber
      loop infinite
         ca ->>+ mc: UpdateClusterStatusRequest(state)
         mc ->>- ca: UpdateClusterStatusResponse(new_state)
         alt new_state != none
         ca ->> ca: stateMachine(new_state)
         end
         ca ->> ca: sleep(update_interval)
      end

Figure 4: Cluster Agent status update

1. **Kubernetes Engine Installation flow**:

   While in **registering** state Cluster Agent, request Kubernetes Engine
   installation command via RPC from **Edge Cluster Manager**.

   .. mermaid::

      %%{wrap}%%
      sequenceDiagram
         participant ca as Cluster Agent
         participant mc as Edge Cluster Manager
      autonumber

      ca ->>+ mc: UpdateClusterStatus(state)
      mc ->>- ca: ChangeStatus(registering)
      ca ->> ca: stateMachine(registering)

      ca ->>+ mc: RegisterClusterRequest(host_uuid)
      mc ->>- ca: RegisterClusterResponse
      ca ->> ca: stateMachine(install_in_progress)
      ca ->> ca: cache(uninstall_script)
      ca ->> ca: execute(install_script)

      alt execution successful
      ca ->> ca: stateMachine(active)
      else execution failed
      ca ->> ca: stateMachine(inactive)
      end

Figure 5: Cluster Agent Kubernetes Engine installation

4. **Kubernetes Engine Uninstallation flow**:

   While in **deregistering** state Cluster Agent, request Kubernetes Engine
   uninstallation command via RPC from **Edge Cluster Manager**.

   .. mermaid::

      %%{wrap}%%
      sequenceDiagram
         participant ca as Cluster Agent
         participant mc as Edge Cluster Manager
      autonumber

      ca ->>+ mc: UpdateClusterStatus(state)
      mc ->>- ca: ChangeStatus(deregistering)
      ca ->> ca: stateMachine(deregistering)

      alt uninstall command not cached
      ca ->>+ mc: RegisterClusterRequest(host_uuid)
      end

      ca ->> ca: stateMachine(uninstall_in_progress)
      ca ->> ca: execute(uninstall_script)

      Note over ca: both for successful and failed execution
      ca ->> ca: stateMachine(inactive)

Figure 6: Cluster Agent Kubernetes Engine uninstallation

Extensibility
-------------

The Cluster Agent receives and runs installation and uninstallation
commands/scripts to be executed on the Edge Node from the **Edge Cluster
Manager**.

To extend the support for bootstrapping new Kubernetes Engines, an appropriate
set of commands should be send from **ECM** to the Cluster Agent.

Deployment
----------

The Cluster Agent is deployed as a system daemon via installation of a *.deb*
package during the provisioning or *.rpm* package as part of the Edge Microvisor Toolkit.

Technology Stack
----------------

The following sections provide an overview of various aspects of the Cluster
Agent's technology stack.

Implementation
~~~~~~~~~~~~~~

The Cluster Agent is written in Go programming language and is implemented as a
state machine. Cluster Agent does not persist any data on disk nor in database
as all state is in memory. Previous state is re-created after reboot by
following state machine from the beginning (each state just finishes early if
it was already executed). This implementation allows for crash recovery and
updates do not require special attention.

The Cluster agent is agnostic of the Open Edge Platform's Kubernetes
Engine implementation used. The scripts/commands provided to the Cluster Agent
by the **Edge Cluster Manager** should be idempotent. Cluster Agent performs
both Kubernetes Engine installation & uninstallation via abstraction of a shell
script. Edge Cluster Manager should store multiple pairs of shell scripts for
different Kubernetes Engine implementations and return appropriate pair to the
Cluster Agent for execution. Both scripts are assumed to be idempotent. This
means they could be executed multiple times safely. Subsequent executions of
the same script either progresses overall execution (if it was not completed)
or exits early (if previously completed), which is an important property in the
context of crash recovery. Cluster Agent should be able to execute the same
command again after intermediate failure and progress.

System Diagram
~~~~~~~~~~~~~~

Cluster Agent is dependent on *Node Agent* and *Edge Cluster Manager*.

.. mermaid::

   graph TD
      na[Edge Node: Node Agent] -->|/etc/intel_edge_node/tokens/cluster-agent/access_token| ca[Edge Node: Cluster Agent]
      ca -->|Register| co[Edge Orchestrator: Edge Cluster Manager]
      co -->|KE Registration Command| ca

Figure 7: System diagram

Integrations
~~~~~~~~~~~~

Cluster Agent does not expose any API. It consumes APIs from both Edge Cluster
Manager and Node Agent.

- Edge Cluster Manager - Communication with Edge Cluster Manager is implemented
  via gRPC protocol. Edge Cluster Manager acts as a server; Cluster Agent acts
  as a client.

- Node Agent - Communication with Node Agent is implemented via a text file
  stored on a host filesystem. When
  ``/etc/intel_edge_node/tokens/cluster-agent/access_token`` is created it is
  interpreted as signal to start communication with Edge Cluster Manager.

Security
--------

Security Policies
~~~~~~~~~~~~~~~~~

Cluster Agent adheres to Edge Node Agents :doc:`hl_architecture` security design
principle.

Auditing
~~~~~~~~

Cluster Agent adheres to Edge Node Agents :doc:`hl_architecture` observability
design principle.

Upgrades
~~~~~~~~

Cluster Agent adheres to Edge Node Agents :doc:`hl_architecture` upgrade design
principle.
