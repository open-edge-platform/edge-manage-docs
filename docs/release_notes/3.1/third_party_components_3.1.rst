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
     - 1.10.1-static
   * - Fleet-Controller
     - Container
     - rancher/fleet:v0.12.8
     - v0.12.8
   * - Fleet-Controller
     - Helm
     - https://rancher.github.io/fleet-helm-charts/flleet:0.12.8
     - 0.12.8
   * - Fleet-CRD
     - Helm
     - https://rancher.github.io/fleet-helm-charts/fleet-crd:0.12.8
     - 0.12.8
   * - Fleet-Agent
     - Container
     - rancher/fleet-agent:v0.12.8
     - v0.12.8
   * - redis (gitea)
     - Container
     - docker.io/library/redis:7.2.11
     - 7.2.11
   * - Harbor-core
     - Container
     - goharbor/harbor-core:v2.13.2
     - v2.13.2
   * - Harbor-database
     - Container
     - goharbor/harbor-db:v2.13.2
     - v2.13.2
   * - Harbor-jobservice
     - Container
     - goharbor/harbor-jobservice:v2.13.2
     - v2.13.2
   * - Harbor-nginx
     - Container
     - goharbor/nginx-photon:v2.13.2
     - v2.13.2
   * - Harbor-portal
     - Container
     - goharbor/harbor-portal:v2.13.2
     - v2.13.2
   * - Harbor-redis
     - Container
     - goharbor/redis-photon:v2.13.2
     - v2.13.2
   * - Harbor-registry
     - Container
     - goharbor/registry-photon:v2.13.2, goharbor/harbor-registryctl:v2.13.2
     - v2.13.2
   * - Harbor-trivy
     - Container
     - goharbor/trivy-adapter-photon:v2.13.2
     - v2.13.2
   * - Harbor
     - Helm
     - https://helm.goharbor.io/harbor:1.17.2
     - 1.17.2

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
     - Helm/Container
     - https://github.com/kubernetes-sigs/cluster-api-operator/tree/release-0.23/hack/charts/cluster-api-operator
     - 0.23
   * - cluster-api core provider
     - Container
     - https://github.com/kubernetes-sigs/cluster-api/releases/tag/v1.10.7
     - 1.10.7
   * - open-policy-agent
     - Container
     - openpolicyagent/opa
     - 
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
   * - Skupper Site Controller
     - Container
     - quay.io/skupper/site-controller
     - 1.9.4
   * - MetalLB Controller
     - Container
     - quay.io/metallb/controller
     - v0.15.2
   * - MetalLB Speaker
     - Container
     - quay.io/metallb/speaker
     - v0.15.2
   * - Nginx Ingress
     - Container
     - ingress-nginx-controller
     - v1.13.3
   * - Kube-Rbac-Proxy
     - Container
     - quay.io/brancz/kube-rbac-proxy
     - v0.20.0
   * - macvtap-cni (Kubevirt)
     - Container
     - quay.io/kubevirt/macvtap-cni
     - v0.13.0
   * - virt-controller (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-controller
     - v1.6.3
   * - virt-launcher (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-launcher
     - v1.6.3
   * - virt-handler (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-handler
     - v1.6.3
   * - virt-operator (Kubevirt)
     - Container
     - quay.io/kubevirt/virt-operator
     - v1.6.3
   * - cert-manager
     - Helm/Container
     - https://artifacthub.io/packages/helm/cert-manager/cert-manager
     - 1.19.1
   * - fluent-bit
     - Helm/Container
     - https://github.com/fluent/helm-charts/tree/main/charts/fluent-bit
     - 0.54.0
   * - nfd
     - Helm/Container
     - https://github.com/kubernetes-sigs/node-feature-discovery/tree/0706c7a5607ec260a024a36c22697f054fac3e77/deployment/helm/node-feature-discovery
     - 0.18.3
   * - node-exporter
     - Helm/Container
     - https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-node-exporter
     - 4.49.1
   * - prometheus
     - Helm/Container
     - https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
     - 77.3.0
   * - telegraf
     - Helm/Container
     - https://github.com/influxdata/helm-charts/tree/master/charts/telegraf
     - 1.8.64
   * - kubernetes-dashboard
     - Helm/Container
     - https://github.com/kubernetes/dashboard/releases/tag/kubernetes-dashboard-7.13.0
     - 7.14.0

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
     - https://hub.docker.com//busybox/
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
     - 1.17.4
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-controller
     - v1.17.4
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-cainjector
     - v1.17.4
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-webhook
     - v1.17.4
   * - cluster-autoscaler
     - helm chart
     - https://kubernetes.github.io/autoscaler
     - 9.37.0
   * - external-secrets
     - helm chart
     - https://charts.external-secrets.io
     - 0.20.4
   * - external-secrets
     - image
     - ghcr.io/external-secrets/external-secrets
     - v0.20.4
   * - ingress-nginx
     - helm chart
     - https://kubernetes.github.io/ingress-nginx
     - 4.13.3
   * - ingress-nginx
     - image
     - registry.k8s.io/ingress-nginx/kube-webhook-certgen
     - v1.6.3
   * - ingress-nginx
     - image
     - registry.k8s.io/ingress-nginx/controller
     - v1.13.3
   * - istio base
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.28.0
   * - istiod
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.28.0
   * - istiod
     - image
     - docker.io/istio/pilot
     - 1.28.0
   * - keycloak
     - helm chart
     - https://github.com/bitnami/charts/tree/main/bitnami/keycloak
     - 24.4.12
   * - keycloak
     - image
     - docker.io/bitnami/keycloak
     - 26.1.3-debian-12-r0
   * - keycloak
     - image
     - docker.io/bitnami/keycloak-config-cli
     - 6.4.0-debian-12-r0
   * - keycloak-tenant-controller
     - image
     - badouralix/curl-jq
     - sha256:8ee002ae4452b23a3c70750c5c081e95334cfe9f7968fb4d67a90d4001c29d0b
   * - keycloak-tenant-controller
     - image
     - alpine/kubectl
     - 1.34.1
   * - kiali
     - helm chart
     - https://kiali.org/helm-charts
     - 2.18.0
   * - kiali
     - image
     - quay.io/kiali/kiali
     - v2.18.0
   * - kyverno
     - helm chart
     - https://kyverno.github.io/kyverno
     - 3.5.1
   * - kyverno
     - image
     - ghcr.io/kyverno/kyvernopre
     - v1.15.1
   * - kyverno
     - image
     - ghcr.io/kyverno/kyverno
     - v1.15.1
   * - kyverno
     - image
     - ghcr.io/kyverno/background-controller
     - v1.15.1
   * - metalLB
     - helm chart
     - https://metallb.github.io/metallb
     - 0.15.2
   * - metalLB
     - image
     - quay.io/metallb/controller
     - v0.15.2
   * - metalLB
     - image
     - quay.io/frrouting/frr
     - v0.15.2
   * - metalLB
     - image
     - quay.io/metallb/speaker
     - v0.15.2
   * - postgresql-cluster
     - helm chart
     - ghcr.io/cloudnative-pg/charts/cluster
     - 0.3.1
   * - postgresql-cluster
     - image
     - ghcr.io/cloudnative-pg/postgresql
     - 17
   * - postgresql-operator
     - helm chart
     - ghcr.io/cloudnative-pg/charts/cloudnative-pg
     - 0.26.0
   * - postgresql-operator
     - image
     - ghcr.io/cloudnative-pg/cloudnative-pg
     - 1.27.0
   * - reloader
     - helm chart
     - https://stakater.github.io/stakater-charts
     - 2.2.3
   * - reloader
     - image
     - ghcr.io/stakater/reloader
     - v1.4.8
   * - traefik
     - helm chart
     - https://helm.traefik.io/traefik
     - 37.2.0
   * - traefik
     - image
     - docker.io/traefik
     - v3.5.3
   * - vault
     - helm chart
     - https://helm.releases.hashicorp.com/
     - 0.31.0
   * - vault
     - image
     - alpine
     - 3.22.2
   * - vault
     - image
     - postgres
     - 16.10-bookworm
   * - vault
     - image
     - hashicorp/vault
     - 1.20.4
   * - vault
     - image
     - hashicorp/vault-k8s
     - 1.7.0
   * - argocd
     - helm chart
     - https://argoproj.github.io/argo-helm
     - 8.2.7
   * - argocd
     - image
     - public.ecr.aws/docker/library/redis
     - 7.2.8-alpine
   * - argocd
     - image
     - quay.io/argoproj/argocd
     - v3.0.12
   * - gitea
     - helm chart
     - registry-1.docker.io/giteacharts/gitea
     - 10.6.0
   * - gitea
     - image
     - gitea/gitea
     - 1.25.1-rootless
   * - gitea
     - image
     - postgres
     - 16.10-bookworm
   * - gitea
     - image
     - redis
     - 7.2.11
   * - openebs
     - image
     - openebs/provisioner-localpv
     - 4.3.0

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
     - 1.29.0
   * - grafana
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 10.1.4
   * - kube-prometheus-stack
     - Helm Chart
     - https://prometheus-community.github.io/helm-charts
     - 79.7.1
   * - loki
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 6.46.0
   * - mimir-distributed
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 6.0.3
   * - minio
     - Helm Chart
     - https://charts.min.io/
     - 5.4.0
   * - opentelemetry-collector
     - Helm Chart
     - https://open-telemetry.github.io/opentelemetry-helm-charts
     - 0.136.1
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
     - 3.0.2
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
     - B.02.20
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
     - 238
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
     - Debian pkg
     - Source
     - https://zlib.net/
     - 1.2.11
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
     - Source
     - https://gitlab.com/apparmor/apparmor
     - 3.0.4
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
     - Containers, scripts, dockerfiles and binaries
     - https://github.com/confidential-containers/containerd, https://github.com/containerd/nydus-snapshotter
     -
   * - kata
     - Containers, scripts, dockerfiles and binaries
     - https://github.com/kata-containers/kata-containers/releases/download/3.13.0/kata-static-3.13.0-amd64.tar.xz, https://github.com/kata-containers/kata-containers
     -
   * - Debian Bookworm
     - Containers and binaries
     - https://hub.docker.com/_/debian, docker.io, https://www.debian.org/
     -
   * - curlimages/curl
     - Containers, scripts, dockerfiles and binaries
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
     - http://pkg.cfssl.org
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
   * - argcomplete, yq, xmltodict, xz-libs, tomlkit, PyYAML
     - Containers and binaries
     - https://pypi.org/
     -