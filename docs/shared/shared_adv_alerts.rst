Configure Email Notifications
=================================================

Enable Mail Server (SMTP) for notifications
--------------------------------------------

An external SMTP server is required to enable alerts by email.

Set the following variables in the ``variable.tfvar`` file of the ``orch-init`` module:

.. code-block:: hcl

   smtp_url  = "smtp.example.com"                # address of the mail server
   smtp_port = 587                               # port of the mail server
   smtp_from = "Example User <mail@example.com>" # From: address that alerts will be sent with

   smtp_user = "example_basic_auth_user"         # Basic Auth username for mail server
   # smtp_pass - variable that will be set via `TF_VAR_smtp_pass` environment variable for Basic Auth password



Email Notifications
--------------------------------------------

Email notifications require an external SMTP server populated on
the target cluster. Refer to
`Enable Mail Server (SMTP) for Notifications <#enable-mail-server-smtp-for-notifications>`__ for additional details.

To enable email notifications, you need to add the `alerting-emails` profile to the *clusterValues*. See the following profile example:

.. code-block:: yaml

   root:
   useLocalValues: true
   clusterValues:
      - profiles/enable-platform.yaml
      - profiles/enable-o11y.yaml
      - profiles/enable-kyverno.yaml
      - profiles/enable-ma.yaml
      - profiles/enable-mc.yaml
      - profiles/enable-mi.yaml
      - profiles/enable-full-ui.yaml
      - profiles/enable-integration.yaml
      - profiles/enable-docs-service.yaml
      # proxy group must be specified as the first post-"enable" profile
      - profiles/proxy-none.yaml
      - profiles/profile-aws.yaml
      - profiles/o11y-release.yaml
      # This profile needs to be added to enable email alerts
      - profiles/alerting-emails.yaml
      - profiles/release-service-external.yaml
      - clusters/example.yaml

Using self-signed certificates with SMTP server
------------------------------------------------

When the notification feature sends alerts using an SMTP server,
it relays this to the Prometheus\* Alertmanager, which attempts to verify
the identity of the SMTP server using its SSL/TLS certificate.

Prometheus Alertmanager trusts CAs added by the Prometheus Team
from the Debian Linux distribution `ca-certificates <https://packages.debian.org/buster/all/ca-certificates/filelist>`_,
and checks that the certificate is signed by a trusted CA.

If the SMTP server is using a self-signed certificate, or a certificate signed by a non-public CA, this verification process will fail.
Self-signed certificates and certificates signed by non-public CAs aren't automatically trusted.

Configure self-signed or non-public SMTP server
+++++++++++++++++++++++++++++++++++++++++++++++

.. warning::
   Disabling verification makes the connection to the SMTP server less secure, as it allows connections to servers with untrusted certificates. Use this option only if you understand the risks.

Disable the SMTP server identity verification.

Add the following line in the configuration file to the Argo configuration.

.. code-block:: yaml

   argo:
      o11y:
         alertingMonitor:
            smtp:
               insecureSkipVerify: true

In this example, the ``insecureSkipVerify: true`` line disables the SMTP server identity verification.
