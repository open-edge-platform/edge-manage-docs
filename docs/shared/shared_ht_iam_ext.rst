Configure an External IAM with Keycloak\* Solution (Optional)
================================================================

Intel recommends to follow the official Keycloak guide to `Configuring Identity Providers <https://www.keycloak.org/docs/latest/server_admin/index.html#_identity_broker>`_
for your specific identity provider.
Below you will find a step by step example and summary for Azure in particular. `Keycloak Microsoft Guide <https://www.keycloak.org/docs/latest/server_admin/index.html#_microsoft>`_ .

.. note:: This setup is optional and not required for use with Keycloak solution.

Keycloak solution supports using login identities from an external IAM. The
examples used in this section reference Azure* AD, but other IAM providers,
such as AWS, are supported. Refer to the IAM documentation for details on
configuration steps.

Once you have completed these steps, see
:doc:`/shared/shared_ht_iam_groups` to manage group memberships.

Prerequisites
-------------

* Basic administrative knowledge of the IAM and your credentials.
* Tenant endpoint information for the IAM, and any redirect URLs.

Connect an External IAM to Edge Orchestrator
--------------------------------------------

Complete these three steps to use an external IAM.

#. Connect the external IAM to Keycloak solution.
#. Connect Edge Orchestrator Keycloak to the external IAM.
#. Configure the security groups in the external IAM.

   - Make any necessary changes to the application manifest.
#. Configure security groups for Edge Orchestrator.

Connect Azure AD to Keycloak Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Log in to the Azure AD portal.
#. In the search bar, type "App registration" or select the
   **App registrations** icon from the home page.

At this point you can select an existing App registration (recommended) to be used or create a new one:

#. Select **New registration**.
#. Enter a name for the application. For example, ``Edge Orchestrator``.
#. Select the appropriate radio button to connect the IAM. For example, to allow only
   accounts from this directory, choose **Accounts in this organizational directory only**.
#. Click **Register** to complete the registration.

Connect Keycloak IdP to Azure AD
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to the Keycloak solution login page. For example,
   ``https://keycloak.CLUSTER_FQDN``.
#. Select **Administration Console**.
#. Choose **Identity Providers** in the bottom left.
#. Ignore any already existing Identity Providers if `Disabled`.
#. Select **Add Provider** and choose **OpenID Connect v1.0**.
#. Enter an internal alias for the connection.
#. Enter a display name for the connection. This is the name users will see when they log in.
#. Toggle **Use discovery endpoint** on.
#. Enter the Azure AD discovery endpoint for the tenant.
   Keycloak solution queries the endpoint to make the OIDC connection and populates the URLs.

Configure Azure AD Registration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the IAM and Keycloak solution are connected, verify that your application manifest is correct for your settings.

Configure the Settings in the Application Manifest
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
   We recommend having both the IAM and Keycloak pages open to copy values
   between them. The instructions below reference switching between the pages.

#. Navigate to the Azure AD home page and select **App registrations**.
#. Open the app registration created previously.
#. In another browser tab or window, navigate to the Keycloak page.
#. Select **Identity providers** from the left navigation bar and open the
   identity connection created previously.

You can now copy and paste between the Azure AD and Keycloak solution for the next steps.

#. In Azure AD, copy the ``Application (client) ID`` value and paste into the **Client ID** entry in Keycloak solution.
#. Switch to Azure AD and select **Certificates & secrets** from the left navigation bar.
#. In the **Client secrets** tab, click **New client secret**. Add a secret description and change the expiration if needed.
#. Click **Add**.
#. Copy the secret value from Azure AD and paste it into the **Client Secret** entry in Keycloak solution.
#. In Keycloak solution, copy the **Redirect URI** value, and paste it into the **Redirect URI** entry in Azure AD.
#. In Azure AD, click **Configure**.
#. Switch to Keycloak solution and click **Add** to complete the registration.

Verify the app registration manifest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the app registration is complete, verify the manifest has the correct values.

#. Navigate to the Azure AD portal.
#. Under **App Registrations** select the application you used to connect to the Edge Orchestrator's Keycloak solution.
#. Select **Manifest** from the left navigation bar to view the application manifest.
#. Change the lines in the manifest, if necessary, to match the following:

   * ``"groupMembershipClaims": ApplicationGroup,``
   * ``“optionalClaims”: groups``
   * ``"replyUrlsWithType": [Keycloak Redirect URI]``

   The ``ApplicationGroup`` value indicates that the token provided by Azure AD to Keycloak\* solution only contains the security groups associated with the enterprise application.

   The ``optionalClaims`` value adds a group claim to provide membership data from Azure AD to Keycloak solution,
   and shares user group information.

   The ``replyUrlsWithType`` value must include the Keycloak Redirect URI for any Keycloak IdP that connects to this registered application.
   Azure AD generates this URL when the Keycloak IdP connection is complete.

Verify the SSO Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To verify a successful SSO configuration do the following:
#. Logout from Keycloak.
#. Close and re-open your browser app or use an `incognito` window re-open.
#. Navigate again to the Edge Orchestrator's login page.
#. Verify SSO login option is enabled.
#. Login with your SSO account.

If the steps are correct, you can now sign in using Azure based SSO or a local account.
