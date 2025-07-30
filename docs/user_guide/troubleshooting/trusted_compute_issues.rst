Trusted Compute Issues
======================

This section covers troubleshooting of Trusted Compute issues for Edge Orchestrator.
  

**Symptom:** Failure of the Trusted Compute plugin installation due to security pre-requisites compatibility. trusted-compute-compatible is not true on orchestrator UI


**Solution:**  To fix this issue make sure that you have pre-requisites are met.Full Disk encryption (FDE) and secure boot(SB) is enabled in the platform. Once these features are enabled on edge-node plateform the onboarding profile shall also be enabling FDE and SB in the profile.
The fix need to be done at two places. first enable feature on platfrom (FDE,SB), Second The profile features shall be matched.the process for recovering from this condition to reopnboard your edge-node with pre-requisites enbled.




**Symptom:** verifier and Attestation manager PODs have cordoned the node and attestation PODs failed to transitioned to ready state.


**Solution:** This issue could be caused that the PCR banks on the TPM are not set correctly. to fix this issue, you need to set PCR bank of TPM to SHA256. 
This need to be by changing BIOS setting at edge node.



**Symptom:** Attestation failed and overall trust is showing failed on UI.
**Solution:** This issue could be caused due to some failure happnes in the updated components or bill of material of the system is changed. to mitigate and audit the full attestation report user can check the verfier POD log and details. to recover from this state you can analyse the attestation report and update BOM accordigly or revert back the faulty component from the Bill Of Material (BOM) list.