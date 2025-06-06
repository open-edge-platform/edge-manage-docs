Intel® GPU Package
=============================================================

The Intel® GPU Packages support GPU hardware acceleration for compute-intensive applications like AI inference. The extension packages include:

* Intel GPU's OS extension, which installs Intel GPU drivers and configures OS for optimal GPU usage.
* Intel GPU's Kubernetes\* extension, which extends the Kubernetes cluster with
  the ability to detect Intel GPU devices and allocate them to an application container.
* Intel GPU's Telemetry profile, which enables Intel GPU device metrics gathering.

.. note::
   The OS Profile `ubuntu-22.04-lts-generic-ext` already contains the GPU drivers, this guide allows you to install
   them on an Edge Node that was installed with the base `ubuntu-22.04-lts-generic` profile.

Configure Edge Node
----------------------

Configure the edge node according to the following to ensure that the Intel GPU is working properly.

.. note::
   Intel does not provide support for configurations that deviate from
   these configurations.

.. note::
   Refer to :doc:`/user_guide/additional_howtos/install_new_packages`
   for prerequisites of installing new Debian\* packages.

Supported GPU Devices
*************************

* Intel® Data Center GPU Flex Series
* Intel® Data Center GPU Max Series
* Intel® Arc™ A-Series Graphics
* Intel® Iris:sup:`®` Xe Graphics
* Intel® Iris:sup:`®` Xe MAX Graphics

Supported OS Profiles
***********************

* Base OS profile with Ubuntu\* OS 22.04 (kernel 5.15)

Supported Kubernetes Cluster Template
**************************************

* Base privileged Cluster Template named `lp-base-privileged`

GPU-aware Application Lifecycle
***********************************

**Initial Deployment**

1.	Equip the edge node with a supported GPU card.
2.	Provision the edge node with a supported OS profile.
3.	Deploy Intel GPU's OS extension using the Maintenance Manager API.
4.	Deploy the Kubernetes cluster to the edge node with the supported cluster template.
5.	Deploy the Intel GPU's Kubernetes extension deployment package using the Application Catalog user interface or API.
6.	Deploy your custom application deployment package using the Application Catalog user interface or API.

**Observability**

Once the application is deployed, enable GPU metrics gathering through the Intel GPU Telemetry profile. For details on enabling the telemetry profile, see the Telemetry control plane documentation.

**Updates**

* Intel GPU's OS extension package can be automatically updated to the latest by the standard OS upgrade process.
  For details on enabling the OS updates, refer to the Maintenance Manager documentation.
* Intel GPU's Kubernetes extension can only be updated manually. For details
  on updating, refer to :doc:`../deploy_packages`.


Intel GPU OS Extension
-------------------------

Intel GPU OS extension installs Intel GPU drivers and configures OS for optimal GPU usage. The package is distributed as
a Debian\* package. You can install the package using the Maintenance Manager API.

Enable Intel GPU OS Extension through Maintenance Manager API
****************************************************************

#. Ensure the user has the correct R/W role for Infrastructure related operations, as an example being part of the
   Project's `Host-Manager-Group` as described in :doc:`/shared/shared_iam_groups`.
#. Prepare the environment variables. For details on retrieving API authorization token, refer to the API documentation.

    .. code-block::

        export API_TOKEN="TOKEN_VALUE"
        export ORCHESTRATOR="example-orchestrator.intel.com"
        export PROJECT="PROJECT_NAME"
        export API_ENDPOINT="https://api.$ORCHESTRATOR/v1/projects/$PROJECT"
        export HOST_NAME="host-ABCDEF"

#. Create OS resources.

    .. code-block::

        export OS_RESOURCES='{
        "name": "intel-gpu",
        "architecture": "x86_64",
        "kernelCommand": "",
        "updateSources": [
            "#ReleaseService\nTypes: deb\nURIs: https://files-rs.edgeorchestration.intel.com/files-edge-orch/repository\nSuites: 3.0\nComponents: release main\nSigned-By:\n -----BEGIN PGP PUBLIC KEY BLOCK-----\n .\n mQINBGXE3tkBEAD85hzXnrq6rPnOXxwns35NfLaT595jJ3r5J17U/heOymT+K18D\n A6ewAwQgyHEWemW87xW6iqzRI4jB5m/fnFvl8wS1JmE8tZMYxLZDav91XfHNzV7J\n pgI+5zQ2ojD1yIwmJ6ILo/uPNGYxvdCaUX1LcqELXVRqmg64qEOEMfA6fjfUUocm\n bhx9Yf6dLYplJ3sgRTJQ0jY0LdAE8yicPXheGT+vtxWs/mM64KrIafbuGqNiYwC3\n e0cHWMPCLVe/lZcPjpaSpx03e0nVno50Xzod7PgVT+qI/l7STS0vT1TQK9IJPE1X\n 8auCEE0Z/sT+Q/6Zs4LiJnRZqBLoPFbyt7aZstS/zzYtX5qkv8iGaIo3CCxVN74u\n Gr4B01H3T55kZ4LE1pzrkB/9w4EDGC2KSyJg2vzqQP6YU8yeArJrcxhHUkNnVmjg\n GYeOiIpm+S4X6mD69T8r/ohIdQRggAEAMsiC+Lru6mtesKC8Ju0zdQIZWAiZiI5m\n u88UqT/idq/FFSdWb8zMTzE0doTVxZu2ScW99Vw3Bhl82w6lY689mqfHN6HAw3Oj\n CXGBd4IooalwjGCg27jNTZ5HiImK1Pi2wnlMdFyCXR4BPwjHMfEr1av3m4U9OkfB\n lVPHS35v0/y22e6FENg7kUiucY4ytKbbAMFeVIwVopHOhpDT29dUtfRsZwARAQAB\n tAVJbnRlbIkCTgQTAQoAOBYhBNBzdS76jrQWu9oBzLoBs/zr58/PBQJlxN7ZAhsD\n BQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJELoBs/zr58/PboUQAMAP8f2plI1W\n Zypc+CszsnRMUqDtwiqA56Q+ZTc6Tdb/P7Isw/lLno3LgL4fkip8Yxmql9zA4aXk\n EnNd3mPZcZdP2fogkgOd2gqbmcu604P3kUrlIrrWbSpyH+qmtwfyV09j7xucQ527\n +1gXGwVNXcqrmgUWlYTXD+SIeXosmWPvAJgF2PvI1ETTjXvpJryNaaekw1gmRYfs\n Jiq6LPGvPkyefcgXRD2lgTWnMRpAfiukIhZro0YLIqj3godF2qsmu3Xb6IhFFHFN\n eL9IVqJW/cEsFD21P5sC6FjQjV+Hu2jRTPFVHsTEiF34XC2LNDiVaZWtLIhWXjas\n FTwBw2vqGaWRUhAUWzmvfS97XGx5gDMdODNfwGfsFzDLfmuW7gFaT/qkc07KmaYb\n QobESazmA51UiEcxOwUZWsVwWM259YIc2TTndkCJf2P9rOXLCmOYbtOZqLcnpE4O\n tKkATRwwSP2uOyMmkwRbTwazR5ZMJ1tAO+ewl2guyDcJuk/tboh57AZ40JFRlzz4\n dKybtByZ2ntW/sYvXwR818/sUd2PjtRHekBq+bprw2JR2OwPhfAswBs9UzWNiSqd\n rA3NksCeuj/j6sSaqpXn123ZtlliZttviM+bvbSps5qJ5TbxHtSwr4H5gYSlHVT/\n IwqUfFrYNoQVDejlGkVgyjQYonEqk8eX\n =w4R+\n -----END PGP PUBLIC KEY BLOCK-----",
            "Types: deb\nURIs: https://repositories.intel.com/gpu/ubuntu\nSuites: jammy/lts/2350\nComponents: unified\nSigned-By:\n -----BEGIN PGP PUBLIC KEY BLOCK-----\n .\n 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\n =rY15\n -----END PGP PUBLIC KEY BLOCK-----"
        ],
        "sha256": "571e65d8c80135c703f2d4ab7f75a195abde8f4dc18012a955743ef4c2f8232a",
        "installedPackages": "os-extension-intel-gpu"
        }'
        os=`curl -k -s "$API_ENDPOINT/compute/os" -X POST -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' --data "$OS_RESOURCES"`
        export OS_ID=$(echo $os | jq -r .'osResourceID')

    .. note::
       You can use the intel-gpu package that you have just created to perform updates **after** onboarding and provisioning. If you use the intel-gpu package during onboarding and provisioning, the edge node will not complete the procedure correctly.

#. Assign OS ID to the selected instance.

    .. code-block::

        host=`curl -k --silent "$API_ENDPOINT/compute/hosts/$HOST_NAME" -X GET -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json'`
        export INSTANCE_ID=$(echo $host | jq -r .'instance.instanceID')
        curl -k --silent "$API_ENDPOINT/instances/$INSTANCE_ID" -X PATCH -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' -d '{"osID": "'$OS_ID'" }'

#. Create a single schedule resource for the selected host.

    .. code-block::

        export AFTER_SECONDS=15
        export START_SECONDS=$(($(date +%s) + $AFTER_SECONDS))

        export SINGLE_SCHEDULE='{
        "scheduleStatus": "SCHEDULE_STATUS_OS_UPDATE",
        "name": "install GPU driver",
        "targetHostId": "'$HOST_NAME'",
        "startSeconds": '$START_SECONDS'
        }'

        curl "$API_ENDPOINT/schedules/single" -k -X POST -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' --data "$SINGLE_SCHEDULE"


Intel GPU's Kubernetes Extension
-----------------------------------

Intel GPU's Kubernetes extension extends the Kubernetes cluster with the ability to detect Intel GPU devices and allocate them to an application container.

The extension is distributed as a deployment package. You can deploy the
package using the Application Catalog user interface or API. For details on updating, refer to the :doc:`../deploy_packages`.

The package consists of:

* `Intel Device Plugins Operator <https://intel.github.io/intel-device-plugins-for-kubernetes/cmd/operator/README.html>`_
* `Intel GPU Device Plugin <https://intel.github.io/intel-device-plugins-for-kubernetes/cmd/gpu_plugin/README.html>`_

Allocate GPU to Container
*******************************

To allocate the GPU to a container, add `gpu.intel.com/i915: 1` to `resource.limits` in the pod definition.

The following is an example of pod definition:

.. code-block::

    apiVersion: v1
    kind: Pod
    metadata:
    name: example-pod-with-gpu
    spec:
    containers:
    - name: example-pod-with-gpu
        image: example-image:latest
        resources:
            limits:
                gpu.intel.com/i915: 1
        securityContext:
          privileged: true
