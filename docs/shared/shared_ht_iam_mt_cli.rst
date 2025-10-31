Configure IAM and multi tenancy using CLI (Optional)
====================================================

This document provides a set of combined steps and instructions on how to configure the Identity and Access Management and the multi-tenancy 
of the Edge Manageability Framework using commandline interfaces (CLIs) as an alternative to using UI.

The concept of Identity and Access Management within the Edge Manageability Framework is covered in:
:doc:`/shared/shared_gs_iam` 
The concept of Multi-tenancy within the Edge Manageability Framework is covered in:
:doc:`/shared/shared_mt_overview` 

It is expected that the user gets familiar with the above documentation to understand the general IAM/Tenancy architecture and related concepts.

To manage the IAM and the tenancy two CLI tools are used.

* `Keycloak's kcadm Admin CLI <https://www.keycloak.org/docs/latest/server_admin/#admin-cli>`_
* `Edge Manageability Framework's orch-cli <https://github.com/open-edge-platform/orch-cli>`_

Prerequisites
-------------

* Basic administrative knowledge of the IAM and your credentials.
* Tenant endpoint information for the IAM, and any redirect URLs.

Install orch-cli
^^^^^^^^^^^^^^^^

The orch-cli is used for managing resources within Edge Manageability Framework - in this tutorial it will be used to create organizations and projects.
For information on how to install and use orch-cli go to :doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide` 

Install Keycloak's kcadm Admin CLI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The kcadm tool will be used to access and manage resources within Keycloak for IAM.
To install kcadm on Linux host run following commands:

.. code-block:: bash

   # Install Java as a pre-requisite
   sudo apt update
   sudo apt install openjdk-17-jdk
   
   # Download and unpack keycloak
   wget https://github.com/keycloak/keycloak/releases/download/26.1.3/keycloak-26.1.3.tar.gz
   tar -xzf keycloak-26.1.3.tar.gz
   
   # Export path to keycloak
   export PATH=$PATH:$(pwd)/keycloak-26.1.3/bin
   echo 'export PATH=$PATH:$(pwd)/keycloak-26.1.3/bin' >> ~/.bashrc
   source ~/.bashrc

Obtain Admin user password
^^^^^^^^^^^^^^^^^^^^^^^^^^

The default IdP administrator username is ``admin``.

In a terminal with ``kubectl`` access to Edge Manageability Framework, run the following command.

.. code-block:: shell

   kubectl -n orch-platform get secret platform-keycloak -o jsonpath='{.data.admin-password}' | base64 -d && echo

.. warning::
   You must reset the default IdP administrator password on first use to secure the Keycloak IdP.

Configuring kcadm
^^^^^^^^^^^^^^^^^

Once you have obtained the admin user password, you can configure the kcadm tool to use it.
Provide the Keycloak endpoint of the Edge Manageability Framework and the user name followed by password prompt.

.. code-block:: bash

   # Change the CLUSTER_FQDN to one of your own
   CLUSTER_FQDN="sample.cluster.fqdn.com"
   
   # Use the default password for first time login
   kcadm.sh config credentials   --server https://keycloak.$CLUSTER_FQDN/   --realm master   --user admin
   Logging into https://keycloak.sample.cluster.fqdn.com/ as user admin of realm master
   Enter password:

To change the default Admin password find the Admin User ID and set a new password

.. code-block:: bash

   # Find the User ID of the admin account
   ADMIN_ID=$(kcadm.sh get users -r master | jq -r '.[] | select(.username == "admin") | .id')
   
   # Set new password for admin user
   kcadm.sh set-password --userid $ADMIN_ID
   Enter password:

Create a new user
^^^^^^^^^^^^^^^^^

Create a new user based on own federation and tenancy requirements using the kcadm tool.
In this example a sample-user will be created to be given access to create organizations and projects.
Refer to Keycloak's own kcadm documentation or use --help command to apply and manage more advance user options.

.. code-block:: bash

   # Create a new user
   kcadm.sh create users -r master -s username=sample-user -s enabled=true -s firstName=sample -s email=sample-user@sample-domain.com

   # Find the User ID of the admin account
   USER_ID=$(kcadm.sh get users -r master | jq -r '.[] | select(.username == "sample-user") | .id')
   
   # Set new password for sample-user
   kcadm.sh set-password --userid $USER_ID
   Enter password:

   # To list all users
   kcadm.sh get users -r master

Add the user to **org-admin-group**.

.. code-block:: bash

   # Find the org-admin-group ID
   ORG_ADMIN_GROUP_ID=$(kcadm.sh get groups -r master | jq -r '.[] | select(.name == "org-admin-group") | .id')

   # Add user to the group
   kcadm.sh update users/$USER_ID/groups/$ORG_ADMIN_GROUP_ID -r master -s realm=master -s userId=$USER_ID -s groupId=$ORG_ADMIN_GROUP_ID -n   
   
   # To list given user's groups
   kcadm.sh get users/$USER_ID/groups -r master | jq '.[] | .name'

   # To list all groups
   kcadm.sh get groups -r master | jq -r '.[] | .name' | sort

Configure orch-cli
^^^^^^^^^^^^^^^^^^

Login using the new user to the Edge Manageability framework using the orch-cli

.. code-block:: bash

   # Configure the API endpoint in orch-cli
   ./orch-cli config set api-endpoint https://api.$CLUSTER_FQDN

   # Login using the sample-user and it's password
   ./orch-cli login sample-user
   Enter Password:

Create an organization
^^^^^^^^^^^^^^^^^^^^^^

Create a new organization based on own federation and tenancy requirement using the orch-cli tool.
In this example a sample-org will be created.
The sample-user will be given access to create projects within this organization using the kcadm tool.

.. code-block:: bash

   # Create organization using orch-cli
   orch-cli create organization sample-org --description "my sample-org"

   # Wait until the organization creation is complete as indicated by the Status message
   orch-cli get organization sample-org
   Name:              sample-org
   Description:       my sample-org
   Status:            STATUS_INDICATION_IDLE
   Status message:    Org sample-org CREATE is complete
   UID:               db8d42ad-849d-4626-8dc7-d7955b83e995

   # Using the organizations UUID find the find the organizations Keycloak ID and add the user to the Project Manager Group
   ORG_UUID=$(orch-cli get organization sample-org | grep "UID:" | awk '{print $2}')
   PROJ_ID=$(kcadm.sh get groups -r master | jq -r '.[] | select(.name | contains("'"$ORG_UUID"'")) | .id')
   kcadm.sh update users/$USER_ID/groups/$PROJ_ID -r master -s realm=master -s userId=$USER_ID -s groupId=$PROJ_ID -n

   # To list given user's groups
   kcadm.sh get users/$USER_ID/groups -r master | jq '.[] | .name'
   "db8d42ad-849d-4626-8dc7-d7955b83e995_Project-Manager-Group"
   "org-admin-group"

Create a project
^^^^^^^^^^^^^^^^

Create a new project based on own federation and tenancy requirements using the orch-cli tool.
In this example a sample-project will be created.
The sample-user will be given access to all relevant created groups for this project using the kcadm tool.

.. code-block:: bash

   # Create project using orch-cli
   orch-cli create project sample-project --description "my sample-project"

   # Wait until the project creation is complete as indicated by the Status message
   orch-cli get project sample-project
   Name:              sample-project
   Description:       my sample-project
   Status:            STATUS_INDICATION_IDLE
   Status message:    Project sample-project CREATE is complete
   UID:               70883f2f-4bbe-4a67-9eea-1a5824dee549

   # Using the projects UUID find the find all related project groups Keycloak IDs and add the user to the groups within the project
   PROJ_UUID=$(orch-cli get project sample-project | grep "UID:" | awk '{print $2}')
   kcadm.sh get groups -r master | \
      jq -r '.[] | select(.name | contains("'"$PROJ_UUID"'")) | .id' | \
      while read -r GROUP_ID; do
         echo "Adding user $USER_ID to group $GROUP_ID"
         kcadm.sh update users/$USER_ID/groups/$GROUP_ID \
            -r master \
            -s realm=master \
            -s userId=$USER_ID \
            -s groupId=$GROUP_ID \
            -n
   done

   # To list given user's groups
   kcadm.sh get users/$USER_ID/groups -r master | jq '.[] | .name'
   "70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Manager-Group"
   "70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Node-M2M-Service-Account"
   "70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Onboarding-Group"
   "70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Operator-Group"
   "70883f2f-4bbe-4a67-9eea-1a5824dee549_Host-Manager-Group"
   "db8d42ad-849d-4626-8dc7-d7955b83e995_Project-Manager-Group"
   "org-admin-group"

Once the project is created configure the orch-cli to use the project by default when querying the Edge Manageability Framework.

.. code-block:: bash

   # Configure the project in orch-cli
   ./orch-cli config set project sample-project

Adding other groups to users.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To add other required groups to user as per own federation and tenancy requirements use steps similar to the above instructions.
Following is a typical list of groups within Keycloak upon creation of single organization and project.

.. code-block:: bash

   70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Manager-Group
   70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Node-M2M-Service-Account
   70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Onboarding-Group
   70883f2f-4bbe-4a67-9eea-1a5824dee549_Edge-Operator-Group
   70883f2f-4bbe-4a67-9eea-1a5824dee549_Host-Manager-Group
   apps-m2m-service-account
   db8d42ad-849d-4626-8dc7-d7955b83e995_Project-Manager-Group
   edge-manager-group
   edge-operator-group
   host-manager-group
   iam-admin-group
   org-admin-group
   registry-app-admin-group
   registry-app-editor-group
   registry-app-viewer-group
   service-admin-group
   sre-admin-group
   sre-group

Other group privileges than what was described in previous sections may be required for user to obtain full capabilities of Edge Manageability Framework management,
refer to Edge Manageability Framework documentation to obtain full understanding of the Identity and Access Management.
