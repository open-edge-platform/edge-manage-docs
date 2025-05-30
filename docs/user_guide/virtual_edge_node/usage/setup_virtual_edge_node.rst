Set Up Virtual Edge Node
========================

This section provides detailed instructions for configuring Edge Orchestrator and provisioning virtual machines (VMs) for the virtual edge node.

Prerequisites
-------------

Before proceeding with the onboarding and provisioning of virtual edge nodes, ensure that Edge Orchestrator has been successfully installed and that the OS profile, specifically selecting the 'SECURITY_FEATURE_NONE' option, is correctly set within the `provider` configuration.
To update the provider configuration, follow the steps in Edge Orchestrator `provider update`.

Additionally, clone the repository to access the necessary scripts and configurations for deployment:

.. code-block:: shell

    git clone https://github.com/open-edge-platform/virtual-edge-node.git

Download Edge Orchestrator Certificate
---------------------------------------

To download the `Full_server.crt` file and save it in the certs directory, follow these steps using `wget`.

Example command to download certificate:

.. code-block:: shell

    CLUSTER_FQDN="specify the fqdn of the cluster"
    wget https://"tinkerbell-nginx.${CLUSTER_FQDN}"/tink-stack/keys/Full_server.crt --no-check-certificate -O certs/"Full_server.crt"

Dependencies
------------

This section verifies the essential dependencies for establishing a KVM-based virtualization environment on your system. These dependencies ensure that your system has the necessary tools and libraries to effectively manage and operate virtual machines using KVM.

Run the following command to check dependencies:

.. code:: shell

    make dependency-check

If system supports KVM acceleration, you will see a message stating: "KVM acceleration is supported on this system." If not, you will be prompted to check your BIOS/UEFI settings to ensure that virtualization is enabled.

Edge Orchestrator and Provisioning VM Configuration
---------------------------------------------------

Open the config file and replace the placeholder values with the actual values specific to your Edge Orchestrator.

**Cluster Configuration**

- **CLUSTER="kind.internal"**: This variable is the FQDN of the Edge Orchestrator.

**VM Resource Configurations**

Specify the resource allocations for virtual machines (VMs) to be provisioned.

- **RAM_SIZE=8192**: Allocates 8192 MB (or 8 GB) of RAM to each VM.
- **NO_OF_CPUS=4**: Assigns 4 CPU cores to each VM.
- **SDA_DISK_SIZE="110G"**: Sets the size of the primary disk (sda) to minimum 110 GB.
- **LIBVIRT_DRIVER="kvm"**: If KVM is supported, set the driver to kvm. If KVM is not supported, set the driver to qemu.

**Linux User Configuration**

- **USERNAME="PROVISIONED_USERNAME"**: This variable represents the username for the newly provisioned Linux system. Replace "PROVISIONED_USERNAME" with the actual username.
- **PASSWORD="PROVISIONED_PASSWORD"**: This variable holds the password for the provisioned Linux user. Replace "PROVISIONED_PASSWORD" with the actual password.

Example Edge Orchestrator and Provisioning VM Configuration
-------------------------------------------------------------------

Here's an example of how you might update the fields in a config file:

.. code-block:: shell

    # Cluster FQDN
    CLUSTER="kind.internal"

    # VM Resources
    RAM_SIZE=8192
    NO_OF_CPUS=4
    SDA_DISK_SIZE="110G"
    LIBVIRT_DRIVER="kvm"

    # Linux Provisioning
    USERNAME="actual_linux_user"
    PASSWORD="actual_linux_password"

Configuration Setup
-------------------

**Interactive Onboarding Flow Configurations**

Before running the IO flow script, export the onboarding username and password:

.. code:: shell

    export ONBOARDING_USERNAME="ONBOARDING_USER"
    export ONBOARDING_PASSWORD="ONBOARDING_PASSWORD"

- **ONBOARDING_USERNAME="ONBOARDING_USER"**: This variable represents the username to start IO flow. Replace "ONBOARDING_USER" with the actual username.
- **ONBOARDING_PASSWORD="ONBOARDING_PASSWORD"**: This variable holds the password for the onboarding user. Replace "ONBOARDING_PASSWORD" with the actual password.

**Non-Interactive Onboarding Flow Configurations**

Non-Interactive Onboarding Project and User Configurations. These configurations are used to automatically register the dynamically created Virtual Edge Node Serial Number.

Before running the NIO flow script, export the project API username and password:

.. code:: shell

    export PROJECT_API_USER="your_project_api_username"
    export PROJECT_API_PASSWORD="your_project_api_password"
    export PROJECT_NAME="your-project-name"

- **PROJECT_NAME="your-project-name"**: This variable specifies the name of the project associated with the non-interactive onboarding flow configurations.
- **PROJECT_API_USER="actual_api_user"**: This variable indicates the username for accessing an API.
- **PROJECT_API_PASSWORD=""**: This variable is intended to store the password for the API user. Populate it with the actual password.

**Note**: If you do not export these credentials, the script will prompt you to enter them when you run the create_vms.sh script.

Run the install_package script
--------------------------------

Before executing the create_vm script, ensure that you run the install_package script. This step is crucial as it installs all necessary dependencies and configurations required for the virtual machine setup.

.. code:: shell

    ./install_packages.sh
