.. SPDX-FileCopyrightText: (C) 2025 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

.. _intel_oot_gpu_driver_installation:

Installation of Intel Out of Tree (OOT) GPU Drivers During Provisioning
=======================================================================

Here are the supported GPU drivers for Intel platforms:

#. Intel Battle Mage 580 GPU - Xeon platforms

Follow the steps below to install Intel Out of Tree (OOT) GPU Drivers for Ubuntu 24.04 LTS
OS profile.

Step 1: Login to orch-cli
-------------------------

Login to orch-cli if not logged in yet.

Replace the placeholders in the command below:

- ``<API_USER>``: Your API username.
- ``<API_PASSWORD>``: Your API password.
- ``<CLUSTER>``: Your cluster domain.

.. code-block:: bash

   orch-cli login <API_USER> <API_PASSWORD> --keycloak https://keycloak.<CLUSTER>/realms/master

Step 2: Create Custom Cloud-Init Resource to Install Intel OOT GPU Drivers
--------------------------------------------------------------------------

Create a custom cloud-init YAML file called ``gpu_driver_installation.yaml`` with the content
below.

.. code-block:: yaml

   #cloud-config
   merge_how: 'dict(recurse_array,no_replace)+list(append)'
   runcmd:
     - |
      wait_until_base_pkg_install_done() {
      while [ true ]; do
         if [ -f "/home/postinstall/Setup/.base_pkg_install_done" ]; then
            echo "Base package installation completed. Proceeding...";
            break;
         else
            echo "Waiting for base package installation to complete...";
            sleep 2;
         fi
      done
      }
      wait_until_base_pkg_install_done
      export DEBIAN_FRONTEND=noninteractive
      echo "Install GPU Drivers......."
      os_version=$(grep 'VERSION_ID' /etc/os-release | cut -d '"' -f 2)
      processor_type=$(lscpu | grep 'Model name:' | awk '{for(i=3;i<=NF;i++) if(tolower($i) ~ /(core|xeon|genuine|atom|celeron|n97|n95|n150|n355)/) print $i}')
      ORIGINAL_NO_PROXY=$no_proxy
      no_proxy=$(echo "$no_proxy" | sed 's/,intel\.com//g' | sed 's/intel\.com,//g' | sed 's/intel\.com//g')
      if [[ "${processor_type,,}" == *"xeon"* ]]; then
         echo -e "\nProcessor: $processor_type, Installing the unified driver for Intel® Data Center GPU Flex/Max Series on Ubuntu Server......."
         sudo apt update
         sudo apt install -y gpg-agent wget
         wget -qO - https://repositories.intel.com/gpu/intel-graphics.key | \
         sudo gpg --yes --dearmor --output /usr/share/keyrings/intel-graphics.gpg
         source /etc/os-release
         if [[ ! " jammy noble " =~ " ${VERSION_CODENAME} " ]]; then
            echo "Ubuntu version ${VERSION_CODENAME} not supported"
            exit 1
         else
            wget https://repositories.intel.com/gpu/ubuntu/dists/${VERSION_CODENAME}/lts/2523/intel-gpu-ubuntu-${VERSION_CODENAME}-2523.run
            chmod +x intel-gpu-ubuntu-${VERSION_CODENAME}-2523.run
            sudo ./intel-gpu-ubuntu-${VERSION_CODENAME}-2523.run
         fi
         sudo apt install -y \
         linux-headers-$(uname -r) \
         linux-modules-extra-$(uname -r) \
         flex bison \
         intel-fw-gpu intel-i915-dkms xpu-smi

         sudo apt install -y \
         intel-opencl-icd libze-intel-gpu1 libze1 \
         intel-media-va-driver-non-free libmfx-gen1 libvpl2 \
         libegl-mesa0 libegl1-mesa-dev libgbm1 libgl1-mesa-dev libgl1-mesa-dri \
         libglapi-mesa libgles2-mesa-dev libglx-mesa0 libigdgmm12 libxatracker2 mesa-va-drivers \
         mesa-vdpau-drivers mesa-vulkan-drivers va-driver-all vainfo hwinfo clinfo

         sudo apt install -y \
         libigc-dev intel-igc-cm libigdfcl-dev libigfxcmrt-dev libze-dev

         echo "GPU driver installation for Ubuntu server image done"
         sudo reboot
      else
         echo -e "\nProcessor: $processor_type is not supported exiting\n"
         exit 1
      fi



Step 3: Create Custom Cloud-Init Config
---------------------------------------

Replace the placeholders below as per your orchestrator:

- ``<PROJECT_NAME>``: Project name.
- ``<CLUSTER>``: Cluster domain.

.. code-block:: bash

   orch-cli create customconfig install-gpu-driver ./gpu_driver_installation.yaml \
       --project <PROJECT_NAME> \
       --description "Intel OOT GPU driver installation" \
       --api-endpoint https://api.<CLUSTER>

List all the custom configurations along with resource ID:

.. code-block:: bash

   orch-cli list customconfig --project <PROJECT_NAME> --api-endpoint https://api.<CLUSTER>

Step 4: Register the Device with Custom Configuration
-----------------------------------------------------

Register the edge node to EMF orchestrator and choose the Ubuntu 24.04 profile.

.. code-block:: bash

   orch-cli create host --project <PROJECT_NAME> --generate-csv

Replace ``<PROJECT_NAME>`` with your project name.

Update the ``test.csv`` file with the following information:

- Serial number of device.
- OS profile ID of Ubuntu 24.04 LTS.
- Site ID information.

Create the host with Ubuntu OS profile and custom cloud-init:

.. code-block:: bash

   orch-cli create host --project <PROJECT_NAME> \
       --api-endpoint https://api.<CLUSTER> \
       --import-from-csv test.csv \
       --cloud-init <CUSTOMCONFIG_ID>

Replace the following placeholders:

- ``<PROJECT_NAME>``: Project name created.
- ``<CLUSTER>``: Cluster domain.
- ``<CUSTOMCONFIG_ID>``: Custom configuration ID from Step 3.

Step 5: Monitor the Provisioning Status
---------------------------------------

Monitor the provisioning status of the edge node using the orch-cli or EMF web console:

.. code-block:: bash

   orch-cli get host <host_resource_id>

Replace ``<host_resource_id>`` with the ID of the edge node obtained during registration.

Step 6: Verify the Installation
-------------------------------

Once the provisioning is complete, verify that the edge node is running the Ubuntu 24.04 OS
profile by checking the OS version and verifying GPU installation:

.. code-block:: bash

   lspci -nn | grep Graphics

You can also verify the GPU driver is loaded correctly:

.. code-block:: bash

   lsmod | grep i915

Related Documentation
---------------------

- For more details on using the orch-cli, refer to the
  :doc:`orch-cli user guide </user_guide/package_software/orch_cli/orch_cli_guide>`.

- For more details on edge node provisioning, refer to the
  :doc:`edge node provisioning guide </user_guide/set_up_edge_infra/edge_node_onboard/index>`.

- For more details on custom OS profiles, refer to the
  :doc:`custom OS profile guide </user_guide/advanced_functionality/custom_os_profile>`.

