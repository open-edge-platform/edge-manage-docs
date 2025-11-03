===============================
OpenPrem Open Ports
===============================

This document provides overview of the network ports exposed in the on-premises deployment.  
It details each port’s purpose and key security considerations to help users secure their deployment.

Open Ports Overview
-------------------

The deployment exposes a set of network ports essential for cluster management, observability, and load balancing.  
Critical management ports are encrypted by default, while some ports require user attention to ensure secure configurations and minimize exposure.

===============

.. list-table::
   :header-rows: 1
   :widths: 15 85

   * - **Port**
     - **Description**
   * - **22**
     - SSH access; ensure deployment uses a Virtual IP to reduce exposure.
   * - **10250**
     - RKE2 workload management port; Virtual IP recommended for secure exposure.
   * - **2379**
     - etcd client port with enforced client certificate authentication.
   * - **2380**
     - etcd server port secured by client certificates.
   * - **30959**
     - Load balancer NodePort; enforce Virtual IP use to limit access.
   * - **31012**
     - Load balancer NodePort; Virtual IP mitigates direct network exposure.
   * - **31933**
     - Load balancer NodePort; secure with Virtual IP configuration.
   * - **443**
     - ArgoCD TLS ingress; JWT authentication enabled; Virtual IP recommended.
   * - **5473**
     - Calico managed port; use Virtual IP to enhance security.
   * - **6443**
     - Kubernetes API server; encrypted communication by default.
   * - **9345**
     - etcd port requiring client certificates; deployment should use Virtual IP.


Non-Encrypted Ports
===================

.. list-table::
   :header-rows: 1
   :widths: 15 85

   * - **Port**
     - **Description**
   * - **80**
     - HTTP traffic is redirected to HTTPS by ArgoCD; deploy Virtual IP to reduce exposure.
   * - **30443**
     - MetalLB NodePort visible in scans; TLS protection via Traefik. Virtual IP advised.
   * - **14250**
     - OpenTelemetry observability port; requires secure user configuration.
   * - **14268**
     - OpenTelemetry observability port; secure setup mandated by the user.
   * - **4317**
     - OpenTelemetry observability port; users must configure securely.
   * - **4318**
     - Observability port on on-prem single-cluster; user-managed security required.
   * - **7472**
     - MetalLB Prometheus metrics endpoint; enable security or disable if unused.
   * - **7946**
     - MetalLB Speaker pods use secure internal protocol; Virtual IP recommended.
   * - **9411**
     - OpenTelemetry observability port; user-managed secure configuration necessary.

Security Recommendations
------------------------

- **Virtual IP Deployment:** Implement Virtual IPs for all load balancer interfaces and NodePorts to minimize attack surface.  
- **Observability Ports:** Configure all OpenTelemetry-related ports strictly according to the latest security best practices:  
  [https://opentelemetry.io/docs/security/](https://opentelemetry.io/docs/security/)  
- **Encryption:** Critical infrastructure ports use encryption by default. Ports without native encryption require explicit protective configuration by users.

This guide helps users understand open port exposure and apply safeguards for securing their on-premises deployment.
For further details and updates, consult the OpenTelemetry documentation and community resources.
