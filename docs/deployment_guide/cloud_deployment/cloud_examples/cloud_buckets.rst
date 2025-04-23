Bucket module examples
======================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

.. code-block:: terraform
    :caption: backend.tf file example

    path="the path to store tfstate"

.. code-block:: terraform
    :caption: variable.tfvar example

    bucket = "bucket_name"
    region = "us-west-2"
