.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Infrastructure Management
==========================

Manage regions, sites, hosts (bare-metal and virtual), custom cloud-init configurations, SSH keys, and providers.

For advanced host configuration options and detailed command syntax, see the orch-cli repository: https://github.com/open-edge-platform/orch-cli

Regions & Sites
---------------

**Create region:**

.. code-block:: bash

   orch-cli create region <REGION_NAME> --type <TYPE>
   # Example: orch-cli create region us-west-1 --type country

**List regions:**

.. code-block:: bash

   orch-cli list regions

**Get region details:**

.. code-block:: bash

   orch-cli get region <REGION_ID>

**Create site:**

.. code-block:: bash

   orch-cli create site <SITE_NAME> --region <REGION_ID>

**List sites:**

.. code-block:: bash

   orch-cli list sites

**Filter sites by region:**

.. code-block:: bash

   orch-cli list sites | grep <REGION_NAME>

**Get site details:**

.. code-block:: bash

   orch-cli get site <SITE_ID>

**Delete site:**

.. code-block:: bash

   orch-cli delete site <SITE_ID>

**Delete region:**

.. code-block:: bash

   orch-cli delete region <REGION_ID>

Custom Configurations
---------------------

**Create custom cloud-init config:**

.. code-block:: bash

   orch-cli create customconfig <CONFIG_NAME> ./path/to/cloudinit.yaml

**List custom configs:**

.. code-block:: bash

   orch-cli list customconfigs

**Get custom config:**

.. code-block:: bash

   orch-cli get customconfigs <CONFIG_ID>

**Delete custom config:**

.. code-block:: bash

   orch-cli delete customconfig <CONFIG_ID>

SSH Keys
--------

**Create SSH key:**

.. code-block:: bash

   orch-cli create sshkey <KEY_NAME> ~/path/to/key.pub

**List SSH keys:**

.. code-block:: bash

   orch-cli list sshkey

**Get SSH key details:**

.. code-block:: bash

   orch-cli get sshkey <KEY_NAME>

**Delete SSH key:**

.. code-block:: bash

   orch-cli delete sshkey <KEY_NAME>

Host Management
---------------

**Generate host creation CSV template:**

.. code-block:: bash

   orch-cli create host --generate-csv > hosts.csv

CSV columns include: ``serialnumber``, ``uuid``, ``siteid``, ``clustername``, ``osprofile``, ``sshkey``, ``customconfig``.
Optional fields can be left empty. One host per row.

**Preview host creation (dry-run):**

.. code-block:: bash

   orch-cli create host --import-from-csv hosts.csv --dry-run

**Create hosts from CSV:**

.. code-block:: bash

   orch-cli create host --import-from-csv hosts.csv

**List hosts:**

.. code-block:: bash

   orch-cli list hosts

**Get host details:**

.. code-block:: bash

   orch-cli get host <HOST_ID>

**Delete host:**

.. code-block:: bash

   orch-cli delete host <HOST_ID>

Provider Management
-------------------

**Create provider (bare-metal example):**

.. code-block:: bash

   orch-cli create provider <PROVIDER_NAME> PROVIDER_KIND_BAREMETAL \
     --vendor PROVIDER_VENDOR_UNSPECIFIED \
     --config '{"defaultOs":"ubuntu","autoProvision":true,"osSecurityFeatureEnable":false}' \
     --project <PROJECT_NAME>

**List providers:**

.. code-block:: bash

   orch-cli list providers

**Get provider details:**

.. code-block:: bash

   orch-cli get provider <PROVIDER_ID>

**Delete provider:**

.. code-block:: bash

   orch-cli delete provider <PROVIDER_ID>

See Also
--------

- :doc:`iam` — User and organization management
- :doc:`clusters` — Cluster management
- :doc:`applications` — Application and deployment management
- :doc:`maintenance` — OS updates and scheduling
- :doc:`../../workflows/day-1-first-value/host-provisioning` — Host provisioning workflow
