Provision Standalone Edge Nodes at scale
========================================

This guide assumes the use of the :doc:`OXM deployment profile of the on-premises Edge Orchestrator </deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile>`.

Set up environment
------------------

#. Install CLI

   TBD

#. Login to the Edge Orchestrator.

   .. code-block:: shell

      orch-cli login local-admin $ORCH_PASSWORD --keycloak https://keycloak.cluster.onprem/realms/master

   * The token will be valid for limited period. To refresh you have to logout and login again:

     .. code-block:: shell

     orch-cli logout local-admin

#. Create default region and site that will be used for all provisioned Edge Nodes.

   .. code-block:: shell

      orch-cli create region --project local-admin default --type region --api-endpoint https://api.cluster.onprem
      # Retrieve region ID
      orch-cli list region --project local-admin default --api-endpoint https://api.cluster.onprem
      orch-cli create site --project local-admin default --region <region-ID> --api-endpoint https://api.cluster.onprem

#. Get and save the default site ID:

   .. code-block:: shell

      orch-cli list site --project local-admin default --api-endpoint https://api.cluster.onprem
      # Copy and save Site resource ID in format site-1234ABCD

Provision Edge Nodes at scale
-----------------------------

Follow the steps below to provision multiple Edge Nodes at once.

#. Generate custom cloud-init configuration for Standalone Edge Nodes.

   * Download the ``config-file`` template from the Standalone Edge Node repository.

     .. code-block:: shell

        curl https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/sn-emt-uOS-integration/standalone-node/installation_scripts/config-file -o config-file

   * Fill in the ``config-file`` as per the user guide in the in-line comments.

   * You can customize the custom-config section as per your use case. For example, see
     `reference cloud-init for EMT image with Desktop Virtualization features <https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/sn-emt-uOS-integration/standalone-node/docs/user-guide/desktop-virtualization-cloud-init.md>`_

   * If you want to pre-load any user apps, create a directory and place all of your artifacts in that directory.
     Then, use the below command to copy user apps to the Edge Orchestrator's storage. They will be downloaded
     to ``/opt/user-apps`` after EN is provisioned.

     .. note::
        See the document on `pre-loading user apps in the USB installer <https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/sn-emt-uOS-integration/standalone-node/docs/user-guide/pre-loading-user-apps.md>`_ for more details.

     .. code-block:: shell

        kubectl cp -n orch-infra ./user-apps/  $(kubectl -n orch-infra get pods -l app.kubernetes.io/name=dkam --no-headers | awk '{print $1}'):/data

   * Use ``orch-cli`` to generate custom cloud-init configuration based on ``config-file``.

     .. code-block:: shell

        orch-cli generate standalone-config -c config-file -o cloud-init.cfg [-u ./user-apps --api-endpoint https://api.<CLUSTER-FQDN>]

#. Create the custom cloud-init configuration object in the Edge Orchestrator.

   .. code-block:: shell

      orch-cli create customconfig standalone cloud-init.cfg --project local-admin --description "Cloud-init config for Standalone Edge Nodes"

#. Generate a CSV file for bulk registration of multiple Edge Nodes.

   .. code-block:: shell

      orch-cli create host -g=hosts.csv

   The generated CSV file (`hosts.csv`) will contain the list of Serial Numbers of Edge Nodes to be provisioned.

#. Fill the CSV file with the list of Serial Numbers. The content of the file should look like:

   .. code-block:: shell

      Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,AMTEnable,CloudInitMeta,K8sClusterTemplate,Error - do not fill
      1234567
      ABCDCYZ
      ZYXABCC

   .. note::
      The CSV file provides a possibility to specify different configurations (e.g., different cloud-init or OS profile)
      per each Edge Node identified by Serial Number. However, in this guide we assume that all Edge Nodes in the CSV list
      will be provisioned with the same configuration.

#. Register all Edge Nodes to the Edge Orchestrator:

   .. code-block:: shell

      orch-cli create host -i hosts.csv --site site-197179ab --cloud-init standalone --os-profile microvisor-standalone  --project local-admin --api-endpoint https://api.cluster.onprem

   .. note::
      All Edge Nodes defined in ``hosts.csv`` will be provisioned with the same cloud-init (``standalone``) and OS profile (``microvisor-standalone``).
      If you need to provision a set of Edge Nodes with different cloud-init or OS profile you can store list of Edge Nodes in a separate CSV file
      and invoke the above command with the new CSV file and modified cloud-init/OS profile.

#. Now, you can start PXE boot from all Edge Node machines. You can observe their provisioning status with the below command:

   .. code-block:: shell

      orch-cli list host --project local-admin --api-endpoint https://api.cluster.onprem
