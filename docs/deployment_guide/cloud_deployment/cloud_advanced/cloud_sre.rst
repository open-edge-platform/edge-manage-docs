Configure SRE Exporter Service
=================================================

If the Service Reliability Engineering (SRE) exporter service is enabled in
Edge Orchestrator, it exports Service Level Indicator (SLI) metrics that
constantly monitor Edge Orchestrator cluster availability, and the health of edge node hosts using an external monitoring system.

The service sends the metrics to the external SRE Destination Endpoint at a regular time interval. The default is 30 seconds.

The SRE destination end-point server must support `Prometheus\* Remote Write protocol <https://prometheus.io/docs/concepts/remote_write_spec>`_
with basic access authentication and optionally, Transport Layer Security (TLS) protocol.

You must provide the destination endpoint URL, basic authentication username, and password during manual installation.
If TLS protocol is enabled, publicly trusted Certificate Authority (CA) certificates for the destination server are supported by default.
Optionally, you can provide a private CA certificate of the destination server.

To enable the SRE Exporter service, include `enable-sre.yaml` profile in the cluster definition template.
No further configuration is required, but the default settings may be overriden if needed, see
`SRE Exporter Service Configuration <#sre-exporter-service-configuration>`__.

Configure SRE Destination Endpoint
------------------------------------

When editing the provision configuration, use the following format:

.. code-block::

   sre_basic_auth_username = "SRE destination endpoint username"
   sre_basic_auth_password = "SRE destination endpoint password"
   sre_destination_secret_url = "SRE destination endpoint URL"
   sre_destination_ca_secret = "(optional) SRE destination endpoint CA certificate"

.. note::

   sre_destination_ca_secret is optional and only required if the destination server uses a private/self-signed CA certificate.
   The certificate must be in PEM format as multiple lines (``heredoc``). Using character sequences `\n` for newlines is not allowed.

Following is an example of the configuration:

.. code-block::

   sre_basic_auth_username = "edge-orchestrator-sre-user"
   sre_basic_auth_password = "edge-orchestrator-sre-password"
   sre_destination_secret_url = "https://sre-example.com/api/v1/write"
   sre_destination_ca_secret = <<-EOF
   -----BEGIN CERTIFICATE-----
   ...
   -----END CERTIFICATE-----
   EOF

SRE Exporter Service Configuration
-------------------------------------

You can enable the SRE Exporter service, configure the export time interval, and set the ``customer`` label using :doc:`/deployment_guide/cloud_deployment/cloud_appendix/cloud_cluster_definition` in the following steps:

#. To enable or disable the SRE Exporter service, include or exclude ``profiles/enable-sre.yaml`` in the **cluster definition** YAML file under ``root.clusterValues``.

#. To enable or disable TLS for the SRE Exporter service, set ``.Values.argo.o11y.sre.tls.enabled`` to ``true`` or ``false`` in the **cluster definition** YAML file.

#. Optionally, if the destination server private TLS CA certificate is provided, set ``.Values.argo.o11y.sre.tls.enabled`` and ``.Values.argo.o11y.sre.tls.caSecretEnabled`` values to ``true`` in the *cluster definition* YAML file.

#. Optionally, if you need to override the time interval of sending metrics (default is ``30s``), set ``.Values.argo.o11y.sre.pushInterval`` to the desired value in the **cluster definition** YAML file.

#. Optionally, you can override the ``customer`` label of exported metrics (default is ``.Values.argo.clusterName``) by setting ``.Values.argo.o11y.sre.customerLabel`` in the **cluster definition** YAML file.

The following is a snippet of the example YAML file named ``example.yaml``:

.. code-block:: yaml

   # Cluster specific values applied to root-app only
   root:
   useLocalValues: true
   clusterValues:
     - orch-configs/profiles/enable-platform.yaml
     - orch-configs/profiles/enable-o11y.yaml
     - orch-configs/profiles/enable-kyverno.yaml
     - orch-configs/profiles/enable-app-orch.yaml
     - orch-configs/profiles/enable-cluster-orch.yaml
     - orch-configs/profiles/enable-edgeinfra.yaml
     - orch-configs/profiles/enable-full-ui.yaml
     - orch-configs/profiles/enable-aws.yaml
     - orch-configs/profiles/enable-asm.yaml
     # Remove this profile to disable the SRE Exporter service
     - orch-configs/profiles/enable-sre.yaml
     - orch-configs/profiles/enable-edgeinfra-and-lenovo.yaml
     - orch-configs/profiles/enable-autoprovision.yaml
     - orch-configs/profiles/proxy-none.yaml
     - orch-configs/profiles/profile-aws.yaml
     - orch-configs/profiles/o11y-release.yaml
     - orch-configs/profiles/artifact-rs-production-noauth.yaml
     - orch-configs/profiles/profile-autocert.yaml
     - orch-configs/profiles/profile-aws.yaml
     - orch-configs/profiles/alerting-emails.yaml
     - orch-configs/profiles/enable-explicit-proxy.yaml
     - orch-configs/profiles/resource-default.yaml
     - orch-configs/clusters/bkc.yaml

   argo:
      o11y:
         # these settings work only with enable-sre profile
         sre:
            tls:
              enabled: true
              caSecretEnabled: true
            pushInterval: 60s
            customerLabel: example
