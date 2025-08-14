Day2 Updates
============

The Edge Orchestrator supports deployment and scheduled updates of two types of Edge Nodes:

- **Ubuntu OS** — A mutable operating system where OS level packages can be updated or installed during runtime.
- `Edge Microvisor Toolkit <https://github.com/open-edge-platform/edge-microvisor-toolkit>`_ — An immutable OS in which software is installed on a read-only partition (Partition A).
  Updates are performed by installing a new Edge Microvisor Toolkit image on a separate partition (Partition B),
  then switching the boot partition from A to B during a reboot.

In both scenarios, the Day 2 update of an Edge Node involves updates to the OS, drivers, and Bare Metal Agents.

The four main entities involved in the Edge Node updates are:

- `Inventory <https://github.com/open-edge-platform/infra-core/tree/main/inventory>`_ — Stores the Edge Node instances and the OS Resources related to each instance.
  OS Resources include OS version information, whereas an Instance Resource contains the
  current and desired OS versions, each linked to an OS Resource.

  - The *current version* reflects the currently installed OS.
  - The *desired version* indicates the OS version to be used during the next update.

.. note::

    For mutable Ubuntu OS systems, the current and desired versions are always linked to the
    same OS Resource, as mutable OS Edge Nodes do not support upgrades from the current to the
    desired OS version. This resource can only be patched and cannot be replaced by a new
    OS Resource.

- `Platform Update Agent (PUA) <https://github.com/open-edge-platform/edge-node-agents/tree/main/platform-update-agent>`_ — A Bare Metal Agent installed on the Edge Node, it is
  responsible for initiating communication with the Maintenance Manager (MM) on the
  Edge Orchestrator side and starting the update process. Communication is driven by
  periodic requests from the PUA to the MM, including the status of the Edge Node update.

- `Maintenance Manager <https://github.com/open-edge-platform/infra-managers/blob/main/maintenance>`_ — The Resource Managers responds to status updates from the PUA with
  payloads that include an update schedule and information about the update from the Inventory.
  After a successful update, it receives updated OS version information from the PUA and sets
  the current version of Edge Microvisor Toolkit for the relevant Edge Node instance in the Inventory.

- `OS Resource Manager <https://github.com/open-edge-platform/infra-managers/blob/main/os-resource>`_ — This Resource Manager periodically queries the Release Service
  for OS profile manifests associated with a specific EMF release as configured in the
  `os-resource configuration <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/argocd/applications/configs/infra-managers.yaml#L72>`_.
  It updates existing OS profile details based on the latest information from the Release Service, ensuring that any changes are reflected in the system.
  When the Edge Orchestrator is upgraded to a version with a new *osProfileRevision*, the OS Resource Manager discovers new OS profiles for the Edge Microvisor Toolkit
  corresponding to the updated tag and generates the appropriate OS Resources in the Inventory.

  The OS Resource Manager supports two operational modes:

  - *Manual (default)*: Linking of OS Resources to Instances must be performed manually by the user via an API call.
  - *Automatic*: Newly discovered OS Resources are automatically linked to the desired OS version of each Instance.

For more details on the communication between the Platform Update Agent and the Maintenance
Manager, refer to the `Maintenance Manager documentation <https://github.com/open-edge-platform/infra-managers/blob/main/maintenance/docs/api/maintmgr.md>`_.

An Edge Node update can be scheduled through the Web UI, which creates a dedicated maintenance
window for the update process. To learn more about scheduling updates for Edge Nodes, see the
:ref:`guide on scheduling maintenance <user_guide/advanced_functionality/host_schedule_main:Schedule Maintenance for Configured and Active Hosts>`.


EN Update Flow
--------------

The first diagram presents a high-level update flow, highlighting
the exchange of information between the Platform Update Agent and the Maintenance Manager, as
well as the actions performed by the OS Resource Manager in both manual and automatic modes.
The diagram also shows the creation of a maintenance window when an Edge Node update is required.

The actual update procedure for the Edge Microvisor Toolkit—delivered as a full OS image—differs
from the process used for the mutable Ubuntu OS. Subsequent sections describe detailed update
procedures specific to each system type.

High Level Day2 Flow
~~~~~~~~~~~~~~~~~~~~~~

.. mermaid::

   sequenceDiagram
   %%{wrap}%%
   autonumber

   actor a as Admin
   participant ui as UI
   participant reg as Release Service
   participant inv as Inventory
   participant osrm as OS Resource Manager
   participant mm as Maintenance Manager
   box LightCyan Edge Node
     participant pua as Platform Update Agent / INBM
     participant na as Node Agent
   end

   note over pua, na: EN OS is installed on partition A and all EN components are up

    par

        loop periodically
            osrm->>reg: download Curated OS Profile manifests as per osProfileRevision
            reg-->>osrm: return
            osrm->>osrm: parse the manifests
            alt osProfileRevision has changed (Edge Orchestrator was upgraded)
                osrm->>inv: update existing OS resource and create OS Resources for new immutable OS Profiles
            else osProfileRevision has not changed (Edge Orchestrator was not upgraded)
                osrm->>inv: update existing OS Resources with latest OS profile information
            end
            opt OSRM manualMode=false and osProfileRevision has changed (Edge Orchestrator was upgraded)
                osrm->>inv: update desired_os of immutable OS instances with latest OS
            end
        end
        loop periodically
            pua->>mm: PlatformUpdateStatusRequest(guid, update_status)
            mm->>inv: set Instance updateStatus
            mm->>inv: get Schedule Resources for Instance
            inv->>mm: return
            mm->>pua: PlatformUpdateStatusResponce (os_type, os_image_source, update_source, update_schedule)
            pua->>pua: write the update metadata to file
        end
        opt OSRM manualMode=true and osProfileRevision has changed (Edge Orchestrator was upgraded)
            a->>inv: update desired_os to a selected OS Resource in chosen immutable OS Instances
        end
        opt mutable OS needs updates
            a->>inv: patch mutable OS Resource
        end
        opt EN update needed
            a->>ui: create an update schedule per EN
            ui->>inv: create a Schedule Resource
        end
    end

Mutable OS Update
-----------------

The update process for the mutable Ubuntu OS is performed by the Platform Update Agent using
Intel® In-Band Manageability (INBM) software. Ultimately, the agent invokes the ``apt`` tool via
an INBM command to fetch and update packages from remote ``apt`` repositories.

When the scheduled update start time is reached, PUA initiates the following updates:

- PUA self-update
- INBM update
- GRUB configuration update
- Installation of new apt packages (OS and Bare Metal Agent packages)
- Update of existing apt packages (OS and Bare Metal Agent packages)

The flow ends with a system reboot, after which PUA verifies whether the update was successful.

Mutable OS Update Flow
~~~~~~~~~~~~~~~~~~~~~~

.. mermaid::

    sequenceDiagram
    %%{wrap}%%
    autonumber

    participant inv as Inventory
    participant mm as Maintenance Manager
    box LightCyan Edge Node
    participant pua as Platform Update Agent / INBM
    participant grub as GRUB (Kernel Commandline)
    participant apt as APT (Tool and filesystem)
    end
    participant rs as Release Service (RS)

    note over pua, na: EN OS is installed on partition A and all EN components are up
    note over  pua, mm: reach maintenance schedule start time
        pua-->>mm: PlatformUpdateStatusRequest(guid, STARTED)
    mm->>inv: UpdateStatus=STARTED
    mm->>pua: PlatformUpdateStatusInd (update_source, update_schedule)
        pua->>pua: update metadata

    note over  pua, mm: UPDATE APT SOURCES

    note over  pua, mm: SELF PUA UPDATE
    pua->>apt: SelfUpdate() - apt "NEEDRESTART_MODE=a" install --only-upgrade platfrom-update-agent
    apt->>rs: get latest package
    rs->>apt: return and install latest package
    apt->>pua: if package available = success, PUA restarts, if no package available =success, continue

    note over  pua, mm: UPDATE INBM
    pua->>apt: updateINBM() - apt install --only-upgrade inbm***
    apt->>rs: get latest packages
    rs->>apt: return and install latest packages
    apt->>pua: success

    note over pua, mm: UPDATE GRUB CONFIG
    pua->>pua: get new GRUB config version
    pua->>grub: Update Kernel Commandline boot parameters /etc/default/grub
    pua->>grub: update-grub
    grub->>grub: updating grub config

    note over  pua, mm: INSTALL NEW OS PACKAGES AND AGENTS
    pua->>apt: apt-get install package_1 --download-only
    apt->>rs: get latest packages
    rs->>apt: return and download latest packages
    apt->>pua: success
    pua->>apt: apt-get install packages -n no-download -no-reboot
    apt->>pua: success

    note over pua, mm: UPDATE OS PACKAGES AND AGENTS
    pua->>apt: apt update && apt-upgrade --download-only
    apt->>rs: get latest packages
    rs->>apt: return and download latest packages
    apt->>pua: success
    pua->>apt: update OS and Agents: apt-upgrade --no-download --reboot yes
    apt->>pua: success

    note over pua: INBM REBOOTS THE NODE
    pua->>pua: verify OS/Agents update
    Note over mm, pua: update done/failed
    pua->>pua: change status to 'DONE'/'FAILED' and update metadata
    pua->> mm: PlatformUpdateStatusRequest(guid, DONE/FAILED)
    mm->>inv: UpdateStatus=DONE/FAILED
    mm->>pua: PlatformUpdateStatusInd (update_source, update_schedule)
    pua->>pua: change status to 'UP-TO-DATE' (if update is not FAILED) and update metadata
    pua->> mm: PlatformUpdateStatusRequest(guid, UP-TO-DATE)
    mm->>inv: UpdateStatus=UP-TO-DATE

Immutable OS Update
-------------------

In the case of the immutable Edge Microvisor Toolkit, the OS packages
are part of the OS image and the only way to update the OS packages is by
providing a new OS image with new package versions. To achieve this, two
read-only partitions are created. The A and B partitions are used to persist
original OS installation (A), and install a new OS in
second partition (B). Depending on the success of the installation of
updated OS, the OS is booted from the new partition (B) or rolled
back to the original partition (A) in case of failure.

By default the OS Resource manager only discovers updated and new OS profiles. It does not link the OS resources to instances.
This allows for use cases where the latest available Edge Microvisor Toolkit version may not be desirable,
and an update within the fleet of Edge Nodes should only install a specific available version of the OS.

It is possible to disable the manual mode and enable OS Resource linkage inside the OS Resource Manager.
In this mode the OS Resource manager will automatically link the new OS Resource
containing the information about the latest Edge Microvisor Toolkit image,
to the desired OS within the Edge Node instances associated with this type of OS.
This means that whenever a newer version of the Edge Microvisor Toolkit is discovered,
a subsequent scheduled update of the Edge Node will result in the latest Edge Microvisor Toolkit being installed.

Immutable OS Update Flow
~~~~~~~~~~~~~~~~~~~~~~~~

.. mermaid::

    sequenceDiagram
    %%{wrap}%%
    autonumber

    participant reg as Release Service
    participant inv as Inventory
    participant nm as OS Resource Manager
    participant mm as Maintenance Manager
    box LightCyan Edge Node
        participant pua as Platform Update Agent / INBC
        participant na as Node Agent
    end

    note over pua, na: EN OS is installed on partition A and all EN components are up

    note over  pua, mm: OS image update start time reached
        pua->>mm: PlatformUpdateStatusRequest(guid, STARTED)
        mm->>inv: Update Instance UpdateStatus (inst_id, UPDATE_IN_PROGRESS)
        pua->>pua: read metadata
    note over  pua, mm: UPDATE OF IMMUTABLE OS IMAGE
    pua->>pua: read metadata
    pua->>pua: compare sha and version of the installed image to the sha and version in the metadata
    alt versions are the same
        pua->>mm: UpdateStatus=UP_TO_DATE
        mm->>inv: UpdateStatus=UP_TO_DATE
    else versions are different
        pua->>reg: download image on partition B using os_image_url
        reg-->>pua: return
        alt download fail
            pua->>mm: UpdateStatus=FAILED FailureReason="DownloadFail"
            mm->>inv: UpdateStatus=FAIL
        else download success
            pua->>mm: UpdateStatus=STARTED
            pua->>pua: install OS on partition B
            pua->>pua: verify installation before reboot
            alt installation fail
                pua->>mm: UpdateStatus=FAILED StatusDetail.Status=Failed FailureReason=InstallationFail
                mm->>inv: UpdateStatus=FAIL
            else installation success
                pua->>mm: UpdateStatus=STARTED
                pua->>pua: set partition B as one-time bootable
                pua->>pua: reboot node
                alt node fails to boot up from partition B, successful boot up from partition A (rollback success)
                    pua->>mm:  UpdateStatus=FAILED StatusDetail.Status=Rolledback FailureReason=BootloaderFail
                    mm->>inv: UpdateStatus=FAIL
                else node fails to boot up from partition B and partition A (rollback failure)
                else node boots up from partition B
                    note over pua: PUA and INBM start
                    pua->>pua: verify update completion and set partition B as bootable
                    alt update fail
                        pua->>mm: UpdateStatus=FAILED StatusDetail.Status=Failed e.g. FailureReason=OSCommitFail
                        mm->>inv: UpdateStatus=FAIL
                        pua->>pua: reboot (rollback to partition A)
                        pua->>mm: UpdateStatus=FAILED StatusDetail.Status=Rolledback e.g. FailureReason=OSCommitFail
                        mm->>inv: UpdateStatus=FAIL
                    else update success
                        pua->>mm: UpdateStatus=UPDATED StatusDetail.Status=SUCCESS FailureReason=NoFailure, sends installed profile_name, profile_version
                        mm->>inv: Filter OSResources by profile_name and profile_version=x, get one (A)
                        inv-->>mm: return
                        mm->>inv: Set Instance UpdateStatus=DONE, current_os=A
                        pua->>mm: UpdateStatus=UP_TO_DATE
                        mm->>inv: UpdateStatus=RUNNING
                    end
                end
            end
        end
    end
