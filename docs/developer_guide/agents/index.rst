Edge Node Agents
================

`Edge Node Agents <https://github.com/open-edge-platform/edge-node-agents>`_ are a collection of OS-level agents that make up an Edge Node.

.. figure:: ./arch/images/agents_stack.png
   :alt: High-Level functional domains of Edge Node Agents

Edge Node Agents are deployed as system daemons during the provisioning of the
Edge Node.

Each Edge Node Agent is packaged and installed according to the requirements of
the OS it is running on. In the case of mutable OSes, they are dynamically downloaded and
installed as `.deb` packages. In the case of immutable OSes, they are already part of
the OS distribution.

.. toctree::
   :hidden:
   :maxdepth: 1

   arch/index
   tutorials/index
