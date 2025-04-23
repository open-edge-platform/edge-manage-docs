VPC Module Examples
=====================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

.. code-block:: terraform
    :caption: backend.tf example

    region="us-west-2"
    bucket="example-bucket"
    key="use-west-2/vpc-external/my-env"

.. code-block:: terraform
    :caption: variable.tfvar example

    endpoint_sg_name              = "Intel-IGBN-SGForAllVPCEndpoints"
    jumphost_ami_id               = "ami-0cf9a24cd5539d7ff"
    jumphost_instance_ssh_key_pub = ""
    jumphost_instance_type        = "t3.medium"
    jumphost_ip_allow_list = [
      "10.1.10.0/16",
      "172.16.50.0/24",
      "192.168.100.0/24"
    ]
    jumphost_subnet            = ""
    private_subnets            = ""
    public_subnets             = ""
    region                     = ""
    vpc_additional_cidr_blocks = ""
    vpc_cidr_block             = ""
    vpc_enable_dns_hostnames   = true
    vpc_enable_dns_support     = true
    vpc_name                   = ""
