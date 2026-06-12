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
2. Configuration
----------------------------------------------------

Single Tenancy is controlled by a variable in ``post-orch/post-orch.env``.
By default it is disabled (``false``).

To enable Single Tenancy, set the following in ``post-orch/post-orch.env``
before running the deployment:

.. code-block:: bash

   # In post-orch/post-orch.env
   EOM_DEFAULT_TENANCY=true

.. note::

   This variable must be set **before** running ``post-orch-deploy.sh install`` or
   ``post-orch-deploy.sh upgrade`` to maintain a consistent deployment state.

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After deployment, verify whether Single Tenancy bootstrap is enabled by checking
the tenancy-manager Helm release values:

.. code-block:: bash

   helm get values tenancy-manager -n orch-platform | grep -A3 bootstrap

**Example output when Single Tenancy is enabled:**

.. code-block:: text

   bootstrap:
     enabled: true
     orgName: default
     projectName: default

Alternatively, confirm the default organization was created:

.. code-block:: bash

   orch-cli list org

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
