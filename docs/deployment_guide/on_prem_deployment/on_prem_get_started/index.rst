Get Started with Edge Orchestrator
==================================

Set up the following system and hardware configuration before installing
Edge Orchestrator:


System Requirements
-------------------

Domain
------

A domain name is required for Edge Orchestrator installation.

- For typical on-premises deployments, where both EMF and edge nodes are on a local network, an internal private domain is sufficient.
- If EMF is hosted by a third party for multiple tenants, and access between the end customer, EMF, and edge nodes occurs over the internet, an external public domain is required.

The domain name must be unique and not used by any other service in the
network. The domain name must be a fully qualified domain name (FQDN) and not
an IP address.



Edge Orchestrator Network Topology
----------------------------------

.. warning::
   Ensure that there are no incorrect configurations while setting up your DNS server for Edge Orchestrator. Incorrect configurations can lead to deployment failures. Specifically, the RKE2 (the kubernetes distribution used for EMF on-prem cluster) might start using the 8.8.8.8 server for DNS resolution, if no other DNS server is configured correctly.

  1. Avoid configuring `/etc/resolv.conf` and `/run/systemd/resolve/resolv.conf` to point exclusively to loopback or multicast nameservers. This can cause issues during deployment.

  2. Ensure that the `service_cidr` subnet specified in the installation guide does not overlap with any existing subnets in your infrastructure. For example, if the k8s `service_cidr` includes the IP `10.43.0.10`, ensure this IP is not used as a DNS server in the OS or for any critical network communications in your environment.

.. image:: ../images/on-prem-install-topology-config.png
   :alt: The network topology for Edge Orchestrator
   :width: 500px
   :align: center


Edge Orchestrator Network Topology with Corporate Proxy
--------------------------------------------------------

.. image:: ../images/on-prem-install-topology-config-with-corporate-proxy.png
   :alt: The network topology for Edge Orchestrator
   :width: 500px
   :align: center

.. _on_prem_network_topology_squid_proxy:

Edge Orchestrator for Edge Nodes without Direct Internet Access
----------------------------------------------------------------

.. image:: ../images/on-prem-install-topology-config-with-squid-proxy.png
   :alt: The network topology for Edge Orchestrator
   :width: 500px
   :align: center

.. _on_prem_lenovo_network_topology:

Firewall Configuration
----------------------

The following table lists the network endpoints for Edge Orchestrator and edge nodes, which you can use to configure firewall rules tailored to your network environment.

* BIOS Onboarding accesses ``tinkerbell-haproxy.{domain}``.
* You can access all other services from edge nodes agents, UI, and APIs of Edge Orchestrator.

.. list-table:: Network Endpoints for Edge Orchestrator and Edge Nodes
   :header-rows: 1

   * -  Source
     -  Destination
     -  Protocol
     -  Port number
     -  Description
   * -  Edge Orchestrator UI and API
     -  {domain}
     -  TCP
     -  443
     -  Web UI
   * -  Edge Orchestrator UI and API
     -  web-ui.{domain}
     -  TCP
     -  443
     -  Web UI
   * -  Edge Orchestrator API
     -  api.{domain}
     -  TCP
     -  443
     -  Tenancy API
   * -  Edge Orchestrator UI and API
     -  metadata.{domain}
     -  TCP
     -  443
     -  Web UI
   * -  Edge Orchestrator UI and API
     -  cluster-orch.{domain}
     -  TCP
     -  443
     -  Cluster orchestration
   * -  Edge Orchestrator UI and API
     -  iaas.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge Orchestrator UI and API
     -  infra.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge Orchestrator UI and API
     -  onboarding.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge Orchestrator UI and API
     -  update.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge Orchestrator UI and API
     -  keycloak.{domain}
     -  TCP
     -  443
     -  Identity and Access Management
   * -  Edge Orchestrator UI and API
     -  rancher.{domain}
     -  TCP
     -  443
     -  Rancher's Fleet UI
   * -  Edge Orchestrator UI and API
     -  registry.{domain}
     -  TCP
     -  443
     -  Harbor\* UI
   * -  Edge Orchestrator UI and API
     -  vault.{domain}
     -  TCP
     -  443
     -  Vault\* UI
   * -  Edge node
     -  cluster-orch-node.{domain}
     -  TCP
     -  443
     -  Cluster orchestration
   * -  Edge node
     -  infra-node.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge node
     -  onboarding-node.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge node
     -  release.{domain}
     -  TCP
     -  443
     -  Release service token
   * -  Edge node
     -  tinkerbell-server.{domain}
     -  TCP
     -  443
     -  Onboarding
   * -  Edge node
     -  update-node.{domain}
     -  TCP
     -  443
     -  Edge infrastructure management
   * -  Edge node
     -  tinkerbell-haproxy.{domain}
     -  TCP
     -  443
     -  BIOS onboarding

.. _on_prem_lenovo_firewall_configuration:

Firewall Configuration for Edge Orchestrator and Edge Node
----------------------------------------------------------

To install Edge Orchestrator and Edge Node, the following Egress rules are required:

.. list-table:: Network Egress for Edge Orchestrator and Edge Nodes
  :header-rows: 1

  * -  Source
    -  Destination
    -  Description
  * -  Edge Orchestrator
    -  https://docker.io
    -  Container images
  * -  Edge Orchestrator
    -  https://ghcr.io
    -  Container images
  * -  Edge Orchestrator
    -  https://registry.k8s.io
    -  Container images
  * -  Edge Orchestrator
    -  https://quay.io
    -  Container images
  * -  Edge Orchestrator
    -  https://k8s.gcr.io
    -  Container images
  * -  Edge Orchestrator
    -  https://registry-rs.edgeorchestration.intel.com
    -  Container images
  * -  Edge Orchestrator
    -  https://github.com/
    -  Container images
  * -  Edge Orchestrator
    -  https://kubernetes.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://charts.external-secrets.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://rancher.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://helm.goharbor.io
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://istio-release.storage.googleapis.com/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://kiali.org/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://kyverno.github.io/kyverno/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://metallb.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://github.com/prometheus-community/helm-charts
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://charts.bitnami.com/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://github.com/stakater/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://github.com/traefik/traefik-helm-chart
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://helm.releases.hashicorp.com
    -  Helm Chart
  * -  Edge Node
    -  https://\*.github.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.github.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.githubusercontent.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.intel.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.infra-host.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.docker.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.docker.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.quay.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.fluentbit.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.k8s.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.pkg.dev
    -  Onboarding
  * -  Edge Node
    -  https://\*.public.ecr.aws
    -  Onboarding
  * -  Edge Node
    -  https://\*.cloudfront.net
    -  Onboarding
  * -  Edge Node
    -  https://\*.api.snapcraft.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.snapcraftcontent.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.rke2.io
    -  Onboarding
  * -  Edge Node
    -  https://\*.archive.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://launchpad.net/+tour/ppa
    -  Onboarding
  * -  Edge Node
    -  https://esm.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://ports.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://security.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://ddebs.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://mirrors.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.archive.canonical.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.extras.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://changelogs.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://cloud-images.ubuntu.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.debian.org
    -  Onboarding
  * -  Edge Node
    -  http://cdn.debian.net
    -  Onboarding
  * -  Edge Node
    -  http://http.debian.net
    -  Onboarding


Squid Proxy Firewall Configuration (Optional)
---------------------------------------------

When deploying Edge Orchestrator with Squid proxy, you will need an additional firewall entry to allow the edge node to reach the Squid proxy.
Intel recommends that only the edge node subnet is allowed to access the Squid proxy endpoint.

.. list-table:: Network Endpoints for Squid Proxy.
   :header-rows: 1

   * -  Source
     -  Destination
     -  Protocol
     -  Port Number
     -  Description
   * -  Edge node
     -  {IP of Traefik endpoint in Edge Orchestrator}
     -  TCP
     -  8080
     -  Squid proxy


.. toctree::
   :hidden:

   system_requirements_on_prem_orch
   on_prem_certs
   ../../../shared/shared_gs_preinstall
   on_prem_install
   ../../../shared/shared_gs_iam
   ../../../shared/shared_mt_overview
   ../../../shared/shared_next_steps
