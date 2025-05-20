Cluster Definition
---------------------

The cluster definition files are kept in the orch-configs repository
and can be found within the image in `src/orch-configs/clusters`.
The installer will generate a default cluster definition for the
newly provisioned cluster infrastructure and place it in
`src/orch-configs/clusters/${CLUSTER_NAME}.yaml`.

.. note::
   Verify that the value for ``aws.csiFileSystemId`` is set to the right EFS file system ID.

This example uses the following values:

- Cluster name: The string ``example`` must be replaced everywhere it occurs.
  Set to the AWS name of the newly provisioned cluster.
- AWS account: ``aws.account: '000555000555'``
  Set to the AWS account hosting the newly provisioned cluster.
- AWS region: The string ``us-west-2`` must be replaced everywhere it occurs.
  Set to the AWS region where the new cluster is provisioned.
- EFS file system ID: ``aws.csiFileSystemId: fs-0123456789abcdef0``
  Set to the ``EFS file system ID`` from AWS.

.. code-block:: yaml
   :caption: An example of the definition file for a cluster named *example* is as follows:

   # Cluster specific values applied to root-app only
   root:
      useLocalValues: true
      clusterValues:
         - profiles/enable-platform.yaml
         - profiles/enable-o11y.yaml
         - profiles/enable-kyverno.yaml
         - profiles/enable-ma.yaml
         - profiles/enable-mc.yaml
         - profiles/enable-mi.yaml
         - profiles/enable-full-ui.yaml
         - profiles/enable-integration.yaml
         - profiles/enable-docs-service.yaml
         - profiles/enable-sre.yaml
         # proxy group must be specified as the first post-"enable" profile
         - profiles/proxy-none.yaml
         - profiles/profile-aws.yaml
         - profiles/o11y-release.yaml
         - profiles/release-service-external.yaml
         - clusters/example.yaml

   # Values applied to both root app and shared among all child apps
   argo:
      ## Basic cluster information
      project: example
      namespace: example
      clusterName: example
      clusterDomain: example.[domain].root-domain.com

      ## Argo CD configs
      # chartRepoURL and containerRegistryURL needs to point to Release Service for public deployments
      chartRepoURL: "registry-rs.[domain].root-domain.com"
      containerRegistryURL: "registry-rs.[domain].root-domain.com"

      utilsRepoURL: "https://git-codecommit.us-west-2.amazonaws.com/v1/repos/example-orchestration-utils"
      utilsRepoRevision: main
      configsRepoURL: "https://git-codecommit.us-west-2.amazonaws.com/v1/repos/example-orchestration-configs"
      configsRepoRevision: main
      deployRepoURL: "https://git-codecommit.us-west-2.amazonaws.com/v1/repos/example-orchestration-deploy"
      deployRepoRevision: main

      enabled:
         oci-secret: true

      infra-onboarding:
         netIp: dynamic
         dkamMode: prod
         nameServers: 8.8.8.8

      # near Zero Touch Provisioning configuration
      infra-managers:
         autoProvision:
            enabled: false

      targetServer: "https://kubernetes.default.svc"
      autosync: true

      ## AWS Account Info
      aws:
         account: "000555000555"
         region: us-west-2
         bucketPrefix: "example-orch"
         efs:
            repository: 602401143452.dkr.ecr.us-west-2.amazonaws.com/eks/aws-efs-csi-driver
            fsid: "fs-0123456789abcdef0"
         targetGroup:
            traefik:

      traefikSvcType: NodePort

   postCustomTemplateOverwrite: {}

Scale-Related Edge Orchestrator Configurations
----------------------------------------------

A set of scale-related profiles is available for the cluster definition. You will need to select according to the target deployment scale.

See :doc:`/deployment_guide/cloud_deployment/cloud_get_started/system_requirements_aws_orch`
and :doc:`/deployment_guide/cloud_deployment/cloud_how_to/cloud_scale_orch`
for more information on how to scale the cluster.
