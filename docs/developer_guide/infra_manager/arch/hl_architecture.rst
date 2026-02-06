High-Level Architecture
=======================

Architecture Diagram
---------------------

Edge Infrastructure Manager is modular and extensible and it enables the
integration of new components and services. The high-level architecture of the
platform is shown in the following figure:

.. figure:: ./images/eim_arch.png
   :alt: High-Level Architecture of Edge Infrastructure Manager

Key components
---------------

Edge Infrastructure Manager is a framework that provides users with APIs to
manage, monitor, control and perform overall lifecycle management of physical
equipment inventory deployed at the edge locations. It is made up of the
following key components and services:

`API <https://github.com/open-edge-platform/infra-core/tree/main/apiv2>`_ provides a northbound REST API that can be accessed by users and other
Open Edge Platform services. It is a horizontally scalable stateless
service.

`Inventory <https://github.com/open-edge-platform/infra-core/tree/main/inventory>`_ which is the state store and the only component that persists
state in Edge Infrastructure Manager. It works in a declarative manner, by storing for some of the
abstractions not only the current state but also the desired state. Inventory
is a key component of the system, as it is the source of truth for Edge
Infrastructure Manager, and is used by all the Resource Managers to determine
what actions need to be taken.

`Resource Managers <https://github.com/open-edge-platform/infra-managers>`_ reconcile user intents from desire to reality, and adapt
from the high-level inventory abstractions to actual hardware and
configurations performed in the edge infrastructure. Managers works in tandem
with the Edge Node agents to perform the actual work on the edge
infrastructure. Resource Managers are modular, stateless and, depending on the
varieties of infrastructure required or available, different sets of Resource
Managers will be deployed.

`Provisioning and Onboarding Subsystem <https://github.com/open-edge-platform/infra-onboarding>`_ drives Onboarding (device discovery)
and Provisioning (OS installation on Edge Nodes) processes. Internally, it leverages
the `Tinkerbell <https://tinkerbell.org/>`_ engine to perform the initial bootstrapping
and remote provisioning of Edge Nodes with the help of other Edge Infrastructure Manager components,
namely Dynamic Kit Adaptation Module (DKAM) and Onboarding Manager.


`Inventory Exporter <https://github.com/open-edge-platform/infra-core/tree/main/exporters-inventory>`_ exports, using a `Prometheus\* toolkit
<https://prometheus.io/>`_ compatible interface, Inventory metrics that cannot
be collected directly from the edge node software. Observability services then
scrape those metrics.

`Tenant Controller <https://github.com/open-edge-platform/infra-core/tree/main/tenant-controller>`_ orchestrates tenant creation and deletion within the Edge
Infrastructure Manager domain.

`Orch CLI <https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide.html>`_ Tool (Similar to kubectl)
is a binary executable that provides a command-line interface for managing EMF. It allows users to
perform various tasks related to the deployment and
management of edge devices and services.

`Device Management Toolkit <https://github.com/device-management-toolkit/docs>`_ Device Management
Toolkit offers open-source microservices, applications
and libraries designed to simplify and accelerate the integration of Intel’s out-of-band management technology (vPro® AMT) into software solutions.

.. note:: :doc:`/developer_guide/agents/index` are optional software that may be needed under a
   Resource Manager when the infrastructure component does not have an external
   API, or needs a more complicated interaction to be implemented. The
   connection between Agent and Resource Manager is implementation specific,
   and may depend on a variety of factors, but typically the Agent would
   contact the Resource Manager in order to cross network boundaries.


.. note:: Resource managers also work with downstream services (called
   “Providers”) that exposes an API to control and manage the infrastructure
   giving the birth to a layered architecture.
