Uninstall Edge Orchestrator infrastructure
======================================================

Uninstall the Edge Orchestrator infrastructure, including removing Route53
and other associated applications.

Uninstall and Destroy the Environment
----------------------------------------------------------

#. Go to the root installation directory on the host.
#. Edit the script below to match your environment and credentials.

   .. code-block:: shell

      utils/provision.sh uninstall
        --aws-account [AWS account number] \
        --customer-state-prefix [bucket-name] \
        --environment [environment-name] \
        --parent-domain [domain].root-domain.com \
        --region [us-west-2] \
        --email [myname@abc.[root-domain]]

   Add the ``--socks-proxy $socks-proxy`` parameter if you are running the
   installer from behind a proxy. This parameter is blank by default.

Uninstall Edge Orchestrator with no load balancer installed
--------------------------------------------------------------

#. Navigate to the root installation directory on the host.
#. Edit the script below to match your environment and credentials.

   .. code-block:: shell

      utils/provision.sh uninstall
        --aws-account [AWS account number] \
        --customer-state-prefix [bucket-name] \
        --environment [environment-name] \
        --parent-domain [domain].root-domain.com \
        --region [us-west-2] \
        --email [myname@abc.[root-domain]] \
        --skip-destroy-loadbalancer

   Add the ``--socks-proxy $socks-proxy`` parameter if you are running the
   installer from behind a proxy. This parameter is blank by default.


For a full list of flags available, refer to
`flag examples <../cloud_examples/cloud_flags#flag-examples>`__.
