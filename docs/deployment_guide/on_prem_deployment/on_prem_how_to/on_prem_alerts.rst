Configure Email Notifications
================================================


Enable Mail Server (SMTP) for notifications
------------------------------------------------

Email notifications require an external SMTP server populated on
the target cluster.

Set the following variables in the ``variable.tfvar`` file of the ``orch-init`` module.

.. code-block:: hcl

   smtp_url  = "smtp.example.com"                # address of the mail server
   smtp_port = 587                               # port of the mail server
   smtp_from = "Example User <mail@example.com>" # From: address that alerts will be sent with

   smtp_user = "example_basic_auth_user"         # Basic Auth username for mail server
   # smtp_pass - variable that will be set via `TF_VAR_smtp_pass` environment variable for Basic Auth password



Email notifications
------------------------------------------------

To enable email notifications, add the `alerting-emails` profile
to the *clusterValues*. See the example of the profile below.

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
      - profiles/proxy-none.yaml
      - profiles/profile-aws.yaml
      - profiles/o11y-release.yaml
      # This profile needs to be added to enable email alerts
      - profiles/alerting-emails.yaml
      - profiles/release-service-external.yaml
      - clusters/example.yaml

Using self-signed certificates with an SMTP server
------------------------------------------------

When the notification feature sends alerts through an SMTP server,
it relays this to the Grafana* Prometheus Alertmanager, which attempts to verify
the identity of the SMTP server using its SSL/TLS certificate.

Prometheus Alertmanager trusts Certificate Authorities (CA) added by the Prometheus Team
from Linux Debian* `ca-certificates <https://packages.debian.org/buster/all/ca-certificates/filelist>`_,
and checks that a trusted CA signs the certificate.

If the SMTP server is using a self-signed certificate or a certificate signed by a non-public CA,
this verification process will fail. Self-signed certificates and certificates signed by
non-public CAs aren't automatically trusted.

Configure self-signed or non-public SMTP server
-----------------------------------------------

.. warning::
   Disabling verification allows connections to servers with untrusted certificates, hence making the connection to the SMTP server less secure.
   Use this option only if you understand the risks.

#. Disable the SMTP server identity verification.
#. Add the following line in the configuration file to the Argo configuration.

   .. code-block:: yaml

   argo:
      o11y:
         alertingMonitor:
            smtp:
               insecureSkipVerify: true

  In this example, the ``insecureSkipVerify: true`` line disables the SMTP server identity verification.

Troubleshooting
---------------

.. warning::
   You must only enable email notifications for alerts during the installation phase.
   Intel does not support email notifications added during runtime.

Cluster examples provided in **orch-configs** contain *profiles/alerting-emails.yaml* that enables alert notifications by default. This implies that the secrets containing SMTP server data **needs to be provided** during the installation phase, otherwise the **alerting-monitor** application deployment will fail.

.. note::
   In the **profiles/alerting-emails.yaml** was enabled but required secrets were not provided, the deployment will fail. To recover from this, you need to provide the secrets containing SMTP server data, followed by redeployment of the full **alerting-monitor** application.

To turn off email notifications for alerts, you need to **remove** the **profiles/alerting-emails.yaml** file from the **target cluster definition**.
