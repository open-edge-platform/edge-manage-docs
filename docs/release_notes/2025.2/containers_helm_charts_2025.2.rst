Containers and Helm\* Charts
============================

Here is a list of all the Helm Charts and Containers that
make up |software_prod_name| version 2025.2.

Helm Charts for Observability (O11y)
------------------------------------

.. list-table:: Observability (O11y) Components
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - alerting-monitor
     - alerting-monitor
     - orch-infra
     - "1900"
     - alerting-monitor
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 1.7.4
   * - 2
     - edgenode-dashboards
     - edgenode-dashboards
     - orch-infra
     - "1000"
     - edgenode-dashboards
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.3.8
   * - 3
     - edgenode-observability
     - edgenode-observability
     - orch-infra
     - "1000"
     - edgenode-observability
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.10.15
   * - 4
     - observability-tenant-controller
     - observability-tenant-controller
     - orch-platform
     - "2005"
     - observability-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.7.0
   * - 5
     - orchestrator-dashboards
     - orchestrator-dashboards
     - orch-platform
     - "1000"
     - orchestrator-dashboards
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.3.2
   * - 6
     - orchestrator-observability
     - orchestrator-observability
     - orch-platform
     - "1000"
     - orchestrator-observability
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.5.15
   * - 7
     - sre-exporter
     - sre-exporter
     - orch-sre
     - "2000"
     - sre-exporter
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.9.2

Helm Charts for Infrastructure Manager
--------------------------------------

.. list-table:: Infrastructure Manager Components
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - copy-ca-cert-boots-to-infra
     - copy-secret
     - orch-infra
     - "1400"
     - copy-ca-cert-boots-to-infra
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 2
     - copy-ca-cert-gateway-to-infra
     - copy-secret
     - orch-infra
     - "180"
     - copy-ca-cert-gateway-to-infra
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 3
     - copy-keycloak-admin-to-infra
     - copy-secret
     - orch-infra
     - "180"
     - copy-keycloak-admin-to-infra
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 4
     - infra-core
     - infra-core
     - orch-infra
     - "2000"
     - infra-core
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.18.5
   * - 5
     - infra-external
     - infra-external
     - orch-infra
     - "2100"
     - infra-external
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.11.2
   * - 6
     - infra-managers
     - infra-managers
     - orch-infra
     - "2100"
     - infra-managers
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.16.6
   * - 7
     - infra-onboarding
     - infra-onboarding
     - orch-infra
     - "2100"
     - infra-onboarding
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 1.34.0

Helm Charts for Application Orchestration
------------------------------------------

.. list-table:: Application Orchestration Components
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - app-deployment-crd
     - app-deployment-crd
     - orch-app
     - "2000"
     - app-deployment-crd
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 2.5.9
   * - 2
     - app-deployment-manager
     - app-deployment-manager
     - orch-app
     - "2100"
     - app-deployment-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 2.5.9
   * - 3
     - app-interconnect-manager
     - app-interconnect-manager
     - orch-app
     - "2210"
     - app-interconnect-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.3.2
   * - 4
     - app-orch-catalog
     - app-orch-catalog
     - orch-app
     - "1101"
     - app-orch-catalog
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.15.7
   * - 5
     - app-orch-tenant-controller
     - app-orch-tenant-controller
     - orch-app
     - "1100"
     - app-orch-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.4.4
   * - 6
     - app-resource-manager
     - app-resource-manager
     - orch-app
     - "2100"
     - app-resource-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 2.5.4
   * - 7
     - app-service-proxy
     - app-service-proxy
     - orch-app
     - "2100"
     - app-service-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 1.5.4
   * - 8
     - copy-ca-cert-gitea-to-app
     - copy-secret
     - orch-app
     - "180"
     - copy-ca-cert-gitea-to-app
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1

.. list-table:: Application Orchestration Components for namespace: fleet-default
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - copy-app-gitea-cred-to-fleet
     - copy-secret
     - fleet-default
     - "1200"
     - copy-app-gitea-cred-to-fleet
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 2
     - copy-cluster-gitea-cred-to-fleet
     - copy-secret
     - fleet-default
     - "1200"
     - copy-cluster-gitea-cred-to-fleet
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 3
     - fleet-rs-secret
     - fleet-rs-secret
     - fleet-default
     - "1200"
     - fleet-rs-secret
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1

.. list-table:: Application Orchestration Components for namespace: cattle-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - copy-ca-cert-gateway-to-cattle
     - copy-secret
     - cattle-system
     - "180"
     - copy-ca-cert-gateway-to-cattle
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1

.. list-table:: Application Orchestration Components for namespace: cattle-fleet-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - fleet-controller
     - fleet
     - cattle-fleet-system
     - "1020"
     - fleet-controller
     - https://rancher.github.io/fleet-helm-charts/
     - 0.12.8
   * - 2
     - fleet-crd
     - fleet-crd
     - cattle-fleet-system
     - "1010"
     - fleet-crd
     - https://rancher.github.io/fleet-helm-charts/
     - 0.12.8

Helm Charts for Cluster Orchestrator
-------------------------------------

.. list-table:: Cluster Orchestrator components for namespace: orch-cluster
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - cluster-connect-gateway
     - cluster-connect-gateway
     - orch-cluster
     - "2000"
     - cluster-connect-gateway
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.2.5
   * - 2
     - cluster-connect-gateway
     - cluster-connect-gateway-crd
     - orch-cluster
     - "2000"
     - cluster-connect-gateway-cluster-connect-gateway-crd
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.2.5
   * - 3
     - cluster-manager
     - cluster-manager
     - orch-cluster
     - "2000"
     - cluster-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 2.2.6
   * - 4
     - cluster-manager
     - cluster-template-crd
     - orch-cluster
     - "2000"
     - cluster-manager-cluster-template-crd
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 2.2.6
   * - 5
     - copy-ca-cert-gitea-to-cluster
     - copy-secret
     - orch-cluster
     - "180"
     - copy-ca-cert-gitea-to-cluster
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 6
     - copy-rs-token-to-cluster
     - copy-secret
     - orch-cluster
     - "1400"
     - copy-rs-token-to-cluster
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 7
     - intel-infra-provider
     - intel-infra-provider
     - orch-cluster
     - "2100"
     - intel-infra-provider
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.3.4
   * - 8
     - intel-infra-provider
     - intel-infra-provider-crds
     - orch-cluster
     - "2100"
     - intel-infra-provider-intel-infra-provider-crds
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.3.4

.. list-table:: Cluster Orchestrator components for namespace: capi-operator-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - capi-operator
     - cluster-api-operator
     - capi-operator-system
     - "1000"
     - capi-operator
     - https://kubernetes-sigs.github.io/cluster-api-operator
     - 0.23.0
   * - 2
     - capi-providers-config
     - capi-providers-config
     - capi-operator-system
     - "1100"
     - capi-providers-config
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.2

.. list-table:: Cluster Orchestrator components for namespace: capi-variables
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - capi-operator-pre
     - capi-operator-pre
     - capi-variables
     - "990"
     - capi-operator-pre
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1

Helm Charts for User Interface components
-----------------------------------------

.. list-table:: User Interface components
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - metadata-broker
     - orch-metadata-broker
     - orch-ui
     - "2000"
     - metadata-broker
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 0.4.14
   * - 2
     - web-ui-admin
     - orch-ui-admin
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 3.2.4
   * - 3
     - web-ui-app-orch
     - orch-ui-app-orch
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 3.2.5
   * - 4
     - web-ui-cluster-orch
     - orch-ui-cluster-orch
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 3.2.4
   * - 5
     - web-ui-infra
     - orch-ui-infra
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 3.2.18
   * - 6
     - web-ui-root
     - orch-ui-root
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 3.2.11

Helm Charts for Platform services components
------------------------------------------------

.. list-table:: Platform services components for namespace: orch-gateway
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - auth-service
     - auth-service
     - orch-gateway
     - "2005"
     - auth-service
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 2
     - botkube
     - botkube
     - orch-gateway
     - "1200"
     - botkube
     - "https://charts.botkube.io/"
     - 1.11.0
   * - 3
     - cert-synchronizer
     - cert-synchronizer
     - orch-gateway
     - "160"
     - cert-synchronizer
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.11
   * - 4
     - certificate-file-server
     - certificate-file-server
     - orch-gateway
     - "3000"
     - certificate-file-server
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 5
     - copy-ca-cert-boots-to-gateway
     - copy-secret
     - orch-gateway
     - "1400"
     - copy-ca-cert-boots-to-gateway
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 6
     - keycloak-tenant-controller
     - keycloak-tenant-controller
     - orch-gateway
     - "1250"
     - keycloak-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.5
   * - 7
     - secret-wait-tls-orch
     - secret-wait
     - orch-gateway
     - "170"
     - secret-wait-tls-orch
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 8
     - traefik
     - traefik
     - orch-gateway
     - "1100"
     - traefik
     - https://helm.traefik.io/traefik
     - 37.2.0
   * - 9
     - traefik-extra-objects
     - traefik-extra-objects
     - orch-gateway
     - "1200"
     - traefik-extra-objects
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 10
     - traefik-pre
     - traefik-pre
     - orch-gateway
     - "1000"
     - traefik-pre
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 3.0.1

.. list-table:: Platform services components for namespace: kube-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - aws-lb
     - aws-load-balancer-controller
     - kube-system
     - "110"
     - aws-lb
     - https://aws.github.io/eks-charts
     - 1.7.1
   * - 2
     - aws-lb-tgb
     - aws-lb-tgb
     - kube-system
     - "120"
     - aws-lb-tgb
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 3
     - cluster-autoscaler
     - cluster-autoscaler
     - kube-system
     - "90"
     - cluster-autoscaler
     - https://kubernetes.github.io/autoscaler
     - "9.37.0"
   * - 4
     - k8s-metrics-server
     - k8s-metrics-server
     - kube-system
     - "100"
     - k8s-metrics-server
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 5
     - vertical-pod-autoscaler
     - vertical-pod-autoscaler
     - kube-system
     - "110"
     - vertical-pod-autoscaler
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.0.4

.. list-table:: Platform services components for namespace: istio-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - istio-base
     - base
     - istio-system
     - "100"
     - istio-base
     - https://istio.io/latest/docs/setup/install/helm/
     - 1.28.0
   * - 2
     - istio-policy
     - istio-policy
     - istio-system
     - "150"
     - istio-policy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 2.0.7
   * - 3
     - istiod
     - istiod
     - istio-system
     - "110"
     - istiod
     - https://istio-release.storage.googleapis.com/charts
     - 1.28.0
   * - 4
     - kiali
     - kiali-server
     - istio-system
     - "150"
     - kiali
     - https://kiali.org/helm-charts
     - 2.18.0

.. list-table:: Platform services components for namespace: orch-harbor
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - harbor-oci
     - harbor
     - orch-harbor
     - "1000"
     - harbor-oci
     - https://helm.goharbor.io
     - 1.17.2

.. list-table:: Platform services components for namespace: kyverno
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - kyverno
     - kyverno
     - kyverno
     - "100"
     - kyverno
     - https://kyverno.github.io/kyverno
     - 3.5.1
   * - 2
     - kyverno-extra-policies
     - kyverno-extra-policies
     - kyverno
     - "105"
     - kyverno-extra-policies
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 3.0.3
   * - 3
     - kyverno-istio-policy
     - kyverno-istio-policy
     - kyverno
     - "1100"
     - kyverno-istio-policy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 4
     - kyverno-traefik-policy
     - kyverno-traefik-policy
     - kyverno
     - "1100"
     - kyverno-traefik-policy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1

.. list-table:: Platform services components for namespace: orch-boots
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - ingress-nginx
     - ingress-nginx
     - orch-boots
     - "1100"
     - ingress-nginx
     - https://kubernetes.github.io/ingress-nginx
     - 4.13.3
   * - 2
     - nginx-ingress-pxe-boots
     - nginx-ingress-pxe-boots
     - orch-boots
     - "1200"
     - nginx-ingress-pxe-boots
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 3
     - secret-wait-tls-boots
     - secret-wait
     - orch-boots
     - "1300"
     - secret-wait-tls-boots
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 4
     - traefik-boots
     - traefik
     - orch-boots
     - "1100"
     - traefik-boots
     - https://helm.traefik.io/traefik
     - 37.2.0

.. list-table:: Platform services components for namespace: orch-secret
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - aws-sm-get-rs-token
     - aws-sm-get-rs-token
     - orch-secret
     - "110"
     - aws-sm-get-rs-token
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 2
     - aws-sm-proxy
     - aws-sm-proxy
     - orch-secret
     - "105"
     - aws-sm-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 3
     - external-secrets
     - external-secrets
     - orch-secret
     - "100"
     - external-secrets
     - https://charts.external-secrets.io
     - 0.20.4
   * - 4
     - secret-wait-azure-ad-creds
     - secret-wait
     - orch-secret
     - "105"
     - secret-wait-azure-ad-creds
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 5
     - secret-wait-rs-token
     - secret-wait
     - orch-secret
     - "115"
     - secret-wait-rs-token
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 6
     - token-fs
     - token-fs
     - orch-secret
     - "1300"
     - token-fs
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 7
     - token-refresh
     - token-refresh
     - orch-secret
     - "110"
     - token-refresh
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3

.. list-table:: Platform services components for namespace: orch-platform
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - app-deployment-manager-secret
     - adm-secret
     - orch-platform
     - "2000"
     - app-deployment-manager-secret
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.2
   * - 2
     - orchestrator-prometheus-agent
     - kube-prometheus-stack
     - orch-platform
     - "1000"
     - orchestrator-prometheus-agent
     - https://prometheus-community.github.io/helm-charts
     - 79.7.1
   * - 3
     - platform-keycloak
     - keycloak
     - orch-platform
     - "150"
     - platform-keycloak
     - "registry-1.docker.io/bitnamicharts"
     - 24.4.12
   * - 4
     - prometheus-crd
     - prometheus-operator-crds
     - orch-platform
     - "100"
     - prometheus-crd
     - https://prometheus-community.github.io/helm-charts
     - 24.0.1
   * - 5
     - reloader
     - reloader
     - orch-platform
     - "110"
     - reloader
     - https://stakater.github.io/stakater-charts
     - 2.2.3
   * - 6
     - rs-image-pull-secrets
     - rs-image-pull-secrets
     - orch-platform
     - "150"
     - rs-image-pull-secrets
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.2
   * - 7
     - rs-proxy
     - rs-proxy
     - orch-platform
     - "170"
     - rs-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 8
     - secrets-config
     - secrets-config
     - orch-platform
     - "160"
     - secrets-config
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 3.0.6
   * - 9
     - squid-proxy
     - squid-proxy
     - orch-platform
     - "1200"
     - squid-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1
   * - 10
     - vault
     - vault
     - orch-platform
     - "160"
     - vault
     - https://helm.releases.hashicorp.com
     - 0.31.0

.. list-table:: Platform services components for namespace: metallb-system
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - metallb
     - metallb
     - metallb-system
     - "100"
     - metallb
     - https://metallb.github.io/metallb
     - 0.15.2
   * - 2
     - metallb-config
     - metallb-config
     - metallb-system
     - "150"
     - metallb-config
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1

.. list-table:: Platform services components for namespace: ns-label
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - namespace-label
     - namespace-label
     - ns-label
     - "90"
     - namespace-label
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3
   * - 2
     - wait-istio-job
     - job-wait
     - ns-label
     - "110"
     - wait-istio-job
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.3

.. list-table:: Platform services components for namespace: orch-iam
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - nexus-api-gw
     - nexus-api-gw
     - orch-iam
     - "1200"
     - nexus-api-gw
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.4
   * - 2
     - tenancy-api-mapping
     - tenancy-api-mapping
     - orch-iam
     - "1200"
     - tenancy-api-mapping
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.11
   * - 3
     - tenancy-datamodel
     - tenancy-datamodel
     - orch-iam
     - "1200"
     - tenancy-datamodel
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.2
   * - 4
     - tenancy-init
     - tenancy-init
     - orch-iam
     - "3000"
     - tenancy-init
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.7
   * - 5
     - tenancy-manager
     - tenancy-manager
     - orch-iam
     - "1200"
     - tenancy-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.5

.. list-table:: Platform services components for namespace: argocd
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - oci-secret
     - oci-secret
     - argocd
     - "120"
     - oci-secret
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.1

.. list-table:: Platform services components for namespace: orch-database
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - postgresql-cluster
     - cluster
     - orch-database
     - "140"
     - postgresql-cluster
     - "ghcr.io/cloudnative-pg/charts"
     - 0.3.1
   * - 2
     - postgresql-operator
     - cloudnative-pg
     - postgresql-operator
     - "1"
     - postgresql-operator
     - "ghcr.io/cloudnative-pg/charts"
     - 0.26.0
   * - 3
     - postgresql-secrets
     - postgresql-secrets
     - orch-database
     - "130"
     - postgresql-secrets
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 25.2.4

.. list-table:: Platform services Components for namespace: cert-manager
   :header-rows: 1
   :widths: 5 20 20 15 15 20 30 10

   * - #
     - deployment_name
     - chart
     - namespace
     - order (Argo Sync wave)
     - release_name
     - repo
     - version
   * - 1
     - cert-manager
     - cert-manager
     - cert-manager
     - "100"
     - cert-manager
     - https://charts.jetstack.io
     - 1.17.4
   * - 2
     - platform-autocert
     - platform-autocert
     - cert-manager
     - "150"
     - platform-autocert
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.2
   * - 3
     - self-signed-cert
     - self-signed-cert
     - cert-manager
     - "160"
     - self-signed-cert
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 4.0.11


Docker Containers
-----------------

.. list-table:: Application Orchestration Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - adm-controller
     - 2.5.9
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/adm-controller:2.5.9
   * - 2
     - adm-gateway
     - 2.5.9
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/adm-gateway:2.5.9
   * - 3
     - app-interconnect-manager
     - 0.3.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-interconnect-manager:0.3.2
   * - 4
     - app-orch-catalog
     - 0.15.7
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-orch-catalog:0.15.7
   * - 5
     - app-orch-tenant-controller
     - 0.4.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-orch-tenant-controller:0.4.4
   * - 6
     - app-resource-manager
     - 2.5.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-manager:2.5.4
   * - 7
     - app-resource-rest-proxy
     - 2.5.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-rest-proxy:2.5.4
   * - 8
     - app-resource-vnc-proxy
     - 2.5.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-vnc-proxy:2.5.4
   * - 9
     - app-service-proxy
     - 1.5.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-service-proxy:1.5.4

.. list-table:: Cluster Orchestration Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - capi-provider-intel-manager
     - 1.3.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/capi-provider-intel-manager:1.3.4
   * - 2
     - capi-provider-intel-southbound
     - 1.3.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/capi-provider-intel-southbound:1.3.4
   * - 3
     - cluster-manager
     - 2.2.6
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/cluster-manager:2.2.6
   * - 4
     - connect-controller
     - 1.2.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/connect-controller:1.2.5
   * - 5
     - connect-gateway
     - 1.2.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/connect-gateway:1.2.5
   * - 6
     - template-controller
     - 2.2.6
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/template-controller:2.2.6

.. list-table:: Infrastructure Manager Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - api
     - 1.36.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/api:1.36.0
   * - 2
     - apiv2
     - 2.8.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/apiv2:2.8.2
   * - 3
     - attestationstatusmgr
     - 0.8.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/attestationstatusmgr:0.8.1
   * - 4
     - dkammgr
     - 1.32.9
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/dkammgr:1.32.9
   * - 5
     - dm-manager
     - 0.7.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/dm-manager:0.7.5
   * - 6
     - exporter
     - 1.23.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/exporter:1.23.0
   * - 7
     - hostmgr
     - 1.24.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/hostmgr:1.24.1
   * - 8
     - inventory
     - 2.33.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/inventory:2.33.4
   * - 9
     - loca-templates-manager
     - 1.6.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/loca-templates-manager:1.6.2
   * - 10
     - locametamgr
     - 1.5.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/locametamgr:1.5.2
   * - 11
     - locamgr
     - 2.21.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/locamgr:2.21.2
   * - 12
     - maintmgr
     - 1.24.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/maintmgr:1.24.2
   * - 13
     - netmgr
     - 1.20.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/netmgr:1.20.0
   * - 14
     - onboardingmgr
     - 1.38.15
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/onboardingmgr:1.38.15
   * - 15
     - osresourcemgr
     - 0.20.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/osresourcemgr:0.20.5
   * - 16
     - telemetrymgr
     - 1.24.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/telemetrymgr:1.24.1
   * - 17
     - tenant-controller
     - 0.24.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/tenant-controller:0.24.2

.. list-table:: Observability Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - alerting-monitor-management
     - 1.7.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/alerting-monitor-management:1.7.4
   * - 2
     - alerting-monitor
     - 1.7.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/alerting-monitor:1.7.4
   * - 3
     - grafana-proxy
     - 0.5.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/grafana-proxy:0.5.1
   * - 4
     - observability-tenant-controller
     - 0.7.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/observability-tenant-controller:0.7.0
   * - 5
     - orch-otelcol
     - 0.2.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/orch-otelcol:0.2.2
   * - 6
     - sre-config-reloader
     - 0.9.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/sre-config-reloader:0.9.2
   * - 7
     - sre-metrics-exporter
     - 0.9.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/sre-metrics-exporter:0.9.2

.. list-table:: User Interface Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - admin
     - 3.2.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/admin:3.2.4
   * - 2
     - app-orch
     - 3.2.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/app-orch:3.2.5
   * - 3
     - cluster-orch
     - 3.2.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/cluster-orch:3.2.4
   * - 4
     - infra
     - 3.2.18
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/infra:3.2.18
   * - 5
     - metadata-broker
     - 0.4.14
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/metadata-broker:0.4.14
   * - 6
     - root
     - 3.2.11
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/root:3.2.11

.. list-table:: Platform services Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - auth-service
     - 25.2.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/auth-service:25.2.3
   * - 2
     - aws-sm-proxy
     - 25.2.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/aws-sm-proxy:25.2.3
   * - 3
     - cert-synchronizer
     - 25.2.11
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/cert-synchronizer:25.2.11
   * - 4
     - nexus-api-gw
     - 25.2.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/nexus-api-gw:25.2.3
   * - 5
     - orchestrator-installer-cloudfull
     - v2025.2.0-dev-5d077132
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/orchestrator-installer-cloudfull:v2025.2.0-dev-5d077132
   * - 6
     - tenancy-init
     - 25.2.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/tenancy-init:25.2.1
   * - 7
     - token-fs
     - 25.2.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/token-fs:25.2.0
   * - 8
     - metrics-server
     - v0.8.0
     - registry.k8s.io/metrics-server/metrics-server:v0.8.0

.. list-table:: Shared containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - curl
     - latest
     - alpine/curl
   * - 2
     - kubectl
     - 1.34.1
     - alpine/kubectl:1.34.1
   * - 3
     - curl-jq
     - sha256:8ee002ae4452b
     - badouralix/curl-jq@sha256:8ee002ae4452b23a3c70750c5c081e95334cfe9f7968fb4d67a90d4001c29d0b
   * - 4
     - busybox
     - latest
     - busybox
   * - 5
     - busybox
     - 1.36.0
     - busybox:1.36.0
   * - 6
     - busybox
     - 1.36.1
     - busybox:1.36.1
   * - 7
     - caddy
     - 2.10.2
     - caddy:2.10.2
   * - 8
     - bats
     - v1.11.1
     - docker.io/bats/bats:v1.11.1
   * - 9
     - grafana
     - 12.2.1
     - docker.io/grafana/grafana:12.2.1
   * - 10
     - loki
     - 3.5.7
     - docker.io/grafana/loki:3.5.7
   * - 11
     - oact-mps
     - v2.14.2
     - docker.io/intel/oact-mps:v2.14.2
   * - 12
     - oact-rps
     - v2.26.0
     - docker.io/intel/oact-rps:v2.26.0
   * - 13
     - k8s-sidecar
     - 1.30.10
     - docker.io/kiwigrid/k8s-sidecar:1.30.10
   * - 14
     - nginx-unprivileged
     - 1.29-alpine
     - docker.io/nginxinc/nginx-unprivileged:1.29-alpine
   * - 15
     - mimir
     - 3.0.0
     - grafana/mimir:3.0.0
   * - 16
     - memcached
     - 1.6.39-alpine
     - memcached:1.6.39-alpine
   * - 17
     - migrate
     - latest
     - migrate/migrate
   * - 18
     - nginx-unprivileged
     - alpine3.22
     - nginxinc/nginx-unprivileged:alpine3.22
   * - 19
     - opa
     - 1.10.1-static
     - openpolicyagent/opa:1.10.1-static
   * - 20
     - opa
     - 1.10.1-static
     - openpolicyagent/opa:1.10.1-static
   * - 21
     - opentelemetry-collector-contrib
     - 0.111.0
     - otel/opentelemetry-collector-contrib:0.111.0
   * - 22
     - opentelemetry-collector-contrib
     - 0.136.0
     - otel/opentelemetry-collector-contrib:0.136.0
   * - 23
     - kubectl-shell
     - latest
     - portainer/kubectl-shell
   * - 24
     - postgres
     - 16.10-bookworm
     - postgres:16.10-bookworm
   * - 25
     - memcached-exporter
     - v0.15.3
     - prom/memcached-exporter:v0.15.3
   * - 26
     - k8s-sidecar
     - 1.30.10
     - quay.io/kiwigrid/k8s-sidecar:1.30.10
   * - 27
     - prometheus-config-reloader
     - v0.86.2
     - quay.io/prometheus-operator/prometheus-config-reloader:v0.86.2
   * - 28
     - alertmanager
     - v0.29.0
     - quay.io/prometheus/alertmanager:v0.29.0
   * - 29
     - tink-controller
     - v0.10.0
     - quay.io/tinkerbell/tink-controller:v0.10.0
   * - 30
     - tink
     - v0.10.0
     - quay.io/tinkerbell/tink:v0.10.0

