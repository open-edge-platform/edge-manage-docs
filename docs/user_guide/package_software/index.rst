Package and Deploy Applications
====================================

For a quick introduction to the process of packaging and deploying
applications, see :doc:`/user_guide/package_software/quick_start_guide`.

For a more detailed explanation of Application Orchestration see :doc:`/developer_guide/application_developer_workflow/index`.

There is also a detailed tutorial on Application Orchestration that walks through the process developing an application
and packaging and deploying it. See :doc:`/developer_guide/app_orch/tutorials/index`.

Preparing software for automated deployment involves these steps:

1. Import applications

   Import apps to the service from |software_prod_name|\'s registry or from a public or private registry. External registries must be added to the service before first use.

   |software_prod_name| creates a default application profile for each app you
   import. Application profiles let you define chart values that can be overridden at the time of deployment.
   This lets you accommodate a range of runtime environments using a single deployment package.

#. Package and customize applications

   Create a deployment package for each set of applications you want to deploy as a group. If your applications use multiple profiles, specify the profiles to use with this package.

#. Optionally configure a Network to connect multiple applications

   Networks are an advanced feature that allows multiple applications deployed on separate clusters to communicate with each other. Networks are created using the Interconnect feature and
   are described in :doc:`/user_guide/package_software/interconnect`.

#. Configure the package for automated deployment

   Next, set up a deployment for the package. |software_prod_name| offers two methods of automated deployment:

   * In metadata-based deployment, you apply criteria used to automatically
     deploy and update the package to clusters. As new clusters are added to the service, the package will automatically deploy to any that meet the criteria.
   * Alternatively, you can target a custom set of clusters for the deployment.

   To configure your package for metadata-based deployment, add metadata keys and values to the package.

   To deploy to a custom set of clusters, create a list of target clusters.

   See :doc:`/user_guide/package_software/setup_deploy` for step-by-step instructions for configuring each type of deployment.

   For an end-to-end example of applying deployment metadata, see
   :doc:`/user_guide/how_it_works/automated_deployment`.

   Once you have prepared both your infrastructure and software, |software_prod_name| automatically deploys it.

After your software has been deployed, there are several options to manage it in :doc:`/user_guide/monitor_deployments/index`.

You can use pre-curated deployment packages that extend edge clusters to provide enhanced operational capabilities. For more information, see
:doc:`/user_guide/package_software/extension_package`.

.. toctree::
   :hidden:

   registry
   applications
   deploy_packages
   deployments
   extension_package
   quick_start_guide

