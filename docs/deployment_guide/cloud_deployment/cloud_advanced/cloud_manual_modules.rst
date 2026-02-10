Manual installation - Configure modules
#######################################

Configure modules
-----------------

Environment configuration requires the ``account``, ``cluster``, ``vpc``,
``load balancer``, and ``AWS Orch-Route53`` modules.

.. note::

   Install the modules in the following order:

   #. Account (only required for new AWS instances)
   #. VPC
   #. Cluster
   #. Load balancer
   #. Orch Route53

Add configuration for modules
+++++++++++++++++++++++++++++

Each ``backend.tf`` file contains three values: ``region``, ``bucket``, and ``key``. These values are the same
used during `Terraform configuration <./cloud_manual_terraconfig.html>`_.

Every environment must use a unique region, bucket, and key combination. Terraform can't distinguish between environments.

Each ``variable.tfvar`` file has different variables. For each module type, refer to the ``README`` file in the ``example-config >/<module_name>`` directory to determine which variables are required.

Configure account module
------------------------

.. note:: This step is only required for a new, unused AWS instance. If you use an existing AWS instance, skip this step.

:doc:`See an example account module configuration </deployment_guide/cloud_deployment/cloud_examples/cloud_account>`.

#. Navigate to the main installation directory.
#. Create a new environment directory for the account module.

   .. code-block:: bash

    mkdir -p account/environments/<account_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files from ``example-config`` to the new directory.

   .. code-block:: bash

    cp example-config/account/{backend.tf,variable.tfvar} account/environments/<account_name>/

#. Edit the ``backend.tf`` file to add the ``region``, ``bucket``, and ``key`` values.

#. Edit the ``variable.tfvar`` file to add the ``bucket`` and ``region`` values.

   .. code-block:: terraform

      bucket = "bucket_name"
      region = "us-west-2"

Configure VPC module
--------------------

:doc:`See an example VPC module configuration </deployment_guide/cloud_deployment/cloud_examples/cloud_vpcext>`.

The VPC module installation uses an SSH tunnel to access AWS using a jump host.

#. Navigate to the main installation directory.
#. Create a new directory for the VPC module.

   .. code-block:: bash

    mkdir -p vpc-external/environments/<vpc_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files to the new directory.

   .. code-block:: bash

    cp example-config/vpc-external/{backend.tf,variable.tfvar} vpc-external/environments/vpc_name/

#. Edit the ``backend.tf`` file to add the ``region``, ``bucket``, and ``key`` values.
#. Edit the ``variable.tfvar`` file to add the following:

   - AMI ID for the jump host
   - Public SSH key
   - Jump host IP addresses
   - VPC information, including ``CIDR_blocks``

#. Create the VPC and jump host.

   .. code-block:: bash

    make apply module=external/cluster env=environment_name

Configure jump host
+++++++++++++++++++

.. note:: Use a second terminal instance to run ``sshuttle`` in the background.

#. Navigate to the environment root directory.
#. Use ``sshuttle`` to connect to the jump host.

   .. code-block:: bash

      # If you can connect to the jump host with default settings:
      sshuttle -r ubuntu@[jump host ip] [VPC private subnets]
      # If you need to add additional settings before connecting to the jump host:
      cat <<EOF >> ~/.ssh/config
      Host my-vpc-jump-host
      Hostname [Jump host IP]
      User ubuntu
      ProxyCommand [...]
      IdentityFile [...]
      EOF
      sshuttle -r my-vpc-jump-host [VPC private subnets...]

See an example of a complete ``sshuttle`` command below.

.. code-block:: bash
   :caption: sshuttle command example

   sshuttle -r ubuntu@1.123.456.78.9 192.168.16.0/21 --ssh-cmd "ssh -i /home/user_name/directory_name"

Verify that the SSH tunnel is working and connects to the jump host successfully.

Configure cluster module
------------------------

:doc:`See an example cluster module configuration </deployment_guide/cloud_deployment/cloud_examples/cloud_cluster>`.

This configures the EKS cluster and Aurora DB modules. This module must be installed prior to the ``load-balancer`` module.

#. Navigate to the main installation directory.
#. Create a new directory for the cluster module.

   .. code-block:: bash

      mkdir -p external/cluster/environments/<cluster_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files to the new directory.

   .. code-block:: bash

      cp example-config/external/cluster/{backend.tf,variable.tfvar} external/cluster/environments/<cluster_name>

#. Edit the ``backend.tf`` file to add the ``region``, ``bucket``, and ``key`` values.
#. Edit the ``variable.tfvar`` file to add the AWS account information and any additional cluster details.

.. code-block:: bash

   make apply module=external/cluster env=environment_name

Configure load balancer module
------------------------------

:doc:`See an example load balancer module configuration </deployment_guide/cloud_deployment/cloud_examples/cloud_loadbalancer>`.

Create the load balancer for the Intel's Edge Platform and SRE services. The cluster module must be set up before the load balancer.

#. Navigate to the main installation directory.
#. Create a new directory for the load balancer module.

   .. code-block:: bash

      mkdir -p external/load-balancer/environments/<load_balancer_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files to the new directory.

   .. code-block:: bash

      cp example-config/external/load-balancer/{backend.tf,variable.tfvar} external/load-balancer/environments/load_balancer_name

#. Edit the ``backend.tf`` file to add the ``region``, ``bucket``, and ``key`` values.
#. Edit the ``variable.tfvar`` file to add the cluster name and bucket information.
#. Configure the module.

   .. code-block:: bash

      make apply module=external/load-balancer env=environment_name

Configure the Route53 DNS module
--------------------------------

:doc:`See an example Route53 module configuration </deployment_guide/cloud_deployment/cloud_examples/cloud_route53>`.
The Route53 module supports ``A`` or ``CNAME`` DNS records.

#. Navigate to the main installation directory.
#. Create a new directory for the Orch-Route53 module.

   .. code-block:: bash

      mkdir -p external/orch-route53/environments/<route53_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files to the new directory.

   .. code-block:: bash

      cp example-config/external/route53/{backend.tf,variable.tfvar} external/route53/environments/route53_name

#. Edit the ``backend.tf`` file to add the ``region``, ``bucket``, and ``key`` values.
#. Edit the ``variable.tfvar`` file to add either the ``A`` or ``CNAME`` information, and the DNS name.
#. Configure the module.

   .. code-block:: bash

      make apply module=external/route53 env=environment_name
