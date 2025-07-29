Trusted Compute Issues
======================

This section covers troubleshooting of Trusted Compute issues for Edge Orchestrator.
  

**Symptom:** Failure of the Trusted Compute plugin installation due to security pre-requisites compatibility. trusted-compute-compatible is not true on orchestrator UI


**Solution:**  To fix this issue make sure that you have pre-requisites are met.Full Disk encryption and secure boot is enabled in the platform.once these features are enabled on edgenode plateform the onboarding profile shall also be enabling FDE and SB in the profile.
The fix need to be done at two places. first enable feature on platfrom (FDE,SB), Second The profile features shall be matched.d-user process for recovering from this condition. Contact
Intel engineering or support for assistance.

Failure of Cluster component installation and the system state is unknown


**Symptom:** verifier and Attestation manager PODs have cordoned the node and attestation PODs Failed to come to ready state.


**Solution:** This issue could be caused that the PCR banks on the TPM are not set correctly. to fix this issue, you need to set PCR bank of TPM to SHA256. 
This need to be by changing BIOS setting at edge node.




