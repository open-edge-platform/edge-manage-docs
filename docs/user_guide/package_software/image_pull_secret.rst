Configure Image Pull Secret
==================================================

When applications are deployed to edge clusters, their containers or
containerized VM images are always pulled from a registry.

There are two types of registries: public and private. Public registries are
open and do not require any credentials for pulling images. However, an image
pull secret is required for pulling images from a private registry.

This section describes how to configure the secret for a private registry.

Pulling Images from Common Private Registry
-----------------------------------------------

In order to pull images, we need two steps:

1. Create Kubernetes secret
2. Set ImagePullSecret in Helm chart.

Create Kubernetes Secret
^^^^^^^^^^^^^^^^^^^^^^^^^^^

First, you need to create a Kubernetes secret which includes the registry address and credentials in the Helm chart.
You can follow the below link to create a Kubernetes secret:
`link <https://helm.sh/docs/howto/charts_tips_and_tricks/#creating-image-pull-secrets>`_.

Set ImagePullSecret
^^^^^^^^^^^^^^^^^^^^^^^^^^^

After the secret is added, you need to set `imagePullSecrets` to the Kubernetes resources for containers and VMs deployment.
For the container-based application, you can check and follow this link:
`ImagePullSecret for Container-based app <https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret>`_

The VM-based application has a different format to set the ImagePullSecret from the container-based application. There are two examples below - one for VM-based application with ephemeral disk and the other one for VM-based application with PV disk.

* For VMs with ephemeral disk (containerDisk)

  .. code:: yaml

      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: <vm name>
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               image: <containerized VM image tag>
               imagePullSecret: <secret name>
               name: containerdisk

      # example
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: ubuntu-vm
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               image: docker.io/exampleuser/ubuntu-vm:latest
               imagePullSecret: docker-secret-exampleuser
               name: containerdisk

  For more information about the imagePullSecret for a VM application with ephemeral disk,
  check this document: `ImagePullSecret for a VM-based application with ephemeral disk <https://kubevirt.io/user-guide/virtual_machines/boot_from_external_source/#booting-from-external-source>`_

* For VMs with PV disk


  .. code:: yaml

      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: <vm name>
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://<registry_url>"
               secretRef: <secret name>
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: <PV class name>
               resources:
               requests:
                  storage: <PV storage size>

      # example
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: ubuntu-vm
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://docker.io/exampleuser/ubuntu-vm:latest"
               secretRef: docker-secret-exampleuser
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: openebs-lvmpv
               resources:
               requests:
                  storage: 100Gi

  .. note::
     `url` in `registry` should have `docker://` prefix.

  For more information about the imagePullSecret for a VM application with PV disk, check this document:
  `ImagePullSecret for a VM-based application with PV disk
  <https://github.com/kubevirt/containerized-data-importer/blob/main/doc/image-from-registry.md#private-registry>`_

Pulling Images from Harbor Registry in Edge Orchestrator
----------------------------------------------------------

Unlike other private registries, the secret for the Harbor registry in Edge
Orchestrator has already been created, which means that you do not need to
create a secret in the Helm chart.

Edge Orchestrator provides an automated way to set the image pull secret to the
Helm chart when deploying the Application.
Here, you have to set the special string `'%GeneratedDockerCredential%'` to Profile Chart Values.
This feature requires two steps:

1. Make imagePullSecret(s) configurable at values.yaml file.
#. Override imagePullSecret(s) in values.yaml with special string `%GeneratedDockerCredential%` on `Chart Values` in Profile.

   In case if the Helm chart uses Pre-hook templates which need images to be
   pulled from Harbor registry, then in addition to the above steps, you need to add this special line to the Profile Chart values:

   .. note::
      Note that the special string `'%GeneratedDockerCredential%'` for the image pull secret MUST be set in Profile, not directly in Helm chart.
      If you set the special string directly to Helm chart, the Helm chart rendering will fail.

See also :doc:`/developer_guide/application_developer_workflow/deployment-packages/reference-placeholders` for more information about it.

Make Image Pull Secret Configurable at values.yaml File
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An example for container and VM application deployment.

* values.yaml file

  .. code:: yaml

     ...
     image:
       pullSecret: ""

* For Containers - Pod

  .. code:: yaml

      apiVersion: v1
      kind: Pod
      metadata:
         name: <pod name>
      spec:
         containers:
         - name: private-reg-container
         image: <your-private-image>
         imagePullSecrets:
         - name: {{ .Values.image.pullSecret }}

      # example
      apiVersion: v1
      kind: Pod
      metadata:
         name: nginx
      spec:
         containers:
         - name: private-reg-container
         image: docker.io/exampleuser/nginx:latest
         imagePullSecrets:
         - name: {{ .Values.image.pullSecret }}

  .. note::
     `imagePullSecrets` is not only in Pod but other Kubernetes resources
     to deploy containers such as Deployment, StatefulSet, etc.

* For VMs with ephemeral disk (containerDisk)

  .. code:: yaml

      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: <vm name>
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               image: <containerized VM image tag>
               imagePullSecret: {{ .Values.image.pullSecret }}
               name: containerdisk

      # example
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: ubuntu-vm
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               image: docker.io/exampleuser/ubuntu-vm:latest
               imagePullSecret: {{ .Values.image.pullSecret }}
               name: containerdisk

* For VMs with PV disk

  .. code:: yaml

      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: <vm name>
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://<registry_url>"
               secretRef: {{ .Values.image.pullSecret }}
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: <PV class name>
               resources:
               requests:
                  storage: <PV storage size>

      # example
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: ubuntu-vm
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://docker.io/exampleuser/ubuntu-vm:latest"
               secretRef: {{ .Values.image.pullSecret }}
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: openebs-lvmpv
               resources:
               requests:
                  storage: 100Gi

  .. note::
     `url` in `registry` should have `docker://` prefix.

Override Image Pull Secret in values.yaml With %GeneratedDockerCredential% on Chart Values in Profile
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Next, you should create or edit corresponding Applications' Profile to override image pull secret with
`%GeneratedDockerCredential%` in Chart Values.
Following is an example:

.. code:: yaml

   image:
     pullSecret: '%GeneratedDockerCredential%'

Add Special Line to Allow Image Pull in Pre-Hook Template
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In case the helm chart has pre-hook templates which need to pull images from
Harbor, then you should create or edit corresponding Applications' Profile to
override image pull secret with `%GeneratedDockerCredential%` in Chart Values
and also add the additional line `prehook: "%PreHookCredential%"` in Profile
chart values.

Following is an example:

.. code:: yaml

   image:
     pullSecret: '%GeneratedDockerCredential%'
     prehook: "%PreHookCredential%"


Inject Certificate Signed By Unknown Authority for VM-based Application With PV Disk
-------------------------------------------------------------------------------------

If a containerized VM image is uploaded to the registry running with the certificate signed by unknown authority (ca.crt),
you must add the certificate to the Helm chart.
Otherwise, you can see the error message `tls: failed to verify certificate: x509: certificate signed by unknown authority`.

.. note::
   This requires only when the VM-based Application will be running in
   PV disk, not ephemeral disk.

This is the step to add the certificate to Helm chart:

1. Get certificate

   .. code:: bash

      $ openssl s_client -showcerts -servername <registry_url> -connect <registry_url>:443 </dev/null

      # example
      $ openssl s_client -showcerts -servername registry.example.com -connect registry.example.com:443 </dev/null

#. Add `ConfigMap` to the Helm chart

   .. code:: yaml

      apiVersion: v1
      data:
         ca.crt: |-
         <Add certificate value here>
      kind: ConfigMap
      metadata:
         name: <cert configmap name>

      # example
      apiVersion: v1
      data:
         ca.crt: |-
         -----BEGIN CERTIFICATE-----
         MIIIgTCCBmmgAwIBAgIQWUQSQfyDLEjAXhrG2HH7gTANBgkqhkiG9w0BAQsFADAp
         MQswCQYDVQQGEwJVUzEaMBgGA1UEChMRSW50ZWwgQ29ycG9yYXRpb24wHhcNMjQw
         NDI1MTUzMjUwWhcNMjUwNDI1MjAzMjUwWjApMQswCQYDVQQGEwJVUzEaMBgGA1UE
         ChMRSW50ZWwgQ29ycG9yYXRpb24wggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIK
         AoICAQCcn4jZOY83fTNajHtx6Eq3yucTRsQCejBFuM4XKu9JQGuyHb6EgSB8WLF8
         -----END CERTIFICATE-----
      kind: ConfigMap
      metadata:
         name: vm-registry-tls-cert


#. Set `certConfigMap` in VirtualMachine

   .. code:: yaml

      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: <vm name>
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://<registry_url>"
               secretRef: {{ .Values.image.pullSecret }}
               certConfigMap: <cert configmap name>
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: <PV class name>
               resources:
               requests:
                  storage: <PV storage size>

      # example
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      metadata:
         name: ubuntu-vm
      spec:
         template:
         spec:
            domain:
               devices:
               disks:
               - disk:
                     bus: virtio
                  name: containerdisk
            volumes:
            - containerDisk:
               dataVolume:
                  name: containerdisk-dv
               name: containerdisk
         dataVolumeTemplates:
         - metadata:
            name: containerdisk-dv
         spec:
            source:
               registry:
               url: "docker://docker.io/exampleuser/ubuntu-vm:latest"
               secretRef: {{ .Values.image.pullSecret }}
               certConfigMap: vm-registry-tls-cert
            pvc:
               accessModes:
               - ReadWriteOnce
               storageClassName: openebs-lvmpv
               resources:
               requests:
                  storage: 100Gi

   .. note::
      `url` in `registry` should have `docker://` prefix.

For more information, refer to:
`CDI TLS certificate config <https://github.com/kubevirt/containerized-data-importer/blob/main/doc/image-from-registry.md#tls-certificate-configuration>`_
