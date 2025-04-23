Key Components
==============

Edge Orchestrator on-premise includes a number of key components which are installed as part of the installer script:

* onprem-config-installer
* onprem-ke-installer
* onprem-gitea-installer
* onprem-argocd-installer
* onprem-orch-installer

Please note each of these key components also have an upgrade variety which can be used for upgrade.

1. onprem-config-installer
    - **Function**: The function of onprem-config-installer is to configure the On-Premise Operating System (OS).
    - **Main Tasks**: As part of the configuration process, onprem-config-installer will install a number of tools required for the orchestrator including yq and helm. It will also configure Logical Volume Manager (LVM) for the OS and create PersistentVolume (PV).

2. onprem-ke-installer
    - **Function**: The function onprem-ke-installer is to install RKE2. RKE2 is used provide a Kubernetes* distribution which is run entirely within Docker\* containers.
    - **Main Tasks**: The main task of RKE2 within On-premise Orchestrator is to provide a Kubernetes distribution that focuses on security and compliance.

3. onprem-gitea-installer
    - **Function**: The function of onprem-gitea-installer is to install Gitea\* platform. Gitea platform quickly and easily allows you to set up a self-hosted Git service.
    - **Main Tasks**: Within On-Premise Edge Orchestrator, the main task of Gitea platform is to act as a self-hosted git service which is used to push and pull artifacts used by Edge Orchestrator.

4. onprem-argocd-installer
    - **Function**: The function of onprem-argocd-installer is to install Argo\* CD tool. Argo CD tool is a Kubernetes\* controller which is responsible for application management.
    - **Main Tasks**: The main task of Argo CD tool within On-Premise Edge Orchestrator is to continuously monitor all running applications and compare their live state to the desired state specified in the git repository.

5. onprem-orch-installer
    - **Function**: The function of onprem-orch-installer is to install the Orchestrator. The Orchestrator is the main component of the On-Premise Edge Orchestrator.
    - **Main Tasks**: The main task of Edge Orchestrator is to manage the lifecycle of the applications running on the edge nodes. This includes deploying, scaling, updating and deleting applications.
