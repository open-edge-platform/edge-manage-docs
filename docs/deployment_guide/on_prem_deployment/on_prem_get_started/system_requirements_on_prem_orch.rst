Open Edge Platform System Requirements
============================================================

Edge Orchestrator On-Premises Resource Requirements
--------------------------------------------------------

* OS: Ubuntu 24.04 Server LTS.

* Storage: 1x Storage Device (SSD, HDD or NVMe) needed to install the OS to
  and needs to be at least 256 Gb; Intel suggests 512 Gb.

* Networking

  * 1-gigabit networking interface card capable of providing connection in the on-premises network.
  * 1-gigabit upstream network connectivity for Edge Orchestrator component download.
  * Connectivity outbound to the public internet.

* Compute resources

  * For  deployments (10 ENs), Intel recommends the following compute resources setups:

     * RAM: 32 GiB
     * CPU: 8 physical cores
     * Disk: 256 GiB

  * For deployments (1.000 ENs), Intel recommends the following compute resources setups:

     * RAM: 475 GiB
     * CPU: 128 physical cores
     * Disk: 2 TiB

Storage consumption varies with environment-specific details, including user-specific telemetry collection policies and application log generation.
With the specifications above, the system has been validated to support up to 1000 edge nodes concurrently connected, 100 of with a cluster deployed on it and one application.

.. note::
   The above specifications are not tested with Observability profile enabled. Enabling Observability will require additional resources, and the exact requirements will depend on the scale of telemetry collection and retention policies.

Supported OS and Browsers
--------------------------------------------------------

Edge Orchestrator does not require local installation on your OS. You can
access it using your browser. Thus, it does not require any specific OS
version as long as a graphical user interface and a web browser are available.

The supported browsers are:

   * Chrome\*
   * Edge\*
   * Safari\*
   * Firefox\*

For the best Edge Orchestrator experience, use the Chrome browser.
