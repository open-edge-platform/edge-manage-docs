Configure External IAM Security Groups (Optional)
=================================================

If a connection is made between Keycloak solution and an external IAM, you can manage groups 
in Keycloak solution or in the external IAM.

See `Configuring Users and Groups in Keycloak IdP <configuring-users-and-groups-in-keycloak-idp>`__ for additional information on
configuring users and groups in Keycloak solution.

.. note:: This setup is optional and not required for use with Keycloak solution.

Supported User Groups
---------------------

See `Configuring Users and Groups in Keycloak IdP <configuring-users-and-groups-in-keycloak-idp>`__ for additional information on :doc:`./shared_iam_groups` for a list of Edge Orchestrator groups.

Assign Users to Groups in Microsoft Azure\* AD
----------------------------------------------

To create security groups in Azure AD,
see `Learn about groups and access rights in Microsoft Entra ID <https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups>`_.

Link the Enterprise Application to the Application Registration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to the Azure AD home page.
#. Select Azure Active Directory > Enterprise Applications.
#. Select the enterprise application associated with your app registration,
   which was used to connect Edge Orchestrator's Keycloak solution and your Azure AD provider.
#. In the **Token configuration** section, add a new claim to include group membership
   information.

Assign Users and Groups
~~~~~~~~~~~~~~~~~~~~~~~

#. In the Azure Enterprise Application, open the **Users and groups** section.
#. Add any Azure AD users or groups as necessary.

Map Users and Groups in Keycloak Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to the Keycloak page.
#. Select **Identity providers** from the left navigation bar.
#. Select the identity provider corresponding to the Azure AD provider
#. Go to the **Mappers** tab,
#. Select **Add Mapper** to create a mapper for each Azure AD security group to map
   them to the corresponding Keycloak group.

For more information about mappers in Keycloak solution, see
`Mapping claims and assertions <https://www.keycloak.org/docs/latest/server_admin/#_mappers>`_.
Azure AD can now populate the new users and groups in Keycloak solution.

Add Users to Groups from an External IAM
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To create groups and assign users to them in your IAM, see the IAM documentation regarding groups.
To integrate another IdP with Keycloak solution,
see `Integrating identity providers <https://www.keycloak.org/docs/latest/server_admin/#_identity_broker>`_.
