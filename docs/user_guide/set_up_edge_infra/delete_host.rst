Delete a Host
======================

You can delete a Host that has a deployment associated to it.
In such cases, the deployment will continue to be reconciled within the cluster
and remain operational. it can also operate in other edge locations if
the deleted node was the only one at that `site`.

You might find it beneficial to delete a Host, for instance, when it has been
deauthorized or when it is replaced by another Host with better performance.

.. note::
   Once a Host is deleted, the current installation is not valid. To manage it again via |software_prod_name|\ , you need to reprovision the Host from scratch, starting with the remote installation process.
   To onboard a Host, see the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index` section.

   Intel **does not** recommend deleting a Host unless you are certain you can recover it.

To delete a Host:

1. In the **Hosts** page, identify the Host that you want to delete.

#. If the status of the host, that is **Provisioned**, **Onboarded**, or
   **Registered** is known, switch to the equivalent tab on the **Hosts** page
   and use the search bar to find the host. If the status of the host is not
   known, use the **All** tab to view all known hosts and use the search bar to
   find the host.

#. In the **Action** column click the three-dot icon and then click **Delete**.

   .. figure:: images/delete_host.png
      :alt: Delete host

#. Confirm Host deletion by clicking the **Delete** button in the
   confirmation window.

You can also delete a Host from the **Host Details** page:

1. Go to the **Hosts** page and click on the host that you want to delete.
   The **Host Details** page appears.

#. Click the **Host Actions** drop-down menu and then select **Delete**.

   .. figure:: images/delete_host_details.png
      :alt: Delete host from the Host Details page

This action wipes all of the Host-related information from the edge node.
If you want to delete an active Host, you need to deauthorize it first
(see: :doc:`/user_guide/set_up_edge_infra/deauthorize_host`)
and then do all aforementioned actions in this section.
