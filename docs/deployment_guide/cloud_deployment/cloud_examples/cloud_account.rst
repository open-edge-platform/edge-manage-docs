Account module examples
=========================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

Account file examples
---------------------

.. code-block:: terraform
   :caption: variable.tfvar file example

    variable "codecommit_user_ssh_key" {
      type        = string
      default     = ""
    }

    variable "feature_flags" {
      type        = map(bool)
      default     = {
        codecommit = false
        iam_roles  = true
      }
    }

    variable "region" {
      type        = string
      default     = ""
    }

.. code-block:: terraform
   :caption: backend.tf file example

   region="us-west-2"
   bucket="example_bucket"
   key="us-west-2/account/environment_name"
