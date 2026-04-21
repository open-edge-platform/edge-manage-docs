Configure IAM and multi tenancy using CLI (Optional)
====================================================

This document provides a command-line workflow for the common Identity and
Access Management (IAM) and multi-tenancy bootstrap tasks in Edge
Orchestrator.

The current ``orch-cli`` implementation supports the following IAM and tenancy
operations:

* Log in to Edge Orchestrator and cache the Keycloak endpoint information.
* Create, inspect, update, and delete Keycloak users.
* List Keycloak groups.
* Add users to groups and remove users from groups.
* Inspect, assign, and remove user realm roles.
* Create, inspect, list, and delete organizations and projects.

This covers the most common bootstrap flow for local users. Advanced Keycloak
administration such as external identity provider setup, realm customization,
or direct client configuration still requires the Keycloak UI or
`Keycloak's kcadm Admin CLI <https://www.keycloak.org/docs/latest/server_admin/#admin-cli>`_.

The concept of Identity and Access Management within the Edge Manageability Framework is covered in:
:doc:`/shared/shared_gs_iam`
The concept of Multi-tenancy within the Edge Manageability Framework is covered in:
:doc:`/shared/shared_mt_overview`

It is expected that the user gets familiar with the above documentation to
understand the general IAM and tenancy architecture and related concepts.

This guide primarily uses `Edge Manageability Framework's orch-cli
<https://github.com/open-edge-platform/orch-cli>`_.

Prerequisites
-------------

* Basic administrative knowledge of the IAM and your credentials.
* The Edge Orchestrator API endpoint, for example
   ``https://api.<CLUSTER_FQDN>``.
* A user with permissions to manage Keycloak users and the required groups.
   For initial bootstrap this is typically the default ``admin`` user.

Install orch-cli
^^^^^^^^^^^^^^^^

The orch-cli is used for managing users, group membership, organizations, and
projects in this workflow.
For installation and general usage information, see
:doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide`.

Configure orch-cli
^^^^^^^^^^^^^^^^^^

Configure the API endpoint before login.

.. code-block:: bash

    # Change the CLUSTER_FQDN to match your deployment
    CLUSTER_FQDN="sample.cluster.fqdn.com"

    orch-cli config set api-endpoint https://api.$CLUSTER_FQDN

Obtain Admin user password
^^^^^^^^^^^^^^^^^^^^^^^^^^

The default IdP administrator username is ``admin``.

In a terminal with ``kubectl`` access to Edge Manageability Framework, run the following command.

.. code-block:: shell

   kubectl -n orch-platform get secret platform-keycloak -o jsonpath='{.data.admin-password}' | base64 -d && echo

.. warning::
   You must reset the default IdP administrator password on first use to secure the Keycloak IdP.

Login using orch-cli
^^^^^^^^^^^^^^^^^^^^

Log in to Edge Orchestrator using the default ``admin`` user. The login command
derives the Keycloak endpoint from the configured API endpoint.

.. code-block:: bash

   orch-cli login admin
   Enter password:

.. note::

   For the user and group commands, the realm is derived from the configured
   Keycloak endpoint and is typically ``master``. You can override it with
   ``--realm`` if required.

Change the default Admin password
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After the first login, reset the default ``admin`` password.

.. code-block:: bash

   orch-cli set user admin --password
   Enter password:

Command overview
^^^^^^^^^^^^^^^^

The commands used in this guide are:

.. code-block:: bash

   # Users
   orch-cli list users [--realm master]
   orch-cli get user <username> [--groups] [--roles] [--realm master]
   orch-cli create user <username> [--email ... --first-name ... --last-name ...] [--password] [--temporary-password] [--disabled] [--realm master]
   orch-cli set user <username> [--password] [--temporary-password] [--add-group <group>] [--remove-group <group>] [--add-realm-role <role>] [--remove-realm-role <role>] [--realm master]
   orch-cli delete user <username> [--realm master]

   # Groups
   orch-cli list groups [--realm master]

   # Tenancy
   orch-cli create organization <name> [--description ...]
   orch-cli get organization <name>
   orch-cli list organizations
   orch-cli delete organization <name>

   orch-cli create project <name> [--description ...]
   orch-cli get project <name>
   orch-cli list projects
   orch-cli delete project <name>

If ``--password`` is provided without a value, ``orch-cli`` first checks the
``ORCH_PASSWORD`` environment variable and otherwise prompts interactively.

Create a new user
^^^^^^^^^^^^^^^^^

Create a new user for organization and project administration.

.. code-block:: bash

   # Create a new user
   orch-cli create user sample-user \
      --email sample-user@sample-domain.com \
      --first-name Sample \
      --last-name User \
      --password
   Enter password:

   # To list users
   orch-cli list users

   # To include additional user details
   orch-cli list users --verbose

   # To inspect a specific user
   orch-cli get user sample-user

   # To include group membership
   orch-cli get user sample-user --groups

   # To include realm role assignments
   orch-cli get user sample-user --roles

   # To include both groups and realm roles
   orch-cli get user sample-user --groups --roles

Add the user to **org-admin-group**.

.. code-block:: bash

   # List available groups
   orch-cli list groups

   # Add the user to the org admin group
   orch-cli set user sample-user --add-group org-admin-group

   # To list given user's groups
   orch-cli get user sample-user --groups

To remove a user from a group later, use:

.. code-block:: bash

   orch-cli set user sample-user --remove-group org-admin-group

Create an organization
^^^^^^^^^^^^^^^^^^^^^^

Create a new organization using a user that is already in
``org-admin-group``. In this example the currently logged in user is still the
``admin`` user.

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

Grant organization project-management access
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Organization creation dynamically creates an organization-specific
``<org-id>_Project-Manager-Group``. Add users to that group if they must create
projects within the organization.

.. code-block:: bash

   # Derive the organization UUID from the organization resource
   ORG_UUID=$(orch-cli get organization sample-org | grep "UID:" | awk '{print $2}')
   ORG_PM_GROUP="${ORG_UUID}_Project-Manager-Group"

   # Confirm that the group exists
   orch-cli list groups | grep "$ORG_PM_GROUP"

   # Add the sample user to the organization-specific project manager group
   orch-cli set user sample-user --add-group "$ORG_PM_GROUP"

   # Review the user's current groups
   orch-cli get user sample-user --groups

Create a project
^^^^^^^^^^^^^^^^

Log in as the user that belongs to the organization-specific
``Project-Manager-Group`` and create a project.

.. code-block:: bash

   orch-cli login sample-user
   Enter Password:

   # Create project using orch-cli
   orch-cli create project sample-project --description "my sample-project"

   # Wait until the project creation is complete as indicated by the Status message
   orch-cli get project sample-project
   Name:              sample-project
   Description:       my sample-project
   Status:            STATUS_INDICATION_IDLE
   Status message:    Project sample-project CREATE is complete
   UID:               70883f2f-4bbe-4a67-9eea-1a5824dee549

Assign the internal project-membership realm role
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In addition to project groups, Edge Orchestrator uses the internal realm role
``<org-id>_<project-id>_m`` to indicate membership in a specific organization
and project. You can assign this role directly with ``orch-cli``.

Note: The admin account used below must have project manager permissions in
the organization in order to complete the following workflow. See instructions
above on adding project management groups if you have not already done so.

.. code-block:: bash

   # Log back in as admin or another Keycloak admin-capable user
   orch-cli login admin
   Enter Password:

   ORG_UID=$(orch-cli get organization sample-org | grep "UID:" | awk '{print $2}')
   PROJ_UID=$(orch-cli get project sample-project | grep "UID:" | awk '{print $2}')
   PROJECT_MEMBERSHIP_ROLE="${ORG_UID}_${PROJ_UID}_m"

   # Assign the internal project membership realm role
   orch-cli set user sample-user --add-realm-role "$PROJECT_MEMBERSHIP_ROLE"

   # Verify the role assignment
   orch-cli get user sample-user --roles

To remove the role later, use:

.. code-block:: bash

   orch-cli set user sample-user --remove-realm-role "$PROJECT_MEMBERSHIP_ROLE"

Grant project access groups to a user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Project creation also dynamically creates project-specific groups such as
``<project-id>_Edge-Manager-Group`` and ``<project-id>_Host-Manager-Group``.
Add users to the groups that match the tasks they need to perform.

Log back in as ``admin`` or another Keycloak admin-capable user before making
additional user or group membership changes.

.. code-block:: bash

   PROJ_UUID=$(orch-cli get project sample-project | grep "UID:" | awk '{print $2}')
   orch-cli list groups | grep "$PROJ_UUID"

   # Example: grant application and infrastructure management access
   orch-cli set user sample-user --add-group "${PROJ_UUID}_Edge-Manager-Group"
   orch-cli set user sample-user --add-group "${PROJ_UUID}_Host-Manager-Group"

   # Example: allow password-based onboarding into this project
   orch-cli set user sample-user --add-group "${PROJ_UUID}_Edge-Onboarding-Group"

   # To list given user's groups
   orch-cli get user sample-user --groups

.. note::

   Do not add human users to groups with ``M2M`` or ``service-account`` in
   their names. Those groups are used internally by the platform. See
   :doc:`/shared/shared_iam_groups` for group definitions.

Once the project is created configure the orch-cli to use the project by default when querying the Edge Manageability Framework.

.. code-block:: bash

   orch-cli config set project sample-project

Other useful user-management commands
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following examples show other common operations supported by the current
``orch-cli`` implementation.

.. code-block:: bash

   # Review both groups and realm roles for a user
   orch-cli get user sample-user --groups --roles

   # Force a password change on next login
   orch-cli set user sample-user --password --temporary-password

   # Disable a newly created user
   orch-cli create user disabled-user --disabled

   # Delete a user
   orch-cli delete user disabled-user

   # Show group paths as well as IDs
   orch-cli list groups --verbose

Additional group privileges may be required depending on which parts of Edge
Orchestrator a user needs to manage. Refer to
:doc:`/shared/shared_iam_groups` for the complete group and role mapping.
