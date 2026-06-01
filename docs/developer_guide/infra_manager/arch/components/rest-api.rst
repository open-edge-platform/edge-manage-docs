========
REST API
========

REST API is a standalone component to be used to translate HTTP requests into
internal gRPC calls to the :doc:`Inventory <inventory>` component.
It may be implemented as multiple Northbound APIs which leverage the OpenAPI definitions
and the auto-generated golang code, which can be used in other components/
external projects to make REST API calls, using native golang code.

**Features:**

- REST APIs with Role based access control (RBAC).
- Stateless service with the capability to be horizontally scaled.
- Adapts user oriented abstractions to/from Protobuf resources which are
  consumed by Inventory and by other Edge Infrastructure Manager components.
- Built with the support for Multitenancy.
- Flexible deployments that span from a standalone binary to container-based
  orchestrations.

**References:**

- To learn how to set up the API on your machine,
  refer to `the instructions <https://github.com/open-edge-platform/infra-core/blob/main/apiv2/README.md#get-started>`__.
- Check `API guidelines <https://github.com/open-edge-platform/infra-core/blob/main/apiv2/docs/guide.md>`__.

