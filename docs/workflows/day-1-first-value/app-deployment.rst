.. SPDX-FileCopyrightText: (C) 2025 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Application Deployment (CLI-First)
===================================

Package and deploy containerized or VM-based applications to edge clusters using ``orch-cli``.

Prerequisite
------------

Active cluster required (see :doc:`cluster-lifecycle` for cluster setup).

Step 1 – Add Container Registry (If Using External Registry)
------------------------------------------------------------

.. code-block:: bash

   # Create registry for external images
   orch-cli create registry <REGISTRY_NAME> \
     --url <REGISTRY_URL> \
     --username <USER> \
     --password <PASSWORD>

Replace ``<REGISTRY_NAME>`` (e.g., ``docker-hub``), ``<REGISTRY_URL>`` (e.g., ``https://registry.hub.docker.com``), ``<USER>``, and ``<PASSWORD>`` with your registry credentials.

**Skip this step** if using the built-in Orchestrator registry or public registries without authentication.

Step 2 – Import or Create Application
-------------------------------------

**Option A: Import from Helm Chart:**

.. code-block:: bash

   # Import Helm chart directly
   orch-cli import helmchart <CHART_URL> \
     --name <APP_NAME> \
     --version <APP_VERSION>

Replace ``<CHART_URL>`` (e.g., ``https://charts.bitnami.com/bitnami/wordpress-23.1.28.tgz``), ``<APP_NAME>`` (e.g., ``wordpress``), and ``<APP_VERSION>`` (e.g., ``1.0.0``) with your values.

**Option B: Create application from existing registry:**

.. code-block:: bash

   # Create application definition
   orch-cli create application <APP_NAME> \
     --version <APP_VERSION> \
     --registry <REGISTRY_NAME> \
     --chart-name <CHART_NAME>

Replace ``<CHART_NAME>`` with the Helm chart name in the registry.

Step 2a – Create Application Profile (Optional)
-------------------------------------------------

Profiles define runtime configurations and custom values for applications. This step is optional but recommended for customizing application behavior.

.. code-block:: bash

   # Create a values file with custom Helm values
   cat > my-profile-values.yaml <<EOF
   replicaCount: 2
   service:
     type: ClusterIP
   resources:
     requests:
       memory: "256Mi"
       cpu: "100m"
   EOF

   # Create the application profile
   orch-cli create profile <APP_NAME> <APP_VERSION> <PROFILE_NAME> \
     --display-name '<DISPLAY_NAME>' \
     --description '<DESCRIPTION>' \
     --chart-values my-profile-values.yaml

**Skip this step** if you only need the default profile provided with the application.

**Optional: Add parameter templates for runtime customization:**

.. code-block:: bash

   orch-cli create profile <APP_NAME> <APP_VERSION> <PROFILE_NAME> \
     --display-name '<DISPLAY_NAME>' \
     --description '<DESCRIPTION>' \
     --chart-values my-profile-values.yaml \
     --parameter-template env.REPLICA_COUNT=string:"Number of replicas":"2"

Step 4 – Create Deployment Package
----------------------------------

.. code-block:: bash

   # Create deployment package referencing the application
   orch-cli create deployment-package <PACKAGE_NAME> \
     --version <PACKAGE_VERSION> \
     --application <APP_NAME>:<APP_VERSION>

Replace ``<PACKAGE_NAME>`` (e.g., ``web-stack``) and ``<PACKAGE_VERSION>`` (e.g., ``1.0``) with your package details.

**Add multiple applications to one package:**

.. code-block:: bash

   orch-cli create deployment-package <PACKAGE_NAME> \
     --version <PACKAGE_VERSION> \
     --application <APP1_NAME>:<APP1_VERSION> \
     --application <APP2_NAME>:<APP2_VERSION>

Step 5 – Create Deployment
--------------------------

**Option A: Deploy to specific cluster:**

.. code-block:: bash

   # Deploy package to target cluster
   orch-cli create deployment <DEPLOYMENT_NAME> \
     --deploymentpackage <PACKAGE_NAME>:<PACKAGE_VERSION> \
     --cluster <CLUSTER_NAME>

Replace ``<DEPLOYMENT_NAME>`` (e.g., ``wordpress-prod``) and ``<CLUSTER_NAME>`` with your deployment and cluster names.

**Option B: Deploy using metadata matching:**

.. code-block:: bash

   # Deploy to all clusters matching criteria
   orch-cli create deployment <DEPLOYMENT_NAME> \
     --deploymentpackage <PACKAGE_NAME>:<PACKAGE_VERSION> \
     --metadata environment=production,region=us-west

Metadata-based deployments automatically target all clusters with matching labels.

**Customize deployment with override values:**

.. code-block:: bash

   orch-cli create deployment <DEPLOYMENT_NAME> \
     --deploymentpackage <PACKAGE_NAME>:<PACKAGE_VERSION> \
     --cluster <CLUSTER_NAME> \
     --override replicaCount=3 \
     --override service.type=LoadBalancer

Step 6 – Monitor Deployment Status
----------------------------------

**List all deployments:**

.. code-block:: bash

   orch-cli list deployments

**Get deployment details:**

.. code-block:: bash

   orch-cli get deployment <DEPLOYMENT_NAME>

Deployment transitions: ``pending`` → ``deploying`` → ``deployed`` → ``running``.

Expected: Once ``running``, applications are active on target clusters.

Step 7 – Update Deployment (Optional)
-------------------------------------

.. code-block:: bash

   # Update application version
   orch-cli update application <APP_NAME> --version <NEW_VERSION>

   # Update deployment package
   orch-cli update deploymentpackage <PACKAGE_NAME> \
     --version <NEW_PACKAGE_VERSION> \
     --application <APP_NAME>:<NEW_VERSION>

   # Trigger redeployment
   orch-cli update deployment <DEPLOYMENT_NAME> \
     --deploymentpackage <PACKAGE_NAME>:<NEW_PACKAGE_VERSION>

Step 8 – Delete Deployment Resources
------------------------------------

.. code-block:: bash

   # Delete deployment (removes from clusters)
   orch-cli delete deployment <DEPLOYMENT_NAME>

   # Clean up deployment package
   orch-cli delete deploymentpackage <PACKAGE_NAME> --version <PACKAGE_VERSION>

   # Remove application (if no longer needed)
   orch-cli delete application <APP_NAME> --version <APP_VERSION>

   # Remove registry (if no longer needed)
   orch-cli delete registry <REGISTRY_NAME>

Alternative: Using YAML Files with ``orch-cli upload``
---------------------------------------------------------

Instead of using multiple CLI commands, you can define applications, profiles, and deployment packages as YAML files and upload them in a single operation. This approach simplifies deployment for complex multi-application scenarios.

**Create YAML configuration files:**

1. **registry.yaml** – Define container registry:

.. code-block:: yaml

   specSchema: "Registry"
   schemaVersion: "0.1"
   name: my-registry
   rootUrl: "https://registry.example.com"
   registryType: "image"
   username: "<USERNAME>"
   authToken: "<AUTH_TOKEN>"

2. **application.yaml** – Define application with profiles:

.. code-block:: yaml

   specSchema: "Application"
   schemaVersion: "0.1"
   name: my-app
   version: "1.0.0"
   description: "My application"
   chartName: my-app
   chartVersion: "1.0.0"
   helmRegistry: my-registry
   
   profiles:
     - name: default
       displayName: "Default Configuration"
       description: "Default profile"
       valuesFileName: default-values.yaml
     - name: production
       displayName: "Production Configuration"
       description: "Production profile with high availability"
       valuesFileName: prod-values.yaml

3. **deployment-package.yaml** – Bundle applications with deployment profiles:

.. code-block:: yaml

   specSchema: "DeploymentPackage"
   schemaVersion: "0.1"
   name: my-package
   version: "1.0.0"
   description: "Complete application stack"
   
   applications:
     - name: my-app
       version: "1.0.0"
   
   deploymentProfiles:
     - name: default-profile
       displayName: "Default Deployment"
       applicationProfiles:
         - application: my-app
           profile: default
     - name: production-profile
       displayName: "Production Deployment"
       applicationProfiles:
         - application: my-app
           profile: production

4. **Profile values files** (default-values.yaml, prod-values.yaml):

.. code-block:: yaml

   # default-values.yaml
   replicaCount: 1
   service:
     type: ClusterIP

   # prod-values.yaml
   replicaCount: 3
   service:
     type: LoadBalancer
   resources:
     requests:
       memory: "512Mi"
       cpu: "500m"

**Upload all resources at once:**

.. code-block:: bash

   # Upload all YAML files from a directory
   orch-cli upload /path/to/yaml/files/

   # Or upload individual files
   orch-cli upload registry.yaml
   orch-cli upload application.yaml
   orch-cli upload deployment-package.yaml

Then proceed to Step 5 (Create Deployment) using the uploaded package.

**Benefits of YAML approach:**

- Define complete configuration in version-controllable files
- Reuse configurations across multiple clusters
- Package and share entire application stacks
- Simplify deployment for multi-application scenarios
- Easy to maintain and update all resources together

See Also
--------

- :doc:`../../orch-cli/command-groups/applications` — Application command reference
- :doc:`../../user_guide/package_software/index` — Application deployment guide
- :doc:`cluster-lifecycle` — Cluster deployment
- :doc:`../../orch-cli/command-groups/infra` — Infrastructure command reference
- :doc:`../../orch-cli/command-groups/maintenance` — Maintenance command reference