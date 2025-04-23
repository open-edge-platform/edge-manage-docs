Certificate Requirements
==========================================

To install and configure Edge Orchestrator, generate or use an existing SSL
certificate.

The SSL certificate requires multiple subdomains for a single domain.

Edge Orchestrator requires the following information about the SSL certificate:

* Full certificate chain for root domain
* Private SSL key
* CA certificate bundle

Alternatively, the Edge Orchestrator supports automated certificate
management with certs issued by Let's Encrypt\*, eliminating the need for
manual certificate provisioning and maintenance. This feature provides a
streamlined and convenient approach for users who favor automation.

.. note::
   Certificates issued by Let's Encrypt\* are valid for 90 days. The Edge
   Orchestrator is designed to handle the renewal of this certificate seamlessly prior to its expiration.
