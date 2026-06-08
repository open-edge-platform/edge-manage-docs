.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

.. _third_party_2026.1:

Third Party Components
===========================

Following is a list of all the third party components that |software_prod_name|
version 2026.1 uses.

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
     - <TBD>
   * - tinkerbell - tink
     - Container
     - https://github.com/tinkerbell/tink
     - v0.10.0
   * - tinkerbell - kube-vip
     - Container (load balancer)
     - https://github.com/kube-vip/kube-vip
     - <TBD>
   * - curl-jq
     - Container (utility)
     - https://github.com/badouralix/dockerfiles
     - sha256:8ee002ae4452b23a3c70750c5c081e95334cfe9f7968fb4d67a90d4001c29d0b
   * - busybox
     - Container (utility)
     - https://hub.docker.com/_/busybox/
     - 1.36.1
   * - mps
     - Container
     - docker.io/intel/oact-mps
     - v2.14.2
   * - rps
     - Container
     - docker.io/intel/oact-rps
     - v2.26.0


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
   * - cert-manager
     - helm chart
     - https://charts.jetstack.io
     - v1.20.2
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-controller
     - v1.20.2
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-cainjector
     - v1.20.2
   * - cert-manager
     - image
     - quay.io/jetstack/cert-manager-webhook
     - v1.20.2
   * - external-secrets
     - helm chart
     - https://charts.external-secrets.io
     - 2.5.0
   * - external-secrets
     - image
     - ghcr.io/external-secrets/external-secrets
     - v2.5.0
   * - haproxy-ingress
     - image
     - haproxytech/kubernetes-ingress
     - 3.2.9
   * - istio base
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.30.0
   * - istiod
     - helm chart
     - https://istio-release.storage.googleapis.com/charts
     - 1.30.0
   * - istiod
     - image
     - registry.istio.io/release/pilot
     - 1.30.0
   * - istiod
     - image
     - docker.io/istio/proxyv2
     - 1.30.0
   * - keycloak
     - helm chart
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 26.1.7 (keycloak-instance)
   * - keycloak
     - image
     - quay.io/keycloak/keycloak
     - 26.6.0
   * - keycloak
     - image
     - quay.io/keycloak/keycloak-operator
     - 26.6.0
   * - kiali
     - helm chart
     - https://kiali.org/helm-charts
     - 2.26.0
   * - kiali
     - image
     - quay.io/kiali/kiali
     - v2.26.0
   * - kyverno
     - helm chart
     - https://kyverno.github.io/kyverno
     - 3.8.1
   * - kyverno
     - image
     - reg.kyverno.io/kyverno/kyverno
     - v1.18.1
   * - metalLB
     - helm chart
     - https://metallb.github.io/metallb
     - 0.15.2
   * - metalLB
     - image
     - quay.io/metallb/controller
     - v0.15.2
   * - postgresql-cluster
     - helm chart
     - ghcr.io/cloudnative-pg/charts/cluster
     - 0.6.1
   * - postgresql-cluster
     - image
     - ghcr.io/cloudnative-pg/postgresql
     - 17
   * - postgresql-operator
     - helm chart
     - ghcr.io/cloudnative-pg/charts/cloudnative-pg
     - 0.28.2
   * - postgresql-operator
     - image
     - ghcr.io/cloudnative-pg/cloudnative-pg
     - 1.29.1
   * - reloader
     - helm chart
     - https://stakater.github.io/stakater-charts
     - 2.2.12
   * - reloader
     - image
     - ghcr.io/stakater/reloader
     - v1.4.17
   * - traefik
     - helm chart
     - https://helm.traefik.io/traefik
     - 40.2.0
   * - traefik
     - image
     - docker.io/traefik
     - v3.7.1
   * - vault
     - helm chart
     - https://helm.releases.hashicorp.com/
     - 0.32.0
   * - vault
     - image
     - hashicorp/vault
     - 1.21.2
   * - vault
     - image
     - hashicorp/vault-k8s
     - 1.7.2


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
     - image
     - quay.io/prometheus/alertmanager
     - v0.32.1
   * - grafana
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 12.3.2
   * - grafana
     - image
     - docker.io/grafana/grafana
     - 12.3.6-security-04
   * - loki
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 14.2.0
   * - loki
     - image
     - docker.io/grafana/loki
     - 3.7.2
   * - mimir-distributed
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 6.0.6
   * - mimir-distributed
     - image
     - grafana/mimir
     - 3.0.4
   * - minio
     - Helm Chart
     - https://charts.min.io/
     - 5.4.0
   * - minio
     - image
     - quay.io/minio/minio
     - RELEASE.2025-09-07T16-13-09Z
   * - opentelemetry-collector
     - Helm Chart
     - https://open-telemetry.github.io/opentelemetry-helm-charts
     - 0.155.0
   * - opentelemetry-operator
     - Helm Chart
     - https://open-telemetry.github.io/opentelemetry-helm-charts
     - 0.113.1
   * - tempo
     - Helm Chart
     - https://grafana.github.io/helm-charts
     - 2.1.0
   * - open-policy-agent
     - Container
     - openpolicyagent/opa
     - 1.10.1-static


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
     - <TBD>
     - <TBD>
   * - openssl
     - Debian pkg
     - Source
     - https://www.openssl.org/
     - <TBD>
     - <TBD>
   * - ipmitool
     - Debian pkg
     - Source
     - https://github.com/ipmitool/ipmitool
     - <TBD>
     - <TBD>
   * - fluent-bit
     - Debian pkg
     - Source
     - https://github.com/fluent/fluent-bit
     - <TBD>
     - <TBD>
   * - otelcol-contrib
     - Debian pkg
     - Source
     - https://github.com/open-telemetry/opentelemetry-collector-contrib
     - <TBD>
     - <TBD>
   * - telegraf
     - Debian pkg
     - Source
     - https://github.com/influxdata/telegraf
     - <TBD>
     - <TBD>
   * - lms
     - Debian package
     - Source
     - https://github.com/intel/lms
     - <TBD>
     - <TBD>


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
     - alpine3.22
   * - golang
     - ContainerImage
     - https://hub.docker.com/_/golang
     - <TBD>
   * - openpolicyagent/opa
     - ContainerImage
     - https://hub.docker.com/r/openpolicyagent/opa/
     - <TBD>
   * - react
     - ContainerImage
     - https://www.npmjs.com/package/react
     - <TBD>


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
   * - confidential containers
     - Containers, scripts, dockerfiles and binaries
     - https://github.com/confidential-containers/containerd
     - <TBD>
   * - kata
     - Containers, scripts, dockerfiles and binaries
     - https://github.com/kata-containers/kata-containers
     - <TBD>
   * - Alpine Linux
     - Containers and binaries
     - https://hub.docker.com/_/alpine
     - <TBD>
   * - golang
     - Containers and binaries
     - https://hub.docker.com/_/golang
     - <TBD>
