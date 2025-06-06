:orphan:

Region and Site Telemetry
===============================

Telemetry Settings
------------------------------

You can collect telemetry from Edge Nodes and analyze it to understand resource
usage trends and take critical preventive measures before a failure occurs.

However, collecting telemetry comes with a cost - compute resource on the Edge, network bandwidth to send the collected data, and storage of collected data.
Hence, controlling the quantity and quality of telemetry being collected is important.

Telemetry Settings allows you to collect additional telemetry data, such as metrics and logs, from Edge Nodes, allocated to a Region and Site.

The Telemetry Settings include System Metrics (Metric Type and Metric Interval) and System Logs (Log Source and Log Level).
When you select and assign System Metrics and System Logs to a region and site, you can control the collection of those telemetry data. This helps in:

* Enabling telemetry collection only when needed, for example, while deploying
  a certain type of workload or while debugging.
* Controlling the frequency of telemetry collection, for example, increasing the metrics collection rate to understand resource usage better.
* Controlling type of logs and verbosity, for example, enabling kernel or systemd logs to debug check for errors or warnings.

Inheritance and Application
------------------------------

Telemetry settings follow an inheritance model. The sub-regions and sites will inherit the settings selected for a region. The Edge Nodes will inherit the settings of the site.

Both regions and sites have the same Telemetry Setting values for System Metrics and System Logs.

There can be instances where you might select a lower collection interval (conservative for reducing resource usage) for the power usage system metric at the region level.
For a site in that region, you might select a higher collection interval (more aggressive or frequent collection) for enabling site profiling or debugging.

The following are some rules that govern the application of Metric Interval and Log Level on Edge Nodes:

* The lowest metric collection interval will be used.
* The lowest logging level (the most verbose) will be used.
* Assign higher collection interval or logging level values to a
  region first, followed by its sub-regions or sites.

Telemetry Groups (Profile)
------------------------------

See :doc:`../../../../shared/shared_howtos_advanced_settings` for the options on system metrics and system logs.

.. note::
   An administrator must enable these options.


