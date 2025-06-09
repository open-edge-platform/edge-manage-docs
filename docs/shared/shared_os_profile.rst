Operating System (OS) Profiles
==============================

OS Profile resources describe the installation sources used,
including:

- OS and its downloadable source location
- How the OS would be installed, including customization such as
  kernel parameters and upstream packages
- Intel-provided packages to be included, such as Edge Node Agents (see :doc:`/developer_guide/agents/arch/index`)
- Where and how updates to the OS can be obtained

OS Profiles are used during the onboarding and provisioning processes, as
well as for updating a provisioned node.

A single OS Profile can be related to multiple provisioned edge nodes.

By default, the Edge Orchestrator currently supports two OS distributions (Ubuntu\* 22.04 and Edge Microvisor Toolkit) and provides five OS profiles:

- `ubuntu-22.04-lts-generic`, name `Ubuntu 22.04.5 LTS`: Ubuntu 22.04.5 LTS OS with no additional drivers or extensions
- `ubuntu-22.04-lts-generic-ext`, name `Ubuntu 22.04.5 LTS with Intel out-of-tree GPU drivers`: Ubuntu 22.04.5 OS LTS with additional GPU drivers for Intel® GPU families, both `ARC` and `Flex`
- `microvisor-nonrt`, name `Edge Microvisor Toolkit 3.0.20250413`: Edge Microvisor Toolkit version Edge Microvisor Toolkit 3.0.20250413
- `microvisor-rt`, name `Edge Microvisor Toolkit Real Time 3.0.20250413`: Edge Microvisor Toolkit with Real Time Kernel, version 3.0.20250413
- `ubuntu-lenovo`, name `Ubuntu 22.04.3`: Ubuntu 22.04.3 LTS, only available with Lenovo\* components and specifically to be used in conjunction with LOC-A based provisioning

OS Profile concepts
-------------------

OS Image
^^^^^^^^

The core part of an OS profile is the definition of an OS image to be installed on Edge Nodes using that OS profile.
The OS image is attached to an OS profile by setting an URL where it is stored at.

As of now, the Ubuntu images are directly downloaded to Edge Nodes from the upstream mirrors, while the Edge Microvisor Toolkit images are downloaded from the Release Service.
This impacts how the OS image URL is defined in an OS profile - Ubuntu OS profiles will contain full path to the upstream mirror,
while Edge Microvisor Toolkit OS profiles will only specify a sub-path on the Release Service that identifies an artifact.

Moreover, the OS profile should specify a SHA-256 checksum along with the OS image URL.
The SHA256 is transferred via a secure channel to Edge Nodes during provisioning and is used for the integrity check of the downloaded OS image.

Immutability of Operating System
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The immutability of Operating System refers to the idea that, once deployed, the core parts of the OS do not change - they are read-only or treated as unchangeable.
An immutable OS is designed so that its core components, such as the system files, binaries, and configuration, remain fixed and unchangeable after deployment.
These components are typically mounted as read-only or enforced as static by the system. As a result, any changes to the OS, including updates or configuration adjustments,
are not applied directly to the live system. Instead, the entire OS image is replaced with a new, pre-built version containing the desired changes.
This approach improves reliability, consistency, and security by preventing unintended or unauthorized modifications.

.. note:: To get more details on how the immutable Edge Microvisor Toolkit OS is designed, visit to the `documentation pages <https://github.com/open-edge-platform/edge-microvisor-toolkit/tree/3.0/docs>`_.

The important consequence of OS immutability is that any OS updates are made by replacing the entire OS image rather than modifying system in-place.

In contrast, a mutable OS follows the traditional model where the system is fully writable.
Users and administrators can modify files, install or remove packages, and change configurations directly on the running system.
Updates are typically applied in-place, which offers flexibility but may increase the risk of drift, inconsistencies, or configuration errors over time.

The Edge Orchestrator supports both mutable and immutable OSes, with dedicated, distinct Day0 and Day2 workflows. Therefore, each OS Profile must define
an OS type - immutable or mutable. Depending on the OS type, the Edge Orchestrator will use a different set of Day0 installation scripts and a dedicated Day2 workflow for OS updates.

Security Features
^^^^^^^^^^^^^^^^^

The Edge Orchestrator supports advanced security features like Secure Boot (SB) or Full-Disk Encryption (FDE) (see :doc:`/developer_guide/infra_manager/arch/security`).

Since not all of Operating Systems support these security features, the OS profile should explicitly define OS security capabilities (SB+FDE or none).
The OS security features define the maximum security level that can be set for an Edge Node that uses a given OS Profile.

Examples of OS Profile Resources
--------------------------------

An example of an OS profile resource:

.. code-block:: json

   {
   "architecture": "",
   "imageId": "",
   "imageUrl": "https://cloud-images.ubuntu.com/releases/22.04/release-20240912/ubuntu-22.04-server-cloudimg-amd64.img",
   "installedPackages": "",
   "kernelCommand": "",
   "name": "Ubuntu 22.04.5 LTS",
   "osResourceID": "os-8003fb73",
   "osType": "OPERATING_SYSTEM_TYPE_MUTABLE",
   "profileName": "ubuntu-22.04-lts-generic",
   "profileVersion": "",
   "repoUrl": "https://cloud-images.ubuntu.com/releases/22.04/release-20240912/ubuntu-22.04-server-cloudimg-amd64.img",
   "resourceId": "os-8003fb73",
   "securityFeature": "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
   "sha256": "5da0b3d37d02ca6c6760caa4041b4df14e08abc7bc9b2db39133eef8ee145f6d",
   "updateSources": null
   }

An example of an advanced OS profile is the following, which adds a package from Intel's release service and `mongoDb`.

.. code-block:: json

   {
       "name": "ZTP OS Profile",
       "osType":"OPERATING_SYSTEM_TYPE_MUTABLE",
       "updateSources": [
          "#ReleaseService\nTypes: deb\nURIs: https://files-rs.edgeorchestration.intel.com/files-edge-orch/repository\nSuites: 3.0\nComponents: main\nSigned-By:\n -----BEGIN PGP PUBLIC KEY BLOCK-----\n .\n mQINBGXE3tkBEAD85hzXnrq6rPnOXxwns35NfLaT595jJ3r5J17U/heOymT+K18D\n A6ewAwQgyHEWemW87xW6iqzRI4jB5m/fnFvl8wS1JmE8tZMYxLZDav91XfHNzV7J\n pgI+5zQ2ojD1yIwmJ6ILo/uPNGYxvdCaUX1LcqELXVRqmg64qEOEMfA6fjfUUocm\n bhx9Yf6dLYplJ3sgRTJQ0jY0LdAE8yicPXheGT+vtxWs/mM64KrIafbuGqNiYwC3\n e0cHWMPCLVe/lZcPjpaSpx03e0nVno50Xzod7PgVT+qI/l7STS0vT1TQK9IJPE1X\n 8auCEE0Z/sT+Q/6Zs4LiJnRZqBLoPFbyt7aZstS/zzYtX5qkv8iGaIo3CCxVN74u\n Gr4B01H3T55kZ4LE1pzrkB/9w4EDGC2KSyJg2vzqQP6YU8yeArJrcxhHUkNnVmjg\n GYeOiIpm+S4X6mD69T8r/ohIdQRggAEAMsiC+Lru6mtesKC8Ju0zdQIZWAiZiI5m\n u88UqT/idq/FFSdWb8zMTzE0doTVxZu2ScW99Vw3Bhl82w6lY689mqfHN6HAw3Oj\n CXGBd4IooalwjGCg27jNTZ5HiImK1Pi2wnlMdFyCXR4BPwjHMfEr1av3m4U9OkfB\n lVPHS35v0/y22e6FENg7kUiucY4ytKbbAMFeVIwVopHOhpDT29dUtfRsZwARAQAB\n tAVJbnRlbIkCTgQTAQoAOBYhBNBzdS76jrQWu9oBzLoBs/zr58/PBQJlxN7ZAhsD\n BQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJELoBs/zr58/PboUQAMAP8f2plI1W\n Zypc+CszsnRMUqDtwiqA56Q+ZTc6Tdb/P7Isw/lLno3LgL4fkip8Yxmql9zA4aXk\n EnNd3mPZcZdP2fogkgOd2gqbmcu604P3kUrlIrrWbSpyH+qmtwfyV09j7xucQ527\n +1gXGwVNXcqrmgUWlYTXD+SIeXosmWPvAJgF2PvI1ETTjXvpJryNaaekw1gmRYfs\n Jiq6LPGvPkyefcgXRD2lgTWnMRpAfiukIhZro0YLIqj3godF2qsmu3Xb6IhFFHFN\n eL9IVqJW/cEsFD21P5sC6FjQjV+Hu2jRTPFVHsTEiF34XC2LNDiVaZWtLIhWXjas\n FTwBw2vqGaWRUhAUWzmvfS97XGx5gDMdODNfwGfsFzDLfmuW7gFaT/qkc07KmaYb\n QobESazmA51UiEcxOwUZWsVwWM259YIc2TTndkCJf2P9rOXLCmOYbtOZqLcnpE4O\n tKkATRwwSP2uOyMmkwRbTwazR5ZMJ1tAO+ewl2guyDcJuk/tboh57AZ40JFRlzz4\n dKybtByZ2ntW/sYvXwR818/sUd2PjtRHekBq+bprw2JR2OwPhfAswBs9UzWNiSqd\n rA3NksCeuj/j6sSaqpXn123ZtlliZttviM+bvbSps5qJ5TbxHtSwr4H5gYSlHVT/\n IwqUfFrYNoQVDejlGkVgyjQYonEqk8eX\n =w4R+\n -----END PGP PUBLIC KEY BLOCK-----",
          "Types: deb\nURIs: https://repo.mongodb.org/apt/ubuntu\nSuites: jammy/mongodb-org/7.0\nComponents: multiverse\nSigned-By:\n -----BEGIN PGP PUBLIC KEY BLOCK-----\n Version: GnuPG v1\n .\n mQINBGPILWABEACqeWP/ktugdlWEyk7YTXo3n19+5Om4AlSdIyKv49vAlKtzCfMA\n QkZq3mfvjXiKMuLnL2VeElAJQIYcPoqnHf6tJbdrNv4AX2uI1cTsvGW7YS/2WNwJ\n C/+vBa4o+yA2CG/MVWZRbtOjkFF/W07yRFtNHAcgdmpIjdWgSnPQr9eIqLuWXIhy\n H7EerKsba227Vd/HfvKnAy30Unlsdywy7wi1FupzGJck0TPoOVGmsSpSyIQu9A4Z\n uC6TE/NcJHvaN0JuHwM+bQo9oWirGsZ1NCoVqSY8/sasdUc7T9r90MbUcH674YAR\n 8OKYVBzU0wch4VTFhfHZecKHQnZf+V4dmP9oXnu4fY0/0w3l4jaew7Ind7kPg3yN\n hvgAkBK8yRAbSu1NOtHDNiRoHGEQFgct6trVOvCqHbN/VToLNtGk0rhKGOp8kuSF\n OJ02PJPxF3/zHGP8n8khCjUJcrilYPqRghZC8ZWnCj6GJVg6WjwLi+hPwNMi8xK6\n cjKhRW3eCy5Wcn73PzVBX9f7fSeFDJec+IfS47eNkxunHAOUMXa2+D+1xSWgEfK0\n PClfyWPgLIXY2pGQ6v8l3A6P5gJv4o38/E1h1RTcO3H1Z6cgZLIORZHPyAj50SPQ\n cjzftEcz56Pl/Cyw3eMYC3qlbABBgsdeb6KB6G5dkNxI4or3MgmxcwfnkwARAQAB\n tDdNb25nb0RCIDcuMCBSZWxlYXNlIFNpZ25pbmcgS2V5IDxwYWNrYWdpbmdAbW9u\n Z29kYi5jb20+iQI+BBMBAgAoBQJjyC1gAhsDBQkJZgGABgsJCAcDAgYVCAIJCgsE\n FgIDAQIeAQIXgAAKCRAWDSa7F4W6OM+eD/sE7KbJyRNWyPCRTqqJXrXvyPqZtbFX\n 8sio0lQ8ghn4f7lmb7LnFroUsmBeWaYirM8O3b2+iQ9oj4GeR3gbRZsEhFXQfL54\n SfrmG9hrWWpJllgPP7Six+jrzcjvkf1TENqw4jRP+cJhuihH1Gfizo9ktwwoN9Yr\n m7vgh+focEEmx8dysS38ApLxKlUEfTsE9bYsClgqyY1yrt3v4IpGbf66yfyBHNgY\n sObR3sngDRVbap7PwNyREGsuAFfKr/Dr37HfrjY7nsn3vH7hbDpSBh+H7a0b/chS\n mM60aaG4biWpvmSC7uxA/t0gz+NQuC4HL+qyNPUxvyIO+TwlaXfCI6ixazyrH+1t\n F7Bj5mVsne7oeWjRrSz85jK3Tpn9tj3Fa7PCDA6auAlPK8Upbhuoajev4lIydNd2\n 70yO0idm/FtpX5a8Ck7KSHDvEnXpN70imayoB4Fs2Kigi2BdZOOdib16o5F/9cx9\n piNa7HotHCLTfR6xRmelGEPWKspU1Sm7u2A5vWgjfSab99hiNQ89n+I7BcK1M3R1\n w/ckl6qBtcxz4Py+7jYIJL8BYz2tdreWbdzWzjv+XQ8ZgOaMxhL9gtlfyYqeGfnp\n hYW8LV7a9pavxV2tLuVjMM+05ut/d38IkTV7OSJgisbSGcmycXIzxsipyXJVGMZt\n MFw3quqJhQMRsA==\n =gbRM\n -----END PGP PUBLIC KEY BLOCK---"
       ],
       "installedPackages": "net-tools\nmongodb-org",
       "repoUrl": "",
       "sha256": "de04d58dc5ccc4b9671c3627fb8d626fe4a15810bc1fe3e724feea761965f631",
       "profileName": "Ubuntu OS Profile"
   }

An example of an OS profile for Edge Microvisor Toolkit, the immutable OS, is as follows:

.. code-block:: json

   {
      "architecture":"",
      "imageId":"3.0.20250413.2200",
      "imageUrl":"files-edge-orch/repository/microvisor/non_rt/edge-readonly-3.0.20250413.2200.raw.gz",
      "installedPackages":"",
      "kernelCommand":"",
      "name":"Edge Microvisor Toolkit",
      "osResourceID":"os-d8460e9c",
      "osType":"OPERATING_SYSTEM_TYPE_IMMUTABLE",
      "profileName":"micovisor-nonrt",
      "profileVersion":"",
      "repoUrl":"files-edge-orch/repository/microvisor/non_rt/edge-readonly-3.0.20250413.2200.raw.gz",
      "resourceId":"os-d8460e9c",
      "securityFeature":"SECURITY_FEATURE_NONE",
      "sha256":"118820955d83566572343198ca6d9160c795639560863c82d702db563b6b76d5",
      "updateSources":null
   }


OS Profile Usage for Installation Process
-----------------------------------------

During provisioning the system uses ``imageUrl`` and ``sha256`` to obtain the
OS installation artifacts used to install this OS.

These files contain or link to the artifacts needed to install the OS, as well
as configuration options such as defaults for storage configuration and any
required scripts or other mechanisms (cloudinit, kickstart, preseed, or similar)
that help automate the installation.

Upgrades and Customization of Installed Software
------------------------------------------------

Once the base installation of mutable operating systems (e.g. Ubuntu) has completed,
customization of additional software to be installed happens by adding or removing
software packages to the ``installedPackages`` field.

Removing a package prevents that package from being installed on future systems using such OS profile and
being updated on existing ones that have it installed. Removing a package from the list will not uninstall
it from edge nodes where it's already installed.

In the current release, a Debian\* OS and APT repositories are used, thus the software needs to be
wrapped in .dpkg packaging and published to repositories specified in the `updateSources` list.

You must repackage third-party software in this format if you want to install it during provisioning.

Edge Infrastructure Manager API
-------------------------------

.. note:: You can also refer to the :ref:`Edge Infrastructure Manager API documentation <api/edge_infra_manager>`_.
