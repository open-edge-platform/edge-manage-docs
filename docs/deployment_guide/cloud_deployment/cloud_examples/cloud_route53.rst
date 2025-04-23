Orch-Route53 Module Examples
===============================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

.. code-block:: terraform
    :caption: backend.tf example

    region="us-west-2"
    bucket="example-bucket"
    key="use-west-2/external/orch-route53/my-env"

.. code-block:: terraform
    :caption: variable.tfvar example

    lb_created   = false
    orch_name = ""
    parent_zone  = ""
    vpc_id       = ""
    vpc_region   = "us-west-2"
