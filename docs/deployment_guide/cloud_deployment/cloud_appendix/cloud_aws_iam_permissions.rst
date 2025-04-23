Required AWS\* IAM Permissions
==============================

Setting up AWS\* cloud-based Edge Orchestrator requires certain permissions.

.. note:: You can skip this step if you are using the cloud installer with AWS admin user, which has all the permissions.

If you are a non-admin user, contact your AWS administrator to set up the required permissions.

You can find the required permissions in the following AWS IAM policy files:

- :download:`IAM Policy 1 <files/iam-policy-1.json>`
- :download:`IAM Policy 2 <files/iam-policy-2.json>`
- :download:`IAM Policy 3 <files/iam-policy-3.json>`

.. note::

  The IAM policy JSON files are divided into three parts because there is a maximum size limit of 2,048 characters per IAM policy.
  This ensures that the required permissions fit within the constraints of AWS policy size limits.

Forward these files to your AWS administrator to set up the required permissions.
The AWS administrator can create a new IAM policy using the above files and attach it to the user or group that will be used to run the installer.
The AWS administrator can also create a new IAM role with the above permissions and assign it to the Amazon Elastic Compute Cloud\* (Amazon EC2\*) instance that will be used to run the installer.
