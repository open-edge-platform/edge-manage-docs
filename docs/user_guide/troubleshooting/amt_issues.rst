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

- `Architecture Overview
  <https://device-management-toolkit.github.io/docs/2.27/Reference/architectureOverview/>`_
- `DMT Troubleshooting Guide
  <https://device-management-toolkit.github.io/docs/2.27/Reference/troubleshooting/>`_


Soft off - Shutdown Auto-Recovery
-----------------------------------

**Important:** When a vPro edge node is shut down via shutdown
(e.g., ``sudo shutdown now``), the device automatically powers back on
within ~48 seconds due to the EMF orchestrator desired-state
reconciliation mechanism.

**Background:** The orchestrator maintains a desired power state
(``desiredPowerState: POWER_STATE_ON``) for managed edge nodes. The
dm-manager service continuously reconciles the actual power state with
the desired state. When it detects a mismatch (device powered off but
desired state is ON), it automatically triggers a power-on operation
through the MPS API.

**Expected Behavior:**

**During Shutdown:**

- Edge Node OS executes shutdown command successfully
- System enters S5 (soft-off) state
- **CIRA connection remains active** (AMT stays powered in S5 when
  properly configured)
- UI displays power status error: ``"mismatch between desired and
  current power state"``

**Auto-Recovery Process:**

- Within next reconciliation cycle (~60 seconds), dm-manager detects
  power state mismatch
- MPS sends power-on command via AMT within 14-21 seconds of detection
- Device powers back on and returns to "Powered on" state in
  orchestrator UI
- Total recovery time: approximately 48 seconds

**Example from actual logs**:

- dm-manager detects ``POWER_STATE_OFF`` (mismatch detected)
- MPS power action sent successfully (21 seconds elapsed)
- Power state confirmed ``POWER_STATE_ON`` (48 seconds total)

**BIOS Configuration Requirement:**

For CIRA connection to persist during S5 (soft-off) state and enable
remote power-on, the following BIOS setting **must** be configured:

**Setting:** Advanced → Power → ME Configuration → Power Control → 
ME on in Host Sleep Status

**Required Value:** ``Mobile ON in S0, ME wake in S3, S4-S5 (AC only)``

**What This Configuration Enables:**

- CIRA connection remains active during shutdown (S5 state)
- Remote power-on capability via AMT during soft-off

**Note:** Without this setting, CIRA disconnects on shutdown, and the
device cannot be remotely powered on

**BIOS Verification Steps:**

1. Access BIOS setup during boot (typically F2 key)
2. Navigate to: Advanced → Power → ME Configuration → Power Control → 
   ME on in Host Sleep Status
3. Verify setting is: ``Mobile ON in S0, ME wake in S3, S4-S5 (AC only)``
4. Save and exit if changes are needed
