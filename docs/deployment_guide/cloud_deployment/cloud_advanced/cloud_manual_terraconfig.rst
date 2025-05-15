Manual Installation - Terraform Configuration
==============================================

Create S3 Bucket for AWS Cloud
------------------------------

.. warning::
   Use only the AWS CLI for bucket creation. Do not create a bucket through the AWS Management Console.

#. Use AWS CLI to `create a new S3 bucket <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html>`_.
#. Note the bucket name, region, and key.

Create a Directory and Set Up Terraform Configuration
------------------------------------------------------

#. In a terminal, navigate to the environment's main directory.
#. Create a new directory with the S3 bucket name:

   .. code-block:: bash

      mkdir -p buckets/environments/<bucket_name>

#. Copy the ``backend.tf`` and ``variable.tfvar`` files from the example directory into the new bucket directory:

   .. code-block:: bash

      cp example-config/buckets/{backend.tf,variable.tfvar} buckets/environments/<bucket_name>

   The ``backend.tf`` file specifies where to store the Terraform state for this bucket deployment.
   Store the Terraform state with the ``backend.tf`` and ``variable.tfvar`` file here. See the following example:

   .. code-block:: bash

      path="environments/<bucket_name>/terraform.tfstate"

#. Edit the ``variable.tfvar`` file.
#. Change the ``path``, ``region`` and ``bucket`` to match the AWS S3 bucket settings. See the following example:

   .. code-block:: bash
      :caption: variable.tfvar example

      path="path_to_tfstate"
      region="us-west-2"
      bucket="<bucket_name>"

#. Apply the Terraform configuration with the bucket name. This applies the configuration for the ``buckets``
   module with the :emphasis:`<bucket_name>` from the ``backend.tf`` and ``variable.tfvar``:

   .. code-block:: bash

      make apply module=buckets env=<bucket_name>

#. Type ``yes`` to complete the configuration.

Scale-Related Terraform Configurations
--------------------------------------

This section summarizes all scale-related Terraform configurations in the ``variable.tfvar`` file.
You will need to adjust the following according to the target deployment scale:

.. code-block:: terraform

   // The spec of each K8s node
   // Recommendations: Start with t3.2xlarge. Increase for higher scale as per platform system requirements section.
   variable "eks_node_instance_type" {
      default = "t3.2xlarge"
   }

   // Each instance type can support up to a certain number of pods per node.
   // Find the right eks_max_pods value for a given instance type at
   // https://github.com/aws/amazon-vpc-cni-k8s/blob/master/misc/eni-max-pods.txt
   variable "eks_max_pods" {
      default = 58
   }

   // This determines the Aurora Capacity Units (ACU) for the database
   // Recommendations: Start with 2 max ACU. Increase for higher scale as per platform system requirements section.
   variable "aurora_max_acus" {
      type        = number
      default     = 2
   }

   // Need to switch to "elastic" mode for high throughput
   // Recommendations: Always use "elastic"
   variable "efs_throughput_mode" {
      type    = string
      default = "bursting"
   }
