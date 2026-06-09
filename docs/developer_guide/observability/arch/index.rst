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

The stack allows collecting and analyzing data from the Edge Node
host system layer when deployed. Refer to
:doc:`edgenode/hosts` for more details.

.. note::
   The range and quantity of data collected from the Edge Node Agents can be
   controlled via Edge Infrastructure Manager's Telemetry Control subsystem.
   Refer to :doc:`/developer_guide/agents/arch/platform_telemetry`
   for more details.

Based on project-level access granted, users can review a subset of data
collected for allowed projects - please see :doc:`concepts/multitenancy` to
learn more about multi-tenancy concepts in |software_prod_name| Observability.

Alerting Monitor
~~~~~~~~~~~~~~~~

Based on the collected data, the Alerting Monitor component can trigger alerts
and notifications. Refer to :doc:`orchestrator/alerting-monitor` for more
details. This component exposes an **Alerts API** that can be used to query and
manage alerts per project.

.. toctree::
   :hidden:

   edgenode/hosts
   orchestrator/alerting-monitor
   orchestrator/edgenode-observability
   orchestrator/index
   concepts/multitenancy
