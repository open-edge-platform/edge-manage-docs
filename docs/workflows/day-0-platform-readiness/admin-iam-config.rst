.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Administration & IAM Configuration
===================================

After orchestrator deployment, quickly set up Organizations and Projects with the three essential user roles
before onboarding edge nodes. This ensures proper multi-tenancy and role-based access control.

**Time estimate:** 5-10 minutes

Prerequisites
-------------

- Orchestrator deployed and validated (see :doc:`onprem-deploy`)
- orch-cli installed and configured (see :doc:`../../orch-cli/installation` and :doc:`../../orch-cli/authentication`)
- Keycloak admin credentials: ``<KC_ADMIN_USER>`` / ``<KC_ADMIN_PASSWORD>``

Step 1: Create Organization
---------------------------

An **Organization** is the top-level multi-tenancy container for all users, projects, and infrastructure.

**Create organization:**

.. code-block:: bash

   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli login <KC_ADMIN_USER> <KC_ADMIN_PASSWORD>

   # Create organization
   orch-cli create organization <ORG_NAME> --description "<ORG_DESCRIPTION>"
   # Example: orch-cli create organization acme-corp --description "ACME Corporation infrastructure"

   # Verify
   orch-cli get organization <ORG_NAME>

Step 2: Create Project & Project Users
--------------------------------------

A **Project** contains all infrastructure, applications, and edge nodes. Each project needs three key roles.

**Create project:**

.. code-block:: bash

   orch-cli logout
   orch-cli login <ORG_ADMIN_USER> <ORG_ADMIN_PASSWORD>

   PROJECT_NAME="<PROJECT_NAME>"  # e.g., production
   orch-cli create project $PROJECT_NAME --description "<PROJECT_DESCRIPTION>"

   # Verify and set as default
   orch-cli get project $PROJECT_NAME
   orch-cli config set project $PROJECT_NAME

**Create three project users with kcadm (Keycloak CLI):**

.. code-block:: bash

   # Prerequisites: kcadm installed (see below)
   export CLUSTER_FQDN=<CLUSTER_DOMAIN>
   kcadm.sh config credentials --server https://keycloak.$CLUSTER_FQDN/ --realm master \
     --user <KC_ADMIN_USER> --password <KC_ADMIN_PASSWORD>

   # Define project users
   PROJECT_NAME="<PROJECT_NAME>"
   declare -A USERS=(
     [edge-manager]="<EDGE_MANAGER_PASSWORD>"
     [edge-operator]="<EDGE_OPERATOR_PASSWORD>"
     [host-manager]="<HOST_MANAGER_PASSWORD>"
   )

   # Create each user
   for username in "${!USERS[@]}"; do
     PASSWORD="${USERS[$username]}"

     # Create user
     kcadm.sh create users -r master \
       -s username=$PROJECT_NAME-$username \
       -s enabled=true \
       -s firstName="$username"

     # Set password
     USER_ID=$(kcadm.sh get users -r master | jq -r ".[] | select(.username == \"$PROJECT_NAME-$username\") | .id")
     kcadm.sh set-password --userid $USER_ID --temporary false
   done

**User Roles (copy-paste ready):**

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Role
     - Use Case
   * - **edge-manager**
     - Define infrastructure (regions, sites), create templates, manage deployments. **Most permissions.**
   * - **edge-operator**
     - Deploy applications, monitor clusters. **Cannot define infrastructure or create new resources.**
   * - **host-manager**
     - Register edge nodes, manage hosts (onboard, provision). **Infrastructure management only.**

For detailed role permissions, see :doc:`../../shared/shared_iam_groups`.

Step 3: Verify Multi-Tenancy Isolation (Optional)
--------------------------------------------------

Ensure users only see their project:

.. code-block:: bash

   # Login as edge-manager
   orch-cli logout
   orch-cli login $PROJECT_NAME-edge-manager <EDGE_MANAGER_PASSWORD>

   # Should only see their project
   orch-cli list project

   # Should have access to infrastructure
   orch-cli list region --project $PROJECT_NAME

**Next: You're ready for Day-1 node onboarding!** See :doc:`../day-1-first-value/host-provisioning`.

See Also
--------

- :doc:`../../user_guide/administration/index` — IAM documentation
- :doc:`../../shared/shared_mt_overview` — Multi-tenancy concepts
- :doc:`../../shared/shared_iam_groups` — Role reference
- :doc:`../../shared/shared_gs_iam` — Advanced IAM configuration
- :doc:`../../shared/shared_ht_iam_ext` — External IAM integration

Optional: Keycloak Admin CLI (kcadm) Setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you prefer CLI user management instead of Web UI, install kcadm:

.. code-block:: bash

   sudo apt update && sudo apt install openjdk-17-jdk

   wget https://github.com/keycloak/keycloak/releases/download/26.1.3/keycloak-26.1.3.tar.gz
   tar -xzf keycloak-26.1.3.tar.gz

   export PATH=$PATH:$(pwd)/keycloak-26.1.3/bin
   echo 'export PATH=$PATH:$(pwd)/keycloak-26.1.3/bin' >> ~/.bashrc
   source ~/.bashrc

   # Verify
   kcadm.sh --version
