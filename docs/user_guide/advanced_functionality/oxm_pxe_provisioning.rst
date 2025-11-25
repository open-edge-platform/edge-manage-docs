Provisioning Standalone Edge Nodes at Scale
===========================================

This guide provides step-by-step instructions for customers wishing to provision both the operating system and Kubernetes across multiple edge nodes simultaneously.
This solution is particularly relevant for OEM vendor customers who require efficient and scalable deployment capabilities.
To enable this use case, we utilize the OXM deployment profile within the on-premises Edge Orchestrator.

When operating in OXM profile mode, the Edge Microvisor Framework (EMF) functions as a dedicated provisioning solution stack,
focusing solely on initial system deployment and not enabling any edge node agents for device lifecycle management.
This approach is designed specifically as a scalable provisioning solution,
building upon the `single standalone edge node <https://github.com/open-edge-platform/edge-microvisor-toolkit-standalone-node>`.

Future releases will introduce the capability to add edge nodes to a complete device management EMF stack,
allowing customers to leverage advanced lifecycle management features as their needs evolve.

Refer to the :doc:`OXM deployment profile documentation </deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile>` for background information.

Set up environment
------------------

#. Install Edge Orchestrator CLI (orch-cli) from Intel release service.

:doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide`

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

#. Prepare customized user-apps packages and upload them to the Edge Orchestrator.

   * Download the script and prepare kubernetes artifacts.

     .. code-block:: shell

        curl https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/main/standalone-node/installation_scripts/download_images.sh -o download_images.sh
        chmod +x download_images.sh
        ./download_images.sh NON-RT # or DV

     If you are using EMT image with desktop virtualization features then use `DV` parameter. For default EMT image which is a
     non-Real Time kernel use `NON-RT` parameter.

   * If you want to pre-load any user apps, place all of your artifacts in the user-apps directory as well.
     Then, use the below command to compress all the artifacts and copy them to the Edge Orchestrator's storage. They will be downloaded
     to ``/opt/user-apps`` after EN is provisioned.

     .. note::
        See the document on `pre-loading user apps in the USB installer <https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/main/standalone-node/docs/user-guide/pre-loading-user-apps.md>`_ for more details.

     .. code-block:: shell

        tar -czvf user-apps.tar.gz -C ./user-apps
        kubectl cp -n orch-infra user-apps.tar.gz  $(kubectl -n orch-infra get pods -l app.kubernetes.io/name=dkam --no-headers | awk '{print $1}'):/data

#. Generate custom cloud-init configuration for Standalone Edge Nodes.

   * Download the ``config-file`` template from the Standalone Edge Node repository.

     .. code-block:: shell

        curl https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/main/standalone-node/installation_scripts/config-file -o config-file

   * Fill in the ``config-file`` as per the user guide in the in-line comments.

   * You can customize the custom-config section as per your use case. For example, see
     `reference config for EMT image with Desktop Virtualization features <https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/main/standalone-node/docs/user-guide/desktop-virtualization-image-guide.md>`_

   * Use ``orch-cli`` to generate custom cloud-init configuration based on ``config-file``.

     .. code-block:: shell

        orch-cli generate standalone-config -c config-file -o cloud-init.cfg [--api-endpoint https://api.<CLUSTER-FQDN>]

     .. note:: Ensure you copied user apps as explain in the previous step. Also, ``--api-endpoint`` is mandatory when pre-loading user apps.

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

      orch-cli create host -i hosts.csv --site <site-ID> --cloud-init standalone --os-profile microvisor-standalone  --project local-admin --api-endpoint https://api.cluster.onprem

   .. note::
      All Edge Nodes defined in ``hosts.csv`` will be provisioned with the same cloud-init (``standalone``) and OS profile (``microvisor-standalone``).
      If you need to provision a set of Edge Nodes with different cloud-init or OS profile you can store list of Edge Nodes in a separate CSV file
      and invoke the above command with the new CSV file and modified cloud-init/OS profile.

#. Now, you can start PXE boot from all Edge Node machines. You can observe their provisioning status with the below command:

   .. code-block:: shell

      orch-cli list host --project local-admin --api-endpoint https://api.cluster.onprem

Day-2 Operations: Upgrading Standalone Edge Nodes
-------------------------------------------------

After successfully provisioning your standalone Edge Nodes using the OXM profile, you can perform day-2 operations such as OS upgrades.
The upgrade process for OXM-provisioned Edge Nodes follows similar steps to standard
`standalone Edge Node upgrades <https://github.com/open-edge-platform/edge-microvisor-toolkit-standalone-node>`_,
with the key difference being the use of the OXM mode flag (``-o``).

Prerequisites
-------------

* Edge Nodes must be successfully provisioned and running
* Access to the Edge Node via local console or USB transfer capability
* USB storage device for transferring update files
* Updated OS update script that supports OXM mode

Preparing USB Update Media
--------------------------

#. On a machine with internet access, download the updated OS update script that supports OXM mode:

   .. code-block:: shell

      curl https://raw.githubusercontent.com/open-edge-platform/edge-microvisor-toolkit-standalone-node/refs/heads/main/standalone-node/provisioning_scripts/os-update.sh -o os-update.sh

#. Download the required OS image and checksum files:

   .. code-block:: shell

      # Download the OS image (example URLs)
      wget <IMAGE_URL>/edge-readonly-<VERSION>.<BUILD>-signed.raw.gz
      wget <IMAGE_URL>/edge-readonly-<VERSION>.<BUILD>-signed.raw.gz.sha256

#. Copy all required files to your USB device:

   .. code-block:: shell

      # Mount USB device (adjust device path as needed)
      sudo mount /dev/sdX1 /mnt/usb

      # Copy files to USB
      cp os-update.sh /mnt/usb/
      cp edge-readonly-*.raw.gz /mnt/usb/
      cp *.sha256 /mnt/usb/

      # Unmount USB device
      sudo umount /mnt/usb

Performing OS Updates on Edge Node
----------------------------------

#. Connect the USB device to the target Edge Node and mount it:

   .. code-block:: shell

      # Mount USB device on Edge Node
      sudo mount /dev/sdX1 /mnt/usb

#. Copy the update script and files to the home directory:

   .. code-block:: shell

      cp /mnt/usb/os-update.sh ~/
      cp /mnt/usb/edge-readonly-*.raw.gz ~/
      cp /mnt/usb/*.sha256 ~/
      chmod +x ~/os-update.sh

#. Run the OS update script with the OXM mode flag using local files:

   .. code-block:: shell

      cd ~
      sudo ./os-update.sh -o -i edge-readonly-<VERSION>.<BUILD>-signed.raw.gz -c edge-readonly-<VERSION>.<BUILD>-signed.raw.gz.sha256

   The ``-o`` flag enables OXM mode, which:

   * Uses the correct configuration file location (``/etc/cloud/cloud.cfg.d/99_infra.cfg``) instead of the standard location
   * Skips installer.cfg modifications that are not applicable to OXM-provisioned nodes
   * Maintains compatibility with the OXM deployment profile

#. Monitor the update process and verify successful completion after reboot:

   .. code-block:: shell

      # Check system version after reboot
      cat /etc/image-id
