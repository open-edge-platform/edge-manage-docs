Elastic IP Limit Reached
========================

::

    Regions are given 5 EIPs by default.
    7 is needed for the orchestrator.
    To request more you need to contact Amazon support.
    This can be done on external accounts.
    Hybrid accounts require extra configuration to use private VPC IP address

Error: No Matching Route 53 Hosted Zone Found
=============================================

::

    Error: no matching Route 53 Hosted Zone found
      with module.route53_orch.data.aws_route53_zone.parent_public[0],
      on ../../module/orch-route53/main.tf line 13, in data "aws_route53_zone" "parent_public":
      13: data "aws_route53_zone" "parent_public" {

**Solution:** Need to create hosted zone manually that matches root domain

Error: Variable TF_VAR_tls_key is not set
=========================================

**Solution:** Add option ``--auto-cert``

The Installer Hangs on S3 Bucket Pull
======================================

::

    Installer hangs during S3 bucket operations

**Solution:** Make sure the ``no_proxy`` is set, even when using external deployments

ACME Challenge Fail
===================

::

    Hint: The Certificate Authority failed to verify the DNS TXT records created by --dns-route53. 
    Ensure the above domains have their DNS hosted by AWS Route53.

    Some challenges have failed.
    Ask for help or search for solutions at https://community.letsencrypt.org. 
    See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.

**Solution:** To fix go to Route53 registered domains and buy a new domain, or change to one that's already there.

Can't Start SSH Tunnel
=======================

::

    orchestrator-admin:~$ curl -L -4 iprs.fly.dev
    <public ip address>
    orchestrator-admin:~$ ./start-tunnel.sh 
    Info: Starting SSH tunnel...
    Info: SSH tunnel created.
    orchestrator-admin:~$

**Solution:** 

1. If you have your public IP address before install, add it to the ``--jumphost-ip-allow-list`` option of the ``provision.sh``
2. **Alternative:** Get public IP address, and through the AWS web UI, add it to the inbound security rules of your jumphost with ``/32`` (e.g., ``134.x.x.x/32``) allow SSH

Error: Invalid multi-line string
================================
**Solution:**
::
    tls_key=$(cat <<EOF
    multi
    line
    string
    EOF
    )


