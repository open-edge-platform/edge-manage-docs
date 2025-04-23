Trusted Compute Package
=========================

Trusted Compute is a set of software-defined security extensions that utilize hardware security capabilities of |software_prod_name|, and enhances edge node or host protection through:

* **Continuous Monitoring:** Regularly checks the integrity of platform firmware, OS kernel, critical system components, and runtime environment through ongoing measurement and attestation.

* **Isolated Execution:** Runs Confidential-workloads securely in a trusted VM environment, preventing unauthorized access or interference, and safeguarding the host from the workloads.

  **Confidential-workload** - a workload that handles sensitive or private data and requires protections from unauthorized access or tampering.

* **Security Objective:** Trusted Compute ensures the integrity of code and data within container workloads running in a trusted VM instance, protecting against attacks from unprivileged software, applications, and simple hardware adversaries. Trusted Compute prevents access to sensitive code and data during boot and runtime, detects tampering or unauthorized changes to platform software, and isolates the host from future workloads.

Do the following to enable Trusted Compute on a host and cluster, and to configure and deploy your trusted applications.

Host and Cluster
~~~~~~~~~~~~~~~~

Follow the below steps to enable Trusted Compute extension on your host & cluster.

#. **Provisioning:** Ensure the edge node is onboarded with secure boot and enabled with full-disk encryption. To enable secure boot, see :doc:`/shared/shared_secure_boot_opt_in`.

#. **Cluster Creation** - Use the privileged default-extension to create a cluster:

   Refer to :doc:`/user_guide/set_up_edge_infra/create_clusters`

   a. Navigate to Infrastructure > Clusters > Create Cluster in the Edge Orchestrator UI.

   #. Enter the Cluster Name, and select the privileged template and version.

   #. Click next to choose the site.

   #. Click next to select the host and metadata, to complete the creation process.

**Trusted Compute Compatible** - Once the steps above are completed, the cluster and hosts are automatically tagged as "Trusted Compute Compatible".

Applications and Deployment Packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To prepare your application to be deployed in a Trusted Compute compatible node, modify the helm chart as shown below.

#. Helm chart modifications:

   Create an application with a modified helm chart. The following is a sample yaml file that creates the deployment inside the templates directory of the helm chart.

      .. code:: yaml

        apiVersion: v1
        kind: Pod
        metadata:
          labels:
            name: {{ .Values.podName }}
          annotations:
        spec:
          containers:
            - image: <application name:<version>>
              name: <application name>
              runtimeClassName: {{ .Values.runtimeClassName }}

      The following is a sample values.yaml file that depicts the runtimeClassName change needed:

      .. code:: yaml

          # change the runtimeClassName to kata-qemu to ensure this workload get executed with trustedcompute
           runtimeClassName: kata-qemu


#. Refer `deployment package <./../index>`__ to create application deployment package.

Deploy Trusted Compute Package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the below steps to deploy the Trusted Compute Package onto the Cluster

#. To deploy Trusted Compute Package on a cluster:

   a. Navigate to Deployments -> Deployment Packages -> Extensions

   #. Select the "**trusted-compute**"

   #. Select Actions and Deploy that package to the Trusted Compute Compatible cluster

#. To view the deployment status:

   a. Go to Deployments > select your deployment > check the deployment status.

#. To deploy the user application you have created in the "Applications and Deployment Packages" step above:

   a. Go to Deployments > Deployment Packages.

   #. Select the deployment package that contains your trusted application.

   #. Select Actions and Deploy that package to the Trusted Compute Compatible cluster

#. To view the deployment status:

   a. Go to Deployments > select your deployment > check the deployment status.

Continuous Monitoring Status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To view the attestation monitoring status:

#. Go to Infrastructure > Hosts

#. Select the host that you have added the Trusted Compute extension to, through the cluster.

#. Go to the "Status Details" tab to view the "Attestation" status.

Success Status:
  - Verified: Indicates successful verification.

Failure Status:
  - IMA Trust Verification Failed: The node's Integrity Measurement Architecture trust verification did not succeed.
  - OS Trust Verification Failed: The node's operating system trust verification did not succeed.
  - Platform Trust Verification Failed: The node's platform trust verification did not succeed.
  - Secure Boot Disabled: Secure Boot is not enabled on the node.


For details on the Trusted Compute architecture, see :doc:`/developer_guide/trusted_compute/arch/architecture`.
