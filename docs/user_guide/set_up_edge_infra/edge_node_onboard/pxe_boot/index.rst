PXE-assisted boot
=================

This page provides high-level description of the PXE-assisted boot.

Requirements
------------

- Ensure you deploy a local PXE server (DHCP+TFTP) that stores iPXE script (see instructions below).
- PXE-assisted boot can only be used if Edge Nodes have direct (Layer-2) connectivity to the PXE server.
- Ensure that Edge Nodes are connected to the network and has access to the orchestrator.
- Configure Edge Nodes to boot from the PXE boot option.
- Configure Edge Node to boot from the hard disk as second boot option.

PXE-assisted boot flow
----------------------

The PXE-assisted boot has been developed to support provisioning of Standalone Edge Nodes at scale
with the :doc:`/deployment_guide/on_prem_deployment/on_prem_deployment_profiles/on_prem_oxm_profile.rst`.
In this case, |software_prod_name| is deployed locally on-premises and Edge Nodes are attached to the same local network.

The PXE-assisted boot can also be used with the cloud-based |software_prod_name|.
However, this option requires a PXE server to be deployed locally on site.
The local PXE server must provide |software_prod_name|'s iPXE script to Edge Nodes booting via PXE.

The following deployment scenarios are possible:

#. :ref:`deploy_standalone`

   A reference topology for this deployment scenario is depicted below:

   .. image:: ../images/pxe-with-managed-emf-scenario-1.png
      :alt: EIM PXE server with cloud-based |software_prod_name|
      :width: 750px

   Use this option if:

   * You want full automation of the PXE server and lifecycle management with Kubernetes, and

   * You already have a local Kubernetes cluster deployed that can run PXE server, and

   * You don't want or cannot modify the local DHCP server to provide PXE boot info and TFTP artifacts, and

   * Your local network allows for Proxy-DHCP mode (co-existing of two DHCP servers).

#. Modify your local DHCP server to provide PXE boot info and iPXE script via TFTP.

   Use this option if:

   * You don't want to deploy additional Kubernetes cluster to run PXE server, and

   * You cannot use Proxy-DHCP mode (e.g., it is blocked by local DHCP spoofing/guarding rules),
     so you must use your default DHCP server to serve both dynamic IP address assignment and PXE boot info.

#. Deploy your own PXE server.

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

Download the PXE server Helm chart and deploy it:

.. code-block:: bash

   https://github.com/open-edge-platform/infra-charts.git
   helm install pxe-server ./infra-charts/pxe-server/ \
     --set global.registry.name="registry-rs.edgeorchestration.intel.com/edge-orch/" \
     --set config.interface=<interface-name>,config.bootServerIP=<boot-server-IP>,config.subnetAddress=<subnetAddress>,standaloneMode.enabled=true,standaloneMode.ipxePath="<path-to->"

Boot Edge Nodes via PXE
^^^^^^^^^^^^^^^^^^^^^^^

Once your local PXE-enabled deployment is ready, boot your Edge Nodes via PXE.
Note that for some platforms you will also have to configure BIOS settings accordingly to enable the PXE boot.
