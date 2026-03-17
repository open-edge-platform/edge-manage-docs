Application Requirements
========================

Applications in |software_prod_name| must fulfill the following criteria to be deployed
and managed successfully:

**Kubernetes Compatibility**
  - Deployable on CNCF-certified Kubernetes version v1.33 or later
  - Compliant with Kubernetes best practices for resource definitions and configurations
  - All resources defined in YAML manifests must adhere to Kubernetes API specifications
  - Use of Kubernetes namespaces for resource isolation and management

**Chart Management**
  - All Helm charts stored in Helm or OCI registry and downloadable through the network
  - All Helm charts, including applications and dependencies, must be accessible via network
  - Use the ``helm lint`` command to check if the chart is well-formed

**Lifecycle Management**
  - Deployable using Helm install
  - Upgradable using Helm upgrade
  - Removable using Helm delete
  - Re-deployable using Helm install after delete; no manual cleanup is required

**Resource Management**
  - All Kubernetes resource creation and updates are done through the Helm chart
  - Intel does not recommend dynamic resource creation or update because this could lead to unexpected results

For additional guidance on Helm chart best practices, see
:doc:`/developer_guide/application_developer_workflow/deployment-helm/index`.
