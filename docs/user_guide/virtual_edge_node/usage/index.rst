Usage
=====

Overview
--------

The VM-Provisioning component offers a suite of scripts that automate the setup and pre-configuration of virtual machines.
These scripts can be used on physical machines (bare metal) or within existing virtualized environments, utilizing Vagrant, and Libvirt APIs.

Target Audience
---------------

This information is designed for:

- **Edge Manageability Framework E2E Developers**: Open-source community members interested in contributing to Edge Manageability Framework,
  but without access to Edge Node (EN) hardware can leverage Virtual Edge Node (VEN).
  In particular, those interested in contributing to Onboarding and Provisioning parts of Infrastructure management will find this guide useful.
  This setup also facilitates the parallel (simultaneous) deployment of multiple virtual edge nodes to evaluate performance scaling of the Edge Orchestrator's onboarding/provisioning services.

What It Provides
----------------

- **Blank Virtual Machine Setup**: Offers the option to use either Edge Microvisor Toolkit or Ubuntu, expandable for clustering and application deployment testing.

Benefits
--------

- **Eliminates Redistribution Issues**: By distributing only instructions and scripts, it avoids complications related to redistributing software.

Features
--------

- **Package Installation**: Identifies and installs necessary packages and dependencies before VM provisioning,
     while allowing users to specify additional packages or versions tailored to specific deployment needs.
     This ensures a seamless setup process, reducing manual effort and minimizing errors.

- **Reference Templates**: Offers a library of templates for common VM configurations, streamlining the setup process and ensuring best practices.
     Users can modify existing templates or create new ones, providing flexibility to adapt to unique deployment scenarios and requirements.

- **VM Resource Configuration**: Automatically adjusts VM resources based on workload demands, optimizing performance and resource utilization.
     Seamlessly integrates with orchestrators to specify URLs for downloading EFI boot files, ensuring efficient and secure boot processes.

- **Monitoring**: Uses socket_login.exp to give live updates on VM provisioning, helping quickly spot and fix issues. Provides detailed logs and alerts for proactive monitoring and management.

* :doc:`how_it_works_content`
* :doc:`getting_started`
* :doc:`setup_virtual_edge_node`
* :doc:`deploy_virtual_edge_node`
* :doc:`manage_virtual_edge_node`


.. toctree::
     :hidden:

     how_it_works_content
     getting_started
     setup_virtual_edge_node
     deploy_virtual_edge_node
     manage_virtual_edge_node

