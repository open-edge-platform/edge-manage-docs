Tutorial and Examples
=====================

The virtual edge node offers flexible deployment options utilizing both Interactive (IO) and
Non-Interactive (NIO) flows. For streamlined operations, the security feature is configured as
"securityFeature":"SECURITY_FEATURE_NONE", allowing seamless integration with various environments.
Supported OS resources include Ubuntu\* OS and Edge Microvisor Toolkit.
Following is the common configurations used in VMs deploy using IO and NIO flow
for different OS profiles.

Configuration
--------------

Define the VM configuration such as CPU, memory, storage, and network using a configuration file, modify `config` file with the following template:

Step-1: Repository Setup
~~~~~~~~~~~~~~~~~~~~~~~~~

Start by cloning the repository that contains all the necessary scripts and configurations for deployment.
This step is crucial for accessing the tools required for virtual edge node provisioning:

.. code-block:: shell

    git clone https://github.com/open-edge-platform/virtual-edge-node.git
    cd vm-provisioning

Step-2: Default VM Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: shell

    # Cluster FQDN
    CLUSTER="orch-pid.example.com"

    # VM Resources
    RAM_SIZE=8192
    NO_OF_CPUS=4
    SDA_DISK_SIZE="110G"
    LIBVIRT_DRIVER="kvm"

    # Linux Provisioning
    USERNAME="user"
    PASSWORD="user"

Customize the values to match your deployment needs.

Step-3: Download Edge Orchestrator Certificate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To download the Full_server.crt file and save it in the certs directory, follow these steps using wget.

.. code-block:: shell

    source ./config
    wget https://"tinkerbell-nginx.${CLUSTER}"/tink-stack/keys/Full_server.crt --no-check-certificate -O certs/"Full_server.crt"


Step-4: Create Provide with OS Resource
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are two options to set the Provider with OS Resource:

Option 1: Manual Provider Creation Using Curl Command
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Source the configuration file and export configs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code-block:: shell

    source ./config
    export PROJECT_API_USER="your_project_api_username"
    export PROJECT_API_PASSWORD="your_project_api_password"
    export PROJECT_NAME="your-project-name"

2. Obtain the JSON Web Token (JWT)

.. code-block:: shell

    export JWT_TOKEN=$(curl --location --insecure --request POST "https://keycloak.${CLUSTER}/realms/master/protocol/openid-connect/token" \ 
    --header 'Content-Type: application/x-www-form-urlencoded' \ 
    --data-urlencode 'grant_type=password' \ 
    --data-urlencode 'client_id=system-client' \ 
    --data-urlencode "username="${PROJECT_API_USER}" \ 
    --data-urlencode "password="${PROJECT_API_PASSWORD}" \ 
    --data-urlencode 'scope=openid profile email groups' | jq -r '.access_token')

3. Sample configuration to delete a provider
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: shell

    curl -X DELETE -H 'Accept: application/json' -H "Authorization: Bearer ${JWT_TOKEN}" --header "Content-Type: application/json" \ 
    https://api.${CLUSTER}/v1/projects/${PROJECT_NAME}/providers/{provider-a2a751f9}


4. Sample configuration to create a provider with an OS instance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: shell

    curl -X POST "https://api.${CLUSTER}/v1/projects/${PROJECT_NAME}/providers" -H "accept: application/json" \ 
    -H "Content-Type: application/json" -d '{"providerKind":"PROVIDER_KIND_BAREMETAL","name":"infra_onboarding", \
    "apiEndpoint":"xyz123", "apiCredentials": ["abc123"], "config": "{\"defaultOs\":\"os-51c4eba0\",\"autoProvision\":false}" }' \ 
    -H "Authorization: Bearer ${JWT_TOKEN}"

**Important**: For detailed instructions on configuring autoProvision settings, refer to :doc:`example4_auto_provision_false`

Option 2: Automated Provider Creation Using Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This `update_provider_defaultos.sh` script is designed to automate the process of updating the default OS profile in a provider and enable auto provisioning
for virtual edge nodes. It interacts with a cloud API to manage OS profiles and providers, ensuring that the correct OS is set as the default for provisioning.

**Auto Provisioning**: The new provider is configured with autoProvision set to true, enabling automatic provisioning of virtual edge nodes.

Before running the script, export the configuration variables from config and nio_configs.sh

.. code-block:: shell

    source ./config
    source ./scripts/nio_configs.sh

To execute the script, use the following command:

**Edge Microvisor Toolkit**: Update the provider with Edge Microvisor Toolkit.

.. code-block:: shell

    ./scripts/update_provider_defaultos.sh microvisor

**Ubuntu OS**: Update the provider with Ubuntu os.

.. code-block:: shell

    ./scripts/update_provider_defaultos.sh ubuntu

Step 5: Install Necessary Packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Navigate to the vm-provisioning directory and install the required packages to prepare the environment for VM creation. Execute the following commands:

.. code-block:: shell

    chmod +x install_packages.sh
    ./install_packages.sh

Follow the examples for IO and NIO flow using the Ubuntu and Edge Microvisor Toolkit OS profiles.

.. toctree::
    :hidden:
    :maxdepth: 1

    example1_io_flow.rst
    example2_nio_default_serial_nums.rst
    example3_nio_custom_serial_nums.rst
    example4_auto_provision_false
