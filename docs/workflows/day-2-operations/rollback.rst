.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Rollback
==================

Quick-start guide to rollback edge nodes using ``orch-cli``.

Prerequisite
------------

.. code-block:: bash

   # Set up CLI (one-time per workstation)
   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli config set project <PROJECT_NAME>

Replace ``<CLUSTER_DOMAIN>`` (e.g., ``cluster.onprem``) and ``<PROJECT_NAME>`` (e.g., ``default``) with your values.
