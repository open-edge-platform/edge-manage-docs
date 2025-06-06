USB Package
==============

USB package enables USB peripherals to be connected to the container-based applications.
This package registers USB peripherals to the Intel® Open Edge Platform clusters as Kubernetes resources, which container-based applications can occupy.

.. note::
    This package is only for container-based application.
    To connect the USB peripherals to VM-based applications, Virtualization Package with USB configurations is required. For more information, see the `Virtualization package` document.

The USB package contains the following component:

* **usb-device-plugin**: The plugin registers the USB peripherals as Kubernetes resources with Akri.

For more information, refer to:

* `Akri official documentation <https://docs.akri.sh/>`_
* `Akri Github <https://github.com/project-akri/akri>`_

Configuration Options
----------------------------------

The *usb-device-plugin* requires a list of USB peripheral information including vendor and product IDs.
When deploying the USB package, there is a `usbList` field in the `Override Profile Values > usb-device-plugin`.

.. code:: yaml

    usbList: "" // example - "wifi-dongle;0bda;0811,gsm-dongle;0bda;2838"

The `usbList` can have multiple USB information tuples with `,` separator.
Each USB information tuple consists of resource name, product ID (PID), and vendor ID (VID) with `;` separator.

For example, there are two USB peripherals - WiFi dongle with PID 0bda / VID 0811 and GSM dongle with PID 0bda/VID 2838.
Then, `usbList` field should have `usbList: "wifi-dongle;0bda;0811,gsm-dongle;0bda;2838"`,
where `wifi-dongle` and `gsm-dongle` are the resource name for each USB peripherals.
Those USB peripherals will be registered as Kubernetes resources with resource ID `akri.io/wifi-dongle` and resource ID `akri.io/gsm-dongle`.
The number of resources for both USB peripherals is just 1 for each.

Sometimes, the edge cluster can have multiple USB peripherals which have the same PID and VID.
In that case, `usbList` must have just one USB information tuple to cover the USB peripherals having the same PID and VID.
For example, there are four USB peripherals - three WiFi dongles with same PID 0bda / VID 0811 and one GSM dongle with PID 0bda/VID 2838.
Then, `usbList` field should have `usbList: "wifi-dongle;0bda;0811,gsm-dongle;0bda;2838"`,
where `wifi-dongle` and `gsm-dongle` are the resource name for each USB peripherals.
Those USB peripherals will be registered as Kubernetes resources with resource ID `akri.io/wifi-dongle` and resource ID `akri.io/gsm-dongle`.
As the WiFi dongles are identified with the same USB information tuple, the available Kubernetes resources `akri.io/wifi-dongle` are three.
On the other hand, the Kubernetes resource `akri.io/gsm-dongle` is just one.

Attach USB Peripherals to Container-based Applications
----------------------------------------------------------

In the Kubernetes resource files creating Kubernetes pod such as Deployment, StatefulSet, and so on,
`requests` and `limits` in `resources` section must have the Kubernetes USB peripherals resource IDs and the number of requested resources.

.. code:: yaml

    resources:
      limits:
        <USB resource IDs>: <number of USB resources>
        <USB resource IDs>: <number of USB resources>
        <USB resource IDs>: <number of USB resources>
      requests:
        <USB resource IDs>: <number of USB resources>
        <USB resource IDs>: <number of USB resources>
        <USB resource IDs>: <number of USB resources>

    // example to connect one GSM dongle and three WiFi dongles with resource ID akri.io/gsm-dongle and akri.io/wifi-dongle, respectively.
    resources:
      limits:
        akri.io/gsm-dongle: 1
        akri.io/wifi-dongle: 3
      requests:
        akri.io/gsm-dongle: 1
        akri.io/wifi-dongle: 3

Attach USB Peripherals to VM-based Applications
---------------------------------------------------------------------

To connect USB peripherals to the VM-based applications, see `Virtualization package` section. The USB package is only for the container-based applications.
