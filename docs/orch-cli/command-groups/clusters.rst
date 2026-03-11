.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Cluster Management
==================

Create, manage, and operate Kubernetes clusters on edge nodes.

Cluster Operations
------------------

**List clusters:**

.. code-block:: bash

   orch-cli list clusters

**Get cluster details:**

.. code-block:: bash

   orch-cli get cluster <CLUSTER_ID>

**List cluster templates:**

.. code-block:: bash

   orch-cli list clustertemplates

**Create cluster from template:**

.. code-block:: bash

   orch-cli create cluster <CLUSTER_NAME> \
     --nodes <NODE_UUID>:all \
     --labels <LABEL_KEY>=<LABEL_VALUE> \
     --template <TEMPLATE_NAME>-<VERSION>
   # Example: orch-cli create cluster prod-cluster --nodes host-abc123:all --labels env=production --template default-v1.0.0

**Delete cluster:**

.. code-block:: bash

   orch-cli delete cluster <CLUSTER_NAME>

See Also
--------

- :doc:`infra` — Infrastructure and host management
- :doc:`applications` — Application and deployment management
- :doc:`maintenance` — Maintenance and scheduling
- :doc:`../../workflows/day-1-first-value/cluster-lifecycle` — Cluster deployment workflow
