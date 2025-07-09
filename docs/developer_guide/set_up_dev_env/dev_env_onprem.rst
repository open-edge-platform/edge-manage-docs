.. _set_up_dev_environment:

Develop on on-prem VM
=====================

The on-prem VM development environment is based on a single-node RKE2 cluster running
inside a virtual machine. The following components are installed:

- RKE2 (Kubernetes\*)
- Gitea (Git server)
- PostgreSQL (Database)
- Traefik (Ingress controller)
- Argo\* CD tool (Continuous Deployment)
- Cert-Manager (TLS certificate management)
- Edge Orchestrator (the main application)
- Various utility functions and tools (orch-utils)

The GitHub Actions runner environment mirrors the local development environment
by deploying the same components.

This ensures that the code functions consistently across both environments,
allowing for reliable testing and validation of changes made to the codebase.

System Requirements
-------------------

Your development machine must meet the following minimum requirements:

- Operating System: Ubuntu\* 22.04 Server

- Processor: 16 cores or more with Intel® Virtualization Technology (Intel® VT)
  for IA-32, Intel® 64 and Intel® Architecture (Intel® VT-x) and Intel®
  Virtualization Technology (Intel® VT) for Directed I/O (Intel® VT-d) support
  enabled in BIOS

- Memory: 32 GB RAM or more

- Disk Space: 256 GB SSD or more

Software Requirements
---------------------

Your development machine must have the following software installed:

- asdf v0.16.5 or higher:

  - Download the appropriate asdf binary for your operating system/architecture
    combo from the `GitHub releases page
    <https://github.com/asdf-vm/asdf/releases>`_. Ensure to place it in a
    directory on your ``$PATH``. For example, you can prepend
    ``$ASDF_DATA_DIR/shims`` to your ``$PATH`` environment variable:

   .. code-block:: bash

      export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"

- Docker\* software

Development Environment Setup
-----------------------------

To set up your development environment, follow these steps:

#. Ensure your development machine meets the system and software requirements.

#. Clone the repository:

   .. code-block:: bash

      git clone https://github.com/open-edge-platform/edge-manageability-framework edge-manageability-framework
      cd edge-manageability-framework

#. Install APT dependencies:

   .. code-block:: bash

      sudo apt-get update -y
      sudo apt-get install -y \
          python3.10-venv \
          unzip

#. Install asdf plugins based on the versions specified in ``.tool-versions``:

   .. code-block:: bash

      for plugin in golang jq mage; do
          asdf plugin add "${plugin}"
          asdf install "${plugin}"
      done

      mage asdfPlugins

#. Edit ``terraform/orchestrator/terraform.tfvars`` with your desired
   configuration.
   It is best practice to checkout a tagged version of the repository and to use that version in ``terraform.tfvars`` file.

   .. code-block:: bash

      nano terraform/orchestrator/terraform.tfvars

#. If you have Docker Hub credentials, you can add them to the
   ``terraform/orchestrator/terraform.tfvars`` file:

   .. code-block:: bash

      docker_username = "your_docker_username"
      docker_password = "your_docker_password"

#. If you require a proxy for internet access, you can add it to the
   ``terraform/orchestrator/terraform.tfvars`` file:

   .. code-block:: bash

      http_proxy = "http://your_proxy:port"
      https_proxy = "http://your_proxy:port"
      no_proxy = "cluster.onprem,your_other_domains"
      NO_PROXY = "cluster.onprem,your_other_domains"

#. Start the deployment of the Edge Orchestrator.

   This usually takes 15 minutes to install the platform elements (e.g., RKE2,
   Gitea\* platform, PostgreSQL\* database, etc).

   .. code-block:: bash

      mage deploy:onPrem

#. Once the previous command returns, you will be able to access the RKE2
   cluster using the kubectl command.

   .. code-block:: bash

      export KUBECONFIG=/home/$USER/edge-manageability-framework/terraform/orchestrator/files/kubeconfig
      kubectl get pods -A

#. The deployment is likely not complete yet. To check the status of the
   deployment, you can run:

   .. code-block:: bash

      mage deploy:waitUntilComplete

   This command will block until the deployment is complete.

#. Add Edge Orchestrator server TLS certificate to the system's trusted store:

   .. code-block:: bash

      mage gen:orchCA deploy:orchCA

#. Configure the development machine to use the edge network DNS server.
   This is required to resolve the Edge Orchestrator server hostnames.

   .. code-block:: bash

      mage deploy:edgeNetworkDNS

#. Validate the network configuration by running the following command:

   .. code-block:: bash

      ping web-ui.cluster.onprem

   If the ping is successful, it means the DNS resolution and routing is working correctly.

#. You can execute end-to-end tests using a Virtual Edge Node to validate the deployment:

   .. code-block:: bash

      mage test:e2eOnPrem tenantUtils:createDefaultMtSetup test:onboarding

You have successfully set up your development environment
for Edge Orchestrator.

You can now start developing and testing your changes.

You can now reach the Edge Orchestrator UI at ``https://web-ui.cluster.onprem``.

To get the default admin password, run:

.. code-block:: bash

   kubectl get secret platform-keycloak -n orch-platform -o jsonpath='{.data.admin-password}' | base64 --decode

To get the default admin password for Argo CD tool, run:

.. code-block:: bash

   kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -decode

To tear down the deployment and reset the network, run:

.. code-block:: bash

   mage undeploy:onprem clean

Make changes
------------

See :ref:`/developer_guide/contributor_guide/code_contribution` to learn more about
how to make changes to an Edge Orchestrator component.

Locally Build and Test changes
------------------------------

During development, it is encouraged that you locally build and test your
changes before pushing them to the repository.  This helps catch issues early
and ensures that your changes work as expected.

Build repo archive and installer packages and move them to default directories:

.. code-block:: bash

   mage tarball:onpremFull
   mkdir -p repo_archives
   mv onpremFull_edge-manageability-framework_$(head -1 VERSION).tgz repo_archives/
   cd on-prem-installers
   mage build:all
   export TF_VAR_deploy_tag=$(mage build:debVersion)
   mv dist ..
   cd ..

Ensure that the ``TF_VAR_deploy_tag`` is set to the correct version that matches the version of Debian\* packages.
Due to Debian versioning, if you are building from a tagged version branch (e.g., v3.0.0), the ``mage build:all`` command will remove the v prefix so you may need to manually export ``TF_VAR_deploy_tag``.
If ``TF_VAR_deploy_tag`` is set, ensure that ``deploy_tag`` is not defined in
the ``terraform/orchestrator/terraform.tfvars`` file due to Terraform's
precedence rules.

Edit ``terraform/orchestrator/terraform.tfvars`` to use locally built
artifacts:

.. code-block:: hcl

   use_local_build_artifact = true

Start the deployment of the Edge Orchestrator.

This usually takes 15 minutes to install the platform elements (e.g., RKE2,
Gitea platform, PostgreSQL database, etc):

.. code-block:: bash

   mage deploy:onPrem

.. include:: code_standards.rst
