Troubleshooting Release Service Token Issues
================================================================

Prerequisites
----------------------------------------------------

* Ability to access the release service login page.
* Ability to access the Kubernetes\* cluster

Identify the Release Service Token Issue
----------------------------------------------------

If you encounter one of these error messages:

* `Unable to pull any helm charts or container images from the release service.`
* `The token-refresh component is not working as expected (Degraded state).`

You may have a problem with the release service token.

To verify this, use the following command to get the release service token:

.. code-block:: shell

   $ kubectl get secret -n orch-secret release-service-token -o jsonpath='{.data.token}' | base64 -d

Once you get the token, you can check if token is valid by using the following websites:

* https://jwt.io/
* https://jwt.ms/

If the token is invalid, you may need to update the token.

Update the Release Service Token
----------------------------------------------------

To update the release service token for on-prem deployment, follow these steps:

1. Get a new refresh token:

   Go to the release service login page and log in with your credentials.

   https://registry-rs.edgeorchestration.intel.com/oauth/login

   After logging in, you will be redirected to the token page. Copy the refresh token.

#. Update the token in the secret:

   Use the following command to update the token in the secret (Replace ``"the refresh token"`` with the new refresh token from step 1):

   .. code-block:: shell

      $ kubectl -n orch-secret delete secret azure-ad-creds --ignore-not-found
      $ kubectl apply -f - <<EOF
      apiVersion: v1
      kind: Secret
      metadata:
         name: azure-ad-creds
         namespace: orch-secret
      stringData:
         refresh_token: "the refresh token"
      EOF

#. Trigger the external secret operator to update the token by deleting
   the external secret:

   .. code-block:: shell

      $ kubectl delete externalsecret.external-secrets.io -n orch-secret token-refresh

#. Once the external secrets is deleted, ArgoCD will create a new one which
   will trigger the token refresh. You can verify this with the following command:

   .. code-block:: shell

      $ kubectl get externalsecret.external-secrets.io -n orch-secret token-refresh

#. You can also verify the token stored in the secret by redoing the
   `Identify the Release Service Token Issue <./shared_ts_rs_token.html#identify-the-release-service-token-issue>`__ step.
