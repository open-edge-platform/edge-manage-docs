Developing Guidelines for Edge Node Agents
==========================================

This section covers the process of developing and contributing an Edge Node Agent.

Common Code and Functionality for Ubuntu\* and Edge Microvisor Toolkit
----------------------------------------------------------------------

An Edge Node supports two types of Operating Systems: Ubuntu\* and `Edge Microvisor Toolkit <https://github.com/open-edge-platform/edge-microvisor-toolkit>`_. All Edge Node Agents support deployment on both types of OS.
Each Edge Node Agent must be capable of being packaged as both Debian\* package (Ubuntu) and RPM package (Edge Microvisor Toolkit).
The implementation and functionality provided by an Edge Node Agent must be the same where physically possible.
In cases where the paths or files differ between the OSes, the difference should be handled within the specification and/or the configuration
files of the `debian` or `rpm` package (i.e., Edge Node Agent systemctl service files for each OS).

Occasionally, while the overarching functionality provided by an Edge Node Agent may be the same across OSes, the underlying functionality/implementation
may differ drastically due to the nature of the OS. In such cases, the divergence must still be handled by the same Edge Node Agent.
Platform Update Agent is an example of this is. It provides the overarching functionality of updating the Edge Node with the latest software versions.
Under-the-hood updates happen differently for Ubuntu and Edge Microvisor Toolkit due to the nature of the OS.
The mutable Ubuntu OS is updated via `apt` package manager, while the immutable Edge Microvisor Toolkit is updated via `A/B Update` method.
Both of the update workflow scenarios are covered as part of the same Edge Node Agent being able to differentiate between the OSes.

Developing the Edge Node Agent
------------------------------

The design and development of an Edge Node Agent must adhere to the guidelines set out in :doc:`../../../agents/arch/hl_architecture`.
The source code of the Edge Node Agents is developed as part of the `edge-node-agents <https://github.com/open-edge-platform/edge-node-agents>`_ repository.
Each Edge Node Agent is contained within its own directory.
A new directory needs to be created when contributing a new Edge Node Agent that will contain its source code.
Contributions to existing Edge Node Agents are to be done within the existing directories.
The Edge Node Agents are developed using Go\* programming language.
Every Edge Node Agent, along with the source code, must consist of:

- Makefile
- Suitable set of tests
- Suitable set of configurations
- VERSION file
- README file describing the functionality of the Edge Node Agent and how to use the Make targets

Every Edge Node Agent change must be reflected in the top-level directory of the repo:

- Individual Makefile's targets must be able to be called from the top-level Makefile.
- The agent must be present in the `ena-manifest.yaml` file with a version bumped on every non-development version update for the agent.
- The CHANGELOG.md is to be updated.

Edge Node Agent Directory Structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: bash

   .
   ├── cmd # Main source code directory
   ├── config # Edge Node Agent and security configurations directory
   │   ├── apparmor.d # AppArmor configuration directory
   │   ├── ena-agent.yaml # Edge Node Agent configuration file
   │   └── sudoers.d # User configuration
   ├── debian # Debian configurations directory
   ├── go.mod
   ├── go.sum
   ├── internal # Internal packages directory
   ├── Makefile # Makefile for the Edge Node Agent
   ├── README.md # Readme document
   ├── requirements.txt # Pre-requisites
   ├── test # Test directory
   └── VERSION # Semantic Version

Edge Node Agent Make Targets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Edge Node Agents are expected to be built, tested and packaged using Make targets.
The top-level Makefile in the repository consists of targets that call Makefile targets in Edge Node Agent's individual directories.
To maintain this modularity, the Makefile targets within the sub-directories must remain consistent across agents.
The typical targets required of an Edge Node Agent are:

.. code-block:: bash

    Target               Description
    ------               -----------
    build-agents         runs `build` target for each sub directory/agents
    clean-agents         runs `clean` target for each sub directory/agents
    fuzztest-agents      runs `fuzztest` target for each sub directory/agents
    lint-agents          runs `lint` target for each sub directory/agents
    package-agents       runs `package` target for each sub directory/agents
    tarball-agents       runs `tarball` target for each sub directory/agents
    test-agents          runs `test` target for each sub directory/agents

Building and Running Edge Node Agent Binary
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To build an Edge Node Agent binary, run the `make build` target within the Edge Node Agent's directory.

.. code-block:: bash

    make build

To run the binary, start the application with the Edge Node Agent configuration file as an argument:

.. code-block:: bash

    ./build/artifacts/<edge-node-agent> -config config/<edge-node-agent>.yaml

Note that Edge Node Agent's functionality may be dependent on other agents, i.e., directories and sockets created by other agents.

Creating an Edge Node Agent tarball
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create a tarball of Edge Node Agent-related source/artifacts, run the `make tarball` target.

.. code-block:: bash

     make tarball

The artifact will be output to the `build/artifacts/<edge-node-agent>-<version>.tar.gz` location.

Testing the Edge Node Agent on Ubuntu
-------------------------------------

Testing an Edge Node Agent can be done on an existing Edge Node with Ubuntu OS.
To access an Edge Node use the local SSH feature :doc:`../../../../../user_guide/advanced_functionality/configure_ssh_public_keys`.

Building Debian Package
^^^^^^^^^^^^^^^^^^^^^^^

To build the Debian package for an Edge Node Agent, use the `make package` target within the Edge Node Agent's directory

.. code-block:: bash

    make package

The Debian package will be present under `./build/artifacts` directory:

.. code-block:: bash

    ls build/artifacts/
    <edge-node-agent>_<VERSION>_amd64.build      <edge-node-agent>_<VERSION>_amd64.changes  package
    <edge-node-agent>_<VERSION>_amd64.buildinfo  <edge-node-agent>_<VERSION>_amd64.deb


Edge Node Agent Installation Test Workflow on Ubuntu OS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When testing a change to an existing Edge Node Agent, the previous version of the Edge Node Agent should be uninstalled before a new package is installed.

.. code-block:: bash

    sudo apt remove <edge-node-agent>

To install a new Edge Node Agent or a new version of the Edge Node Agent, copy the agents Debian package to the Edge Node and install using the `apt` tool.

.. code-block:: bash

    sudo apt install -y ./build/artifacts/<edge-node-agent>_<VERSION>_amd64.deb

To check that the Edge Node Agent is installed, check the service status (Hardware Discovery Agent is used as an example):

.. code-block:: bash

    systemctl status hardware-discovery-agent.service
    ● hardware-discovery-agent.service - Hardware Discovery Agent
    Loaded: loaded (/lib/systemd/system/hardware-discovery-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Wed 2025-03-26 17:07:40 UTC; 10min ago
    Main PID: 21848 (hd-agent)
    Tasks: 13 (limit: 4562)
    Memory: 20.1M (max: 128.0M available: 107.8M)
    CPU: 50.581s
    CGroup: /system.slice/hardware-discovery-agent.service
            ├─21848 /opt/lp/bin/hd-agent -config /etc/lp/node/confs/hd-agent.yaml
            ├─21894 udevadm monitor --udev --subsystem-match=block --subsystem-match=net
            ├─23609 sudo lshw -C display
            └─23610 lshw -C display

Testing the Edge Node Agent on Edge Microvisor Toolkit
------------------------------------------------------

Testing of an Edge Node Agent can be done on an Edge Microvisor Toolkit Edge Node installed using the ISO image.
Edge Microvisor Toolkit installed using the ISO image will not have any Edge Node Agents running by default, but will be mutable, allowing an agent to be installed from RPM.

Using Edge Microvisor Toolkit ISO Installation as a Testing Platform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the ISO image is obtained, it can be installed on a bare-metal server or virtual machine.
- For installation on bare-metal system, mount the ISO to USB drive or Virtual Disk.
- For installation on a virtual machine, follow instructions for the virtualization software in use.
Once booted from ISO, follow onscreen installation instructions.
The Edge Node Agent RPMs can be built and installed on the system using the `tarball` generated out of the
`edge-node-agents <https://github.com/open-edge-platform/edge-node-agents>`_ `make tarball` artifact for a given Edge Node Agent.

Building RPM
^^^^^^^^^^^^

The Edge Node Agents that are part of an Edge Microvisor Toolkit are built as RPMs using `the SPEC files
provided in the edge-microvisor-toolkit <https://github.com/open-edge-platform/edge-microvisor-toolkit/tree/3.0/SPECS>`_ repository.

The RPM packages to be included as part of Edge Microvisor Toolkit are built and released using a CI in that repo. They
can also be individually tested by manually including the Edge Node Agent tarball and editing spec file on a local system.

`rpm-build` tool can be installed on the system to build the RPM packages.

Note that the `dnf` will attempt to download packages from `http://rpm-edgemicrovisor.intel.com/3.0/`. Ensure that
the address is reachable for `dnf` if the system is placed behind a corporate proxy.

.. code-block::

    sudo dnf install rpm-build

To test the build of RPM package for an Edge Node Agent, create a SOURCE directory and include the `tarball` package
build from the Edge Node Agent's `make tarball` target of `edge-node-agents <https://github.com/open-edge-platform/edge-node-agents>`_ repository.

.. code-block::

    sudo mkdir /usr/src/azl/SOURCES/
    sudo cp <edge-node-agents-repo>/<edge-node-agent>/build/artifacts/<edge-node-agent>-<version>.tar.gz /usr/src/azl/SOURCES/ #copy Edge Node Agent tarball
    sudo cp <edge-node-agent>*.* env_wrapper.sh <any_other_needed_artifact> /usr/src/azl/SOURCES/ #Copy the artifacts in SPEC needed to build the RPM

Bump the VERSION in spec file to that of new Edge Node Agent being tested and make any other changes if necessary.
In case of a new Edge Node Agent, create the necessary spec and configs using one of the other Edge Node Agents as an example.

.. code-block::

    cat <edge-node-agent>.spec | grep Version
    Version:        <version>

Build the rpm package.

.. code-block::

    sudo rpmbuild -bb <edge-node-agent>.spec

Existing Edge Node Agents are expected to build two RPM packages: the actual <edge-node-agent>.rpm and <edge-node-agent>-selinux.rpm

.. code-block::

    ls  /usr/src/azl/RPMS/x86_64/
    <edge-node-agent>-<version>>-1.emt3.x86_64.rpm
    ls  /usr/src/azl/RPMS/noarch/
    <edge-node-agent>-selinux-<version>-1.emt3.noarch.rpm

Test the installation of the package using the generated RPM:

.. code-block::

    sudo dnf install /usr/src/azl/RPMS/noarch/<edge-node-agent>-selinux-<version>-1.emt3.noarch.rpm  /usr/src/azl/RPMS/x86_64/<edge-node-agent>-<version>-1.emt3.x86_64.rpm

    Dependencies resolved.
    =========================================================================================================================================================================================================================
    Package                                                            Architecture                             Version                                                Repository                                      Size
    =========================================================================================================================================================================================================================
    Installing:
    <edge-node-agent>                                                  x86_64                                   <version>-1.emt3                                       @commandline                                   4.6 M
    <edge-node-agent>-selinux                                          noarch                                   <version>-1.emt3                                       @commandline                                    16 k
    Installing dependencies:
    <>

    Install  <x> Packages
    <>

    Installed:
    <>

    Complete!

Test that the Edge Node Agent is installed and the systemctl service is loaded:

.. code-block::

    dnf list installed  | grep <edge-node-agent>
    <edge-node-agent>.x86_64             1.5.10-1.emt3          @@commandline
    <edge-node-agent>-selinux.noarch     1.5.10-1.emt3          @@commandline

    systemctl status <edge-node-agent>

Contributing the Edge Node Agent to Edge Node Agents Repository
---------------------------------------------------------------

To contribute new agents and changes to the `edge-node-agents <https://github.com/open-edge-platform/edge-node-agents>`_ repository the following criteria should be met:

* The Edge Node Agent must be developed as per design principles set out in :doc:`../../../agents/arch/hl_architecture`
* The Edge Node Agent must be be tested on Ubuntu
  * It must be tested on functional level
  * Debian package build and install must be tested
  * Unit tests must be written and passing
* The Edge Node Agent must be tested on Edge Microvisor Toolkit
  * RPM package build and install must be tested
* A Pull Request must be opened in edge-node-agents repo
* The Pull Request will be reviewed before contribution is accepted

Contributing Edge Node Agent to Ubuntu based deployments
--------------------------------------------------------

For the Edge Node Agent contributions to be absorbed into Ubuntu based Edge Node deployments, the `ena-manifest.yaml` version must be adjusted
in the `edge-manageability-framework <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/argocd/applications/configs/infra-onboarding.yaml>`_ repo
in the `infra-onboarding.yaml` file under the `enAgentManifestTag` field.

Contributing Edge Node Agent to Edge Microvisor Toolkit
--------------------------------------------------------

For the Edge Node Agent contribution to be absorbed into the Edge Microvisor Toolkit, a contribution must be made to the
`edge-microvisor-toolkit <https://github.com/open-edge-platform/edge-microvisor-toolkit>`_ repository.

Once the Edge Node Agent is tested and merged into the `edge-node-agents <https://github.com/open-edge-platform/edge-node-agents>`_ repository,
changes or additions to the SPEC files of the Edge Node Agent must be made in order for the RPMs to build and be included in the Edge Microvisor Toolkit release.

The SPEC file changes should be made into the `edge-microvisor-toolkit/tree/<version>/SPECS/<edge-node-agent>` directory.
For an example on how to structure the SPEC/<edge-node-agent> content to build RPMs, follow the implementation for other Edge Node Agents.
An example SPEC directory structure for `hardware-discovery-agent` is captured below.

.. code-block::

    ~/edge-microvisor-toolkit/SPECS/hardware-discovery-agent ]$ tree
    .
    ├── CVE-2023-47108.nopatch                      # Identifies know vulnerabilities
    ├── CVE-2024-45338.nopatch                      # Identifies know vulnerabilities
    ├── env_wrapper.sh                              # Helper script to update Edge Node Agent configuration.
    ├── hardware-discovery-agent.conf               # Defines how configuration settings for SELinux policy modules
    ├── hardware-discovery-agent.service            # Edge Node Agent systemd.service definition.
    ├── hardware-discovery-agent.signatures.json    # Digital signature of the packaged files.
    ├── hardware-discovery-agent.spec               # Configuration file defining how the package will be build.
    ├── hd_agent.fc                                 # Defines SELinux security contexts for files installed by RPM
    └── hd_agent.te                                 # Defines SELinux policy modules and customizations to SELinux policies

The contribution must be made through a Pull Request in the repository. The Pull Request will be reviewed before merging.
