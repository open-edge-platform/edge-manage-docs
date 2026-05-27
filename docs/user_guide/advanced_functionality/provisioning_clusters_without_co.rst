Provisioning Clusters without Cluster Orchestrator (CO)
=======================================================

This document describes how to provision clusters without using CO.
There could be various reasons for provisioning clusters without CO, such as testing, development,
or specific use cases that do not require the full capabilities of CO.
The clusters provisioned using the methods described here will not be managed by CO,
and thus will not be visible in the CO dashboard.
However, their configuration will be bundled with their host configuration,
and retrievable using front end tools.


Pre-requisites
--------------
- EMF installed and configured in the environment.
- Access to an EMF deployment.
- Access to the Kubernetes\* cluster where EMF is installed.
- orch-cli installed and configured to interact with the EMF API server (see :doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide`)


Cluster Provisioning
--------------------
1. Customize the cloud init file as explained here `<https://docs.openedgeplatform.intel.com/edge-manage-docs/2026.0/user_guide/advanced_functionality/oxm_pxe_provisioning.html#set-up-environment>`_.
2. Generate the stand alone configuration file
3. Use orch-cli to create a host.

Wait for the host to be provisioned and registered with EMF. Once the host is registered and onboarded to EMF,
you can use the orch-cli to retrieve the host information and access the cluster configuration.

The cluster configuration will be bundled with the host configuration,
and you can retrieve it using the orch-cli commands to get the host details.

If you try to generate the standalone configuration file using orch-cli and you get an error message
similar to the one below:

.. code-block:: shell

  $ orch-cli generate standalone-config -c config-file -o cloud-init.cfg
  Error: command "generate" is disabled in the current Edge Orchestrator configuration

run the following command to enable the command in the Edge Orchestrator configuration:

.. code-block:: shell

  $ orch-cli config set orchestrator.features.edge-infrastructure-manager.oxm-profile.installed true

The "generate" command should now be enabled, and you can proceed with generating
the standalone configuration file and creating the host using the orch-cli.
