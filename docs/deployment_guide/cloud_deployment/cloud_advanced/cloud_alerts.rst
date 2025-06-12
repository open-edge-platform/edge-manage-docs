Configure Email Notifications
=================================================

Enable Mail Server (SMTP) for notifications
-------------------------------------------

An external SMTP server is required to enable email alerts.

During the setup of the cluster provisioning configuration, you will be
prompted by an editor to edit the tfvars file and set the required variables.
For more information, see :doc:`../cloud_get_started/cloud_orchestrator_install`.

These variables also need to be set in the
`pod-configs/module/orch-init/variable.tf` file of the ``edge-manageability-framework`` repository.

.. code-block:: hcl

    smtp_user = "SMTP server username"
    smtp_pass = "SMTP server password"
    smtp_url = "SMTP server address"
    smtp_port = 587  # SMTP port of mail server, default is 587
    smtp_from = "SMTP from header"

Email Notifications
--------------------------------------------

Email notifications require an external SMTP server populated on
the target cluster. Refer to the section above, on SMTP, for additional details.

To enable email notifications, you need to add the `alerting-emails` profile to
the *clusterValues*. See an example of the following profile:

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

Prometheus Alertmanager trusts CAs added by the Prometheus Team from the Debian\* OS distribution `ca-certificates
<https://packages.debian.org/buster/all/ca-certificates/filelist>`_, and checks
that a trusted CA signs the certificate.

If the SMTP server is using a self-signed certificate or a certificate signed
by a non-public CA, this verification process will fail. Self-signed
certificates and certificates signed by non-public CAs are not automatically
trusted.

Configure self-signed or non-public SMTP server
------------------------------------------------

.. warning::
   Disabling verification makes the connection to the SMTP server less secure
   because this allows connections to servers with untrusted certificates.
   Use this option only if you understand the risks.

Disable the SMTP server identity verification.


Add the following line to the Argo CD configuration file:

.. code-block:: yaml

   argo:
      o11y:
         alertingMonitor:
            smtp:
               insecureSkipVerify: true

In this example, the ``insecureSkipVerify: true`` line disables the SMTP server
identity verification.

Troubleshooting
---------------

.. warning::
   You must only enable email notifications for alerts during the install phase.
   Intel does not support email notifications added during runtime.

Cluster examples provided in **orch-configs** contain
*profiles/alerting-emails.yaml* that enables alert notifications by default.
This implies that the secrets containing SMTP server data **needs to be
provided** during install phase, otherwise the **alerting-monitor** application
deployment will fail.

.. note::
   In the **profiles/alerting-emails.yaml** was enabled but required secrets
   were not provided, the deployment will fail.
   To recover from this, you need to provide the secrets containing SMTP
   server data, followed by redeployment of the full **alerting-monitor** application.

Turn off email notifications
-----------------------------
To turn off email notifications for alerts, you need to **remove**
**profiles/alerting-emails.yaml** from **target cluster definition**.
