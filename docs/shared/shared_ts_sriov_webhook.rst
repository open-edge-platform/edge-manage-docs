Troubleshooting SRIOV Extension Failed State
=================================================

There is a known issue where the SRIOV extension may enter a failure state due to permission settings in recent images. Despite this, the UI may show the deployment as "Running." We recommend applying a workaround until we resolve the root cause in a future release.


Check for SRIOV Failed State
---------------------------------

Verify whether SRIOV extension pod is in a Running or Failed state.

Run the following commands to verify Failed state:

   .. code-block:: shell

      $ kubectl get pods -n sriov-network-operator
      NAME                                                            READY   STATUS                       RESTARTS   AGE
      b-224edb04-cf6e-57c7-9b01-5ba13098a6cd-sriov-85bbd564d7-spb6q   1/1     Running                      0          84s
      network-resources-injector-dd7lw                                0/1     CreateContainerConfigError   0          83s
      operator-webhook-6dqww                                          0/1     CreateContainerConfigError   0          83s
      sriov-network-config-daemon-jk46r                               1/1     Running                      0          83s

      $ kubectl describe pod operator-webhook-6dqww -n sriov-network-operator
        Warning  Failed          21s (x12 over 2m17s)  kubelet            Error: container has runAsNonRoot and image will run as root (pod: "operator-webhook-6dqww_sriov-network-operator(79096e45-1e29-4ef8-bda8-b08176a6911c)", container: webhook-server)


Workaround to Resolve the Issue
---------------------------------

If the SRIOV extension fails to start due to permission settings, administrators
are advised to implement this temporary workaround. The SRIOV extension should
restart and reach a Running state after this workaround.

Delete the operator webhook config and disable the injector by running the
following commands:

   .. code-block:: shell

      $ kubectl delete validatingwebhookconfigurations sriov-operator-webhook-config
      validatingwebhookconfiguration.admissionregistration.k8s.io "sriov-operator-webhook-config" deleted

      $ kubectl patch sriovoperatorconfigs.sriovnetwork.openshift.io -n sriov-network-operator default  --type=merge -p '{"spec":{"enableInjector":false,"enableOperatorWebhook":false}}'
      sriovoperatorconfig.sriovnetwork.openshift.io/default patched


.. note::
   Verify that all SRIOV pods are running after the workaround is applied.
   There should be two pods running in the sriov-network-operator namespace. This workaround needs to be applied for every new SRIOV deployment.
