Version 3.1 Release Notes
========================================

Version History/Revision History
-------------------------------------------------------

This is the Release Notes for \ |software_prod_name|\  version 3.1, released
Aug 20 2025.

.. note::

   This document refers to \ |software_prod_name|\  as the "Product".

Release Highlights
---------------------------

Edge Orchestrator is the primary product within the Edge Manageability Framework.

Edge Manageability Framework enables you to securely onboard and provision remote
edge devices to a central management plane, orchestrate Kubernetes\* clusters and
applications across distributed edge, at scale. Edge Node software provides the
profiles of infrastructure software configurations that get provisioned onto an
onboarded node.

The 3.1 release builds upon the first 3.0 open source release adding key functionality.
You can review the general functionality of the system in the
:doc:`3.0 release notes </release_notes/3.0/rel_notes_3.0>`.

Key Highlights of the 3.1 release include, but are not limited to:

* New: Support for Out-of-band management using `Intel AMT/vPRO <https://www.intel.com/content/www/us/en/architecture-and-technology/vpro/vpro-manageability/overview.html>`_.
  Integration of vPro Device Manageability services with EMF, allowing use of
  out-of-band management features. Functionality supported this release include
  Remote Device Power ON/OFF and Remote Device Reboot capabilities.
* Enhanced Provisioning capabilities and improvements
    * New: Scale provisioning of Standalone edge nodes that with Operating system and
      lightweight kubernetes - (OXM Profile). Support for PXE boot along with HTTPs
      and USB boot.
    * New: Support New EMT Desktop virtualization image with advanced GPU SR-IOV and
      Virtualization capabilities.
    * New: Per edge Edge Node configuration through custom cloud-init script,
      to provide fixed IP during provisioning, specific proxies, enabling
      Kubernetes right at the very installation of the nodes or finally
      configuring GPU SRIOV or X11.
    * Update: HookOS has been replaced with a lightweight EMT, ensuring full control
      and optimization of the components used to provision an EN.
    * Update: Support for onboarding edge nodes without Serial number
    * Update: Simplified host provisioning flow in the UI e.g., user can choose the kubernetes cluster to be deployed
      during registration in UI.
* New: Support for Discrete GPU from Intel Battlemage B580(on EMT) and Nvidia P100(on Ubuntu 22.04) along with
  Intel integrated GPU with GPU SR-IOV(with IDV profile in OXM deployment).
* New: Security Compliance of an Edge Node is also now implemented through open CVE
  tracking for installed packages on EMT.
* New: Kubernetes distribution on edge node is migrated from rke2 to k3s
  achieving lightweight deployments in resource-constrained devices.
* New: Vastly improved Application Onboarding
    * Ability to directly import helm charts, thus removing the need to write
      the deployment package for single helm chart applications.
    * Deployment Packages are now directly exportable from the user interface,
      to help portability and debuggability.
    * Deployment packages can now be imported as tar.gz files,
      making them more portable and easy to share.
* New: EMF can now be configured using - orch-cli a command line utility similar to kubectl.
* New: Support for reference applications
    * `Weld Porosity <https://edge-services-catalog-prod-qa.apps1-bg-int.icloud.intel.com/details/?microserviceType=recipe&microserviceNameForUrl=weld-porosity-sample-application>`_
    * `Smart Parking <https://edge-services-catalog-prod-qa.apps1-bg-int.icloud.intel.com/details/?microserviceType=recipe&microserviceNameForUrl=smart-parking>`_
    * `Loitering Detection <https://edge-services-catalog-prod-qa.apps1-bg-int.icloud.intel.com/details/?microserviceType=recipe&microserviceNameForUrl=loitering-detection>`_
* Update: Additionally, efforts have been focusing on Trusted Compute to enable
  customers, benchmark it, continuous monitoring and workload isolation use case
  were enhanced for robustness and adapt to minimal common EMT as trusted OS.

All of the codebase is Apache\* software version 2.0 licensed and available on Github.

For a detailed list of features, see the :doc:`Overview page </user_guide/index>`
and the `Edge Manageability Framework README file <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/README.md>`_.

Upgrades from Previous Releases
----------------------------------

Breaking Change Notice
Upgrading from EMF 3.0 to 3.1 introduces a breaking change on
edge nodes due to a shift in the Kubernetes distribution—from RKE2 to K3s.
As a result, all edge nodes must be re-provisioned during the upgrade
process to ensure compatibility and stability.

Edge Manageability Framework (EMF) version 3.1 supports direct
upgrades from version 3.0 only using `onprem upgrade guide <https://github.com/open-edge-platform/edge-manage-docs/blob/main/docs/deployment_guide/on_prem_deployment/on_prem_how_to/on_prem_upgrade.rst>`_ and `cloud upgrade guide <https://github.com/open-edge-platform/edge-manage-docs/blob/main/docs/deployment_guide/cloud_deployment/cloud_how_to/cloud_upgrade.rst>`_.
Versions earlier than 3.0 are not compatible with the 3.1 upgrade path.


Known Issues
----------------------------------

The following are known issues in the release. While several known issues
and limitations have been addressed during the 3.1 release cycle, some have
been still carried over from past releases.

Provisioning
^^^^^^^^^^^^^

* If Out-of-Tree (OOT) driver installation with secure boot option enabled
  fails because of secure boot password request on the edge node hardware,
  reboot the edge node hardware.
* If the edge node reboots during the full-disk encryption (FDE) stage, the
  edge node will try and boot to disk but will then fail because of partial
  encryption. The workaround is to delete the host from EMF UI/cli and then re-provision.
* If there are network issues during initial provisioning of the edge node,
  see :doc:`/user_guide/troubleshooting/en_recover`.
* If an edge node fails to boot properly during initial provisioning, see
  :doc:`/user_guide/troubleshooting/hard_disk_boot`.
* Occasionally, logging and metrics are not enabled during
  deployment. This might be because the Docker\* software pull
  limit is reached. First, delete the edge node (see
  :doc:`/user_guide/set_up_edge_infra/delete_host`) and then
  re-provision it with a different IP address.
* The default Elastic IP (EIP) Service Quota must be increased
  before installing the Product on the cloud, to allow for 13 EIPs
  to be provisioned for the Product on Cloud.
* If several edge nodes are provisioned at the same time from a non-premium
  Docker\* account, there is a limit of 100 pulls per IP over a four-hour
  window. In this case, upgrade to the premium account or wait to
  provision more edge nodes.
* Provisioning a node with Ubuntu-ext OS profile through an on-premises
  Edge Orchestrator in an OT network will cause a failure due to squid proxy
  unauthorizing the request with 403. There is no workaround;
  utilize the base Ubuntu profile and install any additional drivers
  through Day 2 updates.
* The Logical Volume Management (LVM) configuration feature for a single-disk setup
  is currently not fully functional in the EMT OS profile.
  It is recommended to use the default disk configuration for the EMT OS profile until
  this limitation is addressed.
* The Ubuntu OS partitioning scheme is divided into two parts: a root filesystem (50 GB) and a persistent volume.
  This design aims to provide flexible and efficient storage management for user workloads deployed
  through Kubernetes. However, there is a limitation — user workloads may become scattered between the rootfs
  and the persistent volume because the /var/lib/kubelet mount point was not included under the persistent volume.
* When multiple Ubuntu OS profiles are available, the Orch-CLI tool may select the wrong profile during
  edge node provisioning. As a workaround, use the UI to register the edge node with the desired Ubuntu OS profile,
  or delete the unwanted Ubuntu OS profile and then use the Orch-CLI tool to provision the edge node.

Hosts and Infrastructure
^^^^^^^^^^^^^^^^^^^^^^^^^

* On the host pages, if a host ends its `Under Maintenance` period when a
  user is viewing the page, the maintenance status for the host in the
  table will not be updated until the user switches pages or refreshes the
  page.
* Consecutive RESET/CYCLE operation needs explicit power status change to Power ON state.
  First change power status to OFF and Power ON from UI before performing 2nd
  RESET/CYCLE operation. Change power status using orch-cli power commands
  refer to the user documentation :doc:`/user_guide/advanced_functionality/vpro_power_mgt`
* On the host page, the power status might appear as "unspecified" rather
  than displaying whether the system is powered ON or OFF.
  It does not impact the actual power state or power operations of the host.
  Refer to :doc:`/user_guide/advanced_functionality/vpro_power_mgt` for more information
  on checking the power state.

Clusters and Application Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Even though deployment profile override values are present, they do not
  appear in the deployment package application details pop-up screen.
* When creating a cluster, you must select a region and a site but the
  region and site are not automatically added to the cluster's deployment
  metadata.  You must add them as deployment metadata manually if you
  desire.
* Any USB peripherals connected to the edge node can be connected to a
  VM-based application. However, although the USB peripheral(s) are
  detached from the edge node, the VM-based application will still have the
  USB peripherals connected. In this situation, when you run applications
  requiring USB peripherals, it will fail.
* The same USB peripheral cannot be shared between the same type of
  applications, while the same USB peripheral can be simultaneously
  connected to the different types of applications.
* Support for in-place upgrades of Edge Node Kubernetes cluster
  is currently not available. This is to be addressed in a future release.
  Currently in 3.1, Cluster upgrade can done by deleting the cluster and reprovisioning
  the Edge Nodes and recreating with a new cluster template version.
* Multi-Node Cluster Provision is not supported in this release. This is to be
  addressed in future releases.
* Cluster templates can be deleted even if they are actively being used by
  existing clusters. This issue may lead to unintended consequences,
  such as the inability to manage or update clusters associated with the
  deleted template. A fix for this issue is planned for a future release.
* AI applications from the earlier release - Intel® SceneScape version 2024.1.2,
  Intel® Edge Insights System version 2.0 enhanced, and Intel® Geti™ solution
  version 2.6.0 do not work on the 3.1 release. These applications may
  be available in future releases.
* If an application containing CRDs is deployed and subsequently undeployed, it
  may leave behind orphaned CRDs and related cluster-level objects. This can
  lead to an `annotation validation` error when attempting to redeploy on the cluster.
  See :doc:`troubleshooting guide </user_guide/troubleshooting/deploy_issue>`.
* When using the "Create Single-host Clusters" option during host registration,
  host names must be in lowercase; otherwise, cluster creation will fail.
* Deauthorizing a host does not automatically delete the associated cluster. To delete a deauthorized host,
  the associated cluster must be deleted first. Note that deleting the cluster for a deauthorized host is
  always recommended to make it inaccessible through EMF.

User Experience
^^^^^^^^^^^^^^^^^

* `Let's Encrypt` certificates and Certificate Authority (CA) are deployed
  by default. `Let's Encrypt` poses an issue where if the Certificate
  Authority is changed, the edge nodes will not trust the Product anymore.
  In such a case, you must reinstall the edge nodes. Advanced users can use
  their different CAs, therefore avoiding this issue.
* For users without write permissions, the user interface may show some
  controls that require write permissions as enabled but this is only a
  user interface issue. The actions taken by the user will result in an
  error. In some cases, the error may just state that the operation has
  failed, without citing permission as the reason.
* Users are not redirected to the login credentials screen when the
  authorization token expires in the Infrastructure tab. Instead, the user
  interface informs them that "Additional Permissions are Needed". As a
  workaround, click a different tab on the header bar to redirect to the
  login credentials screen.
* Telemetry Orchestrator services (OpenTelemetry\* and Mimir\*) do not have
  role-based access authorization enabled in the southbound interfaces
  towards the edge node.
* If the Product and Keycloak\* solution are restarted separately or if
  there is a Keycloak signing key rotation, the Product returns error 403.
  The workaround is to log out, close the browser, and wait approximately
  15 minutes and then log back in and retry; the request should succeed as
  soon as the Product refreshes the new signing keys from Keycloak
  solution, which happens periodically and automatically.
* The querying capabilities of Mimir on orchestrator-observability and
  edgenode-observability may occasionally fail due to loss of communication
  between querier and query-frontend. The workaround is a restart of
  querier pod through Argo CD tool.
* A configurable toggle for FDE and secure boot (SB)
  is available during host configuration and is usable even if the edge
  node goes through zero-touch provisioning (ZTP). When provisioning
  through the ZTP, you can disable the toggle because it has no effect.
* Occasionally, a reboot of the Product makes the Argo CD tool's `root-app`
  and `secret-config` remain in the `provisioning` state, and prevented
  creation of application deployment. The only known workaround is to
  reinstall the Product.
* When the edge node is running, if the network connection is moved from
  one interface to another interface on the edge node, there will be a
  delay of approximately 15 minutes before all edge node agents reconnect
  to the Product.
* During host state transitions, briefly such as registered to onboarded or
  configured and also active to deleted, the user interface might briefly
  show an outdated and/or inconsistent state.
* On the rare event that the Org-Admin-Group is not created in keycloak,
  restarting the keycloak-tenant-controller pod via the Argo CD UI will
  force the initial roles and groups to be recreated.
* Users created in Keycloak must have email address set up to properly
  perform authentication to Grafana Observability Dashboards. Users without
  email set won't be able to access metrics and logs via Grafana UI.
* On ASRock platform the hardware resources are not displayed properly in
  the Infrastructure tab, this has no impact on functionality of the nodes
  for cluster or application installation.
* Kyverno pods (i.e., kyverno-clean-reports) may temporarily show
  ImagePullBackOff status due to legacy `bitnami` registry references.
  This is expected during migration and can be safely ignored.
  Pods will automatically resolve to Running state once the Kyverno
  Charts v3.5.1 migration is completed.

Limitations
---------------------------------------------------------------------

The following are known issues in the release. While several know issues
and limitations have been addressed during the 3.1 release cycle, some have
been carried over from past releases.

Provisioning Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^

* An edge node cannot be re-provisioned from scratch if it is not deleted
  first from the user interface. Follow the steps in
  :doc:`/user_guide/set_up_edge_infra/delete_host`
  and then re-provision the edge node.
* You cannot perform an initial boot behind a proxy server because the
  Original Equipment Manufacturer (OEM) BIOS does not support HTTPs booting
  behind a proxy server. After you have installed the OS, you can boot
  behind a proxy server. Alternate is to use USB boot.
* The embedded JSON Web Token (JWT) in the EMT (Hook OS replacement) is programmed to expire after a
  maximum of 60 minutes. If there is a delay in supplying the login
  details, the OS provisioning process may fail, which is the expected
  behavior. In such cases, the user must initiate the re-provisioning of
  the edge node.

Hosts and Infrastructure Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* GPU support: GPU metrics collection is not supported yet.
* The Dell\* EMC PowerEdge XR12 server with PCIe\* storage controller
  (`HBA355i
  <https://www.dell.com/en-us/shop/dell-hba355i-controller-front/apd/405-aaxv/storage-drives-media#overview_section>`_)
  is not supported by the cloud-based provisioning process. Remove this
  RAID controller from your node.
* You can create two sites with the same name under two different regions,
  although this does not cause the nodes to be present when creating
  clusters. Intel recommends that sites have unique, non-overlapping names.

Clusters and Application Deployment Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* A deployment package cannot be created by including two applications with
  the same name but with different versions. Do not include
  two applications with the same name in a single deployment project. You
  can modify the name of one of the applications if required.
* Multiple "-" (for example, `1.0.0-dev-test`) characters are not allowed
  in an application's chart or version during creation.
* The maximum number of unique deployments is limited to 300 per Product
  instance. This limitation spawns from the AWS service used in the
  backend. Based on the number of edge nodes, each deployment can have
  multiple running instances.
* When you use "%GeneratedDockerCredential%" in the Application Profile,
  any updates made to the image registry in Catalog are not automatically
  applied to existing deployments. To update the image pull secret, you
  must recreate the existing deployments.
* Bundle-Deployments for Application/Extension Deployments in Automatic Mode
  of deployment are not cleaned-up on the Cluster Deletion. This results in
  showing any errors from these deployments in subsequent successful deployments.
  Refer :ref:`deploymentpage_errors`.
* When using the "Create Single-host Clusters" option during host registration,
  a new cluster is automatically created and remains in "provisioning" state
  until host onboarding. Enhanced state descriptions will be provided in a
  future release.

Multi-tenancy Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^

* If you add a user to many groups that provide project access, some Edge
  Orchestrator functionality may fail because of size limits for the
  authorization token used in a web browser.

  As an example, as user added to more than five groups of type
  `group_projectid_edgemanagergroup` or `group_projectid_edgeoperatorgroup`
  (combined), or 10 groups of type `group_projectid_hostmanagergroup` may
  experience this failure.  As a workaround, reduce the total number of
  groups that a single user is a member of or create separate users.

User Experience Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Cluster labels (metadata) for both names and values fields must be in
  lowercase; otherwise, the system becomes inconsistent. The user interface
  flags these fields as an error but does not block the user from
  continuing and saving the cluster with mixed-case cluster label values
  assigned.
* Site name must be unique across all regions, that is, no two sites can
  have the same name in the Product deployment. Otherwise, the host
  allocated to one of the overlapping names might not appear in the user
  interface.
* The OpenTelemetry Collector service on the edge node host acts as the
  single gateway for forwarding all logs (host agents and cluster) and
  hardware metrics to the Product. If the Collector service fails, then
  these logs and metrics will not be sent to the Product until the service
  is restored.
* The `Show All` page size for hosts does not work for lists over 100. If
  you have a list of more than 100 hosts in a view, do not set the page
  size to larger than 100.
* In the Observability Dashboard, hosts are present and can be selected in
  the drop-down for a query that spans a period where a node was at least
  partially there. For example, if the node went down 4 minutes ago and the
  metric query is set for 5 the metrics for the host `down` will be
  present. Also, if you choose a time period in time where the host did
  exist, then the host will be displayed in the dropdown. Wait until the
  proper refresh time.
* Accessing more than one edge web application at a time in a browser through
  the Service Link feature (Application Service Proxy) is not supported.
  The workaround is to open a second application in an incognito window or a
  different browser.
* Scheduling a recurring maintenance to happen on the last day of the month
  before midnight in a timezone that is behind GMT/UTC, when the schedule
  is after midnight in GMT/UTC causes the maintenance to be scheduled on
  the 1st of the selected month instead of the next month. For example, if
  you schedule a maintenance to repeat every May 31st at 9 pm PDT, the
  maintenance will repeat on May 1st at 9 pm instead of on June 31st. When
  scheduling, be aware of the time zone.
* While using Safari as a browser, you may encounter some graphical
  inconsistencies, such as erroneous font characters. These are appearance
  issues and do not impede any functionality.
* The "Total Provisioning Time" metric is only available for approximately
  15 days since a node was provisioned.
* When using the Edge Node Dashboard in the Grafana UI with a user that has
  been mapped to multiple projects, a "Requests Header Field Too Large" may
  appear on the Dashboard. To work around this issue, log into the dashboard
  with a user that has been mapped to just the project of the edge node
  being checked.

Recommendations
---------------------

* Users need to maintain fixed IP reservations for each edge node using
  address-to-MAC mapping in their DHCP server for stable functioning of the
  edge node cluster.
* Intel advises against scheduling a major OS upgrade. Intel only supports
  the current Product version on Ubuntu\* OS 22.04 LTS.
* Wait for some time after the initial Product installation or a full
  restart before provisioning nodes because there are a few components
  (for example, DKAM and Tinkerbell pods) that take about 15 minutes to get to the
  ready state.
* Wait for some time after the initial Product installation or a complete
  system reboot before provisioning nodes. This is because certain
  components, such as DKAM and Tinkerbell pods, need approximately 15
  minutes to reach the ready state.

Documentation
-------------------------------------------------------------------------------

The Product has complete online documentation.

You can find the online documentation at
https://docs.openedgeplatform.intel.com/edge-manage-docs/main/index.html

System Requirements
-------------------------------------------------------------------------------

You can find the system requirements on the :doc:`/system_requirements/index`
page.

Where to Find the Release
-------------------------------------------------------------------------------

Each customer of the release will get a public web link to their Product
deployment. Contact your System Integrator (SI) or Intel representative for
access.
