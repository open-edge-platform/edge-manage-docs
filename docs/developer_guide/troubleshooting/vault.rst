======================
Vault\* System Issues
======================

Here is a list of common Vault\* system issues and tips to resolve them.

Health Check
============

A good way to tell whether Vault is healthy or not is to look at its pod
readiness. All 3 instances should be ready `3/3`.

.. code:: shell

  $ kubectl -n orch-platform get pods | grep -E 'vault-\d+'
  vault-0  3/3  Running  0  23h
  vault-1  3/3  Running  0  23h
  vault-2  3/3  Running  0  23h

Common Failures
===============

Vault is sealed
---------------

Vault will be sealed automatically after pod/node restart. It needs to be
manually unsealed by the operator for security reasons.

Symptom
~~~~~~~

For most of the time, a vault pod showing `2/3` ready indicates that it's
sealed.

.. code:: shell

  $ kubectl -n orch-platform get pods | grep -E 'vault-\d+'
  vault-0  2/3  Running  0  23h
  vault-1  3/3  Running  0  23h
  vault-2  3/3  Running  0  23h

You can further check the vault status to be sure. `$1` should be the name
of the Vault pod, for example, `vault-0`.

.. code:: shell

  $ kubectl -n orch-platform exec -it $1 -- vault status | grep Sealed
  Sealed          false

Recovery method for environment **without auto unseal**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  Each Vault instance needs to be unsealed separately.

Run the following command and supply the unseal key to unseal vault. `$1`
should be the name of the Vault pod, for example, `vault-0`.

.. code:: shell

  $ kubectl -n orch-platform -it $1 -- vault operator unseal

The unseal key must be securely stored during initial deployment.

Recovery method for environment **with auto unseal**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A Vault pod must be unsealed automatically when it is restarted. You can
restart the pod by the following command. `$1` should be the name of the
Vault pod, for example, `vault-0`.

.. code:: shell

  kubectl -n orch-platform delete pod $1

Alternatively, you can take the `recovery_keys` and unseal the instance
using the same method described above.

.. code:: shell

  kubectl -n orch-platform exec -it $1 -- vault operator unseal
  Unseal Key (will be hidden):

The recovery key must be securely stored during initial deployment.

Catastrophic Failures
=====================

Vault is unrecoverable
----------------------

In the event of catastrophic failure such as unable to retrieve unseal keys,
you must wipe out Vault databases and start all over.

.. warning::

  Doing this will result in loss of critical data such as our root PKI, and
  therefore should only be performed in extreme situations where Vault is
  unrecoverable. Consult a Platform team member before you proceed.

Recovery Method
~~~~~~~~~~~~~~~

You first need to access the Postgres shell.

.. code:: shell

  kubectl -n orch-database exec -it postgresql-0 -- psql -U orch-platform-vault_user \
  -d orch-platform-vault

You will be prompted for a password, which can be found in the following
secret.

.. code:: shell

  kubectl -n orch-platform get secret vault-local-postgresql -o yaml | \
  yq .data.PGPASSWORD | base64 -d

There are two tables Vault is using, `vault_ha_locks` and `vault_kv_store`.
Once we are in the Postgres shell, run the following commands to drop tables.

.. code:: shell

  orch-platform-vault=> drop table vault_ha_locks, vault_kv_store;

Run the following command to initialize Vault. Unlike the unseal instruction,
this only needs to be done on one of the Vault instances.

.. code:: shell

  $ kubectl -n orch-platform exec -it vault-0 -- vault operator init \
  -key-shares=1 -key-threshold=1
  (unseal key and root token will be shown here)

Safely store the unseal key and root token in a secure location.

Seal Migration
==============

It is possible to switch between **Shamir** seal (manual unseal) and
**AWS KMS** seal (auto unseal) without the need to reinitialize Vault.

Step 1: Update Vault configuration
----------------------------------

The seal method is configured in Helm value under `.server.ha.config`.

- To use Shamir seal (manual unseal):

  .. code::

    server:
      ha:
        config: |
        ...
        seal "shamir" {
        }
        seal "awskms" {
          disabled = "true"
        }

  Shamir seal is the default and typically it does not require any seal config
  to use it. However, when doing seal migration, it is required to explicitly
  specify `disabled = "true"` in the previous seal method.

- To use AWS KMS seal (auto unseal):

  .. code::

    server:
      ha:
        config: |
        ...
        seal "awskms" {
        }

Note that the `shamir` section must be completely removed instead of using
`disabled = "true"` when using AWS KMS seal.

Step 2: Kill all **standby** instances and let Kubernetes restart them
----------------------------------------------------------------------

.. code:: shell

  kubectl -n orch-platform delete pod <standby1> <standby2> ...

You can confirm whether each instance is active or standby by running:

.. code:: shell

  kubectl -n orch-platform exec -it <vault pod> -- vault status

Look for the **HA Mode** field.

Step 3: Unseal all restarted **standby** instances with migration flag
----------------------------------------------------------------------

.. code:: shell

  kubectl -n orch-platform exec -it <standby1> -- vault operator unseal -migrate
  # supply unseal key
  kubectl -n orch-platform exec -it <standby2> -- vault operator unseal -migrate
  # supply unseal key

Confirm that we are in seal migration mode by running:

.. code:: shell

  kubectl -n orch-platform exec -it <vault pod> -- vault status

Look for the **Seal Migration in Progress** field.

Step 4: Step down the **active** instance
-----------------------------------------

One of the **standby** instances will take over and become **active**
automatically.

.. code:: shell

  kubectl -n orch-platform exec -it <active> -- vault login
  # supply root token
  kubectl -n orch-platform exec -it <active> -- vault operator step-down

Step 5: Finally, restart the **original active** instance
---------------------------------------------------------

.. code:: shell

  kubectl -n orch-platform delete pod <active>

Reference
---------

- `Seal migration <https://developer.hashicorp.com/vault/docs/concepts/seal#seal-migration>`_
