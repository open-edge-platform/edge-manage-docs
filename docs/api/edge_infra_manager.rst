Edge Infrastructure Manager API
===============================

The Edge Infrastructure Manager REST API provide endpoints for the full life
cycle management of edge infrastructure.  These APIs offer Create, Read,
Update, Delete capabilities for all the Edge Infrastructure Manager elements:
sites, regions, hosts, OS profiles and Resources, workloads, instances,
provides, Telemetry configuration, Maintenance Schedules and more.

Depending on the EIM scenario, some of the APIs may not be supported. Currently EIM API supports the following scenarios:

- Full EIM - all APIs are supported.
- EIM vPRO - only a subset of APIs is supported for vPRO feature management, limited to Create, Read, Update, and Delete operations for hosts.
For details, see :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/onprem_vpro_profile`.
- EIM without Observability - all EIM APIs are supported except observability-related APIs, such as Telemetry configuration.
For details, see :doc:`/user_guide/set_up_edge_infra/installation_script_options/installation_script_options`.

The APIs return error codes based on the internal result of the operation.

Edge Infrastructure Manager REST API are secured via certificates and
credentials.

.. note::
   Resources that are depended on by other resources cannot be deleted unless
   the referring object is deleted first - a few examples:

    - A Host that has an Instance that Workloads, which are used by Cluster
      Orchestrator to refer clusters (and thus application orchestrator deployments) on it cannot
      be deleted.

    - A Site or Region that contains a Host on cannot be deleted.

    - An Instance with an associated Cluster Member cannot be deleted.

    Furthermore some ``DELETE`` operations are not immediate due to working
    with physical hardware, requiring reconciliation cycles.

`Download the Edge Infrastructure Manager API in OpenAPI YAML format
<../_static/amc-infra-core-edge-infrastructure-manager-openapi-all.yaml>`_

.. openapi:: openapi/amc-infra-core-edge-infrastructure-manager-openapi-all.yaml
