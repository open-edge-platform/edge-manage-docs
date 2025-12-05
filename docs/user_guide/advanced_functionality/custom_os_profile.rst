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
- EMT custom OS profiles must be based on the official EMT OS images provided by the Edge Microvisor Toolkit.
- If Edge node is behind a proxy server, make sure the OS image URL is accessible during the provisioning process.
- OS image URL must use HTTPS protocol to ensure secure transmission during hosting the OS image in the web server.

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

Create the OS profile yaml file `custom_os_profile.yaml` with the following content:

```yaml
appVersion: apps/v1
metadata:
  release: 0.0.0-dev
  version: 0.2.0
spec:
  name: <custom_os_profile_name>
  type: <IMMUTABLE/MUTABLE>
  provider: OS_PROVIDER_KIND_INFRA
  architecture: x86_64
  profileName: <custom_os_profile_name>
  image_url: <url_to_os_image>
  osImageVersion: <os_image_version>
  osImageSha256: <sha256_checksum_of_os_image>
  securityFeature: <SECURITY_FEATURE_NONE/SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION>
  description: "<description_of_custom_os_profile>"
  metadata: ""
  tlsCert: "<TLS_CERT>"

```
Replace the placeholders with appropriate values:
- `<custom_os_profile_name>`: A unique name for the custom OS profile.
- `<IMMUTABLE/MUTABLE>`: Specify whether the OS profile is immutable or mutable.
- `<url_to_os_image>`: The URL where the OS image is hosted.
- `<sha256_checksum_of_os_image>`: The SHA256 checksum of the OS image for verification.
- `<os_image_version>`: The version of the OS image.
- `<SECURITY_FEATURE_NONE/SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION>`: Specify the security features enabled for the OS profile.
- `<description_of_custom_os_profile>`: A brief description of the custom OS profile.
- `<TLS_CERT>`: The base64 encoded TLS certificate obtained in the previous step.

Optional: If you want to skip the kernel upgrade during the edgenode provisioning, you can add to metadata field in the yaml file as below:

```yaml
....
spec:
  metadata: |
    skip_kernel_upgrade: "true"
....
```

Optional: If you want to install specific version of canonical kernel during the edgenode provisioning,
you can add to metadata field in the yaml file as below:
<canonical_kernel_version> should be replaced with the desired kernel version with the format like "linux-image-5.15.0-1035-generic"
and it should be present in canonical repo


```yaml
....
spec:
  metadata: |
    kernelVersion: "<canonical_kernel_version>"
....
```

Then run the following command to create the custom OS profile:

Login to orch-cli first:
Change `<EMF_KEYSTONE_URL>`, `<USERNAME>`, and `<PASSWORD>` with your EMF orchestrator details.

  ```bash
  orch-cli login <EMF_KEYSTONE_URL> --username <USERNAME> --password <PASSWORD>
  orch-cli config set project <PROJECT_NAME>
  orch-cli config set api-endpoint <EMF_API_ENDPOINT>
  ```
Replace `<PROJECT_NAME>` and `<EMF_API_ENDPOINT>` with your project name and EMF API endpoint(https://api.<cluster_domain>) respectively.

Create the custom OS profile:

  ```bash
  orch-cli create osprofile custom_os_profile.yaml
  ```
Register the edge node with the created custom OS profile:

  ```bash
  orch-cli create host --generate-csv
  ```
  It will generate a CSV file test.csv with the necessary details to register the edge node.
  Use the generated test.csv file to register the edge node with the custom OS profile:
  OSProfile field in the CSV file should have the custom OS profile name created earlier.

  ```bash
  orch-cli create host --import-from-csv test.csv
  ```
- Monitor the provisioning status of the edge node using the orch-cli or EMF web console.

  ```bash
  orch-cli get host <host_response_id>
  ```
Replace `<host_response_id>` with the ID of the edge node obtained during registration.
- Once the provisioning is complete, verify that the edge node is running the custom OS profile by checking the OS version and configurations on the edge node.
- Clean up the created custom OS profile if no longer needed:

  ```bash
  orch-cli delete osprofile <custom_os_profile_name>
  ```
Replace `<custom_os_profile_name>` with the name of the custom OS profile created earlier.
- For more details on using the orch-cli, refer to the [orch-cli user guide](../package_software/orch_cli/orch_cli_guide.rst).
- For more details on edge node provisioning, refer to the [edge node provisioning guide](../set_up_edge_infra/edge_node_onboard/index.rst).
