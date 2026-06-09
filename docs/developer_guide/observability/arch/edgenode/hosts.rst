Hosts (Edge Node)
=================

Edge Node observability for **Hosts** provides visibility into the health and
performance of the Edge Node hosts by collecting logs and metrics from the Edge
Node and sending them to a centralized location for viewing and analysis. The
following data is collected for every host of the Edge Node:

* Metrics are collected via ``Telegraf`` telemetry collector:

  * Configured with a selected set of plugins focused on bare-metal metrics.
  * Set of plugins can be extended via Edge Infrastructure Manager's Telemetry
    Control subsystem, if deployed.

* Logs are collected via ``Fluentbit`` log collector instances:

  * **provisioning logs** - via separate instance deployed as part of
    ``HookOS`` (review
    :doc:`/developer_guide/infra_manager/arch/overview` and its
    subsections for an overview of provisioning).

  * **agent logs** - logs from the agents running on the Edge Node.

  * **host logs** - logs from the host system.

  * **health-check  logs** - additional instance monitoring the health of other
    services.

Bare-metal host logs and metrics are collected and sent out of the Edge Node
via Platform Observability Agent. Optional additional data along with
collection interval can be controlled via Platform Telemetry Agent. For
additional details refer to:

* :doc:`/developer_guide/agents/arch/platform_observability`
* :doc:`/developer_guide/agents/arch/platform_telemetry`

.. note::
    All data originating from a single Edge Node is associated with a single
    project (tenant). Refer to :doc:`../concepts/multitenancy` section for more
    details on how multitenacy in observability is handled.
