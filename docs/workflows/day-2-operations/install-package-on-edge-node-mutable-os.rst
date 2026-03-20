.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Install package on Edge Node Mutable OS
========================================

Quick-start guide to install packages on edge nodes with mutable OS software using ``orch-cli``.

Prerequisite
------------

.. code-block:: bash

   # Set up CLI (one-time per workstation)
   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli config set project <PROJECT_NAME>

Replace ``<CLUSTER_DOMAIN>`` (e.g., ``cluster.onprem``) and ``<PROJECT_NAME>`` (e.g., ``default``) with your values.

Step 1 – Create a yaml file with the OS Update Policy configuration
-------------------------------------------------------------------

See the following examples of OS Update Policy configuration for mutable OS:

   This is for upgrading mutable OS with new Debian Packages.
    .. code-block:: yaml

        appVersion: apps/v1
        spec:
            name: "policy1"
            description: "mutable OS update"
            updatePolicy: "UPDATE_POLICY_TARGET"
            updateSources: "<UPDATE_SOURCES>"
            updatePackages: "<UPDATE_PACKAGES>"
   Replace ``<UPDATE_SOURCES>`` (e.g., ``Types: deb URIs: https://repo.mongodb.org/apt/ubuntu Suites: jammy/mongodb-org/7.0 Components: multiverse Signed-By: -----BEGIN PGP PUBLIC KEY BLOCK----- Version: GnuPG v1 . mQINBGPILWABEACqeWP/ktugdlWEyk7YTXo3n19+5Om4AlSdIyKv49vAlKtzCfMA QkZq3mfvjXiKMuLnL2VeElAJQIYcPoqnHf6tJbdrNv4AX2uI1cTsvGW7YS/2WNwJ C/+vBa4o+yA2CG/MVWZRbtOjkFF/W07yRFtNHAcgdmpIjdWgSnPQr9eIqLuWXIhy H7EerKsba227Vd/HfvKnAy30Unlsdywy7wi1FupzGJck0TPoOVGmsSpSyIQu9A4Z uC6TE/NcJHvaN0JuHwM+bQo9oWirGsZ1NCoVqSY8/sasdUc7T9r90MbUcH674YAR 8OKYVBzU0wch4VTFhfHZecKHQnZf+V4dmP9oXnu4fY0/0w3l4jaew7Ind7kPg3yN hvgAkBK8yRAbSu1NOtHDNiRoHGEQFgct6trVOvCqHbN/VToLNtGk0rhKGOp8kuSF OJ02PJPxF3/zHGP8n8khCjUJcrilYPqRghZC8ZWnCj6GJVg6WjwLi+hPwNMi8xK6 cjKhRW3eCy5Wcn73PzVBX9f7fSeFDJec+IfS47eNkxunHAOUMXa2+D+1xSWgEfK0 PClfyWPgLIXY2pGQ6v8l3A6P5gJv4o38/E1h1RTcO3H1Z6cgZLIORZHPyAj50SPQ cjzftEcz56Pl/Cyw3eMYC3qlbABBgsdeb6KB6G5dkNxI4or3MgmxcwfnkwARAQAB tDdNb25nb0RCIDcuMCBSZWxlYXNlIFNpZ25pbmcgS2V5IDxwYWNrYWdpbmdAbW9u Z29kYi5jb20+iQI+BBMBAgAoBQJjyC1gAhsDBQkJZgGABgsJCAcDAgYVCAIJCgsE FgIDAQIeAQIXgAAKCRAWDSa7F4W6OM+eD/sE7KbJyRNWyPCRTqqJXrXvyPqZtbFX 8sio0lQ8ghn4f7lmb7LnFroUsmBeWaYirM8O3b2+iQ9oj4GeR3gbRZsEhFXQfL54 SfrmG9hrWWpJllgPP7Six+jrzcjvkf1TENqw4jRP+cJhuihH1Gfizo9ktwwoN9Yr m7vgh+focEEmx8dysS38ApLxKlUEfTsE9bYsClgqyY1yrt3v4IpGbf66yfyBHNgY sObR3sngDRVbap7PwNyREGsuAFfKr/Dr37HfrjY7nsn3vH7hbDpSBh+H7a0b/chS mM60aaG4biWpvmSC7uxA/t0gz+NQuC4HL+qyNPUxvyIO+TwlaXfCI6ixazyrH+1t F7Bj5mVsne7oeWjRrSz85jK3Tpn9tj3Fa7PCDA6auAlPK8Upbhuoajev4lIydNd2 70yO0idm/FtpX5a8Ck7KSHDvEnXpN70imayoB4Fs2Kigi2BdZOOdib16o5F/9cx9 piNa7HotHCLTfR6xRmelGEPWKspU1Sm7u2A5vWgjfSab99hiNQ89n+I7BcK1M3R1 w/ckl6qBtcxz4Py+7jYIJL8BYz2tdreWbdzWzjv+XQ8ZgOaMxhL9gtlfyYqeGfnp hYW8LV7a9pavxV2tLuVjMM+05ut/d38IkTV7OSJgisbSGcmycXIzxsipyXJVGMZt MFw3quqJhQMRsA== =gbRM -----END PGP PUBLIC KEY BLOCK---``) and ``<UPDATE_PACKAGES>`` (e.g., ``tree``) with your values.

   This is for updating mutable OS software with a kernel command.
    .. code-block:: yaml

        appVersion: apps/v1
        spec:
            name: "policy1"
            description: "mutable OS update"
            updatePolicy: "UPDATE_POLICY_TARGET"
            updateKernelCommand: "<UPDATE_KERNEL_COMMAND>"
   Replace ``<UPDATE_KERNEL_COMMAND>`` (e.g., ``hugepages=2``) with your values.

Step 2 – Create the OS Update Policy using the created yaml file, and locate its resource ID.
---------------------------------------------------------------------------------------------

    .. code-block:: bash

        orch-cli create osupdatepolicy <POLICY_YAML_FILE_PATH>
        orch-cli list osupdatepolicy

Replace ``<POLICY_YAML_FILE_PATH>`` (e.g., ``./policy1.yaml``) with your values. From Step 1, choose the yaml file based on whether you want to 
- upgrade mutable OS with new Debian Package(s) or 
- update mutable OS software with a kernel command.
Note the ``Resource ID`` value (e.g., ``osupdatepolicy-6204eb4a``) for the created OS Update Policy.

Step 3 – Locate the resource ID of your host and link your OS Update Policy with it.
------------------------------------------------------------------------------------

    .. code-block:: bash

        orch-cli list host
        orch-cli set host <HOST_RESOURCE_ID> -u <OS_UPDATE_POLICY_RESOURCE_ID>

Replace ``<HOST_RESOURCE_ID>`` (e.g., ``host-1234abcd``) and ``<OS_UPDATE_POLICY_RESOURCE_ID>`` (e.g., ``osupdatepolicy-6204eb4a``) with your values.

Step 4 – Schedule Mutable OS Update by scheduling a maintenance window.
-------------------------------------------------------------------------

      .. code-block:: bash
   
         orch-cli create schedules <SCHEDULE_NAME> --timezone <TIMEZONE> --frequency-type single --maintenance-type osupdate --target <HOST_RESOURCE_ID> --start-time <START_TIME> --end-time <END_TIME>

Replace ``<SCHEDULE_NAME>`` (e.g., ``schedule1``), ``<TIMEZONE>`` (e.g., ``UTC``), ``<HOST_RESOURCE_ID>`` (e.g., ``host-1234abcd``), ``<START_TIME>`` (e.g., ``2024-12-01T00:00:00Z``) and ``<END_TIME>`` (e.g., ``2024-12-01T04:00:00Z``) with your values.
On the scheduled time, the host will be automatically rebooted to apply the OS update. You can check the status of the schedule and the host to confirm that the update has been applied successfully. Upon successful completion of the update, the relevant debian package will be installed for the updated host.

Please note that the above steps is for either 
 - adding a new debian package to exisitng mutable OS software or 
 - updating mutable OS software with a kernel command. 

But if you want to update all the exisiting packages in the mutable OS to the latest version, you can execute only step 4 mentioned above without executing steps 1, 2 and 3.