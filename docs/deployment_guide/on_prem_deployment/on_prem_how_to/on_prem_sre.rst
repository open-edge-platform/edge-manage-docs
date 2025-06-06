Configure SRE Exporter Service
=================================================

If the SRE Exporter (Service Reliability Engineering) service is enabled in
Edge Orchestrator, it exports SLI (Service Level Indicator) metrics that
constantly monitor Edge Orchestrator cluster availability and the health of
edge node hosts using an external monitoring system.

The service sends the metrics to the external SRE Destination Endpoint at a regular time
interval. The default is 30 seconds.

The SRE (Service Reliability Engineering) Destination Endpoint server must support the
`Prometheus Remote Write protocol <https://prometheus.io/docs/concepts/remote_write_spec>`_
with basic access authentication and optionally TLS.

The Destination Endpoint URL, basic authentication username and password must be provided
during manual installation. If TLS is enabled, a publicly trusted Certificate Authority (CA)
certificates for the destination server are supported by default. Optionally, a private CA
certificate of the destination server can be provided.

To enable the SRE Exporter service, include `enable-sre.yaml` profile in a cluster
definition template. No further configuration is required, but the default settings
may be overridden if needed, see
`SRE Exporter Service Configuration <../../cloud_deployment/cloud_advanced/cloud_sre.html#sre-exporter-service-configuration>`__




Configure the SRE Destination Endpoint
---------------------------------------

The following parameters can be configured on Edge Orchestrator installation for the SRE
Destination Endpoint:

* Destination Endpoint URL
* Basic-auth user name
* Basic-auth password
* TLS authentication and destination server private TLS CA certificate

See :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install`
for more information.



SRE Exporter Service Configuration
----------------------------------

You can configure the SRE Exporter service, export time interval, and ``customer`` label in the cluster definition through the following:

#. To enable or disable the SRE Exporter service, include or exclude ``profiles/enable-sre.yaml`` in the *cluster definition* YAML file under ``root.clusterValues``.
#. Optionally, if need to override the time interval of sending metrics (default is ``30s``), set ``.Values.argo.o11y.sre.pushInterval`` to the desired value in the *cluster definition* YAML file.
#. Optionally, ``customer`` label of exported metrics can be overridden (default is ``.Values.argo.clusterName``) by setting
   ``.Values.argo.o11y.sre.customerLabel`` in the *cluster definition* YAML file.

See an example of snippet of the cluster definition YAML file named ``example.yaml`` below.

.. code-block:: yaml

   # Cluster specific values applied to root-app only
   root:
      useLocalValues: true
      clusterValues:
         - profiles/enable-platform.yaml
         - profiles/enable-o11y.yaml
         - profiles/enable-kyverno.yaml
         - profiles/enable-ma.yaml
         - profiles/enable-mc.yaml
         - profiles/enable-mi.yaml
         - profiles/enable-full-ui.yaml
         - profiles/enable-integration.yaml
         - profiles/enable-docs-service.yaml
         # remove this profile to disable SRE Exporter service
         - profiles/enable-sre.yaml
         # proxy group must be specified as the first post-"enable" profile
         - profiles/proxy-none.yaml
         - profiles/profile-aws.yaml
         - profiles/o11y-release.yaml
         - profiles/release-service-external.yaml
         - clusters/example.yaml

   argo:
      o11y:
         # these settings work only with enable-sre profile
         sre:
            tls:
              enabled: true
              caSecretEnabled: true
            pushInterval: 60s
            customerLabel: example

See :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install`
for more details on custom settings configuration in the cluster definition.
