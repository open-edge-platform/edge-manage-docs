Develop on KinD
===============

This guide walks you through the process to set up the Edge Orchestrator development environment on KinD
and deploy ENIC (Edge Node in a Container) to run basic sanity tests. KinD and ENIC is useful to
validate lifecycle management operations on already provisioned Edge Node.

.. note::
   ENIC only emulates the real Edge Node and does not cover full Edge Node lifecycle management (from Day0 provisioning).
   To set up developer environment that is closest to the real-world deployment, see :ref:`dev_env_onprem`.

System Requirements
-------------------

Your development machine must meet the following minimum requirements:

- Recommended Operating System: Ubuntu\* 22.04 Server

- Processor: 16 cores or more

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

#. Configure environment variables. ``ORCH_DEFAULT_PASSWORD`` will be your default password
   for different Edge Orchestator services. ``GIT_USER`` and ``GIT_TOKEN`` are required to
   download Git repositories, while ``DOCKERHUB_USERNAME`` and ``DOCKERHUB_TOKEN`` (DockerHub password)
   are required to avoid image pull rate-limiting issues.

   .. note:: You can save these environment variables in your ``.bashrc``.

   .. code-block:: bash

      export ORCH_DEFAULT_PASSWORD="ChangeMeOn1stLogin!"
      export GIT_USER="git"
      export GIT_TOKEN="" # provide your Git Personal Access Token
      export DOCKERHUB_USERNAME="" # provide your DockerHub username
      export DOCKERHUB_TOKEN="" # provide your DockerHub password

#. Decide on the orchestrator profile you want to deploy.

   * Use ``dev`` profile (defined in ``orch-configs/clusters/dev.yaml``)
     to deploy full Edge Orchestrator (including Observability, SRE, Kyverno, etc.).

   * Use ``dev-minimal`` profile (defined in ``orch-configs/clusters/dev-minimal.yaml``)
     to deploy a minimal version of Edge Orchestrator. It's recommended profile unless
     you need the above-mentioned extensions.

   * [OPTIONAL] Customize the orchestrator profile. For example, if you only need to
     develop Edge Infrastructure Manager, you can disable application and cluster orchestration
     by removing the following lines from the profile YAML definition:

     .. code-block:: bash

        - orch-configs/profiles/enable-app-orch.yaml
        - orch-configs/profiles/enable-cluster-orch.yaml

#. If you require a proxy for internet access, you can modify ``httpProxy``, ``httpsProxy``,
   and ``noProxy`` parameters in the ``orch-configs/profiles/proxy-none.yaml`` file.

#. Deploy the Edge Orchestrator on KinD:

   * Use ``mage deploy:kindAll`` if you use ``dev`` profile.

   * Use ``mage deploy:kindMinimal`` if you use ``dev-minimal`` profile.

#. The deployment will start. To check the status of the deployment, you can run:

   .. code-block:: bash

      mage deploy:waitUntilComplete

   This command will block until the deployment is complete.

#. You can also observe the deployment status by viewing the ArgoCD dashboard.
   Use ``admin/ChangeMeOn1stLogin!`` credentials.

   .. code-block:: bash

      # Access to ArgoCD UI from outside
      kubectl port-forward -n argocd service/argocd-server 8080:443 --address 0.0.0.0
      # Use <MACHINE-IP>:8080 to access ArgoCD.

#. Once completed, add Edge Orchestrator server TLS certificate to the system's trusted store:

   .. code-block:: bash

      mage gen:orchCA deploy:orchCA

#. Restart Traefik proxy to make Edge Orchestrator endpoints reachable from the outside.

   .. code-block:: bash

      mage router:stop router:start

#. Generate static DNS entries and put the output in the ``/etc/hosts``. You need to insert these
   entries to ``/etc/hosts`` on every machine, from which you access the Edge Orchestrator.

   .. code-block:: bash

      mage gen:hostfileTraefik

#. If needed, create default tenants and users:

   .. code-block:: bash

      mage tenantUtils:createDefaultMtSetup
      mage devUtils:createDefaultUser

Make changes
------------

See :ref:`/developer_guide/contributor_guide/code_contribution` to learn more about
how to make changes to an Edge Orchestrator component.

.. include:: code_standards.rst
