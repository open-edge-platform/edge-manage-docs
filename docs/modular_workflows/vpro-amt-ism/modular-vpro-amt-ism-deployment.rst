Modular vPro Workflow Deployment
================================

This modular workflow provides a simplified, end-to-end process for activating
and managing devices by using Intel® vPro™ Active Management Technology (AMT)
and Intel® Standard Manageability (ISM). It uses lightweight, modular
components that run on both the control plane and edge node to deliver
out-of-band (OOB) management capabilities.

This design makes Intel® OOB management features easy for partners to adopt:

- Partners can directly integrate these modular components into their own
  edge-management platforms.
- This integration provides built-in support for Intel® vPro™ OOB capabilities
  without requiring deployment or maintenance of the full Edge Management
  Framework (EMF).

The workflow eliminates the complexity of extracting only OOB components from
EMF. Instead of dealing with the overhead of the complete EMF stack, partners
can consume focused, modular components for vPro™ AMT/ISM activation and OOB
device control.

By delivering these capabilities as self-contained modules, Intel enables
partners to accelerate integration timelines, reduce development effort, and
deliver OOB device-management functionality to customers quickly and reliably.

Partner Responsibilities
------------------------

When evaluating this workflow, partners are responsible for the following areas:

- Device OS provisioning
- Device onboarding
- Firmware and software upgrades
- Cluster management
- Application lifecycle management
- Observability and telemetry management

Workflow Capabilities
---------------------

The modular vPro workflow provides the following capabilities:

Automated vPro software Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An installer package automates the provisioning of vPro control-plane and
edge-node software, reducing manual setup and configuration effort.

Automated vPro Activation
~~~~~~~~~~~~~~~~~~~~~~~~~
Typically, vPro activation requires a field engineer to install agents and
credentials to activate vPro AMT or ISM on the edge device. This workflow
automates the activation process, enabling devices to be activated without user
interaction and reducing operating expenses (OpEx).

Intel® vPro™ technology is activated automatically in one of two modes:

- **Client Control Mode (CCM)** — Provides a subset of management features
  with user consent.
- **Admin Control Mode (ACM)** — Enables full remote management capabilities
  without user interaction.

Out-of-Band Power Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Remote power operations are available independent of the operating system state:

- **Power On** — Remotely start a powered-off device.
- **Power Off** — Remotely shut down a running device.
- **Power Cycle** — Restart a device through a full power-off and power-on
  sequence.
- **Power Status Retrieval** — Query the current power state of a device.

System Requirements
-------------------

The modular vPro workflow has control plane and edge node environments.
Here are the minimum requirements for these two environment.

Control Plane Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Linux-based operating system (Ubuntu 24.04 LTS)
- Kubernetes cluster (for container orchestration)
- Network connectivity to edge nodes

Edge Node Requirements
~~~~~~~~~~~~~~~~~~~~~~

- Intel® vPro™ platform with AMT or ISM support
- Network connectivity to the control plane
- Compatible operating system (Ubuntu 24.04 LTS)

Evaluation Deployment Instructions
----------------------------------


Install control-plane
~~~~~~~~~~~~~~~~~~~~~

Update the ``onprem.env`` file with the required deployment configuration
before starting the Edge Orchestrator installation.

Modify the following parameters as needed:

.. code-block:: bash

  # Installer profile for vPro-only deployment
  export ORCH_INSTALLER_PROFILE=onprem-vpro

  # Deployment version
  export DEPLOY_VERSION='2026.0.0'
  # Repository branch
  export DEPLOY_REPO_BRANCH='2026.0.0'

  # Load balancer IPs
  export ARGO_IP=''
  export TRAEFIK_IP=''
  export HAPROXY_IP=''

  # Proxy configuration (optional) — set if Orchestrator or edge nodes sit
  # behind an HTTP/HTTPS proxy. Example: export ORCH_HTTP_PROXY="http://proxy:3128"
  export ORCH_HTTP_PROXY=""
  export ORCH_HTTPS_PROXY=""
  export ORCH_NO_PROXY=""
  # Edge-node proxy variables
  export EN_HTTP_PROXY=""
  export EN_HTTPS_PROXY=""
  export EN_FTP_PROXY=""
  export EN_SOCKS_PROXY=""
  export EN_NO_PROXY=""

Run the installer:

.. code-block:: shell

  ./onprem_installer.sh

After the installer completes, wait until the `root-app` is in sync and in a
healthy state before proceeding.

Create project and user
~~~~~~~~~~~~~~~~~~~~~~~

After the control plane is healthy, create your organization, project, and
users using the Orch CLI. See the Orch CLI User Guide for detailed commands
and examples:

:doc:`MT Orch CLI Guide </shared/shared_ht_iam_mt_cli>`
:doc:`Orch CLI User Guide </user_guide/set_up_edge_infra/orch_cli/orch_cli_guide>`

Orch CLI host registration
~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following commands as a quick setup and verification flow for the
Orch CLI. Adjust `CLUSTER_FQDN`, `PROJECT_NAME`, and other values as needed.

.. code-block:: bash

  export CLUSTER_FQDN=cluster.onprem
  export EP=https://api.$CLUSTER_FQDN
  export PROJECT_NAME=<project-name>
  export ORCH_DEFAULT_PASSWORD="password-for-edgeinfra-api-user"
  export ORCH_DEFAULT_USER="username-foredgeinfra-api-user"

  orch-cli logout
  orch-cli login $ORCH_DEFAULT_USER $ORCH_DEFAULT_PASSWORD \
    --keycloak https://keycloak.$CLUSTER_FQDN/realms/master

  orch-cli config set project $PROJECT_NAME
  orch-cli config set api-endpoint $EP

  # Show enabled features on the Orchestrator
  orch-cli list feature

  # Regster host example (adjust parameters as needed):

  orch-cli create host -i host-config.csv
  orch-cli list hosts

host-config.csv template
~~~~~~~~~~~~~~~~~~~~~~~~

Use this CSV template with `orch-cli create host -i <file>`; adapt columns
to your environment. The header row is required.

.. code-block:: text

  Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,LVMSize,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
  EDGENODE1_SERIALNO,,,,,,,,,,,,
  EDGENODE2_SERIALNO,,,,,,,,,,,,

.. note::

  Replace `EDGENODE1_SERIALNO` (and `EDGENODE2_SERIALNO`) with the actual
  serial number(s) of your edge node(s). If you have multiple edge nodes,
  add one row per device in this CSV and use `orch-cli create host -i <file>`
  to perform bulk registration.

Install edge node components
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Download the installer

  On the vPro-enabled edge node, download the installer and make it
  executable. Replace ``<cluster.example.com>`` with your cluster DNS domain.

  .. code-block:: shell

    export CLUSTER_FQDN=<cluster.example.com>
    wget https://tinkerbell-haproxy.${CLUSTER_FQDN}/tink-stack/Installer \
      --no-check-certificate --no-proxy
    chmod +x Installer

    .. note::

      The edge node (EN) must have SSH access.

2. Run the installer

  Run the installer with sudo privileges:

  .. code-block:: shell

    sudo ./Installer

  The installer automatically configures:

  * Ubuntu system updates
  * System configuration
  * Device discovery agent
  * LMS and RPC service for AMT operations
  * Node agent
  * Platform Manageability Agent (PMA)

3. Verify agent status

  Verify that the agents are running.

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

Verify edge node on the control-plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because UI is disabled in the ``onprem-vpro`` profile, verify registration and
state via ``orch-cli``.

Activate vPro on the edge node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because UI is disabled, provisioning and power management of Intel® vPro
devices must be performed via ``orch-cli``.

Set the required environment variables:

.. code-block:: bash

   export HOST_ID=<edgenode-host-id>

Provision a vPro device:

.. code-block:: bash

  orch-cli set host ${HOST_ID} \
    --project ${PROJECT_NAME} \
    --api-endpoint https://api.${CLUSTER_FQDN} \
    --amt-state provisioned

Activate vPro In ACM mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Domain creation

  .. code-block:: bash

    orch-cli create amtprofile <domain_name> \
      --project ${PROJECT_NAME} \
      --cert 'Domain-certificate.pfx' \
      --cert-pass cert-password \
      --cert-format string \
      --domain-suffix <Domain-suffix> \
      --api-endpoint https://api.${CLUSTER_FQDN}

- ACM Activation command

  .. code-block:: bash

    orch-cli set host ${HOST_ID} \
      --project ${PROJECT_NAME} \
      --api-endpoint https://api.${CLUSTER_FQDN} \
      --amt-state provisioned \
      --control-mode admin

Verify vPro activation on the control plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because UI is disabled, verify activation state via ``orch-cli``.

.. code-block:: bash

  orch-cli get host ${HOST_ID} \
    --project ${PROJECT_NAME} \
    --api-endpoint https://api.${CLUSTER_FQDN}

Perform out-of-band power management operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Power Off:

.. code-block:: bash

  orch-cli set host ${HOST_ID} \
    --project ${PROJECT_NAME} \
    --api-endpoint https://api.${CLUSTER_FQDN} \
    --power off

Power On:

.. code-block:: bash

  orch-cli set host ${HOST_ID} \
    --project ${PROJECT_NAME} \
    --api-endpoint https://api.${CLUSTER_FQDN} \
    --power on

Power Reset:

.. code-block:: bash

  orch-cli set host ${HOST_ID} \
    --project ${PROJECT_NAME} \
    --api-endpoint https://api.${CLUSTER_FQDN} \
    --power reset

.. note::

  Ensure secure API access and proper credentials management when operating in
  production environments.

Uninstall edge node components
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Delete host from orchestration

.. code-block:: shell

  orch-cli delete host <host-id> --project <project-name> \
    --api-endpoint https://api.<cluster.example.com>

Clean up edge node

.. code-block:: shell

  wget https://tinkerbell-haproxy.${CLUSTER_FQDN}/tink-stack/uninstall.sh \
    --no-check-certificate --no-proxy
  chmod +x uninstall.sh
  ./uninstall.sh

Proceed with your standard edge-node uninstallation flow.

Partner Developers
------------------

- Explain the modular workflow directory structure, highlighting key components
  and their roles in the workflow. Provide guidance on navigating the codebase
  and understanding the interactions between modules.
- Explain how customers can integrate modular workflow components into their own
  device-management platforms, including required APIs, configuration steps,
  and best practices for seamless integration.
