.. SPDX-FileCopyrightText: (C) 2025 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Cluster Lifecycle
=================

Deploy and manage Kubernetes clusters on provisioned edge nodes using ``orch-cli``.

**Prerequisite:** Hosts must be in ``Provisioned`` state (see :doc:`host-provisioning` for onboarding steps).

Step 1 – Verify Cluster Prerequisites
-------------------------------------

.. code-block:: bash

   # List available cluster templates
   orch-cli list clustertemplates

   # List provisioned hosts and capture the host UUID
   orch-cli list hosts

To look up a specific host by serial number:

.. code-block:: bash

   orch-cli list hosts --filter serial=<SERIAL_NUMBER>

Note the host ``uuid`` and template name for cluster creation.

Step 2 – Create Cluster
-----------------------

**Create single-node cluster:**

.. code-block:: bash

   orch-cli create cluster <CLUSTER_NAME> --nodes <HOST_UUID>:all

Replace ``<CLUSTER_NAME>`` (e.g., ``prod-cluster``) and ``<HOST_UUID>`` with your values.

**Add labels (optional):**

.. code-block:: bash

   orch-cli create cluster <CLUSTER_NAME> --nodes <HOST_UUID>:all \
     --labels environment=production,region=us-west

**Use specific template:**

.. code-block:: bash

   orch-cli create cluster <CLUSTER_NAME> --nodes <HOST_UUID>:all \
     --template <TEMPLATE_NAME>

Replace ``<TEMPLATE_NAME>`` with a template from step 1 (e.g., ``default-v1.0.0``).

Step 3 – Monitor Cluster State
------------------------------

**List all clusters:**

.. code-block:: bash

   orch-cli list clusters

**Get cluster details:**

.. code-block:: bash

   orch-cli get cluster <CLUSTER_NAME>

Cluster transitions: ``pending`` → ``provisioning`` → ``provisioned`` → ``active``.

Expected: Once ``active``, the cluster is ready for applications.

Step 4 – Access Cluster (Optional)
----------------------------------

**Get kubeconfig for kubectl access:**

.. code-block:: bash

   orch-cli get cluster <CLUSTER_NAME> --format kubeconfig > ~/kubeconfig.yaml
   export KUBECONFIG=~/kubeconfig.yaml
   kubectl cluster-info

Step 5 – Delete Cluster
-----------------------

.. code-block:: bash

   orch-cli delete cluster <CLUSTER_NAME>

See Also
--------

- :doc:`app-deployment` — Application deployment (next step)
- :doc:`../../orch-cli/command-groups/clusters` — Cluster command reference
- :doc:`../../orch-cli/command-groups/infra` — Infrastructure command reference
- :doc:`../../orch-cli/command-groups/maintenance` — Maintenance command reference
