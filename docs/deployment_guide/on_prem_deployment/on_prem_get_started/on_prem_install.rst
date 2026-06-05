Install Edge Orchestrator
===============================================

.. _download_on_prem_installation_script:

Download the Installation Script
-----------------------------------------------

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
    ORCH_VERSION='v2026.1.0'

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

Configure Installation Environment
-----------------------------------

The installation is controlled by two separate environment files:

* ``pre-orch/pre-orch.env`` — configures the Kubernetes cluster provider, node settings,
  components, and load-balancer IPs
* ``post-orch/post-orch.env`` — configures the Edge Orchestrator deployment: cluster domain,
  registry, profile, proxy, and optional feature flags

Edit both files before running the installation scripts.

Configuration Workflow
+++++++++++++++++++++++

#. Configure ``pre-orch/pre-orch.env`` with Kubernetes and networking settings
#. Run ``pre-orch/pre-orch.sh`` to set up the Kubernetes cluster (also creates
   namespaces and secrets automatically)
#. Configure ``post-orch/post-orch.env`` with deployment and feature settings
#. Run ``post-orch/post-orch-deploy.sh install`` to deploy Edge Orchestrator

pre-orch.env Configuration
+++++++++++++++++++++++++++

The ``pre-orch/pre-orch.env`` file controls the Kubernetes cluster setup phase.

.. list-table:: Kubernetes Provider Settings
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default / Options
   * - ``PROVIDER``
     - Kubernetes distribution to install
     - ``k3s`` *(options:* ``kind``, ``k3s``, ``rke2``*)*
   * - ``K3S_VERSION``
     - K3s version (used when ``PROVIDER=k3s``)
     - ``v1.34.3+k3s1``
   * - ``RKE2_VERSION``
     - RKE2 version (used when ``PROVIDER=rke2``)
     - ``v1.34.4+rke2r1``
   * - ``KIND_VERSION``
     - KinD version (used when ``PROVIDER=kind``)
     - latest
   * - ``MAX_PODS``
     - Maximum pods per Kubernetes node
     - ``500``

.. list-table:: Docker Hub Credentials
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``DOCKER_USERNAME``
     - Docker Hub username (required for K3s/RKE2 registry authentication)
     - (empty)
   * - ``DOCKER_PASSWORD``
     - Docker Hub password or personal access token
     - (empty)

.. list-table:: Pre-Orch Components
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``INSTALL_OPENEBS``
     - Install OpenEBS LocalPV storage provisioner
     - ``true``
   * - ``INSTALL_METALLB``
     - Install MetalLB load-balancer
     - ``true``
   * - ``INSTALL_PRE_CONFIG``
     - Run pre-deployment configuration (namespaces and secrets)
     - ``true``
   * - ``LOCALPV_VERSION``
     - OpenEBS LocalPV Helm chart version
     - ``4.3.0``

.. list-table:: Load Balancer IP Configuration
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``EOM_ORCH_IP``
     - *Single-IP mode* — one IP shared by Traefik (:443) and HAProxy (:9443)
     - (empty)
   * - ``EOM_TRAEFIK_IP``
     - *Multi-IP mode* — dedicated IP for Traefik
     - (empty)
   * - ``EOM_HAPROXY_IP``
     - *Multi-IP mode* — dedicated IP for HAProxy
     - (empty)

.. note::
   Use **single-IP mode** (``EOM_ORCH_IP``) when only one IP address is available.
   Traefik listens on port 443 and HAProxy listens on port 9443 in this mode.
   Use **multi-IP mode** (``EOM_TRAEFIK_IP`` + ``EOM_HAPROXY_IP``) when separate IPs are
   available; both services listen on port 443.

post-orch.env Configuration
++++++++++++++++++++++++++++

The ``post-orch/post-orch.env`` file controls the Helm-based Edge Orchestrator deployment.

.. list-table:: Core Deployment Settings (Required)
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default / Example
   * - ``EOM_HELMFILE_ENV``
     - Deployment profile. See `Deployment Profiles`_.
     - ``onprem-eim``
   * - ``EOM_CLUSTER_DOMAIN``
     - Fully qualified domain name of the cluster
     - ``orch-10-0-0-1.example.com``
   * - ``EOM_REGISTRY``
     - Container and chart registry URL
     - ``registry-rs.edgeorchestration.intel.com``
   * - ``EOM_STORAGE_CLASS``
     - Kubernetes storage class for persistent volumes
     - ``openebs-hostpath``
   * - ``EOM_AMT_PASSWORD``
     - Intel AMT password (required; must meet AMT complexity rules)
     - (empty)

.. list-table:: Load Balancer IPs (same modes as pre-orch.env)
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``EOM_ORCH_IP``
     - Single-IP mode — one IP for Traefik (:443) and HAProxy (:9443)
     - (empty)
   * - ``EOM_TRAEFIK_IP``
     - Multi-IP mode — IP for Traefik
     - (empty)
   * - ``EOM_HAPROXY_IP``
     - Multi-IP mode — IP for HAProxy
     - (empty)

.. list-table:: Proxy Configuration
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``EOM_HTTP_PROXY``
     - HTTP proxy for orchestrator components
     - (empty)
   * - ``EOM_HTTPS_PROXY``
     - HTTPS proxy for orchestrator components
     - (empty)
   * - ``EOM_NO_PROXY``
     - Comma-separated no-proxy list for orchestrator
     - (empty)
   * - ``EOM_EN_HTTP_PROXY``
     - HTTP proxy for edge nodes
     - (empty)
   * - ``EOM_EN_HTTPS_PROXY``
     - HTTPS proxy for edge nodes
     - (empty)
   * - ``EOM_EN_FTP_PROXY``
     - FTP proxy for edge nodes
     - (empty)
   * - ``EOM_EN_SOCKS_PROXY``
     - SOCKS proxy for edge nodes
     - (empty)
   * - ``EOM_EN_NO_PROXY``
     - Comma-separated no-proxy list for edge nodes
     - (empty)

.. list-table:: Feature Flags (Optional, ``true``/``false``)
   :widths: 30 45 25
   :header-rows: 1

   * - Variable
     - Description
     - Default
   * - ``EOM_ENABLE_ISTIO``
     - Enable Istio service mesh (istiod, istio-base, Kiali, and Istio policies)
     - ``false``
   * - ``EOM_ENABLE_KYVERNO``
     - Enable Kyverno policy engine and admission policies
     - ``false``
   * - ``EOM_ENABLE_O11Y``
     - Enable edge-node and orchestrator observability (metrics, logs, dashboards)
     - ``false``
   * - ``EOM_DEFAULT_TENANCY``
     - Auto-create a default organisation, project, and tenant-admin user on first start
     - ``false``
   * - ``EOM_ENABLE_PXE``
     - Enable PXE boot server for edge-node OS provisioning
     - ``false``

Run Installation Scripts
------------------------

The installation is performed in three phases using scripts from the downloaded
repository.

Phase 1: Kubernetes Setup (pre-orch.sh)
++++++++++++++++++++++++++++++++++++++++

The ``pre-orch.sh`` script installs a Kubernetes cluster together with MetalLB and
OpenEBS LocalPV. Once the cluster is healthy, it automatically runs
``pre-orch-config.sh`` (controlled by ``INSTALL_PRE_CONFIG=true`` in ``pre-orch.env``)
to create namespaces and seed Keycloak and PostgreSQL secrets. The Kubernetes
provider (K3s, RKE2, or KinD) is configured in ``pre-orch/pre-orch.env`` or passed
as a CLI argument.

.. code-block:: shell

   cd pre-orch
   ./pre-orch.sh [kind|k3s|rke2] install

**pre-orch.sh options:**

.. code-block:: text

   ./pre-orch.sh [provider] [install|uninstall|upgrade] [options]

   Global options:
     --wait-timeout <seconds>   Timeout for readiness checks (default: 300)
     --wait-interval <seconds>  Polling interval (default: 5)
     --no-openebs               Skip OpenEBS LocalPV install
     --no-metallb               Skip MetalLB install
     --no-pre-config            Skip automatic execution of pre-orch-config.sh

   K3s options:
     --k3s-version <version>    Override K3S_VERSION from pre-orch.env
     --docker-username <user>   Docker Hub username
     --docker-password <pass>   Docker Hub password

   RKE2 options:
     --rke2-version <version>   Override RKE2_VERSION from pre-orch.env
     --docker-username <user>   Docker Hub username
     --docker-password <pass>   Docker Hub password

   KinD options:
     --cluster-name <name>      KinD cluster name (default: kind-cluster)
     --api-port <port>          KinD API server port (default: 6443)

**Examples:**

Use the provider configured in ``pre-orch.env``:

.. code-block:: shell

   ./pre-orch.sh install

Install with K3s explicitly:

.. code-block:: shell

   ./pre-orch.sh k3s install

Install without MetalLB (for a manual load-balancer setup):

.. code-block:: shell

   ./pre-orch.sh k3s install --no-metallb

Install RKE2 with Docker Hub credentials:

.. code-block:: shell

   ./pre-orch.sh rke2 install --docker-username myuser --docker-password mytoken

Phase 2: Helm Deployment (post-orch-deploy.sh)
++++++++++++++++++++++++++++++++++++++++++++++++

The ``post-orch-deploy.sh`` script deploys all Edge Orchestrator components via Helmfile.
The deployment profile and all settings are read from ``post-orch/post-orch.env``.

.. code-block:: shell

   cd post-orch
   ./post-orch-deploy.sh install

**post-orch-deploy.sh actions:**

.. code-block:: text

   ./post-orch-deploy.sh <action> [chart-name]

   Actions:
     install              Install all charts for the active profile
     install <chart>      Install a single chart (for example, traefik, vault)
     uninstall            Uninstall all charts
     uninstall <chart>    Uninstall a single chart
     upgrade              Upgrade all charts and restore PostgreSQL from backup
     diff                 Preview configuration changes for all charts
     diff <chart>         Preview changes for a single chart
     values               Dump computed Helm values for all charts
     values <chart>       Dump computed Helm values for a single chart
     list                 List all charts and their current status

**Examples:**

Install all charts for the selected profile:

.. code-block:: shell

   ./post-orch-deploy.sh install

Re-install a single chart after a configuration change:

.. code-block:: shell

   ./post-orch-deploy.sh install traefik

Preview configuration changes before applying:

.. code-block:: shell

   ./post-orch-deploy.sh diff

Upgrade all charts and restore PostgreSQL from backup:

.. code-block:: shell

   ./post-orch-deploy.sh upgrade

Uninstall all charts:

.. code-block:: shell

   ./post-orch-deploy.sh uninstall

Override the profile inline without editing ``post-orch.env``:

.. code-block:: shell

   EOM_HELMFILE_ENV=onprem-vpro ./post-orch-deploy.sh install

.. note::
   All configuration is read from ``post-orch/post-orch.env``.
   Shell environment variables set before running the script take precedence over the file.

.. _on_prem_deployment_profiles:

Deployment Profiles
--------------------

The deployment profile controls which components are installed. Set ``EOM_HELMFILE_ENV``
in ``post-orch/post-orch.env`` to select the profile.

.. list-table:: Available Profiles
   :widths: 20 80
   :header-rows: 1

   * - Profile
     - Description
   * - ``onprem-eim``
     - **Edge Infrastructure Manager (default)** — Full deployment including the EIM Web UI,
       edge-node provisioning via HAProxy and PXE boots infrastructure, AMT/Intel vPro management
       (MPS, RPS, DM Manager), Keycloak-based IAM, and multi-tenancy. Use for standard
       on-premises deployments.
   * - ``onprem-vpro``
     - **vPro-only** — Reduced footprint for managing vPro-capable edge nodes via AMT
       out-of-band control. Does not include the Web UI, boots infrastructure, or PXE
       provisioning. Intended for environments where only AMT-based management is needed.

onprem-eim Profile
+++++++++++++++++++

The ``onprem-eim`` profile enables the full EIM feature set:

* Web UI (root, infrastructure, and admin portals)
* HAProxy and PXE boots infrastructure for edge-node OS provisioning
* AMT/Intel vPro support (MPS, RPS, DM Manager) for out-of-band management
* Keycloak-based identity and access management
* Multi-tenancy (tenancy manager, Keycloak tenant controller)
* Full infra-core and infra-managers services

Set in ``post-orch/post-orch.env``:

.. code-block:: shell

   EOM_HELMFILE_ENV=onprem-eim

onprem-vpro Profile
++++++++++++++++++++

The ``onprem-vpro`` profile provides a reduced footprint focused on AMT out-of-band management:

* Enables infra-core and infra-external (MPS, RPS, DM Manager) only
* Disables Web UI, boots infrastructure, and HAProxy
* Sets ``skipOSProvisioning: true`` — does not provision edge-node operating systems

Set in ``post-orch/post-orch.env``:

.. code-block:: shell

   EOM_HELMFILE_ENV=onprem-vpro

.. _on_prem_custom_settings:

Optional Feature Flags
-----------------------

Set the following variables in ``post-orch/post-orch.env`` to enable optional components.
All flags default to ``false`` unless stated otherwise.

Istio Service Mesh
+++++++++++++++++++

Enables the full Istio service mesh stack: istiod, istio-base, Kiali dashboard, and
Kyverno Istio policies.

.. code-block:: shell

   EOM_ENABLE_ISTIO=true

.. note::
   Enabling Istio adds resource overhead and latency. Recommended only for environments that
   require mutual TLS (mTLS) between services or fine-grained traffic management.

Kyverno Policy Engine
++++++++++++++++++++++

Enables the Kyverno admission controller with extra policies and Traefik-specific policies.

.. code-block:: shell

   EOM_ENABLE_KYVERNO=true

Observability (O11y)
+++++++++++++++++++++

Enables orchestrator and edge-node observability: metrics collection, log aggregation,
Grafana dashboards, Prometheus agents, and the observability tenant controller.

.. code-block:: shell

   EOM_ENABLE_O11Y=true

Single Tenancy (Auto-bootstrap)
++++++++++++++++++++++++++++++++

Automatically creates a default organisation, project, and ``tenant-admin`` Keycloak user
on first deployment.

.. code-block:: shell

   EOM_DEFAULT_TENANCY=true

PXE Boot Server
++++++++++++++++

Enables the PXE boot server for edge-node OS provisioning via network boot.
Requires the ``onprem-eim`` profile and a correctly configured network interface.

.. code-block:: shell

   EOM_ENABLE_PXE=true

Prepare TLS Certificate Secret
------------------------------

See :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_certs`

Obtain the previously prepared TLS certificate bundle and TLS key and create a Kubernetes\* secret file `tls-secret.yaml` using the information from the certificate and key.

Execute the following command to create the Kubernetes secret file `tls-secret.yaml` that contains the TLS certificate
and key if you manually generate the certificate:

.. code-block:: shell

   cat <<EOF > tls-secret.yaml
   apiVersion: v1
   data:
      tls.crt: $(cat cert-bundle.crt | base64 -w 0)
      tls.key: $(cat key.key | base64 -w 0)
   kind: Secret
   metadata:
      creationTimestamp: null
      name: tls-orch
      namespace: orch-gateway
   type: kubernetes.io/tls
   EOF

If you instead used Certbot to generate the certificate, replace the
`clusterDomain` value with your domain name and
execute the following command:

.. code-block:: shell

   clusterDomain=[on.prem.domain.name]

   certchain=/etc/letsencrypt/live/${clusterDomain}/fullchain.pem
   privkey=/etc/letsencrypt/live/${clusterDomain}/privkey.pem

   cat <<EOF > tls-secret.yaml
   apiVersion: v1
   data:
   tls.crt: $(sudo cat ${certchain} | base64 -w 0)
   tls.key: $(sudo cat ${privkey} | base64 -w 0)
   kind: Secret
   metadata:
   creationTimestamp: null
   name: tls-orch
   namespace: orch-gateway
   type: kubernetes.io/tls
   EOF

.. _on_prem_start_deployment:

Start the Deployment Process
+++++++++++++++++++++++++++++

#. If using a custom non-self-signed certificate, apply the previously prepared TLS secret
   before starting the deployment:

   .. code-block:: shell

      kubectl apply -f tls-secret.yaml

#. Run the Helm deployment:

   .. code-block:: shell

      cd post-orch
      ./post-orch-deploy.sh install

This process can take up to an hour to complete.

.. _on_prem_view_argocd:

Watch Deployment Progress
--------------------------

Use ``watch-deploy.sh`` in the ``post-orch`` directory to monitor Helm release status
during and after deployment.

Info mode (release status summary):

.. code-block:: shell

   cd post-orch
   ./watch-deploy.sh

Debug mode (includes pod and job details per release):

.. code-block:: shell

   ./watch-deploy.sh --debug

Alternatively, list all release statuses using the deploy script:

.. code-block:: shell

   ./post-orch-deploy.sh list

Or check all releases across namespaces with Helm directly:

.. code-block:: shell

   helm list -A

This process can take up to an hour to complete.

.. _on_prem_dns_configuration:

DNS Configuration
-----------------

After Edge Orchestrator is deployed successfully, configure the Domain
Name System (DNS) to access the applications in the browser.

When using self-signed certificate:

* To access the applications only on a specific node, run the
  ``generate_fqdn`` command on Edge Orchestrator, and configure the output
  in the local DNS resolver settings of that node.

* To access the applications from **multiple hosts in the network**,
  add the output of the ``generate_fqdn`` command
  to the corresponding DNS configuration file on the DNS server.

When using custom non-self signed certificate:

Find the external IPs allocated to services reachable from outside of the cluster (see the EXTERNAL-IP in the output):

.. code-block:: shell

   kubectl get services traefik -n orch-gateway
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP
   argocd-server   LoadBalancer   [clusterIP]    [traefik-external-ip]

   kubectl get services ingress-haproxy-controller -n orch-boots
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP
   argocd-server   LoadBalancer   [clusterIP]    [ingress-haproxy-external-ip]

Map the IP addresses obtained above to the domain names that need to be
reachable through DNS, and add to DNS record used in the on-premises environment.

An example of the `dnsmasq` config file:

.. code-block:: shell

   address=/[on.prem.domain.name]/[traefik-external-ip]
   address=/alerting-monitor.[on.prem.domain.name]/[traefik-external-ip]
   address=/api.[on.prem.domain.name]/[traefik-external-ip]
   address=/app-orch.[on.prem.domain.name]/[traefik-external-ip]
   address=/app-service-proxy.[on.prem.domain.name]/[traefik-external-ip]
   address=/attest-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/cluster-orch-edge-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/cluster-orch-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/cluster-orch.[on.prem.domain.name]/[traefik-external-ip]
   address=/connect-gateway.[on.prem.domain.name]/[traefik-external-ip]
   address=/fleet.[on.prem.domain.name]/[traefik-external-ip]
   address=/gitea.[on.prem.domain.name]/[traefik-external-ip]
   address=/infra-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/keycloak.[on.prem.domain.name]/[traefik-external-ip]
   address=/log-query.[on.prem.domain.name]/[traefik-external-ip]
   address=/logs-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/metadata.[on.prem.domain.name]/[traefik-external-ip]
   address=/metrics-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/observability-admin.[on.prem.domain.name]/[traefik-external-ip]
   address=/observability-ui.[on.prem.domain.name]/[traefik-external-ip]
   address=/onboarding-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/onboarding-stream.[on.prem.domain.name]/[traefik-external-ip]
   address=/registry.[on.prem.domain.name]/[traefik-external-ip]
   address=/registry-oci.[on.prem.domain.name]/[traefik-external-ip]
   address=/release.[on.prem.domain.name]/[traefik-external-ip]
   address=/telemetry-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/tinkerbell-server.[on.prem.domain.name]/[traefik-external-ip]
   address=/update-node.[on.prem.domain.name]/[traefik-external-ip]
   address=/vault.[on.prem.domain.name]/[traefik-external-ip]
   address=/vnc.[on.prem.domain.name]/[traefik-external-ip]
   address=/web-ui.[on.prem.domain.name]/[traefik-external-ip]
   address=/ws-app-service-proxy.[on.prem.domain.name]/[traefik-external-ip]
   address=/tinkerbell-haproxy.[on.prem.domain.name]/[ingress-haproxy-external-ip]
   address=/mps.[on.prem.domain.name]/[traefik-external-ip]
   address=/rps.[on.prem.domain.name]/[traefik-external-ip]
   address=/mps-wss.[on.prem.domain.name]/[traefik-external-ip]
   address=/rps-wss.[on.prem.domain.name]/[traefik-external-ip]
   address=/device-manager-node.[on.prem.domain.name]/[traefik-external-ip]

.. _on_prem_cert_exceptions:

Add Exceptions to the Browser or Import Self-Signed Certificate (Optional)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Add exceptions to your browser for the following Edge Orchestrator domains,
replacing ``CLUSTER_FQDN`` with domain that you used during installation when
using self-signed certificates:

* \https://keycloak.CLUSTER_FQDN
* \https://web-ui.CLUSTER_FQDN
* \https://vnc.CLUSTER_FQDN
* \https://CLUSTER_FQDN

You can also retrieve the self-signed certificate from the Kubernetes cluster:

.. code-block:: shell

   kubectl get secret -n orch-gateway tls-orch -o jsonpath='{.data.ca\.crt}' | base64 --decode > orch.crt

Otherwise, use ``opensssl``, if you do not have access to ``kubectl``:

.. code-block:: shell

   openssl s_client -connect web-ui.CLUSTER_FQDN:443
   # Copy Server Certificate from the output and paste to orch.crt file

Copy the ``orch.crt`` file to your local machine and import it to your system trust store.

Edge Orchestrator Restart
-----------------------------------------------

Restarting Edge Orchestrator will seal the HashiCorp Vault\* system.
See :doc:`/shared/shared_on_prem_ts_vault_unseal`
for more information about the HashiCorp Vault used with Edge Orchestrator.
