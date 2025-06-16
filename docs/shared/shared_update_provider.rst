Update the Provisioning Provider Configuration
===============================================

To use new OS profiles that have been added, to change the near Zero Touch Provisioning configuration (`autoProvisioning` setting), or to include default SSH Key,
you must delete the Provisioning Provider Configuration and then recreate a new one by following the steps in this section.

To interact with Edge Orchestrator API, you must authenticate with a user who is part of the `Project ID Host Manager Group <./shared_iam_groups.html#project-id-host-manager-group>`__ and
obtain a JWT (see `Obtaining a JSON Web Token (JWT) <./shared_gs_iam.html#obtaining-a-json-web-token-jwt>`__ for instructions),

Also, ensure to have your project name in hand.

Update Procedures
-----------------

.. code-block:: shell

   CLUSTER_FQDN=<your-orchestrator-domain-name>
   PROJECT_NAME=<your-project-name>

   echo -e "Find Provider"
   PROVIDER_ID=$(curl -X GET "https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers?filter=name%3D%27infra_onboarding%27" \
   -H "accept: application/json" -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${JWT_TOKEN}" | jq -r '.providers[0].resourceId')
   echo -e "ProviderID is ${PROVIDER_ID}"

Save the reply provider as a base to make the changes:

.. code-block:: shell

   echo -e "Delete Provider"
   curl -X DELETE "https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers/${PROVIDER_ID}" \
   -H "accept: application/json" -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

Now you can re-create the modified provider

Enabling near Zero-Touch Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To enable the near zero-touch provisioning:

.. code-block:: shell

   # Save the provider configuration. apiEndpoint and apiCredentials are required but not used
   body=$(cat << 'EOF'
    {
        "providerKind": "PROVIDER_KIND_BAREMETAL",
        "name": "infra_onboarding",
        "apiEndpoint": "xyz123",
        "apiCredentials": [
           "abc123"
        ],
        "config": "{\"defaultOs\":\"os-3a12fb25\",\"autoProvision\":true}"
    }
   EOF
   )

   # echo -e "Re-Create Provider with autoProvision set a false"
   curl -X POST https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers \
   -H "accept: application/json" -H "Content-Type: application/json" \
   --data "${body}" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

.. note:: Once you disable the nZTP - you have to :doc:`/user_guide/set_up_edge_infra/provision_host` to have an OS provisioned on the edge devices

Update the Default OS for Near Zero-Touch Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following are instructions to update the default OS to be used in case of nZTP. First, you need to get a list of OS profiles
created in the project that you are operating on (you can also see the available OSes using :doc:`/user_guide/advanced_functionality/view_os_profiles`):

.. code-block:: shell

   # echo -e "Get the new default OS id"

   curl -X GET https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/compute/os \
   -H "accept: application/json" -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

This will return a JSON list of objects that need to be parsed and from which the new default OS ID is extracted. Given `os-cfa1fb25` as the new OS resource ID:

.. code-block:: shell


   # Save the provider configuration. apiEndpoint and apiCredentials are required but not used.
   # os-cfa1fb25 is the resourceID selected from the previous step.
   body=$(cat << 'EOF'
    {
        "providerKind": "PROVIDER_KIND_BAREMETAL",
        "name": "infra_onboarding",
        "apiEndpoint": "xyz123",
        "apiCredentials": [
           "abc123"
        ],
        "config": "{\"defaultOs\":\"os-cfa1fb25\",\"autoProvision\":true}"
    }
   EOF
   )

   # echo -e "Re-Create Provider with the new OS"
   curl -X POST https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers \
   -H "accept: application/json" -H "Content-Type: application/json" \
   --data "${body}" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

After this you are ready for onboarding new edge nodes.

Add or Update the default SSH key for Near Zero-Touch Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To add or update the default SSH key during Near Zero-Touch Provisioning, first you need to add the SSH Key.
Follow the instructions in the :doc:`./../user_guide/advanced_functionality/configure_ssh_public_keys` section to add the SSH Key.

Once you have added the SSH key, you can run the following command to get the list of SSH key IDs:

.. code-block:: shell

   # echo -e "Get the list of SSH Key id"
   curl -X GET https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/localAccounts?offset=0&pageSize=20 \
   -H "accept: application/json" -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

Select the SSH key ID from the list (E.g.: localaccount-dfb1cb32)and use it in the following command to update the provider configuration:

.. code-block:: shell

   # Save the provider configuration.
   # localaccount-dfb1cb32 is the resourceID selected from the previous step.
   body=$(cat << 'EOF'
    {
        "providerKind": "PROVIDER_KIND_BAREMETAL",
        "name": "infra_onboarding",
        "apiEndpoint": "xyz123",
        "apiCredentials": [
           "abc123"
        ],
        "config": "{\"defaultLocalAccount\":\"localaccount-dfb1cb32\", \"autoProvision\":true}"
    }
   EOF
   )

   # echo -e "Re-Create Provider with the new OS"
   curl -X POST https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers \
   -H "accept: application/json" -H "Content-Type: application/json" \
   --data "${body}" \
   -H "Authorization: Bearer ${JWT_TOKEN}"


Next Steps
----------

See the web UI for more options, and review the documentation.

* Web UI - \https://web-ui.CLUSTER_FQDN
* Documentation - \https://web-ui.CLUSTER_FQDN/docs/
