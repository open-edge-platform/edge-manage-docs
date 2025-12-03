EMF Argo CD Deployment Flow
===========================

This document explains how Edge Manageability Framework (EMF) is deployed through Argo CD using the cluster profile file:
   ``orch-configs/clusters/cluster.yaml`` (e.g. ``onprem.yaml`` or site-specific copy).

1. What the Cluster Profile Is
------------------------------

The cluster profile (``cluster.yaml`` / ``onprem.yaml``) is consumed by the EMF Root (App-of-Apps) Argo CD Application. It:

* Layers multiple ``orch-configs/profiles/*.yaml`` files (``root.clusterValues``)
* Injects globals for all child Applications
* Applies post-template override patches (``postCustomTemplateOverwrite``)
* Declares repository, revision, project, domain, and feature toggles

It is **not** a single Helm chart values file. It orchestrates multiple Argo CD Applications.

2. High-Level Flow
------------------

#. Install Argo CD (bootstrap).
#. Root Application loaded (points to repo + profile file).
#. ``root.clusterValues`` processed in order (last wins).
#. Aggregated values generate child Applications (platform, o11y, security, Gitea, utilities).
#. ``postCustomTemplateOverwrite`` applies patch-level overrides (e.g. MetalLB annotations).
#. Argo CD syncs (autosync usually enabled).
#. Components reconcile until ``Healthy``.

3. Field Reference (Customer Relevant)
--------------------------------------

``root.useLocalValues``
  Boolean. If true, overwrites remote values with local ones.

``root.clusterValues``
  Ordered list of profile YAMLs. Order matters (last overrides previous).

Typical ordering pattern::

  enable-* feature toggles
  proxy-* (immediately after enable set if used)
  profile-* (functional bundle)
  o11y / resource / alerting / artifact / mode
  self-reference of cluster file (optional final overrides)

``argo.project``
  Argo CD Project name.

``argo.namespace``
  Namespace for root + shared infra applications.

``argo.clusterName``
  Logical identifier (labels, UI grouping).

``argo.clusterDomain``
  Base DNS suffix (e.g. ``web-ui.<clusterDomain>``).

``argo.utilsRepoURL`` / ``argo.deployRepoURL``
  Git repositories (HTTPS/SSH) for utilities and deployment sources.

``argo.utilsRepoRevision`` / ``argo.deployRepoRevision``
  Branch / tag / commit pinning.

``argo.targetServer``
  Kubernetes API endpoint (usually ``https://kubernetes.default.svc``).

``argo.autosync``
  Enables automated sync + optional prune/self-heal (when configured).

``argo.o11y.dedicatedEdgenodeEnabled``
  Moves observability workloads to a designated node.

``argo.o11y.sre.customerLabel``
  Injects SRE/customer identifier into metrics/dashboards.

``orchestratorDeployment.targetCluster``
  Selector (future multi-cluster extensibility).

``postCustomTemplateOverwrite.*``
  Patch sections to modify generated manifests (e.g. MetalLB service annotations).

4. Profile Layering Strategy
----------------------------

Profiles under ``orch-configs/profiles/`` are small, composable fragments:

* ``enable-*.yaml`` – Feature toggles (platform, UI, o11y, edge infra, orchestrators, kyverno, sre)
* ``proxy-*.yaml`` – Proxy egress (must follow enable group)
* ``profile-*.yaml`` – Opinionated bundles (``profile-onprem.yaml``, ``profile-oxm.yaml``)
* ``o11y-*.yaml`` / ``resource-*.yaml`` – Sizing, retention, tuning
* ``artifact-*.yaml`` – Artifact service authentication modes
* ``alerting-*.yaml`` – Email / notifications

Best practice: start with a base profile (e.g. ``profile-onprem.yaml``) then append site-specific overlays.

5. Adding / Removing Features
-----------------------------

Disable Kyverno:

* Remove ``orch-configs/profiles/enable-kyverno.yaml`` from ``clusterValues`` or introduce a profile that clears its flags.

Enable HTTP proxy:

* Insert (immediately after enable group)::

    - orch-configs/profiles/proxy-http.yaml

Replace/remove ``proxy-none.yaml``.

6. Creating a New Cluster Profile
---------------------------------

#. Copy ``onprem.yaml`` → ``site-a.yaml`` (or edit in place).
#. Adjust ``clusterDomain``, Git repository URLs, alerting contact.
#. Remove unnecessary ``enable-*`` entries (retain required base: platform, edgeinfra, UI if UI needed).
#. Commit to your controlled repository.
#. Bootstrap root app referencing the new profile file.

7. Direct Deployment Feasibility
--------------------------------

Minimal manual bootstrap:

* Install Argo CD.
* Ensure project + namespace exist (or use ``CreateNamespace`` sync option).
* Apply root Application manifest referencing the cluster profile file path.
* Argo CD reconciles remaining components automatically.

8. Custom DNS & VIP Integration
-------------------------------

``clusterDomain`` drives internal and external FQDNs. MetalLB or external load balancer assignments depend on:

* Service annotations inserted via ``postCustomTemplateOverwrite``.
* Presence of IP pools (MetalLB CRs: ``IPAddressPool`` / ``L2Advertisement``).

9. Security & Git Access
------------------------

* Internal Gitea recommended for air-gapped or controlled flows.
* Mirror external repos and update ``deployRepoURL`` / ``utilsRepoURL``.
* Signed commits (optional) can be enforced via repo policy.
* Secrets (Keycloak admin, Gitea credentials, PostgreSQL) injected early by installation tooling or profile-driven automation.

10. Common Customization Points
-------------------------------

* Resource tuning: add ``resource-custom.yaml`` after defaults.
* Email alerting: include ``alerting-emails.yaml`` + provide SMTP secret.
* Proxy egress: swap in appropriate ``proxy-*.yaml`` profile.
* Minimal provisioning (OXM): replace ``profile-onprem.yaml`` with ``profile-oxm.yaml`` and drop UI / SRE / optional modules.

11. Validation Checklist Before First Sync
------------------------------------------

* All ``clusterValues`` file paths exist (case-sensitive).
* Git URLs reachable from cluster network (or internal mirror).
* MetalLB pools applied (if LoadBalancer services required).
* Certificates strategy defined (Traefik / cert-manager / external).
* Correct proxy profile selected (avoid stale ``proxy-none`` when egress blocked).
* ``clusterDomain`` resolvable or planned DNS entries prepared.

12. Failure & Recovery Behavior
-------------------------------

* Missing/invalid profile → Root Application ``Degraded``.
* Fix YAML, commit, Argo CD re-syncs (auto or manual).
* Bad patch in ``postCustomTemplateOverwrite`` → targeted Application fails; remove or correct and re-sync.

13. Profile Ordering Sensitivity
--------------------------------

Ordering is **authoritative**. A late file can override an earlier enabling flag. Keep an auditable diff of ordering changes.

14. Example (On-Prem Profile Stack)
-----------------------------------

.. code-block:: yaml

   root:
     useLocalValues: false
     clusterValues:
       - orch-configs/profiles/enable-platform.yaml
       - orch-configs/profiles/enable-o11y.yaml
       - orch-configs/profiles/enable-kyverno.yaml
       - orch-configs/profiles/enable-app-orch.yaml
       - orch-configs/profiles/enable-cluster-orch.yaml
       - orch-configs/profiles/enable-edgeinfra.yaml
       - orch-configs/profiles/enable-full-ui.yaml
       - orch-configs/profiles/enable-onprem.yaml
       - orch-configs/profiles/enable-sre.yaml
       - orch-configs/profiles/proxy-none.yaml
       - orch-configs/profiles/profile-onprem.yaml
       - orch-configs/profiles/alerting-emails.yaml
       - orch-configs/profiles/artifact-rs-production-noauth.yaml
       - orch-configs/profiles/o11y-onprem.yaml
       - orch-configs/profiles/enable-osrm-manual-mode.yaml
       - orch-configs/profiles/resource-default.yaml
       - orch-configs/clusters/onprem.yaml

15. Operational Tips
--------------------

* Inspect rendered manifests: ``argocd app get root-app -o yaml``.
* Use labels to filter health: ``argocd app list --project <project>``.
* Add a final ``site-overrides.yaml`` for late-stage patches.
* Keep commit history clear—each profile/order change in isolated commits.

16. Known Constraints
---------------------

* No automatic conflict detection in layering.
* Some feature dependencies implicit (e.g. UI expects platform services).
* Changing ``clusterDomain`` post-issuance requires DNS + certificate renewal.
* Air-gapped: ensure image mirroring before first sync.

17. Quick Start (Customer)
--------------------------

#. Clone or fork repository.
#. Edit ``onprem.yaml`` (domain, Git URLs, proxy, MetalLB).
#. Bootstrap Argo CD + Root Application referencing customized repo + revision.
#. Wait for all Applications = ``Synced`` / ``Healthy``.
#. Access UI at: ``web-ui.<clusterDomain>``.

18. One-Step Argo CD Installer Guide
------------------------------------

Prereqs: Kubernetes cluster, ``kubectl`` + ``helm``, customized repo with edited ``onprem.yaml`` if any custome related profile update require .
