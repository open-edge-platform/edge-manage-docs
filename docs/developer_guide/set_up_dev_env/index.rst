Set Up Developer Environment
============================

As a developer you have two options on how to set up your developer environment to start contributing to the Edge Orchestrator:

#. :doc:`/developer_guide/set_up_dev_env/dev_env_onprem` to use on on-prem Virtual Machine
   that runs the Edge Orchestrator. The VM is provided via libvirt and setup is fully automated
   with Terraform. Choose this option if:

   * You want to have the exact mirror of the Edge Orchestrator.

   * You want to develop and/or test OS provisioning with :doc:`/developer_guide/virtual_edge_node/index`.
     The on-prem VM is fully compatible with Virtual Edge Node.

   * You have a powerful-enough machine and resources are not scarce.

#. :doc:`/developer_guide/set_up_dev_env/dev_env_kind` to deploy a test instance of the Edge Orchestrator
   on the KinD cluster. Choose this option if:

   * You do not need to develop/or test OS provisioning. For testing on KinD you will use `ENiC (Edge Node in a Container) <https://github.com/open-edge-platform/virtual-edge-node/tree/main/edge-node-container>`_
     that only simulates an Edge Node and does not run OS provisioning steps.
     However, ENiC is enough to perform basic sanity tests (such as Edge Node statuses, some Day1/Day2 operations, etc.).

   * You have limited resources.

   * You don't need to be consistent with the Continuous Integration environments.

.. toctree::
   :hidden:
   :maxdepth: 1

   dev_env_onprem
   dev_env_kind
