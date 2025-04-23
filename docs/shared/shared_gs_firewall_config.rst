Firewall Configuration
----------------------------------------

The following table lists the network endpoints for Edge Orchestrator and edge nodes. You can use this to configure Edge Orchestrator firewall ingress rules appropriate for your network environment.

* ArgoCD Admin UI at ``argo.{domain}``. Intel recommends that you restrict the
  incoming traffic to a subset of known source IPs because this is an administrator interface.
* BIOS Onboarding accesses ``tinkerbell-nginx.{domain}``.
* You can access all other services from edge nodes agents, UI, and APIs
  of Edge Orchestrator.

.. list-table:: Network Ingress Endpoints for Edge Orchestrator and Edge Nodes
   :header-rows: 1

   * -  Source
     -  Destination
     -  Protocol:Port
     -  Description
   * -  Edge Orchestrator UI and API
     -  {domain}
     -  TCP:443
     -  Web UI
   * -  Edge Orchestrator UI and API
     -  web-ui.{domain}
     -  TCP:443
     -  Web UI
   * -  Edge Orchestrator API
     -  api.{domain}
     -  TCP:443
     -  Tenancy API
   * -  Edge Orchestrator UI and API
     -  app-service-proxy.{domain}
     -  TCP:443
     -  Application orchestration
   * -  Edge Orchestrator UI and API
     -  gitea.{domain}
     -  TCP:443
     -  Application orchestration
   * -  Edge Orchestrator UI and API
     -  vnc.{domain}
     -  TCP:443
     -  Application orchestration
   * -  Edge Orchestrator UI and API
     -  keycloak.{domain}
     -  TCP:443
     -  Identity and Access Management
   * -  Edge Orchestrator UI and API
     -  observability-admin.{domain}
     -  TCP:443
     -  Observability
   * -  Edge Orchestrator UI and API
     -  observability-ui.{domain}
     -  TCP:443
     -  Observability
   * -  Edge Orchestrator UI and API
     -  registry-oci.{domain}
     -  TCP:443
     -  Harbor\* UI
   * -  Edge Orchestrator UI and API
     -  vault.{domain}
     -  TCP:443
     -  Vault\* UI
   * -  Edge node
     -  cluster-orch-node.{domain}
     -  TCP:443
     -  Cluster orchestration
   * -  Edge node
     -  infra-node.{domain}
     -  TCP:443
     -  Edge Infrastructure Manager
   * -  Edge node
     -  attest-node.{domain}
     -  TCP:443
     -  Edge Infrastructure Manager
   * -  Edge node
     -  onboarding-node.{domain}
     -  TCP:443
     -  Edge Infrastructure Manager
   * -  Edge node
     -  onboarding-stream.{domain}
     -  TCP:443
     -  Edge Infrastructure Manager
   * -  Edge node
     -  release.{domain}
     -  TCP:443
     -  Release service token
   * -  Edge node
     -  metrics-node.{domain}
     -  TCP:443
     -  Observability
   * -  Edge node
     -  telemetry-node.{domain}
     -  TCP:443
     -  Observability
   * -  Edge node
     -  logs-node.{domain}
     -  TCP:443
     -  Observability
   * -  Edge node
     -  tinkerbell-server.{domain}
     -  TCP:443
     -  Onboarding
   * -  Edge node
     -  update-node.{domain}
     -  TCP:443
     -  Edge Infrastructure Manager
   * -  Edge node
     -  connect-gateway.{domain}
     -  TCP:443
     -  Cluster orchestration
   * -  Edge node
     -  fleet.{domain}
     -  TCP:443
     -  Cluster orchestration
   * -  Edge node
     -  tinkerbell-nginx.{domain}
     -  TCP:443
     -  BIOS onboarding
   * -  Edge Orchestrator admin
     -  argo.{domain}
     -  TCP:443
     -  ArgoCD UI

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
    -  https://cr.fluentbit.io
    -  Container images
  * -  Edge Orchestrator
    -  https://k8s.gcr.io
    -  Container images
  * -  Edge Orchestrator
    -  https://registry-rs.edgeorchestration.intel.com
    -  Container images
  * -  Edge Orchestrator
    -  https://files-rs.edgeorchestration.intel.com
    -  Installation files
  * -  Edge Orchestrator
    -  https://github.com/
    -  Container images
  * -  Edge Orchestrator
    -  https://aws.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://kubernetes-sigs.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://charts.jetstack.io
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://kubernetes.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://charts.external-secrets.io
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
    -  https://kyverno.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://metallb.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://prometheus-community.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://charts.bitnami.com/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://stakater.github.io/
    -  Helm Chart
  * -  Edge Orchestrator
    -  https://helm.traefik.io/
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
    -  https://\*.haxx.se
    -  Onboarding
  * -  Edge Node
    -  https://\*.curl.se
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
    -  https://\*.amazonaws.com
    -  Onboarding
  * -  Edge Node
    -  https://\*.letsencrypt.org
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
    -  https://ppa.launchpad.net
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
