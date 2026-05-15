Provisioning Clusters without Cluster Orchestrator (CO)
=======================================================

There could be various reasons for provisioning clusters without CO, such as testing, development,
or specific use cases that do not require the full capabilities of CO. 
This document describes how to provision clusters without using CO.
The clusters provisioned using the methods described here will not be managed by CO,
and thus will not be visible in the CO dashboard.
However, their configuration will be bundled with their host configuration,
and retrievable using front end tools.


Pre-requisites
--------------
- EMF installed and configured in the environment.
- Access to the EMF API server.
- Access to the Kubernetes\* cluster where EMF is installed.
- orch-cli installed and configured to interact with the EMF API server (see :doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide`)


Cluster Provisioning
--------------------
1. Customize the cloud init file as explained here https://docs.openedgeplatform.intel.com/edge-manage-docs/2026.0/user_guide/advanced_functionality/oxm_pxe_provisioning.html#set-up-environment
2. Generate the stand alone configuration file
3. Use orch-cli to create a host.


Wait for the host to be provisioned and registered with EMF. Once the host is registered and onboarded to EMF,
you can use the orch-cli to retrieve the host information and access the cluster configuration.

The cluster configuration will be bundled with the host configuration,
and you can retrieve it using the orch-cli commands to get the host details.
