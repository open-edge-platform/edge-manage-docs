Installation Flags
=====================

These flags are options for use with the ``provision.sh`` installer package.

.. code-block:: none

    utils/provision.sh
        <install | uninstall>
            Use 'install' to set up or 'uninstall' to remove.

        --auto
            Run the script in automatic mode without prompts.

        --aws-account {AWS ACCOUNT NUMBER}
            Specify the AWS account number.

        --customer-state-prefix {CUSTOMER STATE PREFIX}
            Define the customer state prefix.

        --email {ADMIN EMAIL}
            Set the admin email address.

        --environment {ENVIRONMENT NAME} (Optional)
            Specify the environment name.

        --new-aws-account (Optional)
            Indicate a new AWS account is being used.

        --parent-domain {PARENT DOMAIN} (Optional)
            Set the parent domain name.

        --region {AWS REGION}
            Define the AWS region.

        --socks-proxy {SOCKS PROXY} (Optional)
            Specify the SOCKS proxy.

        --skip-destroy-loadbalancer (Optional)
            Skip destroying the load balancer.

        --skip-destroy-cluster (Optional)
            Avoid destroying the cluster.

        --skip-destroy-vpc (Optional)
            Don't destroy the VPC.

        --skip-destroy-route53 (Optional)
            Prevent destruction of Route53 records.



Flag examples
-------------

To show the usage:

.. code-block:: shell

    /provision.sh install --help # Show the usage

To create a whole environment named customer1-env1:

.. code-block:: shell

    utils/provision.sh install --aws-account 1234567890 --customer-state-prefix customer1-bucket
    --environment customer1-env1 --parent-domain [root-domain].com --region us-east-1
    --email myname@abc.[root-domain] --socks-proxy proxy-dmz.example_proxy.com:1080

To initialize a new AWS account and create a whole environment named customer1-env1:

.. code-block:: shell

    utils/provision.sh install --aws-account 1234567890 --customer-state-prefix customer1-bucket
    --environment customer1-env1 --parent-domain [root-domain].com --region us-east-1
    --email myname@abc.[root-domain] --new-account --socks-proxy proxy-dmz.example_proxy.com:1080

To create an environment called customer1-env1 without Route53 and certificates:

.. code-block:: shell

    utils/provision.sh install --aws-account 1234567890 --customer-state-prefix customer1-bucket
    --environment customer1-env1 --region us-east-1 --socks-proxy proxy-dmz.example_proxy.com:1080

To destroy the environment named customer1-env1:

.. code-block:: shell

    utils/provision.sh uninstall --aws-account 1234567890 --customer-state-prefix customer1-bucket
    --environment customer1-env1 -parent-domain [domain].root-domain.com --region us-west-2 --email
    myname@abc.[root-domain] --socks-proxy proxy-dmz.example_proxy.com:1080

To destroy the environment named customer1-env1 which doesn't have a load balancer installed:

.. code-block:: shell

    utils/provision.sh uninstall --aws-account 1234567890 --customer-state-prefix customer1-bucket
    --environment customer1-env1 --parent-domain [domain].root-domain.com --region us-west-2
    --email myname@abc.[root-domain] --socks-proxy proxy-dmz.root-domain.com:1080
    --skip-destroy-loadbalancer
