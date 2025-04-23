Edge Node Platform Telemetry Agent
==================================

Background
----------

This document provides high-level design and implementation guidelines. Refer
to **Platform Telemetry Agent** in Edge Node Agents' GitHub repository for
implementation details.

Target Audience
~~~~~~~~~~~~~~~

This document is intended for the following audiences:

- Developers who are interested in contributing to the implementation of the
  Platform Telemetry Agent.

- Administrators and System Architects interested in the architecture, design,
  and functionality of the Platform Telemetry Agent.

Overview
--------

Platform Telemetry Agent is part of the Open Edge Platform's Edge Node
Zero Touch Provisioning. It is installed, configured and automatically executed
at provisioning time.

The Platform Telemetry Agent (PTA) configures the metrics and log collectors
(for example, Telegraf\*, FluentBit\*) running as Bare-Metal and/or Edge
Cluster deployments based on Telemetry-Profile meta-data it receives for the
Edge instance from Telemetry-manager running in Edge Infrastructure-Manager
backend.

It provides a control path to an administrator or authorized user to
dynamically select which metrics or logs are being collected on the Edge
instance.

It also allows for adjustment to the collection interval and latency for
reporting them to the backend database.

Architecture Diagram
--------------------

The Platform Telemetry Agent follows the architecture and design principles set
out in :doc:`hl_architecture`

.. figure:: ./images/pta-architecture.drawio.svg
   :alt: High-Level Architecture of the Platform Telemetry Agent

   Figure 1: High-Level Architecture of Platform Telemetry Agent

Key Components
--------------

1. The Platform Telemetry Agent is a system daemon packaged as a `.deb` or
   `.rpm` package (depending on target Operating System).

2. `platform-telemetry-agent.yaml` file stores Platform Telemetry Agent's
   configuration.

3. `telegraf-host-gold.yaml` template file used as a base for mapping of the
   collectors.

4. `telegraf-cluster-gold.yaml` template file used as a base for mapping of the
   collectors.

5. `fluentbit-host-gold.yaml` template file used as a base for mapping of the
   collectors.

6. `fluentbit-cluster-gold.yaml` template file used as a base for mapping of
   the collectors.

Data Flow
---------

The data flow of the Platform Telemetry Agent can be broken down into multiple
concepts called out in `Workflow Stages` section.

Workflow Stages
~~~~~~~~~~~~~~~

1. **Edge Node Platform Telemetry Agent Workflow**:

   .. mermaid::

      sequenceDiagram
         autonumber 1

         participant NA as Node Agent<br> [Vault Agent]
         participant POA as Platform Observability <br>Agent
         participant PTA as Platform Telemetry <br>Agent
         participant ENA-C as Edge Node Collectors <br>(Telegraf\*/FluentBit\*)
         participant k8s-C as K8s Collectors <br>(Telegraf\*/FluentBit\*)
         participant TM as Telemetry Manager
         participant k8s-API as Edge Node <br>K8s API Server

         loop Token Provisioning
            NA ->> NA : Store Persist [access_token] at /etc/intel_edge_node/tokens
            POA->>POA : Read [access_token] from /etc/intel_edge_node/tokens
            PTA->>PTA : Read [access_token] from /etc/intel_edge_node/tokens
         end

         POA ->> POA : Install collector dependencies
         POA ->> ENA-C : Install & launch ENA collectors
         ENA-C->>ENA-C : Read [access credentials] from /etc/intel_edge_node/tokens
         ENA-C->>ENA-C : Starts with Default configuration for<br>- Input plugin <br>- Interval

         k8s-API ->> k8s-C : Deploy Observability Collectors stack
         k8s-C->>k8s-C : Read [access credentials] from /etc/intel_edge_node/tokens
         k8s-C->>k8s-C : Starts with Default configuration for<br>- Input plugin <br>- Interval

         PTA->>PTA : Checks for dependecies
         PTA->>PTA : Creates back up of original ENA Collectors configuration

         PTA ->> TM : Query Telemetry profile
         TM ->> PTA : Telemetry profile meta-data
         PTA->>PTA : Generates/updates Collectors configuration
         PTA->>ENA-C : Restarts ENAcollectors
         PTA->>PTA : Generates/updates Collectors ConfigMaps
         PTA->>k8s-API : Invokes k8s api with updated ConfigMap for K8s collectors
         k8s-API ->> k8s-C : Updates Observability Collectors stack configuration

Figure 2: Edge Node Platform Telemetry Agent Workflow

Extensibility
-------------

The Platform Telemetry Agent functionality can be extended by making source
code changes.

Deployment
----------

The Platform Telemetry Agent is deployed as a system daemon via installation of
a *.deb* package during the provisioning or *.rpm* package as part of the
Edge Microvisor Toolkit.

Platform Telemetry Agent focuses on configuring two collectors:

- Telegraf
- FluentBit

Platform Telemetry Agent takes into account if the configuration update of an
input plugin applies to Telemetry Collectors instance in Host (bare-metal
service) or Cluster (K8s deployment) mode.  Based on the Collectors instance
type, Platform Telemetry Agent applies changes by:

- [Host] Changing the respective config files and restarting the Collector
  services

- [Cluster] Invoking the kubectl tool to apply a ConfigMap update through
  Kubernetes API server and restarting the collectors pod instances.

Mapping of collectors is based on the template files defined as below:

- Telegraf host config

- Telegraf cluster config

- FluentBit host config

- FluentBit cluster config

Technology Stack
----------------

The following sections provide an overview of various aspects of the Platform
Telemetry Agent's technology stack.

Implementation
~~~~~~~~~~~~~~

The Platform Update Agent is written in the Go\* programming language.

Platform Telemetry performs updates to Telemetry collectors configuration files
followed by restarting these collector services.

Only these actions are executed as sudo only when required.

Platform Telemetry Agent relies on Golden config files which defines the
Telemetry collectors inputs and/or filters and helps it to map the Telemetry
profile meta-data it receives from the Telemetry-manager and construct the
collectors configuration files.

System Diagram
~~~~~~~~~~~~~~~~~~

Platform Telemetry Agent is dependent on DKAM/Tinkerbell, Node Agent, and Edge Infrastructure Manager.

.. mermaid::

   graph TD
      dkam[Provisioning: DKAM/Tinker] -->| /etc/edge-node/node/confs/platform-telemetry-agent.yaml| pta[Edge Node: Platform Telemetry Agent]
      na[Edge Node: Node Agent] -->| /etc/intel_edge_node/tokens/platform-telemetry-agent/access-token | pta
      pta -->|Query Telemetry profile| infra-manager[Edge Infrastructure Manager]
      pta -->|Set config| telegraf[Telegraf\*]
      pta -->|Set config| fluentbit[FluentBit\*]

Figure 3: Platform Telemetry Agent system diagram

Integrations
~~~~~~~~~~~~

Security
--------

Security Policies
~~~~~~~~~~~~~~~~~

Authentication with Edge Infrastructure Manager is performed using the JWT
token provisioned by the Node Agent.

When connecting to the Edge-Infrastructure-Manager ingress port, the Platform
Telemetry Agent will provide its token to authenticate itself.

Auditing
~~~~~~~~

Platform Telemetry Agent adheres to Edge Node Agents :doc:`hl_architecture`
observability design principle.

Upgrades
~~~~~~~~

Platform Telemetry Agent adheres to Edge Node Agents :doc:`hl_architecture`
upgrade design principle.
