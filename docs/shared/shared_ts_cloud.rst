Troubleshooting AWS\* Cloud
===========================

AWS\* Cloud Authentication Issues
---------------------------------

You must have administrator access on the AWS account to deploy Edge
Orchestrator. If you encounter an error message similar to any one of these:

.. code-block:: shell

   An error occurred (AccessDenied) when calling ...

   An error occurred (ExpiredTokenException) when calling ...

   ... https response error StatusCode: 403 ...

One of three issues is causing the error:

1. Your AWS credentials may have expired, or
#. You may not have the necessary permissions, or
#. The active credentials may be for the wrong AWS account.

The credential expiration is the most common problem and the one to check
first. Either re-run the AWS SSO sign-in process or refresh the AWS credentials
in the environment from the AWS Web UI or CLI.

If the issue persists, check the AWS account permissions. Ensure that the AWS account has the necessary administrator
permissions for the account where you are deploying Edge Orchestrator.

Failed Amazon Virtual Private Cloud\* Tunnel Issues
---------------------------------------------------

A failed Amazon VPC tunnel is harder to diagnose because it is generally
indicated by either a silent failure prior to provisioning completion or a
boundless timeout during the database initialization phase of provisioning.

This database provisioning is a time-consuming process and can take up to 60 minutes to complete. If the process is running longer than 90 minutes,
you can cancel the operation and check the VPC tunnel.

To check the vpc tunnel, run the following command:

.. code-block:: shell

   ps -ax | grep sshuttle

The output of the ``ps`` command will show several ``sshuttle`` related processes running. If the processes are not running, something has prevented the tunnel from being established or caused it to be reset.

The most common cause for this failure is a missing or invalid ``socks_proxy`` environment variable. Ensure that the
``socks_proxy`` environment variable is set to a working proxy server that supports SOCKS proxy connections. If
you have ``https_proxy`` set, you must also have ``socks_proxy`` set.

If the tunnel is still failing with a valid ``socks_proxy`` set, there may be a network configuration issue that will
require support from your on-site IT team or network administrator.

Insufficient Quota Issues
-------------------------

Several quota-limited AWS cloud resources are required when provisioning an
Edge Orchestrator cluster. If you encounter an error message similar to
one of these:

.. code-block:: shell

   Error: ... quota is insufficient. ...

   An error occurred (ResourceLimitExceeded) when calling ...

You may need to request a quota increase from AWS Support.  To request a
service quota increase, refer to
`Requesting a quota increase <https://docs.aws.amazon.com/servicequotas/latest/userguide/request-quota-increase.html>`_.

If you are seeing a ``quota is insufficient`` error that you believe is
erroneous or if you have already requested a quota increase that is failing a
check, you can rerun the failing ``provision.sh`` operation and add the
``--skip-quota-check`` flag to the command line. This flag will skip the quota
check and try to provision the cluster without checking the quotas.

Intel does not recommend adding the flag and this may fail with a
``((ResourceLimitExceeded))`` error, but it may be useful if there is a
resource usage estimation error causing the check to fail when the AWS cloud still allows the resource to be provisioned.
