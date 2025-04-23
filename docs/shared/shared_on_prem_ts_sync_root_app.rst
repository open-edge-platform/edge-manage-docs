Resolving Incomplete Component Deployment
=========================================

Slow network connections or failures may cause the ArgoCD retry limit to
be reached, and some applications may not deploy successfully.

Reset the ``root-app``
-------------------------

#. Run the command below to find the IP address for ArgoCD tool.

   .. code-block:: shell

      kubectl get svc -n argocd -o json argocd-server|jq '.status.loadBalancer.ingress[0].ip'
      "xx.xx.xx.xx"

#. Run the command below to find the ArgoCD password.

   .. code-block:: shell

      kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath={.data.password}|base64 -d
      <password>

#. From a browser, open the ArgoCD IP address.
#. Log in using ``admin`` as the username, and the password from the earlier step.
#. Open the ``root-app`` application and check its status.
#. Click **Sync** > **Synchronize** to trigger an application update.
