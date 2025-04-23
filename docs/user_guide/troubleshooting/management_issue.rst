Management Issues
=================================

This section covers management troubleshooting issues of Edge Orchestrator.


* `Failure to update application <#failure-to-update-application>`__
* `Issues DKAM pod configuration is changed or pod is restarted <#issues-dkam-pod-configuration-is-changed-or-pod-is-restarted>`__
* `Failure to update host software <#failure-to-update-host-software>`__
* `Failure to update cluster component <#failure-to-update-cluster-component>`__
* `An updated version of the app does not provide the desired functionality <#an-updated-version-of-the-app-does-not-provide-the-desired-functionality>`__
* `Certificate update goes wrong and the system is disconnected from Edge Orchestrator <#certificate-update-goes-wrong-and-the-system-is-disconnected-from-edge-orchestrator>`__
* `USB peripherals cannot connect to the updated application <#usb-peripherals-cannot-connect-to-the-updated-application>`__



Failure to update application
----------------------------------

**Symptom:** Failure to update application.

**Solution:** The recovery should be automatic. The previous version of the
application will not be brought down unless the new version is up and running
as per readiness and liveliness checks defined in the Helm* chart.
However, if the issue still persist, contact Intel engineering and support.


Issues DKAM pod configuration is changed or pod is restarted
------------------------------------------------------------------

**Symptom:** When DKAM pod configuration is changed or pod is restarted, OS
image is rebuilt and has a different signature, which results in certificate
validation failure by onboarding Edge Nodes.

**Solution:** Update certificates in onboarding Edge Nodes using ``racadm``.


Failure to update host software
----------------------------------

**Symptom:** Failure to update host software.

**Solution:** For the 23.08 LA release, the resolution is to reinstall the
entire host software stack.
There is no end-user process for recovery for this condition, so contact Intel
engineering or support for assistance.

Failure to update cluster component
---------------------------------------

**Symptom:** Failure to update cluster component.

**Solution:** For the 23.08 LA release, the resolution is to reinstall the
entire Host software stack. There is no end-user process for recovery from this
condition. Contact Intel engineering or support for assistance.

An updated version of the app does not provide the desired functionality
----------------------------------------------------------------------------

**Symptom:** An updated version of the app does not provide the desired
functionality.

**Solution:** Reinstall the previous version of the deployment package through
|software_prod_name| which contained the older version of the application known
to work. To reinstall the previous version of the deployment package, follow
these steps:

    * Find or create a Deployment Package that contains the version of the
      application that is known to function correctly.
    * Create a new Deployment using that Deployment Package for the node that
      was updated.

Certificate update goes wrong and the system is disconnected from
|software_prod_name|
---------------------------------------------------------------------------------------------

**Symptom:** Certificate update goes wrong and the system is disconnected from
|software_prod_name|.

**Solution:** For the 3.0 release, the resolution is to reinstall the entire
Host software stack.
There is no end-user process for recovery from this condition. Contact Intel
engineering or support for assistance.

USB peripherals cannot connect to the updated application
------------------------------------------------------------

**Symptom:** USB peripherals cannot connect to the updated application.

**Solution:** If the applications are running and no configuration change was
made, the peripherals or the underlying hardware are likely the issue.
Restart the VM. Open the VM Console for the cluster and check if USB is
detected inside the VM by running `lsusb` in the VM console. If USB is
detected, it is likely the application has an issue. If not, unplug and re-plug
the USB dongle and restart the VM.
If it USB is still not detected, it could be a hardware issue. If all USBs do
not work at the same time, it could be an issue with USB Network Redirection protocol (usbredir). Recommend
rebooting the host and contact Intel engineering for support.


