Prepare Dell iDRAC
====================================

Enable UEFI Secure Boot (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Secure Boot (SB) is disabled by default. To enable it, follow the steps below to configure SB in the BIOS.
After that, refer to the instructions in :doc:`/shared/shared_secure_boot_opt_in` for enabling SB in |software_prod_name|\ .

Enabling Secure Boot is optional, but recommended.

#. Navigate to **Configuration** > **BIOS Settings** > **System Security**.
#. Set **Secure Boot** to ``Enabled`` if needed.
#. Set **Secure Boot Policy** to ``Custom``.
#. Set **Secure Boot Mode** to ``User Mode``.
#. Go to **TPM Security** and set the value to ``On``.
#. Go to **TPM Advanced** Settings and set **TPM2 Algorithm Selection** to ``SHA256``.

Reset or Clear TPM
------------------

Reset the TPM hierarchy and clear TPM.

#. Navigate to the **Configuration** > **BIOS settings** > **System Security**.
#. Select **TPM Hierarchy** and select **Clear** from the drop-down menu.
#. Click **Apply** and then **Reboot**.
#. Go back to the **Configuration** > **BIOS Settings** > **System Security**.
#. Select **TPM Hierarchy** and choose **Enable** from the drop-down menu.
#. Click **Apply** and then **Reboot**.
