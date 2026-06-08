Resolving Incomplete Component Deployment
=========================================

Network issues or timeouts during deployment may cause some Helm releases to fail
or remain in a ``pending`` or ``failed`` state.

Redeploy Failed Releases
-------------------------

#. Check the status of all releases:

   .. code-block:: shell

      cd post-orch
      ./post-orch-deploy.sh list

#. For a specific failed chart, re-run the install:

   .. code-block:: shell

      ./post-orch-deploy.sh install <chart-name>

#. To redeploy all charts (idempotent):

   .. code-block:: shell

      ./post-orch-deploy.sh install

#. Monitor progress:

   .. code-block:: shell

      ./watch-deploy.sh
      # or in debug mode:
      ./watch-deploy.sh --debug
