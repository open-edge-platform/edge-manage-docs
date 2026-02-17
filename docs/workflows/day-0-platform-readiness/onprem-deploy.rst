On-Prem Orchestrator Deployment - Quick Start
==============================================

This workflow deploys Edge Orchestrator on-premises using a two-phase installer.

Prerequisites
-------------

- Single Linux host (Ubuntu 22.04+) with 8+ cores, 32GB+ RAM, 100GB+ disk
- Network connectivity to registry-rs.edgeorchestration.intel.com
- Docker Hub credentials (for pulling container images)
- SSH access to the target host

See :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/system_requirements_on_prem_orch` for full requirements.

Step 1 – Download Installation Scripts
--------------------------------------

Create and run the installer download script:

.. code-block:: bash

   cat <<'EOF' > access_script.sh
   #!/usr/bin/env bash
   set -o errexit -o nounset -o pipefail

   REGISTRY_URL='registry-rs.edgeorchestration.intel.com'
   RS_PATH='edge-orch/common/files/on-prem'
   ORAS_VERSION='1.1.0'
   ORCH_VERSION='v2025.2.0'

   if ! command -v oras &> /dev/null; then
      curl -LO "https://github.com/oras-project/oras/releases/download/v${ORAS_VERSION}/oras_${ORAS_VERSION}_linux_amd64.tar.gz"
      mkdir -p oras-install/
      tar -zxf oras_${ORAS_VERSION}_*.tar.gz -C oras-install/
      sudo mv oras-install/oras /usr/local/bin/
      rm -rf oras_${ORAS_VERSION}_*.tar.gz oras-install/
   fi

   oras pull -v "${REGISTRY_URL}/${RS_PATH}:${ORCH_VERSION}"
   chmod +x *.sh
   EOF

   chmod +x access_script.sh
   ./access_script.sh

This downloads:
- ``onprem_installer.sh`` — Main wrapper script
- ``onprem.env`` — Configuration file
- Additional helper scripts

Step 2 – Configure Deployment
-----------------------------

Edit ``onprem.env`` with your environment values:

.. code-block:: bash

   # === CORE DEPLOYMENT CONFIGURATION (Required) ===
   RELEASE_SERVICE_URL=registry-rs.edgeorchestration.intel.com
   DEPLOY_VERSION=<EMF_VERSION>              # e.g., v2026.0.0 or main
   DEPLOY_REPO_BRANCH=<EMF_REPO_BRANCH>      # e.g., main, release/2026.0, or commit SHA
   ORCH_INSTALLER_PROFILE=onprem

   # === AUTHENTICATION & SECURITY (Required) ===
   DOCKER_USERNAME=<DOCKER_HUB_USER>         # Docker Hub username
   DOCKER_PASSWORD=<DOCKER_HUB_TOKEN>        # Docker Hub token or password

   # === NETWORK CONFIGURATION (Required) ===
   CLUSTER_DOMAIN=<CLUSTER_DOMAIN>           # e.g., cluster.onprem
   ARGO_IP=<METALLB_IP_1>                    # MetalLB IP for ArgoCD UI
   TRAEFIK_IP=<METALLB_IP_2>                 # MetalLB IP for Traefik ingress
   NGINX_IP=<METALLB_IP_3>                   # MetalLB IP for NGINX

   # === OPTIONAL: CONTAINER REGISTRY ===
   GITEA_IMAGE_REGISTRY=docker.io            # Registry for Gitea images

   # === OPTIONAL: SRE & MONITORING ===
   SRE_USERNAME=sre
   SRE_PASSWORD=<SRE_PASSWORD>
   SRE_DEST_URL=http://sre-exporter-destination.orch-sre.svc.cluster.local:8428/api/v1/write

   # === OPTIONAL: EMAIL/SMTP NOTIFICATIONS ===
   SMTP_ADDRESS=<SMTP_SERVER>                # e.g., smtp.gmail.com
   SMTP_PORT=587
   SMTP_HEADER=<SENDER_EMAIL>                # e.g., alerts@yourdomain.com
   SMTP_USERNAME=<SMTP_USER>
   SMTP_PASSWORD=<SMTP_PASSWORD>

   # === OPTIONAL: PROXY CONFIGURATION ===
   ENABLE_EXPLICIT_PROXY=false
   ORCH_HTTP_PROXY=<HTTP_PROXY>              # e.g., http://proxy.corp:8080
   ORCH_HTTPS_PROXY=<HTTPS_PROXY>            # e.g., http://proxy.corp:8080
   ORCH_NO_PROXY=localhost,127.0.0.1         # Comma-separated bypass list

**Configuration Parameter Reference:**

- **DEPLOY_REPO_BRANCH**: Git branch, tag, or commit SHA for EMF components. Use:
   - ``main`` for latest development
   - ``release/2026.0`` for specific release branch
   - Commit SHA for pinning exact version
- **MetalLB IPs**: Must be on your network and not already assigned. See
  :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install` for
  complete configuration options and advanced proxy settings.
- **SRE/SMTP**: Optional unless using observability and alerting features (leave blank to skip).

Step 3 – Run Installation
-------------------------

Execute the installer (non-interactive):

.. code-block:: bash

   ./onprem_installer.sh -y -- -y

**Options:**

- ``-y`` — Skip prompts (Phase 1 and Phase 2)
- ``--disable-ao`` — Disable Application Orchestrator (optional)
- ``--disable-co`` — Disable Cluster Orchestrator (optional)
- ``--disable-o11y`` — Disable Observability (optional)

For details on all installer options, see :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install`.

**Installation takes 15-30 minutes.** Monitor progress in the terminal output.

Step 4 – Validate Installation
------------------------------

After installation completes:

.. code-block:: bash

   # Test orchestrator API
   curl -k https://api.<CLUSTER_DOMAIN>:6443/version

   # Configure orch-cli
   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli config set project default

   # Verify connectivity
   orch-cli version
   orch-cli list regions

**Expected:** Version output; empty region list on fresh install is OK.

Replace ``<CLUSTER_DOMAIN>`` with your configured domain.

Post-Deployment: Admin & IAM Configuration
--------------------------------------------

After successful deployment, configure Organizations, Projects, and user roles:

**Next step:** :doc:`admin-iam-config`

For advanced IAM topics (email alerting, LDAP integration), see :doc:`/user_guide/administration/index`.

What's Next
-----------

Proceed to :doc:`../day-1-first-value/host-provisioning` to onboard edge nodes.

See Also
--------

- :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_install` — Deployment guide
- :doc:`/deployment_guide/on_prem_deployment/on_prem_troubleshooting/index` — Troubleshooting guide
- :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/system_requirements_on_prem_orch` — System requirements

