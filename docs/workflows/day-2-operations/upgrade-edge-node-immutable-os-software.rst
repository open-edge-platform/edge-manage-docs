.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Upgrade Edge Node Immutable OS Software
========================================

Quick-start guide to upgrade edge nodes with immutable OS software using ``orch-cli``.

Prerequisite
------------

.. code-block:: bash

   # Set up CLI (one-time per workstation)
   orch-cli config set api-endpoint https://api.<CLUSTER_DOMAIN>
   orch-cli config set project <PROJECT_NAME>

Replace ``<CLUSTER_DOMAIN>`` (e.g., ``cluster.onprem``) and ``<PROJECT_NAME>`` (e.g., ``default``) with your values.

Step 1 – Fetch OS Profiles (Optional)
----------------------------------

First, identify available OS profile to use in the Upgrade of immutable OS, if upgrade is to be done for a known and available OS version of a immutable OS software:

.. code-block:: bash

   # List all available OS profiles
   orch-cli list osprofiles

Note the ``profileName`` value (e.g., ``Edge Microvisor Toolkit 3.0.20251112``)

Step 2 – Create a yaml file with the OS Update Policy configuration
-----------------------------------------------

See the following examples of OS Update Policy configuration for immutable OS:

   This is for upgrading to a particular known and available OS version of a immutable OS software.
    .. code-block:: yaml

        appVersion: apps/v1
        spec:
            name: "policy1"
            description: "immutable OS update- target OS"
            updatePolicy: "UPDATE_POLICY_TARGET"
            targetOs: "<DESIRED_OS_PROFILE_NAME>"
   Replace ``<DESIRED_OS_PROFILE_NAME>`` (e.g., ``Edge Microvisor Toolkit 3.0.20251112``) with your values. <DESIRED_OS_PROFILE_NAME> should be one of the available OS profiles noted in Step 1.

   This is for upgrading to the latest available OS image version of a immutable OS software.
    .. code-block:: yaml

        appVersion: apps/v1
        spec:
            name: "policy2"
            description: "immutable OS update - latest OS"
            updatePolicy: "UPDATE_POLICY_LATEST"

Step 3 – Create the OS Update Policy using the created yaml file, and locate its resource ID.
---------------------------------------------------------------------------------------------

    .. code-block:: bash

        orch-cli create osupdatepolicy <POLICY_YAML_FILE_PATH>
        orch-cli list osupdatepolicy

Replace ``<POLICY_YAML_FILE_PATH>`` (e.g., ``./policy1.yaml``) with your values. From Step 2, choose the yaml file based on whether you want to upgrade to a particular known and available OS version of a immutable OS software or to the latest available OS image version of a immutable OS software.
Note the ``Resource ID`` value (e.g., ``osupdatepolicy-6204eb4a``) for the created OS Update Policy.

Step 4 – Locate the resource ID of your host and link your OS Update Policy with it.
------------------------------------------------------------------------------------

    .. code-block:: bash

        orch-cli list host
        orch-cli set host <HOST_RESOURCE_ID> -u <OS_UPDATE_POLICY_RESOURCE_ID>

Replace ``<HOST_RESOURCE_ID>`` (e.g., ``host-1234abcd``) and ``<OS_UPDATE_POLICY_RESOURCE_ID>`` (e.g., ``osupdatepolicy-6204eb4a``) with your values.

Step 5 – Schedule Immutable OS Update by scheduling a maintenance window.
-------------------------------------------------------------------------

      .. code-block:: bash
   
         orch-cli create schedules <SCHEDULE_NAME> --timezone <TIMEZONE> --frequency-type single --maintenance-type osupdate --target <HOST_RESOURCE_ID> --start-time <START_TIME> --end-time <END_TIME>

Replace ``<SCHEDULE_NAME>`` (e.g., ``schedule1``), ``<TIMEZONE>`` (e.g., ``UTC``), ``<HOST_RESOURCE_ID>`` (e.g., ``host-1234abcd``), ``<START_TIME>`` (e.g., ``2024-12-01T00:00:00Z``) and ``<END_TIME>`` (e.g., ``2024-12-01T04:00:00Z``) with your values.
On the scheduled time, the host will be automatically rebooted to apply the OS update. You can check the status of the schedule and the host to confirm that the update has been applied successfully. Upon successful completion of the update, the relevant Edge Microvisor Toolkit version information will be displayed for the updated host.