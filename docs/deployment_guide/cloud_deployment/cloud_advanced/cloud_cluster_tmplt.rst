Cluster Template Examples
#########################

.. warning::
   The following example contains profiles that may require additional configuration.
   See :doc:`/deployment_guide/cloud_deployment/cloud_advanced/cloud_alerts`
   for more information about **profiles/alerting-emails.yaml** and
   :doc:`/deployment_guide/cloud_deployment/cloud_advanced/cloud_sre`
   for more information about **profiles/enable-sre.yaml**.

.. code-block:: yaml

    # SPDX-FileCopyrightText: 2025 Intel Corporation
    #
    # SPDX-License-Identifier: Apache-2.0

    # Cluster specific values applied to root-app only
    root:
      useLocalValues: true
      clusterValues:
        - orch-configs/profiles/enable-platform.yaml
        - orch-configs/profiles/enable-multitenancy.yaml
        - orch-configs/profiles/enable-o11y.yaml
        - orch-configs/profiles/enable-kyverno.yaml
        - orch-configs/profiles/enable-app-orch.yaml
        - orch-configs/profiles/enable-cluster-orch.yaml
        - orch-configs/profiles/enable-edgeinfra.yaml
        - orch-configs/profiles/enable-full-ui.yaml
        - orch-configs/profiles/enable-aws.yaml
        #- orch-configs/profiles/enable-sre.yaml
        # proxy group should be specified as the first post-"enable" profile
        - orch-configs/profiles/proxy-none.yaml
        - orch-configs/profiles/profile-aws.yaml
        - orch-configs/profiles/resource-default.yaml
        - orch-configs/profiles/profile-aws-production.yaml
        - orch-configs/profiles/o11y-release.yaml
        #- orch-configs/profiles/alerting-emails.yaml
        - orch-configs/profiles/profile-autocert.yaml
        - orch-configs/profiles/artifact-rs-production-noauth.yaml
        - orch-configs/clusters/mdb-oep.yaml

    # Values applied to both root app and shared among all child apps
    argo:
      ## Basic cluster information
      project: example
      namespace: example
      clusterName: example
      clusterDomain: example.root-domain.com
      adminEmail: admin@root-domain.com

      deployRepoURL: https://gitea.example.root-domain.com/argocd/edge-manageability-framework
      deployRepoRevision: main

      git:
        server: https://gitea.example.root-domain.com

      targetServer: "https://kubernetes.default.svc"
      autosync: true

      o11y:
        # If the cluster has a node dedicated to edgenode observability services
        dedicatedEdgenodeEnabled: true

      ## AWS Account Info
      aws:
        account: "000555000555"
        region: us-west-2
        bucketPrefix: example-orch
        efs:
          repository: 602401143452.dkr.ecr.us-west-2.amazonaws.com/eks/aws-efs-csi-driver
          fsid: "fs-0123456789abcdef0"

      traefik:
        tlsOption: ""

    orchestratorDeployment:
      targetCluster: cloud

    postCustomTemplateOverwrite: {}
