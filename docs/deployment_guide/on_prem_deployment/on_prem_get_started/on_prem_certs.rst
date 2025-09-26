Certificate Requirements
========================

Edge Orchestrator requires TLS certificates for secure communication. Choose your certificate approach:

Certificate Options
--------------------

.. list-table:: Certificate Types
   :header-rows: 1
   :widths: 30 35 35

   * - Certificate Type
     - Best For
     - Limitations
   * - **Public CA Certificate (Recommended)**
     - Production deployments
     - Requires public domain
   * - **Self-Signed Certificate**
     - Testing/development only
     - Not upgradable, trust issues

Required Files
--------------

You need two files for Edge Orchestrator installation:

1. **cert-bundle.crt**: Certificate chain in PEM format (leaf → intermediate → root)
2. **key.key**: Private key in PEM format

Certificate Specifications
--------------------------

Your certificate must:

* Be valid for at least one year
* Use RSA key size of 4096 bits minimum
* Include Subject Alternative Names (SANs) for your domain and subdomains
* Be in PEM format

Quick Setup with Certbot (Public CA)
=====================================

For production deployments, use Certbot to get free certificates from Let's Encrypt:

1. **Install Certbot**: Follow instructions at `Certbot website <https://certbot.eff.org/>`_

2. **Request Certificate**:

   .. code-block:: shell

      # For public domains with HTTP validation
      certbot certonly --webroot -w /var/www/html -d yourdomain.com

      # For domains behind firewall (DNS validation)
      certbot certonly --dns-plugin -d yourdomain.com

3. **Rename Files**: Certbot creates ``fullchain.pem`` and ``privkey.pem``. Rename them:

   .. code-block:: shell

      cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem cert-bundle.crt
      cp /etc/letsencrypt/live/yourdomain.com/privkey.pem key.key

Self-Signed Certificates (Development Only)
============================================

.. warning::
   **Production Limitation**: Self-signed certificates prevent upgrades and require manual trust configuration.

For development environments only. See :doc:`/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_certificates` for generation instructions.

File Format Examples
====================

**cert-bundle.crt format**:

.. code-block:: text

   -----BEGIN CERTIFICATE-----
   [primary cert for the domain]
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   [intermediate cert]
   -----END CERTIFICATE-----
   -----BEGIN CERTIFICATE-----
   [root cert]
   -----END CERTIFICATE-----

**key.key format**:

.. code-block:: text

   -----BEGIN [key type] PRIVATE KEY-----
   [private key of the primary cert for the domain]
   -----END [key type] PRIVATE KEY-----

.. note::
   **Important**: The CA certificate bundle cannot be changed after installation. Use certificates valid for at least 10 years.
