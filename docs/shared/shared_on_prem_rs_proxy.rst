rs-proxy is not deploying when proxy is set
===========================================

The recommended way to set the proxy on on-prem is by following the approach described in :ref:`set_up_dev_environment`.

However, it has been observed that in some environments behind a proxy, egress communication may be blocked by the `istio-proxy`. As a result, the `rs-proxy` does not get deployed. To resolve this, follow these steps:

#. For simplicity, assume this is a first-time deployment. Run the command below to uninstall the on-prem orchestrator:

    .. code-block:: shell

       ./uninstall_onprem.sh

#. Run the following command to set up the on-prem orchestrator environment:

    .. code-block:: shell

       source .env
       unset PROCEED

#. Start the on-prem orchestrator installer:

    .. code-block:: shell

       ./onprem_installer.sh

#. Wait until the installer asks for permission to proceed with the installation. Do not type `y` yet.

    .. code-block:: shell

       Enter 'yes' to confirm that configuration is done in order to progress with installation
       ('no' will exit the script) !!!

       Ready to proceed with installation? 

#. In a separate terminal window, SSH into the VM running the installer. This document assumes the `onprem` profile is installed. If different, adjust as needed. Open the profile file:

    .. code-block:: shell

       nano repo_archives/tmp/edge-manageability-framework/orch-configs/profiles/profile-onprem.yaml

#. Append the configuration below. Adjust `<proxy_port>` and `<proxy_ip>` according to your environment. Save and close the file.

    .. code-block:: shell

       postCustomTemplateOverwrite:
         rs-proxy:
           podAnnotations:
             reloader.stakater.com/auto: "true"
             sidecar.istio.io/inject: "true"
             traffic.sidecar.istio.io/excludeOutboundPorts: "<proxy_port>"
             traffic.sidecar.istio.io/excludeOutboundIPRanges: <proxy_ip>/32

#. Copy the proxy configuration:

    .. code-block:: shell

       cp proxy_config.yaml repo_archives/tmp/edge-manageability-framework/orch-configs/profiles/proxy-none.yaml

#. Return to the first terminal and type `y` to proceed with the installation.

