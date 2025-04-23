===============
Argo* CD Issues
===============

Here is a list of common Argo* CD issues and tips to resolve them.

Application out of sync
=======================

- Check the error message in the ``root-app``

  - If it says *Failed to retry after 5 attempts*, hit *Sync* again.

- Check the latest synced app

  - `root-app` timeout usually means the last app takes too long to become
    ready.

Application stuck in *progressing*
==================================

- Go to the app and check the resource that's *progressing*.
- Most of the time this is due to a pod not being ready. Check the pod log to
  determine the reason.

Application stuck in *deleting*
===============================

- Terminate any previous *Sync* operation. A *Delete* operation will be queued
  if there is a *Sync* going on.
- If the deletion is still stuck, check the Kubernetes finalizer of the
  remaining resources and see if the finalizer is blocking.

Application refresh deadline exceeded
=====================================

- In most cases, Argo CD will automatically sync with the cluster and try to
  correct live manifests that are inconsistent with desired manifests.
- In a very rare condition when Argo CD is under load, we noticed an issue
  where Applications are out of sync even after a manual trigger of Hard
  Refresh and Sync. The log of argocd-server shows application refresh deadline
  exceeded.
- Workaround: Argo CD should recover after the restart of argocd-server and
  argocd-application-controller pods.
