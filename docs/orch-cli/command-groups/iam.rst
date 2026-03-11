.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

IAM & Organization Management
=============================

Configure the CLI, manage Keycloak users, organizations, and projects with role-based access.

.. note::

   For detailed kcadm (Keycloak admin) operations and advanced scenarios, refer to the orch-cli repository at https://github.com/open-edge-platform/orch-cli

CLI Configuration
-----------------

**Set API endpoint:**

.. code-block:: bash

   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>

**Set default project:**

.. code-block:: bash

   orch-cli config set project <PROJECT_NAME>

**Login:**

.. code-block:: bash

   orch-cli logout
   orch-cli login <USERNAME> <PASSWORD>

**Verify connection:**

.. code-block:: bash

   orch-cli version
   orch-cli list features

Keycloak Admin Setup (kcadm)
----------------------------

Keycloak Admin CLI (kcadm) is required for advanced user and group management. Requires Keycloak 26.1.3+.

**Download & setup:**

.. code-block:: bash

   wget https://github.com/keycloak/keycloak/releases/download/26.1.3/keycloak-26.1.3.tar.gz
   tar -xzf keycloak-26.1.3.tar.gz
   export PATH=$PATH:$(pwd)/keycloak-26.1.3/bin

**Authenticate with Keycloak:**

.. code-block:: bash

   export CLUSTER_FQDN=<CLUSTER_DOMAIN>
   kcadm.sh config credentials --server https://keycloak.$CLUSTER_FQDN/ \
     --realm master --user <KC_ADMIN_USER> --password <KC_ADMIN_PASSWORD>

**Create user:**

.. code-block:: bash

   kcadm.sh create users -r master \
     -s username=<USERNAME> \
     -s enabled=true \
     -s firstName=<FIRST_NAME> \
     -s email=<EMAIL>

**Set user password:**

.. code-block:: bash

   USER_ID=$(kcadm.sh get users -r master | jq -r ".[] | select(.username == \"<USERNAME>\") | .id")
   kcadm.sh set-password --userid $USER_ID --temporary false

**List all groups:**

.. code-block:: bash

   kcadm.sh get groups -r master | jq -r '.[] | .name' | sort

**Add user to group:**

.. code-block:: bash

   USER_ID=$(kcadm.sh get users -r master | jq -r ".[] | select(.username == \"<USERNAME>\") | .id")
   GROUP_ID=$(kcadm.sh get groups -r master | jq -r ".[] | select(.name == \"<GROUP_NAME>\") | .id")
   kcadm.sh update users/$USER_ID/groups/$GROUP_ID -r master \
     -s realm=master -s userId=$USER_ID -s groupId=$GROUP_ID -n

**List user groups:**

.. code-block:: bash

   USER_ID=$(kcadm.sh get users -r master | jq -r ".[] | select(.username == \"<USERNAME>\") | .id")
   kcadm.sh get users/$USER_ID/groups -r master | jq '.[] | .name'

Organization Management
-----------------------

**Create organization:**

.. code-block:: bash

   orch-cli create organization <ORG_NAME> --description "<DESCRIPTION>"

**Get organization:**

.. code-block:: bash

   orch-cli get organization <ORG_NAME>

**List organizations:**

.. code-block:: bash

   orch-cli list organization

**Map organization to Keycloak group:**

.. code-block:: bash

   ORG_UUID=$(orch-cli get organization <ORG_NAME> | grep "UID:" | awk '{print $2}')
   GROUP_ID=$(kcadm.sh get groups -r master | jq -r ".[] | select(.name | contains(\"$ORG_UUID\")) | .id")
   USER_ID=$(kcadm.sh get users -r master | jq -r ".[] | select(.username == \"<USERNAME>\") | .id")
   kcadm.sh update users/$USER_ID/groups/$GROUP_ID -r master \
     -s realm=master -s userId=$USER_ID -s groupId=$GROUP_ID -n

**Delete organization:**

.. code-block:: bash

   orch-cli delete organization <ORG_NAME>

Project Management
------------------

**Create project:**

.. code-block:: bash

   orch-cli create project <PROJECT_NAME> --description "<DESCRIPTION>"

**Get project:**

.. code-block:: bash

   orch-cli get project <PROJECT_NAME>

**List projects:**

.. code-block:: bash

   orch-cli list projects

**Add all project users to groups:**

.. code-block:: bash

   PROJ_UUID=$(orch-cli get project <PROJECT_NAME> | grep "UID:" | awk '{print $2}')
   kcadm.sh get groups -r master | \
     jq -r ".[] | select(.name | contains(\"$PROJ_UUID\")) | .id" | \
     while read -r GROUP_ID; do
       echo "Adding user $USER_ID to group $GROUP_ID"
       kcadm.sh update users/$USER_ID/groups/$GROUP_ID \
         -r master \
         -s realm=master \
         -s userId=$USER_ID \
         -s groupId=$GROUP_ID \
         -n
     done

**Delete project:**

.. code-block:: bash

   orch-cli delete project <PROJECT_NAME>

See Also
--------

- :doc:`../authentication` — Authentication details
- :doc:`../configuration` — Configuration reference
- :doc:`infra` — Infrastructure and host management
- :doc:`../../shared/shared_iam_groups` — IAM groups and roles
- :doc:`../../shared/shared_mt_overview` — Multi-tenancy overview
- :doc:`../../workflows/day-1-first-value/host-provisioning` — Host provisioning workflow
