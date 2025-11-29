
ArgoCD Application Recovery Guide (On-Prem Upgrade)
==================================================

This document outlines the steps to handle ArgoCD applications that are OutOfSync, Degraded, missing, or otherwise require manual intervention during an on-prem upgrade.

Applications and Actions
------------------------

+-----------------------+----------------------------------------------------------------------------------------------------------+
| Application           | Action Required                                                                                          |
+=======================+==========================================================================================================+
| external-secrets      | Sync: Sync from ArgoCD UI. If any CRD or Job is Degraded, delete the CRD/Job and resync.                |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| platform-keycloak     | Sync: Sync from ArgoCD UI. If any CRD or Job is Degraded, delete the CRD/Job and resync.                |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| cluster-manager       | Dependency Check: First check that all platform-keycloak applications are Healthy and Synced.           |
|                       | If not, sync platform-keycloak first. Then, if any cluster-manager Job is OutOfSync or Degraded,       |
|                       | delete the job and resync cluster-manager.                                                               |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| postgresql-secret     | If Missing during upgrade deployment: Sync the root-app application first. Then, restart upgrade deploy script. |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| infra-external        | Ensure it is synced; if Degraded, delete affected resources and resync.                                  |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| namespace-label       | Sync first. If Sync does not work, delete the application and resync root-app.                           |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| wait-istio-job        | Sync first. If Sync does not work, delete the application and resync root-app.                           |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| tenancy-api-mapping   | Sync first. If Sync does not work, delete the application and resync root-app.                           |
+-----------------------+----------------------------------------------------------------------------------------------------------+
| tenancy-datamodel     | Sync first. If Sync does not work, delete the application and resync root-app.                           |
+-----------------------+----------------------------------------------------------------------------------------------------------+

General Notes
-------------

1. Sync = Apply + Delete if needed:
   - First, sync the application from ArgoCD.
   - If any CRD or Job remains Degraded, delete it and perform a resync.
2. Changes should be performed one application at a time to avoid cascading issues.
3. After performing the action, verify the application reaches Healthy and Synced.
4. Dependency Handling: Always check dependent applications (e.g., platform-keycloak) are synced before proceeding with dependent apps (e.g., cluster-manager).

On-Prem Upgrade Guidelines
--------------------------

1. During upgrades, applications may temporarily become OutOfSync, Degraded, or missing.
2. Wait Period: Allow a limited time (e.g., 5–10 minutes) for self-recovery.
3. After Timeout:
   - Apply the sync logic (Sync -> Delete CRD/Job if Degraded -> Resync) for most applications.
   - Special case: For namespace-label, wait-istio-job, tenancy-api-mapping, try Sync first. If Sync does not work, delete the application and resync root-app.
4. Confirm each application is Healthy and Synced before proceeding with the upgrade.

Recommended Workflow (On-Prem Upgrade)
--------------------------------------

1. Start the on-prem upgrade.
2. Monitor ArgoCD UI for OutOfSync, Degraded, or missing applications.
3. Wait for the configured limited time.
4. If the application is still Degraded, OutOfSync, or missing:
   - Sync logic: Sync -> Delete CRD/Job if needed -> Resync (for most apps).
   - Cluster-manager special logic:
     1. Check platform-keycloak is Healthy and Synced.
     2. If not, sync platform-keycloak first. Delete any Degraded Jobs in platform-keycloak and resync.
     3. Then apply the same logic to cluster-manager: delete any Degraded Jobs and resync.
   - Special case: For namespace-label, wait-istio-job, tenancy-api-mapping, try Sync first; if it does not work, delete the application and resync root-app.
   - postgresql-secret missing: Sync the main application first, then apply Sync -> Delete CRD/Job if Degraded -> Resync.
5. Verify the application is Healthy and Synced before moving on.


Known Issues
============

- **Cluster deletion hangs** for clusters originally installed on **3.1.3** (ITEP-82277).

- **Manual datamodel deletion** may be required if the latest OS profile is not fetched after the upgrade:

  .. code-block:: bash

     kubectl delete application tenancy-api-mapping -n onprem
     kubectl delete application tenancy-datamodel -n onprem
     kubectl delete deployment -n orch-infra os-resource-manager
     next sync root-app

- For **PXE boot certificate issues**, restart the certificate and dkam pods, then wait for the updated certificate to propagate:

  .. code-block:: bash

     kubectl delete secret tls-boots -n orch-boots
     kubectl delete secret boots-ca-cert -n orch-gateway
     kubectl delete secret boots-ca-cert -n orch-infra
     kubectl delete pod -n orch-infra -l app.kubernetes.io/name=dkam 2>/dev/null

After completing the above steps, **wait approximately 5 minutes** for dkam to update the latest certificates and dependent packages.
