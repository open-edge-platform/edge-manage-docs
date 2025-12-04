Architecture
============

This document provides a comprehensive view of |software_prod_name|
observability platform and an overview of key components that help you to
monitor, analyze, and troubleshoot the Edge Nodes and |software_prod_name|
itself.

Architecture Diagram
--------------------

   .. figure:: ./images/overview.png
      :alt: Overview of Observability Services

      Figure 1: Overview of Observability Services

Key Components
--------------

Orchestrator Observability Stack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Provides the administrative view and visibility into |software_prod_name|.
Refer to :doc:`orchestrator/index` for more details.

Administrative access allows reviewing data across multiple projects - see
:doc:`concepts/multitenancy` to learn more about multi-tenancy concepts in
|software_prod_name| Observability.

Edge Node Observability Stack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Provides the visibility into the Edge Nodes. Refer to
:doc:`orchestrator/edgenode-observability` for architecture details.

The stack allows collecting and analyzing data from multiple Edge Node system
layers, as described in following sections:

* Host-level data - :doc:`edgenode/hosts`
* Cluster-level data - :doc:`edgenode/clusters`
* Application-level data - :doc:`edgenode/apps`

.. note::
   The range and quantity of data collected from the Edge Node Agents can be
   controlled via Edge Infrastructure Manager's Telemetry Control subsystem.
   Refer to :doc:`/developer_guide/agents/arch/platform_telemetry`
   for more details.

Since |software_prod_name| is designed to manage multiple Edge Nodes, the
observability stack needs to scale accordingly. Refer to
:doc:`concepts/scalability` section for more details.

Based on project-level access granted, users can review a subset of data
collected for allowed projects - please see :doc:`concepts/multitenancy` to
learn more about multi-tenancy concepts in |software_prod_name| Observability.

Alerting Monitor
~~~~~~~~~~~~~~~~

Based on the collected data, the Alerting Monitor component can trigger alerts
and notifications. Refer to :doc:`orchestrator/alerting-monitor` for more
details. This component exposes an **Alerts API** that can be used to query and
manage alerts per project.

SRE Exporter
~~~~~~~~~~~~

Site Reliability Engineers (SRE) can use the SRE Exporter to export
observability data from |software_prod_name| to external monitoring systems
using Prometheus format. Refer to :doc:`orchestrator/sre-exporter` for more
details.

.. toctree::
   :hidden:

   edgenode/hosts
   edgenode/clusters
   edgenode/apps
   orchestrator/alerting-monitor
   orchestrator/edgenode-observability
   orchestrator/index
   orchestrator/sre-exporter
   concepts/multitenancy
   concepts/scalability
