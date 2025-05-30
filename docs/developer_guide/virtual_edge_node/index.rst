Virtual Edge Node
=================

Overview
---------
Create a virtual environment to support Open Edge Platform onboarding and provisioning processes without the
need for physical hardware. It is designed to automate the onboarding and provisioning of VMs. It utilizes Vagrant and
libvirt APIs to ensure efficient and smooth VM provisioning.

Customers Highlights
^^^^^^^^^^^^^^^^^^^^^

* The Virtual Edge Node supports the creation of VMs from the very beginning of their lifecycle, known as Day 0.
* It automates the initial setup process, ensuring that VMs are provisioned with the correct resource configurations, and
  network configurations required for deploying the clusters and applications and testing.
* Virtual Edge Node is particularly useful for developers and testers who need to simulate and test the onboarding and provisioning
  processes of virtual environments using development code.

Developers Highlights
^^^^^^^^^^^^^^^^^^^^^^

* Developers can use the Virtual Edge Node to create and manage VMs that mirror production environments, allowing them to test
  new code and configurations in a safe and isolated setting.
* Manages the installation of necessary packages and dependencies before VM provisioning.
* Vagrantlibvirt/vagrant-libvirt:edge-slim Docker\* image, setting up an environment where Vagrant and Libvirt can operate.
* Vagrant uses a configuration file called a Vagrantfile to define the VM's properties, such as network configuration,
  and resource allocations.
* Using the Libvirt provider, Vagrant communicates with the Libvirt API to spawn and configure the VMs according to the
  specifications in the Vagrantfile.
* Virsh is a CLI tool for managing VMs through Libvirt. The script utilizes this tool to define the
  virtual bridge network specified in the Vagrantfile.
* Minicom is used to connect to the serial console of a virtual machine or a physical device. This is very useful for monitoring
  boot messages, kernel logs, hook os logs, and other system outputs that are sent to the serial console.
* It is also to used remove virtual machines by utilizing virsh commands.
* Using Ansible scripts automate the provisioning of infrastructure required for scale testing, such as creating virtual machines.

Key Performance Indicators
---------------------------

* The onboarding and provisioning process for an Ubuntu* profile taking around 15 minutes.
* The onboarding and provisioning process for an Ubuntu profile taking around 8 minutes.
* Virtual Edge Node is highly useful for scale testing. Ansible scripts are very used for automation and scale tests.
* Support on-prem environments behind FW/NAT without the need to expose the edge to external network.

.. toctree::
   :hidden:
   :maxdepth: 1

   arch/index
