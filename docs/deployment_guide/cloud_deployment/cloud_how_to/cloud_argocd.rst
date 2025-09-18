EMF Argo CD Deployment Guide (AWS Cloud)
========================================

This guide explains how Edge Manageability Framework (EMF) is deployed on **AWS Cloud**
using Argo CD and the cluster profile file:

``orch-configs/clusters/cluster-name.yaml``

The cluster profile drives the deployment of multiple Argo CD Applications across the cluster.

1. Cluster Profile Overview
---------------------------

The cluster profile (``cluster-name.yaml``) performs the following:

- Combines multiple profile files (``root.clusterValues``)
- Injects global settings (AWS account, region, EFS, TargetGroups)
- Applies AWS-specific overrides (``postCustomTemplateOverwrite``)
- Declares Git repository, branch, Argo project, and feature toggles
- Orchestrates multiple Applications, not just a single Helm chart

2. High-Level Deployment Flow
-----------------------------

1. Bootstrap AWS essentials: authentication, load balancers, and shared storage
2. Install Argo CD into the EKS cluster
3. Apply the Root Application manifest pointing to Git repo and ``cluster-name.yaml``
4. Process ``root.clusterValues`` in order (last wins)
5. Generate child Applications: platform, observability (o11y), Kyverno, edge infra, UI, SRE
6. Apply AWS-specific overrides (``postCustomTemplateOverwrite``), e.g., TargetGroup ARNs
7. Argo CD auto-syncs until all Applications are Healthy

3. Key AWS Fields in Cluster Profile
------------------------------------

+-----------------------------+-----------------------------------------------------+
| Field                       | Description                                         |
+=============================+=====================================================+
| argo.project                | Argo CD project name (usually cluster-name)         |
+-----------------------------+-----------------------------------------------------+
| argo.namespace              | Namespace for core EMF components                   |
+-----------------------------+-----------------------------------------------------+
| argo.clusterName            | Logical name for the EKS cluster                    |
+-----------------------------+-----------------------------------------------------+
| argo.clusterDomain          | DNS suffix (e.g., cluster-name.customer-domain.com) |
+-----------------------------+-----------------------------------------------------+
| argo.deployRepoURL          | Git repo with EMF manifests                         |
+-----------------------------+-----------------------------------------------------+
| argo.deployRepoRevision     | Branch or tag to deploy (e.g., main)                |
+-----------------------------+-----------------------------------------------------+
| aws.account                 | AWS account ID                                      |
+-----------------------------+-----------------------------------------------------+
| aws.region                  | AWS region (e.g., us-west-2)                        |
+-----------------------------+-----------------------------------------------------+
| aws.efs.fsid                | EFS FileSystem ID                                   |
+-----------------------------+-----------------------------------------------------+
| aws.targetGroup.traefik     | ALB TargetGroup ARN for HTTP                        |
+-----------------------------+-----------------------------------------------------+
| aws.targetGroup.traefikGrpc | ALB TargetGroup ARN for gRPC                        |
+-----------------------------+-----------------------------------------------------+
| postCustomTemplateOverwrite.* | Optional AWS-specific overrides                   |
+-----------------------------+-----------------------------------------------------+

4. Profiles Layering Strategy
-----------------------------

Profiles in ``orch-configs/profiles/`` are modular:

- ``enable-*.yaml`` – Enable features
- ``proxy-*.yaml`` – Proxy configuration
- ``profile-*.yaml`` – Opinionated bundles (e.g., AWS)
- ``resource-*.yaml`` – Resource sizing/tuning
- ``artifact-*.yaml`` – Artifact storage mode
- ``o11y-*.yaml`` – Observability overlays

Typical AWS layering order:

.. code-block:: yaml

   - $values/orch-configs/profiles/enable-platform.yaml
   - $values/orch-configs/profiles/enable-o11y.yaml
   - $values/orch-configs/profiles/enable-kyverno.yaml
   - $values/orch-configs/profiles/enable-app-orch.yaml
   - $values/orch-configs/profiles/enable-cluster-orch.yaml
   - $values/orch-configs/profiles/enable-edgeinfra.yaml
   - $values/orch-configs/profiles/enable-full-ui.yaml
   - $values/orch-configs/profiles/enable-aws.yaml
   - $values/orch-configs/profiles/enable-sre.yaml
   - $values/orch-configs/profiles/proxy-none.yaml
   - $values/orch-configs/profiles/profile-aws.yaml
   - $values/orch-configs/profiles/resource-default.yaml
   - $values/orch-configs/profiles/o11y-release.yaml
   - $values/orch-configs/profiles/alerting-emails.yaml
   - $values/orch-configs/profiles/artifact-rs-production-noauth.yaml
   - $values/orch-configs/profiles/cluster-name.yaml

5. AWS Dependencies Setup
-------------------------

- IAM Provider – for cluster authentication  
- AWS Load Balancer Controller – to manage ALBs  
- EFS CSI Driver – persistent storage  
- Route53 DNS – domain resolution for services  

6. Argo CD Installation
-----------------------

Internal chained targets with side effects:

- ``create-namespaces``
- ``release-secrets``
- ``keycloak-secret``
- ``install-argocd-release``
- ``wait-argocd-ready``
- ``deploy-rootapp``

.. code-block:: bash

   # Add Argo Helm repo
   helm repo add argo-helm https://argoproj.github.io/argo-helm --force-update >/dev/null

   admin_patch_pw=$(argocd account bcrypt --password "$ORCH_DEFAULT_PASSWORD")

   # Install/upgrade Argo CD with Helm
   helm upgrade --install argocd argo-helm/argo-cd \
     -n argocd \
     --version "8.0.0" \
     --values "edge-manageability-framework/bootstrap/argocd.yaml" \
     --values "edge-manageability-framework/bootstrap/nodeport.yaml" \
     --set configs.cm.users.session.duration=24h \
     --create-namespace --wait

   kubectl -n argocd patch secret argocd-secret --type='merge' \
     -p '{"stringData":{"admin.password":"$admin_patch_pw"}}'

7. Apply Root Application
-------------------------

.. code-block:: bash

   helm upgrade --install root-app edge-manageability-framework/argocd/root-app \
     -n sc-dev \
     -f edge-manageability-framework/orch-configs/clusters/sc-dev.yaml \
     --create-namespace

This creates the Argo CD project and root Application, and deploys child Applications automatically.
