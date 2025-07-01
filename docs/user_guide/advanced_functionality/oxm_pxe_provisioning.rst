Provision Standalone Edge Nodes at scale
========================================

This guide assumes the use of the OXM deployment profile of the on-premises Edge Orchestrator.

Set up environment
------------------

#. Install CLI

   TBD

#. Login to the Edge Orchestrator.

   .. code-block:: shell

      orch-cli login local-admin $ORCH_PASS --keycloak https://keycloak.cluster.onprem/realms/master

#. Create default region and site that will be used for all provisioned Edge Nodes.

   .. code-block:: shell

      orch-cli create region --project local-admin default
      orch-cli create site --project local-admin default

Provision Edge Nodes
--------------------



