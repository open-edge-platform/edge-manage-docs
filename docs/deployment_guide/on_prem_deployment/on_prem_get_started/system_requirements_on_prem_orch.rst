Open Edge Platform System Requirements
============================================================

Edge Orchestrator On-Premises Resource Requirements
--------------------------------------------------------

* OS: Ubuntu 22.04.3 Server LTS.

* Storage: 1x Storage Device (SSD, HDD or NVMe) needed to install the OS to
  and needs to be at least 256 Gb; Intel suggests 512 Gb.

* Networking

  * 1-gigabit networking interface card capable of providing connection in the on-premises network.
  * 1-gigabit upstream network connectivity for Edge Orchestrator component download.
  * Connectivity outbound to the public internet.

* Compute resources

  * For small scale deployments (10 ENs), Intel recommends the following compute resources setups:

     * RAM: 48 GiB
     * CPU: 16 physical cores
     * Disk: 512 GiB

  * For large scale deployments (1.000 ENs), Intel recommends the following compute resources setups:

     * RAM: 475 GiB
     * CPU: 128 physical cores
     * Disk: 2 TiB

  * For small-scale deployments (5 ENs), Intel recommends the following compute resource setup when AO/CO and Observability are disabled:

     * RAM: 16 GiB
     * CPU: 8 physical cores
     * Disk: 256 GiB

Storage consumption varies with environment-specific details, including user-specific telemetry collection policies and application log generation.

With the specifications above, the system has been validated to support up to 1000 edge nodes concurrently connected, 100 of with a cluster deployed on it and one application.



Edge Orchestrator Scalability and Observability Configuration
------------------------------------------------------------------

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
