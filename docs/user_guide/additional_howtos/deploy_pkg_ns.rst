


Create Deployment Namespace Definitions
======================================================

This section describes how to define namespaces with labels and annotations in
a deployment package, and upload the YAML file in the web ui.

If your application requires a namespace resource to be created before any
other resource then you can specify a list of namespaces with optional labels
and annotations in the deployment package. During the deployment, any defined
namespace including the labels and annotations will be created.

The example below shows a deployment-package.yaml file content with namespaces definition:

.. code:: yaml

   # deployment-package.yaml
   ---
   specSchema: "DeploymentPackage"
   schemaVersion: "0.1"
   $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

   name: "nginx-app"
   description: "NGINX"
   version: "0.1.0"

   artifacts:
   - name: "intel-icon"
      purpose: "icon"

   applications:
   - name: "nginx"
      version: "0.1.0"

   namespaces:
   - name: "nginx-namespace"
      labels:
      nginx-label-key: "nginx-label-value"
      annotations:
      nginx-ann-key: "nginx-ann-value"

   deploymentProfiles:
   - name: "testing-default"
      applicationProfiles:
      - application: "nginx"
         profile: "default"
   - name: "testing-three-replicas"
      applicationProfiles:
      - application: "nginx"
         profile: "three-replicas"

.. list-table::
   :widths: 2, 5
   :header-rows: 1

   * - Field
     - Description

   * - Namespaces
     - A list of namespace definitions to be created before any resource is deployed

   * - Name
     - **<Required>** The name of the namespace to be created

   * - Labels
     - **<Optional>** A list of labels to be added to the created namespace

   * - Annotations
     - **<Optional>** A list of annotations to be added to the created namespace

.. note::
   You cannot :doc:`create a deployment package </user_guide/package_software/add_deploy_pack>`
   with namespaces defined in the web ui. You need to create the YAML file and then
   :doc:`import the deployment package YAML file </user_guide/package_software/import_deployment>`
   into the web ui.
