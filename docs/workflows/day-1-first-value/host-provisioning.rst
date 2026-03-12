.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Host Provisioning
=================

Quick-start guide to onboard and provision edge nodes using ``orch-cli``.

Prerequisite
------------

.. code-block:: bash

   # Set up CLI (one-time per workstation)
   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli config set project <PROJECT_NAME>

Replace ``<CLUSTER_DOMAIN>`` (e.g., ``cluster.onprem``) and ``<PROJECT_NAME>`` (e.g., ``default``) with your values.

Step 1 – Create Location Hierarchy
----------------------------------

.. code-block:: bash

   # Create region
   orch-cli create region <REGION_NAME> --type country

   # Create site under region
   orch-cli create site <SITE_NAME> --region <REGION_NAME>

Replace ``<REGION_NAME>`` (e.g., ``datacenter``) and ``<SITE_NAME>`` (e.g., ``site-west``) with your location names.

Step 2 – Add SSH Key & Custom Config (Optional)
-----------------------------------------------

.. code-block:: bash

   # Upload SSH public key for remote access
   orch-cli create sshkey <KEY_NAME> <PATH_TO_PUBLIC_KEY>

   # Optional: Add cloud-init configuration
   orch-cli create customconfig <CONFIG_NAME> <PATH_TO_CLOUD_INIT>

Replace ``<KEY_NAME>`` (e.g., ``mykey``), ``<PATH_TO_PUBLIC_KEY>`` (e.g., ``~/.ssh/id_rsa.pub``), ``<CONFIG_NAME>`` (e.g., ``myconfig``), and ``<PATH_TO_CLOUD_INIT>`` with your values.

Step 3 – Register Hosts via CSV
--------------------------------

First, identify available OS profiles to use in the CSV:

.. code-block:: bash

   # List available OS profiles
   orch-cli list osprofiles

Note the ``profileName`` value (e.g., ``Edge Microvisor Toolkit 3.0.20251112``) for the ``OSProfile`` column in your CSV.

.. code-block:: bash

   # Generate CSV template
   orch-cli create host --generate-csv hosts.csv

Edit ``hosts.csv`` with your host details (required: Serial, UUID, OSProfile, Site):

.. code-block:: text

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   <SERIAL_1>,<UUID_1>,<OS_PROFILE>,<SITE_NAME>,false,<SSH_USER>,,500,<CONFIG_NAME>
   <SERIAL_2>,<UUID_2>,<OS_PROFILE>,<SITE_NAME>,false,<SSH_USER>,,500

**CSV Field Explanations:**

- ``<SERIAL_1>``, ``<SERIAL_2>``: Hardware serial numbers (find on device label or BIOS)
- ``<UUID_1>``, ``<UUID_2>``: Hardware UUID (from BIOS or BMC)
- ``<OS_PROFILE>``: Name of OS profile created in setup (e.g., ``ubuntu-24``)
- ``<SITE_NAME>``: Site name you created in Step 1
- ``<SSH_USER>``: SSH username for remote access (optional)
- ``<CONFIG_NAME>``: Custom config name from Step 2 (optional)

.. code-block:: bash

   # Validate CSV (dry-run)
   orch-cli create host --import-from-csv hosts.csv --dry-run

   # Import hosts (registers them)
   orch-cli create host --import-from-csv hosts.csv

Step 4 – Onboard Edge Nodes
----------------------------

Hosts transition from ``Registered`` → ``Onboarded`` → ``Provisioned`` automatically
when they connect via PXE/USB boot.

.. code-block:: bash

   # Monitor host lifecycle
   orch-cli list host --verbose

   # Check specific host
   orch-cli get host <HOST_ID> --verbose

Replace ``<HOST_ID>`` with the host resource ID from the list output.

Expected: Hosts show ``Onboarded`` and then ``Provisioned`` status once boot completes.

See Also
--------

- :doc:`cluster-lifecycle` — Cluster deployment (next step)
- :doc:`app-deployment` — Application deployment
- :doc:`../../orch-cli/command-groups/infra` — Infrastructure command reference
- :doc:`../../orch-cli/command-groups/iam` — IAM command reference
