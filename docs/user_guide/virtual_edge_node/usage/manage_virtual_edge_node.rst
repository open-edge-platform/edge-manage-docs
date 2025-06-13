Manage Virtual Edge Node
========================

VMs Deletion
------------

Run the `destroy_vm.sh` script to delete VMs that have already been provisioned.

.. code-block:: shell

    chmod +x ./scripts/create_vm.sh
    ./scripts/destroy_vm.sh

Monitoring and Management
-------------------------

Use the provided scripts and tools to monitor and manage the virtual edge nodes. This includes checking the status of VMs, updating configurations, and ensuring optimal performance.

Useful Commands
---------------

- **Check VM Status**

.. code-block:: shell

  virsh list --all

- **Docker Management**

.. code-block:: shell

  docker ps

- **Vagrant Status**

.. code-block:: shell

  vagrant status

Ensure that all services are running and configurations are up-to-date to maintain seamless operation of virtual edge nodes.
