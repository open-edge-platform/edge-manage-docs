Virtualization Package
=============================================================

The Virtualization Package provides tools to extend the Kubernetes cluster capabilities to support Virtual Machine (VM) based workloads.
Using the Kubernetes API, you can manage VM workloads (create, launch, stop, and delete VM), the same as managing containerized workloads.

The Virtualization Package contains the following:

* **KubeVirt** - Add-on for VM management.
* **Containerized Data Importer (CDI)** - Persistent storage management add-on that provides a declarative way to build VM disks on PersistentVolumeClaim (PVC).
* **KubeVirt Helper** - Add-on that restarts VM after the `VirtualMachineSpec` update.

The Virtualization Package is pre-configured and satisfies most of the use cases.
However, it offers a dedicated deployment profile enabling software emulation for virtualization (which is useful if hardware virtualization is unavailable).

Here are some references:

* `KubeVirt <https://kubevirt.io/>`_
* `KubeVirt User Guide <https://kubevirt.io/user-guide/>`_
* `KubeVirt GitHub <https://github.com/kubevirt>`_
* `Containerized Data Importer <https://kubevirt.io/user-guide/operations/containerized_data_importer/>`_
* `Containerized Data Importer GitHub <https://github.com/kubevirt/containerized-data-importer>`_

USB Configuration Options
--------------------------

Depending on the user applications, USB peripherals connected to the edge node should be connected to the VM.
The *kubevirt* in the package requires a list of USB peripheral information including vendor and product IDs.
When deploying the Virtualization package, there is a field `usbList` in the `Override Profile Values > kubevirt`.

.. code:: yaml

    usbList: "" // example - "kubevirt.io/wifi-dongle;0bda;0811,kubevirt.io/gsm-dongle;0bda;2838"

The `usbList` is able to have multiple USB information tuples splitting with `,` separator.
Each USB information tuple consists of (1) Kubernetes resource ID, (2) product ID (PID), and (3) vendor ID (VID) separating with `;` separator.

For example, there are two USB peripherals - WiFi dongle with PID 0bda / VID 0811 and GSM dongle with PID 0bda/VID 2838.
Then, `usbList` field should have `usbList: "kubevirt.io/wifi-dongle;0bda;0811,kubevirt.io/gsm-dongle;0bda;2838"`,
where `kubevirt.io/wifi-dongle` and `kubevirt.io/gsm-dongle` are the demanded Kubernetes resource ID for each USB peripherals.
The number of resources for both USB peripherals is just 1 for each.

Sometimes, the edge cluster is able to have multiple USB peripherals which have the same PID and VID.
In that case, `usbList` should have just one USB information tuple to cover the USB peripherals having the same PID and VID.
For example, there are four USB peripherals - three WiFi dongles with same PID 0bda / VID 0811 and one GSM dongle with PID 0bda/VID 2838.
Then, `usbList` field should have `usbList: "kubevirt.io/wifi-dongle;0bda;0811,kubevirt.io/gsm-dongle;0bda;2838"`,
where `kubevirt.io/wifi-dongle` and `kubevirt.io/gsm-dongle` are the demanded Kubernetes resource ID for each USB peripherals.
As the WiFi dongles are identified with the same USB information tuple,
the available Kubernetes resources `kubevirt.io/wifi-dongle` are three.
On the other hand, the Kubernetes resource `kubevirt.io/gsm-dongle` is just one.

.. note::
   This USB configuration is only for VM-based applications, not
   container-based applications. If container-based applications require the USB peripherals, see `USB package` documentation.

Create VM Images
--------------------------

To create a VM image, you need to create a VM image and then convert the
VM image to a containerized VM image.

Do the following to build a containerized VM image:

#. Create a VM image with Hypervisor. You can create a VM image in different ways. In this example, create a VM image using the GUI-based VM creation tool `virt-manager` with `libvirt <https://virt-manager.org/>`_.
#. If the VM image format is not in `RAW` or `QCOW2`, convert the VM image format to either `RAW` or `QCOW2`:

    .. code:: bash

        # convert qed, vdi, vpc, and vmdk format image to raw or qcow2 format image with qemu-img
        # to qcow2
        $ qemu-img convert -f {qed,vdi,vpc,vmdk} -O qcow2 /path/to/image_name.{qed,vdi,vpc,vmdk} /path/to/image_name.qcow2

        # to raw
        $ qemu-img convert -f {qed,vdi,vpc,vmdk} -O raw /path/to/image_name.{qed,vdi,vpc,vmdk} /path/to/image_name.img

        # example:
        $ qemu-img convert  -f vmdk -O qcow2/path/to/image.vmdk /path/to/image.qcow2
        $ qemu-img convert  -f vmdk -O raw /path/to/image.vmdk /path/to/image.img

        # convert vdi format image to raw format image with VBoxManage
        $ vboxmanage clonehd /path/to/image_name.vid /path/to/image_name.img --format raw

#. Write a Dockerfile to containerize the VM image. The following snippet is an example of the Dockerfile:

    .. code:: Dockerfile

        # Dockerfile
        FROM scratch
        ADD <vm_image_name>.qcow2 /disk/

    .. note::

        Since the target clusters are Kubernetes clusters, the image type must be packaged into the container.

#. Build the container image for the VM image:

    .. code:: bash

        $ cd /path/to/Dockerfile/directory
        $ docker build -t <image_name> .

        # example:
        $ docker build -t registry.orchestrator.intel.com/apps/librespeed-vm:0.0.1

#. Verify whether the image is created and stored in the local Docker registry:

    .. code:: bash

        $ docker images

#. Push the image to the registry. For more details, see
   :doc:`/user_guide/package_software/push_registry`.


Package VM-based Applications
----------------------------------------

To deploy VM-based applications on Edge clusters, package the VM-based applications with Helm* chart.

The Helm chart contains a `Chart.yaml` file, a `values.yaml` file, and a `templates` directory that includes Kubernetes resource and application definition files.

In addition, a Helm chart for VM-based applications should have special Kubernetes resources, called KubeVirt resources, defined in the `Virtualization package` to support VM-based applications.

Example of virtualMachine resource:

    .. code:: yaml

        apiVersion: kubevirt.io/v1
        kind: VirtualMachine
        metadata:
          labels:
            kubevirt.io/vm: vm-cirros
          name: vm-cirros
        spec:
          running: false
          template:
            metadata:
              labels:
                kubevirt.io/vm: vm-cirros
            spec:
              domain:
                devices:
                  disks:
                  - disk:
                      bus: virtio
                    name: containerdisk
                  - disk:
                      bus: virtio
                    name: cloudinitdisk
                machine:
                  type: ""
                resources:
                  requests:
                    memory: 64M
              terminationGracePeriodSeconds: 0
              volumes:
              - name: containerdisk
                containerDisk:
                  image: kubevirt/cirros-container-disk-demo:latest
              - cloudInitNoCloud:
                  userDataBase64: IyEvYmluL3NoCgplY2hvICdwcmludGVkIGZyb20gY2xvdWQtaW5pdCB1c2VyZGF0YScK
                name: cloudinitdisk

.. note::

    After USB peripherals are registered as Kubernetes resources, if a VM needs USB peripherals to be connected,
    `spec.domain.devices.hostDevices` section must have the Kubernetes USB peripherals resource IDs.
    Here, the name for each USB peripheral must be user-friendly.
    Example:

    .. code:: yaml

        spec:
          domain:
            devices:
              hostDevices:
              - deviceName: <USB resource ID>
                name: <user friendly name>
              - deviceName: <USB resource ID>
                name: <user friendly name>
              - deviceName: <USB resource ID>
                name: <user friendly name>

        // example to connect one GSM dongle and three WiFi dongles with resource ID kubevirt.io/gsm-dongle and kubevirt.io/wifi-dongle, respectively.
        spec:
          domain:
            devices:
              hostDevices:
              - deviceName: kubevirt.io/wifi-dongle
                name: wifi-dongle-1
              - deviceName: kubevirt.io/wifi-dongle
                name: wifi-dongle-2
              - deviceName: kubevirt.io/wifi-dongle
                name: wifi-dongle-3
              - deviceName: kubevirt.io/gsm-dongle
                name: gsm-dongle

Refer to the following official documents to write a Helm chart for VM-based
applications:

* `Helm Chart Documentation  <https://helm.sh/docs/chart_template_guide/getting_started/>`_
* `Virtual Machines Instances <https://kubevirt.io/user-guide/virtual_machines/virtual_machine_instances/>`_

.. note::
   The provided snippet serves as an example. The Helm chart functions
   correctly when the source YAML files in a Helm chart adhere to the official KubeVirt and CDI documentation.
