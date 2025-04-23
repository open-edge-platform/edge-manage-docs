Load Balancer Module Examples
=================================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

.. code-block:: terraform
    :caption: backend.tf example

    region="us-west-2"
    bucket="example-bucket"
    key="use-west-2/external/load-balancer/my-env"

.. code-block:: terraform
    :caption: variable.tfvar example

    cluster_name                     = ""
    cluster_terraform_backend_bucket = ""
    cluster_terraform_backend_key    = ""
    cluster_terraform_backend_region = ""
    create_target_group_attachment   = false
    enable_deletion_protection       = true
    ip_allow_list = [
      "10.1.10.0/16",
      "172.16.50.0/24",
      "192.168.100.0/24"
    ]
    ports = {
      "https": {
        "listen": 443,
        "protocol": "TCP",
        "target": 443
      }
    }
    vpc_terraform_backend_bucket = ""
    vpc_terraform_backend_key    = ""
    vpc_terraform_backend_region = ""
