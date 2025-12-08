Install Edge Orchestrator
===============================================

.. _download_on_prem_installation_script:

Download the Installation Script
-----------------------------------------------

.. note::
   EMF is released on a weekly basis. To use a weekly build, refer to the latest weekly tag available `here <https://github.com/open-edge-platform/edge-manageability-framework/discussions>`_. In the below script, replace v3.1.0 with the appropriate weekly tag. Weekly tags follow the format: v3.1.0-nYYYYMMDD.

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
    ORCH_VERSION='v3.1.0'

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

The installation uses an ``onprem.env`` file for configuration. This file contains all environment variables used by the on-premise installer scripts and must be properly configured before running the installation.

.. important::
   The ``onprem.env`` file is located in the same directory as the installer scripts (downloaded via ``access_script.sh``). You must edit this file and set the required values before proceeding with the installation.
   If you re-run the installer script, ensure the ``onprem.env`` file is correctly configured.
   Runtime arguments will have higher precedence over the environment variables set in ``onprem.env``.

Configuration Workflow
+++++++++++++++++++++++

#. Download the installer scripts using ``access_script.sh`` (see previous section)
#. Locate the ``onprem.env`` file in the downloaded directory
#. Edit ``onprem.env`` with your deployment-specific values
#. Run ``./onprem_installer.sh`` to begin installation

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

Run Installer
-------------

The Edge Orchestrator installation uses a two-phase approach orchestrated by the ``onprem_installer.sh`` wrapper script:

**Phase 1: Pre-Installation** (``onprem_pre_install.sh``)
   - Installs OS-level prerequisites
   - Downloads installation packages from the registry
   - Installs RKE2 Kubernetes cluster
   - Prepares the system for Edge Orchestrator deployment

**Phase 2: Main Installation** (``onprem_orch_install.sh``)
   - Installs ArgoCD for GitOps deployment
   - Sets up Gitea repository with Edge Orchestrator source code
   - Deploys Edge Orchestrator components via ArgoCD
   - Configures networking, load balancers, and services

The ``onprem_installer.sh`` wrapper script runs both phases sequentially and allows you to pass options to each phase separately using the ``--`` separator.

Installation Script Options
++++++++++++++++++++++++++++

The ``onprem_installer.sh`` script supports the following command-line options:

.. note::
   All configuration is read from the ``onprem.env`` file. Ensure this file is properly configured before running the installer.

**Pre-Install Options** (before ``--``):

.. code-block:: shell

   -h, --help          Show help message
   --skip-download     Skip downloading packages (use existing ones)
   -y, --yes           Skip Docker credentials prompt and run non-interactively
   -t, --trace         Enable debug tracing

**Main Install Options** (after ``--``):

.. code-block:: shell

   -h, --help                 Show help message
   -s, --sre [CA_CERT_PATH]   Enable TLS for SRE with optional CA certificate
   -d, --notls                Disable TLS verification for SMTP endpoint
   -y, --yes                  Assume 'yes' to all prompts and run non-interactively
   --disable-co               Disable Cluster Orchestrator profile
   --disable-ao               Disable Application Orchestrator profile
   --disable-o11y             Disable Observability profile
   -st, --single_tenancy      Enable single tenancy mode
   -t, --trace                Enable bash debug tracing

**Examples:**

Basic installation with default settings:

.. code-block:: shell

   ./onprem_installer.sh

Skip package downloads (use existing packages):

.. code-block:: shell

   ./onprem_installer.sh --skip-download

Fully non-interactive installation (skip all prompts in both phases):

.. code-block:: shell

   ./onprem_installer.sh -y -- -y

Enable SRE with TLS using CA certificate:

.. code-block:: shell

   ./onprem_installer.sh -- -s /path/to/ca.crt

Disable observability and application orchestrator profiles:

.. code-block:: shell

   ./onprem_installer.sh -- --disable-o11y --disable-ao

Complete installation with SRE TLS, SMTP no-TLS, and debug tracing:

.. code-block:: shell

   ./onprem_installer.sh -t -- -s /path/to/ca.crt -d -t

Single tenancy mode with tracing:

.. code-block:: shell

   ./onprem_installer.sh -- -st -t

.. note:: 
   - Options before ``--`` control the pre-install phase
   - Options after ``--`` control the main install phase
   - Ensure ``onprem.env`` is properly configured before running

What the Installer Does
+++++++++++++++++++++++++

The installation script performs the following actions:

- Prompts to configure Argo\* CD tool, Traefik\* application proxy, and NGINX\* web server IP addresses, for details see
  `Installer Prompts and Deployment Configuration <#installer-prompts-and-deployment-configuration>`__

- Prompts to confirm custom configurations to the deployment, for details see
  `Installer Prompts and Deployment Configuration <#installer-prompts-and-deployment-configuration>`__

- Downloads installation packages for individual component installations

- Downloads archived Edge Orchestrator's Git\* repositories

- Installs OS-level prerequisites

- Installs RKE2 and related components

- Installs Argo CD tool

- Installs a Gitea\* repository

- Installs Edge Orchestrator

  - Creates and populates the Gitea repositories with downloaded archives

  - Starts Edge Orchestrator via Argo CD tool to populate the Gitea repositories


See the following sections for details about the installation process and prompts.

.. _on_prem_installer_prompts:

Installer Prompts and Deployment Configuration
--------------------------------------------------

The installer script prompts for configuration input during the installation process.

#. The installer prompts you to enter the IP addresses used by the
   Load Balancer for Argo CD UI, Traefik application proxy, and NGINX web server as follows.
   There are strict requirements on these IP addresses:

   - All three IP addresses must be on the same subnet (for example, `10.0.0.1/24`)
     of the Edge Orchestrator node.

   - IP addresses must be unique - you cannot use the same IP address for all three endpoints.
     The installation will fail, if any IP address is duplicated.

   - These are "Virtual IPs" - you do not have to assign these IPs to any hardware network interface,
     but you must reserve these IPs within the local subnet. Ensure your DHCP server does not assign conflicting IP addresses.

   See `Edge Orchestrator Network Topology <./index.html#edge-orchestrator-network-topology>`__ for details about possible network configurations.

   An example of the topology:

   - `Argo IP` is the IP for CI/CD automated deployment tool.

   - `Traefik IP` is the IP for the application API proxy, the entry point to reach the Edge Orchestrator.

   - `Nginx IP` is the IP for southbound specific tools onboarding and provisioning.

   .. code-block:: shell

      Enter Argo IP:
      [xx.xx.xx.xx]
      Enter Traefik IP:
      [yy.yy.yy.yy]
      Enter Nginx IP:
      [zz.zz.zz.zz]

.. _on_prem_custom_settings:

Configure Custom Settings
++++++++++++++++++++++++++++

#. Create any custom configurations for the Edge Orchestrator deployment
   before pushing the source code into the local ``Gitea repository``.
   See `Email notifications <../../cloud_deployment/cloud_advanced/cloud_alerts.html#email-notifications>`__
   to enable email notifications.

#. To change the deployment parameters, edit the following files
   in a separate terminal window.

   .. note:: Do not exit the script.

   * ``[path_to_untarred_repo]/orch-configs/clusters/[profile_name].yaml``
   * ``[path_to_untarred_repo]/orch-configs/profiles/*.yaml``

#. By default, Edge Orchestrator use the base domain name of `cluster.onprem`.
   If you require a custom domain name, edit the cluster
   domain name in the ``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml`` file.

   .. code-block:: shell

      clusterDomain: [customer.cluster.domain]

#. By default, the NTP server (ntpServer) settings uses the public NTP time
   server pool at `pool.ntp.org`. If the customer network requires any other servers, edit the ntpServer settings in the
   ``[path_to_untarred_repo]/orch-configs/profiles/profile-onprem.yaml`` file.

   .. code-block:: shell

      ntpServer: ["time.google.com"]

#. By default, Edge Orchestrator uses a self-signed TLS certificate
   to serve requests. This works for test deployments, however, Intel recommends using a TLS certificate obtained from a trusted CA for product deployments.

   .. note::
      To use a custom TLS certificate, edit the following:

   * Ensure that the cluster domain name matches the Common Name or
     ensure that the DNS names are valid for the custom
     TLS certificate in the ``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml`` file:

     .. code-block:: shell

        clusterDomain: [customer.cluster.domain]

   * Disable the self-signed certificate creation in the ``[path_to_untarred_repo]/orch-configs/profiles/profile-onprem.yaml`` file:

     .. code-block:: shell

        self-signed-cert:
          generateOrchCert: false

#. If Edge Orchestrator or the edge nodes requires a proxy to access the
   Internet, configure the proxy settings in the ``onprem.env`` file before running the installer.
   The installer will automatically apply the proxy configuration. See the 
   `Proxy Configuration <#proxy-configuration>`__ section for details on the available proxy variables.

#. Edge Orchestrator detects the latest compatible versions of the Edge Microvisor Toolkit for update of edge nodes deployed with an immutable OS.
   By default, manual association of the Edge Microvisor Toolkit version with edge nodes is required. Alternatively,
   select custom Edge Microvisor Toolkit version from the Release Service and link it to edge nodes. For more information, see
   :doc:`/user_guide/advanced_functionality/host_update_immutable_os`.

   * To allow Edge Orchestrator to automatically associate the latest available Edge Microvisor Toolkit version with all edge nodes,
     enable automatic mode for the Edge Infrastructure Manager's OS Resource Manager in the relevant profile file.

   * To enable automatic mode, edit the ``[path_to_untarred_repo]/orch-configs/profiles/enable-osrm-manual-mode.yaml`` file and set:

     .. code-block:: shell

        argo:
          infra-managers:
            os-resource-manager-manual-mode: false

#. When deploying Edge Orchestrator with an optional proxy for Edge
   Nodes without direct Internet access,
   set both ``enHttpProxy`` and ``enHttpsProxy`` variables to resolve to the Edge Orchestrator's Traefik\* IP endpoint using port 8080.
   Intel recommends adding an entry for the Traefik endpoint to the DNS server. The following are examples of entries for proxy and ``enNoProxy`` variables:

   .. code-block:: shell

        enHttpProxy: http://<Traefik-IP-endpoint>:8080
        enHttpsProxy: http://< Traefik-IP-endpoint>:8080
        enNoProxy: localhost,127.0.0.1,<Traefik-IP-endpoint-or-subnet-of-Edge-Orchestrator>,.internal,.cluster.local,<domain-of-orchestrator>

#. You can edit the near Zero-Touch Provisioning (nZTP) configuration
   by modifying the values in
   ``[path_to_untarred_repo]/orch-configs/profiles/enable-autoprovision.yaml`` and include in the cluster definition

   .. code-block:: shell

      autoProvision:
         enabled: true # enabled/disabled near Zero Touch Provisioning
         defaultProfile: ubuntu-22.04-lts-generic # OS to be provisioned when autoProvision is enabled

   This configuration applies for every organization and project by default when they are created, but you can edit the nZTP configuration for each project at a later time.
   To learn more about the nZTP feature, see the :doc:`/user_guide/concepts/nztp` section in the *User Guide*.

#. You can configure a custom Traefik rate limit. See :doc:`/shared/shared_traefik_rate_limit`.

   Configure the Traefik rate limit in the ``[path_to_untarred_repo]/orch-configs/profiles/default-traefik-rate-limit.yaml``
   file and add the profile in the ``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml`` file:

   .. code-block:: shell

       +    - profiles/default-traefik-rate-limit.yaml


Disable SRE (Optional)
++++++++++++++++++++++

It is possible to configure or fully disable SRE during the next step by doing the following:

#. To enable or disable the SRE Exporter service, include or exclude
   ``[path_to_untarred_repo]/orch-configs/profiles/enable-sre.yaml``
   in the *cluster definition* YAML file under ``root.clusterValues``.

#. Optionally, the default values for SRE can be overridden in the *cluster definition* YAML file under ``.argo.o11y.sre``.

See :doc:`/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_sre`
for more information.

Enable TLS for SRE Exporter endpoint (Optional)
++++++++++++++++++++++++++++++++++++++++++++++++++++++

To enable Transport Layer Security (TLS) authentication between an SRE
exporter and SRE endpoint, use the ``-s`` flag after the ``--`` separator
to pass options to the main installer:

.. code-block:: shell

   ./onprem_installer.sh -- -s

.. note::
   The ``-s`` flag is optional. If omitted, the SRE exporter will deploy with the TLS authentication option turned off.

Optionally, a private TLS CA certificate of the destination SRE server may be provided by passing an absolute
path to the file containing the certificate after ``-s`` flag:

.. code-block:: shell

   ./onprem_installer.sh -- -s /path/to/SRE_Endpoint_TLS_CA_Cert

If you want to disable SRE functionality fully, see the
`Disable SRE <#disable-sre-optional>`__ section above.


Disable SMTP Server Authentication (Optional)
+++++++++++++++++++++++++++++++++++++++++++++

Use the ``-d`` option after the ``--`` separator to turn off the TLS authentication between the SMTP server and alert monitor:

.. code-block:: shell

   ./onprem_installer.sh -- -d

Non-Interactive Installation
++++++++++++++++++++++++++++++

For automated or CI/CD deployments, you can skip all interactive prompts using the ``-y`` flag.
This flag can be used for both the pre-install and main install phases:

Skip Docker credentials prompt in pre-install:

.. code-block:: shell

   ./onprem_installer.sh -y

Skip all prompts in both phases:

.. code-block:: shell

   ./onprem_installer.sh -y -- -y

.. note::
   When using ``-y`` flag, ensure that the ``onprem.env`` file is properly configured with all required parameters before running the installer.

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

#. Make all changes, or if no changes are needed, type ``yes`` and press
   the **Enter** key to complete the installation.

#. When using a custom non self-signed certificate, apply the previously
   prepared secret containing the TLS certificate:

   .. code-block:: shell

      kubectl apply -f tls-secret.yaml

This process can take up to an hour to complete.

Argo CD Root Application Deployment
-----------------------------------------------

Argo CD tool begins the deployment of the Edge Orchestrator software from the ``edge-manageability-framework`` repository pushed to the ``Gitea repository``.

Sub-applications continue to deploy in the ``syncwave`` order until all the applications are deployed.

.. _on_prem_view_argocd:

View Application Deployment
++++++++++++++++++++++++++++++++

To see the deployment progress, run the following:

.. code-block:: shell

   watch kubectl get applications -A

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

   kubectl get services argocd-server -n argocd
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP
   argocd-server   LoadBalancer   [clusterIP]    [argo-cd-external-ip]

   kubectl get services traefik -n orch-gateway
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP
   argocd-server   LoadBalancer   [clusterIP]    [traefik-external-ip]

   kubectl get services ingress-nginx-controller -n orch-boots
   NAME            TYPE           CLUSTER-IP     EXTERNAL-IP
   argocd-server   LoadBalancer   [clusterIP]    [ingress-nginx-external-ip]

Map the IP addresses obtained above to the domain names that need to be
reachable through DNS, and add to DNS record used in the on-premises environment.

An example of the `dnsmasq` config file:

.. code-block:: shell

   address=/argocd.[on.prem.domain.name]/[argo-cd-external-ip]
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
   address=/tinkerbell-nginx.[on.prem.domain.name]/[ingress-nginx-external-ip]
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
* \https://argocd.CLUSTER_FQDN
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

Limit Exposure of Argo CD Endpoint
-----------------------------------------------

Intel recommends restricting the Argo CD UI endpoint to a known subnet
of safe IP addresses.

Edge Orchestrator Restart
-----------------------------------------------

Restarting Edge Orchestrator will seal the HashiCorp Vault\* system.
See :doc:`/shared/shared_on_prem_ts_vault_unseal`
for more information about the HashiCorp Vault used with Edge Orchestrator.