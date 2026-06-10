.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

.. _rel_notes_2026.1:

Version 2026.1 Release Notes
========================================

Version History/Revision History
-------------------------------------------------------

This is the Release Notes for |software_prod_name| version 2026.1, released
June 15th 2026.

.. note::

   This document refers to |software_prod_name| as the "Product".

Release Highlights
---------------------------

Edge Manageability Framework (EMF) enables you to securely onboard and provision
remote edge devices to a central management plane. Edge Node software provides
infrastructure software configuration profiles that are provisioned onto onboarded
nodes. The 2026.1 release supports two deployment workflows: Edge Infrastructure
Manager (EIM) and vPRO. Application Orchestration and Cluster Orchestration are
not supported in this release.

Key highlights of the 2026.1 release include:

**Infrastructure and Edge Node Software**

* **New:** Added support for provisioning clusters independently of the Cluster
  Orchestrator (CO) for testing, development, and specialised use cases that
  do not require full CO management capabilities. Clusters provisioned this way
  will not appear in the CO dashboard, but their configurations remain bundled
  with host configuration and accessible through ``orch-cli`` commands. For
  full provisioning steps, see `Provisioning Clusters Without the Cluster
  Orchestrator
  <https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/advanced_functionality/provisioning_clusters_without_co.html>`_.

**Edge Manageability Framework Platform Enhancements**

* **New:** Replaced ArgoCD and Gitea-based deployment with a Helmfile-based
  deployment model. The new ``pre-orch.sh`` and ``post-orch-deploy.sh`` scripts
  manage cluster setup and Helm chart lifecycle independently of the Cluster
  Orchestrator (CO) and Application Orchestrator (AO).
* **New:** Added ``pre-orch-backup.sh`` script for pre-upgrade backup of
  PostgreSQL data and Kubernetes secrets, consumed automatically by
  ``post-orch-deploy.sh upgrade``.
* **New:** Introduced two deployment profiles via ``EOM_HELMFILE_ENV``:
  ``onprem-eim`` (full Edge Infrastructure Manager) and ``onprem-vpro``
  (AMT out-of-band only, reduced footprint).

**Out-of-Band Device Management**

Serial‑over‑LAN (SOL) and Keyboard‑Video‑Mouse (KVM) enabled through Intel® Active Management Technology (AMT), provided the target system is vPro®‑enabled and provisioned.

* SOL (Serial Over LAN) Support

  SOL provides a managed text-based console redirection. It is primarily used for
  troubleshooting at the BIOS level or when the operating system is in a command-line state.

  **Function:** It redirects the serial character stream from the remote device to your management console over the network.

  **Best For:** Accessing BIOS/UEFI settings, interacting with Linux terminal consoles, or viewing BSOD/boot-loader text.

* KVM (Keyboard, Video, Mouse) Support

  KVM is the "Remote Desktop" equivalent for out-of-band management.
  Unlike software-based tools (like TeamViewer), Intel AMT KVM works at the hardware level.

  **Function:** It allows you to see the screen and control the input of a remote system during
  the entire boot process, including BIOS and OS loading.

  **Requirements:** KVM is only available on Intel vPro® Enterprise platforms.
  It is generally not available on "Standard Manageability" or "Entry" versions of AMT.

  **Usage:** https://docs.openedgeplatform.intel.com/edge-manage-docs/dev/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide.html

* For Intel® AMT or Intel® Standard Manageability issues see
  :doc:`/user_guide/advanced_functionality/vpro_power_mgt`.

Upgrades from Previous Releases
----------------------------------

Breaking Change Notice
Upgrading from EMF 2026.0 to 2026.1 introduces a breaking change as we shifted from argocd to helm based
approach for deployment. This change requires a complete reinstallation of the product, which includes
deleting and re-provisioning all edge nodes. Please plan accordingly for this upgrade process.

The codebase is Apache software version 2.0 licensed and available on the
Github repository.

For a detailed list of features, see the
:doc:`Overview page </user_guide/index>`
and the `Edge Out-of-Band Manageability README file
<https://github.com/open-edge-platform/edge-out-of-band-manageability/blob/main/README.md>`_.

Known Issues
----------------------------------

The following are known issues in the release. While several known issues and
limitations have been addressed during the 2026.1 release cycle, some have
been carried over from past releases.

EMF deployment
^^^^^^^^^^^^^^

* For on-premises EMF deployment and upgrade issues and workarounds, see the
  `On-Prem Upgrade Guide
  <https://github.com/open-edge-platform/edge-manage-docs/blob/release-2026.1/docs/deployment_guide/cloud_deployment/cloud_how_to/cloud_upgrade.rst>`_.

Device Provisioning
^^^^^^^^^^^^^^^^^^^

* If Out-of-Tree (OOT) driver installation with secure boot option enabled
  fails because of secure boot password request on the edge node hardware,
  reboot the edge node hardware.
* If the edge node reboots during the full-disk encryption (FDE) stage, the
  edge node will try and boot to disk but will then fail because of partial
  encryption. The workaround is to delete the host from Edge Out-of-Band
  Manageability UI and CLI and then re-provision.
* If there are network issues during initial provisioning of the edge node,
  see :doc:`/user_guide/troubleshooting/en_recover`.
* If an edge node fails to boot properly during initial provisioning, see
  :doc:`/user_guide/troubleshooting/hard_disk_boot`.
* Occasionally, logging and metrics are not enabled during deployment. This
  might be because the Docker software pull limit is reached. First, delete
  the edge node (see :doc:`/user_guide/set_up_edge_infra/delete_host`) and
  then re-provision it with a different IP address.
* If several edge nodes are provisioned at the same time from a non-premium
  Docker account, there is a limit of 100 pulls per IP over a four-hour
  window. In this case, upgrade to the premium account or wait to provision
  more edge nodes.

User Experience
^^^^^^^^^^^^^^^^^

* `Let's Encrypt` certificates and Certificate Authority (CA) are deployed
  by default. `Let's Encrypt` poses an issue where if the Certificate
  Authority is changed, the edge nodes will not trust the Edge Out-of-Band
  Manageability (EOM) anymore. In such a case, you must reinstall the edge nodes.
  Advanced users can use their different CAs, therefore avoiding this issue.
* Telemetry Orchestrator services (OpenTelemetry and Mimir) do not have
  role-based access authorization enabled in the southbound interfaces
  towards the edge node.
* If the Product and Keycloak solution are restarted separately or if there
  is a Keycloak signing key rotation, the Product returns error 403. The
  workaround is to log out, close the browser, and wait approximately 15
  minutes and then log back in and retry; the request should succeed as soon
  as the Product refreshes the new signing keys from Keycloak solution, which
  happens periodically and automatically.
* The querying capabilities of Mimir on orchestrator-observability and
  edgenode-observability may occasionally fail due to loss of communication
  between querier and query-frontend. The workaround is a restart of querier
  pod.
* Users created in Keycloak solution must have email address set up to
  properly perform authentication to Grafana Observability Dashboards. Users
  without email set won't be able to access metrics and logs via Grafana UI.


Limitations
---------------------------------------------------------------------

The following are known limitations in this release.

Provisioning Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^

* An edge node cannot be re-provisioned from scratch if it is not deleted
  first from the user interface. Follow the steps in
  :doc:`/user_guide/set_up_edge_infra/delete_host`
  and then re-provision the edge node.
* You cannot perform an initial boot behind a proxy server because the
  Original Equipment Manufacturer (OEM) BIOS does not support HTTPs booting
  behind a proxy server. After you have installed the OS, you can boot behind
  a proxy server. Alternatively, use USB boot.
* The embedded JSON Web Token (JWT) in the EMT (Hook OS replacement) is
  programmed to expire after a maximum of 60 minutes. If there is a delay in
  supplying the login details, the OS provisioning process may fail, which is
  the expected behavior. In such cases, the user must initiate the
  re-provisioning of the edge node.

Hosts and Infrastructure Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* GPU support: GPU metrics collection is not supported yet.
* You can create two sites with the same name under two different regions,
  although this does not cause the nodes to be present when creating clusters.
  Intel recommends that sites have unique, non-overlapping names.
* If Vpro Activation exceeds 2-3 minutes, the host will start displaying an
  error state. However, it will subsequently recover to a healthy status once
  activation completed. Refer to
  :doc:`/user_guide/advanced_functionality/vpro_power_mgt`

Multi-tenancy Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^

* Users should be added to no more than 20 projects. If the observability
  features are not used, then this limit may be raised to 40 projects.
  Exceeding these limits may lead to errors with tokens or headers being too
  large. These limits may be mitigated by creating multiple users and
  partitioning the projects across them such that no user has more than 20
  projects.

User Experience Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* The `Show All` page size for hosts does not work for lists over 100. If you
  have a list of more than 100 hosts in a view, do not set the page size to
  larger than 100.
* Scheduling a recurring maintenance to happen on the last day of the month
  before midnight in a timezone that is behind GMT/UTC, when the schedule is
  after midnight in GMT/UTC causes the maintenance to be scheduled on the 1st
  of the selected month instead of the next month. For example, if you
  schedule a maintenance to repeat every May 31st at 9 pm PDT, the
  maintenance will repeat on May 1st at 9 pm instead of on June 31st. When
  scheduling, be aware of the time zone.
* The "Total Provisioning Time" metric is only available for approximately 15
  days since a node was provisioned.

Recommendations
---------------------

* Users need to maintain fixed IP reservations for each edge node using
  address-to-MAC mapping in their DHCP server for stable functioning of the
  edge node cluster.
* Intel advises against scheduling a major OS upgrade. Intel only supports
  the current Product version on Ubuntu OS 24.04 LTS.
* Wait for some time after the initial Product installation or a full restart
  before provisioning nodes because there are a few components (for example,
  DKAM and Tinkerbell pods) that take about 15 minutes to get to the ready
  state.
* Wait for some time after the initial Product installation or a complete
  system reboot before provisioning nodes. This is because certain components,
  such as DKAM and Tinkerbell pods, need approximately 15 minutes to reach
  the ready state.


Documentation
-------------------------------------------------------------------------------

The Product has complete online documentation.

You can find the online documentation at
https://docs.openedgeplatform.intel.com/edge-manage-docs/main/index.html


System Requirements
-------------------------------------------------------------------------------

You can find the system requirements on the :doc:`/system_requirements/index`
page.
