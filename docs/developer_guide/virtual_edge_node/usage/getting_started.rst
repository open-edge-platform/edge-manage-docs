Get Started
===========

Instructions to create the environment necessary to onboard and provision virtual edge nodes.

Intel recommends using the script-based installation for creating Virtual Machines.

System Requirements for Virtual Edge Node Installation on Baremetal or Virtual Machines
---------------------------------------------------------------------------------------

**Minimum System Requirements**

It is essential that the host machine—whether installed on baremetal or a virtual machine—has Ubuntu\* 22.04/24.04 LTS installed to ensure compatibility.
The following specifications are recommended for onboarding and provisioning virtual machines (VMs). The number of VMs that can be provisioned will depend on these specifications:

- **Operating System**: Ubuntu 22.04 LTS or 24.04 LTS (must be installed on the host machine)
- **CPU**: 16 cores
- **Memory**: 64 GB RAM
- **Storage**: 1 TB HDD

**Proxy Settings**

To ensure seamless connectivity to the Edge Orchestrator, set any required proxy settings on your system if they are required.

Below is an example of how to configure these proxy settings:

.. code:: shell

    export http_proxy=http://proxy-dmz.mycorp.com:912
    export https_proxy=http://proxy-dmz.mycorp.com:912
    export socks_proxy=proxy-dmz.mycorp.com:1080
    export no_proxy=.mycorp.com,.local,.internal,.controller.mycorp.corp,.kind-control-plane,.docker.internal,localhost

**Granting Administrative and Virtualization Permissions to a User**

Ensure that a user has the necessary permissions to perform administrative tasks and manage virtualization and containerization tools.
The below command adds the specified user to important groups, granting them the required access rights.

Sample command to add a user named john to these groups:

.. code:: shell

    sudo usermod -aG sudo,kvm,docker,libvirt john

**Note**: After running this command, the user may need to log out and log back in for the changes to take effect.
