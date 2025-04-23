Resolving Incomplete Component Deployment
===========================================================

Slow network connections or failures may cause the ArgoCD\* tool's retry limit to be reached, and some applications may not deploy successfully.

Reset the ``root-app``
-------------------------

#. Access the ArgoCD tool at ``https://argocd.<clusterDomain>``, for example, ``https://argocd.staging.espdstage.infra-host.com``.

#. Run the following command to find the ArgoCD password:

   .. code-block:: shell

      kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath={.data.password}|base64 -d
      <password>

#. Enter the ArgoCD tool URL in the browser.
#. Log in using ``admin`` as the username, and the password from the earlier step.
#. Open the ``root-app`` application and check its status.
#. Click **Sync** > **Synchronize** to trigger an application update.
