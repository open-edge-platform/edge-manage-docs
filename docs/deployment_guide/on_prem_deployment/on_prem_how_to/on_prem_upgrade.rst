On-Prem Upgrade Guide
=========================

**Upgrade Path:** EMF On-Prem v3.1.3 → v2025.2.0

**Document Version:** 1.0

Overview
--------

This document provides step-by-step instructions to upgrade
On-Prem Edge Manageability Framework (EMF) from version v3.1.3 to v2025.2.0.

Prerequisites
-------------

System Requirements
~~~~~~~~~~~~~~~~~~~

- Current EMF On-Prem installation version 3.1.3 or later
- Root/sudo privileges on orchestrator node
- PostgreSQL service running and accessible
- Sufficient disk space for backups (~200GB minimum)
- Docker Hub credentials (if pull rate limit is reached)

Pre-Upgrade Checklist
~~~~~~~~~~~~~~~~~~~~~

- [ ] Back up critical application data from edge nodes
- [ ] Document current edge node configurations
- [ ] Ensure network connectivity between orchestrator and edge nodes

Upgrade Procedure
-----------------

Step 1: Download the Latest On-Prem Upgrade Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
   EMF is released on a weekly basis. To use a weekly build, refer to the latest weekly tag available `here <https://github.com/open-edge-platform/edge-manageability-framework/discussions>`_. In the below script, replace v2025.2.0 with the appropriate weekly tag. Weekly tags follow the format: v2025.2.0-nYYYYMMDD.

#. Create the script file on the Edge Orchestrator node using the following command:

  .. code-block:: shell

    cat <<'EOF' > access_script.sh
    #!/usr/bin/env bash

    set -o errexit
    set -o nounset
    set -o pipefail

    REGISTRY_URL='registry-rs.edgeorchestration.intel.com'
    RS_PATH='edge-orch/common/files/on-prem'
    ORAS_VERSION='1.1.0'
    ORCH_VERSION='v2025.2.0'

    # Install oras if not already installed
    if ! command -v oras &> /dev/null; then
       echo "Oras not found. Installing..."
       # Download the specified version of oras
       curl -LO "https://github.com/oras-project/oras/releases/download/v${ORAS_VERSION}/oras_${ORAS_VERSION}_linux_amd64.tar.gz"
       # Create a temporary directory for oras installation
       mkdir -p oras-install/
       # Extract the downloaded tarball into the temporary directory
       tar -zxf oras_${ORAS_VERSION}_*.tar.gz -C oras-install/
       # Move the oras binary to a directory in the system PATH
       sudo mv oras-install/oras /usr/local/bin/
       # Clean up the downloaded files and temporary directory
       rm -rf oras_${ORAS_VERSION}_*.tar.gz oras-install/
    else
       echo "Oras is already installed."
    fi

    # Pull the specified artifact from the registry
    oras pull -v "${REGISTRY_URL}/${RS_PATH}:${ORCH_VERSION}"

    # Make all shell scripts in the current directory executable
    chmod +x *.sh
    EOF

#. Make the script executable.

   .. code-block:: shell

      chmod +x access_script.sh

#. Run the script on the Edge Orchestrator node.

   .. code-block:: shell

      ./access_script.sh

   The script does the following:

   * Installs the ``oras`` tool
   * Downloads the scripts to install and uninstall Edge Orchestrator

Configure Upgrade Environment
------------------------------

The upgrade uses an ``onprem.env`` file for configuration. This file contains all environment variables used by the on-premise upgrade scripts and must be properly configured before running the upgrade.

.. important::
   The ``onprem.env`` file is located in the same directory as the upgrade scripts (downloaded via ``access_script.sh``). You must edit this file and set the required values before proceeding with the upgrade.
   If you re-run the upgrade script, ensure the ``onprem.env`` file is correctly configured.
   Runtime arguments will have higher precedence over the environment variables set in ``onprem.env``.

Configuration Workflow
+++++++++++++++++++++++

#. Download the installer scripts using ``access_script.sh`` (see previous section)
#. Locate the ``onprem.env`` file in the downloaded directory
#. Edit ``onprem.env`` with your deployment-specific values
#. Run ``./onprem_upgrade.sh`` to begin upgrade

The ``onprem.env`` file contains several configuration sections described below.

Core Deployment Configuration
++++++++++++++++++++++++++++++++

.. list-table:: Core Environment Variables (Required)
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``RELEASE_SERVICE_URL``
     - Registry where packages and images are hosted
     - ``registry-rs.edgeorchestration.intel.com``
   * - ``DEPLOY_VERSION``
     - Version of Edge Orchestrator to deploy
     - ``v2025.2.0``
   * - ``ORCH_INSTALLER_PROFILE``
     - Deployment profile for Edge Orchestrator
     - ``onprem``

Authentication & Security
++++++++++++++++++++++++++

.. list-table:: Docker Hub Credentials (Required)
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``DOCKER_USERNAME``
     - Docker Hub username for pulling images
     - (empty)
   * - ``DOCKER_PASSWORD``
     - Docker Hub password or access token
     - (empty)

Network Configuration
++++++++++++++++++++++++

.. list-table:: Network Variables (Required)
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``CLUSTER_DOMAIN``
     - Cluster domain name for internal services
     - ``cluster.onprem``
   * - ``ARGO_IP``
     - MetalLB IP address for ArgoCD
     - (empty)
   * - ``TRAEFIK_IP``
     - MetalLB IP address for Traefik
     - (empty)
   * - ``NGINX_IP``
     - MetalLB IP address for NGINX
     - (empty)

Container Registry Configuration
+++++++++++++++++++++++++++++++++++

.. list-table:: Registry Variables
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``GITEA_IMAGE_REGISTRY``
     - Image registry for Gitea container images
     - ``docker.io``

SRE and SMTP Configuration
++++++++++++++++++++++++++++

.. list-table:: SRE Configuration
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``SRE_USERNAME``
     - Site Reliability Engineering username
     - ``sre``
   * - ``SRE_PASSWORD``
     - SRE password
     - ``123``
   * - ``SRE_DEST_URL``
     - SRE exporter destination URL
     - ``http://sre-exporter-destination.cluster.onprem:8428/api/v1/write``

.. list-table:: SMTP Configuration for Email Notifications
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``SMTP_ADDRESS``
     - SMTP server address
     - ``smtp.serveraddress.com``
   * - ``SMTP_PORT``
     - SMTP server port
     - ``587``
   * - ``SMTP_HEADER``
     - Email sender information
     - ``foo bar <foo@bar.com>``
   * - ``SMTP_USERNAME``
     - SMTP authentication username
     - ``uSeR``
   * - ``SMTP_PASSWORD``
     - SMTP authentication password
     - ``T@123sfD``

Advanced Configuration
+++++++++++++++++++++++

.. list-table:: Advanced Variables
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``KUBECONFIG``
     - Kubernetes configuration file path
     - ``/home/$USER/.kube/config``

OXM Network Configuration
+++++++++++++++++++++++++++

.. list-table:: OXM PXE Server Variables
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``OXM_PXE_SERVER_INT``
     - PXE server interface
     - (empty)
   * - ``OXM_PXE_SERVER_IP``
     - PXE server IP address
     - (empty)
   * - ``OXM_PXE_SERVER_SUBNET``
     - PXE server subnet
     - (empty)

Proxy Configuration
++++++++++++++++++++

.. list-table:: Proxy Variables
   :widths: 30 40 30
   :header-rows: 1

   * - Variable
     - Description
     - Default Value
   * - ``ENABLE_EXPLICIT_PROXY``
     - Enable explicit proxy configuration
     - ``false``
   * - ``ORCH_HTTP_PROXY``
     - HTTP proxy for Orchestrator
     - (empty)
   * - ``ORCH_HTTPS_PROXY``
     - HTTPS proxy for Orchestrator
     - (empty)
   * - ``ORCH_NO_PROXY``
     - No proxy list for Orchestrator
     - (empty)
   * - ``EN_HTTP_PROXY``
     - HTTP proxy for Edge Nodes
     - (empty)
   * - ``EN_HTTPS_PROXY``
     - HTTPS proxy for Edge Nodes
     - (empty)
   * - ``EN_FTP_PROXY``
     - FTP proxy for Edge Nodes
     - (empty)
   * - ``EN_SOCKS_PROXY``
     - SOCKS proxy for Edge Nodes
     - (empty)
   * - ``EN_NO_PROXY``
     - No proxy list for Edge Nodes
     - (empty)

Step 2: Open Two Terminals
~~~~~~~~~~~~~~~~~~~~~~~~~~

You will need two terminals for this upgrade process:

- **Terminal 1:** To run the upgrade script
- **Terminal 2:** To update proxy and load balancer configurations, if needed

Step 3: Terminal 1 - Set Environment Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In **Terminal 1**, set all required environment variables. You can either:

**Option A: Update onprem.env file directly**

Edit the onprem.env file with all required values:

.. code-block:: bash

   nano onprem.env

Update the following sections:

- **CORE DEPLOYMENT CONFIGURATION:**
  - RELEASE_SERVICE_URL
  - DEPLOY_VERSION
  - ORCH_INSTALLER_PROFILE

- **AUTHENTICATION & SECURITY:**
  - DOCKER_USERNAME
  - DOCKER_PASSWORD

- **NETWORK CONFIGURATION:**
  - CLUSTER_DOMAIN
  - ARGO_IP, TRAEFIK_IP, NGINX_IP

- **CONTAINER REGISTRY:**
  - GITEA_IMAGE_REGISTRY

- **PROXY CONFIGURATION (if applicable):**
  - ENABLE_EXPLICIT_PROXY
  - ORCH_HTTP_PROXY, ORCH_HTTPS_PROXY, ORCH_NO_PROXY
  - EN_HTTP_PROXY, EN_HTTPS_PROXY, EN_FTP_PROXY, EN_SOCKS_PROXY, EN_NO_PROXY
  - GIT_PROXY

- **SRE and SMTP Configuration:**
  - All SRE_* variables (SRE_USERNAME, SRE_PASSWORD, SRE_DEST_URL)
  - All SMTP_* variables (SMTP_ADDRESS, SMTP_PORT, SMTP_HEADER, SMTP_USERNAME, SMTP_PASSWORD)

**Important:** Ensure ALL variables in onprem.env are correctly set according to your environment. Some default values are provided, but you must update them to match your deployment:

.. code-block:: bash

   # Get Load Balancer IPs
   kubectl get svc argocd-server -n argocd
   kubectl get svc traefik -n orch-gateway
   kubectl get svc ingress-nginx-controller -n orch-boots

   # Set deployment version (replace with your actual upgrade version tag)
   export DEPLOY_VERSION=v2025.2.0

   # Set non-interactive mode to true to skip prompts
   export PROCEED=true

Step 4: Terminal 1 - Run On-Prem Upgrade Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In **Terminal 1**, execute the upgrade script:

.. code-block:: bash

   ./onprem_upgrade.sh

The script will:

- Validate current installation
- Check PostgreSQL status
- Download packages and artifacts
- Prompt for confirmation:

.. code-block:: bash

   Ready to proceed with installation? (yes/no)

**DO NOT enter "yes" yet - proceed to Step 5 first**

Step 5: Terminal 2 - Update Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before confirming in Terminal 1, open **Terminal 2** and update configurations:

1. **Verify proxy configuration (if applicable):**

   .. code-block:: yaml

      # File: repo_archives/tmp/edge-manageability-framework/orch-configs/clusters/onprem.yaml

      argo:
        proxy:
          httpProxy: ""
          httpsProxy: ""
          noProxy: ""
          enHttpProxy: ""
          enHttpsProxy: ""
          enFtpProxy: ""
          enSocksProxy: ""
          enNoProxy: ""

   .. note::
      Update the proxy settings according to your network configuration, if needed.

2. **Verify load balancer IP configuration:**

   .. code-block:: bash

      # Check current LoadBalancer IPs
      kubectl get svc argocd-server -n argocd
      kubectl get svc traefik -n orch-gateway
      kubectl get svc ingress-nginx-controller -n orch-boots

      # Verify LB IP configurations are updated
      nano repo_archives/tmp/edge-manageability-framework/orch-configs/clusters/onprem.yaml

3. **Ensure all configurations are correct.**

Step 6: Terminal 1 - Confirm and Continue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

if Interactive mode is enabled, wait for user confirmation.
Once proxy and load balancer configurations are updated in Terminal 2, switch back to **Terminal 1** and enter:

.. code-block:: bash

   yes

The upgrade will then proceed automatically through all components.

Step 7: Monitor Upgrade Progress
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The upgrade process includes:

- Upgrade RKE2 to 1.34.1 versions
- OS Configuration upgrade
- Gitea upgrade
- ArgoCD upgrade
- Edge Orchestrator upgrade
- PostgreSQL Migrate
- Unseal Vault

Post-Upgrade Verification
-------------------------

Check the console output from the script.
The **last line** should read:

``Upgrade completed! Wait for ArgoCD applications to be in 'Synced' and 'Healthy' state``

System Health Check
~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   # Verify package versions
   dpkg -l | grep onprem-

   # Check cluster status
   kubectl get nodes
   kubectl get pods -A

   # Verify ArgoCD applications
   kubectl get applications -A

Service Validation
~~~~~~~~~~~~~~~~~~

- - Watch ArgoCD applications until they are in `Synced`` and ``Healthy`` state.

Web UI Access Verification
~~~~~~~~~~~~~~~~~~~~~~~~~~

After successful EMF upgrade, verify you can access the web UI with the same project/user/credentials used in before upgrade.

ArgoCD
~~~~~~

- **Username:** `admin`
- **Retrieve argocd password:**

  .. code-block:: bash

     kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

Gitea
~~~~~

- **Retrieve Gitea username:**

  .. code-block:: bash

     kubectl get secret gitea-cred -n gitea -o jsonpath="{.data.username}" | base64 -d

- **Reset Gitea password**

  .. code-block:: bash

     # Get Gitea pod name
     GITEA_POD=$(kubectl get pods -n gitea -l app=gitea -o jsonpath='{.items[0].metadata.name}')

     # Reset password (replace 'test12345' with your desired password)
     kubectl exec -n gitea $GITEA_POD -- \
       bash -c 'export GITEAPASSWORD=test12345 && gitea admin user change-password --username gitea_admin --password $GITEAPASSWORD'

- **Login to Gitea web UI:**

  .. code-block:: bash

     kubectl -n gitea port-forward svc/gitea-http 3000:443 --address 0.0.0.0
     # Then open https://localhost:3000 in your browser and use the above credentials.

Workarounds
===========

Workaround 1: Root-App Sync and Certificate Refresh After Upgrade
--------------------------------------------------------------------

- Some applications  show as **OutOfSync**, **Degraded**, or missing
- After running ``onprem_upgrade.sh``:
  - **Wait 5–10 minutes** for ``root-app`` and dependent applications to sync
- Run the resync script::
      ./after_upgrade_restart.sh
  - This script continuously syncs applications
  - Performs **root-app sync**
  - Restarts **tls-boots** and **dkam** pods

- If applications still fail to sync:
  - Log in to ArgoCD UI
  - Delete error-state CRDs/jobs
  - Re-sync ``root-app`` and restart the ./after_upgrade_restart.sh script 

- After running ./after_upgrade_restart.sh successfully and once all root-apps are in sync and in a healthy state, wait approximately **5 minutes** to allow DKAM to fetch all dependent applications.  
  Verify that the signed_ipxe.efi image is downloaded using the freshly downloaded Full_server.crt, or monitor until signed_ipxe.efi is available.
- Download the latest certificates::

      rm -rf Full_server.crt signed_ipxe.efi  # Delete both files before downloading
      export CLUSTER_DOMAIN=cluster.onprem
      wget https://tinkerbell-nginx.$CLUSTER_DOMAIN/tink-stack/keys/Full_server.crt --no-check-certificate --no-proxy -q -O Full_server.crt
      wget --ca-certificate=Full_server.crt https://tinkerbell-nginx.$CLUSTER_DOMAIN/tink-stack/signed_ipxe.efi -q -O signed_ipxe.efi
      
  Once the above steps are successful, the orchestrator (Orch) is ready for onboarding new Edge Nodes (EN).

Workaround 2: Handling Gitea Pod Crashes During Upgrade
-----------------------------------
- Some time onprem_upgrade.sh may fail with::
      Error: UPGRADE FAILED: context deadline exceeded
      dpkg: error processing package onprem-gitea-installer
      E: Sub-process /usr/bin/dpkg returned an error code (1)
- Check Gitea pod status::
      kubectl get pod -n gitea
- Restart dependent pods in order::
      kubectl delete pod gitea-postgresql-0 -n gitea
      kubectl delete pod gitea-78d6db5997-c6969 -n gitea

After gitea pod restart restart onprem_upgrade.sh script 

Workaround 3: Unsupported Workflow
----------------------------------
If an Edge Node (EN) was onboarded before the EMF upgrade but the cluster installation was not completed, running the cluster installation after the upgrade using the latest cluster template will not work.
This fails because the EN still uses old OS profiles and pre-upgrade settings.
What You Need to Do
To continue successfully after the upgrade, choose one of these:
Option 1: De-authorize and Re-Onboard the EN
	• De-authorize the existing EN.
	• Onboard the EN again so it gets the correct post-upgrade templates and configs.
Option 2: Update the OS Profile using day2 upgrade process flow.
	• Update the EN to the latest available OS profile and next install cluster 


