Scale Edge Orchestrator
========================

You can deploy the |software_prod_name| on cloud providers at various scales to support different numbers of edge nodes
and you can scale Edge Orchestrator dynamically after the initial deployment;
this allows for right-sizing of the Edge Orchestrator as the number of edge nodes grows,
to achieve better cost efficiency.

Intel supports both horizontal and vertical scaling for general and observability nodes.
You can achieve horizontal scaling by adding more Amazon Elastic Kubernetes Service\* (Amazon EKS\*) nodes to
Edge Orchestrator and vertical scaling by increasing the resources of the existing Amazon EKS nodes.

Intel also supports scaling the Aurora Capacity Units (ACU).

This section explains the available parameters and predefined scale profiles, and shows how to update the cluster
settings using the same provision script used for installation.

Scale Parameters
----------------

The following table lists all available parameters that can be used to scale the cluster.
These parameters are optional and can be supplied when calling the ``provision.sh update-cluster-setting`` script.

.. list-table:: General
  :widths: 25 38 12 25
  :header-rows: 1

  * - Flag
    - Description
    - Default Value
    - Available Values
  * - ``--profile {CLUSTER PROFILE TO DEPLOY}``
    - Specify the cluster scale profile to deploy. This can be overridden if any of the above flags are provided.
    - default
    - default, 100en, 500en, 1ken

.. list-table:: Compute
  :widths: 25 38 12 25
  :header-rows: 1

  * - Flag
    - Description
    - Default Value
    - Available Values
  * - ``--desired-nodes {NUMBER OF NODES}``
    - Specify the desired number of nodes for the cluster.
    - 3
    - Any integer that is greater than or equal to the minimum number of nodes, and less than or equal to the maximum number of nodes.
  * - ``--min-nodes {NUMBER OF NODES}``
    - Specify the minimum nodes for the cluster.
    - 3
    - Any integer that is less than or equal to the maximum number of nodes.
  * - ``--max-nodes {NUMBER OF NODES}``
    - Specify the maximum nodes for the cluster.
    - 3
    - Any integer that is greater than or equal to the minimum number of nodes.
  * - ``--node-type {Node type}``
    - Specify the node type of the cluster.
    - t3.2xlarge
    - Any valid Amazon EC2 instance type.

.. list-table:: Observability
  :widths: 25 38 12 25
  :header-rows: 1

  * - Flag
    - Description
    - Default Value
    - Available Values
  * - ``--desired-o11y-nodes {NUMBER OF NODES}``
    - Specify the desired number of observability nodes.
    - 1
    - Any integer that is greater than or equal to the minimum number of observability nodes, and less than or equal to the maximum number of observability nodes.
  * - ``--min-o11y-nodes {NUMBER OF NODES}``
    - Specify the minimum number of observability nodes.
    - 1
    - Any integer that is less than or equal to the maximum number of observability nodes.
  * - ``--max-o11y-nodes {NUMBER OF NODES}``
    - Specify the maximum number of observability nodes.
    - 1
    - Any integer that is greater than or equal to the minimum number of observability nodes.
  * - ``--o11y-node-type {Observability node type}``
    - Specify the observability node type.
    - t3.2xlarge
    - Any valid Amazon Elastic Compute Cloud\* (Amazon EC2\*) instance type.

.. list-table:: Database
  :widths: 25 38 12 25
  :header-rows: 1

  * - Flag
    - Description
    - Default Value
    - Available Values
  * - ``--num-rds-instance {Number of RDS instances}``
    - Specify the number of Amazon RDS instances.
    - 1
    - Any integer.
  * - ``--min-rds-acu {NUMBER OF ACU}``
    - Specify the minimum number of ACU for Amazon RDS.
    - 0.5
    - Any number.
  * - ``--max-rds-acu {NUMBER OF ACU}``
    - Specify the maximum number of ACU for Amazon Relational Database Service\* (Amazon RDS\*).
    - 2
    - Any number.

Predefined Profiles
-------------------

You can also select from the following predefined profiles when provisioning the cluster:

.. list-table:: Predefined Profiles
  :widths: 1 1 1 1 1 1 1 1 1
  :header-rows: 1

  * - Profile
    - Edge Nodes(up to)
    - Number of Compute Nodes
    - Compute Node Type
    - Number of Observability Nodes
    - Observability Node Type
    - Min/Max Units of Amazon RDS's ACU
    - RDS Instances
    - Default Volume Size for Each Node (GB)
  * - default
    - 50
    - 3
    - t3.2xlarge
    - 1
    - t3.2xlarge
    - 0.5/2
    - 1
    - 20
  * - 100en
    - 100
    - 3
    - t3.2xlarge
    - 1
    - r5.2xlarge
    - 0.5/2
    - 1
    - 128
  * - 500en
    - 500
    - 3
    - t3.2xlarge
    - 1
    - r5.8xlarge
    - 0.5/4
    - 1
    - 128
  * - 1ken
    - 1,000
    - 3
    - m4.4xlarge
    - 1
    - r5.12xlarge
    - 0.5/8
    - 1
    - 128

Refer to :doc:`/deployment_guide/cloud_deployment/cloud_get_started/system_requirements_aws_orch`
for more information about resource requirements for each scenario.

Update Cluster Scale Settings
-----------------------------

.. note::
   Scaling Edge Orchestrator cluster may require changing of observability profile.
   For details on observability profiles, refer to
   `Observability Configuration <../../cloud_deployment/cloud_get_started/system_requirements_aws_orch#edge-orchestrator-observability-configuration>`__.

.. note::
   When updating the cluster scale, you also need to provide flags from the installation step;
   you can find the required flags from the section on
   :doc:`/deployment_guide/cloud_deployment/cloud_examples/cloud_flags`

There are three ways you can specify scale settings:

1. Use a predefined profile:

   .. code-block:: bash

     ./provision.sh update-cluster-setting --profile 100en \
         --aws-account 1234567890 --customer-state-prefix customer1-bucket
         --environment customer1-env1 --parent-domain [root-domain].com --region us-east-1
         --email myname@abc.[root-domain] --socks-proxy proxy-dmz.example_proxy.com:1080

2. Use flags to change the scale:

   .. code-block:: bash

     ./provision.sh update-cluster-setting --desired-nodes 3 --desired-o11y-nodes 1 \
                    --min-nodes 3 --max-nodes 3 \
                    --min-o11y-nodes 1 --max-o11y-nodes 1 \
                    --min-rds-acu 0.5 --max-rds-acu 2 \
                    --num-rds-instance 1 \
                    --node-type t3.2xlarge --o11y-node-type m4.4xlarge \
         --aws-account 1234567890 --customer-state-prefix customer1-bucket
         --environment customer1-env1 --parent-domain [root-domain].com --region us-east-1
         --email myname@abc.[root-domain] --socks-proxy proxy-dmz.example_proxy.com:1080

3. Override specific values from the profile, for example, to have more nodes with the `100en` profile:

   .. code-block:: bash

     ./provision.sh update-cluster-setting --profile 100en --max-nodes 5 --desired-nodes 5 \
         --aws-account 1234567890 --customer-state-prefix customer1-bucket
         --environment customer1-env1 --parent-domain [root-domain].com --region us-east-1
         --email myname@abc.[root-domain] --socks-proxy proxy-dmz.example_proxy.com:1080
