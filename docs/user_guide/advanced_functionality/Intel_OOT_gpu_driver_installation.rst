.. SPDX-FileCopyrightText: (C) 2025 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

.. _intel_oot_gpu_driver_installation:

Installation of Intel Out of Tree (OOT) GPU Drivers During Provisioning
=======================================================================

Here are the supported GPU drivers for Intel platforms:

#. Intel iGPU - ADL, RPL platforms.

#. Intel Battle Mage 580 GPU - Xeon platforms (Dell XR12 Icelake).

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

Replace ``<PLATFORM_TYPE>`` with the proper platform type:

- ``ADL``: Alderlake iGPU installation.
- ``RPL``: Raptorlake iGPU installation.
- ``BMG``: Battlemage discrete GPU installation on Xeon platforms.

.. code-block:: yaml

   #cloud-config
   merge_how: 'dict(recurse_array,no_replace)+list(append)'
   runcmd:
     - |
       wget https://af01p-png.devtools.intel.com/artifactory/hspe-edge-png-local/ubuntu/daily/panther-lake/20251106-1458/installer.sh --no-check-certificate --no-proxy -O /tmp/installer.sh
       chmod +x /tmp/installer.sh

       sed -i '/parition_extention/i export DEBIAN_FRONTEND=noninteractive' /tmp/installer.sh
       sed -i '/export DEBIAN_FRONTEND=noninteractive/a \
       wait_until_base_pkg_install_done() { \
       while [ true ]; do \
           if [ -f "/home/postinstall/Setup/.base_pkg_install_done" ]; then \
               echo "Base package installation completed. Proceeding..."; \
               break; \
           else \
               echo "Waiting for base package installation to complete..."; \
               sleep 2; \
           fi; \
       done \
       }' /tmp/installer.sh
       sed -i '/parition_extention/i wait_until_base_pkg_install_done' /tmp/installer.sh

       sed -i '/ProxySetUp/a source /etc/apt/apt.conf.d/99proxy.conf\
       source /etc/environment' installer.sh
       sed -i '/^[[:space:]]*parition_extention\([[:space:]]\|$\)/ s/^/#/' /tmp/installer.sh
       sed -i '/^[[:space:]]*reconfigureGrub\([[:space:]]\|$\)/ s/^/#/' /tmp/installer.sh
       sed -i '/^[[:space:]]*InstallPackage\([[:space:]]\|$\)/ s/^/#/' /tmp/installer.sh
       sed -i '/^[[:space:]]*InternalConfigSetup\([[:space:]]\|$\)/ s/^/#/' /tmp/installer.sh
       sed -i '/^[[:space:]]*ValidatePackages\([[:space:]]\|$\)/ s/^/#/' /tmp/installer.sh
       sed -i '/reboot/i touch /home/postinstall/Setup/.custom_update_done' /tmp/installer.sh
       sed -i '/reboot/i apt-get install ubuntu-desktop -y' /tmp/installer.sh
       if [ ! -f /home/postinstall/Setup/.custom_update_done ]; then
           /tmp/installer.sh <PLATFORM_TYPE> default
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

