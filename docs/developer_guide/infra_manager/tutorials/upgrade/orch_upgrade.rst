Edge Orchestrator Upgrade Support
=================================

Edge Orchestrator, including the Infrastructure Manager, is expected to support seamless upgrades between its consecutive versions starting from versions 3.0 and 3.1.
To facilitate this, we provide mechanisms for both operators and developers:

- Operators can perform a full upgrade of the Orchestrator in the production environment.

- Developers can test modified infra charts to prevent breaking changes.

Upgradeability Requirements
---------------------------

The following requirements must be met to consider the system upgradeable:

1. The Orchestrator operator can perform an in-place upgrade of the Edge Infrastructure Manager applications.
2. Any new version of OS Profiles is automatically populated, and end users can upgrade their configured Edge Nodes in place.
3. Downtime is allowed for individual components or services during upgrade activities.
4. The Orchestrator upgrade must not impact the operational state of existing Edge Nodes.
5. If the upgrade fails, manual recovery is possible through rollback procedures.

Full Upgrade of the Edge Orchestrator Platform in Production Environment
------------------------------------------------------------------------

Starting with version 3.1, operators running an earlier version of Edge Orchestrator are expected
to be able to perform a seamless upgrade of the entire platform to the latest release.
The  `Orchestrator upgrade guide <TODO link>`_  provides the instructions for the operator to perform this upgrade.

.. note::

   Automatic rollback to version 3.0 is not supported in Edge Orchestrator v3.1.

Upgrade Edge Manageability Applications in Validation Environment
-----------------------------------------------------------------

To prevent developers from introducing breaking changes in the Infrastructure Manager,
all updates to the SB/NB APIs and database schema are validated during the CI phase through automated lint and integration checks.

To test the upgradeability of infra chart changes proposed in a pull request, we introduced the `upgrade-test <TODOlink>`_ workflow.
This workflow can be manually triggered on any pull request in the infra-charts repository, and is also executed periodically on the main branch to ensure continued compatibility.

In addition, developers can manually test an unreleased version of an Infrastructure Manager Helm chart in a locally deployed Edge Orchestrator.
To do so, users can modify the chart revision of the following applications:

- infra-managers
- infra-core
- infra-external
- infra-onboarding

Using the platform’s web UI, developers can then verify the upgraded Orchestrator by:

- Onboarding an Edge Node (EN)
- Monitoring the EN’s status
- Performing an EN upgrade

The following section provides step-by-step instructions for developers to upgrade the Edge Manageability applications and to verify
that the upgrade meets the above requirements.

Prerequisites
^^^^^^^^^^^^^

1. Edge Orchestrator v3.0 is deployed
2. You have obtained your JWT_TOKEN
3. A User, Organization, and Project have been created

.. note::

   This guide assumes that your Orchestrator is deployed in a kind environment.

Register and Onboard an EN
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform EN registration and onboarding by following the steps in the `EN registration guide <https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/set_up_edge_infra/edge_node_registration.html#register-edge-nodes-in-software-prod-name>`_.
On the ``Host`` page of the Web UI, observe the status of the EN until it is fully provisioned and onboarded.

Upgrade Infra Manager Version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To upgrade all Infrastructure Manager applications, log into your Edge Orchestrator and apply the following changes in the edge-managebility-framework repository cloned locally:

1. Add infra-charts repo to ``githubRepos`` in ``mage/Magefile.go``:

   .. code-block:: bash

      sed -i '/var githubRepos = \[\]/a\    "https://github.com/open-edge-platform/infra-charts",' mage/Magefile.go

2. Get the commit hash of the infra-charts repository with the Helm charts you want to test and set INFRA_CHARTS_REVISION env variable accordingly.
3. Replace ``targetRevision`` with the current git hash of the infra-charts commit:

   .. code-block:: bash

      sed -i "s/targetRevision: [a-zA-Z0-9.]\+/targetRevision: ${INFRA_CHARTS_REVISION}/" argocd/applications/templates/infra-core.yaml
      sed -i "s/targetRevision: [a-zA-Z0-9.]\+/targetRevision: ${INFRA_CHARTS_REVISION}/" argocd/applications/templates/infra-managers.yaml
      sed -i "s/targetRevision: [a-zA-Z0-9.]\+/targetRevision: ${INFRA_CHARTS_REVISION}/" argocd/applications/templates/infra-onboarding.yaml
      sed -i "s/targetRevision: [a-zA-Z0-9.]\+/targetRevision: ${INFRA_CHARTS_REVISION}/" argocd/applications/templates/infra-external.yaml

4. Replace ``chart: infra/charts/{{$appName}}`` with ``path: {{$appName}}``:

   .. code-block:: bash

      sed -i 's|chart: infra/charts/{{$appName}}|path: {{$appName}}|g' argocd/applications/templates/infra-core.yaml
      sed -i 's|chart: infra/charts/{{$appName}}|path: {{$appName}}|g' argocd/applications/templates/infra-managers.yaml
      sed -i 's|chart: infra/charts/{{$appName}}|path: {{$appName}}|g' argocd/applications/templates/infra-onboarding.yaml
      sed -i 's|chart: infra/charts/{{$appName}}|path: {{$appName}}|g' argocd/applications/templates/infra-external.yaml

5. Replace ``repoURL`` with git URL of infra-charts repository:

   .. code-block:: bash

      sed -i 's|repoURL: {{ required "A valid chartRepoURL entry required!" .Values.argo.chartRepoURL }}|repoURL: https://github.com/open-edge-platform/infra-charts.git|g' argocd/applications/templates/infra-core.yaml
      sed -i 's|repoURL: {{ required "A valid chartRepoURL entry required!" .Values.argo.chartRepoURL }}|repoURL: https://github.com/open-edge-platform/infra-charts.git|g' argocd/applications/templates/infra-managers.yaml
      sed -i 's|repoURL: {{ required "A valid chartRepoURL entry required!" .Values.argo.chartRepoURL }}|repoURL: https://github.com/open-edge-platform/infra-charts.git|g' argocd/applications/templates/infra-onboarding.yaml
      sed -i 's|repoURL: {{ required "A valid chartRepoURL entry required!" .Values.argo.chartRepoURL }}|repoURL: https://github.com/open-edge-platform/infra-charts.git|g' argocd/applications/templates/infra-external.yaml

6. Commit the changes locally.
7. Apply updates to your deployment:

   .. code-block:: bash

      mage deploy:orchLocal dev
      mage deploy:waitUntilComplete

8. Verify sync status of the applications:

   .. code-block:: bash

      kubectl -n dev get applications infra-core -o yaml
      kubectl -n dev get applications infra-managers -o yaml
      kubectl -n dev get applications infra-external -o yaml
      kubectl -n dev get applications infra-onboarding -o yaml

Force Upgrade of Infra Manager Applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If changes to the Helm chart implementation do not result in modifications to the rendered Kubernetes manifests, the application update will not be triggered automatically.
To force an update of the application, follow these steps:

1. Log into argo:

   .. code-block:: bash

      mage argo:login

2. Synchronize applications:

   .. code-block:: bash

      argocd app sync dev/infra-managers dev/infra-core dev/infra-external dev/infra-onboarding

3. Verify sync status of the applications:

   .. code-block:: bash

      kubectl -n dev get applications infra-core -o yaml
      kubectl -n dev get applications infra-managers -o yaml
      kubectl -n dev get applications infra-external -o yaml
      kubectl -n dev get applications infra-onboarding -o yaml

Validate Upgraded Infrastructure Manager
----------------------------------------

Developers should be able to verify that the Edge Orchestrator upgrade in the validation environment was successful. After the upgrade, all applications should appear in a Healthy state.

   .. code-block:: bash

      kubectl -n dev get applications

The functionality of the Edge Manager can be further verified by confirming it is able to discover new OS profiles and perform EN OS updates.

Verify OS Profiles
^^^^^^^^^^^^^^^^^^

After the Edge Manager upgrade, OS Profiles should still be automatically populated in the Web UI.

To verify if the OS profiles are automatically repopulated follow the steps:

1. Log into the web UI for the deployment.
2. Go to ``Settings`` and open the ``OS Profiles`` tab to see all OS profiles.
3. Identify the ``ResourceID`` of an unused profile:

   .. code-block:: bash

      CLUSTER_FQDN=edgeorchestration.example.com
      PROJ_NAME=sample-project

      curl -X GET \
         -H "Authorization: Bearer ${JWT_TOKEN}" \
         https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/os

4. Use the OS profile’s ResourceID to delete an unused profile via an API call (e.g., RESOURCE_ID):

   .. code-block:: bash

      RESOURCE_ID=os-cd58ac2

      curl -v -X DELETE "https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/os/${RESOURCE_ID}" \
         -H "accept: application/json" \
         -H "Authorization: Bearer ${JWT_TOKEN}"

Soon, the deleted OS profile should be rediscovered by OS Resource Manager and displayed again in the Web UI. The OS profiles are updated by OS Resource Manager every 60 minutes.

Trigger EN Update
^^^^^^^^^^^^^^^^^

An update of the onboarded EN OS will test if the EN and the Infrastructure Manager are still fully functional after the Edge Orchestrator upgrade.

1. Manually add an OS Profile using the latest EMT image details, for example:

   .. code-block:: bash

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
         https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/os

2. Identify your EN instance ResourceID in the list of instances and set ``INSTANCE`` environment variable accordingly:

   .. code-block:: bash

      curl -X GET \
         -H "Authorization: Bearer ${JWT_TOKEN}" \
         https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/instances

3. Identify the OS Profile ResourceID in the list of profiles and set ``OSPROFILE`` environment variable accordingly.

   .. code-block:: bash

      curl -X GET \
         -H "Authorization: Bearer ${JWT_TOKEN}" \
         https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/os

4. Update the EN instance's ``desired_os`` to point to the OS profile:

   .. code-block:: bash

      curl -X PATCH \
         -H "Accept: application/json" \
         -H "Authorization: Bearer ${JWT_TOKEN}" \
         --data '{"osId":  "${OSPROFILE}"}' \
         --header "Content-Type: application/json" \
         https://api.${CLUSTER_FQDN}/v1/projects/${PROJ_NAME}/compute/instances/${INSTANCE}

5. Observe that the ``OS upgrade available`` note appears on the host page.

6. Schedule a maintenance window for your EN by following the `guide on maintenance window creation <https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/additional_howtos/host_schedule_main.html#schedule-maintenance-for-configured-and-active-hosts>`_.

7. Monitor the ``Update`` status to confirm the update was completed. The ``No new updates available`` status message indicates a successful update.
