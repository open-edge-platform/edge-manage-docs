:orphan:

Make Changes in the Advanced Settings
--------------------------------------------

* Select **yes** for the option **Do you want to make changes to the
  advanced settings?**.

* Select the type of metric you want to assign to the region or site and
  the interval at which you want to collect the metric. The metric type includes:

   .. list-table::
      :widths: 30 50
      :header-rows: 1

      * - Profile name
        - Description
      * - CPU Performance and Health
        - Provides insight into the performance and health of IA processor's internal components, including core and uncore units.
      * - Disk Performance and Health
        - Indicates the reliability of the drives (HDD, SSD) reliability—disk traffic.
      * - GPU usage
        - Provides usage information of an Intel-integrated GPU.
      * - Network Usage
        - Provides network interface and protocol usage TCP connections state and UDP socket counts Ethernet device statistics.
      * - Power usage
        - Enables monitoring platform Power, TDP, and per-CPU metrics like temperature, power, and utilization. Enables system temperature monitoring.
      * - Reliability, Availability Serviceability
        - Gather metrics provided by `rasdaemon <https://github.com/mchehab/rasdaemon>`_.
      * - Opentelemetry
        - Enables metrics and logs from OpenTelemetry clients
      * - Kubernetes stats
        - Enables metrics and logs from OpenTelemetry clients. Metrics derived from the state of Kubernetes resources (for example, pods, deployments, ingress, and so on) and metrics about the running pods and containers.

* Select the log source you want to assign to the region or site, and the
  log level. The log source includes:

    .. list-table::
       :widths: 30 50
       :header-rows: 1

       * - Profile name
         - Description
       * - Fleet agents
         - Filtered Systemd Logs from all the Fleet agents
       * - SystemD
         - OS systemd logs
       * - Kernel
         - OS kernel logs
       * - Container
         - Container logs (/var/log/containers/\*.log)
       * - Opentelemetry
         - Opentelemetry service logs
       * - RKE
         - Rancher logs