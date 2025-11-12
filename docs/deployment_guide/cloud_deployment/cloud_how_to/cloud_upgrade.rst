EMF Cloud Upgrade Guide
=========================

**Upgrade Path:** EMF Cloud v3.0 → v3.1
**Document Version:** 1.0

Overview
--------

This document provides step-by-step instructions to upgrade
Cloud Edge Manageability Framework (EMF) from version 3.0 to 3.1.

Important Notes
---------------

.. warning::
   **DISRUPTIVE UPGRADE WARNING**
   This upgrade requires edge node re-onboarding due to architecture changes (RKE2 → K3s).
   Plan for edge nodes service downtime and manual data backup/restore procedures in edge nodes.

Prerequisites
-------------

System Requirements
~~~~~~~~~~~~~~~~~~~

- Current EMF Cloud installation version 3.0
- Root/sudo privileges on orchestrator node
- PostgreSQL service running and accessible
- docker user credential if any pull limit hit

Pre-Upgrade Checklist
~~~~~~~~~~~~~~~~~~~~~

- [ ] Back up critical application data from edge nodes
- [ ] Document current edge node configurations
- [ ] Remove all edge clusters and hosts:
  - `Delete clusters <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/clusters/delete_clusters.html>`_
  - `De-authorize hosts <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/deauthorize_host.html>`_
  - `Delete hosts <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/delete_host.html>`_

Upgrade Procedure
-----------------

Step 1: Prepare Edge Orchestrator Upgrade Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to follow the steps mentioned in `Prerequisites section <https://docs.openedgeplatform.intel.com/edge-manage-docs/3.0/deployment_guide/cloud_deployment/cloud_get_started/cloud_start_installer.html#prerequisites>`_ with some changes as listed below.

1. **Pull the intended 3.1 cloud installer image and extract it**

   .. code-block:: bash

      # Replace <3.1-TAG> with actual tag
      oras pull registry-rs.edgeorchestration.intel.com/edge-orch/common/files/cloud-orchestrator-installer:<3.1-TAG>
      tar -xzf _build/cloud-orchestrator-installer.tgz

2. **Start the installation Environment**

   Start the Edge Orchestrator installer

   .. code-block:: bash

      ./start-orchestrator-install.sh

      Type 2 for managing an existing cluster

      Type in cluster details, including cluster name and the AWS region. (Same values as were passed during cluster provisioning)

      Specify a location to store the installer settings. (Same values as were passed during cluster provisioning)

3. **Provision the Environment**

   Go to pod-configs directory

   .. code-block:: bash

      orchestrator-admin:~$ cd ~/pod-configs

   Configure the cluster provisioning parameters

   .. code-block:: bash

      orchestrator-admin:~/pod-configs$ ./utils/provision.sh config \
      --aws-account [AWS account] \
      --customer-state-prefix [S3 bucket name prefix to store provision state] \
      --environment [Cluster name] \
      --parent-domain [Root domain for deployment] \
      --region [AWS region to install the cluster] \
      --jumphost-ip-allow-list [IPs to permit cluster administration access]

   .. note::
      `Follow the official guide <https://docs.openedgeplatform.intel.com/edge-manage-docs/3.0/deployment_guide/cloud_deployment/cloud_get_started/cloud_orchestrator_install.html#create-provisioning-configuration>`_ to get details about each parameter

   - Run the following command to begin upgrade

   .. code-block:: bash

      orchestrator-admin:~/pod-configs$ ./utils/provision.sh upgrade \
      --aws-account [AWS account] \
      --customer-state-prefix [S3 bucket name prefix to store provision state] \
      --environment [Cluster name] \
      --parent-domain [Root domain for deployment] \
      --region [AWS region to install the cluster] \
      --jumphost-ip-allow-list [IPs to permit cluster administration access]

4. **Upgrade Edge Orchestrator**

   Go to home directory

   .. code-block:: bash

      orchestrator-admin:~$ cd ~

   Load the aws environment variables into the shell 

    .. code-block:: bash

      source ./reconnect-aws-cluster.sh

   Configure the cluster deployment options. From the ~ directory in the orchestrator-admin container,
   run the following command:

   .. code-block:: bash

      orchestrator-admin:~$ ./configure-cluster.sh

   This process will start redeploying the upgraded applications in the cluster starting with root-app.
   Let it continue and you would observe "infra-external" app is failing due to orch-infra-rps and orch-infra-mps databases.
   In order to fix the above problem, you need to follow below steps.


Step 2: Verification
~~~~~~~~~~~~~~~~~~~~

Log into web UI of the orchestrator. Go to Settings->OS profiles. There you should see the any of the toolkit version upgraded to latest.

Post-Upgrade Steps Edgenode onboarding process
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
After a successful upgrade, follow the EN onboarding process as outlined in the official documentation:
`Set Up Edge Infrastructure – Intel Open Edge Platform <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/index.html>`_
