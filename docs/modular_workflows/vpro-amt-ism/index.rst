Modular vPro Workflow Deployment
================================

This workflow demonstrates an end-to-end activation and device-management
process using Intel® vPro™ Active Management Technology (AMT) and
Intel® Standard Manageability (ISM). It deploys modular components on both the
control plane and the edge node to deliver out-of-band management capabilities.

Partner Responsibilities
------------------------

When evaluating this workflow, partners are responsible for the following areas:

- Device OS provisioning
- Device onboarding
- Firmware and software upgrades
- Cluster management
- Application lifecycle management
- Observability and telemetry management

Workflow Capabilities
---------------------

The modular vPro workflow provides the following capabilities:

Automated Provisioning
~~~~~~~~~~~~~~~~~~~~~~

An installer package automates the provisioning of vPro control-plane and
edge-node software, reducing manual setup and configuration effort.

Automated vPro Activation
~~~~~~~~~~~~~~~~~~~~~~~~~

Intel® vPro™ technology is activated automatically in one of two modes:

- **Client Control Mode (CCM)** — Provides a subset of management features
  with user consent.
- **Admin Control Mode (ACM)** — Enables full remote management capabilities
  without user interaction.

Out-of-Band Power Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Remote power operations are available independent of the operating system state:

- **Power On** — Remotely start a powered-off device.
- **Power Off** — Remotely shut down a running device.
- **Power Cycle** — Restart a device through a full power-off and power-on
  sequence.
- **Power Status Retrieval** — Query the current power state of a device.
