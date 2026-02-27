Modular vPro Workflow Deployment
================================

This modular workflow provides a simplified, end-to-end process for activating
and managing devices by using Intel® vPro™ Active Management Technology (AMT)
and Intel® Standard Manageability (ISM). It uses lightweight, modular
components that run on both the control plane and edge node to deliver
out-of-band (OOB) management capabilities.

This design makes Intel® OOB management features easy for partners to adopt:

- Partners can directly integrate these modular components into their own
  edge-management platforms.
- This integration provides built-in support for Intel® vPro™ OOB capabilities
  without requiring deployment or maintenance of the full Edge Management
  Framework (EMF).

The workflow eliminates the complexity of extracting only OOB components from
EMF. Instead of dealing with the overhead of the complete EMF stack, partners
can consume focused, modular components for vPro™ AMT/ISM activation and OOB
device control.

By delivering these capabilities as self-contained modules, Intel enables
partners to accelerate integration timelines, reduce development effort, and
deliver OOB device-management functionality to customers quickly and reliably.

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

Automated vPro software Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An installer package automates the provisioning of vPro control-plane and
edge-node software, reducing manual setup and configuration effort.

Automated vPro Activation
~~~~~~~~~~~~~~~~~~~~~~~~~
Typically, vPro activation requires a field engineer to install agents and
credentials to activate vPro AMT or ISM on the edge device. This workflow
automates the activation process, enabling devices to be activated without user
interaction and reducing operating expenses (OpEx).

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

System Requirements 
-------------------

The modular vPro workflow has control plane and edge node environments. 
Here are the minimum requirements for these two environment. 

Control Plane Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Linux-based operating system (Ubuntu 24.04 LTS)
- Kubernetes cluster (for container orchestration)
- Network connectivity to edge nodes

Edge Node Requirements
~~~~~~~~~~~~~~~~~~~~~~

- Intel® vPro™ platform with AMT or ISM support
- Network connectivity to the control plane
- Compatible operating system (Ubuntu 24.04 LTS)

Evaluation Deployment Instructions
----------------------------------

Install control-plane
~~~~~~~~~~~~~~~~~~~~~~

Install edge node components
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify edge node on the control-plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Activate vPro on the edge node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify vPro activation on the control plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform out-of-band power management operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Uninstall edge node components
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Partner Developers
------------------

- Explain the modular workflow directory structure, highlighting key components
  and their roles in the workflow. Provide guidance on navigating the codebase
  and understanding the interactions between modules.
- Explain how customers can integrate modular workflow components into their own
  device-management platforms, including required APIs, configuration steps,
  and best practices for seamless integration.

