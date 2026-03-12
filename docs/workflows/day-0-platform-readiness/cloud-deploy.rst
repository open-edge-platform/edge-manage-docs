.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Cloud Orchestrator Deployment (AWS) - CLI Validation First
===========================================================

Composability (Set Before Running Installer)
--------------------------------------------
By default AO/CO/O11Y are enabled. If you need to disable any profile,
**export the DISABLE_* flags now** so provisioning/installer picks them up and
you can reuse the same values on upgrade.

.. code-block:: bash

   export DISABLE_AO_PROFILE=true      # optional
   export DISABLE_CO_PROFILE=true      # optional
   export DISABLE_O11Y_PROFILE=true    # optional

See :doc:`choose-composability` for details and post‑deploy verification.

Intent
------
Deploy Edge Orchestrator on AWS using the **cloud installer**, then
immediately validate readiness via *orch-cli*.

Prerequisites
-------------
* Docker, ORAS, jq installed on the admin host (versions per guide).
* AWS IAM permissions and network/DNS prerequisites satisfied.

Download Installer Artifact
---------------------------
Use ORAS to pull the cloud installer artifact and extract:

.. code-block:: bash

   oras pull      registry-rs.edgeorchestration.intel.com/edge-orch/common/files/     cloud-orchestrator-installer:v3.0.0
   tar -xzf _build/cloud-orchestrator-installer.tgz

Provision AWS Resources
-----------------------
Set DNS strategy and provision resources, e.g.:

.. code-block:: bash

   ./utils/provision.sh config      --aws-account 1234567890      --customer-state-prefix customer-a      --environment demo      --parent-domain example.com      --region us-east-2      --jumphost-ip-allow-list 203.0.113.10/32

Notes: add ``--auto-cert`` for automatic certs; use ``--no-route53`` for
manual DNS.

Post-Install Validation (CLI)
-----------------------------

.. code-block:: bash

   orch-cli config set api-endpoint https://api.<CLUSTER_FQDN>
   orch-cli config set project <PROJECT>
   orch-cli get regions

Expected: HTTP 200; empty list is OK on fresh install.

Optional UI Confirmation
------------------------
Open UI Home/Status and verify core namespaces are healthy.
Post-Deployment Administration
------------------------------

After orchestrator deployment, configure administrator access and operational settings:

**Identity & Access Management (IAM):**

Set up user authentication and role-based access control:

.. code-block:: bash

   # Access UI at https://web-ui.<CLUSTER_FQDN>
   # Login with default admin credentials

* Create organizations and projects for multi-tenancy
* Assign users to projects with appropriate roles
* Configure External IAM (LDAP/SAML) for enterprise integration

See :doc:`/shared/shared_gs_iam` and :doc:`/shared/shared_mt_overview` for detailed setup.

**User Groups & Roles:**

Define role-based access for operations teams:

* **Organization Admins** — manage organizations and projects
* **Project Admins** — manage users, infrastructure, and deployments
* **Infrastructure Managers** — onboard and manage edge nodes
* **Application Managers** — deploy and manage applications
* **Viewers** — read-only access to resources

See :doc:`/shared/shared_iam_groups` for group definitions.

**Alerting & Notifications:**

Configure email alerts for infrastructure events:

.. code-block:: bash

   # Configure SMTP for email notifications
   # See deployment guide cloud_advanced/cloud_alerts for settings

* Orchestrator health and availability
* Edge node provisioning failures
* Application deployment issues
* Resource utilization warnings

See :doc:`/user_guide/administration/alerting` for complete setup.

**Advanced Configuration:**

* External Identity Management: :doc:`/shared/shared_ht_iam_ext`
* CLI-based IAM/Multi-tenancy: :doc:`/shared/shared_ht_iam_mt_cli`
* Edge Node Telemetry: :doc:`/shared/shared_adv_edge_node`

See :doc:`/user_guide/administration/index` for all administrative tasks.

What's Next
-----------

* **Day-1:** Onboard edge nodes and begin infrastructure management
* **Day-2:** Deploy applications and manage lifecycle operations
* **Full Administration:** :doc:`/user_guide/administration/index`
