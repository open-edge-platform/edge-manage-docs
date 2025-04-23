Code Commit Access Key Refresh
==============================================

Code Commit user credentials expire annually. An Edge Orchestrator administrator will be notified by email from AWS\* that access keys are expiring for the ``_codecommit_user_ IAM`` user.

Additionally, access to the Edge Orchestrator GitOps deployment repositories from Argo CD will start to fail. This will result in failing deployments and updates on the managed cluster.

An Edge Orchestrator administrator will need to rotate the AWS Access keys for the credentials and provide the updated credentials to Edge Orchestrator.


Update AWS Account Credentials
--------------------------------

Each cluster has a dedicated IAM user named ``$CLUSTER_NAME_codecommit_user`` that is used to access the CodeCommit\* repositories hosting the GitOps configuration for the cluster.

When an administrator receives a notification email from AWS that the access key of IAM user ``$CLUSTER_NAME_codecommit_user`` is due to expire, they need to renew it through the following process:

#. Log in to the AWS IAM Management Console. Select
   ``$CLUSTER_NAME_codecommit_user`` to manage the account.

#. Select the **Security credentials** tab.

#. On the **Security credentials** tab, in the **Access keys** section, click the **Create access key** button to proceed through the steps to create a new access key.

   .. note:: If the **Create access key** button is not available, delete an existing access key for the account that is no longer in use.

#. Select "Other" on the **Access key best practices & alternatives** page.
   Click **Next** to proceed.

#. (Optional) Add a description for the new access key on the **Set description tag** page. Select **Create access key** to proceed.

#. Select **Download the .csv file** to retrieve a file containing the new
   ``Access key ID`` and ``Secret access key``. Store the ``.csv`` file in a secure location. You will need the ``Access key ID`` and ``Secret access key`` to update the Edge Orchestrator settings in the next step.


Provide the updated credentials to Edge Orchestrator
------------------------------------------------------

#. Start the `orchestrator-admin` environment in **[3] Manage an existing
   Cloud Edge Orchestrator** mode. Specify the cluster name and AWS region for the cluster you are updating.

#. Start the tunnel to the Orchestrator VPN using the
   ``./start-tunnel.sh`` script.

   .. code-block:: shell

      ./start-tunnel.sh

#. Go to the ``pod-configs`` directory:

   .. code-block:: shell

      cd ~/pod-configs

#. Use the following command to update the ``$CLUSTER_NAME_codecommit_user``
   credentials in the Edge Orchestrator environment.
   Refer to the ``.csv`` file downloaded in the previous stage for the
   ``Access key ID`` and ``Secret access key`` values:

   .. code-block:: shell

      utils/tool/update-codecommit-secret.sh \
        $CLUSTER_NAME \
        $AWS_REGION \
        "[Access key ID]" \
        "[Secret access key]"
