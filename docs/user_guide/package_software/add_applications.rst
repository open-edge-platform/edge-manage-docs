Add Application
======================

After uploading the images and charts to your registry, you can add them as an
application for use within |software_prod_name|. You can also add
:doc:`application profiles </user_guide/package_software/app_profile>`
to customize your application.

Before adding an application, ensure it meets the required criteria. For detailed
information about application requirements, see :doc:`/user_guide/package_software/app_requirements`.

Perform the following steps to add an application:

1. Click **Deployments** on the top menu, then click **Applications** on the left menu. The **Applications** page appears.
#. In the **Applications** page, click **Add Application**. The **Add Applications** page appears.

   .. figure:: images/add_applications.png
      :scale: 50 %
      :alt: Add Application

#. Select the source to create the application on the **Add Applications** page. Enter the following details:

   a. Select the **Helm Registry Name** from the drop-down list.
   b. **Registry Location** should be displayed.
   c. Enter or select the chart name and version in the **Chart Name** and **Chart version** fields, respectively.
   d. Select the **Image Registry Name** from the drop-down list to import an image for your application.
   e. **Registry Location** of the image should be displayed.
   f. Click **Next**. The **Enter Application Details** steps appear.

   .. note:: The Helm chart name and version will be available in the
      drop-down list if the registry is a Harbor\* registry.  If not, you will
      need to manually enter the chart name and version.

#. In the **Enter Application Details** page, enter the basic information about your application.

   a. In the **Name** field, enter the application's name. Intel recommends assigning a meaningful name that will help you remember the application.
   b. In the **Version** field, enter the application's version number. It
      should follow the <major>.<minor>.<patch> format, for example 1.0.0.
      The version number used here is for versioning applications within |software_prod_name| and does not need to match the version number used
      for the application's Helm chart. There is no negative implication of choosing a different version number. |software_prod_name| will always install
      the version of the Helm chart specified by the **Chart version** field.
   c. In the **Description** field, enter a brief description of the application.

#. Click **Next**. The **Add Profiles** page appears.

#. A profile is a set of configuration values that customize an application, see
   :doc:`add parameter templates </user_guide/package_software/param_template>` to
   configure the values. You can select a default profile in the **Add Profiles** page. You can also add a new profile. For more information
   about Profiles and how to add them, see the
   :doc:`/user_guide/package_software/app_profile` section.

#. Click **Next**. The **Review** page appears.

#. Review the application details. The **Review** page displays the information you entered in the previous steps.

   * To proceed with the provided information, click **Add Application**.
   * To edit the information, click **Previous**.

   After the updates are processed, you will be redirected to the
   **Applications** page, and the application is displayed on the **Applications** page.

Reference for Application
---------------------------

An Application can also be :doc:`Imported <import_deployment>` from a YAML file
while importing a Deployment Package.

:doc:`/developer_guide/application_developer_workflow/deployment-packages/application-yaml-reference`
describes the YAML format for the Application configuration file and describes the
fields in greater detail.
