SR-IOV Package
=============================================================

The Single Root-Input/Output Virtualization (SR-IOV) package includes a toolset for providing SR-IOV network management and attachment capabilities.

.. note::

    SR-IOV provides I/O virtualization to make a network interface card (NIC) available as a network device in the Linux\* kernel. This allows you to manage and assign network connections to your pods and virtual machines. Performance improves as packets are exchanged directly between the NIC, pod, and virtual machine.

The SR-IOV Package contains the following components:

* **sriov-network-operator** - Controls the deployment of all SR-IOV components.
* **sriov-network-config-daemon** - Runs an all-worker node, reporting SR-IOV capable NICs; responsible for applying requested SR-IOV configurations on given node.
* **network-resources-injector** - Provides the functionality of patching POD specifications with requests and limits of custom network resources (managed by device plugins such as sriov-network-device-plugin).
* **operator-webhook** - Validates the creation and update of the `SriovNetworkNodePolicy` custom resource (CR); mutates the `SriovNetworkNodePolicy` CR by setting the default value for the priority and deviceType fields when the CR is created, updated, or both.
* **sriov-network-device-plugin** - Discovers and advertises networking resources in SR-IOV virtual functions (VFs) and PCI physical functions (PFs).
* **sriov-cni** - Attaches VF interfaces allocated from the SR-IOV device plug-in, directly into a pod.

The following are some references:

* `SR-IOV Network Operator (GitHub) <https://github.com/k8snetworkplumbingwg/sriov-network-operator>`_
* `SR-IOV Network Device Plugin <https://github.com/k8snetworkplumbingwg/sriov-network-device-plugin>`_
* `SR-IOV Container Network Interface (CNI) <https://github.com/openshift/sriov-cni>`_


Attach SR-IOV Interface to Applications
-------------------------------------------------

Create SR-IOV-related resource files in the `templates` directory in the Helm\* chart and add configurations to pods, deployments, and StatefulSets resources for container-based applications and virtual machine resources for virtual machine-based applications.

For Virtual Machine-based Application
+++++++++++++++++++++++++++++++++++++

#. Create the `SriovNetworkNodePolicy` resource file in the `templates` directory.
   The `SriovNetworkNodePolicy` resource file requires the target physical network interface information, such as the `device ID,` `vendor ID`, and `PCI address` of the clusters' host machines:

    .. code:: yaml

        apiVersion: sriovnetwork.openshift.io/v1
        kind: SriovNetworkNodePolicy
        metadata:
            name: vf-policy
            namespace: sriov-network-operator
        spec:
            nodeSelector:
            feature.node.kubernetes.io/network-sriov.capable: "true"
            resourceName: intelnics
            numVfs: 2
            nicSelector:
            deviceID: "1593" # device ID
            rootDevices:
                - 0000:65:00.0 # PCI address
            vendor: "8086" # vendor ID
            deviceType: netdevice

    The `SriovNetworkNodePolicy` resource file must include:

    * `namespace` to indicate that the the SR-IOV extension is running. For example, `sriov-network-operator`.
    * `nodeSelector` with the value `feature.node.kubernetes.io/network-sriov.capable` set to `"true"`.
    * `numVfs` to the number of required SR-IOV VFs.
    * `nicSelector` to contain the target physical network interface information.

#. Create the `SriovNetwork` resource file in the `templates` directory:

    .. code:: yaml

        apiVersion: sriovnetwork.openshift.io/v1
        kind: SriovNetwork
        metadata:
            name: sriov-net
            namespace: sriov-network-operator
        spec:
            networkNamespace: {{ $.Release.Namespace }} # namespace for this Helm chart
            resourceName: intelnics
            ipam: |
            {}

    The `SriovNetwork` resource file must include:

    * `namespace` to indicate that the the SR-IOV extension is running. For example, `sriov-network-operator`.
    * `networkNamespace` to indicate the namespace of the virtual machine or container-based application that is running.
    * `ipam` with empty object `{}` for virtual machine-based applications.

#. Update the resource files in the `templates`` directory for virtual machine-based applications (for example, virtualmachine):

    .. code:: yaml

        # virtualmachine.yaml file in templates directory
        apiVersion: kubevirt.io/v1
        kind: VirtualMachine
        ...
        spec:
            ...
            template:
            ...
            spec:
                ...
                domain:
                ...
                devices:
                    ...
                    interfaces:
                    - name: default
                        pod: {}
                    - name: sriov-net # for sriov network interface
                        sriov: {} # for sriov interface
                        macAddress: 00:03:ff:00:00:01 # optional if we want to set MAC address to this interface
                        pciAddress: 0000:02:00.0 # optional if we want to set pci address to this interface
                        ...
                networks:
                ...
                - name: default
                    pod: {}
                - name: sriov-net # for sriov network interface
                    multus: # for sriov interface
                    networkName: sriov-net # SR-IOV resourceName defined in `SriovNetwork` and `SriovNetworkNodePolicy` with the vendor name
                    ...

Those configurations will add a new SR-IOV network interface to the virtual machine-based application with the default network interface (POD network interface).

Then, assign a new IP address to the SR-IOV network interface on the virtual machine application console.

.. note::

    You can automatically assign the IP address with `Cloud-init`. For more information, see `Cloud-init <https://kubevirt.io/user-guide/virtual_machines/startup_scripts/#cloud-init>`_ and `Cloud-init Documentation <https://cloudinit.readthedocs.io/en/latest/>`_).

The following code snippet is an example of `cloud-init` in the VirtualMachine resource file:

 .. code:: yaml

    # virtualmachine.yaml file in templates directory
      apiVersion: kubevirt.io/v1
      kind: VirtualMachine
      ...
      spec:
        ...
        template:
          ...
          spec:
            ...
            domain:
              ...
              devices:
                ...
                disks:
                  - name: containerdisk # for the containerized VM image
                    disk:
                      bus: virtio
                  - name: cloudinitdisk # for the cloud-init script
                    disk:
                      bus: virtio
                interfaces:
                  - name: default
                    pod: {}
                  - name: sriov-net # for sriov network interface
                    sriov: {} # for sriov interface
                    macAddress: 00:03:ff:00:00:01 # optional if we want to set MAC address to this interface
                    pciAddress: 0000:02:00.0 # optional if we want to set pci address to this interface
                    ...
            networks:
              ...
              - name: default
                pod: {}
              - name: sriov-net # for sriov network interface
                multus: # for sriov interface
                  networkName: sriov-net # SR-IOV resourceName defined in `SriovNetwork` and `SriovNetworkNodePolicy` with the vendor name
                  ...
            volumes:
              - name: containerdisk
                ...
              - name: cloudinitdisk # for cloudinit disk
                cloudInitNoCloud:
                  userData: |- # for cloud-init user data
                    #cloud-config
                    users:
                      - name: ubuntu
                        shell: /bin/bash
                        sudo: ['ALL=(ALL) NOPASSWD:ALL']
                    ssh_pwauth: True
                    chpasswd:
                      list: |
                        ubuntu:ubuntu
                      expire: False
                    write_files:
                      - path: /bin/startup.sh
                        permissions: 0755
                        owner: root:root
                        content: |
                          #!/bin/bash
                          sudo systemctl restart qemu-guest-agent
                    runcmd:
                      - /bin/startup.sh
                  networkData: |- # for cloud-init network data
                    network:
                      version: 2
                      ethernets:
                        enp1s0: # this is for POD network
                          dhcp4: true
                          dhcp4-overrides:
                            route-metric: 100
                        enp2s0: # this is for sriov network
                          match:
                            macaddress: "00:03:ff:00:00:01" # should be matched to MAC address in sriov interface definition
                          addresses:
                            - 10.1.0.31/24 # target IP address
                          routes:
                            - to: 0.0.0.0/0 # add new routing rules
                              via: 10.1.0.1
                              metric: 0

.. note::

  `cloud-init` works only on Linux*. For Windows* OS, use `SysPrep`. For more information, see `Sysprep <https://kubevirt.io/user-guide/virtual_machines/startup_scripts/#sysprep>`_).

For Container-based Application
++++++++++++++++++++++++++++++++

#. Create the `SriovNetworkNodePolicy` resource file in the `templates` directory.

   The `SriovNetworkNodePolicy` resource file requires the target physical network interface information, such as the `device ID,` `vendor ID`, and `PCI address` of the clusters' host machines:

    .. code:: yaml

        apiVersion: sriovnetwork.openshift.io/v1
        kind: SriovNetworkNodePolicy
        metadata:
            name: vf-policy
            namespace: sriov-network-operator
        spec:
            nodeSelector:
            feature.node.kubernetes.io/network-sriov.capable: "true"
            resourceName: intelnics
            numVfs: 2
            nicSelector:
            deviceID: "1593" # device ID
            rootDevices:
                - 0000:65:00.0 # PCI address
            vendor: "8086" # vendor ID
            deviceType: netdevice

#. Create the `SriovNetwork` resource file in the `templates` directory as follows:

    .. code:: yaml

        apiVersion: sriovnetwork.openshift.io/v1
        kind: SriovNetwork
        metadata:
            name: sriov-net
            namespace: sriov-network-operator
        spec:
            networkNamespace: {{ $.Release.Namespace }} # namespace for this Helm chart
            resourceName: intelnics
            ipam: |
            {
                "type": "host-local",
                "subnet": "10.56.217.0/24",
                "routes": [{
                "dst": "0.0.0.0/0"
                }],
                "gateway": "10.56.217.1"
            }

    The `SriovNetwork` resource file must include:

    * `namespace` to indicate that the the SR-IOV extension is running. For example, `sriov-network-operator`.
    * `networkNamespace` to indicate the namespace of the virtual machine or container-based application that is running.
    * `ipam` with empty object `{}` for virtual machine-based applications.

Finally, the pod for the deployment will have SR-IOV network interface with an IP address in the subnet specified in `SriovNetwork`.

For more information on SR-IOV, refer to:

  - `SR-IOV Network Operator <https://github.com/openshift/sriov-network-operator>`_
  - `Configure SR-IOV Device <https://docs.openshift.com/container-platform/4.11/networking/hardware_networks/configuring-sriov-device.html>`_
  - `Architecture <https://github.com/kubevirt/kubevirt/blob/main/docs/network/sriov.md>`_
