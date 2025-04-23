Manual Installation Prerequisites
===============================================

.. warning::
   The manual installation process is recommended only for specific service configurations.

Operating system
-------------------

- Linux* or macOS* operating system

Services
-------------------

- An `AWS* cloud account with IAM permissions <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_
- The `AMI ID for EKS <https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-amis.html>`_
- AWS-based DNS service, or `AWS Route53 service <https://aws.amazon.com/route53/>`_

.. note::
   Intel provides a Terraform configuration in the installer package for
   use with the AWS Route53 service.

Certificate
-------------------

- :doc:`Certificate information </deployment_guide/cloud_deployment/cloud_how_to/cloud_certificates>`

Tools
-------------------

- `jq <https://jqlang.github.io/jq/>`_
- `sshuttle <https://sshuttle.readthedocs.io/en/stable/manpage.html>`_
- `Terraform* software <https://developer.hashicorp.com/terraform/install?ajs_aid=7f4cd4e7-1982-49e9-b76c-e7c13ae12336&product_intent=terraform>`_ version 1.5.4 or higher
- `AWS Command Line Interface <https://aws.amazon.com/cli/>`_ version 2.9.8 or higher
- psql or `PostgreSQL* database system <https://www.postgresql.org/download/>`_ version 15.4 or higher
- `asdf <https://asdf-vm.com/>`_
- `Go* programming language <https://go.dev/>`_
- `Python* programming language <https://www.python.org/>`_ version 3 or higher
- `Mage <https://magefile.org/>`_
- `Kustomize <https://kustomize.io/>`_
- `kubectl <https://kubernetes.io/docs/reference/kubectl/>`_
- `Helm* chart <https://helm.sh/>`_
