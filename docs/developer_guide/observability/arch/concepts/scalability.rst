Scalability
===========

Observability system is designed to scale both horizontally and vertically to
handle a large number of Edge Nodes. To achieve balance between performance of
multiple components at scale, the system requires careful tuning.

|software_prod_name| ships with a set of pre-defined profiles that correspond
to different number of expected Edge Nodes to be managed, so it's mostly
relevant for :doc:`../orchestrator/edgenode-observability`. The profiles tune
both the horizontal and vertical scaling of individual components of the system
to assure optimal performance of the stack.

The available predefined profiles, which configure observability components via
Argo\* CD app overrides, are:

* Development

   * ``o11y-dev.yaml`` - default development profile consuming minimal
     resources.

* Production (cloud-based)

   * ``o11y-release.yaml`` - default profile for up to 100 Edge Nodes.
   * ``o11y-release-large.yaml`` - profile for 1000 Edge Nodes (and more).

* Production (on-premises)

   * ``o11y-onprem.yaml`` - default profile for up to 100 Edge Nodes.
   * ``o11y-onprem-1k.yaml`` - profile for up to 1,000 Edge Nodes.

For more information on the system requirements regarding scalability, refer
the following guides:

* :doc:`/deployment_guide/cloud_deployment/index`
* :doc:`/deployment_guide/on_prem_deployment/index`

