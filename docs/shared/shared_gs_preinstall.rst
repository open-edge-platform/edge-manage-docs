Prepare Environment for Installation
==================================================

Set Up Sudo Privileges
--------------------------------

If you do not have ``sudo`` privileges for this environment, set them up
before installation.

.. code-block:: shell
   :caption: Example sudo command

   sudo usermod -aG sudo <user_name>
   echo "<user_name> ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/<user_name>

Set Correct Time and Date
--------------------------------

.. code-block:: shell
   :caption: Example NTP command

   sudo ntpdate [options] [time_server]

Update the Package Information
--------------------------------

.. code-block:: shell

   sudo apt-get update
   sudo apt-get upgrade

SRE Destination Endpoint
--------------------------------

If the SRE (Service Reliability Engineering) exporter service is enabled in Edge Orchestrator,
it exports SLI (Service Level Indicator) metrics allowing constant monitoring of Edge Orchestrator cluster availability and the health of edge node hosts using an external monitoring system.

The metrics are sent every time interval (default 30 seconds) to the external SRE Destination Endpoint.

To set up communication between the SRE exporter and SRE Destination Endpoint:

* Enable basic access authentication for the SRE destination server.
* The SRE endpoint server must support `Prometheus Remote Write protocol <https://prometheus.io/docs/concepts/remote_write_spec>`_
  with basic access authentication.
* If TLS is enabled, publicly trusted Certificate Authority (CA) certificates for the destination server are supported by default.
  Private server CA certificates are also supported if provided.

TLS Certificate for Edge Orchestrator
-----------------------------------------

A custom TLS certificate is required to be used for Edge Orchestrator. The
certificate is used to provide transport encryption for all communication
between the Edge Orchestrator, Edge Nodes and clients. For information on
certificate requirements, see:
:doc:`/deployment_guide/cloud_deployment/cloud_get_started/cloud_certs`.

.. note::
   Edge Orchestrator supports Self-Signed TLS certificates. However, the usage of such
   certificates may result in the Edge Orchestrator not being upgradable and clients
   being unable to access the Edge Orchestrator unless they explicitly trust the Self-Signed
   certificate. For more information, see:
   :doc:`/deployment_guide/cloud_deployment/cloud_get_started/cloud_certs`.
