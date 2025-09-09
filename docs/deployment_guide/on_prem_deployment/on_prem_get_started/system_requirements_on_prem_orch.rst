System Requirements
===================

This page outlines the hardware and software requirements for installing Edge Orchestrator on-premises.

Quick Requirements Summary
---------------------------

.. list-table:: Basic Requirements
   :header-rows: 1
   :widths: 20 40 40

   * - Component
     - Small Scale (up to 100 edge nodes)
     - Large Scale (up to 1000 edge nodes)
   * - **Operating System**
     - Ubuntu 22.04.3 Server LTS
     - Ubuntu 22.04.3 Server LTS
   * - **CPU**
     - 16 physical cores
     - 128 physical cores
   * - **Memory**
     - 32 GiB RAM
     - 475 GiB RAM
   * - **Storage**
     - 512 GiB SSD (minimum 256 GiB)
     - 2 TiB SSD
   * - **Network**
     - 1 Gbps interface + internet access
     - 1 Gbps interface + internet access

Detailed Requirements
=====================

Operating System
----------------

* **Required**: Ubuntu 22.04.3 Server LTS

Storage
-------

* **Minimum**: 256 GiB storage device (SSD, HDD or NVMe)
* **Recommended**: 512 GiB or larger SSD for better performance

Network Requirements
--------------------

* 1-gigabit networking interface card for on-premises network connection
* 1-gigabit upstream connectivity for downloading Edge Orchestrator components
* Outbound internet connectivity required for installation and updates

Deployment Sizing
=================

Depending on the number of edge nodes, you must include cluster-specific configuration:

* The default profile ``onprem`` supports up to 100 edge nodes.
* The large-scale profile ``onprem-1k`` supports up to 1,000 edge nodes.

See the installation section at
:doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install`.

.. note:: These profiles use `xlarge` as the value for `resourcesPreset` of the `postgresql` database.

Specifically for observability, the following Edge Orchestrator profiles are used:

* The default profile ``o11y-onprem`` supports up to 100 edge nodes.
* The large-scale profile ``o11y-onprem-1k`` supports up to 1,000
  edge nodes.

The default replication factor for edge node logs and metrics is ``3``.
You can configure it in the cluster definition with these settings:
``.Values.argo.o11y.edgeNode.loki.replicationFactor`` and ``.Values.argo.o11y.edgeNode.mimir.replicationFactor``.

.. note:: Replication factor ``2`` is not supported for Grafana Mimir\* storage (metrics).

The default data retention period for edge node logs and metrics is 1 day (``24h``).
You can configure it in the cluster definition with these settings:
``.Values.argo.o11y.edgeNode.loki.logRetentionPeriod`` and ``.Values.argo.o11y.edgeNode.mimir.structuredConfig.metricsRetentionPeriod``.

The default data retention period for edge node provisioning logs is 7 days (``168h``).
You can configure it in the cluster definition with the setting ``.Values.argo.o11y.edgeNode.loki.provisioningLogRetentionPeriod``.

.. note:: The minimum data retention period for edge node logs and metrics is 1 day (``24h``).

Supported OS and Browsers
--------------------------------------------------------

Edge Orchestrator does not require local installation on your OS. You can
access it using your browser. Thus, it does not require any specific OS
version as long as a graphical user interface and a web browser are available.

The supported browsers are:

   * Chrome\*
   * Edge\*
   * Safari\*
   * Firefox\*

For the best Edge Orchestrator experience, use the Chrome browser.
