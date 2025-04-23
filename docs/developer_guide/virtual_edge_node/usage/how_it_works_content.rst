How It Works
============

Virtualization Technologies
---------------------------

The virtual edge node leverages virtualization technologies to create isolated environments for edge computing. It uses a combination of Docker\*, QEMU, libvirt, and Vagrant to manage virtual machines and network configurations.

Key Components and Processes
----------------------------

- **Configuration Management**: The setup begins with a configuration file that contains essential details, such as cluster configuration, VM resources, Onboarding user credentials etc.

- **Download Edge Orchestrator Certificate**: A full server certificate is downloaded and verified to ensure secure communication and authentication during the provisioning process.

- **Package Installation**: Before provisioning, a install_packages.sh script installs all necessary packages, including Docker, QEMU, libvirt, and Vagrant. This ensures that the environment is fully prepared for VM creation.

- **VM Creation and Provisioning**: The `create_vms.sh` script, followed by specifying the number of VMs, allows users to define how many VMs to create.

- **Monitoring and Logging**: The provisioning process is monitored in real-time using `socket_login.exp`, which tracks the progress and logs any issues. This helps in diagnosing and resolving problems quickly. To see all the running logs, run ``virt-manager`` in duplicate terminal to connect with virtual machine manager.

- **Cleanup and Teardown**: After provisioning, ``destroy_vm.sh`` script is used to destroy all Or specific VMs, ``vm_network_cleanup.sh`` script ensures the clean up of all Or specific networks.

By integrating these components and processes, the virtual edge node provides a robust and flexible platform for deploying edge computing solutions on virtual machines.
