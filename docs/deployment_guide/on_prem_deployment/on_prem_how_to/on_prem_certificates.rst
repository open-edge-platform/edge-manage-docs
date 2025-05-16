Certificates
========================================

Edge Orchestrator installation requires an SSL certificate.

You may use the following certificates:

* A new certificate, generated with multiple subdomains and a SAN wildcard (recommended)
* An existing certificate with multiple subdomains and a SAN wildcard



New Certificate Requirements
------------------------------

Certificate providers may use different field names, but all providers offer
the following options during certificate creation:

- ``Subject: CN = *.[root domain]``
    Replace the variables with your root domain name.
- ``Subject Alternative Name: DNS: *.[root-domain], DNS:[root-domain]``
    Replace the variables with your root domain name.
- ``4096-bit`` encryption.



Installation Requirements
------------------------------

Edge Orchestrator installation requires the following certificate information:

- The full certificate chain for the root domain
- Private SSL key file
- CA certificate bundle

Gather these files before installing Edge Orchestrator.

Generate a New Certificate
------------------------------

Choose a method to generate a new certificate:

- Use the Amazon\* DNS service if you use AWS\* Cloud or AWS Route53\* DNS service.
- Generate a new certificate using a CSR generator or OpenSSL.
  This option works for most Certificate Authority (CA)
  providers.

Create an Amazon Certificate
+++++++++++++++++++++++++++++++

If you use the AWS DNS service, refer to `Requesting a public certificate <https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html>`_.

Verify that your Amazon certificate matches the
`Certificate Requirements <../../cloud_deployment/cloud_how_to/cloud_certificates#new-certificate-requirements>`__
before completing it.

Generate a New Certificate with CSR Generator
+++++++++++++++++++++++++++++++++++++++++++++++++

This option uses a web template to prompt for the required information,
and generates a CSR request and private key file. This file works for most
Certificate Authority (CA) providers.

#. Browse to `CSR Generator <https://csrgenerator.com/>`_.
#. Enter the required fields.
#. Add two ``Subject Alternative Names (SAN)`` entries:

   - A wildcard. For example, ``*.your-domain.com``.
   - The root domain. For example, ``your-domain.com``.

#. Select ``4096`` from **Key Size**.
#. Click **Generate CSR**.
#. Copy the certificate request information and paste it into a new text file called ``certificate.key``.
#. Copy the ``private key`` information and paste it into a new text file called ``private.key``.
#. Save these files in a secure location.
#. Follow your DNS provider's certificate installation instructions.

Generate a New Certificate from the Command Line
++++++++++++++++++++++++++++++++++++++++++++++++++++

This option prompts you for variables and makes an OpenSSL\* CSR and a private
RSA key file from the command line. This file is compatible with most CA providers.

#. From the command line, run

   .. code-block:: shell

      $ openssl req -nodes -newkey rsa:4096 -sha256 -keyout example.key -out example.csr

#. Save these files in a secure location.
#. Refer to the CA instructions to complete the certificate installation.
