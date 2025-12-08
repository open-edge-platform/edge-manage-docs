
========================================
Intel® In-Band Manageability (INBM)
========================================

This guide describes how Intel® In-Band Manageability (INBM) integrates
with the Edge Manageability Framework to enable OS updates, firmware
updates, and system configuration management for edge devices.

Overview
--------

In-Band Manageability (INBM) is an **edge node agent component** that
executes package and OS updates on edge devices. INBM runs on edge nodes and
responds to update requests from Edge Orchestrator.

When you trigger updates through the Edge Orchestrator Web UI or orch-cli, the
operations flow through this architecture:

**Update Flow**: Edge Orchestrator UI/orch-cli → Edge Infrastructure Manager API → inventory
Maintenance Manager → Platform Update Agent → In-Band Manageability Daemon

The INBM framework on the edge node consists of:

- **inbd**: The In-Band Manageability daemon running on the edge node that
  executes package and OS updates via gRPC
- **inbc**: Internal client used by Platform Update Agent to communicate
  with inbd
- **Platform Update Agent**: Edge node agent that coordinates system
  updates between Maintenance Manager and INBM components

Supported Operations
^^^^^^^^^^^^^^^^^^^^

The INBM edge node agent supports the following operations when triggered
from Edge Orchestrator:

- **OS Updates (SOTA)**: Update system packages on mutable OS edge nodes
- **Source Management**: Add/update APT repository sources for package
  installation

Prerequisites
-------------

INBM is automatically installed and configured on edge nodes provisioned
through Edge Orchestrator. Ensure:

- Edge node is provisioned and connected to Edge Orchestrator
- inbd daemon service is running on the edge device
- Platform Update Agent service is running on the edge device

Check Service Status
^^^^^^^^^^^^^^^^^^^^

To verify INBM services are running on an edge node:

.. code-block:: bash

   # Check In-Band Manageability daemon
   sudo systemctl status inbd

   # Check Platform Update Agent
   sudo systemctl status platform-update-agent

OS Updates via Edge Orchestrator
---------------------------------

To update system packages on edge nodes with mutable operating systems,
use the OS Update Policy feature in the Edge Orchestrator Web UI.

Creating an OS Update Policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An **OS Update Policy** specifies which packages to update and from which
repositories. For detailed instructions on creating OS Update Policies,
see:

- :doc:`/user_guide/advanced_functionality/apply_new_os_update_policy`
- :doc:`/user_guide/advanced_functionality/install_new_packages`

When you create an OS Update Policy with package updates:

#. Specify the packages to update in the **Update Packages** field
#. Optionally provide new APT sources in the **APT Sources** field
#. Associate the policy with edge node instances

Update Execution Process
^^^^^^^^^^^^^^^^^^^^^^^^

When a maintenance window starts for an edge node:

#. Maintenance Manager on Edge Orchestrator sends update instructions to
   Platform Update Agent on the edge node
#. PUA invokes In-Band Manageability to execute the update
#. inbd downloads packages from configured repositories
#. inbd installs the packages on the system
#. PUA reports update status back to Maintenance Manager
#. Edge Orchestrator UI displays update progress and completion status

The update process is fully automated through the orchestration flow.

.. note:: For immutable operating systems like Edge Microvisor Toolkit,
   see :doc:`/user_guide/advanced_functionality/host_update_immutable_os`
   for the OS image update process.

For more information on scheduling maintenance windows, see:
:doc:`/user_guide/advanced_functionality/host_schedule_main`

Package Source Management
--------------------------

When installing new packages not available in default repositories, you
can specify custom APT sources in the OS Update Policy.

For complete examples, see:
:doc:`/user_guide/advanced_functionality/install_new_packages`

INBM Service status
^^^^^^^^^^^^^^^^^^^

If INBM services are not running on an edge node:

.. code-block:: bash

   # Check inbd service status
   sudo systemctl status inbd

   # Check Platform Update Agent status
   sudo systemctl status platform-update-agent

   # View service logs
   sudo journalctl -u inbd -n 50
   sudo journalctl -u platform-update-agent -n 50

   # Restart services if needed
   sudo systemctl restart inbd
   sudo systemctl restart platform-update-agent

Package Repository Issues
^^^^^^^^^^^^^^^^^^^^^^^^^

If package installation fails due to repository access:

#. Verify repository URLs are accessible from the edge node
#. Check GPG key configuration in APT sources
#. Ensure edge node has network access to repository servers
#. Validate DEB822 format syntax for custom APT sources

Additional Resources
--------------------

- :doc:`/user_guide/advanced_functionality/apply_new_os_update_policy`
- :doc:`/user_guide/advanced_functionality/install_new_packages`
- :doc:`/user_guide/advanced_functionality/host_update_immutable_os`
- :doc:`/user_guide/advanced_functionality/host_schedule_main`
- :doc:`/user_guide/troubleshooting/index`

Troubleshooting
----------------------------

- **Package Installation:** The in-band-manageability package must be
  installed and enabled on the edge node:

  .. code-block:: bash

     sudo apt install -y in-band-manageability
     sudo systemctl enable inbd
     sudo systemctl start inbd

- **Permissions:** Most INBM operations require root/sudo privileges

- **Network Access:** Device must have network connectivity for downloading
  updates

Service Management
------------------

The inbd daemon is managed as a systemd service.

**Check Service Status:**

.. code-block:: bash

   sudo systemctl status inbd

**Start Service:**

.. code-block:: bash

   sudo systemctl start inbd

**Stop Service:**

.. code-block:: bash

   sudo systemctl stop inbd

**Enable Service (start on boot):**

.. code-block:: bash

   sudo systemctl enable inbd

**View Service Logs:**

.. code-block:: bash

   sudo journalctl -fu inbd

---------

- `INBM Architecture
  <https://github.com/open-edge-platform/edge-node-agents/blob/main/in-band-manageability/README.md>`_
- `Configuration Parameters
  <https://github.com/open-edge-platform/edge-node-agents/blob/main/in-band-manageability/doc/ConfigurationParameters.md>`_

