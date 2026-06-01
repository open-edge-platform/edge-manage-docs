==================
Inventory Exporter
==================

The Inventory exporter leverages a Prometheus toolkit-compatible interface, for
the :doc:`Inventory service <inventory>`. It exports Inventory metrics that
cannot be collected directly from the edge node software.

The exporter is composed of 5 internal packages:

- `kpis <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory/internal/kpis>`__:
  Defines the metrics to be exported and their parser into a Prometheus format.
- `collect <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory/internal/collect>`__:
  Contains the mechanisms to collect metrics from multiple targets, each one of
  them abstracted as a collector. A collector performs the implementation of a
  Collector interface and returns a list of KPIs, as specified by the kpis package.
- `exporter <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory/internal/exporter>`__:
  Implements the instantiation of the prometheus exporter with multiple collectors,
  from where metrics are collected each time the exporter Retrieve method is called.
  An exporter defines the address and path from where the prometheus endpoint
  can be used to pull the exporter metrics via an HTTP interface.
- `common <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory/internal/common>`__:
  Defines the overall configuration scheme used to instantiate the exporter and its collectors.
- `manager <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory/internal/manager>`__:
  Handles the instantiation of exporter and its start/stop functionalities.


The exporter contains a set of collectors, each collector
has its own way of obtaining measurements, which are translated into a Prometheus
metrics format using the kpis package. Every time Prometheus scrapes the Inventory
exporter (exporter package) it retrieves metrics from all the collectors
(from the collect package) in a Prometheus format (done by kpis package).

In the case of Edge Infrastructure Manager, there is only one collector named
**inventory**. It has a client to the Inventory component and maintains a cache of
Host and Schedule resources. It manages the cache by periodically (every 10s)
pulling info from Inventory as well as updating the cache on a per subscribed
event basis.

The collection of metrics takes place using the local inventory cache.
The inventory collector returns the ``host_status`` and ``host_schedule`` metrics,
where maintenance calculation is done using the reference time the metrics are collected.


**Features:**

- Prometheus* compatible northbound APIs.
- Exports active maintenance window indication.
- Exports host status information such as provisioning, onboarding and update statuses.
- Exports edge device specific information such as hostname, serial number, UUID.
- Built with the support for Multitenancy.
- Flexible deployments that span from a standalone binary to container-based orchestrations.
