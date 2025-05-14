.. _cloud_resource_settings:

Edge Orchestrator Service Resource Settings
==================================================

.. contents:: Table of Contents
   :depth: 2

Introduction
------------

This document provides instructions on configuring resource settings for the Edge Orchestrator Service. Properly configured resource settings ensure optimal performance and resource utilization in your cluster.

Prerequisites
-----------------

- Ensure you have the ``kubectl`` command-line interface (CLI) installed and configured to access your cluster.

- Commands will be run in the installer container environment, refer to `Start the Installation Environment <../cloud_get_started/cloud_start_installer.html#start-the-installation-environment>`__ for more information.

- You will need to install additional Python\* packages to run the resource settings commands. You can do this by running the following command in the installer container:

  .. code-block:: bash

    orchestrator-admin:~$ sudo apt install python3-yaml

Default Resource Settings
--------------------------

You can find the default resource settings for each service in the ``edge-manageability-framework``.

By default, Intel uses the following resource settings for each service, but you can override them in your cluster definition:

.. code-block:: yaml

  requests:
    cpu: "1m"
    memory: "1Mi"
  limits:
    cpu: "64"
    memory: "64Gi"

For example, you can set the CPU and memory requests for the Traefik\* service with the following values in your cluster definition:

.. code-block:: yaml

  # ... You may have other settings here ...

  argo:
    # ... You may have other settings here ...
    traefik:
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          memory: "4Gi"
          cpu: "4000m"

Automatic Resource Settings
----------------------------

Intel provides an automatic method for setting resource settings for each service based on the resource usage of those services.

You can enable it by using the following command. Note that you must have the ``kubectl`` command installed and configured to access the resource data:

.. code-block:: bash

  orchestrator-admin:~$ cd edge-manageability-framework
  orchestrator-admin:~$ ./tools/resource-limit/manage-resource-limit.py freeze

This command collects resource usage from the cluster and generates resource settings for each service based on the usage. It will also apply the new resource settings to the cluster once they are generated.

You can also find the generated file at ``/tmp/resource-config.yaml``.

Resetting Resource Settings
----------------------------

You can reset the resource settings to their default values by using the following command:

.. code-block:: bash

  orchestrator-admin:~$ cd edge-manageability-framework
  orchestrator-admin:~$ ./tools/resource-limit/manage-resource-limit.py unfreeze

This command will remove the generated resource settings and apply the default resource settings to the cluster.

Troubleshooting
---------------

If you encounter issues while applying resource settings, consider the following steps:

#. Ensure that the ``kubectl`` CLI is installed and configured correctly.

#. Ensure that the required Python packages are installed.

#. Check the logs for any error messages and address them accordingly.

#. Check if the observability stack is running correctly. You can go to ``https://observability-admin.[your cluster domain]`` and check if all metrics are displayed correctly.
