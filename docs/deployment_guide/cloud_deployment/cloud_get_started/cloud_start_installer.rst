Start Edge Orchestrator Installation Environment
=================================================

Before provisioning AWS\* cloud resources and installing the Edge Orchestrator, you must set up the installation environment.

This includes downloading the installer container image, setting up the AWS cloud login, and starting the installation environment.

Prerequisites
-------------

Verify Docker\* Software Version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check your locally installed version of Docker\* software.

.. code-block:: shell

   docker --version

The installed version must be the same or newer than the release listed as "Stable" in the
`Docker Engine Release Notes <https://docs.docker.com/engine/release-notes/>`_.
This guide was tested with version 25.0.4.

If Docker software is not installed or is out of date, install or upgrade the software using
`Install Docker Engine <https://docs.docker.com/engine/install/>`_ from the Docker software documentation website.

Verify Docker Software Access for User Account
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Check your current group listing.

   .. code-block:: shell

      groups

   If ``docker`` is not listed in the ``groups`` listing, use the following
   command to add your user account to the docker group.

   .. code-block:: shell

      sudo usermod -aG docker [username]

#. Log out and reconnect after making this change, for it to take effect.

Verify ORAS CLI Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check your locally installed version of ORAS CLI.

.. code-block:: shell

   oras version

   The installed version must be 1.1.0 or newer. This guide was tested with version 1.1.0.

   If ``oras`` is not installed or is out of date, install or upgrade the software using the following command. You will
   be prompted for your sudo password to install ORAS CLI into a local binary directory.

.. code-block:: shell

   curl -LO "https://github.com/oras-project/oras/releases/download/v1.1.0/oras_1.1.0_linux_amd64.tar.gz" && \
     mkdir -p oras-install/ && \
     tar -zxf oras_1.1.0_*.tar.gz -C oras-install/ && \
     sudo mv oras-install/oras /usr/local/bin/ && \
     rm -rf oras_1.1.0_*.tar.gz oras-install/

Verify ``jq`` Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Check your locally installed version of ``jq``:

.. code-block:: shell

   jq --version

The installed version must be the 1.6 or newer. This guide was tested with version 1.6.

If ``jq`` is not installed or is out of date, install or upgrade the software using the following command:

.. code-block:: shell

   sudo apt-get install -y jq

Download the Installer Container Image
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
   EMF is released on a weekly basis. To use a weekly build, refer to the latest weekly tag available `here <https://github.com/open-edge-platform/edge-manageability-framework/discussions>`_. In the command below, replace v3.0.0 with the appropriate weekly tag. Weekly tags follow the format: v3.1.0-nYYYYMMDD.

#. Download the installer container image:

   .. code-block:: shell

      oras pull registry-rs.edgeorchestration.intel.com/edge-orch/common/files/cloud-orchestrator-installer:v3.0.0

   This will download the ``cloud-orchestrator-installer.tgz`` release artifact to the ``_build`` directory.

#. Extract the ``cloud-orchestrator-installer.tgz`` release artifact. This extracts the deployment scripts and configuration to a directory of the same name:

   .. code-block:: shell

      tar -xzf _build/cloud-orchestrator-installer.tgz

.. _aws-login:

Set up the AWS Cloud Login
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
   The AWS user must have the right permission access in AWS cloud,
   See :doc:`Required AWS IAM Permissions </deployment_guide/cloud_deployment/cloud_appendix/cloud_aws_iam_permissions>` for more information.

Option 1 - Connect with AWS SSO
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set the AWS IAM using SSO. This uses temporary credentials, and permits SSO login and user management.

Choose this option for more secure connections and SSO login support in Edge Orchestrator.
This is a good option for long-term installation.

See `Configure your profile with the aws configure sso wizard <https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html#sso-configure-profile-token-auto-sso>`_
for more information.

.. code-block:: shell

   aws configure sso
   # Follow the SSO configure prompts to log in to your SSO profile
   # Select your cluster's AWS region and a profile with Administrator access
   export AWS_PROFILE="[The AWS profile selected in SSO login]"

Option 2 - Connect with Access Key ID and Secret Access Key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set an Access Key ID and Secret Access Key in Edge Orchestrator.

Choose this option for testing Edge Orchestrator, and permitting automation and services to run with less user intervention:

.. code-block:: shell

   export AWS_ACCESS_KEY_ID="[AWS Access Key ID from AWS SSO interface or IAM Administration]"
   export AWS_SECRET_ACCESS_KEY="[AWS Secret Access Key from AWS SSO interface or IAM Administration]"
   export AWS_SESSION_TOKEN="[Session Token from AWS SSO interface]"

.. _start-installation-environment:

Start the Installation Environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Start the Edge Orchestrator installer. In the ``cloud-orchestrator-installer`` dir, run:

   .. code-block:: shell

      ./start-orchestrator-install.sh

#. Type ``1`` and press ``Enter`` to install a full version of Edge Orchestrator.

#. Type in cluster details, including cluster name and the AWS region.

#. Specify a location to store the installer settings. These settings are stored in an AWS S3 bucket. This copy supports archival or recovery options.

The script starts the ``orchestrator-admin`` container that provides the tools, runtime environment, and product configuration required to complete your selected operation.

Verify Installer Environment Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After the installer environment is successfully started, the command prompt changes. See the following example:

.. code-block:: shell

   orchestrator-admin:~$
