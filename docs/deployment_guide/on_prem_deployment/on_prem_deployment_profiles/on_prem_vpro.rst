vPro Deployment Profile
=======================

This guide provides step-by-step instructions for deploying the onprem
orchestrator, onboarding vPro-enabled edge nodes in Non-Interactive Onboarding
(NIO) mode, and performing AMT activation and power operations.

Prerequisites
-------------

Make sure you familiarize yourself with the following documentation:

* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/system_requirements_on_prem_orch`
* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/index`
* :doc:`/deployment_guide/on_prem_deployment/on_prem_get_started/on_prem_certs`

System Requirements
~~~~~~~~~~~~~~~~~~~

* vPro-enabled Edge Node with fresh Ubuntu 24.04.02 LTS server
* Access to orchestrator cluster with kubectl
* orch-cli and edge-manageability-framework repositories cloned

Part 1: Orchestrator Deployment
-------------------------------

Configure On-Prem Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Edit ``onprem.env`` with your deployment-specific values:

.. code-block:: shell

   export ORCH_INSTALLER_PROFILE=onprem-vpro

Install Orchestrator
~~~~~~~~~~~~~~~~~~~~

Run the installer:

.. code-block:: shell

   ./onprem_installer.sh

Part 2: Multi-Tenancy Setup
---------------------------

Clone Edge Manageability Framework
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clone the repository:

.. code-block:: shell

   git clone https://github.com/open-edge-platform/edge-manageability-framework
   cd edge-manageability-framework

Create Organization, Project, and Users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create organization:

.. code-block:: shell

   mage tenantUtils:createOrg intel-infra

Create project within the organization:

.. code-block:: shell

   mage tenantUtils:createProjectInOrg intel-infra infra-proj-1

Create Edge Infrastructure users:

.. code-block:: shell

   mage tenantUtils:createEdgeInfraUsers intel-infra infra-proj-1 edgeInfra

Part 3: Configure orch-cli
--------------------------

Clone orch-cli Repository
~~~~~~~~~~~~~~~~~~~~~~~~~

Clone orch-cli repository:

.. code-block:: shell

   git clone https://github.com/open-edge-platform/orch-cli
   cd orch-cli
   make build
Set Environment Variables
~~~~~~~~~~~~~~~~~~~~~~~~~

Set required environment variables:

.. code-block:: shell

   export CLUSTER_FQDN=cluster.onprem
   export EP=https://api.$CLUSTER_FQDN
   export PROJECT_NAME=infra-proj-1
   export ORCH_DEFAULT_PASSWORD="ChangeMeOn1stLogin!"
   export ORCH_DEFAULT_USER=edgeinfra-api-user

Login to orch-cli
~~~~~~~~~~~~~~~~~

Logout first (if previously logged in):

.. code-block:: shell

   ./orch-cli logout

Login with credentials:

.. code-block:: shell

   ./orch-cli login $ORCH_DEFAULT_USER $ORCH_DEFAULT_PASSWORD \
     --keycloak https://keycloak.$CLUSTER_FQDN/realms/master

Configure project and API endpoint:

.. code-block:: shell

   ./orch-cli config set project infra-proj-1
   ./orch-cli config set api-endpoint $EP

Disable Provisioning Feature
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
   Component status service is not included in this deployment.

Disable provisioning feature:

.. code-block:: shell

   ./orch-cli config set \
     orchestrator.features.edge-infrastructure-manager.provisioning.installed \
     false

Verify feature configuration:

.. code-block:: shell

   ./orch-cli list feature

Expected output should show:

.. code-block:: text

   orchestrator.features.edge-infrastructure-manager.oob.installed true
   orchestrator.features.edge-infrastructure-manager.onboarding.installed true

Part 4: Host Pre-Registration (NIO Mode)
----------------------------------------

Create Host Configuration CSV
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a file named ``hostconfig.csv`` with the following content:

.. code-block:: text

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,\
   CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   W0202828L01S007,,,,,,,,,,,

.. note::
   Only the Serial number is required for NIO mode.

Register Host via orch-cli
~~~~~~~~~~~~~~~~~~~~~~~~~~

Import the host configuration:

.. code-block:: shell

   ./orch-cli create host --import-from-csv hostconfig.csv

Verify host registration:

.. code-block:: shell

   ./orch-cli get hosts --project infra-proj-1

Part 5: Edge Node Setup
-----------------------

Download Installer on Edge Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the vPro-enabled Edge Node, download the installer:

.. code-block:: shell

   wget https://tinkerbell-haproxy.cluster.onprem/tink-stack/Installer \
     --no-check-certificate --no-proxy
   chmod +x Installer

Execute Installer on Edge Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the installer with sudo privileges:

.. code-block:: shell

   sudo ./Installer

The installer will automatically configure:

* Ubuntu system updates
* System configuration
* Device discovery agent
* LMS and RPC service for AMT operations
* Node agent
* Platform Manageability Agent (PMA)


Verify Agent Status
~~~~~~~~~~~~~~~~~~~

Check service status:

.. code-block:: shell

   sudo systemctl status device-discovery-agent
   sudo systemctl status node-agent
   sudo systemctl status platform-manageability-agent

Monitor agent logs in real-time:

.. code-block:: shell

   sudo journalctl -u device-discovery-agent -f
   sudo journalctl -u node-agent -f
   sudo journalctl -u platform-manageability-agent -f

Press ``Ctrl+C`` to stop following logs.

Verify Host Status in orch-cli
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check host registration status:

.. code-block:: shell

   ./orch-cli get hosts --project infra-proj-1

Host status should show "Running" once all agents are healthy.
If status shows "Error", review the agent logs for troubleshooting.

Part 6: AMT Activation and Power Operations
-------------------------------------------

Provision AMT
~~~~~~~~~~~~~

Activate AMT on the host:

.. code-block:: shell

   ./orch-cli set host <host-id> --amt-state provisioned

.. note::
   Replace ``<host-id>`` with your actual host resource ID (e.g., ``host-d398d9c4``).

Power Operations
~~~~~~~~~~~~~~~~

Power off the host:

.. code-block:: shell

   ./orch-cli set host <host-id> --power off

Power on the host:

.. code-block:: shell

   ./orch-cli set host <host-id> --power on

Reset the host:

.. code-block:: shell

   ./orch-cli set host <host-id> --power reset

Example power cycle sequence:

.. code-block:: shell

   ./orch-cli set host <host-id> --power off
   sleep 5
   ./orch-cli set host <host-id> --power on

Unprovision AMT
~~~~~~~~~~~~~~~

Deactivate AMT when no longer needed:

.. code-block:: shell

   ./orch-cli set host <host-id> --amt-state unprovisioned

Part 7: Host Cleanup (Workaround for Regression)
------------------------------------------------

.. note::
   Host deletion via orch-cli and APIv2 currently has a regression with onboarding manager
   Use the following workaround for manual cleanup.

Delete Host from Database
~~~~~~~~~~~~~~~~~~~~~~~~~

Delete the host record from the inventory database:

.. code-block:: shell

   kubectl exec -n orch-database postgresql-cluster-1 -c postgres -- \
     psql -U postgres -d orch-infra-inventory \
     -c "DELETE FROM host_resources WHERE resource_id = '<host-id>';"

.. note::
   Replace ``<host-id>`` with your actual host resource ID (e.g., ``host-3b114661``).

Delete Keycloak Client Credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Save the following script as ``delete-keycloak-client.sh``:

.. code-block:: bash

   #!/bin/bash

   # Get admin credentials and token
   KEYCLOAK_ADMIN_PASSWORD=$(kubectl get secret platform-keycloak \
     -n orch-platform -o jsonpath='{.data.admin-password}' | base64 -d)
   ADMIN_TOKEN=$(curl -k -X POST \
     "https://keycloak.cluster.onprem/realms/master/protocol/openid-connect/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=admin" -d "password=${KEYCLOAK_ADMIN_PASSWORD}" \
     -d "grant_type=password" -d "client_id=admin-cli" | jq -r '.access_token')

   # Set your client ID and tenant ID
   CLIENT_ID="edgenode-<UUID>"
   TENANT_ID="<project-tenant-id>"

   # Get the client UUID
   CLIENT_UUID=$(curl -k -X GET \
     "https://keycloak.cluster.onprem/admin/realms/master/clients?clientId=${CLIENT_ID}" \
     -H "Authorization: Bearer ${ADMIN_TOKEN}" | jq -r '.[0].id')

   echo "Client UUID: $CLIENT_UUID"

   # Verify client description
   echo "Client description:"
   curl -k -X GET \
     "https://keycloak.cluster.onprem/admin/realms/master/clients/${CLIENT_UUID}" \
     -H "Authorization: Bearer ${ADMIN_TOKEN}" | jq -r '.description'

   # Delete the client
   curl -k -X DELETE \
     "https://keycloak.cluster.onprem/admin/realms/master/clients/${CLIENT_UUID}" \
     -H "Authorization: Bearer ${ADMIN_TOKEN}"

   echo "Client ${CLIENT_ID} deleted successfully"

   # Verify deletion
   echo "Verifying deletion:"
   curl -k -X GET \
     "https://keycloak.cluster.onprem/admin/realms/master/clients?clientId=${CLIENT_ID}" \
     -H "Authorization: Bearer ${ADMIN_TOKEN}" | jq '.'

Make the script executable and run it:

.. code-block:: shell

   chmod +x delete-keycloak-client.sh
   ./delete-keycloak-client.sh

.. important::
   Replace the following placeholders in the script:

   * ``<UUID>``: The edge node's DMI UUID
     (e.g., ``94e00576-d750-3391-de61-48210b50d802``)
   * ``<project-tenant-id>``: Your project's tenant ID
     (e.g., ``f3d1dad8-2372-4b72-8eaf-fef6669cdd01``)

Troubleshooting
---------------

Check Host Status
~~~~~~~~~~~~~~~~~

.. code-block:: shell

   ./orch-cli get host <host-id> --project infra-proj-1

View Recent Agent Logs
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: shell

   sudo journalctl -u device-discovery-agent --since "10 minutes ago"
   sudo journalctl -u node-agent --since "10 minutes ago"
   sudo journalctl -u platform-manageability-agent --since "10 minutes ago"

Verify AMT Status
~~~~~~~~~~~~~~~~~

.. code-block:: shell

   ./orch-cli get host <host-id> --project infra-proj-1 -o json | jq '.status.amtState'

Check Power State
~~~~~~~~~~~~~~~~~

.. code-block:: shell

   ./orch-cli get host <host-id> --project infra-proj-1 -o json | jq '.status.powerState'

List All Hosts in Project
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: shell

   ./orch-cli get hosts --project infra-proj-1

Check Feature Flags
~~~~~~~~~~~~~~~~~~~

.. code-block:: shell

   ./orch-cli list feature

Important Notes
---------------

.. important::

   #. Replace all placeholder values:

      * ``<host-id>``: Actual host resource ID (e.g., ``host-d398d9c4``)
      * ``<UUID>``: Edge node's DMI UUID
      * ``<project-tenant-id>``: Your project's tenant ID

   #. orch-cli must be configured and logged in **before** performing host registration.

   #. Ensure all agents report healthy status before attempting power operations.

   #. Host deletion via orch-cli/APIv2 has a known regression. Use the database
      and Keycloak cleanup workaround provided in Part 7.

   #. AMT provisioning requires the host to be in "Running" state with all
      agents healthy.

   #. Power operations will only work after successful AMT provisioning.

   #. Keep track of your host IDs and UUIDs for cleanup operations.
