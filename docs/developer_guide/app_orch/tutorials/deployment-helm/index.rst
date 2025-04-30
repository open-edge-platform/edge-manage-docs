Deployment Using Helm* Chart
============================

As outlined in the Developer Workflow, :doc:`/developer_guide/application_developer_workflow/deployment-helm/index`
Helm\* chart is a packaging tool for Kubernetes\* applications.

In this step, we will write Helm charts to deploy the Tutorial Server and the Tutorial Web UI.

While it is possible to write one Helm chart encompassing both applications, it is more
conventional to have a chart for each application.
An alternative approach is to write a single **umbrella chart** that contains both charts as
as **sub-charts**. This more advanced topic is not covered in this tutorial.

.. note::
    Making this structural choice has important implications for how the application is deployed,
    but the |software_prod_name| platform simplifies this process by using a Deployment Package to
    bundle the two applications together. This is covered in :doc:`../deployment-packages/index`.

Name this the "Tutorial Chart" and create it in a new folder outside of the development
directories you created previously.

.. code:: bash

    mkdir tutorial-chart
    cd tutorial-chart
    helm version
    helm create tutorial-server
    helm create tutorial-web-ui

The **helm create** command creates a sample Helm directory structure suitable for deploying
the **NGINX\*** Web Server by default, which works here, since Tutorial Web UI is based on NGINX.

Understanding the Helm Chart
----------------------------

The directory structure of each chart looks like the following:

.. code:: shell

    ├── Chart.yaml
    ├── charts
    ├── templates
    │     ├── NOTES.txt
    │     ├── _helpers.tpl
    │     ├── deployment.yaml
    │     ├── hpa.yaml
    │     ├── ingress.yaml
    │     ├── service.yaml
    │     ├── serviceaccount.yaml
    │     └── tests
    │          └── test-connection.yaml
    └── values.yaml

It contains many resources that will work with Kubernetes and can be viewed using the
**helm template** command (for `tutorial-server` it will be similar for `tutorial-web-ui`).

.. code:: shell

    helm -n tutorial template --release-name foobar ./tutorial-server

The output in yaml format shows the result of the templates in the **templates** directory
when the values.yaml file is applied to it.

For instance, this snippet from the output shows what each file in the **templates**
folder produces and how it will be rendered in the Kubernetes platform. You can see the creation of
a Service and a ServiceAccount and how the **release-name** and the **namespace** are applied:

.. code:: yaml

    ---
    # Source: tutorial-server/templates/serviceaccount.yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: foobar-tutorial-server
      labels:
        helm.sh/chart: tutorial-server-0.1.0
        app.kubernetes.io/name: tutorial-server
        app.kubernetes.io/instance: foobar
        app.kubernetes.io/version: "1.16.0"
        app.kubernetes.io/managed-by: Helm
    ---
    # Source: tutorial-server/templates/service.yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: foobar-tutorial-server
      labels:
        helm.sh/chart: tutorial-server-0.1.0
        app.kubernetes.io/name: tutorial-server
        app.kubernetes.io/instance: foobar
        app.kubernetes.io/version: "1.16.0"
        app.kubernetes.io/managed-by: Helm
    spec:
      type: ClusterIP
      ports:
        - port: 80
          targetPort: http
          protocol: TCP
          name: http
      selector:
        app.kubernetes.io/name: tutorial-server
        app.kubernetes.io/instance: foobar
    ......

Inspecting the **values.yaml** file shows how the powerful configurability of Helm
allows overriding template behavior without having to adjust the templates. For instance,
the following snippet shows how the image repository, tag and pull policy can be overridden
just by changing the values.yaml file.

.. code:: yaml

    # example
    image:
      repository: nginx
      pullPolicy: IfNotPresent
      tag: ""

    nameOverride: ""
    fullnameOverride: ""

    service:
      type: ClusterIP
      port: 80

A common practice is to create a **values-production.yaml** file that contains values that will
override the inbuilt values.yaml rather than modify it. (You will see this demonstrated later.) Managing different versions of override files is an import part of |software_prod_name| deployment.


In the next section, you will learn how to modify the charts for this tutorial.

.. toctree::
   :hidden:
   :maxdepth: 1

   deployment-helm-tutorial-server
   deployment-helm-tutorial-web-ui
   routing-api-through-nginx
