Load Balancer Package
=============================================================

The Load Balancer Package enables load balancer and Domain Name System (DNS) services for workloads running on the edge.
This package allows accessing applications deployed on edge nodes using a Fully Qualified Domain Name (FQDN) instead of the IP address.

External IP address resolution is achieved by associating FQDN and assigning a routable IP address to your application.

The Load Balancer Package contains the following:

* MetalLB - Load balancer for bare-metal Kubernetes clusters; delivers routable IP (ExternalIP) address assignment for services (type=LoadBalancer) exposing your workloads.
* MetalLB-Config - Configures MetalLB to fit Edge Platform clusters.
* EdgeDNS - Converts DNS name to the IP address of a workload running inside a cluster based on the annotation of a resource.
* Ingress-NGINX - Kubernetes ingress controller to support the ingress Kubernetes service.

Configuration Options
-------------------------

`MetalLB-Config`, `EdgeDNS`, and `Ingress-NGINX` components in the Load
Balancer package require network configurations for user applications to be deployed to edge clusters.
When deploying the Load Balancer package, there are multiple fields in the `Override Profile Values`.

**Override Profile Values > MetalLB-Config**

.. code:: yaml

   dnsIPAddress: 10.1.0.80/32
   ingressIPAddress: 10.1.0.81/32
   staticIPs: "" // example - "10.1.0.82/32,10.1.0.83/32"
   ipAddressRange: 10.1.0.30-10.1.0.79
   L2Advertisement.enabled: false // false - not to set L2Advertisement for a specific interface; true - to set L2Advertisement for a specific interface
   L2Advertisement.interface: "" // the network interface name for L2Advertisement; example - "enp138s0f0"

* The `dnsIPAddress` is the field to set the EdgeDNS IP address.
* The `ingressIPAddress` is for the ingress NGINX controller IP address.
* | The `staticIPs` should have the list of required static load balancer IP addresses for exposing Kubernetes services.
  | This should be written in the format `IP1/32,IP2/32,...` splitting with the `,` separator.
* The `ipAddressRange` field has the IP range value defined in the format `<startIP_in_range>-<endIP_in_range>` accepted by MetalLB for exposing Kubernetes services.
* The `L2Advertisement.enabled` is the flag to enable L2Advertisement.
* The `L2Advertisement.interface` requires the network interface name for L2Advertisement. If `L2Advertisement.enabled` is
  set to true, it should be set such as `enp138s0f0`.

**Override Profile Values > EdgeDNS**

.. code:: yaml

   staticIP: 10.1.0.80

The `staticIP` is the field to set EdgeDNS IP address.
It should be matched with the value `dnsIPAddress` in `Override Profile Values > MetalLB-Config`.
Note that it does not need `/32`.

**Override Profile Values > Ingress-NGINX**

.. code:: yaml

   controller.service.loadBalancerIP: 10.1.0.81

The `controller.service.loadBalancerIP` field is for Ingress-NGINX controller IP address exposing with the MetalLB.
It should be matched with the value `ingressIPAddress` in `Override Profile Values > MetalLB-Config`.
Note that it does not need `/32`.

How to Apply Load Balancer, DNS, and Ingress
---------------------------------------------

In many cases, you need to communicate with the edge applications from the systems outside the edge cluster.
This may include IoT sensors, media displays, or interactive users that need to connect to the applications deployed onto the edge node.

Though there are different ways, Intel recommends that you use the Load Balancer Package, which can provide the ability to assign externally accessible IP addresses
and user-friendly FQDN for the edge application services. Or, even it supports the Ingress Kubernetes service too to access application services.

.. _apply_load_balancer_dns:

Apply Load Balancer and DNS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Do the following to use the Load Balancer package in the application Helm chart to expose services outside of the cluster:

#. Ensure that the Load Balancer Package is deployed. Ensure that the Load Balancer IP pool range is configured properly.
#. Add a service with the `LoadBalancer` type in the application Helm chart. The following is an example of a simple manifest:

   .. code:: yaml

      apiVersion: v1
      kind: Service
      metadata:
         name: example-service
      spec:
         selector:
         app: example
         ports:
         - port: 8765
               targetPort: 9376
         type: LoadBalancer
         # optionally add below value to set a static LoadBalancer IP
         loadBalancerIP: 10.1.0.45

   Typically, you can configure the `type` and `loadBalancerIP` fields using chart overriding values.

#. If you want to assign user-friendly FQDN instead of static Load Balancer IP, add the following annotation to the Service specification.
   Annotation value can be any domain name that you like. Also, include the annotation value variable in the chart.

   .. code:: yaml

      annotations:
      external-dns.alpha.kubernetes.io/hostname: "example.myedge.company.org"

#. Once the application is deployed successfully, you can access the service using the Load Balance IP address from your client system at the Edge without additional effort.

You can access the service with the FQDN in either of the following ways:

* Add `staticIP` of EdgeDNS configured during the Load Balancer Package deployment to the domain name server list of the client system.
* If there is an existing local name server in your edge network, configure a forwarding zone for the domain. In this example, `myedge.company.org`, with EdgeDNS `staticIP` in the local name server.

.. _apply_ingress:

Apply Ingress
~~~~~~~~~~~~~~~~~~~~~

To use Ingress, the Ingress resource should be defined in the application Helm chart.

#. Ensure that the Load Balancer package is deployed. Ensure that the Load Balancer IP pool range is configured properly.
#. Ensure that the application Helm chart has the Kubernetes service to expose user application(s) already.
#. Add an ingress with the `Ingress` type in the application Helm chart. Example:

   .. code:: yaml

      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
         name: ingress-example
      spec:
         rules:
         - host: foo.local # the hostname to access example-service-name Kubernetes service
            http:
               paths:
               - backend:
                  service:
                     name: example-service-name # target Kubernetes service
                     port:
                     name: http
               path: /bar # path to access the target Kubernetes service
               pathType: ImplementationSpecific

#. Then, the client machine to access the application via `Ingress` should have the DNS/Host rule.

There are at least two ways to follow:

* We can just adjust the `/etc/hosts` file in the client machine to have the right hostname like `<ingress Controller IP> <host in Ingress yaml>`, such as `10.1.0.81 foo.local` for the above example.
* We can add the entry `<ingress controller IP, host in Ingress yaml>`` to the DNS server that the client machine is using.


#. Once DNS/Host rule is set, access the application with the url `host/path` such as `foo.local/bar` for the above example.

.. note::
   The above snippet is just a simple example.
   When the source YAML files for Kubernetes service and Ingress in a Helm
   chart are following the official Kubernetes document, the Helm chart
   should work.
