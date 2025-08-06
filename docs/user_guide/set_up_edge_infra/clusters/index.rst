Clusters
====================================================================

A cluster is a group of physical or virtual hosts, managed as a single entity,
that runs containerized applications. |software_prod_name| enables you to
manage the following full life cycle of clusters hosted on single edge
node:

* Create a single-node cluster.
* Update existing clusters with new configurations or upgraded software
  versions.
* Monitor the state of clusters.
* Access clusters to troubleshoot or debug application deployments.
* Retire or remove clusters no longer required.

Clusters can be configured currently in the following:


* Single-host cluster: A cluster that resides on one host. You can initiate
  a single-node cluster creation when configuring the host. For the automated
  single node cluster creation method, the default cluster template is utilized
  to configure the cluster settings, deployment instances, and cluster labels.
  For more information,see
  :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`.

.. note::
  In the Kubernetes\* system, a single-host cluster is equivalent to a single-node cluster.

The cluster configuration option is available while configuring
a host and creating a cluster. For creating a cluster while
configuring a host, see
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`.


To manage and monitor clusters, you can view each cluster's details from the
**Clusters** page.
To view the **Clusters** page, click the **Infrastructure** tab
on the top menu and select **Clusters** on the left menu.
On the **Clusters** page, you can view the list of available clusters.

.. figure:: ../images/cluster_list_new.png
   :alt: View Clusters Page

You can view the following details of the cluster:

.. list-table::
   :widths: 20, 20
   :header-rows: 1

   * - Cluster Name
     - Displays the name of the cluster.

   * - Cluster Status
     - Indicates the state of the cluster. The available states are as follows:

       * **unknown** - Unable to determine current phase
       * **pending**- Cluster creation initiated but infrastructure not ready
       * **provisioning** - Resources are being created and configured
       * **provisioned** - Infrastructure is ready but components may still be initializing
       * **active** - Cluster is fully operational
       * **deleting** - Cluster is being removed
       * **failed** - Cluster creation has failed. Consult the
         :doc:`/user_guide/set_up_edge_infra/clusters/cluster_details`
         page for troubleshooting information.

   * - Host Count
     - Displays the number of hosts in the cluster.

   * - Trusted Compute
     - Displays whether if the cluster is compatible with the trusted compute
       feature. The trusted compute feature is only available for clusters
       created with the **Trusted Compute** option enabled.

   * - Actions
     - Click the three-dots (…) icon to perform the following actions:

       * Edit
       * View Details
       * Delete
       * Download Kubeconfig File
       * Copy Kubeconfig File



Click the **>** button to view the details of the hosts available
in the cluster. You can view details of the host like the status,
UUID, and serial number of the host. Click the **View Host Details**
link to view the host details.

.. figure:: ../images/cluster_list_new1.png
   :alt: Cluster list with details


From this page, you can do the following:

* :doc:`/user_guide/set_up_edge_infra/clusters/cluster_details`
* :doc:`/user_guide/set_up_edge_infra/clusters/create_clusters`
* :doc:`/user_guide/set_up_edge_infra/clusters/edit_clusters`
* :doc:`/user_guide/set_up_edge_infra/clusters/delete_clusters`
* :doc:`/user_guide/set_up_edge_infra/clusters/accessing_clusters`


.. toctree::
   :hidden:

   cluster_details
   create_clusters
   edit_clusters
   delete_clusters
   accessing_clusters

