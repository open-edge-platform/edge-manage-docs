Upgrading Edge Orchestrator v3.0 to v3.1
========================================

Edge Orchestrator is expected to support seamless upgrades of Infra Manager helm charts between versions 3.0.0 and 3.1. Therefore, intermittent changes in the infra-charts repository must be verified against Edge Orchestrator version 3.0 to ensure they do not introduce breaking changes and that the Orchestrator remains fully functional.

Changes in the SB and NB APIs, as well as database schema updates, are validated during the CI phase through a set of automated lint and integration checks.

To test the upgradeability of infra charts with changes proposed in a given infra-charts pull request, we introduced the `upgrade-test <link>`_ workflow. This test can be manually triggered on any PR in the infra-charts repository, and is also executed periodically on the main branch to ensure long-term compatibility.

In addition, users can manually test a newly released version of an Infra helm chart in a deployed Edge Orchestrator via Argo CD's web UI. Specifically, users can modify the Helm chart version in the following Argo CD Infra manager applications of the Edge Manageability Framework:

- infra-managers
- infra-core
- infra-external
- infra-onboarding

Through the platform's web UI, the user can verify the upgraded Orchestrator by onboarding an Edge Node (EN), monitoring its status, and performing an EN upgrade.

Upgradeability Requirements
---------------------------

The following requirements must be met to consider the system upgradeable:

1. The Orchestrator operator can perform an in-place upgrade of the Edge Infrastructure Manager applications.
2. Any new version of OS Profiles is automatically populated, and end users can upgrade their configured Edge Nodes in place.
3. Downtime is allowed for individual components or services during upgrade activities.
4. The Orchestrator upgrade must not impact the operational state of existing Edge Nodes.
5. If the upgrade fails, manual recovery is possible through rollback procedures.

Steps to Upgrade Edge Manageability Apps
----------------------------------------

The following section provides step-by-step instructions to perform an upgrade of one of the Edge Manageability applications - the infra-managers application - and to verify the above requirements.

Prerequisites
^^^^^^^^^^^^^

1. Deploy an Edge Orchestrator v3.0
2. Obtain your JWT_TOKEN
3. Create User, Organization, and Project
4. Log into the web UI for the deployment, go to the ``OS Profiles`` tab in ``Settings``, and take note of the displayed OS profiles.

Register and Onboard an EN
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform EN registration and onboarding by following the steps in the `EN registration guide <https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/set_up_edge_infra/edge_node_registration.html#register-edge-nodes-in-software-prod-name>`_.
On the ``Hosts`` page of the Web UI, observe the status of the EN until it is fully provisioned and onboarded.

Upgrade Infra Manager Version in Argo CD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Log into the Argo CD UI for your deployment
2. Disable autosync in the ``root-app`` application

.. image:: images/disable-autosync.png
   :alt: Disable autosync in Argo CD

3. Search for the infra application you want to upgrade (e.g., ``infra-managers``)
4. Open its manifest and allow editing
5. Change the version of the application's Helm chart and save

.. image:: images/edit-manifest.png
   :alt: Edit Helm chart version

6. Wait until the ``infra-managers`` app is redeployed (usually up to a minute). Meanwhile, observe the EN status — it should not change.

Verify OS Profiles
^^^^^^^^^^^^^^^^^^

To verify the OS profiles are up to date, log into the web UI for the deployment and find the ``OS Profiles`` tab in ``Settings``.

Delete an OS profile using the API call and its ResourceID (RESOURCE_ID)::

   CLUSTER_FQDN=edgeorchestration.example.com
   PROJ_NAME=sample-project
   RESOURCE_ID=os-cd58ac2

   curl -v -X DELETE "https://api.${CLUSTER_FQDN}/v1/projects/sample-project/compute/os/${RESOURCE_ID}" \
        -H "accept: application/json" \
        -H "Authorization: Bearer ${JWT_TOKEN}"

Soon, the deleted OS profile should be rediscovered by OS Resource Manager and displayed in the Web UI.

Trigger EN Upgrade
^^^^^^^^^^^^^^^^^^

1. Manually add an OS Profile using the latest EMT, for example::

   OS_RESOURCES='{
     "architecture": "x86_64",
     "imageId": "3.0.20250514.2200",
     "imageUrl": "files-edge-orch/repository/microvisor/non_rt/edge-readonly-3.0.20250514.2200.raw.gz",
     "installedPackages": "",
     "kernelCommand": "",
     "name": "Edge Microvisor Toolkit 3.0.20250514",
     "osType": "OPERATING_SYSTEM_TYPE_IMMUTABLE",
     "profileName": "microvisor-nonrt",
     "repoUrl": "files-edge-orch/repository/microvisor/non_rt/edge-readonly-3.0.20250514.2200.raw.gz",
     "securityFeature": "SECURITY_FEATURE_NONE",
     "sha256": "f56ba0b338434813b70ecd8b81dec9a8f389a344ba868454825b4442217f6428",
     "updateSources": [],
     "osProvider": "OPERATING_SYSTEM_PROVIDER_INFRA"
   }'

   curl -X POST \
        -H "Accept: application/json" \
        -H "Authorization: Bearer ${JWT_TOKEN}" \
        --data "$OS_RESOURCES" \
        --header "Content-Type: application/json" \
        https://api.${CLUSTER_FQDN}/v1/projects/intel-proj/compute/os

2. Identify your EN instance ResourceID::

   curl -X GET \
        -H "Authorization: Bearer ${JWT_TOKEN}" \
        https://api.${CLUSTER_FQDN}/v1/projects/proj/compute/instances

3. Identify the OS Profile OSResourceID and set ``OSPROFILE`` environment variable accordingly.

4. Update the EN instance ``desired_os`` to point to the OS Profile::

   curl -X PATCH \
        -H "Accept: application/json" \
        -H "Authorization: Bearer ${JWT_TOKEN}" \
        --data '{"osId":  "${OSPROFILE}"}' \
        --header "Content-Type: application/json" \
        https://api.${CLUSTER_FQDN}/v1/projects/itep/compute/instances/inst-2c301bd4

5. Observe ``Upgrade available`` note on the Host page

.. image:: images/upgrade-available.png
   :alt: Upgrade available note

6. Schedule a maintenance window for your EN by following the `guide on maintenance window creation <https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/additional_howtos/host_schedule_main.html#schedule-maintenance-for-configured-and-active-hosts>`_

7. Observe the status of the EN to confirm the update was completed

.. image:: images/en-status-updated.png
   :alt: Updated EN status

Perform Version Rollback
------------------------

In case an upgrade was unsuccessful, it is important that the Orchestrator operator can perform a manual rollback. This is possible through the Argo CD UI by following these steps:

1. Log into the Argo CD UI
2. Search for and select the application you want to roll back
3. Open the ``History and Rollback`` tab
4. Select the entry with the previous version of your application
5. Select ``Rollback`` from the options menu
6. Observe the application version change in the manifest
