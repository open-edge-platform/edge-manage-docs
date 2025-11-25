AMT Issues
======================

This section covers troubleshooting AMT issues for Edge Orchestrator.

External Power Off on vPro Edge Nodes
---------------------------------------

**Important:** External power operations should **NOT** be performed on
vPro-initiated edge nodes.

**Background:** When an external power off is performed (e.g., physically
pressing the power button or using APC/KVM/BMC to power off the device), it
completely shuts down the edge node at the CSME level.
From the Device Management Toolkit (DMT) perspective,
this results in MPS losing its CIRA connection with the edge node.

**Expected Behavior:**

- When a vPro edge node is powered off externally, the CIRA connection to MPS
  is immediately lost
- MPS will attempt to communicate with the device and receive timeout errors
- After multiple timeout failures, MPS will disconnect the CIRA connection and
  update the device status in the database
- Once CIRA is disconnected, MPS returns 404 "Device not found/connected"
  errors for subsequent power operation requests
- The orchestrator UI may continue showing the last known power status
  (e.g., "Powered on") even though the device is disconnected. 
- Power operations initiated from the orchestrator UI will fail with "Device not
  found/connected" errors

**Recommendation:** Always use the orchestrator UI or orch-cli to perform power
operations (Power On, Power Off, Restart) rather than external methods to
maintain proper device state management and CIRA connectivity.

**Reference:**

- `Architecture Overview <https://device-management-toolkit.github.io/docs/2.27/Reference/architectureOverview/>`_
- `DMT Troubleshooting Guide <https://device-management-toolkit.github.io/docs/2.27/Reference/troubleshooting/>`_

