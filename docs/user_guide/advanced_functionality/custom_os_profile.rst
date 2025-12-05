.. filepath: /home/seu/EMF/edge-manage-docs/docs/user_guide/advanced_functionality/custom_os_profile.rst

Usage of Custom OS Profile to Provision Edge Nodes
==================================================

This feature allows users to create and manage custom OS profiles that can be used to provision
edge nodes. By defining a custom OS profile, users can specify custom built OS flavors of Ubuntu
and Edge Microvisor Toolkit (EMT) as an edge node's operating system. This enables a more tailored
and efficient deployment process for edge nodes, allowing users to leverage their own OS images
that are optimized for their specific use cases.

Prerequisites
-------------

Here are the prerequisites to use the custom OS profile feature:

- OS images must be built and hosted on a web server that is accessible during the edge node
  provisioning process.
- Supported OS image formats include QCOW2 and RAW with or without compression.
- OS image including kernel must be signed with a trusted certificate to support Secure Boot,
  and the corresponding certificate must be enrolled in the edge node's firmware.
- OS images must include necessary drivers and configurations to support the target edge node
  hardware.
- OS image partition layout must be labeled using GPT.

  - UEFI/EFI system partition and rootfs partition for Ubuntu
  - Refer to the `partition scheme`_ for EMT OS

- OS image must have SHA256 checksum generated for verification during the provisioning process.
- Ubuntu custom OS profiles must be mutable to allow for post-deployment configurations, updates,
  and installation of edge node agents.
- EMT custom OS profiles must be immutable to ensure consistency and reliability across
  deployments. They should have edge node agents pre-installed to facilitate management and
  monitoring.
- EMT custom OS profiles must have cloud-init package installed and configured to support
  automated initial setup during the provisioning process.
- EMT custom OS profile must have EMF compatible version installed to ensure seamless integration
  with the EMF orchestrator.
- EMT custom OS profiles must be based on the official EMT OS images provided by the Edge
  Microvisor Toolkit.
- If an edge node is behind a proxy server, make sure the OS image URL is accessible during the
  provisioning process.
- OS image URL must use HTTPS protocol to ensure secure transmission when hosting the OS image
  on the web server.

.. _partition scheme: https://github.com/open-edge-platform/infra-onboarding/tree/main/tinker-actions/src/fde_dmv#partition-scheme

Default OS Profiles
-------------------

Default OS profiles available after the EMF orchestrator installation are:

- Ubuntu 22.04 LTS
- Ubuntu 24.04 LTS
- Ubuntu 24.04 LTS with OOT GPU drivers
- EMT 3.0 non-RT
- EMT 3.0 RT
- EMT standalone (used for OXM profile)
- EMT with IDV (used for OXM profile)

Steps to Use the Custom OS Profile Feature
------------------------------------------

Step 1: Get the TLS Certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Get the TLS certificate from the server where the OS image is hosted. Replace
``<SERVER_DNS_NAME>`` (without ``https://``) with your server's DNS name.

.. note::

   Make sure the image is hosted in ``raw.gz`` (EMT OS) or ``img`` (Ubuntu OS) format.

.. code-block:: bash

   openssl s_client -connect <SERVER_DNS_NAME>:443 </dev/null 2>/dev/null | \
       openssl x509 -outform PEM > server_cert.pem
   export TLS_CERT="$(base64 -w 0 server_cert.pem)"

Step 2: Create a Custom OS Profile YAML File
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create the OS profile YAML file ``custom_os_profile.yaml`` with the following content:

.. code-block:: yaml

   appVersion: apps/v1
   metadata:
     release: 0.0.0-dev
     version: 0.2.0
   spec:
     name: <custom_os_profile_name>
     type: <IMMUTABLE/MUTABLE>
     provider: OS_PROVIDER_KIND_INFRA
     architecture: x86_64
     profileName: <custom_os_profile_name>
     image_url: <url_to_os_image>
     osImageVersion: <os_image_version>
     osImageSha256: <sha256_checksum_of_os_image>
     securityFeature: <SECURITY_FEATURE_NONE/SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION>
     description: "<description_of_custom_os_profile>"
     metadata: ""
     tlsCert: "<TLS_CERT>"

Replace the placeholders with appropriate values:

``<custom_os_profile_name>``
   A unique name for the custom OS profile.

``<IMMUTABLE/MUTABLE>``
   Specify whether the OS profile is immutable or mutable.

``<url_to_os_image>``
   The URL where the OS image is hosted.

``<sha256_checksum_of_os_image>``
   The SHA256 checksum of the OS image for verification.

``<os_image_version>``
   The version of the OS image.

``<SECURITY_FEATURE_NONE/SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION>``
   Specify the security features enabled for the OS profile.

``<description_of_custom_os_profile>``
   A brief description of the custom OS profile.

``<TLS_CERT>``
   The base64 encoded TLS certificate obtained in the previous step.

Optional: Skip Kernel Upgrade
"""""""""""""""""""""""""""""

If you want to skip the kernel upgrade during the edge node provisioning, add the following to
the ``metadata`` field in the YAML file:

.. code-block:: yaml

   # ...existing code...
   spec:
     metadata: |
       skip_kernel_upgrade: "true"
   # ...existing code...

Optional: Specify Kernel Version
""""""""""""""""""""""""""""""""

If you want to install a specific version of the Canonical kernel during the edge node
provisioning, add the following to the ``metadata`` field in the YAML file:

.. note::

   Replace ``<canonical_kernel_version>`` with the desired kernel version in the format
   ``linux-image-5.15.0-1035-generic``. The kernel must be present in the Canonical repository.

.. code-block:: yaml

   # ...existing code...
   spec:
     metadata: |
       kernelVersion: "<canonical_kernel_version>"
   # ...existing code...

Step 3: Login to orch-cli
^^^^^^^^^^^^^^^^^^^^^^^^^

Login to orch-cli first. Replace ``<EMF_KEYSTONE_URL>``, ``<USERNAME>``, and ``<PASSWORD>``
with your EMF orchestrator details:

.. code-block:: bash

   orch-cli login <EMF_KEYSTONE_URL> --username <USERNAME> --password <PASSWORD>
   orch-cli config set project <PROJECT_NAME>
   orch-cli config set api-endpoint <EMF_API_ENDPOINT>

Replace the following placeholders:

- ``<PROJECT_NAME>``: Your project name
- ``<EMF_API_ENDPOINT>``: Your EMF API endpoint (e.g., ``https://api.<cluster_domain>``)

Step 4: Create the Custom OS Profile
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create the custom OS profile:

.. code-block:: bash

   orch-cli create osprofile custom_os_profile.yaml

Step 5: Register the Edge Node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Register the edge node with the created custom OS profile:

.. code-block:: bash

   orch-cli create host --generate-csv

This command generates a CSV file ``test.csv`` with the necessary details to register the
edge node.

Use the generated ``test.csv`` file to register the edge node with the custom OS profile.
The ``OSProfile`` field in the CSV file should have the custom OS profile name created earlier.

.. code-block:: bash

   orch-cli create host --import-from-csv test.csv

Step 6: Monitor the Provisioning Status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Monitor the provisioning status of the edge node using the orch-cli or EMF web console:

.. code-block:: bash

   orch-cli get host <host_resource_id>

Replace ``<host_resource_id>`` with the ID of the edge node obtained during registration.

Step 7: Verify the Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the provisioning is complete, verify that the edge node is running the custom OS profile
by checking the OS version and configurations on the edge node.

Step 8: Clean Up (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Clean up the created custom OS profile if no longer needed:

.. code-block:: bash

   orch-cli delete osprofile <custom_os_profile_name>

Replace ``<custom_os_profile_name>`` with the name of the custom OS profile created earlier.

Related Documentation
---------------------

- For more details on using the orch-cli, refer to the
  :doc:`orch-cli user guide <../package_software/orch_cli/orch_cli_guide>`.
- For more details on edge node provisioning, refer to the
  :doc:`edge node provisioning guide <../set_up_edge_infra/edge_node_onboard/index>`.
