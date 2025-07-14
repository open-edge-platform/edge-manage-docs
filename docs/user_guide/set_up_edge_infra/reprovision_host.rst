Re-provision Host
======================

|software_prod_name|\ does not include an explicit re-provisioning operation.
If you want to re-purpose your Edge Nodes:

#. :doc:`/user_guide/set_up_edge_infra/delete_host`

#. Start Edge Node Onboarding from scratch (see :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index`)

.. note::
   Provisioning Ubuntu on a node that was previously provisioned and not cleaned up will not succeed. User should manually remove the persistent volumes before re-provisioning either of these below options:

   1. :doc:`/user_guide/set_up_edge_infra/clusters/delete_clusters` from the edge devices using web-UI
   2. Run the command from the edge node ``dd`` command (change the `disk name`): `dd if=/dev/zero of="/dev/<disk_name>" bs=1G count=100`
