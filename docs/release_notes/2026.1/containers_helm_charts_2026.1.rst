.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

.. _containers_helm_2026.1:

Containers and Helm\* Charts
============================

Here is a list of all the Helm Charts and Containers that make up
|software_prod_name| version 2026.1.

Helm Charts for Infrastructure Manager
--------------------------------------

.. list-table:: Infrastructure Manager Helm Charts
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - copy-ca-cert-boots-to-infra
     - copy-secret
     - orch-infra
     - 26.0.0
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - copy-ca-cert-gateway-to-infra
     - copy-secret
     - orch-infra
     - 26.0.0
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - copy-keycloak-admin-to-infra
     - copy-secret
     - orch-infra
     - 26.0.0
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - infra-core
     - infra-core
     - orch-infra
     - 2.20.7
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
   * - infra-external
     - infra-external
     - orch-infra
     - 2.14.8
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
   * - infra-managers
     - infra-managers
     - orch-infra
     - 2.18.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
   * - infra-onboarding
     - infra-onboarding
     - orch-infra
     - 1.36.5
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts


Helm Charts for User Interface
-------------------------------

.. list-table:: User Interface Helm Charts
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - metadata-broker
     - orch-metadata-broker
     - orch-ui
     - 1.0.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
   * - web-ui
     - orch-ui-root
     - orch-ui
     - 4.0.14
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
   * - web-ui-admin
     - orch-ui-admin
     - orch-ui
     - 4.0.11
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
   * - web-ui-infra
     - orch-ui-infra
     - orch-ui
     - 4.0.9
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts


Helm Charts for Platform Services
----------------------------------

.. list-table:: Platform Services – orch-gateway
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - auth-service
     - auth-service
     - orch-gateway
     - 26.1.16
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - certificate-file-server
     - certificate-file-server
     - orch-gateway
     - 26.0.5
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - copy-ca-cert-boots-to-gateway
     - copy-secret
     - orch-gateway
     - 26.0.0
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - copy-ca-cert-gateway-to-cattle
     - copy-secret
     - cattle-system
     - 26.0.0
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - keycloak-tenant-controller
     - keycloak-tenant-controller
     - orch-gateway
     - 26.1.20
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - secret-wait-tls-orch
     - secret-wait
     - orch-gateway
     - 26.0.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - traefik
     - traefik
     - orch-gateway
     - 40.2.0
     - https://helm.traefik.io/traefik
   * - traefik-extra-objects
     - traefik-extra-objects
     - orch-gateway
     - 26.1.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - traefik-pre
     - traefik-pre
     - orch-gateway
     - 3.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – istio-system
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - istio-base
     - base
     - istio-system
     - 1.30.0
     - https://istio-release.storage.googleapis.com/charts
   * - istiod
     - istiod
     - istio-system
     - 1.30.0
     - https://istio-release.storage.googleapis.com/charts
   * - istio-policy
     - istio-policy
     - istio-system
     - 26.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - kiali
     - kiali-server
     - istio-system
     - 2.26.0
     - https://kiali.org/helm-charts

.. list-table:: Platform Services – kyverno
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - kyverno
     - kyverno
     - kyverno
     - 3.8.1
     - https://kyverno.github.io/kyverno
   * - kyverno-extra-policies
     - kyverno-extra-policies
     - kyverno
     - 26.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - kyverno-istio-policy
     - kyverno-istio-policy
     - kyverno
     - 26.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - kyverno-traefik-policy
     - kyverno-traefik-policy
     - kyverno
     - 26.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – orch-boots
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - haproxy-ingress-pxe-boots
     - haproxy-ingress-pxe-boots
     - orch-boots
     - 1.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - ingress-haproxy
     - kubernetes-ingress
     - orch-boots
     - 1.52.0
     - https://haproxytech.github.io/helm-charts
   * - secret-wait-tls-boots
     - secret-wait
     - orch-boots
     - 26.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – orch-secret
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - external-secrets
     - external-secrets
     - orch-secret
     - 2.5.0
     - https://charts.external-secrets.io
   * - token-fs
     - token-fs
     - orch-secret
     - 26.1.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – orch-platform
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - component-status
     - component-status
     - orch-platform
     - 26.1.4
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - keycloak-operator
     - keycloak-operator
     - orch-platform
     - 26.1.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - platform-keycloak
     - keycloak-instance
     - orch-platform
     - 26.1.7
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - reloader
     - reloader
     - orch-platform
     - 2.2.12
     - https://stakater.github.io/stakater-charts
   * - rs-proxy
     - rs-proxy
     - orch-platform
     - 25.2.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - secrets-config
     - secrets-config
     - orch-platform
     - 26.0.3
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - vault
     - vault
     - orch-platform
     - 0.32.0
     - https://helm.releases.hashicorp.com

.. list-table:: Platform Services – orch-database
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - postgresql-cluster
     - cluster
     - orch-database
     - 0.6.1
     - ghcr.io/cloudnative-pg/charts
   * - postgresql-operator
     - cloudnative-pg
     - postgresql-operator
     - 0.28.2
     - ghcr.io/cloudnative-pg/charts
   * - postgresql-secrets
     - postgresql-secrets
     - orch-database
     - 26.0.1
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – cert-manager
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - cert-manager
     - cert-manager
     - cert-manager
     - v1.20.2
     - https://charts.jetstack.io
   * - platform-autocert
     - platform-autocert
     - cert-manager
     - 1.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - self-signed-cert
     - self-signed-cert
     - cert-manager
     - 26.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – orch-iam
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - tenancy-manager
     - tenancy-manager
     - orch-iam
     - 26.1.6
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts

.. list-table:: Platform Services – ns-label
   :header-rows: 1
   :widths: 20 20 15 15 30

   * - deployment_name
     - chart
     - namespace
     - chart_version
     - repo
   * - namespace-label
     - namespace-label
     - ns-label
     - 26.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
   * - wait-istio-job
     - job-wait
     - ns-label
     - 26.0.2
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts


Docker Containers
-----------------

.. list-table:: Infrastructure Manager Containers
   :widths: 5 30 20 50
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - apiv2
     - 2.10.9
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/apiv2:2.10.9
   * - 2
     - attestationstatusmgr
     - 0.10.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/attestationstatusmgr:0.10.4
   * - 3
     - dkammgr
     - 1.34.7
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/dkammgr:1.34.7
   * - 4
     - dm-manager
     - 0.9.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/dm-manager:0.9.4
   * - 5
     - exporter
     - 1.27.7
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/exporter:1.27.7
   * - 6
     - hostmgr
     - 1.26.6
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/hostmgr:1.26.6
   * - 7
     - inventory
     - 2.35.8
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/inventory:2.35.8
   * - 8
     - kvm-manager
     - 0.1.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/kvm-manager:0.1.2
   * - 9
     - maintmgr
     - 1.26.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/maintmgr:1.26.4
   * - 10
     - netmgr
     - 1.22.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/netmgr:1.22.4
   * - 11
     - onboardingmgr
     - 1.40.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/onboardingmgr:1.40.2
   * - 12
     - osresourcemgr
     - 0.22.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/osresourcemgr:0.22.4
   * - 13
     - sol-manager
     - 0.1.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/sol-manager:0.1.3
   * - 14
     - tenant-controller
     - 0.26.6
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/tenant-controller:0.26.6

.. list-table:: User Interface Containers
   :widths: 5 30 20 50
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - admin
     - 4.0.11
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/admin:4.0.11
   * - 2
     - infra
     - 4.0.9
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/infra:4.0.9
   * - 3
     - metadata-broker
     - 1.0.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/metadata-broker:1.0.3
   * - 4
     - root
     - 4.0.14
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/root:4.0.14

.. list-table:: Platform Services Containers
   :widths: 5 30 20 50
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - auth-service
     - 26.1.16
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/auth-service:26.1.16
   * - 2
     - component-status
     - 26.1.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/component-status:26.1.4
   * - 3
     - keycloak-tenant-controller
     - 26.1.20
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/keycloak-tenant-controller:26.1.20
   * - 4
     - secrets-config
     - 26.0.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/secrets-config:26.0.3
   * - 5
     - tenancy-manager
     - 26.1.6
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/tenancy-manager:26.1.6
   * - 6
     - token-fs
     - 26.1.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/token-fs:26.1.2

.. list-table:: Third-Party Containers (deployed in cluster)
   :widths: 5 30 20 50
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - cert-manager-controller
     - v1.20.2
     - quay.io/jetstack/cert-manager-controller:v1.20.2
   * - 2
     - cert-manager-cainjector
     - v1.20.2
     - quay.io/jetstack/cert-manager-cainjector:v1.20.2
   * - 3
     - cert-manager-webhook
     - v1.20.2
     - quay.io/jetstack/cert-manager-webhook:v1.20.2
   * - 4
     - caddy (rs-proxy / certificate-file-server)
     - 2.10.2
     - caddy:2.10.2
   * - 5
     - cloudnative-pg (postgresql operator)
     - 1.29.1
     - ghcr.io/cloudnative-pg/cloudnative-pg:1.29.1
   * - 6
     - postgresql
     - 17
     - ghcr.io/cloudnative-pg/postgresql:17
   * - 7
     - external-secrets
     - v2.5.0
     - ghcr.io/external-secrets/external-secrets:v2.5.0
   * - 8
     - haproxy kubernetes-ingress
     - 3.2.9
     - docker.io/haproxytech/kubernetes-ingress:3.2.9
   * - 9
     - istiod (pilot)
     - 1.30.0
     - registry.istio.io/release/pilot:1.30.0
   * - 10
     - keycloak
     - 26.6.0
     - quay.io/keycloak/keycloak:26.6.0
   * - 11
     - keycloak-operator
     - 26.6.0
     - quay.io/keycloak/keycloak-operator:26.6.0
   * - 12
     - kiali
     - v2.26.0
     - quay.io/kiali/kiali:v2.26.0
   * - 13
     - kyverno
     - v1.18.1
     - reg.kyverno.io/kyverno/kyverno:v1.18.1
   * - 14
     - metallb-controller
     - v0.15.2
     - quay.io/metallb/controller:v0.15.2
   * - 15
     - metallb-speaker
     - v0.15.2
     - quay.io/metallb/speaker:v0.15.2
   * - 16
     - mps (Intel AMT)
     - v2.14.2
     - docker.io/intel/oact-mps:v2.14.2
   * - 17
     - rps (Intel AMT)
     - v2.26.0
     - docker.io/intel/oact-rps:v2.26.0
   * - 18
     - nginx-unprivileged
     - alpine3.22
     - nginxinc/nginx-unprivileged:alpine3.22
   * - 19
     - open-policy-agent
     - 1.10.1-static
     - openpolicyagent/opa:1.10.1-static
   * - 20
     - openebs localpv-provisioner
     - 4.3.0
     - openebs/provisioner-localpv:4.3.0
   * - 21
     - reloader
     - v1.4.17
     - ghcr.io/stakater/reloader:v1.4.17
   * - 22
     - tinkerbell hegel
     - v0.12.0
     - quay.io/tinkerbell/hegel:v0.12.0
   * - 23
     - tinkerbell tink-controller
     - v0.10.0
     - quay.io/tinkerbell/tink-controller:v0.10.0
   * - 24
     - tinkerbell tink-server
     - v0.10.0
     - quay.io/tinkerbell/tink:v0.10.0
   * - 25
     - traefik
     - v3.7.1
     - docker.io/traefik:v3.7.1
   * - 26
     - vault
     - 1.21.3
     - hashicorp/vault:1.21.3
   * - 27
     - vault-k8s (agent injector)
     - 1.7.2
     - hashicorp/vault-k8s:1.7.2
