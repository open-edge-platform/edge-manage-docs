Certificate Requirements
============================================================

To install and configure Edge Orchestrator, Intel recommends using a
TLS Certificate issued by a public Certificate Authority (CA) for production deployments.

The TLS certificate and key should meet these requirements:

* Valid for at least one year from the deployment date
* If using an RSA key, we recommend a key size of at least 4096 bits
* Valid for the root domain and any subdomains by specifying respective DNS
  Subject Alternative Names (SANs) entries

You will need two files to proceed with the Edge Orchestrator installation:

1. `cert-bundle.crt`: A bundle that consists of a PEM-encoded
   certificate chain with the primary certificate for the domain, intermediate certificate, and root certificate in leaf-to-root order.
#. `key.key`: The PEM-encoded private key for the certificate.

An example of the `cert-bundle.crt` file is show below. Ensure the contents of the `cert-bundle.crt` file consist of a PEM-encoded certificate chain with the primary certificate for the domain,
intermediate certificate, and root certificate in leaf-to-root order before proceeding.

.. note::
   The CA certificate bundle that is installed with Edge Orchestrator cannot be changed after installation. It is recommended to use a CA certificate bundle that is valid for at least 10 years.

.. code-block:: shell

   -----BEGIN CERTIFICATE-----
   [primary cert for the domain]
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   [intermediate cert]
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   [root cert]
   -----END CERTIFICATE-----

An example of the TLS key `.key` file is shown below. Ensure the contents of the `key.key` file consist of a PEM-encoded private key before proceeding.
The key must be the private key that corresponds to the leaf certificate in the certificate bundle.

.. code-block:: shell

   -----BEGIN [key type] PRIVATE KEY-----
   [private key of the primary cert for the domain]
   -----END [key type] PRIVATE KEY-----

Certbot
--------------------------------------

`Certbot <https://certbot.eff.org/>`_ is a free, open-source software tool that automates the process of requesting a free publicly signed TLS certificate. To use Certbot, follow the instructions on the
`Certbot website <https://eff-certbot.readthedocs.io/en/latest/using.html>`_ to install and request a certificate for your domain.

If you intend to deploy Edge Orchestrator in an environment behind a firewall, you would need to use the Certbot's DNS feature with the
`corresponding DNS provider
plugin <https://eff-certbot.readthedocs.io/en/latest/using.html#dns-plugins>`_.

Certbot will generally name the certificate and key files as `fullchain.pem`
and `privkey.pem`, respectively. Be sure to rename these files to
`cert-bundle.crt` and `key.key` before proceeding with the Edge Orchestrator installation.

Self-Signed TLS Certificate
--------------------------------------

A Self-Signed TLS certificate can be used, but there are many limitations, and because of such, a Self-Signed TLS certificate is not recommended for
production deployments.

An Edge Orchestrator deployed with a Self-Signed certificate is not
upgradable, nor are the Edge Nodes that have been onboarded with that Edge
Orchestrator.

Using a Self-Signed certificate requires the certificate to be manually added to the trust stores of all clients (e.g., CLI tools, browsers, etc) that want to access the Edge Orchestrator.
If a client does not trust the Self-Signed certificate, the client's browser will display an insecure warning when attempting to access the Edge Orchestrator,
up to refusing to connect to the Edge Orchestrator.

See :doc:`/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_certificates` for information on how to generate a TLS certificate.
