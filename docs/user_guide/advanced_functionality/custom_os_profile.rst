Usage of Custom OS profile to provisioning Edgenodes
===============================================

This feature allows users to create and manage custom OS profiles that can be used to provisioning
of edgenodes. By defining a custom OS profile, users can specify custom built OS flavors of Ubuntu
and Edge Microvisor Toolkit(EMT) as an edgenode's operating system. This enables a more tailored and efficient deployment process
for edgenodes, allowing users to leverage their own OS images that are optimized for their specific use cases.

Here are the prerequisites to use the custom OS profile feature:
- OS images must be built and hosted on a web server that is accessible during the edgenode provisioning process.
- Supported OS image formats include QCOW2, and RAW with or without compression.
- OS image including kernel must be signed with a trusted certificate to support Secure Boot, and corresponding
  certificate must be enrolled in the edgenode's firmware.
- OS images must include necessary drivers and configurations to support the target edgenode hardware.
- OS image partition layout must be labeled using GPT.
  - UEFI/EFI system partition and rootfs partition for Ubuntu
  - Refer the [partition scheme](https://github.com/open-edge-platform/infra-onboarding/tree/main/tinker-actions/src/fde_dmv#partition-scheme) for EMT OS
- OS image must have sha256 checksum generated for verification during the provisioning process.
- Ubuntu custom OS profiles must be mutable to allow for post-deployment configurations, updates and installation edge node agents.
- EMT custom OS profiles must be immutable to ensure consistency and reliability across deployments.
  It should have Edge node agent pre-installed to facilitate management and monitoring.
- EMT custom OS profiles must have cloud-init package installed and configured to support
  automated initial setup during the provisioning process.
- EMT custom OS profile must have EMF compatible version installed to ensure seamless integration with the EMF orchestrator.

Default OS profiles available after the EMF orchestrator installation are:
- Ubuntu 22.04 LTS 
- Ubuntu 24.04 LTS
- Ubuntu 24.04 LTS with OOT GPU drivers
- EMT 3.0 non-RT
- EMT 3.0 RT
- EMT standard alone (used for OXM profile)
- EMT with IDV (used for OXM profile)

Here are the steps to use the custom OS profile feature:

- Get the TLS certificate from server by replacing your <SERVER_DNS_NAME>(without https) where the OS image is hosted.
  Make sure image hosted be raw.gz(EMT OS)/img(Ubuntu OS) format
  
  ```bash
  openssl s_client -connect <SERVER_DNS_NAME>:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > server_cert.pem
  export TLS_CERT="$(base64 -w 0 server_cert.pem)"
  ```
- Create a custom OS profile using the orch-cli
  ```bash
  orch-cli os-profile create \
    --name <custom_os_profile_name> \
    --type <IMMUTABLE/MUTABLE> \
    --image-url <url_to_os_image> \
    --checksum <sha256_checksum_of_os_image> \
    
  ```
