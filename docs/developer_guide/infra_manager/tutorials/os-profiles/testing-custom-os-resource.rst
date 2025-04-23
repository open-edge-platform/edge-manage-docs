Testing Custom OS Profiles
==========================

By default, Edge Orchestrator creates a set of OS profiles (see :doc:`/shared/shared_os_profile`).

However, it is sometimes desirable to test a custom OS Profile that is under development, before officially releasing it as described in :doc:`./adding-os-profiles`.

This guide shows how to create an OS resource with a custom OS image on a live instance of Edge Orchestrator.

This guide assumes that users have access to Edge Orchestrator and can obtain JWT token as described in `Obtaining a JSON Web Token (JWT) <./shared_gs_iam.html#obtaining-a-json-web-token-jwt>`_.

.. note::
   See :doc:`/shared/shared_os_profile` to familiarize yourself with basic OS Profile concepts, such as OS immutability in particular.

Testing custom Edge Microvisor Toolkit image
--------------------------------------------

Note the following before creating a custom OS Profile for Edge Microvisor Toolkit:

- EMT images are stored in the Release Service, so a custom EMT image that you want to test **MUST** also be published to the Release Service under ``/files-edge-orch/repository`` before you follow any further step.
- ``imageUrl`` for EMT OS Profiles should only defined a sub-path to the Release Service artifact.
- The only supported format for EMT images is **.raw.gz**. Make sure you use the correct image extension.
- ``sha256`` must equal to SHA-256 of the EMT image. You can get the SHA-256 value from the Release Service artifact that is pushed along with the OS image (e.g,. ``files-edge-orch/repository/microvisor/non_rt/*.raw.gz.sha256sum``).
- ``updateSources`` is mandatory and must be provided, but should be kept empty.
- ``osProvider`` must be set to ``OPERATING_SYSTEM_PROVIDER_INFRA`` and **``osType`` to ``OPERATING_SYSTEM_TYPE_IMMUTABLE`` (since EMT is immutable)**.
- ``profileName`` must equal the profile name that is used for already-existing EMT images. In this guide, we're assuming EMT Non-RT image, so the profile name is ``microvisor-nonrt``. Check the `os-profiles <https://github.com/open-edge-platform/infra-core/blob/main/os-profiles>`_ repository for other profile names.
- Specify the correct security features (``SECURITY_FEATURE_NONE`` or ``SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION``), depending on the EMT OS image capabilities.

An example of a command to create a custom EMT OS Profile:

.. code-block:: bash

    curl  --insecure -X POST  -H 'Accept: application/json' -H "Authorization: Bearer ${JWT_TOKEN}" -H "Accept: application/json" \
        -d '{"securityFeature": "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION", "updateSources": [], "sha256":"989151e612cde6876b0ef9fbc8051c0e22c32c59dd51cbac2b8691fbb79c399a", "osProvider": "OPERATING_SYSTEM_PROVIDER_INFRA", "osType": "OPERATING_SYSTEM_TYPE_MUTABLE", "profileName": "ubuntu-22.04-lts-generic", "name": "Your OS name to show in UI", "imageId": "22.04.5", "imageUrl": "https://cloud-images.ubuntu.com/releases/jammy/release-20250327/ubuntu-22.04-server-cloudimg-amd64.img"  }' \
        -H 'Content-Type: application/json'  https://api.${CLUSTER_FQDN}/v1/projects/{PROJECT_NAME}/compute/os

Testing custom Ubuntu\* image
-----------------------------

- The Ubuntu\* images are directly downloaded from the upstream mirror, so make sure that ``imageUrl`` specifies a full URL path.
- We only support **.img** Ubuntu images. Make sure you use the correct image extension.
- ``imageId`` must correspond to the OS image version. For this Ubuntu release it will be 22.04.X.
- ``updateSources`` is mandatory and must be provided (even if empty). You should only populate ``updateSources`` (along with ``installedPackages``) only if you plan to install any additional OS packages in Day2.
- ``osProvider`` must be set to ``OPERATING_SYSTEM_PROVIDER_INFRA`` and **``osType`` to ``OPERATING_SYSTEM_TYPE_MUTABLE`` (since Ubuntu OS is mutable)**.
- ``profileName`` must equal the profile name that is used for already-existing Ubuntu profile. For Ubuntu OS, it should be ``ubuntu-22.04-lts-generic``.
- ``securityFeature`` is set to ``SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION`` (SB+FDE enabled) because Ubuntu OS does support security settings (note it can be disabled per Edge Node during provisioning).

An example of a command to create a custom Ubuntu OS Profile:

.. code-block:: bash

    curl  --insecure -X POST  -H 'Accept: application/json' -H "Authorization: Bearer ${JWT_TOKEN}" -H "Accept: application/json" \
        -d '{"securityFeature": "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION", "updateSources": [], "sha256":"989151e612cde6876b0ef9fbc8051c0e22c32c59dd51cbac2b8691fbb79c399a", "osProvider": "OPERATING_SYSTEM_PROVIDER_INFRA", "osType": "OPERATING_SYSTEM_TYPE_MUTABLE", "profileName": "ubuntu-22.04-lts-generic", "name": "Your OS name to show in UI", "imageId": "22.04.5", "imageUrl": "https://cloud-images.ubuntu.com/releases/jammy/release-20250327/ubuntu-22.04-server-cloudimg-amd64.img"  }' \
        -H 'Content-Type: application/json'  https://api.${CLUSTER_FQDN}/v1/projects/{PROJECT_NAME}/compute/os
