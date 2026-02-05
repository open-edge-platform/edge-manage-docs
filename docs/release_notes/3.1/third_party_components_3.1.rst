Third Party Components
===========================

Following is a list of all the third party components that |software_prod_name|
version 3.1 uses.

Application Orchestration
--------------------------
.. list-table:: App orch External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - Open Policy Agent
     - Container
     - openpolicyagent/opa
     - 1.5.0/1.5.1,1.6.0
   * - Fleet-Controller
     - Container
     - rancher/fleet
     - 0.12.1
   * - Fleet-Controller
     - Helm*
     - https://rancher.github.io/fleet-helm-charts/fleet
     - 0.12.2
   * - Fleet-CRD
     - Helm
     - https://rancher.github.io/fleet-helm-charts/fleet-crd
     - 0.12.2
   * - Fleet-Agent
     - Container
     - rancher/fleet-agent
     - v0.12.2
   * - redis (gitea)
     - Container
     - docker.io/bitnami/redis
     - 7.2.5-debian-12-r4
   * - Harbor-core
     - Container
     - goharbor/harbor-core
     - v2.13.0
   * - Harbor-database
     - Container
     - goharbor/harbor-db
     - v2.13.0
   * - Harbor-jobservice
     - Container
     - goharbor/harbor-jobservice
     - v2.13.0
   * - Harbor-nginx
     - Container
     - goharbor/nginx-photon
     - v2.13.0
   * - Harbor-portal
     - Container
     - goharbor/harbor-portal
     - v2.13.0
   * - Harbor-redis
     - Container
     - goharbor/redis-photon
     - v2.13.0
   * - Harbor-registry
     - Container
     - goharbor/registry-photon, goharbor/harbor-registryctl
     - v2.13.0
   * - Harbor-trivy
     - Container
     - goharbor/trivy-adapter-photon
     - v2.13.0
   * - Harbor
     - Helm
     - https://helm.goharbor.io/harbor
     - 1.17.0

Cluster Orchestration
---------------------

.. list-table:: cluster orch External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - cluster-api-operator
     - Helm*/Container
     - https://github.com/kubernetes-sigs/cluster-api-operator/tree/release-0.15/hack/charts/cluster-api-operator
     - 0.15.1
   * - cluster-api core provider
     - Container
     - https://github.com/kubernetes-sigs/cluster-api/releases/tag/v1.9.7
     - 1.9.7
   * - CAPI rke2 controlplane/bootstrap provider
     - Container
     - https://github.com/rancher/cluster-api-provider-rke2/releases/tag/v0.16.2
     - 0.16.2
   * - open-policy-agent
     - Container
     - openpolicyagent/opa
     - 1.2.0
   * - CAPI k3s controlplane/bootstrap provider
     - Container
     - https://github.com/k3s-io/cluster-api-k3s/releases/tag/v0.3.0
     - v0.3.0

Cluster Extensions
-------------------

.. list-table:: Cluster Extensions External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - Skupper Router
     - Container
     - quay.io/skupper/skupper-router
     - 0.2.1
   * - Skupper Config Sync
     - Container
     - quay.io/skupper/config-sync
     -
   * - Skupper Service Controller
     - Container
     - quay.io/skupper/service-controller
     -
   * - Skupper Site Controller
     - Container
     - quay.io/skupper/site-controller
     - 1.8.3
   * - MetalLB Controller
     - Container
     - quay.io/metallb/controller
     - v0.14.8
   * - MetalLB Speaker
     - Container
     - quay.io/metallb/speaker
     - v0.14.8
   * - Nginx Ingress Controller
     - Container
     - ingress-nginx-controller
     - v1.9.6
   * - Kube-Rbac-Proxy(GPU Ext)
     - Container
     - gcr.io/kubebuilder/kube-rbac-proxy
     - v0.19.0
   * - macvtap-cni (Kubevirt)
     - Container
     - quay.io/kubevirt/macvtap-cni
     - v0.11.1
   * - virt-controller (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-controller
     - v1.4.0
   * - virt-launcher (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-launcher
     - v1.4.0
   * - virt-handler (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-handler
     - v1.4.0
   * - virt-operator (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-operator
     - v1.4.0
   * - akri-agent
     - Container
     - akri-agent-daemonset-vgxwn
     - v0.12.20
   * - akri-discovery
     - Container
     - ghcr.io/project-akri/akri/udev-discovery
     - v0.12.20
   * - akri-webhook-configuration
     - Container
     - ghcr.io/project-akri/akri/webhook-configuration
     - v0.12.20
   * - fluent-bit
     - Helm/Container
     - https://github.com/fluent/helm-charts/tree/main/charts/fluent-bit
     - 0.48.9
   * - nfd (node-feature-discovery)
     - Helm/Container
     - https://github.com/kubernetes-sigs/node-feature-discovery
     - 0.17.0
   * - node-exporter
     - Helm/Container
     - https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-node-exporter
     - 4.45.0
   * - prometheus
     - Helm/Container
     - https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
     - 70.3.0
   * - telegraf
     - Helm/Container
     - https://github.com/influxdata/helm-charts/tree/master/charts/telegraf
     - 1.8.55
   * - cert-manager
     - Helm/Container
     - https://artifacthub.io/packages/helm/cert-manager/cert-manager/1.16.3
     - 1.16.3
   * - kubernetes-dashboard
     - Helm/Container
     - https://github.com/kubernetes/dashboard/releases/tag/kubernetes-dashboard-7.13.0
     - 7.13.0
   * - nvidia-gpu-operator
     - Helm/Container
     - https://helm.ngc.nvidia.com/nvidia/gpu-operator
     - v25.3.0
   * - intel-device-plugins-operator
     - Helm/Container
     - https://intel.github.io/helm-charts/intel-device-plugins-gpu
     - 0.29.0

Edge Infrastructure Manager
----------------------------

.. list-table:: Infra Manager External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - tinkerbell - hegel
     - Container
     - https://github.com/tinkerbell/hegel
     - v0.12.0
   * - tinkerbell - smee
     - Container
     - https://github.com/tinkerbell/smee
     - v0.9.0
   * - tinkerbell - tink, controller, worker
     - Container
     - https://github.com/tinkerbell/
     - v0.10.0
   * - tinkerbell - kube-vip
     - Container (load balancer)
     - https://github.com/kube-vip/kube-vip
     - v0.7.2
   * - curl-jq
     - Container (utility)
     - https://github.com/badouralix/dockerfiles/tree/main/curl-jq
     - sha256:fe8a5ee49f613495df3b57afa86b39f081bd1b3b9ed61248f46c3d3d7df56092
   * - busybox
     - Container (utility)
     - https://hub.docker.com/_/busybox/
     - 1.36.1
   * - mps
     - Container
     - docker.io/intel/oact-mps:v2.14.2
     - v2.14.2
   * - rps
     - Container
     - docker.io/intel/oact-rps:v2.24.0
     - v2.24.0

Platform services
----------------------

.. list-table:: Platform services External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - aws-lb
     - helm chart
     - https://aws.github.io/eks-charts
     - 1.7.1
   * - aws-lb
     - image
     - public.ecr.aws/eks/aws-load-balancer-controller
     - 2.7.1
   * - botkube
     - helm chart
     - https://charts.botkube.io/
     - 1.11.0
   * - botkube
     - image
     - ghcr.io/kubeshop/botkube
     - v1.11.0
   * - cert-manager
     - helm chart
     - https://charts.jetstack.io
     - 1.13.6
   * - cert-manager (controller)
     - image
     - quay.io/jetstack/cert-manager-controller
     - v1.13.6
   * - cert-manager (cainjector)
     - image
     - quay.io/jetstack/cert-manager-cainjector
     - v1.13.6
   * - cert-manager (ctl)
     - image
     - quay.io/jetstack/cert-manager-ctl
     - v1.13.6
   * - cert-manager (webhook)
     - image
     - quay.io/jetstack/cert-manager-webhook
     - v1.13.6
   * - cluster-autoscaler
     - helm chart
     - https://kubernetes.github.io/autoscaler
     - 9.37.0
   * - external-secrets
     - helm chart
     - https://charts.external-secrets.io
     - 0.9.11
   * - external-secrets
     - image
     - ghcr.io/external-secrets/external-secrets
     - v0.9.11
   * - ingress-nginx
     - helm chart
     - https://kubernetes.github.io/ingress-nginx
     - 4.9.1
   * - ingress-nginx (webhook)
     - image
     - registry.k8s.io/ingress-nginx/kube-webhook-certgen
     - v20231226-1a7112e06
   * - ingress-nginx (controller)
     - image
     - registry.k8s.io/ingress-nginx/controller
     - v1.9.6
   * - istio-base
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.18.0
   * - istiod
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.18.0
   * - istiod (pilot)
     - image
     - docker.io/istio/pilot
     - 1.18.0
   * - keycloak
     - helm chart
     - https://github.com/bitnami/charts/tree/main/bitnami/keycloak
     - 24.0.1
   * - keycloak
     - image
     - docker.io/bitnami/keycloak
     - 26.0.1-debian-12-r0
   * - keycloak (config-cli)
     - image
     - docker.io/bitnami/keycloak-config-cli
     - 6.1.6-debian-12-r4
   * - curl-jq
     - Container (utility)
     - badouralix/curl-jq
     - sha256:fe8a5ee49f613495df3b57afa86b39f081bd1b3b9ed61248f46c3d3d7df56092
   * - kubectl
     - image
     - bitnami/kubectl
     - latest
   * - kiali
     - helm chart
     - https://kiali.org/helm-charts
     - 1.69.0
   * - kiali
     - image
     - quay.io/kiali/kiali
     - v1.69.0
   * - kyverno
     - helm chart
     - https://kyverno.github.io/kyverno
     - 3.2.5
   * - kyverno (kyvernopre)
     - image
     - ghcr.io/kyverno/kyvernopre
     - v1.12.4
   * - kyverno (kyverno)
     - image
     - ghcr.io/kyverno/kyverno
     - v1.12.4
   * - kyverno (background-controller)
     - image
     - ghcr.io/kyverno/background-controller
     - v1.12.4
   * - metalLB
     - helm chart
     - https://metallb.github.io/metallb
     - 0.14.3
   * - metalLB (controller)
     - image
     - quay.io/metallb/controller
     - v0.13.11
   * - metalLB (frr)
     - image
     - quay.io/frrouting/frr
     - 8.5.2
   * - metalLB (speaker)
     - image
     - quay.io/metallb/speaker
     - v0.13.11
   * - postgresql
     - helm chart
     - https://github.com/bitnami/charts/tree/main/bitnami/postgresql
     - 15.5.26
   * - postgresql
     - image
     - docker.io/bitnami/postgresql
     - 16.4.0-debian-12-r4
   * - reloader
     - helm chart
     - https://stakater.github.io/stakater-charts
     - 1.0.54
   * - reloader
     - image
     - ghcr.io/stakater/reloader
     - v1.0.54
   * - traefik
     - helm chart
     - https://helm.traefik.io/traefik
     - 25.0.0
   * - traefik
     - image
     - docker.io/traefik
     - v2.10.5
   * - vault
     - helm chart
     - https://helm.releases.hashicorp.com/
     - 0.28.1
   * - vault (alpine dep)
     - image
     - alpine
     - 3.18.2
   * - vault (postgres dep)
     - image
     - bitnami/postgresql
     - 14.5.0-debian-11-r2
   * - vault
     - image
     - hashicorp/vault
     - 1.14.9
   * - vault (k8s)
     - image
     - hashicorp/vault-k8s
     - 1.4.2
   * - metalLB
     - helm chart
     - https://metallb.github.io/metallb
     - 0.13.11
   * - argocd
     - helm chart
     - https://argoproj.github.io/argo-helm
     - 7.4.4
   * - argocd (redis dep)
     - image
     - public.ecr.aws/docker/library/redis
     - 7.2.4-alpine
   * - argocd
     - image
     - quay.io/argoproj/argocd
     - v2.12.1
   * - gitea
     - helm chart
     - oci://registry-1.docker.io/giteacharts/gitea
     - 10.6.0
   * - gitea
     - image
     - gitea/gitea
     - 1.22.3-rootless
   * - gitea (postgres dep)
     - image
     - docker.io/bitnami/postgresql
     - 16.3.1-debian-12-r23
   * - gitea (redis dep)
     - image
     - docker.io/bitnami/redis
     - 7.2.5-debian-12-r4

Observabilty (O11y)
-------------------

.. list-table:: Observability External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - alertmanager
     - Helm Chart
     - https://prometheus-community.github.io/helm-charts/
     - 1.14.0
   * - grafana
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 9.2.2
   * - kube-prometheus-stack
     - Helm Chart
     - https://prometheus-community.github.io/helm-charts
     - 69.3.2
   * - loki
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 6.30.1
   * - mimir-distributed
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 5.7.0
   * - minio
     - Helm Chart
     - https://charts.min.io/
     - 5.4.0
   * - opentelemetry-collector
     - Helm Chart
     - https://open-telemetry.github.io/opentelemetry-helm-charts
     - 0.115.0
   * - opentelemetry-operator
     - Helm Chart
     - https://open-telemetry.github.io/opentelemetry-helm-charts
     - 0.90.3
   * - tempo
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 1.18.3
   * - open-policy-agent
     - Container
     - openpolicyagent/opa
     - 1.0.1-static

Edge Node Agents
------------------

.. list-table:: Edge Node Agents External Dependencies
   :header-rows: 2
   :widths: 25 15 30 30 10 10
   :stub-columns: 0

   * - Dependency
     - Type
     -
     - Link
     - Version
     -
   * -
     - Ubuntu
     - EMT
     -
     - Ubuntu
     - EMT
   * - caddy
     - Debian pkg
     - Source
     - https://github.com/caddyserver/caddy
     - 2.7.6
     - 2.9.1
   * - incron
     - Debian pkg
     - Source
     - https://github.com/ar-/incron
     - 0.5.12
     - 0.5.12
   * - openssl
     - Debian pkg
     - Source
     - https://www.openssl.org/
     - 3.1.2
     - 3.3.3
   * - dmidecode
     - Debian pkg
     - Source
     - https://nongnu.org/dmidecode/
     - 3.3
     - 3.6
   * - ipmitool
     - Debian pkg
     - Source
     - https://github.com/ipmitool/ipmitool
     - 1.8.18
     - 1.8.19
   * - lsb-release
     - Debian pkg
     - Source
     - https://wiki.linuxfoundation.org/lsb/start
     - 11.1.0
     - 3.2
   * - lshw
     - Debian pkg
     - Source
     - https://ezix.org/project/wiki/HardwareLiSter
     - B.02.19
     - B.02.21
   * - pciutils
     - Debian pkg
     - Source
     - https://github.com/pciutils/pciutils
     - 3.7.0
     - 3.11.1
   * - udev
     - Debian pkg
     - Source
     - https://github.com/systemd/systemd
     - 249.11
     - 252
   * - usbutils
     - Debian pkg
     - Source
     - https://github.com/gregkh/usbutils
     - 014
     - 017
   * - bash
     - Debian pkg
     - Source
     - https://www.gnu.org/software/bash/
     - 5.1
     - 5.2.15
   * - zlib
     -
     - Source
     - https://zlib.net/
     -
     - 1.3.1
   * - mosquitto
     - Debian pkg
     - Source
     - https://mosquitto.org/
     - 2.0.11
     - 2.0.19
   * - cryptsetup
     - Debian pkg
     - Source
     - https://gitlab.com/cryptsetup/cryptsetup
     - 2.4.3
     - 2.4.3
   * - tpm2-tools
     - Debian pkg
     - Source
     - https://github.com/tpm2-software/tpm2-tools
     - 5.2
     - 5.5.1
   * - tpm2-abrmd
     - Debian pkg
     - Source
     - https://github.com/tpm2-software/tpm2-abrmd
     - 2.4.0
     - 3.0.0
   * - apparmor
     - Debian pkg
     -
     - https://gitlab.com/apparmor/apparmor
     - 3.1.4
     -
   * - lxc
     - Debian pkg
     - Source
     - https://linuxcontainers.org/lxc/
     - 5.0.0
     - 5.0.3
   * - fluent-bit
     - Debian pkg
     - Source
     - https://github.com/fluent/fluent-bit
     - 3.2.9
     - 3.1.9
   * - jq
     - Debian pkg
     - Source
     - https://github.com/jqlang/jq
     - 1.6.2
     - 1.7.1
   * - otelcol-contrib
     - Debian pkg
     - Source
     - https://github.com/open-telemetry/opentelemetry-collector-contrib
     - 0.122.1
     - 0.117.0
   * - rasdaemon
     - Debian pkg
     - Source
     - https://github.com/mchehab/rasdaemon
     - 0.6.7
     - 0.8.0
   * - smartmontools
     - Debian pkg
     - Source
     - https://www.smartmontools.org/
     - 7.2
     - 7.4
   * - telegraf
     - Debian pkg
     - Source
     - https://github.com/influxdata/telegraf
     - 1.34.0
     - 1.31.0
   * - curl
     - Debian pkg
     - Source
     - https://curl.se/
     - 7.81.0
     - 8.11.1
   * - lms
     - Debian package
     - Source
     - https://github.com/intel/lms
     - 2506.0.0.0
     - 2506.0.0.0

User Interface
--------------

.. list-table:: User Interface External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - nginxinc/nginx-unprivileged
     - Container
     - https://hub.docker.com/r/nginxinc/nginx-unprivileged
     - stable-alpine
   * - golang
     - ContainerImage
     - https://hub.docker.com/_/golang
     - 1.23.8
   * - bitnami/keycloak
     - Helm Chart
     - https://github.com/bitnami/charts/tree/main/bitnami/keycloak
     - 24.0.1
   * - openpolicyagent/opa
     - ContainerImage
     - https://hub.docker.com/r/openpolicyagent/opa/
     - 1.2.0
   * - react
     - ContainerImage
     - https://www.npmjs.com/package/react
     - 18.2.0

Trusted Compute
---------------

.. list-table:: Trusted Compute External Dependencies
   :header-rows: 1
   :widths: 25 15 30 30
   :stub-columns: 0

   * - Dependency
     - Type
     - Link
     - Version
   * - confidentail containers
     - Containers, scripts, ...
     - https://github.com/confidential-containers/containerd
     -
   * - kata
     - Containers, scripts, ...
     - https://github.com/kata-containers/kata-containers/releases/download/3.13.1/kata-static-3.13.1-amd64.tar.xz
     -
   * - Debian Bookworm
     - Containers and binaries
     - https://hub.docker.com/_/debian, docker.io, ...
     -
   * - curlimages/curl
     - Containers, scripts, ...
     - https://hub.docker.com/r/curlimages/curl
     -
   * - Alpine Linux
     - Containers and binaries
     - https://hub.docker.com/_/alpine
     - 3.18.2
   * - golang
     - Containers and binaries
     - https://hub.docker.com/_/golang
     - 1.23.2
   * - NATS
     - Containers and binaries
     -
     -
   * - kubectl
     - Binaries
     - https://dl.k8s.io
     - 1.28.4
   * - containerd-static-linux
     - Binaries
     - github.com/containerd/containerd
     -
   * - cfssl_linux-amd64
     - Containers and binaries
     - http://pkg.cfssl.org
     -
   * - jq
     - Containers and binaries
     - https://github.com/jqlang/jq
     -
   * - argcomplete, yq, xmltodict, ...
     - Containers and binaries
     - https://pypi.org/
     -
