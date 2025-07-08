.. _shared_secure_boot_opt_in:

Secure Boot opt in feature
==========================

The Secure Boot (SB) and Full Disk Encryption (FDE) are disabled by default.
If the user wants to configure Secure Boot/FDE (opt-in), user can select SB and FDE during pre-registration or provisioning.

Enable and Disable Secure Boot/FDE (opt-in) in |software_prod_name|
-------------------------------------------------------------------

**Host Registration or Host Provisioning:**

Users can enable or disable Secure Boot and FDE during the registration of Edge Node(s) using the User Interface (UI) or the bulk tool,
following the steps in :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration` section.
Additionally, this configuration can also be performed during host provisioning, with steps detailed in :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`.

- **Secure Boot and Full Disk Encryption Disabled:**

  If the user does not configure Secure Boot and FDE during the host pre-registration or provisioning process, these features will remain disabled.
  Ensure that Secure Boot settings are disabled in the BIOS of the selected edge node.

- **Secure Boot and Full Disk Encryption Enabled:**

  Users can opt to enable Secure Boot and FDE during the host pre-registration or host provisioning process.
  Ensure that Secure Boot settings are enabled in the BIOS of the selected edge node.

  .. note::
     If Secure Boot is enabled, make sure to enroll the certificates into the BIOS following the vendor-specific rules described in the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index` section.

If the host is not registered, the edge node will automatically utilize the fallback onboarding mechanism.
This procedure ensures that the device can still be provisioned even if initial registration steps are missed by user.
For detailed instructions on this process, users can refer to the documentation: :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index` section.

- **Secure Boot and Full Disk Encryption Disabled:**

  By default, Secure Boot and FDE are disabled in the provider configuration.
  Proceed with edge node onboarding after disabling Secure Boot settings in the BIOS of the selected edge node.

- **Secure Boot and Full Disk Encryption Enabled:**

  To enable these features, delete the default provider and recreate it with `osSecurityFeatureEnable` set to true.

Update provider configuration:

.. code-block:: shell

   # echo -e "GET the default provider"
   curl -X GET -H 'Accept: application/json' -H "Authorization: Bearer ${JWT_TOKEN}" \
   --header "Content-Type: application/json" https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers

.. code-block:: shell

   # echo -e "Delete the default provider".  `provider-cc732326` is fetched from above GET default provider
   curl -X DELETE -H 'Accept: application/json' -H "Authorization: Bearer ${JWT_TOKEN}" \
   --header  "Content-Type: application/json" \
    https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/compute/providers/provider-cc732326

.. code-block:: shell

   # echo -e "Get the new default OS ID"
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
        "config": "{\"defaultOs\":\"os-cfa1fb25\",\"autoProvision\":true,\"osSecurityFeatureEnable\":true}"
    }
   EOF
   )

   # echo -e "Re-Create Provider with the new OS"
   curl -X POST https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/providers \
   -H "accept: application/json" -H "Content-Type: application/json" \
   --data "${body}" \
   -H "Authorization: Bearer ${JWT_TOKEN}"

After this you are ready for onboarding new edge nodes.
