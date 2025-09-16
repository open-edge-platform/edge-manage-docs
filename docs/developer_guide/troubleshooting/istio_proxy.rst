==============================
istio-proxy not being deployed
==============================

Symptom
=======

When deploying Istio with sidecar injection enabled, the istio-proxy container
fails to start with an error similar to the following:

  .. code-block:: bash

    Error: failed to start SDS server: failed to start workload secret manager too many open files


Cause
=====

This is linked to a known issue with the default value of `fs.inotify.max_user_instances`
on some Linux distributions, including Ubuntu. The default value is
often set to 128, which can be too low for environments with many pods or services that
require file system notifications: https://github.com/istio/istio/issues/55915

Preconditions
=============

- The Host is up and running.
- Some pods show issues with istio-proxy not being deployed.

Steps
=====

- On the host where istio-proxy is not being deployed, check the current value of `fs.inotify.max_user_instances`:

  .. code-block:: bash

    sysctl fs.inotify.max_user_instances

- If the value is 128, increase it to something higher, e.g., 1024:

  .. code-block:: bash

    sudo sysctl -w fs.inotify.max_user_instances=1024

- Confirm the change:

  .. code-block:: bash

    sysctl fs.inotify.max_user_instances
