Import Deployment Package
-------------------------

To deploy our applications we first login to the |software_prod_name| Web UI as a user with
Edge Cluster Manager permissions. This is the same user we used to create the cluster.

Within the Web UI, browsing to the Deployments page gives access to where we can import our
Deployment Package for the Tutorial.

The process is described in full detail in the User Guide in :doc:`/user_guide/package_software/deploy_packages`.

Inspect the Deployment Package
------------------------------

After importing the Deployment Package, we can inspect it to see the contents.

.. figure:: ../images/app-orch-tutorial-dp-imported.png
   :alt: Deployment Package imported
   :width: 600
   :align: center

Here you can see the how the Deployment Profiles that we created and how they point to the Application Profiles.

Drilling in to the Applications reveal more details, including the Helm\* charts and the values in each Application Profile.

.. figure:: ../images/app-orch-tutorial-app-imported.png
   :alt: Application imported
   :width: 600
   :align: center

The reference to Helm chart and the OCI image that we created earlier is shown here adjusted to point at the local
oci-registry running on the |software_prod_name|, and the multi-tenancy project we are in.
