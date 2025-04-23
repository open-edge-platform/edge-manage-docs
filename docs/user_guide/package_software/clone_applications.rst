Clone Deployment Package
==============================

You can replicate a deployment package to create a new instance with similar functionality. The following are a few scenarios for which you can clone an deployment package:

* Update a deployment package but want to keep the older package active.
* Test a new version of the deployment package before deploying it. In this scenario, you can clone the deployment package, make the required changes, and then set up a deployment environment that limits the deployment of the new package to a few test servers.
* Make changes to the deployment package profile.

Perform the following steps to clone a deployment package:

1. In the **Deployment Packages** page, identify the package that you want to clone.

#. In the **Action** column, click the three-dots menu, and then click **Clone**.

   The **Clone Deployment Package** page appears:

   .. figure:: images/clone_deploypack_new.png
      :scale: 50 %
      :alt: This is the alternate text

#. In the General Information section, update the details of the package.

   .. note:: An updated name of the deployment package appears by
      default. Updating the other details are optional.

#. In the **Applications** section, select the applications that you want
   to add to or remove from the deployment package and click **Next**.

#. In the **Deployment Package Profiles** page, you can change the
   default profile or click **Add Profile** to use the different set of
   application profiles other than the existing deployment profiles.

   .. note:: You can choose to not make any changes in the **Deployment
      Package Profiles** section.

#. The **Review** section displays the details of your deployment package.
   To make changes, click **Previous** and to proceed with cloning the
   deployment package, click **Clone Deployment Package**.

A message appears confirming that the deployment package is created.
After the updates are processed, the package is displayed in the
**Deployment Package** list.
