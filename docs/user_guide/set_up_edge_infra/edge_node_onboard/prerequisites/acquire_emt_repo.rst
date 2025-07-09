.. _acquire_emt_repo:

Acquiring the Edge Microvisor Toolkit repository URL path from Edge Orchestrator API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For Edge Microvisor Toolkit, the repository URL path of the certificate can
be acquired from Edge Orchestrator API with the following command, where `PROFILE_NAME`
is set to the OS Profile name you are trying to install (e.g. `microvisor-nonrt`, see
:doc:`/user_guide/advanced_functionality/view_os_profiles`):

.. note::

   To interact with Edge Orchestrator API, you must authenticate with a user who is
   part of the Edge Manager Group <./../../shared/shared_iam_groups.html#project-id-host-manager-group>`__ and obtain a JWT token
   used here as `JWT_TOKEN` variable (see `Obtaining a JSON Web Token (JWT) <./../../../shared/shared_gs_iam.html#obtaining-a-json-web-token-jwt>`__ for instructions).

   The variables `CLUSTER_FQDN` are `PROJECT_NAME` should be the same as used
   for obtaining the `JTW_TOKEN` value.

.. code-block:: bash

   export PROFILE_NAME=<OS Profile name to be installed>
   # example:
   # export PROFILE_NAME="microvisor-nonrt"
   export MICROVISOR_REPO_URL=$(curl -k -X GET https://api.${CLUSTER_FQDN}/v1/projects/${PROJECT_NAME}/compute/os \
         -H "accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT_TOKEN}" \
         | jq -r ".OperatingSystemResources[] | select(.profileName==\"${PROFILE_NAME}\") | .repoUrl" | sed 's/\.raw\.gz$//')
