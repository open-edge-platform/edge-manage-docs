Troubleshooting DKAM Failed State
=================================

There is a known issue where the DKAM may enter a failure state due to storage complications when deployed on-premises.
The root cause is the persistent volume Claim (PVC) being provisioned with the openebs-hostpath storage class, which is not ideal for this setup.
The recommended solution is to transition to the openebs-lvmpv storage class, which will be incorporated in a future release.

Check for DKAM Failed State
---------------------------------

Verify whether DKAM pod is in a Running or Failed state.

Run the commands below to verify Failed state:

   .. code-block:: shell

      $ kubectl get pods -n orch-infra | grep dkam
      orch-infra    mi-dkam-867d9bd977-qk8cb     2/2     Failed    21 (43m ago)      3d23h

      $ kubectl get pvc -A | grep dkam-pvc
      orch-infra    dkam-pvc    Pending

      $ kubectl describe pod mi-dkam-867d9bd977-qk8cb -n orch-infra
      Warning  Failed     30s      kubelet, node-01   Failed to start container with id xxxxxxxx on node node-01: Error response from daemon: {Reason of the failure}


Workaround to Resolve the Issue
---------------------------------

If the DKAM fails to start because it cannot acquire the necessary PVC,
administrators are advised to implement one of these temporary workarounds.
The DKAM should restart and reach a Running state after this workaround.

Option 1
^^^^^^^^^^

Remove the filesystem contents within the OpenEBS local directory using
the following command. This will delete all files and directories under /var/openebs/local/:

   .. code-block:: shell

      rm -rf /var/openebs/local/*

.. note::
   Workaround involves operations that can lead to data loss. It is
   crucial to ensure that data is backed up appropriately before proceeding. After applying either of these workarounds, a restart of the DKAM service will re-initiate the PVC acquisition process.
