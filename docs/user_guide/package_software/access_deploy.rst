Access Deployed Application Services
====================================

In many cases, you need to communicate with edge applications or users, from the
systems outside the edge cluster. These edge applications may include IoT sensors
or media displays, while the users are those who use the edge applications.

You can access deployed applications with the following options:

* Application service proxy – See :doc:`/user_guide/package_software/package_create_helm`
  to access an application through a link in the Edge Orchestrator user interface.

* Load balancer or Load balancer with DNS – See :doc:`/user_guide/package_software/extensions/load_balancer`
  to use the Load Balancer package in the application Helm\* chart to expose services outside of the cluster.

* Ingress controller – See :doc:`/user_guide/package_software/extensions/load_balancer`
  to define the Ingress resource in the application's Helm chart, so that you can use it.

* Virtual machine (VM) console (if the application is VM-based) – See
  :doc:`/user_guide/package_software/vm_actions` to access the application through
  the VM console. This will only work for a VM-based application.
