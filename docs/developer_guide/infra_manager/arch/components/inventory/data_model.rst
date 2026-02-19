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

The split into the Host and Instance resources expresses the split into the
Onboarding and Provisioning phases - the Onboarding phase ends when the Host
resource enters its desired state ``ONBOARDED``, while the Provisioning phase
ends when the Instance resource achieves the ``RUNNING`` state.

For more details on the database schema, refer to this
`article <https://github.com/open-edge-platform/infra-core/blob/main/inventory/docs/database.md>`_.

