=================
Inventory Service
=================

The Inventory Service manages the state of the infrastructure and leverages gRPC
API definitions, as well as shared libraries such as Inventory client or helper
packages, which are used across different Edge Infrastructure Manager components.

The Inventory micro-service is the state store and the only component that has
persistent state in Edge Infrastructure Manager.

**Features:**

- Declarative APIs for Lifecycle Management (LCM) of the persistent state.
- API subscription and notification mechanism (Publish/Subscribe).
- Built with the support for Multitenancy.
- Hierarchical data-model at its core and Metadata-based categorization.
- Top-down policy-based management and grouping of abstractions into projects, regions and sites.
- Role-based access control (RBAC).
- Attribute-based access control (ABAC).
- Flexible deployments that span from a standalone binary to container-based orchestrations.
- Scalable up to 10k of edge devices.

Learn more
++++++++++

- Check out the source code repository on
  `GitHub <https://github.com/open-edge-platform/infra-core/tree/main/inventory>`__
- Learn how to :doc:`add a resource to the Inventory <../../tutorials/new_resource/inventory>`.

.. toctree::
   :hidden:

   ./inventory/data_model