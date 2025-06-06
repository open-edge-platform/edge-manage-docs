Edit Deployment Packages
=================================

Perform the following steps to edit or update a deployment package:

1. In the **Deployment Packages** page, identify the application that you want to update.

#. In the **Action** column, click the three-dot menu and then click **Edit**.

   The **Edit Deployment Package** page appears.

   .. note::

      You cannot update the name and version of the deployment package.

   .. figure:: images/edit_deploypackage.png
      :scale: 50 %
      :alt: Image of Edit Deployment Package Page

#. Edit the required fields on this page and click **Next**.

#. In the **Applications** section, select the applications that you want to add or remove, from the deployment package and click **Next**. The **Deployment Package Profiles** page appears.

#. In the **Deployment Package Profiles** page, you can change the default profile or
click **Add Profile** to use the different set of application profiles other than the existing deployment profiles.

   .. note::

      This is an optional step. You can skip this step if you do not have profiles for your application.

6. The **Review** section displays the details of your deployment package.

   To make changes, click **Previous**; to proceed with creating the deployment package, click **Add Deployment Package**.

   A message appears confirming that the deployment package is updated. After
   the updates are processed, the updated package is displayed in the deployment package list.

Reference for Deployment Package
----------------------------------------

:doc:`/developer_guide/application_developer_workflow/deployment-packages/deployment-package-yaml-reference`
describes the YAML format for the Deployment Package configuration file and describes the
fields in greater detail.
