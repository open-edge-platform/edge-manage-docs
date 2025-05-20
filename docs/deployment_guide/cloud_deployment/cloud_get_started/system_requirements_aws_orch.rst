Open Edge Platform System Requirements
========================================================

Edge Orchestrator Cloud-based AWS Resource Quotas
---------------------------------------------------

Many AWS resources are restricted by per-account `service quotas <https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html>`_.

The following lists the quantity of service quota limited
resources required for each Edge Orchestrator instance installed. Ensure that the service quota settings accommodate the allocation of the following resources. To request a service quota increase, see 
`Requesting a quota increase <https://docs.aws.amazon.com/servicequotas/latest/userguide/request-quota-increase.html>`_.

* `Elastic IP addresses (EIPs) <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html>`_ - 7 EIPs required per Edge Orchestrator instance. The quota is specified per region and defaults to five. This has to be increased to support an Edge Orchestrator installation.

  * 3 For NAT Gateway that allows outbound internet access for the Edge Orchestrator instance.
  * 3 For the Network Load Balancer that allows inbound access to the Edge Orchestrator BIOS service.
  * 1 For the bastion host that allows access to private API endpoints such as AWS EKS\* and AWS RDS\*.

* `Application Load Balancers (ALBs) <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html>`_ - Two ALBs are required per Edge Orchestrator instance. This quota is applied per region.

* `Network Load Balancers (NLBs) <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html>`_ - One NLB is required per Edge Orchestrator instance. This quota is applied per region.

* `Amazon Virtual Private Cloud\* (Amazon VPC\*) <https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html>`_ - One Amazon VPC is required per Edge Orchestrator instance. This quota is applied per region.

* `NAT gateways <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html>`_ in each availability zone (AZ) - One NAT gateway per AZ (three AZs specified for each deployment) is required for each Edge Orchestrator instance. This quota is applied per AZ.

* `Amazon Relational Database Service\* (Amazon RDS\*) DB instances <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html>`_ - Three Amazon RDS DB instances are required. This quota is applied per region.

* `Amazon Simple Storage Service\* (Amazon S3\*) buckets <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonS3.html>`_ - 11 Amazon S3 buckets required per Edge Orchestrator instance. The quota is specified per account and must accommodate resources required in all regions.

* `Amazon Elastic File System (Amazon EFS) <https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html>`_ - A single quota is applied per account, which requires specifying the total available Amazon EFS space. The value set in this quota must allow for each Edge Orchestrator instance to use up to approximately 50 GB.

AWS Resource Requirements
-------------------------

The resource requirement depends on the number of edge nodes connected to the Edge Orchestrator.
Intel has validated the following configurations for various scales.
The following Resource requirements can be changed during installation.
The `--profile` option allows you to decide which scale profile they want to use. Currently, there are four profiles:

* default(3 x t3.2xlarge + 1 x t3.2xlarge nodes)

* 100 edge node(3 x t3.2xlarge + 1 x r5.2xlarge)

* 1k edge node (3 x m4.4xlarge + 3 x r5.4xlarge)

More options that allow you to fine-tune your cluster scale abilities:

* `--min-o11y-nodes`, `--desired-o11y-nodes`, `--max-o11y-nodes`: sets min, desired, and max
  number of observability nodes. See
  `Observability Configuration <#edge-orchestrator-observability-configuration>`__
  for guidance.

* `--min-rds-acu`, `--max-rds-acu`: sets min and max Aurora Capacity Unit(ACU)

* `--node-type`: sets the default worker node type (for example, m4.4xlarge)

* `--o11y-node-type`: sets the observability worker node type (for example, r5.2xlarge).
  See `Observability Configuration <#edge-orchestrator-observability-configuration>`__
  for guidance.

See :doc:`/deployment_guide/cloud_deployment/cloud_get_started/cloud_start_installer`
to use these options during the installation process and
:doc:`/deployment_guide/cloud_deployment/cloud_advanced/cloud_manual_terraconfig`
to learn more about how to configure scale-related parameters in the configuration files.

Minimum Requirement (up to 100 Edge Nodes)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Multi-node Amazon EKS cluster

  * Three-node Amazon Elastic Kubernetes Service (Amazon EKS\*) node group backed by three ``t3.2xlarge`` instances (see `Amazon EC2 Instance types <https://aws.amazon.com/ec2/instance-types/>`_)

    * CPU: Eight vCPUs (each) on 2.4 GHz Intel® Xeon® E5-2676 v3 Processor

    * RAM: 32 GiB (each)

    * Disk: 128-Gb elastic block storage (EBS)

  * One-node Amazon EKS node group backed by a ``r5.2xlarge`` instance (see to `Amazon EC2 Instance types <https://aws.amazon.com/ec2/instance-types/>`_)

    * CPU: 8 vCPUs on 3.1-GHz Intel® Xeon® Platinum 8175 Processor

    * RAM: 64 GiB

    * Disk: 128-Gb EBS

    * This node is dedicated to the Observability stack.
      See `Observability Configuration <#edge-orchestrator-observability-configuration>`__
      for details.

* Database: Two Amazon\* Aurora capacity units (ACUs) of SQL database.

Recommended Requirement (up to 1,000 Edge Nodes)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Intel configures the default settings to match this scale.

* Multi-node Amazon EKS cluster

  * Three-node Amazon EKS node group backed by ``m4.4xlarge`` instances (see to `Amazon EC2 Instance types <https://aws.amazon.com/ec2/instance-types/>`_)

    * CPU: 16 vCPUs (each) on 2.4 GHz Intel® Xeon® E5-2676 v3** Processor

    * RAM: 64 GiB (each)

    * Disk: 128-Gb EBS type

  * Three-node Amazon EKS node group backed by ``r5.4xlarge`` instance (see to `Amazon EC2 Instance types <https://aws.amazon.com/ec2/instance-types/>`_)

    * CPU: 16 vCPUs (each) on 3.1-GHz Intel® Xeon® Platinum 8175 Processor

    * RAM: 128 GiB (each)

    * Disk: 128-Gb EBS

    * This node is dedicated to the Observability stack.
      See `Observability Configuration <#edge-orchestrator-observability-configuration>`__
      for details.


* Database: Eight ACUs of SQL database.

Common Requirement Across Various Scales
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Storage: Auto-scaled through Amazon EFS, from 16 GiB. The observability stack uses Amazon EBS.

* Network: Default Amazon VPC


Edge Orchestrator Observability Configuration
---------------------------------------------

Observability components are deployed on a dedicated ``observability`` node group, which by default contains a single ``t3.2xlarge`` instance.

For larger deployments, you must scale up the capacity according to the recommendation.

The number of edge nodes that can be handled by specific instances in ``observability`` node group are as follows:

==================  =====================  ===================   =======================  ========================
Edge Nodes (up to)  Observability Profile  Pod-configs profile   Observability Node Type  Observability Node Count
==================  =====================  ===================   =======================  ========================
50                  o11y-release           default               t3.2xlarge               1
100                 o11y-release           100en                 r5.2xlarge               1
500                 o11y-release-large     500en                 r5.4xlarge               2
1000                o11y-release-large     1ken                  r5.4xlarge               3
==================  =====================  ===================   =======================  ========================

.. note::
   In case of deployment beyond 1k edge nodes it is recommended to use multiple r5.8xlarge instances (preferred observability node count is the multiple of 3).

Due to the limit of EBS volumes attached to a single EC2 instance, it is recommended to use two or more observability nodes for the ``o11y-release-large`` observability profile (See `Amazon EBS volume limits for Amazon EC2 instances <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/volume_limits.html>`_).
Note that placing multiple observability nodes in the same availability zone (AZ) will reduce AWS regional data transfer costs.

See also :doc:`/deployment_guide/cloud_deployment/cloud_how_to/cloud_scale_orch` for more
information about pod-configs profiles and how to scale the cluster.

The default replication factor for edge node logs and metrics is ``3``. You can configure it in the cluster definition with these settings: ``.Values.argo.o11y.edgeNode.loki.replicationFactor`` and ``.Values.argo.o11y.edgeNode.mimir.replicationFactor``.

.. note:: Replication factor ``2`` is not supported for Grafana Mimir\* storage (metrics).

The default data retention period for edge node logs and metrics is 15 days (``360h``). You can configure it in the cluster definition with these settings: ``.Values.argo.o11y.edgeNode.loki.logRetentionPeriod`` and ``.Values.argo.o11y.edgeNode.mimir.structuredConfig.metricsRetentionPeriod``.

The default data retention period for edge node provisioning logs is 31 days (``744h``). You can configure it in the cluster definition with this setting ``.Values.argo.o11y.edgeNode.loki.provisioningLogRetentionPeriod``.

.. note:: The minimum data retention period for edge node logs and metrics is 1 day (``24h``).

Supported Operating Systems and Browsers
-------------------------------------------

You can access Edge Orchestrator through the web browser; it does not require local installation, therefore there is no specific OS version.

The supported browsers are as follows:

* Chrome\*
* Edge\*
* Safari\*
* Firefox\*

For the best Edge Orchestrator experience, use the Chrome browser.
