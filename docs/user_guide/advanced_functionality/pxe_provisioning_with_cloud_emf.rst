PXE-assisted provisioning with cloud-based |software_prod_name|\
================================================================

.. note:: This is an experimental feature. PXE provisioning is dedicated for :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile`.

The :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/pxe_boot/index` can also be used with the cloud-based |software_prod_name|.
However, this option requires a PXE server to be deployed locally on site. The local PXE server must provide |software_prod_name|'s iPXE script to Edge Nodes booting via PXE.

The following deployment scenarios are possible:

#. **:ref:`deploy_standalone`**

   A reference topology for this deployment scenario is depicted below:

   .. image:: images/pxe-with-managed-emf-scenario-1.png
      :alt: EIM PXE server with cloud-based |software_prod_name|
      :width: 750px

   Use this option if:

   * You want full automation of the PXE server and lifecycle management with Kubernetes, and

   * You already have a local Kubernetes cluster deployed that can run PXE server, and

   * You don't want or cannot modify the local DHCP server to provide PXE boot info and TFTP artifacts, and

   * Your local network allows for Proxy-DHCP mode (co-existing of two DHCP servers).

#. **Modify your local DHCP server to provide PXE boot info and iPXE script via TFTP.**

   In this scenario you don't need to deploy any additional PXE server. Instead,
   you will leverage your local, already-existing DHCP server as the PXE server.
   Looking at the above diagram, the PXE server would be part of the Local DHCP server.

   The DHCP/TFTP configuration depends on the vendor of a local DHCP server.
   We provide a reference configuration for ``dnsmasq`` (see :ref:`extra_dnmasq_pxe_conf`).

   Use this option if:

   * You don't want to deploy additional Kubernetes cluster to run PXE server, and

   * You cannot use Proxy-DHCP mode (e.g., it is blocked by local DHCP spoofing/guarding rules),
     so you must use your default DHCP server to serve both dynamic IP address assignment and PXE boot info.

#. **Deploy your own PXE server.**

   You can always deploy a DHCP and TFTP server implementation of your choice.
   You only need to download the iPXE script, configure your TFTP server to provide the iPXE script
   and configure DHCP server to provide PXE boot info.

.. _download_ipxe:

Download iPXE script from |software_prod_name|\
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Regardless of the deployment option, the first step is to download the iPXE script from |software_prod_name|:

.. code-block:: shell

   wget https://tinkerbell-nginx.CLUSTER_FQDN/tink-stack/signed_ipxe.efi --no-check-certificate --no-proxy

.. note:: Replace CLUSTER_FQDN with the FQDN of the Edge Orchestrator.

.. _deploy_standalone:

Deploy |software_prod_name|\ PXE server in the standalone mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Prerequisites:

#. Up and running Kubernetes cluster.

#. Ensure you :ref:`download_ipxe`.

Download the PXE server Helm chart and deploy it. The following installation parameters are required:

* ``interface`` must be set to the name of the network interface that is connected to the L2 subnet from where Edge Nodes are expected to start PXE booting.

* ``bootServerIP`` must be set to the IP address assigned to the ``interface``.

* ``subnetAddress`` must be set to the IP subnet address. For example, the IP subnet address of ``192.168.160.0/24`` is ``192.168.160.0``.

* ``path-to-ipxe`` must be the full path to the downloaded iPXE script on your local disk.

.. code-block:: bash

   https://github.com/open-edge-platform/infra-charts.git
   helm install pxe-server ./infra-charts/pxe-server/ \
     --set global.registry.name="registry-rs.edgeorchestration.intel.com/edge-orch/" \
     --set config.interface=<interface-name>,config.bootServerIP=<boot-server-IP>,config.subnetAddress=<subnetAddress>,standaloneMode.enabled=true,standaloneMode.ipxePath="<path-to-ipxe>"

Once executed, check the ``pxe-server`` Pod status. If you see it in the ``Running`` state, you can proceed to
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index` with :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/pxe_boot/index`.

.. _extra_dnmasq_pxe_conf:

Extra: Example dnsmasq configuration for enabling PXE capabilities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The below configuration snippet provides default ``dnsmasq`` settings to enable PXE capabilities.
Note it's only a reference. You should follow best practices to harden your PXE server configuration.
See ``dnsmasq`` documentation for more details.

.. note:: ``ipxe.efi`` is expected to be placed under ``/var/lib/tftp``.

.. code-block:: bash

   interface=<interface> # provide your interface name
   bind-interfaces

   dhcp-match=set:pxe,60,PXEClient
   dhcp-match=set:efi64,option:client-arch,7
   pxe-service=tag:pxe,tag:efi64,x86-64_EFI,"Network Boot UEFI x86_64",ipxe.efi,<bootServerIP>

   enable-tftp
   tftp-root=/var/lib/tftp
   tftp-no-blocksize
