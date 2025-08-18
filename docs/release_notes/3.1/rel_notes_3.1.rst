Version 3.1 Release Notes
========================================

Version History/Revision History
-------------------------------------------------------

This is the Release Notes for \ |software_prod_name|\ version 3.1, released
July 23rd 2025.

.. note::

   This document refers to \ |software_prod_name|\ as the "Product".

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

* Integration of vPro and openAMT services with EMF, allowing the user to enable
  vPRO on any capable platfrom. First functionality supported is Remote Power
  ON/OFF and Device Reboot capabilities.
* Enhanced Provisioning capabilites and improvements
    * Ability to perform PXE boot, targeted for Standalone EMT-S edge nodes to
      serve OXMs usecases.
    * Support the different image varieties, including EMT with Docker and k3s.
    * Per edge Edge Node configuration through custom cloud-init script,
      to provide fixed IP during provisioning, specific proxies, enabling
      Kubernetes right at the very installation of the nodes or finally
      configuring GPU SRIOV or X11.
    * HookOS has been replaced with a lightweight EMT, ensuring full control
      and optimization of the components used to provision an EN.
* Ability to independently track software component and Edge Node usage for
  managed and standalone edge nodes, with an customer opt-out selection.
  The objective  to gain better performance and usage insights with the goal
  of always enhancing the product.
* Support for dGPU (Battlemage, Nvidia) and iGPU, including also GPU SR-IOV
  configuration capabilities in EMT-S and EMF.
* History of Day 2 update operations of an Edge node is now tracked and exposed,
  allowing the user to retrace the different steps of an Edge Node's life.
  The Day 2 update process now aligns with industry well known constructus.
* Security Compliance of an Edge Node is also now implemented through CVE
  tracking for installed and available OS images.
* Kubernetes k3s distribution is brought to the edge node to replace RKE2
  achieving lightweight deployments in resource-constrained devices.
  An EMT image with the k3s binaries already included is present via an OS Profile.
* Cluster Orchestration now supports 1000 clusters concurrently managed.
* Vastly improved Application Onboarding
    * Ability to directly import helm charts, thus removing the need to write
      the deployment package for single helm chart applications.
    * Deployment Packages are now directly exportable from the user interface,
      to help portability and debuggability.
    * Deployment packages can now be imported as tar files,
      making them more portable and easy to share.
* Test automation has been overhauled providing the foundation of testing
  platform capable of reaching 100% test automation over time. TODO add number of automation and such.
* Additionally, efforts have focused on Trusted Compute to enable customers, benchmark it, and enhance continuous monitoring and workload isolation use cases for robustness. The minimal common EMT has also been adapted as a trusted OS.
  

All of the codebase is Apache\* software version 2.0 licensed and available on Github.

For a detailed list of features, see the :doc:`Overview page </user_guide/index>`
and the `Edge Manageability Framework README file <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/README.md>`_.

Upgrades from Previous Releases
----------------------------------

Edge Manageability Framework 3.1 can be upgraded from version 3.0 automatically
as described in the user guide. TODO: link guide.
Any version prior to 3.0 can not be upgraded to 3.1.

Known Issues
----------------------------------

The following are known issues in the release. While several know issues
and limitations have been addressed during the 3.1 release cycle, some have
been still carried over from past releases.

Provisioning
^^^^^^^^^^^^^

* Provisioning is halted in case of Secure flag and Secure Boot BIOS
  setting mismatch; the BIOS setting is used. There are different
  cases:

    * Case 1: Secure boot disabled in BIOS and Security Feature disabled
      in UI - the edge node will boot seamlessly and a messages
      "Verifying Secure Boot settings match" will be displayed
      on the UI.
    * Case 2: Secure boot disabled in BIOS and Security Feature
      enabled in UI - the edge node will not boot and a message
      "Verifying Secure Boot settings match failed" will be
      displayed on the UI.

* The OS is curated (configured) only once during edge node provisioning,
  thus any update to the OS profile after that initial curation is not
  applied dynamically.
* If Out-of-Tree (OOT) driver installation with secure boot option enabled
  fails because of secure boot password request on the edge node hardware,
  reboot the edge node hardware.
* If the edge node reboots during the full-disk encryption (FDE) stage, the
  edge node will try and boot to disk but will then fail because of partial
  encryption. The workaround is to delete the host and then re-provision.
* If there are network issues during initial provisioning of the edge node,
  see :doc:`/user_guide/troubleshooting/en_recover`.
* If an edge node fails to boot properly during initial provisioning, see
  :doc:`/user_guide/troubleshooting/hard_disk_boot`.
* An edge node's OS might intermittently enter maintenance mode during
  provisioning after uOS workflow completion. Reboot the edge node,
  possibly more than once, to get out of this state.
* Occasionally during provisioning, a bad gateway (502) error can happen,
  thus failing the workflow. Delete the edge node from the Product (see
  :doc:`/user_guide/set_up_edge_infra/delete_host`) and then reboot it to
  restart the provisioning.
* On rare occasions, the Local Volume Manager (LVM) creation of edge nodes
  with FDE disabled, fails because it requires input
  through the keyboard. Reboot the edge node to proceed.
* In certain situations during provisioning, the edge node might experience
  a boot loop where it tries to complete the provisioning process.
  Intel recommends powering off the edge node, deleting it (see
  :doc:`/user_guide/set_up_edge_infra/delete_host`), and then re-provisioning
  it.
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
* When a user tries to re-provision without FDE, a
  node that was previously provisioned with FDE will not succeed due to
  un-successful persistent volume creation on disk. The workaround is to
  manually issue the `dd` command: `dd if=/dev/zero of="/dev/disk_name"
  bs=32m count=100` for the correct disk `disk_name` before re-provisioning
  without FDE.
* The AAEON UP Squared Pro 7000\* platform provisioning might fail - `Provisioning
  Failed: 2/15: Erasing data from all non-removable disks failed`.
  To proceed, the BIOS configuration for the eMMC controller must be disabled
  in `Main > CRB Setup > CRB Chipset > PCH-IO Configuration >
  SCS Configuration > eMMC Controller > Disabled`.
* Provisioning a node with Ubuntu-ext OS profile through an on-premises
  Edge Orchestrator in an OT network will cause a failure due to squid proxy
  unauthorizing the request with 403. There is no workaround;
  utilize the base Ubuntu profile and install any additional drivers
  through Day 2 updates.
* Logs and metrics are currently not available for Edge Nodes provisioned via LOC-A.

Hosts and Infrastructure
^^^^^^^^^^^^^^^^^^^^^^^^^

* On the host pages, if a host ends its `Under Maintenance` period when a
  user is viewing the page, the maintenance status for the host in the
  table will not be updated until the user switches pages or refreshes the
  page.
* For Intel® Core™ processor platforms with E-cores and P-cores,
  the CPU thread count may be reported incorrectly, where single-threaded
  E-cores are counted as having two threads. The CPU model and total core
  count (sum of both P and E) are correct.
* When scheduling updates, select the start time of the OS updates after
  the current time by at least 10 minutes; otherwise, the update may not
  start.
* It is possible that a node is reported with host status `Provisioning In
  Progress: 26/26: Rebooting` in the host views of the User Interface.
  Confirm the actual status of the host by clicking on it and checking the
  detailed `Status` panel at the bottom: if the `Host Status` is `Running`,
  then the node is in the correct state and can be used for cluster and
  application installation. You will see that the `Provisioning Status` is
  equal to what is shown in the list view. The issue happens because the
  list view gives precedence to the `Provisioning Status` over the `Host
  Status`.

Clusters and Application Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Even though deployment profile override values are present, they do not
  appear in the deployment package application details pop-up screen.
* Temporary inconsistent states in the user interface between deployments
  and cluster can show incorrect information on the dashboard.
* Occasionally, because of inconsistency in handling cluster status, some
  deployments are shown as `Down` but the applications are shown as
  `Running`. The applications' state is the correct one.
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
  connected to the different types of applications. In other words, at the
  same time, multiple container-based applications cannot occupy the same
  USB peripheral, and the same USB peripheral cannot be connected to
  multiple VM-based applications. However, a container-based application
  and a VM-based application can have the same USB peripheral, which can
  lead to one of both applications crashing because of the USB sharing.
  Ensure that both the virtualization package for VM-based applications and
  the USB package for container-based applications do not have the same USB
  peripheral in their `usbList` configuration. This prevents a container
  and VM-based application from sharing the same USB peripheral,
  simultaneously.
* Support for in-place upgrades of Edge Node Kubernetes cluster versions
  is currently not available. This is to be addressed in a future release.
  Currently in 3.1, Cluster upgrade can done by deleting the cluster and
  recreating with a new cluster template version.
* Mulit-Node Cluster Provision is not supported in this release. This is to be
  addressed in future releases.
* Cluster templates can be deleted even if they are actively being used by
  existing clusters. This issue may lead to unintended consequences,
  such as the inability to manage or update clusters associated with the
  deleted template. A fix for this issue is planned for a future release.
* AI applications from the earlier release - Intel® SceneScape version 2024.1.2,
  Intel® Edge Insights System version 2.0 enhanced, and Intel® Geti™ solution version 2.6.0 do not work on the 3.1 release. These applications will
  be available in future releases.
* If an application containing CRDs is deployed and subsequently undeployed, it
  may leave behind orphaned CRDs and related cluster-level objects. This can
  lead to an `annotation validation` error when attempting to redeploy on the cluster.
  See :doc:`troubleshooting guide </user_guide/troubleshooting/deploy_issue>`.

User Experience
^^^^^^^^^^^^^^^^^

* The Search feature in the Locations' hierarchical display (that is,
  Regions and Sites) does not display the correct search results.  This
  known issue will be resolved in an upcoming release.
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
* The search field at the top of most table pages (for example, Cluster,
  Hosts) enables you to search the `Name` field and other selected fields
  within that table. While the `Name` field is always searchable, some
  columns are not included in the search.
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
* When the License expires on an edge node, the status will show `No
  License`. You will need to provide the license, then a `LaunchCheck` will
  start to download a valid license every 60 seconds and will retry up to
  10 times, for a total of 1 hour. If no license is obtained after 10
  retries, the EN will be rebooted as part of the enforcement process.
* If the expiration date of an edge node is pre-set to an earlier date than
  its original expiration on the IRC portal, after the edge node is fully
  provisioned, the edge node will not show a license error and will still
  be able to run with a valid license.
* Occasionally, a reboot of the Product makes the Argo CD tool's `root-app`
  and `secret-config` remain in the `provisioning` state, and prevented
  creation of application deployment. The only known workaround is to
  reinstall the Product.
* When the edge node is running, if the network connection is moved from
  one interface to another interface on the edge node, there will be a
  delay of approximately 15 minutes before all edge node agents reconnect
  to the Product.
* After configuring an edge node and agreeing to create a cluster the user
  is able to start populating fields within the Create Cluster screen.
  However, if the nodes pass the "Secure Boot MATCH" stage of provisioning,
  any inputs entered may be lost. The workaround is to confirm the cluster
  creation inputs prior to this stage or to re-enter the values if they are
  lost.
* You will notice a failed Kubernetes job when looking at the
  platform-keycloak deployment in Argo CD tool. There is a `known issue
  <https://github.com/bitnami/charts/issues/29851>`_ in the
  bitnami/keycloak-config-cli job when used with Keycloak solution version
  1.  The job will fail with an unrecognized field "hideOnLogin". You can
  ignore this error because this field is not critical to Edge Manageability
  Framework.
* During Interactive Onboarding after the 3rd failed attempt to provide the
  password the installation proceeds but has not obtained a valid JWT
  token, thus failing to onboard the node.
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

Limitations
---------------------------------------------------------------------

The following are known issues in the release. While several know issues
and limitations have been addressed during the 3.1 release cycle, some have
been carried over from past releases.

Provisioning Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^

* The proxy server could not be configured in the OS profile, thus this
  setting is unavailable. The proxy server could not be used to connect the
  edge node to the Product.
* An edge node cannot be provisioned or operated behind a customer provided
  Internet proxy server.
* An edge node cannot be re-provisioned from scratch if it is not deleted
  first from the user interface. Follow the steps in
  :doc:`/user_guide/set_up_edge_infra/delete_host`
  and then re-provision the edge node.
* For cloud-based onboarding, the µOS download during provisioning may run
  up to 30 minutes because of Ethernet packet processing latencies
  associated with the UEFI networking driver.
* You cannot perform an initial boot behind a proxy server because the
  Original Equipment Manufacturer (OEM) BIOS does not support HTTPs booting
  behind a proxy server. After you have installed the OS, you can boot
  behind a proxy server.
* In a corporate environment where the Product is installed on-premises
  behind a network proxy, the application [Dynamic Kit Adaptation Module (DKAM)] responsible for obtaining
  EN installation artifacts fails to download the necessary artifacts
  because of incorrect redirects to proxy and Intel Release Service.
* The embedded JSON Web Token (JWT) in the µOS are programmed to expire after a
  maximum of 60 minutes. If there is a delay in supplying the login
  details, the OS provisioning process may fail, which is the expected
  behavior. In such cases, the user must initiate the re-provisioning of
  the edge node.
* All hardware to be onboarded into the Edge Orchestrator must have a valid
  UUID and Serial Number as shown by the output of `dmidecode -s
  system-uuid` and dmidecode -s system-serial-number`. If the hardware does
  not have these correctly set, contact the vendor first.

Hosts and Infrastructure Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* GPU support:

  * Sharing of GPU resources between multiple applications on the same node
    is not supported yet.
  * GPU metrics collection is not supported yet.
  * GPU is not detected and reported on the ASUS\* PE3000G system.

* Persistent volumes:

  * Local volumes are accessible only from every single node, thus local
    volumes are subject to the availability of the underlying node and are
    not suitable for all applications.
  * If a node becomes unhealthy, then the local volume will also become
    inaccessible, and an application using it will not run.

* The Dell\* EMC PowerEdge XR12 server with PCIe\* storage controller
  (`HBA355i
  <https://www.dell.com/en-us/shop/dell-hba355i-controller-front/apd/405-aaxv/storage-drives-media#overview_section>`_)
  is not supported by the cloud-based provisioning process. Remove this
  RAID controller from your node.
* The Product does not differentiate P-cores and E-cores in Intel :sup:`®`
  Core™ processor-based platforms.
* You can create two sites with the same name under two different regions,
  although this does not cause the nodes to be present when creating
  clusters. Intel recommends that sites have unique, non-overlapping names.

Clusters and Application Deployment Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* A deployment package cannot be created by including two applications with
  the same name but with different publishers or versions. Do not include
  two applications with the same name in a single deployment project. You
  can modify the name of one of the applications if required.
* Parameter template variable names do not support the underscore `_` char.
  For example, `parameter_name=models_repository.image.tag` is not valid.
  If revising the Helm\* chart for the application to remove `_` is not
  viable, use multiple profiles for that application.
* Multiple "-" (for example, `1.0.0-dev-test`) characters are not allowed
  in an application's chart or version during creation.
* The maximum number of unique deployments is limited to 300 per Product
  instance. This limitation spawns from the AWS service used in the
  backend. Based on the number of edge nodes, each deployment can have
  multiple running instances.
* You must not modify the extension deployment packages (SR-IOV,
  Virtualization, Load Balancer, Intel® GPU) and cluster templates
  (restricted, baseline, and privileged). These are automatically created
  when the Product is installed.
* When you use "%GeneratedDockerCredential%" in the Application Profile,
  any updates made to the image registry in Catalog are not automatically
  applied to existing deployments. To update the image pull secret, you
  must recreate the existing deployments.
  <https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/#before-you-begin>`_.
* When you create deployments to multiple target clusters, some deployments
  show error status messages rarely, even though all Kubernetes resources
  are created correctly. This is an issue in the Fleet agent and was fixed
  by the Fleet community but not released yet. To resolve it, go to
  Rancher UI > Continuous Delivery > Cluster and then click the "Force
  Update" button.
* Changes to a host’s labels (update, removal) performed after the cluster
  has already been created will not be propagated to the corresponding
  Kubernetes nodes. This has been documented internally and a fix for this issue will
  be provided in the next release.
* Bundle-Deployments for Application/Extension Deployments in Automatic Mode
  of deployment are not cleaned-up on the Cluster Deletion. This results in
  showing any errors from these deployments in subsequent successful deployments.
  Refer :ref:`deploymentpage_errors`.

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
* Remote access to the node is supported only at the virtual machine
  console and the kube-shell level. It is not user-supported at the OS
  level.
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
* Until an Edge Node JWT token is valid, a provisioned Edge Node can reach
  the Edge Orchestrator. If you issue a delete of the host, the host
  is fully deleted from Edge Orchestrator, but still retains the
  certificates, thus if it's re-registered with the correct information it
  will immediately re-connect to the Edge Orchestrator
  but it will be rejected by the Edge Orchestrator APIs. Upon token
  expiry (at most 1 hour) the reconnection will not happen.
* The "Total Provisioning Time" metric is only available for approximately
  15 days since a node was provisioned.
* The hosts table's `Operating System` column does not show the desired OS for
  `Registered` hosts. It will only show the current OS of `Provisioned` hosts.
  You can view the desired OS of a host on the host details page under `Updates`.

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
