Automated Deployment
=====================================

In a distributed edge network, edge nodes can consist of various device types
and may be situated in remote areas, making them challenging to access and
maintain. In the past, operators had to go to different locations to update
the software on edge nodes manually.

In |software_prod_name|\ , automated deployment lets you automatically deploy
and update applications to clusters. There are two methods of automated
deployment:

1.	**Metadata-based:** Deploys applications to clusters based on labels
that you create or are automatically created for you.

#.	**Manual:** Deploys applications to a list of clusters that you define.

Metadata-based Deployment
---------------------------

In a metadata-based deployment, application deployment packages are assigned to
clusters based on labels consisting of key-value pairs. Cluster metadata labels
are either user-defined or automatically created based on location information.
Deployment packages can be deployed to many clusters by specifying a label or
set of labels they all share.

This method automatically scales. As new clusters matching a deployment
package's metadata labels are brought online, software packages are
automatically deployed to them.

If an application deployment package is deployed with multiple metadata labels,
the applications are only deployed to clusters that match *all* labels.

User-defined Metadata
^^^^^^^^^^^^^^^^^^^^^

A wide range of deployment criteria, derived from business needs, can be
satisfied by carefully assigning metadata labels to the edge clusters.
Cluster labels are key-value pairs defined at cluster creation time.
The key is called "Category" in the UI.

Depending on how you manage your deployments, you might define key-value
pairs representing different customers, types of infrastructure, or
environments.
For example, if you manage a shared infrastructure for different customers
and desire to deploy separate applications for each customer, you could
define labels based on your customers:

- Category: *customer*, Value: *customer1*
- Category: *customer*, Value: *customer2*

Likewise, if you want to manage your application deployments using the
blue/green deployment technique, you could define labels for each environment:

- Category: *environment*, Value: *blue*
- Category: *environment*, Value: *green*

With this set of metadata labels, for each customer you might deploy two
copies of a deployment package: one to the *blue* environment and one to
the *green*. In this case, it would be easy to upgrade the applications
in *customer2*'s *green* deployment environment without affecting other
customers or environments.

Location Information
^^^^^^^^^^^^^^^^^^^^^^

Each host is associated with a site and each site belongs to a region. You
can create hierarchies of regions, allowing flexible infrastructure management.
Labels associated with Sites and Regions enable mapping deployments to your
physical infrastructure.

Each cluster will automatically be assigned metadata labels based on its
position in the hierarchy. For example, if *site1* belongs to *region1*,
and *region1* has parent *region2*, then clusters at *site1* would get
these labels:

- Category: *region*, Value: *region1*
- Category: *region*, Value: *region2*

You can also assign additional metadata labels to sites and regions that
will be applied to the clusters. All location labels can be used to target
application deployments in the same way as the user-defined metadata.

Enabling Automated Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To enable an automated deployment based on metadata, you must first do
the following:

- :doc:`/user_guide/set_up_edge_infra/provision_host`,
  including adding location information (for the location-based labels).

- :doc:`/user_guide/set_up_edge_infra/create_clusters`, including adding
  user-defined metadata labels for the cluster.

- :doc:`/user_guide/package_software/setup_deploy`, including adding the target labels for
  the deployment.

Once these elements are in place, |software_prod_name| will automatically
deploy software and updates to clusters matching the criteria. As new
clusters matching the criteria are brought online, the software is
automatically deployed to them.


Metadata Rules
^^^^^^^^^^^^^^^^^^^^^^

In the deployment process you must adhere to the metadata rules. Metadata
enforces a lower case rule and does not accept spaces.

As Regions dynamically create metadata, they follow the same naming constraints as metadata.

Deployment and Site names may contain uppercase and lowercase characters, numbers, hyphens, slashes and spaces.


Manual Deployment
---------------------

Manual deployment is a simplified form of automated deployment. Instead of
relying on cluster metadata labels, this method deploys applications to a
custom list of clusters.

In this way, you can create a deployment target from clusters that do not
share common criteria. Once created, the list of clusters cannot be modified.

See :doc:`/user_guide/package_software/setup_deploy` for information on associating a list of clusters
with a software deployment.

