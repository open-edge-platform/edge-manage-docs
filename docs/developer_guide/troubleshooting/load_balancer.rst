===================
AWS\* Load Balancer
===================

.. note::

   This page applies to cloud deployment only.

AWS Load Balancer Architecture
==============================

.. image:: images/lb.svg
   :alt: AWS load balancer architecture
   :width: 100%

Health Check
============

A good way to tell whether load balancer is healthy or not is to `curl` the
web-ui endpoint.

- The service is **healthy** if it returns HTTP **200**
- It's likely a **load balancer issue** if the **connection times out**
- It's likely a **K8s service issue** if it returns an HTTP status code but
  **not 200**

Common Failures
===============

DNS is not resolved - (1)
-------------------------

- **Symptom**

  Normally, the `web-ui.edgeorchestration.intel.com` should eventually be
  resolved into the Elastic IP address of the load balancer.

  .. code:: shell

    $ dig web-ui.edgeorchestration.intel.com
    (...)
    ;; ANSWER SECTION:
    web-ui.edgeorchestration.intel.com. 900 IN CNAME
    web-ui.edgeorchestration.espdprod.infra-host.com.
    web-ui.edgeorchestration.espdprod.infra-host.com. 300 IN CNAME
    edgeorchestration.espdprod.infra-host.com.
    edgeorchestration.espdprod.infra-host.com. 60 IN A 34.217.254.245
    edgeorchestration.espdprod.infra-host.com. 60 IN A 44.240.209.7
    (...)

  There is likely a DNS issue if it is not resolved.

- **Recovery method**

  The top level `*.edgeorchestration.intel.com` is managed by Intel IT. You
  must contact Intel IT if this is not resolved.

  Check the `public` zone in Route53 and make sure they are pointing to the
  correct load balancer instance.

Target group does not have any entry - (2)
------------------------------------------

- **Symptom**

  There are no target entries being registered at all in AWS Console > EC2 >
  TargetGroup > (select TargetGroup of Traefik or SRE).

- **Recovery method**

  Check the `targetgroupbinding` resource in Kubernetes\* platform. It should have the
  following entries. If not, check Terraform log from the cloud installer.

  .. code:: shell

    $ kubectl get targetgroupbinding -A
    NAMESPACE       NAME                       SERVICE-NAME
    SERVICE-PORT   TARGET-TYPE   AGE
    argocd          argocd                     argocd-server
    443            ip            24d
    orch-gateway    traefik-grpc               traefik
    443            ip            24d
    orch-gateway    traefik-https              traefik
    443            ip            24d
    gitea           gitea                      gitea-http
    443            ip            24d
    orch-boots      ingress-nginx-controller   ingress-nginx-controller
    443            ip            24d

  Further check the log of `aws-load-balancer-controller` in `kube-system`
  namespace if still not working.

  - **IAM role for Amazon Elastic Kubernetes Service\* (Amazon EKS\*) node** should be associated with a policy that grants
    access to load balancer-related resources.
  - A **VPC endpoint** should be set up to allow access to
    `sts.amazonaws.com`.

Target group has entries but showing unhealthy - (3)(4)
--------------------------------------------------------

- **Symptom**

  There are target entries in AWS Console > EC2 > Target Group > (select TG of
  Traefik or SRE), but the status is unhealthy.

- **Recovery method**

  Check the Network ACL (3) and Security Group of Kubernetes node (4).

  - Network ACL should have the following rules:

    .. code::

      Inbound: ALLOW port 443 from Intel network
      Outbound: ALLOW port 8443 to private subnet (Traefik)
      Outbound: ALLOW port 9141 to private subnet (SRE exporter)

  - Security Group should have the following rules:

    .. code::

      ALLOW port 8443 from public subnet
      ALLOW port 9141 from public subnet

Troubleshooting Tips
====================

Kubernetes Service Port (5)
---------------------------

There are 3 ports in Kubernetes Service that are often confusing.

- `port`: this config will affect 2 things, and should be set to 443 in our
  case:

  - The outward-facing port of the load balancer when the Service type is
    `LoadBalancer`.
  - The port we use to access the service from other internal pods via
    `https://<service>.<namespace>.svc` when using Service type `ClusterIP`.

- `nodePort`: the port that Kubernetes node listens on when the Service type
  is `NodePort`.
- `targetPort`: the port which pod is listening on:

  - Should be `8443` for Traefik.
  - Should be `9141` for SRE exporter.

.. note::

  Currently, we use `ip` TargetGroup type and therefore `nodePort` does not
  really matter. `nodePort` will become useful when we switch to `instance`
  TargetGroup type in the future to incorporate Calico CNI.

Traefik ingressroute (6)
------------------------

The list of all Host SNI Traefik\* software is handling can be dumped via `ingressroute`:

.. code:: shell

  $ kubectl get ingressroute -A -o yaml | yq '.items[].spec.routes[].match'
  Host(`app-service-proxy.demo.espd.infra-host.com`)
  Host(`app-service-proxy.demo.espd.infra-host.com`) && PathPrefix(`/app-service-proxy`)
  Host(`attest-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`connect-gateway.demo.espd.infra-host.com`) && PathPrefix(`/kubernetes`)
  Host(`connect-gateway.demo.espd.infra-host.com`) && PathPrefix(`/connect`)
  Host(`observability-ui.demo.espd.infra-host.com`)
  Host(`registry-oci.demo.espd.infra-host.com`) && (PathPrefix(`/api/`) || PathPrefix(`/service/`) || PathPrefix(`/v2/`) || PathPrefix(`/chartrepo/`) || PathPrefix(`/c/`))
  Host(`registry-oci.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`infra-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`api.demo.espd.infra-host.com`) && PathPrefix(`/edge-orchestrator.intel.com/openapi.json`)
  Host(`api.demo.espd.infra-host.com`) && PathPrefix(`/edge-orchestrator.intel.com/docs`)
  Host(`cluster-orch-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`gitea.demo.espd.infra-host.com`)
  Host(`update-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`api.demo.espd.infra-host.com`) && PathPrefix(`/v`)
  Host(`api.demo.espd.infra-host.com`) && PathPrefix(`/v1/orgs`)
  Host(`onboarding-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`onboarding-stream.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`observability-admin.demo.espd.infra-host.com`)
  Host(`keycloak.demo.espd.infra-host.com`)
  Host(`logs-node.demo.espd.infra-host.com`)
  Host(`metrics-node.demo.espd.infra-host.com`) && (PathPrefix(`/prometheus/api/v1/query`) || PathPrefix(`/prometheus/api/v1/query_range`) || PathPrefix(`/api/v1/push`)|| PathPrefix(`/otlp/v1/metrics`))
  Host(`vault.demo.espd.infra-host.com`)
  Host(`release.demo.espd.infra-host.com`)
  Host(`fleet.demo.espd.infra-host.com`)
  Host(`telemetry-node.demo.espd.infra-host.com`) && PathPrefix(`/`)
  Host(`tinkerbell-server.demo.espd.infra-host.com`)
  (Host(`demo.espd.infra-host.com`)) && PathPrefix(`/boots`)
  Host(`vnc.demo.espd.infra-host.com`)
  (Host(`web-ui.demo.espd.infra-host.com`) || Host(`demo.espd.infra-host.com`)) && PathPrefix(`/`)
