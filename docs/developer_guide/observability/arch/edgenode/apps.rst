Applications (Edge Node)
========================

Applications deployed via Application Orchestrator are automatically picked up
by Observability extensions running on the Edge Node clusters, and their
**logs** are tagged and shipped to centralized Edge Orchestrator. Refer to
:doc:`/developer_guide/app_orch/arch/index`
for more details on Application Orchestration.

Custom Application **metrics** can also be shipped to the Edge Orchestrator via
OpenTelemetry protocol if they are instrumented properly. Cluster Observability
extensions expose OpenTelemetry endpoint via ``Telegraf`` collector for
applications to push workload metrics.

Example: Pushing Application Metrics via OpenTelemetry
------------------------------------------------------

Here's a simple example using Python\* programming language to push metrics to the Telegraf collector using OpenTelemetry:

.. code-block:: python

   # Install required packages:
   # pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp

   from opentelemetry import metrics
   from opentelemetry.sdk.metrics import MeterProvider
   from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
   from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
   import time

   # Configure OpenTelemetry to export to Telegraf
   # The default endpoint for Telegraf's OpenTelemetry receiver
   exporter = OTLPMetricExporter(endpoint="otel-collector:4317", insecure=True)
   reader = PeriodicExportingMetricReader(exporter, export_interval_millis=10000)
   provider = MeterProvider(metric_readers=[reader])
   metrics.set_meter_provider(provider)

   # Create a meter for your application
   meter = metrics.get_meter("my-app-name")

   # Create and record metrics
   counter = meter.create_counter("requests_total", description="Total requests processed")
   counter.add(1, {"endpoint": "/api/data", "status": "success"})

For configuration details, consult the OpenTelemetry documentation for your specific programming language.

For an overview of Edge Node Cluster Observability, refer to :doc:`clusters`
section.

.. note::
   All data originating from a single Edge Node Cluster (including
   Applications running on it) is associated with a single project (tenant).
   Refer to :doc:`../concepts/multitenancy` section for more details on how
   multitenancy in observability is handled.

.. toctree::
   :hidden:
   :maxdepth: 3
