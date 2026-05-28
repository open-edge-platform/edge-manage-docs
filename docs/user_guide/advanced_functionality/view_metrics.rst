View Edge Node Metrics
======================

When Edge Orchestrator has been deployed with Edge Node observability enabled,
you can query and view metrics from the Edge Nodes using the Orchestrator
Command Line (CLI) tool.

.. note::
   The CLI will only be configured to query metrics from Mimir if observability
   has been enabled during the Orchestrator install stage. If it is not, the
   CLI will not enable metrics API during start up.

Configure Access to Grafana Mimir
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The metrics received from the Edge Node are stored in a Grafana Mimir instance
on the Orchestrator. To enable the CLI to query the metric details from Mimir,
the CLI needs to be configured with the correct endpoint to communicate with.
This can be done with the following command:

  .. code-block:: bash

    orch-cli config set metrics-endpoint \
      https://metrics-node-cli.<CLUSTER_FODN>/prometheus

.. note::
   If you have multiple endpoints that can be queried on the Orchestrator,
   this step can be skipped and you can use the `metrics-endpoint` flag in the
   CLI query to specify the endpoint for that query only. If no
   `metrics-endpoint` is provided, the CLI will fall back to the endpoint set
   using the config command above, if it exists.

Gather List of Edge Node Metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the CLI has been configured with the required metric endpoint to query
the CLI can be used to gather a list of the metrics available in Mimir.

.. note::
   The CLI queries will only have access to view the metrics from Edge
   Nodes related to projects that the CLI user that was logged in has
   access to.

Metrics can be listed and filtered using the CLI flags. Some examples of
queries are:

- List all metrics for the current project.

  .. code-block:: bash

    orch-cli list metrics

- List metrics from a different metrics endpoint.

  .. code-block:: bash

    orch-cli list metrics \
      --metrics-endpoint https://mimir.example.com/prometheus

- List metrics from a different project.

  .. code-block:: bash

    orch-cli list metrics --project sampleproject

- List metrics related to a specific org-id

  .. code-block:: bash

    orch-cli list metrics --org-id 1234abcd-ef56-7890-ab12-c3d4e5f67890

- List all metrics that match the filtered

  .. code-block:: bash

    orch-cli list metrics --filter cpu

Query Metrics from Host
^^^^^^^^^^^^^^^^^^^^^^^^^^^

For querying, the CLI provides multiple options to format and refine the query
as needed. This includes filtering using specific metrics labels, getting a
range of metrics over specific time range in the past or from a duration
ending at the current time. It also allows for determining the sum, average
and increase of a metric over a period of time.

- Query metrics from host using hostname in the current project.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost

- Query metrics from host using the resource ID of the Edge Node.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname host-xxxxxxxx

.. note::
   The `--hostname` flag must be provided with either a valid host name or
   resource ID when querying metrics using the CLI. Currently, there is no
   option to query the same metric across multiple edge nodes or across a
   project using the CLI.

- Query metrics for a host in another project.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --project sampleproject

- Get metrics from host connected to a specific org-id.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --org-id 1234abcd-ef56-7890-ab12-c3d4e5f67890

- Get host metric using metric label.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --hostname-label instance

- Get the average of a metric over a period of time.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --average --start-time <unix_timestamp> --end-time <unix_timestamp>

.. note::
   When using the `--start-time` and `--end-time` flags, the timestamps must be
   Unix timestamps.

- Get the average of a metric for the last hour.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --average --duration 3600

.. note::
   The `--duration` flag expects the time provided to be in seconds.

- Get the sum of a metric over a period of time.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --sum --start-time <unix_timestamp> --end-time <unix_timestamp>

- Get the sum of a metric for the last hour.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --sum --duration 3600

- Get the increase of a metric over a period of time.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --increase --start-time <unix_timestamp> --end-time <unix_timestamp>

- Get the increase of a metric for the last hour.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --increase --duration 3600

- Get the range of a metric over a period of time.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --range --start-time <unix_timestamp> --end-time <unix_timestamp>

- Get the range of a metric for the last hour.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --range --duration 3600

- Query a metric value at a specific point in time.

  .. code-block:: bash

    orch-cli get metric mem_used --hostname testhost \
      --timestamp <unix_timestamp>

.. note::
   Similar to the `--start-time` and `--end-time` flags, the `--timestamp` flag
   requires the provided value to be a Unix timestamp.
