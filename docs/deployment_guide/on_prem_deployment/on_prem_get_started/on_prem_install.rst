Install Edge Orchestrator
===============================================

Download and Install Lenovo\* Open Cloud Automation (LOC-A) (Optional)
----------------------------------------------------------------------

For details on the LOC-A installation process and setup, refer to the
`Lenovo\* ISG Support Plan - LOC-A (Lenovo Open Cloud Automation) <https://support.lenovo.com/us/en/solutions/ht509884-loc-a-lenovo-open-cloud-automation-for-vcf>`_.

This Edge Orchestrator version is compatible with LOC-A version 3.3.x. To get a
valid license, contact your Lenovo representative.

Assuming that all sanity checks have passed and LOC-A installation is complete,
the next step is to install the Edge Infrastructure Manager Plugin* for LOC-A

#. Clone the Edge Infrastructure Manager External GitHub repository and navigate to the `loca-plugin` directory.
#. Modify `configs.yml` according to your environment. Ensure `locaUrl` points to the  LOC-A instance you are setting up.
#. Find the `plugin-tool` binary in the package provided by Lenovo under the obtained license and copy it in the current directory.
#. Locate the `decrypt.py` script in the Lenovo package and move it to the `edge-node/filter_plugins` directory.
#. Create a virtual environment and install the required dependencies.

   .. note:: Ensure you have Python 3.x installed before proceeding.

   .. code-block:: shell

      make venv_locaplugin

#. Activate the virtual environment created in the previous step to ensure that all dependencies are correctly isolated and available for the plugin build process.

   .. code-block:: shell

      source venv_locaplugin/bin/activate

#. Run `create-loca-plugin.sh` script that is present in the repository.
#. When asked to encrypt the LOC-A plugin, type in `yes` and provide a password for decryption.
#. Provide the password to access the LOC-A machine.
#. Exit the virtual environment by running the `deactivate` command.

Now you are ready to bootstrap the information to integrate Edge Orchestrator with LOC-A:

1. Save and encode using the base64 machine-to-machine (M2M) credentials
   generated for the administrative access of LOC-A REST APIs. These are the same to access LOC-A UI.

#. Get the LOC-A Certificate Authority (CA) from the deployment using the
   following command:

   .. code-block:: shell

      openssl s_client -connect LOCA_IP:443.

You will need the LOC-A CA as input to the profile `enable-lenovo.yaml`. You must repeat this process for all LOC-A
instances that need to be integrated with the Edge Orchestrator.

Next, you will deploy Edge Orchestrator on the target machine as defined in the pre-requisite steps.

Download the Installation Script
-----------------------------------------------

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
    ORCH_VERSION='v3.0.0'

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

Installation Parameters
---------------------------

Before running the installation script some optional configuration parameters can be provided.

Optional Parameters
+++++++++++++++++++++++++++++++++++

Some configuration parameters the installer uses have default values that you
can set manually. Refer to the following table for more information about each parameter.

.. list-table:: Other Installation Parameters
   :widths: 30 40 30
   :header-rows: 1

   * - Installation Parameter
     - Description
     - Default Value
   * - ``export ORCH_INSTALLER_PROFILE= <profile>``
     - Sets the profile and artifacts to deploy Edge Orchestrator. This parameter allows the default ``onprem`` installation **or** ``onprem-explicit-proxy`` for edge nodes without direct internet access and support for 100 hosts. To scale up to 1000 hosts, use ``onprem-1k``.
     - ``onprem``
   * - ``export SRE_USERNAME=<username>``
     - Sets the ``basic-auth`` user name of the SRE endpoint.
     - ``sre``
   * - ``export SRE_PASSWORD=<password>``
     - Sets the ``basic-auth`` password.
     - ``123``
   * - ``export SRE_DEST_URL=<https://sre-endpoint:port/location>``
     - Sets the SRE endpoint URL.
     - ``http://sre-exporter-destination:``
       ``8428/api/v1/write``
   * - ``export CLUSTER_DOMAIN=<cluster_domain>``
     - Sets the cluster domain name for Edge Orchestrator services, which defines
       the base for full service domain names by adding subdomains
       (not to be confused with the Kubernetes\* cluster domain).
     - ``cluster.onprem``
   * - ``export RELEASE_SERVICE_URL=<url>``
     - Sets the URL to the Release Service.
     - ``registry-rs.edgeorchestration.intel.com``
   * - ``export DEPLOY_VERSION=<version>``
     - Sets the version of the artifacts used to deploy Edge Orchestrator.
     - ``v3.0``

Configure SMTP Variables for Notifications
++++++++++++++++++++++++++++++++++++++++++

To enable email notifications for alerts, set the following environmental variables
for the external SMTP server. See
:doc:`/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_alerts`
for more information. If not needed or if the SMTP server is not available, you can
disable the SMTP server authentication when installing Edge Orchestrator.

.. list-table:: Environmental Variables for External SMTP Server
   :widths: 30 40 30
   :header-rows: 1

   * - SMTP Variable
     - Description
     - Default Value
   * - ``export SMTP_ADDRESS= <https://smtp.server.url>``
     - Sets the *endpoint URL* of the SMTP server endpoint.
     - ``smtp.serveraddress.com``
   * - ``export SMTP_PORT=<port-number>``
     - Sets the *default port number* of the exposed SMTP server endpoint.
     - ``587``
   * - ``export SMTP_HEADER=<foo@bar.com>``
     - Sets the *default email header* for notifications
     - ``foo@bar.com``
   * - ``export SMTP_USERNAME=<username>``
     - Sets the *default username* to access the SMTP server endpoint
     - ``uSeR``
   * - ``export SMTP_PASSWORD=<password>``
     - Set the *default password* to access the SMTP server endpoint
     - ``T@123sfD``

Run Installer
-------------

.. note:: Add any optional configuration from previous sections if needed. Or check the following for optional arguments.

.. code-block:: shell

   ./onprem_installer.sh


The script does the following:

- Prompts to configure Argo\* CD tool, Traefik\* application proxy, and NGINX\* web server IP addresses, for details see
  `Installer Prompts and Deployment Configuration <#installer-prompts-and-deployment-configuration>`__

- Prompts to confirm custom configurations to the deployment,for more details see
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

See the following sections for more details about the installation process and prompts.


Installer Prompts and Deployment Configuration
--------------------------------------------------

The installer script prompts for configuration input during installation.

#. The installer prompts you to enter the IP addresses used by the
   Load Balancer for Argo CD UI, Traefik application proxy, and NGINX web server as follows.
   There are strict requirements on these IP addresses:
   - All three IP addresses must be in the same subnet (for example, `10.0.0.1/24`) of the
     Edge Orchestrator Node.
   - IP addresses must be unique - you cannot use the same IP address for all three endpoints.
     The installation will fail, if any IP address is duplicated.
   - These are "Virtual IPs" - they don't need to be assigned to any hardware network interface,
     but they should be reserved within the local subnet. Make sure your DHCP server doesn't assign conflicting IP addresses.

   See `Edge Orchestrator Network Topology <./on_prem_prereq.html#edge-orchestrator-network-topology>`__ for more details about possible network configurations.

   For an example of the topology.

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
   Internet, update the proxy configuration in the
   ``[path_to_untarred_repo]/orch-configs/profiles/proxy-none.yaml``
   file, then rename the file to
   ``[path_to_untarred_repo]/orch-configs/profiles/proxy.yaml``. If no proxy is required for a specific protocol, leave the field empty:

   .. code-block:: shell

      argo:
        proxy:
          httpProxy: [HTTP proxy URL]
          httpsProxy: [HTTPS proxy URL]
          noProxy: [Comma separated list of hosts and domains for which proxy settings should be bypassed]
          enHttpProxy: [HTTP proxy URL for the Edge Node]
          enHttpsProxy: [HTTPS proxy URL for the Edge Node]
          enFtpProxy: [FTP proxy URL for the Edge Node]
          enSocksProxy: [SOCKS proxy URL for the Edge Node]
          enNoProxy: [Comma separated list of hosts and domains for which proxy settings should be bypassed in the Edge Node]
        git:
          gitProxy: [HTTPS proxy URL]

   Then change the proxy profile in the ``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml`` file:

   .. code-block:: shell

       -    - profiles/proxy-none.yaml
       +    - profiles/proxy.yaml

#. By default, Edge Orchestrator automatically points to
   the latest-available version of the Edge Microvisor Toolkit system
   for an OS update of an edge-node deployed with immutable OS.
   To manually choose the version for updates, enable the manual mode for the Edge Infrastructure Manager's OS Resource Manager in relevant profile file.

   * To enable manual mode for OS Resource Manager in the ``[path_to_untarred_repo]/orch-configs/profiles/enable-osrm-manual-mode.yaml`` file:

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

#. You can configure custom Traefik Rate Limit. See :doc:`/shared/shared_traefik_rate_limit`.

   Configure the Traefik\* rate limit in ``[path_to_untarred_repo]/orch-configs/profiles/default-traefik-rate-limit.yaml``
   and add the profile in the ``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml`` file:

   .. code-block:: shell

       +    - profiles/default-traefik-rate-limit.yaml


Disable SRE (Optional)
++++++++++++++++++++++

It is possible to configure or fully disable SRE during the next step by doing the following:

#. To enable or disable the SRE Exporter service, include or exclude
   ``[path_to_untarred_repo]/orch-configs/profiles/enable-sre.yaml``
   in the *cluster definition* YAML file under ``root.clusterValues``.

#. Optionally, the default values for SRE can be overriden in the *cluster definition* YAML file under ``.argo.o11y.sre``.

See :doc:`/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_sre`
for more information.

Enable TLS for SRE Exporter endpoint (Optional)
++++++++++++++++++++++++++++++++++++++++++++++++++++++

To enable Transport Layer Security (TLS) authentication between an SRE
exporter and SRE endpoint, use the ``-s`` flag:

.. code-block:: shell

   ./onprem_installer.sh -s

.. note::
   The ``-s`` flag is optional. If omitted, the SRE exporter will deploy with the TLS authentication option turned off.

Optionally, a private TLS CA certificate of the destination SRE server may be provided by passing an absolute
path to the file containing the certificate after ``-s`` flag:

.. code-block:: shell

   ./onprem_installer.sh -s [path_to_SRE_Endpoint_TLS_CA_Cert]

If you want to fully disable SRE functionality, refer to the
`Disable SRE <#disable-sre-optional>`__ section above.


Disable SMTP Server Authentication (Optional)
+++++++++++++++++++++++++++++++++++++++++++++

Use the ``-d`` option to turn off the TLS authentication between the SMTP server and alert monitor:

.. code-block:: shell

   ./onprem_installer.sh -d

Prepare TLS Certificate Secret
------------------------------

See :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_certs`

Obtain the previously prepared TLS certificate bundle and TLS key and create a Kubernetes\* secret file `tls-secret.yaml` using the information from the certificate and key.

Execute the following command to create the Kubernetes secret file `tls-secret.yaml` that contains the TLS certificate
and key if you manually generated the certificate:

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

LOC-A Enablement (Optional)
---------------------------

By default, the LOC-A integration for Edge Orchestrator is not enabled. Update the ``<path_to_untarred_repo>/orch-configs/profiles/enable-lenovo.yaml`` file with the necessary information to enable communication between Edge Orchestrator and LOC-A. If the file does not exist, create it as follows:

.. code-block:: shell

   argo:
      infra-managers:
         onboarding-manager:
            enabled: false
      infra-external:
         # Define resource quotas for LOC-A micro-services
         loca-manager:
            resources:
               limits:
                  cpu: 200m
                  memory: 256Mi
               requests:
                  cpu: 100m
                  memory: 128Mi
         loca-metadata-manager:
            resources:
               limits:
                  cpu: 200m
                  memory: 256Mi
               requests:
                  cpu: 100m
                  memory: 128Mi
         loca-templates-manager:
            resources:
               limits:
                  cpu: 300m
                  memory: 5Gi
               requests:
                  cpu: 100m
                  memory: 128Mi
         loca:
            osPassword: # Default OS password that will be used during provisioning. After provisioning will be done, password authentication on EN will be disabled.
                        # LOC-A has following password restriction:
                        # Contains at least one letter
                        # Contains at least one number
                        # Contain at least 2 of the following:
                        #   a. An upper-case letter
                        #   b. A lower-case letter
                        #   c. A special character($%*.#!@)
                        #   d. Cannot be a repeat or reverse of the corresponding user name
                        #   e. May contain at most 2 consecutive occurrences of the same character. The length of the password should be between 10 and 32 characters.

            providerConfig: # One entry for each LOC-A instance
               - name: # Unique indentifier for the LOC-A instance. Max length is 40 char and
                       # should be validated against the following regex ^[a-zA-Z-_0-9. ]+$
                 username: # encoded64 username to access LOC-A UI (check with your Lenovo representative) - use for example echo -n "username" | base64
                 password: # encoded64 password to access LOC-A UI (check with your Lenovo representative) - use for example echo -n "password" | base64
                 api_endpoint: # LOC-A IP or FQDN: https://<LOC-A IP or FQDN>/api/v1
                 auto_provision: true # deprecated - will not take any effect
                 loca_ca_cert: |
                  -----BEGIN CERTIFICATE-----
                  # LOCA CA cert content
                  -----END CERTIFICATE-----
                 # Use following parameters to configure corresponding fields of Templates that will be created in LOC-A
                 # If not configured, then default value of intel{{#}}.{{ clusterDomain }} will be used instead
                 instance_tpl: # Instance name template for example {{ "intel{{#}}" }} -> intel001.example.com, intel002.example.com,...
                 dns_domain: # DNS domain "example.com"

In cluster definition in the
``[path_to_untarred_repo]/orch-configs/clusters/onprem.yaml``
file, add the following:

.. code-block:: shell

   - profiles/enable-sre.yaml
   +- profiles/enable-lenovo.yaml

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

View Application Deployment
++++++++++++++++++++++++++++++++

To see the deployment progress, run the following:

.. code-block:: shell

   watch kubectl get applications -A

This process can take up to an hour to complete.


DNS Configuration
-----------------

After Edge Orchestrator is deployed successfully, configure the Domain
Name System (DNS) to access the applications in the browser.

When using self-signed certificate:

* To access the applications **only on a specific node**, run the
  ``generate_fqdn`` command on Edge Orchestrator, and copy the output
  to ``/etc/hosts`` on the node.

* To access the applications from **multiple hosts in the network**,
  add the output of the ``generate_fqdn`` command
  to the corresponding DNS configuration file on the DNS server.

When using custom non-self signed certificate:

Find the external IPs allocated to services reachable from outside of the cluster (see EXTERNAL-IP in the output):

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

LOC-A DNS Configuration (Optional)
----------------------------------

Map the IP address defined during the LOC-A setup to the domain name that
needs to be reachable through DNS, and add to DNS record used in the
on-premise environment. The following is an example of the `dnsmasq` config
file:

.. code-block:: shell

   address=/loca.<on.prem.domain.name>/<loca-external-ip>

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

You can also retrieve self-signed certificate from the cluster:

.. code-block:: shell

   kubectl get secret -n orch-gateway tls-orch -o jsonpath='{.data.ca\.crt}' | base64 --decode > orch.crt

Copy the ``orch.crt`` file to your local machine and import it to your system trust store.

Add Exceptions to the Browser Certificate for LOC-A (Optional)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Add exceptions to your browser for the following LOC-A domain,
replacing ``CLUSTER_FQDN`` with domain that you defined during the installation:

* \https://loca.CLUSTER_FQDN

Limit Exposure of Argo CD Endpoint
-----------------------------------------------

Intel recommends restricting the Argo CD UI endpoint to a known subnet
of safe IP addresses.

Edge Orchestrator Restart
-----------------------------------------------

Restarting Edge Orchestrator will seal the HashiCorp Vault\* system.
See :doc:`/shared/shared_on_prem_ts_vault_unseal`
for more information about the HashiCorp Vault used with Edge Orchestrator.
