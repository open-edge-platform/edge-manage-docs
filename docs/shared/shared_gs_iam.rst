Configure Identity and Access Management
========================================

Configuring Identity and Access Management (IAM) prepares the
Edge Orchestrator deployment for user authentication and authorization,

The Edge Orchestrator IAM uses `Keycloak\* Solution
<https://www.keycloak.org/docs/latest/server_admin/index.html>`_, an OpenID\*
Connect (OIDC) identity provider as an Identity Provider (IdP).

Other OIDC IAM systems can be connected to the Edge Orchestrator with a Single
Sign-On (SSO), or other federated functions. For example, connect an Azure
Active Directory (AD) or AWS IAM to use identities from that domain. The
process for configuring this is described in :doc:`/shared/shared_ht_iam_ext`.

If the IAM provides group identity features, you can map federated security
groups into IdP groups, and manage mapped groups through it, which can be found in :doc:`/shared/shared_ht_iam_groups`.


Configuring the IdP Admin
-------------------------

The default IdP administrator username is ``admin``.

In a terminal with ``kubectl`` access, run the following command.

.. code-block:: shell

   kubectl -n orch-platform get secret platform-keycloak -o jsonpath='{.data.admin-password}' | base64 -d && echo

.. warning::
   You must reset the default IdP administrator password on first use to secure the Keycloak IdP.

Change the IdP Admin password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
   Alternative guide to managing IdP and user creation via CLI is available at: :doc:`/shared/shared_ht_iam_mt_cli`

1. Navigate to the Keycloak solution IdP login page. For example,
   ``https://keycloak.CLUSTER_FQDN``.

3. Log in using the ``admin`` username and default password.

2. Choose **Administration Console**. You may be redirected to this page by
   default.

4. Next to user account icon at top right, click the ``admin`` username and
   select ``Manage account``.

5. Navigate to the **Account Security** tab and click on ``Signing in``, and in
   the **Basic authentication** section under **My Password** click ``Update``.

6. Enter a new password twice, then click **Submit**.

.. warning::
   Take note of this password. It cannot be recovered without redeploying
   Keycloak solution.

Add the IdP Admin to Groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The IdP Admin by default is limited to only making IdP changes, and would need to be added to other groups to manage Edge Orchestrator functionality.

For example, to manage tenant organizations, you can add IdP Admin to
the Org-Admin-Group.

1. Log in to the Keycloak Administration Console as the ``admin`` user.

2. Select the **Users** tab.

3. Select the ``admin`` user.

4. Select the **Groups** tab.

5. Click **Join Group**.

6. Choose the ``Org-Admin-Group`` checkbox.

7. Click **Join**.

The ``admin`` user is now a member of ``Org-Admin-Group``.

.. note::
   After group membership has changed for a user, the user may need to logout then login again to refresh their access tokens to use functionality granted by the changed group membership.


Configuring Users and Groups in Keycloak IdP
--------------------------------------------

If you do not configure an external IAM, then you can configure the primary user and group management within the Keycloak IdP.

If using an external IAM, place the external IAM groups inside
Keycloak groups - see :doc:`/shared/shared_ht_iam_ext` for instructions.

Creating users
~~~~~~~~~~~~~~

To create a user in the Keycloak IdP, see `Creating Users
<https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-user_server_administration_guide>`_.

You must also set a password for the user, see `Setting a password for
a user
<https://www.keycloak.org/docs/latest/server_admin/index.html#proc-setting-password-user_server_administration_guide>`_.

Setting email for the user is also required to avoid issues with accessing Observability dashboards.
See :ref:`devguide_troubleshoot_o11y_access` for additional details.

Add users to groups
~~~~~~~~~~~~~~~~~~~

You must assign users to groups, so that they can interact with Edge
Orchestrator. See :doc:`./shared_iam_groups` for a list of Edge Orchestrator groups and their
capabilities.

To add users to groups in Keycloak solution, see `Groups
<https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide>`_.

.. note::

  If you add or remove a user from a group, to refresh their set of
  roles and permissions, the user must log out and then log in again
  to obtain these new roles. If using a JSON Web Token (JWT), the user must regenerate the
  token.

Obtaining a JSON Web Token (JWT)
--------------------------------

To interact with many of the Edge Orchestrator APIs through the command line, you must obtain a JWT.

To obtain a JWT, set the first three variables in the following example:

- ``CLUSTER_FQDN`` to the base DNS name of the Edge Orchestrator
- ``USER_NAME`` and ``USER_PASSWORD`` to the credentials of a user (in the
  proper group).

Then run the following commands, which will set the JWT to the ``JWT_TOKEN`` environmental variable:

.. code-block:: shell

  CLUSTER_FQDN=edgeorchestration.example.com
  USER_NAME=username
  USER_PASSWORD=example123

  JWT_TOKEN=$(curl -s --location \
    --request POST "https://keycloak.${CLUSTER_FQDN}/realms/master/protocol/openid-connect/token" \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=password' \
    --data-urlencode 'client_id=system-client' \
    --data-urlencode "username=${USER_NAME}" \
    --data-urlencode "password=${USER_PASSWORD}" \
    --data-urlencode 'scope=openid' | jq -r .access_token)

.. note::

  The user must be in a group with the proper permissions to perform the API request. See :doc:`./shared_iam_groups` for a list of groups and their
  capabilities.
