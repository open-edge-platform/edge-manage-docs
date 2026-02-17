Continue with Edge Orchestrator Installation
===============================================================

Provisioning Prerequisites
----------------------------------

Before provisioning AWS\* resources required to deploy Edge Orchestrator,
review the following prerequisites.

Consider Domain Name System (DNS) Options
------------------------------------------

The following procedures use the default Route53 DNS provisioning approach.
This is likely the preferred method for most installations. The default Route53
provisioning approach automatically provisions DNS entries for Edge
Orchestrator in an ``--environment`` named sub-domain of a specified
``--parent-domain`` name. This ensures that multiple Edge Infrastructure
Manager instances can easily coexist within a shared parent domain.

If you have a specific fully qualified domain name (FQDN) already provisioned that you would like to use for the cluster, replace the ``--parent-domain`` parameter when running ``provision.sh`` with
``--root-domain [root-domain]`` to specify the **pre-existing** FQDN and the
``--no-create-root-domain`` flag to skip the default root-domain creation.

If you want to use an alternate DNS service rather than AWS Route53,
add the ``--no-route53`` flag to the ``provision.sh`` command line and see the
:doc:`manual installation guide </deployment_guide/cloud_deployment/cloud_advanced/cloud_man_prereq>`
for details on what DNS entries to manually provision in your preferred DNS service.

Provisioning a New Environment
------------------------------------------

Configure and provision AWS resources required to deploy Edge Orchestrator.

#. Go to the ``pod-configs`` directory:

   .. code-block:: shell

      orchestrator-admin:~$ cd ~/pod-configs

Create provisioning configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Configure the cluster provisioning parameters. Edit the variables
   and run the following command; this opens an editor for the configuration template:

   .. code-block:: shell

      orchestrator-admin:~/pod-configs$ ./utils/provision.sh config \
      --aws-account [AWS account] \
      --customer-state-prefix [S3 bucket name prefix to store provision state] \
      --environment [Cluster name] \
      --parent-domain [Root domain for deployment] \
      --region [AWS region to install the cluster] \
      --jumphost-ip-allow-list [IPs to permit cluster administration access]

   .. note::

      The ``customer-state-prefix`` is a prefix for the S3 bucket name used to store
      the state of the cluster. It can be arbitrary, but must follow AWS bucket
      `naming rules <https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html>`_.

   .. note::

      The S3 bucket will be created in the same AWS region as the cluster. If you want to use
      a different region for the S3 bucket, you need to manually export ``BUCKET_REGION=[bucket region]``
      before running the command above. Replace ``[bucket region]`` with the name of the AWS region
      where you want to create the S3 bucket.

   The following is an example:

   .. code-block:: shell

      orchestrator-admin:~/pod-configs$ ./utils/provision.sh config \
      --aws-account 1234567890 \
      --customer-state-prefix customer-a \
      --environment [Cluster name] \
      --parent-domain root-domain \
      --region [AWS region to install the cluster] \
      --jumphost-ip-allow-list [jumphost IP allow list]

   .. note::

      Add ``--auto-cert`` argument to the command to deploy with automatically
      created certificates.

   .. note::

      The ``--jumphost-ip-allow-list`` must include the IP where the install
      container is running. This value limits access to the secure tunnel
      required to access administration and management operations on the
      Edge Orchestrator cluster to the specified IP ranges.
      This must be as limited as possible to enable all necessary administration host addresses.
      The ``--jumphost-ip-allow-list`` may also need to include the IPs of the proxy services when systems are
      running behind a corporate proxy server.

#. **(Optional)** If deploying Edge Orchestrator with ``auto-cert`` enabled, you can leave the following variables in the template blank because they will be automatically generated :

   * ``tls_key``
   * ``tls_cert``
   * ``ca_cert``

#. Configure the SMTP server settings. The SMTP server is used to send
   notifications and alerts. See :doc:`/deployment_guide/cloud_deployment/cloud_advanced/cloud_alerts` for more information.


#. Configure the SRE endpoint. See :doc:`/deployment_guide/cloud_deployment/cloud_advanced/cloud_sre` for more information.

#. Save and close the editor.

   .. note::
      You only need to configure the cluster once. You must reprovision the cluster to apply configuration changes.


Provision Required AWS Resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following command to begin installation:

   .. code-block:: shell

      orchestrator-admin:~/pod-configs$ ./utils/provision.sh install \
        --aws-account [AWS account] \
        --customer-state-prefix [S3 bucket name prefix to store provision state] \
        --environment [Cluster name] \
        --parent-domain [root-domain] \
        --region [AWS region to install the cluster] \
        --jumphost-ip-allow-list [jumphost IP allow list] \
        --email myemail@[root-domain] \
        --auto

   Successful installation will be indicated by a message in the output of the script:

   .. code-block:: shell

      Info: Installation completed successfully. Please back up the files in ${SAVE_DIR} directory.

   .. note::

      Add ``--auto-cert`` argument to the command to deploy with automatically
      created certificates.

      Add the ``--customer-tag`` parameter to the command to apply an optional tag to all cloud resources
      created by the installation. This tag can be used to monitor and report on associated AWS costs and
      performance of the cloud resources created to run the Orchestrator.

      Add the ``--socks-proxy $socks-proxy`` parameter if you are running the
      installer from behind a proxy server. This parameter is blank by default.

   .. note::

      The ``--jumphost-ip-allow-list`` must include the IP address where the install
      container is running. This value limits access to the secure tunnel
      required to access administration and management operations on the
      Edge Orchestrator cluster to the specified IP address ranges. This should be as limited as possible to enable all necessary administration host addresses.
      The ``--jumphost-ip-allow-list`` may also need to include the IP addresses of the proxy services when systems are
      running behind a corporate proxy server.

Deploy Edge Orchestrator
------------------------------------------

Configure and deploy Edge Orchestrator to the provisioned AWS environment.

#. Go to the home directory:

   .. code-block:: shell

      orchestrator-admin:~$ cd ~

#. Configure the cluster deployment options. From the ``~`` directory in the
   ``orchestrator-admin`` container, run the following command:

   .. code-block:: shell

      orchestrator-admin:~$ ./configure-cluster.sh

   This process creates a default cluster definition and prompts you to review it.

   .. note::
      If deploying with `auto-cert` enabled, ensure that the following line is **uncommented** in the cluster definition file:

      .. code-block:: shell

         - profiles/profile-autocert.yaml

   .. note::
      To edit the configuration of the near Zero-Touch Provisioning (nZTP) feature, edit the following file and include
      in the cluster definition:

      .. code-block:: shell

         - profiles/enable-autoprovision.yaml

   This configuration applies for every organization and project by default when they
   are created, but you can edit the nZTP configuration for each project at a later time.
   To learn more about the nZTP feature, see :doc:`/user_guide/concepts/nztp`.

   See :doc:`/deployment_guide/cloud_deployment/cloud_appendix/cloud_cluster_definition`
   for the contents and structure of the cluster definition file.

#. Install the Edge Orchestrator on the cluster.

   .. code-block:: shell

      orchestrator-admin:~$ make install

If you see an immediate error when attempting to create a namespace, it may be due to a broken tunnel or missing AWS credentials.
Restart your cluster network tunnel by calling the ``./start-tunnel.sh script``, and refresh your AWS access tokens.

When installation is successful, the Argo\* CD tool is up and running in your
cluster, and the application deployment is in process.

Deployment can take up to an hour to complete.

View Argo\* CD Tool Deployment Progress
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. From the home directory, run the following command to get the Argo CD tool's default administrator password:

   .. code-block:: shell

      orchestrator-admin:~$ ./get-argo-login.sh

#. Log into the Argo CD UI at
   ``https://argocd.[CLUSTER_NAME].[root-domain]``
   using the username ``admin`` and the password from the previous step
   to view the deployment progress.
