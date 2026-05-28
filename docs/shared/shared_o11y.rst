Observability Composability
=====================================

This document provides end-to-end guidance on:

1. Deploying orchestration with the **Observability (O11Y)** profile,
   including how to enable or disable it using composability flags.
2. Onboarding edge nodes in **NIO mode** using ``orch-cli``.

----------------------------------------------------
1. Observability Composability Overview
----------------------------------------------------

During orchestration deployment, the **Observability (O11Y)** profile, which
integrates telemetry, metrics and monitoring, is **disabled by default**.

Composability provides **flexibility and control**, allowing you to include or exclude specific services as needed.
The profile is controlled through an **environment flag** which must be set before starting the deployment.

.. important::

   The flag must be defined **before** orchestration deployment begins.
   For upgrades, ensure the same flag is used to maintain consistent orchestration state
   and avoid unexpected composability changes.

----------------------------------------------------
2. Configuration Flag
----------------------------------------------------

By default, the profile is disabled by default.

To enable the profile to deploy the services, the following environment variables
must be enabled in the post-orch.env file **before starting orchestration deployment
or upgrade**:

.. code-block:: bash

   EOM_ENABLE_O11Y=true

.. note::

   This flag must be configured in the post-orch.env file **prior to both deployment and upgrade**
   to ensure consistent composability across lifecycle operations.

The environment flag will enable deployment of the edgenode observability services as
well as the Promethheus CRDs to enable service monitors. To enable the orchestrator
observability services, the following flags must also be enabled, either by being
added to the ``post-orch.env`` file or by enabling them in the
``environments/defauls-disabled.yaml.gotmpl`` file.

.. code-block:: yaml

   orchestrator-observability:
     enabled: true
   orchestrator-dashboards:
     enabled: true
   orchestrator-prometheus-agent:
     enabled: true

----------------------------------------------------
3. Verification After Deployment or Upgrade
----------------------------------------------------

After orchestration deployment or upgrade, you can verify that the observability services are
enabled or disabled using the following command:

.. code-block:: bash

   kubectl get pods -n orch-infra | grep edgenode-observability

**Example Output:**

.. code-block:: text

   edgenode-observability-grafana-644fbcc577-wr2k2                   4/4     Running     0               5m36s
   edgenode-observability-loki-chunks-cache-0                        3/3     Running     0               5m36s
   edgenode-observability-loki-gateway-59f4f949b8-lwbls              2/2     Running     0               5m36s
   edgenode-observability-loki-results-cache-0                       3/3     Running     0               5m36s
   edgenode-observability-mimir-compactor-0                          2/2     Running     0               5m36s
   edgenode-observability-mimir-distributor-65cc4bf9cf-cg9kr         2/2     Running     0               5m36s
   edgenode-observability-mimir-gateway-6b6845b5bb-2ppjm             2/2     Running     0               5m36s
   edgenode-observability-mimir-ingester-0                           2/2     Running     0               5m36s
   edgenode-observability-mimir-ingester-1                           2/2     Running     0               5m36s
   edgenode-observability-mimir-make-minio-buckets-5.4.0-dpd2d       0/1     Completed   0               5m36s
   edgenode-observability-mimir-querier-78669bdd7f-djqm8             2/2     Running     0               5m36s
   edgenode-observability-mimir-query-frontend-5c676c7964-zg8bt      2/2     Running     0               5m36s
   edgenode-observability-mimir-query-scheduler-97c7fbb55-4bmnl      2/2     Running     0               5m36s
   edgenode-observability-mimir-query-scheduler-97c7fbb55-8wsv8      2/2     Running     0               5m36s
   edgenode-observability-mimir-ruler-d55cc759b-9bvkc                2/2     Running     0               5m36s
   edgenode-observability-mimir-store-gateway-0                      2/2     Running     0               5m36s
   edgenode-observability-minio-748dc47495-8hzr9                     2/2     Running     0               5m36s
   edgenode-observability-opentelemetry-collector-696c4475d7-mcchc   2/2     Running     0               5m36s

----------------------------------------------------
4. Edge Node Onboarding in NIO Mode
----------------------------------------------------

Edge nodes can be onboarded in **NIO mode** using the ``orch-cli`` tool.

This section walks through the complete process of onboarding edge nodes in **NIO mode**
using the ``orch-cli`` tool.

----------------------------------------------------
4.1 Prerequisites
----------------------------------------------------

- ``orch-cli`` installed on your system
- Access to the cluster API and Keycloak

.. note::

   The ``orch-cli`` binary and dependencies are managed through the
   `orch-cli <https://github.com/open-edge-platform/orch-cli>`_ repository.
   Ensure ``orch-cli`` is available and configured correctly in your environment.

----------------------------------------------------
4.2 Configure Environment Variables
----------------------------------------------------

Set the following environment variables and authenticate with Keycloak:

.. code-block:: bash

   export CLUSTER_FQDN=<cluster.example.com>
   export EP=https://api.${CLUSTER_FQDN}
   export PROJECT_NAME=itep
   export ORCH_DEFAULT_USER=itep-user
   export ORCH_DEFAULT_PASSWORD=itep-user-password

   # Login to orch-cli using Keycloak
   orch-cli logout
   orch-cli login $ORCH_DEFAULT_USER $ORCH_DEFAULT_PASSWORD --keycloak https://keycloak.${CLUSTER_FQDN}/realms/master

   # Set default project and API endpoint
   orch-cli config set project $PROJECT_NAME
   orch-cli config set api-endpoint $EP

.. note::

   Replace ``CLUSTER_FQDN``, ``PROJECT_NAME``, ``ORCH_DEFAULT_USER``, and ``ORCH_DEFAULT_PASSWORD``
   with valid credentials for your deployment.

----------------------------------------------------
4.3 Create Region and Site (if not available)
----------------------------------------------------

Before registering hosts, ensure the required **region** and **site** are created.

.. code-block:: bash

   # Create a region
   orch-cli create region <region-name> --type <region-type>
   orch-cli list region

   # Create a site under the region
   orch-cli create site <site-name> --region <region-id>
   orch-cli list site

----------------------------------------------------
4.4 View Available OS Profiles
----------------------------------------------------

To list all available OS profiles:

.. code-block:: bash

   orch-cli list osprofile

----------------------------------------------------
4.5 Register Host in NIO Mode
----------------------------------------------------

Hosts can be registered individually or in bulk using a CSV file.

.. code-block:: bash

   orch-cli create host -i host-config.csv
   orch-cli list host
   orch-cli get host host-868ee99c

**Sample Host CSV (``host-config.csv``):**

.. code-block:: bash

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   aocotest0001,,Edge Microvisor Toolkit 3.0.20251204,site-bcbbbbf8,FALSE,,,,,,

.. note::

   Update values as needed for your specific environment.

--------------------------------------------------------------
4.6 Collecting Edge Node Logs When Observability is Disabled
--------------------------------------------------------------

When **Observability (O11Y)** is disabled, the centralized log collection and monitoring
capabilities are not available. In this scenario, you must collect logs directly from
each edge node by connecting via SSH.

.. important::

   To access edge nodes when observability is disabled, the edge node must be onboarded
   with **SSH enabled** in the configuration.

   For details on how to add SSH users, refer to the `Local SSH Account Management <../user_guide/set_up_edge_infra/orch_cli/orch_cli_guide.html#local-ssh-account-management>`_ section in the orch-cli guide.

----------------------------------------------------
4.6.1 SSH Login to Edge Node
----------------------------------------------------

Once the edge node is onboarded successfully with SSH enabled, you can log in to collect logs.

Get the edge node IP address after onboarding:

.. code-block:: bash

   orch-cli list host
   orch-cli get host <host-id> | grep NIC

Login to the edge node:

.. code-block:: bash

   ssh <ssh-enabled-username>@<edge-node-ip>

----------------------------------------------------
4.6.2 Collect Edge Node Logs
----------------------------------------------------

After logging in to the edge node, you can collect logs from various edge services.

**Check Node Agent Logs:**

.. code-block:: bash

   sudo journalctl -u node-agent -f
   sudo systemctl status node-agent

**Check Other Service Logs:**

.. code-block:: bash

   sudo journalctl -u <service-name> -f
