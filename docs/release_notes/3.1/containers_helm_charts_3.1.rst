Containers and Helm\* Charts
============================

TODO UPDATE after latest build is generated (mage gen:releaseImageManifest)

Here is a list of all the Helm Charts and Containers that
make up |software_prod_name| version 3.1.

Helm Charts for Observability (O11y)
-------------------------------------

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
     - 1.7.0
   * - 2
     - edgenode-dashboards
     - edgenode-dashboards
     - orch-infra
     - "1000"
     - edgenode-dashboards
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.3.5
   * - 3
     - edgenode-observability
     - edgenode-observability
     - orch-infra
     - "1000"
     - edgenode-observability
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.10.0
   * - 4
     - observability-tenant-controller
     - observability-tenant-controller
     - orch-platform
     - "2005"
     - observability-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.6.0
   * - 5
     - orchestrator-dashboards
     - orchestrator-dashboards
     - orch-platform
     - "1000"
     - orchestrator-dashboards
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.3.1
   * - 6
     - orchestrator-observability
     - orchestrator-observability
     - orch-platform
     - "1000"
     - orchestrator-observability
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.5.1
   * - 7
     - sre-exporter
     - sre-exporter
     - orch-sre
     - "2000"
     - sre-exporter
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.9.0

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
     - 1.0.1
   * - 2
     - copy-ca-cert-gateway-to-infra
     - copy-secret
     - orch-infra
     - "180"
     - copy-ca-cert-gateway-to-infra
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 3
     - copy-keycloak-admin-to-infra
     - copy-secret
     - orch-infra
     - "180"
     - copy-keycloak-admin-to-infra
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 4
     - infra-core
     - infra-core
     - orch-infra
     - "2000"
     - infra-core
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.8.2
   * - 5
     - infra-external
     - infra-external
     - orch-infra
     - "2100"
     - infra-external
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.1.3
   * - 6
     - infra-managers
     - infra-managers
     - orch-infra
     - "2100"
     - infra-managers
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 2.12.4
   * - 7
     - infra-onboarding
     - infra-onboarding
     - orch-infra
     - "2100"
     - infra-onboarding
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/infra/charts
     - 1.29.7

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
     - 2.3.44
   * - 2
     - app-deployment-manager
     - app-deployment-manager
     - orch-app
     - "2100"
     - app-deployment-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 2.3.44
   * - 3
     - app-interconnect-manager
     - app-interconnect-manager
     - orch-app
     - "2210"
     - app-interconnect-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.1.18
   * - 4
     - app-orch-catalog
     - app-orch-catalog
     - orch-app
     - "1101"
     - app-orch-catalog
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.11.33
   * - 5
     - app-orch-tenant-controller
     - app-orch-tenant-controller
     - orch-app
     - "1100"
     - app-orch-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 0.2.13
   * - 6
     - app-resource-manager
     - app-resource-manager
     - orch-app
     - "2100"
     - app-resource-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 2.3.27
   * - 7
     - app-service-proxy
     - app-service-proxy
     - orch-app
     - "2100"
     - app-service-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/app/charts
     - 1.3.23
   * - 8
     - copy-ca-cert-gitea-to-app
     - copy-secret
     - orch-app
     - "180"
     - copy-ca-cert-gitea-to-app
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1

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
     - 1.0.1
   * - 2
     - copy-cluster-gitea-cred-to-fleet
     - copy-secret
     - fleet-default
     - "1200"
     - copy-cluster-gitea-cred-to-fleet
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 3
     - fleet-rs-secret
     - fleet-rs-secret
     - fleet-default
     - "1200"
     - fleet-rs-secret
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 2.0.4

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
     - 1.0.1

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
     - 0.10.4
   * - 2
     - fleet-crd
     - fleet-crd
     - cattle-fleet-system
     - "1010"
     - fleet-crd
     - https://rancher.github.io/fleet-helm-charts/
     - 0.10.4

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
     - 1.0.5
   * - 2
     - cluster-connect-gateway-cluster-connect-gateway-crd
     - cluster-connect-gateway-crd
     - orch-cluster
     - "2000"
     - cluster-connect-gateway-cluster-connect-gateway-crd
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.0.5
   * - 3
     - cluster-manager
     - cluster-manager
     - orch-cluster
     - "2000"
     - cluster-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 2.0.7
   * - 4
     - cluster-manager-cluster-template-crd
     - cluster-template-crd
     - orch-cluster
     - "2000"
     - cluster-manager-cluster-template-crd
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 2.0.7
   * - 5
     - copy-ca-cert-gitea-to-cluster
     - copy-secret
     - orch-cluster
     - "180"
     - copy-ca-cert-gitea-to-cluster
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 6
     - copy-rs-token-to-cluster
     - copy-secret
     - orch-cluster
     - "1400"
     - copy-rs-token-to-cluster
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 7
     - intel-infra-provider
     - intel-infra-provider
     - orch-cluster
     - "2100"
     - intel-infra-provider
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.0.5
   * - 8
     - intel-infra-provider-intel-infra-provider-crds
     - intel-infra-provider-crds
     - orch-cluster
     - "2100"
     - intel-infra-provider-intel-infra-provider-crds
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/cluster/charts
     - 1.0.5

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
     - 0.15.1

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
------------------------------------------------

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
     - 0.4.11
   * - 2
     - web-ui-admin
     - orch-ui-admin
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 2.0.10
   * - 3
     - web-ui-app-orch
     - orch-ui-app-orch
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 2.0.16
   * - 4
     - web-ui-cluster-orch
     - orch-ui-cluster-orch
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 2.0.15
   * - 5
     - web-ui-infra
     - orch-ui-infra
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 1.0.10
   * - 6
     - web-ui-root
     - orch-ui-root
     - orch-ui
     - "3000"
     - web-ui
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/charts
     - 2.0.10

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
     - 1.0.2
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
     - 1.0.3
   * - 4
     - certificate-file-server
     - certificate-file-server
     - orch-gateway
     - "3000"
     - certificate-file-server
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 5
     - keycloak-tenant-controller
     - keycloak-tenant-controller
     - orch-gateway
     - "1250"
     - keycloak-tenant-controller
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.11
   * - 6
     - secret-wait-tls-orch
     - secret-wait
     - orch-gateway
     - "170"
     - secret-wait-tls-orch
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.2.2
   * - 7
     - traefik
     - traefik
     - orch-gateway
     - "1100"
     - traefik
     - https://helm.traefik.io/traefik
     - 25.0.0
   * - 8
     - traefik-extra-objects
     - traefik-extra-objects
     - orch-gateway
     - "1200"
     - traefik-extra-objects
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 4.1.9
   * - 9
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
     - 0.1.1
   * - 5
     - vertical-pod-autoscaler
     - vertical-pod-autoscaler
     - kube-system
     - "110"
     - vertical-pod-autoscaler
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.0.3

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
     - 0.3.1
   * - 2
     - aws-sm-proxy
     - aws-sm-proxy
     - orch-secret
     - "105"
     - aws-sm-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.4.2
   * - 3
     - external-secrets
     - external-secrets
     - orch-secret
     - "100"
     - external-secrets
     - https://charts.external-secrets.io
     - 0.9.11
   * - 4
     - token-fs
     - token-fs
     - orch-secret
     - "1300"
     - token-fs
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.2.2
   * - 5
     - token-refresh
     - token-refresh
     - orch-secret
     - "110"
     - token-refresh
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.4.3
   * - 6
     - secret-wait-azure-ad-creds
     - secret-wait
     - orch-secret
     - "105"
     - secret-wait-azure-ad-creds
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.2.2
   * - 7
     - secret-wait-rs-token
     - secret-wait
     - orch-secret
     - "115"
     - secret-wait-rs-token
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.2.2


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
     - 1.0.2
   * - 2
     - platform-keycloak
     - keycloak
     - orch-platform
     - "150"
     - platform-keycloak
     - "registry-1.docker.io/bitnamicharts"
     - 24.4.12
   * - 3
     - prometheus-crd
     - prometheus-operator-crds
     - orch-platform
     - "100"
     - prometheus-crd
     - https://prometheus-community.github.io/helm-charts
     - 18.0.0
   * - 4
     - reloader
     - reloader
     - orch-platform
     - "110"
     - reloader
     - https://stakater.github.io/stakater-charts
     - 1.0.54
   * - 5
     - rs-image-pull-secrets
     - rs-image-pull-secrets
     - orch-platform
     - "150"
     - rs-image-pull-secrets
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1
   * - 6
     - rs-proxy
     - rs-proxy
     - orch-platform
     - "170"
     - rs-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.1.6
   * - 7
     - secrets-config
     - secrets-config
     - orch-platform
     - "160"
     - secrets-config
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 3.0.3
   * - 8
     - squid-proxy
     - squid-proxy
     - orch-platform
     - "1200"
     - squid-proxy
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.2.3
   * - 9
     - vault
     - vault
     - orch-platform
     - "160"
     - vault
     - https://helm.releases.hashicorp.com
     - 0.28.1

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
     - 0.14.3
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
     - 0.2.4
   * - 2
     - wait-istio-job
     - job-wait
     - ns-label
     - "110"
     - wait-istio-job
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.1.2

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
     - 0.1.12
   * - 2
     - tenancy-api-mapping
     - tenancy-api-mapping
     - orch-iam
     - "1200"
     - tenancy-api-mapping
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.4.1
   * - 3
     - tenancy-datamodel
     - tenancy-datamodel
     - orch-iam
     - "1200"
     - tenancy-datamodel
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.2.1
   * - 4
     - tenancy-manager
     - tenancy-manager
     - orch-iam
     - "1200"
     - tenancy-manager
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 0.1.7

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
     - 2.0.3

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
     - postgresql
     - postgresql
     - orch-database
     - "140"
     - postgresql
     - https://charts.bitnami.com/bitnami
     - 15.5.26
   * - 2
     - postgresql-secrets
     - postgresql-secrets
     - orch-database
     - "130"
     - postgresql-secrets
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/common/charts
     - 1.0.1

.. list-table:: Platform services components for namespace: orch-sre
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
     - sre-exporter
     - sre-exporter
     - orch-sre
     - "2000"
     - sre-exporter
     - oci://registry-rs.edgeorchestration.intel.com/edge-orch/o11y/charts
     - 0.9.0

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
     - 2.3.44
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/adm-controller:2.3.44
   * - 2
     - adm-gateway
     - 2.3.44
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/adm-gateway:2.3.44
   * - 3
     - app-interconnect-manager
     - 0.1.18
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-interconnect-manager:0.1.18
   * - 4
     - app-orch-catalog
     - 0.11.33
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-orch-catalog:0.11.33
   * - 5
     - app-orch-tenant-controller
     - 0.2.13
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-orch-tenant-controller:0.2.13
   * - 6
     - app-resource-manager
     - 2.3.27
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-manager:2.3.27
   * - 7
     - app-resource-rest-proxy
     - 2.3.27
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-rest-proxy:2.3.27
   * - 8
     - app-resource-vnc-proxy
     - 2.3.27
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-resource-vnc-proxy:2.3.27
   * - 9
     - app-service-proxy
     - 1.3.23
     - registry-rs.edgeorchestration.intel.com/edge-orch/app/app-service-proxy:1.3.23
   * - 10
     - opa
     - 1.0.1-static
     - openpolicyagent/opa:1.0.1-static
   * - 11
     - opa
     - 0.67.1-static
     - openpolicyagent/opa:0.67.1-static

.. list-table:: Cluster Orchestration Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - capi-provider-intel-manager
     - 1.0.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/capi-provider-intel-manager:1.0.5
   * - 2
     - capi-provider-intel-southbound
     - 1.0.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/capi-provider-intel-southbound:1.0.5
   * - 3
     - connect-controller
     - 1.0.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/connect-controller:1.0.5
   * - 4
     - connect-gateway
     - 1.0.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/connect-gateway:1.0.5
   * - 5
     - template-controller
     - 2.0.7
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/template-controller:2.0.7
   * - 6
     - cluster-manager
     - 2.0.7
     - registry-rs.edgeorchestration.intel.com/edge-orch/cluster/cluster-manager:2.0.7
   * - 7
     - opa
     - 1.2.0
     - openpolicyagent/opa:1.2.0

.. list-table:: Infrastructure Manager Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - api
     - 1.33.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/api:1.33.1
   * - 2
     - attestationstatusmgr
     - 0.5.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/attestationstatusmgr:0.5.1
   * - 3
     - dkammgr
     - 1.27.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/dkammgr:1.27.1
   * - 4
     - exporter
     - 1.18.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/exporter:1.18.2
   * - 5
     - hostmgr
     - 1.21.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/hostmgr:1.21.1
   * - 6
     - inventory
     - 2.23.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/inventory:2.23.2
   * - 7
     - loca-templates-manager
     - 1.2.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/loca-templates-manager:1.2.2
   * - 8
     - locametamgr
     - 1.2.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/locametamgr:1.2.1
   * - 9
     - locamgr
     - 2.18.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/locamgr:2.18.1
   * - 10
     - maintmgr
     - 1.21.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/maintmgr:1.21.1
   * - 11
     - netmgr
     - 1.17.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/netmgr:1.17.2
   * - 12
     - onboardingmgr
     - 1.34.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/onboardingmgr:1.34.3
   * - 13
     - osresourcemgr
     - 0.16.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/osresourcemgr:0.16.2
   * - 14
     - telemetrymgr
     - 1.21.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/telemetrymgr:1.21.1
   * - 15
     - tenant-controller
     - 0.17.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/infra/tenant-controller:0.17.1
   * - 16
     - tink-controller
     - v0.10.0
     - quay.io/tinkerbell/tink-controller:v0.10.0
   * - 17
     - tink
     - v0.10.0
     - quay.io/tinkerbell/tink:v0.10.0
   * - 18
     - caddy
     - 2.7.6
     - caddy:2.7.6

.. list-table:: Observability Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - alerting-monitor-management
     - 1.7.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/alerting-monitor-management:1.7.0
   * - 2
     - alerting-monitor
     - 1.7.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/alerting-monitor:1.7.0
   * - 3
     - grafana-proxy
     - 0.5.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/grafana-proxy:0.5.0
   * - 4
     - observability-tenant-controller
     - 0.6.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/observability-tenant-controller:0.6.0
   * - 5
     - orch-otelcol
     - 0.2.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/orch-otelcol:0.2.0
   * - 6
     - sre-config-reloader
     - 0.9.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/sre-config-reloader:0.9.0
   * - 7
     - sre-metrics-exporter
     - 0.9.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/o11y/sre-metrics-exporter:0.9.0
   * - 8
     - prometheus-config-reloader
     - v0.79.2
     - quay.io/prometheus-operator/prometheus-config-reloader:v0.79.2
   * - 9
     - alertmanager
     - v0.28.0
     - quay.io/prometheus/alertmanager:v0.28.0
   * - 10
     - opentelemetry-collector-contrib
     - 0.111.0
     - otel/opentelemetry-collector-contrib:0.111.0
   * - 11
     - opentelemetry-collector-contrib
     - 0.118.0
     - otel/opentelemetry-collector-contrib:0.118.0
   * - 12
     - grafana
     - 11.4.0
     - docker.io/grafana/grafana:11.4.0
   * - 13
     - loki
     - 3.3.2
     - docker.io/grafana/loki:3.3.2
   * - 14
     - memcached-exporter
     - v0.15.0
     - prom/memcached-exporter:v0.15.0
   * - 15
     - opa
     - 0.70.0-static
     - openpolicyagent/opa:0.70.0-static
   * - 16
     - mimir
     - 2.15.0
     - grafana/mimir:2.15.0

.. list-table:: User Interface Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - admin
     - 2.0.10
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/admin:2.0.10
   * - 2
     - app-orch
     - 2.0.16
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/app-orch:2.0.16
   * - 3
     - cluster-orch
     - 2.0.15
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/cluster-orch:2.0.15
   * - 4
     - infra
     - 1.0.10
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/infra:1.0.10
   * - 5
     - metadata-broker
     - 0.4.11
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/metadata-broker:0.4.11
   * - 6
     - root
     - 2.0.10
     - registry-rs.edgeorchestration.intel.com/edge-orch/orch-ui/root:2.0.10

.. list-table:: Platform services Containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - auth-service
     - 2.0.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/auth-service:2.0.0
   * - 2
     - aws-sm-proxy
     - 1.8.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/aws-sm-proxy:1.8.0
   * - 3
     - cert-synchronizer
     - 1.0.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/cert-synchronizer:1.0.1
   * - 4
     - keycloak-tenant-controller
     - 1.0.4
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/keycloak-tenant-controller:1.0.4
   * - 5
     - nexus-api-gw
     - 1.1.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/nexus-api-gw:1.1.5
   * - 6
     - secrets-config
     - 3.0.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/secrets-config:3.0.1
   * - 7
     - squid-proxy
     - 1.1.1
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/squid-proxy:1.1.1
   * - 8
     - tenancy-api-mapping
     - 1.3.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/tenancy-api-mapping:1.3.3
   * - 9
     - tenancy-datamodel
     - 1.1.5
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/tenancy-datamodel:1.1.5
   * - 10
     - tenancy-manager
     - 1.1.3
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/tenancy-manager:1.1.3
   * - 11
     - token-fs
     - 2.2.2
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/token-fs:2.2.2
   * - 12
     - vpa-admission-controller
     - 1.1.2
     - registry.k8s.io/autoscaling/vpa-admission-controller:1.1.2
   * - 13
     - vpa-recommender
     - 1.1.2
     - registry.k8s.io/autoscaling/vpa-recommender:1.1.2
   * - 14
     - vpa-updater
     - 1.1.2
     - registry.k8s.io/autoscaling/vpa-updater:1.1.2
   * - 15
     - metrics-server
     - v0.7.2
     - registry.k8s.io/metrics-server/metrics-server:v0.7.2
   * - 16
     - orchestrator-installer-cloudfull
     - v3.0.0
     - registry-rs.edgeorchestration.intel.com/edge-orch/common/files/orchestrator/cloudfull:v3.0.0
   * - 17
     - nginx-unprivileged
     - alpine3.21
     - nginxinc/nginx-unprivileged:alpine3.21

.. list-table:: Shared containers
   :widths: 5 25 20 55
   :header-rows: 1

   * - #
     - Image
     - Version
     - Full Entry
   * - 1
     - curl-jq
     - sha256:fe8a5ee49f613495df3b57afa86b39f081bd1b3b9ed61248f46c3d3d7df56092
     - badouralix/curl-jq@sha256:fe8a5ee49f613495df3b57afa86b39f081bd1b3b9ed61248f46c3d3d7df56092
   * - 2
     - kubectl
     - 1.28.4
     - bitnami/kubectl:1.28.4
   * - 3
     - kubectl
     - latest
     - bitnami/kubectl
   * - 4
     - busybox
     - 1.36.0
     - busybox:1.36.0
   * - 5
     - busybox
     - 1.36.1
     - busybox:1.36.1
   * - 6
     - bats
     - v1.11.1
     - docker.io/bats/bats:v1.11.1
   * - 7
     - nginx-unprivileged
     - 1.27-alpine
     - docker.io/nginxinc/nginx-unprivileged:1.27-alpine
   * - 8
     - k8s-sidecar
     - 1.29.1
     - kiwigrid/k8s-sidecar:1.29.1
   * - 9
     - memcached
     - 1.6.34-alpine
     - memcached:1.6.34-alpine
   * - 10
     - migrate
     - latest
     - migrate/migrate
   * - 11
     - kubectl-shell
     - latest
     - portainer/kubectl-shell
   * - 12
     - k8s-sidecar
     - 1.28.0
     - quay.io/kiwigrid/k8s-sidecar:1.28.0
