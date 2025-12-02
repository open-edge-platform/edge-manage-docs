On-Prem Upgrade Guide
=========================

**Upgrade Path:** EMF On-Prem v3.1.3 → v2025.2
**Document Version:** 1.0

Overview
--------

This document provides step-by-step instructions to upgrade
On-Prem Edge Manageability Framework (EMF) from version v3.1.3 to v2025.2 .

Prerequisites
-------------

System Requirements
~~~~~~~~~~~~~~~~~~~

- Current EMF On-Prem installation version 3.1.3 or later
- Root/sudo privileges on orchestrator node
- PostgreSQL service running and accessible
- Sufficient disk space for backups ~200+GB
- docker user credential if any pull limit hit

Pre-Upgrade Checklist
~~~~~~~~~~~~~~~~~~~~~

- [ ] Back up critical application data from edge nodes
- [ ] Document current edge node configurations
- [ ] Ensure network connectivity between orchestrator and edge nodes

Upgrade Procedure
-----------------

Step 1: Copy Latest OnPrem Upgrade Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the orchestrator deployed node, copy the latest upgrade script:

.. code-block:: bash

   cd
   cp edge-manageability-framework/on-prem-installers/onprem/* ~/
   chmod +x onprem_upgrade.sh

Step 2: Open Two Terminals
~~~~~~~~~~~~~~~~~~~~~~~~~~

You will need two terminals for this upgrade process:

- **Terminal 1:** To run the upgrade script
- **Terminal 2:** To update proxy and load balancer configurations , if needed

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
   export DEPLOY_VERSION=v2025.2

Step 4: Terminal 1 - Run OnPrem Upgrade Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In **Terminal 1**, execute the upgrade script:

.. code-block:: bash

   ./onprem_upgrade.sh

The script will:

- Validate current installation
- Check PostgreSQL status
- Download packages and artifacts
- Eventually prompt for confirmation:

.. code-block:: bash

   Ready to proceed with installation? (yes/no)

- **DO NOT enter "yes" yet - proceed to Step 5 first**

Step 5: Terminal 2 - Update Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before confirming in Terminal 1, open **Terminal 2** and update configurations:

1. **Verify proxy configuration (if applicable):**

   .. code-block:: bash

      file:repo_archives/tmp/edge-manageability-framework/orch-configs/clusters/onprem.yaml

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

   Note: Update the proxy settings according to your network configuration.

2. **Verify load balancer IP configuration:**

   .. code-block:: bash

      # Check current LoadBalancer IPs
      kubectl get svc argocd-server -n argocd
      kubectl get svc traefik -n orch-gateway
      kubectl get svc ingress-nginx-controller -n orch-boots

      # Verify LB IP configuration are updated
      nano repo_archives/tmp/edge-manageability-framework/orch-configs/clusters/onprem.yaml

3. **Ensure all configurations are correct**

Step 6: Terminal 1 - Confirm and Continue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Troubleshooting
---------------

**Symptom:** Sometimes the `infra-managers` application in ArgoCD may show as **Not Healthy** or **Out of Sync**. This can impact dependent components or cluster state.

**Resolution Steps:**

1. **Delete the application from ArgoCD: and resync root-app** or using kubectl patch command

.. note::

   If the upgrade takes more than ~20 minutes and the ``root-app`` remains in an ``OutOfSync`` or ``Unhealthy`` state, apply the patch to the applications that are not healthy first, and then patch the ``root-app``.

   **Example:** Sometimes, after an upgrade, the following applications may be in a ``Missing``, ``Unhealthy``, or ``OutOfSync`` state: ``tenancy-api-mapping``, ``tenancy-datamodel``, ``infra-external``, ``infra-managers``.

.. code-block:: bash

   # Patch the affected applications
   kubectl patch application APPLICATION1-NAME -n onprem --patch-file /tmp/argo-cd/sync-patch.yaml --type merge
   kubectl patch application APPLICATION2-NAME -n onprem --patch-file /tmp/argo-cd/sync-patch.yaml --type merge
   kubectl patch application    root-app       -n onprem --patch-file /tmp/argo-cd/sync-patch.yaml --type merge

   # Patch the root-app
   kubectl patch application root-app -n onprem --patch-file /tmp/argo-cd/sync-patch.yaml --type merge

After applying the patch, the ``root-app`` should sync cleanly **once** its dependencies have become healthy.

2. **PXE Boot Certificate Issues**

**Description:** After upgrade, PXE boot or certificate-related issues may occur, preventing edge nodes from onboarding or communicating properly.

**Resolution:**

   Delete the certificate secrets and DKAM pods to force regeneration and propagation of updated certificates:

.. code-block:: bash

   # Delete PXE boot certificate secrets
   kubectl delete secret tls-boots -n orch-boots
   kubectl delete secret boots-ca-cert -n orch-gateway
   kubectl delete secret boots-ca-cert -n orch-infra

   # Delete DKAM pods to force reconnection with new certificates
   kubectl delete pod -n orch-infra -l app.kubernetes.io/name=dkam 2>/dev/null

Open Issues:
------------

**Issue 1: Cluster Deletion Stuck After EMF Upgrade**
**Description:** Cluster deletion hangs indefinitely for clusters that were originally installed on EMF v3.1.3 before upgrading to v2025.2 (ITEP-82277).
**Workaround:** Currently, there is no workaround available.