EMF Argo CD Deployment Flow (AWS Cloud)
=======================================

This document explains how Edge Manageability Framework (EMF) is deployed on **AWS Cloud** 
through Argo CD using the cluster profile file: ``orch-configs/clusters/cluster-name.yaml``.

The ``cluster-name.yaml`` file is consumed by the EMF Root (App-of-Apps) Argo CD Application.

1. What the Cluster Profile Is
------------------------------

The cluster profile (``cluster-name.yaml``) is consumed by the EMF Root Argo CD Application. It:

* Layers multiple ``orch-configs/profiles/*.yaml`` files (``root.clusterValues``).
* Injects globals (AWS account, region, EFS, TargetGroups).
* Applies post-template override patches (``postCustomTemplateOverwrite``).
* Declares repository, revision, project, domain, and feature toggles.

It is **not** a single Helm values file. It orchestrates multiple Argo CD Applications across AWS.

2. High-Level Flow
------------------

#. Bootstrap AWS dependencies (OIDC, Load Balancer Controller, EFS CSI driver).
#. Install Argo CD into EKS cluster.
#. Apply Root Application manifest pointing to Git repo and ``cluster-name.yaml``.
#. ``root.clusterValues`` processed in order (last wins).
#. Aggregated values generate child Applications (platform, o11y, Kyverno, edge infra, UI, SRE).
#. ``postCustomTemplateOverwrite`` applies AWS-specific overrides (e.g., TargetGroup ARNs).
#. Argo CD auto-syncs and reconciles until all Applications are ``Healthy``.

3. Field Reference (AWS Deployment)
-----------------------------------

``argo.project``
  Argo CD Project name for EMF (``cluster-name``).

``argo.namespace``
  Namespace where EMF core components are deployed.

``argo.clusterName``
  Logical identifier for AWS EKS cluster.

``argo.clusterDomain``
  DNS suffix (e.g. ``cluster-name.customer-domain.com``).

``argo.deployRepoURL``
  Git repo containing EMF manifests:
  ``https://gitea.cluster-name.customer-domain.com/argocd/edge-manageability-framework``.

``argo.deployRepoRevision``
  Branch or tag to deploy from (e.g. ``main``).

``argo.targetServer``
  Kubernetes API endpoint (default: ``https://kubernetes.default.svc``).

``aws.account``
  AWS Account ID where EKS cluster is provisioned.

``aws.region``
  AWS region (e.g., ``us-west-2``).

``aws.efs.fsid``
  EFS FileSystem ID for persistent volumes.

``aws.targetGroup.traefik``
  ALB TargetGroup ARN for Traefik HTTP.

``aws.targetGroup.traefikGrpc``
  ALB TargetGroup ARN for Traefik gRPC.

``postCustomTemplateOverwrite.*``
  Optional patches to add AWS annotations (e.g., ALB ingress annotations).

4. Profile Layering Strategy
----------------------------

Profiles in ``orch-configs/profiles/`` are modular:

* ``enable-*.yaml`` – Enable AWS features (platform, o11y, Kyverno, UI, SRE).
* ``proxy-*.yaml`` – Proxy configs if egress required.
* ``profile-*.yaml`` – Opinionated bundles (e.g. ``profile-aws.yaml``).
* ``resource-*.yaml`` – Resource sizing/tuning.
* ``artifact-*.yaml`` – Artifact storage modes.
* ``o11y-*.yaml`` – Observability overlays.

For AWS, typical layering includes::

   enable-platform.yaml
   enable-o11y.yaml
   enable-kyverno.yaml
   enable-app-orch.yaml
   enable-cluster-orch.yaml
   enable-edgeinfra.yaml
   enable-full-ui.yaml
   enable-aws.yaml
   enable-sre.yaml
   proxy-none.yaml
   profile-aws.yaml
   resource-default.yaml
   o11y-release.yaml
   artifact-rs-production-noauth.yaml
   clusters/cluster-name.yaml

5. AWS Dependencies Setup
-------------------------

#. **IAM OIDC Provider**
   .. code-block:: bash

      eksctl utils associate-iam-oidc-provider \
        --region <aws-region> \
        --cluster <cluster-name> \
        --approve

#. **AWS Load Balancer Controller**
   .. code-block:: bash

      helm repo add eks https://aws.github.io/eks-charts
      helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller \
        -n kube-system \
        --set clusterName=<cluster-name> \
        --set serviceAccount.create=false \
        --set serviceAccount.name=aws-load-balancer-controller

#. **EFS CSI Driver**
   .. code-block:: bash

      helm repo add aws-efs-csi-driver https://kubernetes-sigs.github.io/aws-efs-csi-driver/
      helm upgrade --install aws-efs-csi-driver aws-efs-csi-driver/aws-efs-csi-driver \
        -n kube-system

#. **Route53 DNS**
   * Create ``*.cluster-name.customer-domain.com`` wildcard entry.
   * Point to ALB provisioned by Load Balancer Controller.

6. Argo CD Installation
-----------------------

.. code-block:: bash

   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

7. Bootstrapping Root Application
---------------------------------

Apply the cluster profile Application:

.. code-block:: bash

   kubectl apply -f cluster-name.yaml -n argocd

This creates:

* Argo CD Project ``cluster-name``.
* Root Application referencing:
  ``https://gitea.cluster-name.customer-domain.com/argocd/edge-manageability-framework``.
* Child Applications for platform, o11y, Kyverno, edge infra, UI, and AWS.

8. Validation Checklist
-----------------------

* Confirm ``kubectl get applications -n argocd`` shows ``Healthy`` and ``Synced``.
* Verify ALB TargetGroups are created and associated with Traefik.
* Ensure EFS PersistentVolumeClaims bind successfully.
* Access EMF UI at ``https://web-ui.cluster-name.customer-domain.com``.
* Validate Kyverno policies and observability dashboards.

9. Failure & Recovery
---------------------

* Missing AWS config (EFS, TargetGroup) → Application ``Degraded``.
* Invalid Git reference → Root Application fails.
* To fix: update ``cluster-name.yaml`` and re-sync Argo CD.

10. Quick Start (Customer)
--------------------------

#. Provision AWS EKS + IAM OIDC + ALB Controller + EFS CSI.
#. Install Argo CD into EKS cluster.
#. Clone EMF repo, edit ``clusters/cluster-name.yaml`` with AWS details.
#. Apply Root Application manifest.
#. Wait for Applications = ``Synced`` / ``Healthy``.
#. Access EMF at: ``https://web-ui.cluster-name.customer-domain.com``.

11. One-Step Argo CD Installer Guide
------------------------------------

Prereqs: AWS EKS cluster, ``kubectl`` + ``helm``, DNS setup, Git repo with customized ``cluster-name.yaml``.
