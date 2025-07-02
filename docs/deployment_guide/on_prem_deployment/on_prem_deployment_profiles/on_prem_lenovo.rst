Lenovo Deployment Profile
=========================

The Lenovo Deployment Profile is an On-Premises Edge Orchestrator's profile that deploys
Edge Manageability Framework along with the Lenovo\* Open Cloud Automation (LOC-A) components.

The Lenovo Deployment Profile assumes the network configuration as described in :ref:`on_prem_lenovo_network_topology`.
It also requires additional firewall configuration (if applicable), see :ref:`on_premlenovo_firewall_configuration`.

Prerequisites
-------------

Make sure you familiarize yourself with the following documentation pages:

* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/system_requirements_on_prem_orch`
* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/index`
* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_certs`

Download and Install Lenovo\* Open Cloud Automation (LOC-A)
-----------------------------------------------------------

For details on the LOC-A installation process and setup, see the
`Lenovo\* ISG Support Plan - LOC-A (Lenovo Open Cloud Automation) <https://support.lenovo.com/us/en/solutions/ht509884-loc-a-lenovo-open-cloud-automation-for-vcf>`_.

This Edge Orchestrator version is compatible with LOC-A version 3.3.x. To get a
valid license, contact your Lenovo representative.

Assuming that all sanity checks have passed and LOC-A installation is complete,
the next step is to install the Edge Infrastructure Manager Plugin* for LOC-A

#. Clone the Edge Infrastructure Manager External GitHub repository and navigate to the ``loca-plugin`` directory.
#. Modify ``configs.yml`` according to your environment. Ensure ``locaUrl`` points to the  LOC-A instance you are setting up.
#. Find the ``plugin-tool`` binary in the package provided by Lenovo under the obtained license and copy it in the current directory.
#. Locate the ``decrypt.py`` script in the Lenovo package and move it to the ``edge-node/filter_plugins`` directory.
#. Create a virtual environment and install the required dependencies.

   .. note:: Ensure you have Python 3.x installed before proceeding.

   .. code-block:: shell

      make venv_locaplugin

#. Activate the virtual environment created in the previous step to ensure that all dependencies are correctly isolated and available for the plugin build process.

   .. code-block:: shell

      source venv_locaplugin/bin/activate

#. Run ``create-loca-plugin.sh`` script that is present in the repository.
#. When asked to encrypt the LOC-A plugin, type in ``yes`` and provide a password for decryption.
#. Provide the password to access the LOC-A machine.
#. Exit the virtual environment by running the ``deactivate`` command.

Now you are ready to bootstrap the information to integrate Edge Orchestrator with LOC-A:

1. Save and encode using the base64 machine-to-machine (M2M) credentials
   generated for the administrative access of LOC-A REST APIs. These are the same to access LOC-A UI.

#. Get the LOC-A Certificate Authority (CA) from the deployment using the
   following command:

   .. code-block:: shell

      openssl s_client -connect LOCA_IP:443

You will need the LOC-A CA as input to the profile ``enable-lenovo.yaml``. You must repeat this process for all LOC-A
instances that need to be integrated with the Edge Orchestrator.

Next, you will deploy Edge Orchestrator on the target machine as defined in the pre-requisite steps.

Installation steps
------------------

First, :ref:`download_on_prem_installation_script`.

Then, you can modify installation parameters and start the installation:

.. note::
   You may also want to set CLUSTER_DOMAIN to a domain name of your choice. By default, it's set to "cluster.onprem".

.. code-block:: shell

   ./onprem_installer.sh


The above script will start the installation process. You will be prompted for network settings.
Refer to :ref:`on_prem_installer_prompts` for instructions on how to configure IP addresses.

At some point the script will stop waiting for user inputs:

.. code-block:: shell

   Edit config values.yaml files with custom configurations if necessary!!!
   The files are located at:
   [path_to_untarred_repo]/orch-configs/profiles/<profile>.yaml
   [path_to_untarred_repo]/orch-configs/clusters/onprem.yaml
   Enter 'yes' to confirm that configuration is done in order to progress with installation
   ('no' will exit the script) !!!

   Ready to proceed with installation?

Customize deployment profile
++++++++++++++++++++++++++++

At this point you can customize your deployment profile, see :ref:`on_prem_custom_settings`.

By default, the LOC-A integration for Edge Orchestrator is not enabled.
Update the ``<path_to_untarred_repo>/orch-configs/profiles/enable-lenovo.yaml`` file with the necessary information to enable communication between Edge Orchestrator and LOC-A.
If the file does not exist, create it as follows:

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
               - name: # Unique identifier for the LOC-A instance. Max length is 40 char and
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

Once done, :ref:`on_prem_start_deployment`. You can monitor deployment status with :ref:`on_prem_view_argocd`.

Post-installation steps
-----------------------

#. Configure DNS settings as described in the :ref:`oxm_network_topology` guide.

#. Add LOC-A DNS Configuration. Map the IP address defined during the LOC-A setup
   to the domain name that needs to be reachable through DNS, and add to DNS record
   used in the on-premise environment.
   The following is an example of the ``dnsmasq`` config file:

   .. code-block:: shell

      address=/loca.<on.prem.domain.name>/<loca-external-ip>

#. :ref:`on_prem_cert_exceptions`.

#. Add exceptions to the browser certificate for the following LOC-A domain,
   replacing ``CLUSTER_FQDN`` with domain that you defined during the installation:

   * \https://loca.CLUSTER_FQDN
