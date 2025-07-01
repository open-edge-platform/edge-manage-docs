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

#. Generate custom cloud-init configuration for Standalone Edge Nodes.

   * Download the ``config-file`` template from the Standalone Edge Node repository.

     .. code-block:: shell

        curl https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/sn-emt-uOS-integration/standalone-node/installation_scripts/config-file -o config-file

   * Fill in the ``config-file`` as per the user guide in the in-line comments.

   * Use ``orch-cli`` to generate custom cloud-init configuration based on ``config-file``.

     .. code-block:: shell

        orch-cli generate standalone-config -c config-file -o cloud-init.cfg

#. Create the custon cloud-init configuration object in the Edge Orchestrator.

   .. code-block:: shell

      orch-cli create customconfig standalone-cloud-init cloud-init.cfg --project local-admin --description "Cloud-init config for Standalone Edge Nodes"

