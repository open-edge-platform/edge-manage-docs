Single Tenancy Deployment
============================================================

This document provides end-to-end guidance on Deploying orchestration with Default Tenancy,
   including how to enable or disable it using composability flags.


----------------------------------------------------
1. Single Tenancy Overview
----------------------------------------------------

During orchestration deployment, the Single Tenancy profile is **disabled by default**.
This profile is controlled through **environment flag** set before starting the orchestration deployment.

.. important::

   The flag must be defined **before** orchestration deployment begins.
   For upgrades, ensure the same flag is used to maintain consistent orchestration state
   and avoid unexpected composability changes.

----------------------------------------------------
2. Configuration Flags
----------------------------------------------------

By default, the profile are enabled (flag unset or set to ``false``).

To enable Single Tenancy, export the below environment variable
**before starting orchestration deployment or upgrade**:

.. code-block:: bash

   export SINGLE_TENANCY=true      # Enable Single Tenancy

.. note::

   This flag must be exported to your environment **prior to both deployment and upgrade**.

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After orchestration deployment or upgrade, you can verify which profiles are enabled or disabled
using the following one-liner command:

.. code-block:: bash

   root_app_ns=$(kubectl get application -A | grep root-app | awk '{print $1}')
   VALUE_FILES=$(kubectl get application root-app -n $root_app_ns -o yaml)
   echo "$VALUE_FILES" | grep -q "enable-singleTenancy.yaml" && echo "✅ Single Tenancy enabled" || echo "⛔ Single Tenancy disabled"

**Example Output:**

.. code-block:: text

   ⛔ Single Tenancy disabled     --> if Single Tenancy disabled
   ✅ Single Tenancy enabled    --> if Single Tenancy enabled

You can also confirm the same from the ArgoCD ``root-app`` application view.
For pre-deployment verification (before cluster creation), review the **orchestration clustername.yaml** file.

----------------------------------------------------
4. Tenant Admin Password Management
----------------------------------------------------

Tenant Admin Password Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Upon enabling Single Tenancy, the Tenant Initializer automatically generates a secure password
for the `tenant-admin` user during the single tenant creation process. The password is generated
with the following characteristics:

- 16 characters in length
- Contains at least one uppercase letter, lowercase letter, digit, and special character
- Uses cryptographically secure random generation
- Characters are shuffled for additional security

Password Storage
~~~~~~~~~~~~~~~~~

The generated password is automatically stored as a Kubernetes secret in the same namespace
where the Tenant Initializer job runs (typically `orch-iam`). The secret is named
`tenant-admin-password` and includes labels for easy identification:

- `app: tenant-init`
- `org: <organization-name>`
- `username: tenant-admin`

Retrieving the Password
~~~~~~~~~~~~~~~~~~~~~~~

To retrieve the tenant-admin password after tenant initialization, use the following command:

  .. code-block:: shell

    kubectl get secret tenant-admin-password -n orch-iam -o jsonpath='{.data.admin-password}' | base64 -d


You can also view the secret details including labels:

  .. code-block:: shell

    kubectl describe secret tenant-admin-password -n orch-iam

.. note::
  The password is base64 encoded in the secret and must be decoded for use.
