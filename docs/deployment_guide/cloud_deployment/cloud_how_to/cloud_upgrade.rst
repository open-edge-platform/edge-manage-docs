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

- Current EMF On-Prem installation version 3.0
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
