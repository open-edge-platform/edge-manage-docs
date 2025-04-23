Extensions for Multi-Tenancy
============================

This section covers the process of extending |software_prod_name| components
handling Multi-Tenancy.

Edge Infrastructure Manager Tenant Controller
=============================================

The first step is to extend the tenant termination logic which is handled by
the Tenant Controller. Each time a Project or Organization is removed all the
resources associated with it must be removed as well.

The Tenant Controller is the component orchestrating this complex process and
needs to be aware of the resources that need to be removed. When adding a new
resource, the extensions are in `internal/controller/tenant-terminator.go` file
and look as follows:

.. code-block:: go

    ...
        {resourceKind: inv_v1.ResourceKind_RESOURCE_KIND_OU, terminationFunc: hardDeletion},
    +   {resourceKind: inv_v1.ResourceKind_RESOURCE_KIND_LOCAL_ACCOUNT, terminationFunc: hardDeletion},
        {resourceKind: inv_v1.ResourceKind_RESOURCE_KIND_TENANT, terminationFunc: tenantHardDeletion},
    }

Also, ensure to update the unit tests. Else, your pull request will not be
accepted.

Multi-Tenancy API GW Mapping Update
====================================

The next step is to update the API Gateway mapping. The API Gateway is the
component that routes the requests to the Edge Infrastructure Manager API
server. Make sure to generate a new tag from the API definition and then follow
the steps available in the ``API mapping`` repository.
