EMF Cloud Installer Creation Guide
==================================

This guide explains the procedure to be able to create custom EMF cloud installer
with code from specific branch in `EMF repo <https://github.com/open-edge-platform/edge-manageability-framework>`_

System Requirements
~~~~~~~~~~~~~~~~~~~

1. Ubuntu 22.04 or 24.04 System

2. Install below mentioned software tools on the System

- asdf (>= 0.16.0)
- golang (>= 1.24.4)
- mage
- terraform-docs (= 0.17.0)
- docker

Steps to Create Custom EMF Cloud Installer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Clone the EMF repository

.. code-block:: bash

   git clone https://github.com/open-edge-platform/edge-manageability-framework.git
   cd edge-manageability-framework

2. Checkout the specific branch

.. code-block:: bash

   git checkout <branch_name>

3. Build the EMF cloud installer

.. code-block:: bash

   mage installer:build

4. Package the installer

.. code-block:: bash

   mage installer:bundle

5. The custom EMF cloud installer will be available in the `_build` directory in .tgz format.

6. You can push the installer to your own registry and pull it from there for further consumption
   or directly start using it locally. For EMF cloud deployment with installer, please follow the official
   `documenation guide <https://docs.openedgeplatform.intel.com/edge-manage-docs/3.1/deployment_guide/cloud_deployment/cloud_get_started/cloud_start_installer.html#>`_
