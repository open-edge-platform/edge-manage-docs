Troubleshooting Vault Server
============================

Edge Orchestrator uses `Hashicorp Vault* <https://developer.hashicorp.com/vault/docs/concepts/seal>`_ to secure and manage secrets.

Check Vault Server Health
--------------------------

Verify pod readiness to test that the Vault server for Edge Orchestrator is in a healthy state. All Vault server instances should be ready, with ``3/3`` pods.

#. Run the code below to verify Vault server health.

   .. code-block:: shell

      $ kubectl -n orch-platform get pods | grep -E 'vault-\d+'

#. Verify the output shows ``3/3`` pods up.

   .. code-block:: shell

      vault-0  3/3  Running   0   23h

Possible Vault Server Failures
------------------------------

Vault Server is Sealed
++++++++++++++++++++++

The Vault server seals automatically after a pod or node restart.

Vault Server is Sealed, But Some Pods are Not Ready
+++++++++++++++++++++++++++++++++++++++++++++++++++

The Vault server is sealed, but the pod shows ``2/3`` readiness.

.. code-block:: shell
   :caption: Example of ``2/3 pods ready``

   $ kubectl -n orch-platform get pods | grep -E 'vault-\d+'
   vault-0  2/3  Running 0 23h

To check the Vault server status, edit the variable ``[vault-0]`` to match the name of the Vault pod.

.. code-block:: shell

   $ kubectl -n orch-platform exec -it [vault-0] -- vault status | grep Sealed
   Sealed false

Unseal Vault Server
++++++++++++++++++++

Edge Orchestrator stores the unseal key in a Kubernetes\* secret.

.. note:: Each Vault server must be unsealed separately.

Unseal a Vault server using the following command. Edit the variable
``[vault-0]`` to match the name of the Vault pod.

.. code-block:: shell

   kubectl -n orch-platform get secret vault-keys -o yaml | yq .data.vault-keys  | base64 -d | jq -r '.keys[]' | xargs -n1 kubectl  -n orch-platform exec -it [vault-0] -- vault operator unseal

Back Up and Restore Vault Keys
------------------------------

Vault seal keys must be backed up outside of the cluster.
If the keys are lost, there is no way to recover the Vault server.

Vault Server is Unrecoverable
------------------------------

If the Vault unseal keys are not recoverable, clear the Vault tables
and recreate them.

Clear Vault Tables
++++++++++++++++++++

Vault server uses two tables: `vault_ha_locks` and `vault_kv_store`.

#. Access the Postgres shell.

   .. code-block:: shell

      ./psql.sh orch-platform vault

#. From the Postgres shell, run the following commands to drop the tables.

   .. code-block:: shell

      orch-platform-vault=> drop table vault_ha_locks, vault_kv_store;
      DROP TABLE

Recreate the Vault Server
+++++++++++++++++++++++++

Run the following command to delete the old keys and ``secrets-config`` job.

.. code-block:: shell

   kubectl -n orch-platform delete secret vault-keys
   kubectl -n orch-platform delete job secrets-config

When the old keys and ``secrets-config`` job are removed, ArgoCD executes
``secrets-config`` which reinitializes the Vault server and stores the new
unseal keys and root token in a Kubernetes secret named ``vault-keys``.
