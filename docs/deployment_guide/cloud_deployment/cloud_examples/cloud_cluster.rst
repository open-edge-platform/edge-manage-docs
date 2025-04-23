Cluster Module Examples
=========================

Each module type uses both ``backend.tf`` and ``variable.tfvar`` files.

.. code-block:: terraform
    :caption: backend.tf example

    region="us-west-2"
    bucket="example-bucket"
    key="use-west-2/external/cluster/my-env"

.. code-block:: text
    :caption: variable.tfvar example

    argocd_repos = [
      "edge-manageability-framework"
    ]
    aurora_availability_zones          = ""
    aurora_dev_mode                    = true
    aurora_instance_availability_zones = ""
    aurora_max_acus                    = 2
    aurora_min_acus                    = "0.5"
    aurora_postgres_ver_major          = "14"
    aurora_postgres_ver_minor          = "9"
    auto_cert                          = false
    aws_account_number                 = ""
    aws_region                         = ""
    aws_roles = [
      "AWSReservedSSO_AWSAdministratorAccess_933fc287558617cc",
      "AWSReservedSSO_Developer_EKS_054305100460_52b02cdf70e84917"
    ]
    ca_cert                                 = ""
    cache_registry                          = ""
    cluster_fqdn                            = ""
    customer_tag                            = ""
    ec2log_cw_expire                        = 7
    ec2log_file_list                        = "/var/log/messages* /var/log/aws-routed-eni/* /var/log/dmesg /tmp/kubelet.log /tmp/free.log /tmp/df.log /tmp/top.log"
    ec2log_s3_expire                        = 30
    ec2log_script                           = "sudo journalctl -xeu kubelet >/tmp/kubelet.log; free >/tmp/free.log; df -h >/tmp/df.log; top -b -n 3 >/tmp/top.log"
    efs_policy_name                         = "EFS_CSI_Driver_Policy"
    efs_policy_source                       = "https://raw.githubusercontent.com/kubernetes-sigs/aws-efs-csi-driver/v1.5.4/docs/iam-policy-example.json"
    efs_role_name                           = "EFS_CSI_DriverRole"
    efs_sg_name                             = "efs-nfs"
    efs_throughput_mode                     = "bursting"
    efs_transition_to_ia                    = "AFTER_7_DAYS"
    efs_transition_to_primary_storage_class = "AFTER_1_ACCESS"
    eks_additional_iam_policies = [
      "secret_read_release-service-token",
      "secret_read_sre-secret"
    ]
    eks_additional_node_groups = {
      "observability": {
        "desired_size": 1,
        "instance_type": "t3.2xlarge",
        "labels": {
          "node.kubernetes.io/custom-rule": "observability"
        },
        "max_size": 1,
        "min_size": 1,
        "taints": {
          "node.kubernetes.io/custom-rule": {
            "effect": "NO_SCHEDULE",
            "value": "observability"
          }
        },
        "volume_size": 20,
        "volume_type": "gp3"
      }
    }
    eks_addons = [
      {
        "name": "aws-ebs-csi-driver",
        "version": "v1.39.0-eksbuild.1"
      },
      {
        "configuration_values": "{\"enableNetworkPolicy\": \"true\", \"nodeAgent\": {\"healthProbeBindAddr\": \"8163\", \"metricsBindAddr\": \"8162\"}}",
        "name": "vpc-cni",
        "version": "v1.19.2-eksbuild.1"
      },
      {
        "name": "aws-efs-csi-driver",
        "version": "v2.1.4-eksbuild.1"
      }
    ]
    eks_cluster_dns_ip              = ""
    eks_cluster_name                = ""
    eks_desired_size                = 1
    eks_http_proxy                  = ""
    eks_https_proxy                 = ""
    eks_max_pods                    = 58
    eks_max_size                    = 1
    eks_min_size                    = 1
    eks_no_proxy                    = ""
    eks_node_ami_id                 = "ami-09ea311630482acd7"
    eks_node_instance_type          = "t3.2xlarge"
    eks_user_script_post_cloud_init = ""
    eks_user_script_pre_cloud_init  = ""
    eks_version                     = "1.32"
    eks_volume_size                 = 20
    eks_volume_type                 = "gp3"
    enable_cache_registry           = "false"
    enable_ec2log                   = true
    enable_eks_auth                 = false
    enable_orch_init                = true
    import_s3_buckets               = false
    istio_namespaces = [
      "orch-infra",
      "orch-app",
      "orch-cluster",
      "orch-ui",
      "orch-platform",
      "orch-gateway"
    ]
    needed_namespaces = [
      "orch-sre",
      "cattle-system",
      "orch-boots",
      "fleet-default",
      "argocd",
      "orch-secret"
    ]
    orch_databases = {
      "alerting": {
        "namespace": "orch-infra",
        "user": "orch-infra-system-alerting_user"
      },
      "app-orch-catalog": {
        "namespace": "orch-app",
        "user": "app-orch-catalog_user"
      },
      "inventory": {
        "namespace": "orch-infra",
        "user": "orch-infra-system-inventory_user"
      },
      "platform-keycloak": {
        "namespace": "orch-platform",
        "user": "orch-platform-system-platform-keycloak_user"
      },
      "vault": {
        "namespace": "orch-platform",
        "user": "orch-platform-system-vault_user"
      }
    }
    public_cloud                  = true
    release_service_refresh_token = ""
    s3_create_tracing             = false
    s3_prefix                     = ""
    smtp_from                     = ""
    smtp_pass                     = ""
    smtp_port                     = 587
    smtp_url                      = ""
    smtp_user                     = ""
    sre_basic_auth_password       = ""
    sre_basic_auth_username       = "nexsre"
    sre_secret_string             = ""
    tls_cert                      = ""
    tls_key                       = ""
    vpc_terraform_backend_bucket  = ""
    vpc_terraform_backend_key     = ""
    vpc_terraform_backend_region  = ""
    webhook_github_netrc          = ""
