Data Model
==========

Each Edge Node is represented in the Inventory data model as a pair of Host and
Instance resources (with a 1:1 relationships between them). A Host resource
represents a bare metal machine with its basic device information like UUID or
Serial Number. An Instance resource describes the actual OS that is running on
the bare metal machine.

Both Host and Instances follow the current and desired state model and the
`Onboarding Manager <../onboarding-provisioning.html#onboarding-manager>`__
is responsible for running these resources to completion, i.e., achieving the desired state.
The manager also acts as a
`host resource manager <../resource-managers.html#host-resource-manager>`__
as it is responsible for updating statuses with the ``ONBOARDED`` or
``PROVISIONED`` values. The :doc:`node agent </developer_guide/agents/index>`
calls the host resource manager via gRPC and sets the ``hostStatus`` to ``RUNNING``.

The division between the Host and Instance resources reflects the division between the
Onboarding and Provisioning phases.
The Onboarding phase ends when the Host
resource enters its desired state ``ONBOARDED``, while the Provisioning phase
ends when the Instance resource achieves the ``RUNNING`` state.

For more details on the database schema, refer to this
`article <https://github.com/open-edge-platform/infra-core/blob/main/inventory/docs/database.md>`_.

