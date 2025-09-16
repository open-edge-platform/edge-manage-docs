Get Started with Edge Orchestrator
==================================

The installer creates the environment necessary to deploy Edge Orchestrator, bring up all necessary services, and enable edge
node device onboarding.

Intel recommends using the scripted installer for Edge Orchestrator.

For specific service configurations, see the
:doc:`install Edge Orchestrator manually </deployment_guide/cloud_deployment/cloud_advanced/cloud_man_prereq>`
section.

System Requirements
-------------------

For system requirements, see the
:doc:`/deployment_guide/cloud_deployment/cloud_get_started/system_requirements_aws_orch`
section.

Prerequisites for Scripted Installation
---------------------------------------

* :doc:`/deployment_guide/cloud_deployment/cloud_appendix/cloud_aws_iam_permissions`
* AWS-based DNS service, or `AWS Route53 service <https://aws.amazon.com/route53/>`_
* A Windows* PC, Linux* PC, or macOS* PC with an internet connection
  for AWS setup and configuration.
* Any required proxy settings and network tunnels configured to enable a
  connection to AWS\* cloud and AWS cloud-hosted resources.

.. note::
   If you are running the install behind a firewall with a proxy,
   enable SOCKS and HTTPS proxy settings to install and manage the
   Edge Orchestrator cluster.

See an example of the proxy settings below.

.. code-block:: shell

   export http_proxy=http://proxy-dmz.mycorp.com:912
   export https_proxy=http://proxy-dmz.mycorp.com:912
   export socks_proxy=proxy-dmz.mycorp.com:1080
   export no_proxy=.eks.amazonaws.com,.mycorp.com,.local,.internal,.controller.mycorp.corp,.kind-control-plane,.docker.internal,localhost

Certificate Requirements
^^^^^^^^^^^^^^^^^^^^^^^^

See :doc:`/deployment_guide/cloud_deployment/cloud_get_started/cloud_certs`
for certificate requirements in Edge Orchestrator.

Supported AWS regions
^^^^^^^^^^^^^^^^^^^^^

Edge Orchestrator must be installed to an AWS Region with at least **three**
`Availability Zones* <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones>`_.

You can use an `AWS Region map <https://www.cloudregions.io/aws/regions-map>`_ that lists Availability Zones per region to verify
that the AWS Region you plan to install to has a minimum of three Availability Zones.

The Edge Orchestrator installer will verify that the selected AWS Region has at least three Availability Zones and error out if the requirement is not met.

For Firewall configuration, see
`Firewall Configuration </../../shared/shared_gs_iam>`__

.. toctree::
   :hidden:

   ../../../shared/shared_gs_firewall_config.rst
   system_requirements_aws_orch
   cloud_certs
   cloud_start_installer
   cloud_orchestrator_install
   ../../../shared/shared_gs_iam
   ../../../shared/shared_mt_overview
   ../../../shared/shared_next_steps

