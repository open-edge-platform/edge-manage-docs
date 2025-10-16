Applications
============

An application in |software_prod_name| is defined by a single Helm\* chart with predefined runtime configurations or profiles.

The Helm chart and Applications requirements that must be fulfilled for deployment and management using |software_prod_name|, see :doc:`/user_guide/package_software/app_requirements`.

View Applications
~~~~~~~~~~~~~~~~~

To view the **Applications** page, click the **Deployments** tab and then click **Applications** on the left menu.
On the **Applications** page, you can view the list of applications and the available registries.
You can search for applications and registries using the search bar at the top of the page. The other actions you can perform from this page are editing, viewing details, and deleting an application.

Applications are partitioned into two tabs:

*   **Applications** - Displays the list of user provided applications that are available for deployment.
    (The list is empty until a user adds an application)
*   **Extensions** - Displays the list of system provided extensions that are available for deployment.
    (The list is populated with many preconfigured applications. You cannot add or delete applications from this list).

.. figure:: images/application_page0.png
   :scale: 70 %
   :alt: User-defined applications

.. figure:: images/application_page1.png
   :scale: 70 %
   :alt: Application extensions

Application Fields
~~~~~~~~~~~~~~~~~~~

.. list-table::
   :widths: 20, 20
   :header-rows: 1

   * - Field
     - Description

   * - Name
     - Displays the name of the application.

   * - Version
     - Displays the version name.

   * - Chart name
     - The name of the Helm chart. The Helm chart describes the resources loaded onto the application's edge.

   * - Chart version
     - Displays the version of the chart.

   * - Description
     - A brief description of the application.

   * - Action
     - Click the three-dot icon to view, edit, detail, or delete the application.


Fine-tuning Applications
~~~~~~~~~~~~~~~~~~~~~~~~

See :doc:`/developer_guide/application_developer_workflow/deployment-packages/index`
for more details.

From this page, you can do the following tasks:

    * :doc:`/user_guide/package_software/app_details`
    * :doc:`/user_guide/package_software/app_requirements`
    * :doc:`/user_guide/package_software/add_applications`
    * :doc:`/user_guide/package_software/edit_application`
    * :doc:`/user_guide/package_software/delete_application`
    * :doc:`/user_guide/package_software/app_profile`



.. toctree::
   :hidden:

   app_details
   app_requirements
   add_applications
   edit_application
   delete_application
   app_profile

**Command Line Management**

For programmatic access and automation, you can use the orch-cli tool to manage applications.
For detailed command-line operations, see :doc:`/user_guide/package_software/orch_cli/orch_cli_guide`.
