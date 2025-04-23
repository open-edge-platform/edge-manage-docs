Import Deployment Package
=========================

Create YAML File
----------------

Store the content mentioned here in the specified files in a folder on
your local machine and import the folder into the |software_prod_name|
through the Import Deployment Package Steps.


deployment-package.yaml::

   # SPDX-FileCopyrightText: (C) 2025 Intel Corporation
   # SPDX-License-Identifier: Apache-2.0

   specSchema: DeploymentPackage
   schemaVersion: "0.1"
   $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

   description: "My Hello World Deployment Package"
   name: "hello-world-dp"
   displayName: "hello-world-dp"
   version: "0.1.0"

   applications:
    - name: hello-world-app
      version: "0.1.0"

   defaultNamespaces:
    hello-world-app: hello-world

application.yaml::

   # SPDX-FileCopyrightText: (C) 2025 Intel Corporation
   # SPDX-License-Identifier: Apache-2.0

   specSchema: Application
   schemaVersion: "0.1"
   $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

   name: hello-world-app
   version: "0.1.0"
   description: "My hello world app"

   imageRegistry: "harbor-docker-oci"
   helmRegistry: "harbor-helm-oci"
   chartName: "hello-world"
   chartVersion: "0.1.0"

   profiles:
    - name: "default"
      valuesFileName: "hello-world-values.yaml"

hello-world-values.yaml::

   # SPDX-FileCopyrightText: (C) 2025 Intel Corporation
   # SPDX-License-Identifier: Apache-2.0
   ---
   service:
    type: ClusterIP
   replicaCount: 1
   imagePullSecrets:
    - name: '%GeneratedDockerCredential%'

.. note::
  Refer to :doc:`Image Pull Secrets <image_pull_secret>`
  to understand the usage of '%GeneratedDockerCredential%'.

Import Deployment Package Steps
-------------------------------

If you have a YAML file with properties required for the deployment package, you can import it to |software_prod_name| and then set it up for deployment.

To import the deployment package:

1. In the **Deployment Package** page, click **Import Deployment Package**.
   The **Import Deployment Package** page appears:

   .. figure:: images/import_deploy.png
     :scale: 50 %
     :alt: Import deployment package

2. In the **Import Deployment Package** page, you can choose to either drag and drop files or click **Browse Files**, to upload files.

3. Click **Import** to import the file.

After you have imported the deployment package, the package is displayed in the **Deployment Package** list.
