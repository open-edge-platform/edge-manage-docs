.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Application Management
======================

Manage container registries, applications, deployment packages, and deployments.

Registry Management
-------------------

**Create registry:**

.. code-block:: bash

   orch-cli create registry <REGISTRY_NAME> --root-url <URL> --registry-type helm
   # Example: orch-cli create registry myregistry --root-url https://charts.example.com --registry-type helm

**List registries:**

.. code-block:: bash

   orch-cli list registries

**Get registry details:**

.. code-block:: bash

   orch-cli get registry <REGISTRY_NAME>

**Delete registry:**

.. code-block:: bash

   orch-cli delete registry <REGISTRY_NAME>

Applications
------------

**Create application:**

.. code-block:: bash

   orch-cli create application <APP_NAME> <VERSION> \
     --chart-name <CHART_NAME> \
     --chart-version <CHART_VERSION> \
     --chart-registry <REGISTRY_NAME>
   # Example: orch-cli create application myapp v1.0.0 --chart-name myapp --chart-version 1.0.0 --chart-registry myregistry

**List applications:**

.. code-block:: bash

   orch-cli list applications

**Get application details:**

.. code-block:: bash

   orch-cli get application <APP_NAME>

**Update application:**

.. code-block:: bash

   orch-cli set application <APP_NAME> <VERSION> \
     --chart-name <CHART_NAME> \
     --chart-version <CHART_VERSION> \
     --chart-registry <REGISTRY_NAME> \
     --description "<DESCRIPTION>"

**Delete application:**

.. code-block:: bash

   orch-cli delete application <APP_NAME>

Application Profiles
--------------------

**Create application profile:**

.. code-block:: bash

   orch-cli create profile <APP_NAME> <VERSION> <PROFILE_NAME> \
     --display-name "<DISPLAY_NAME>" \
     --chart-values <VALUES_YAML>

**List profiles for application:**

.. code-block:: bash

   orch-cli list profile <APP_NAME> <VERSION>

**Get profile details:**

.. code-block:: bash

   orch-cli get profile <APP_NAME> <VERSION> <PROFILE_NAME>

**Delete profile:**

.. code-block:: bash

   orch-cli delete profile <APP_NAME> <VERSION> <PROFILE_NAME>

Deployment Packages
-------------------

**Create deployment package:**

.. code-block:: bash

   orch-cli create deployment-package <PACKAGE_NAME> <VERSION> \
     --application-reference app:vvv

**List deployment packages:**

.. code-block:: bash

   orch-cli list deployment-packages

**Get deployment package:**

.. code-block:: bash

   orch-cli get deployment package <PACKAGE_NAME>

**Export deployment package:**

.. code-block:: bash

   orch-cli export deployment-package <PACKAGE_NAME> <VERSION>

Deployments
-----------

**Create deployment:**

.. code-block:: bash

   orch-cli create deployment <PACKAGE_NAME> <PACKAGE_VERSION> \
     --application-clusterid <APP_NAME>:<APP_VERSION>=<CLUSTER_ID> \
     --display-name "<DEPLOYMENT_NAME>"

**List deployments:**

.. code-block:: bash

   orch-cli list deployments

**Get deployment details:**

.. code-block:: bash

   orch-cli get deployment <DEPLOYMENT_ID>

**Update deployment:**

.. code-block:: bash

   orch-cli set deployment <DEPLOYMENT_ID> \
     --name <NEW_NAME> \
     --application-label <APP_NAME>=<LABEL> \
     --application-namespace <APP_NAME>=<NAMESPACE>

**Upgrade deployment:**

.. code-block:: bash

   orch-cli upgrade deployment <DEPLOYMENT_ID> --package-version <NEW_PACKAGE_VERSION>

**Delete deployment:**

.. code-block:: bash

   orch-cli delete deployment <DEPLOYMENT_ID>

See Also
--------

- :doc:`clusters` — Cluster management
- :doc:`maintenance` — Maintenance and scheduling
- :doc:`infra` — Infrastructure management
- :doc:`iam` — User and organization management
- :doc:`../../workflows/day-1-first-value/app-deployment` — Application deployment workflow
