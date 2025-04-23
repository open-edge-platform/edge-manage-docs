Create Deployment Packages
==========================

Create Deployment Packages as YAML Files
----------------------------------------

You can use the |software_prod_name| web UI to create an application
and deployment Package through a series of steps in the web pages **or**
choose to create them as YAML files and import these into the web UI
before deploying them to an edge node.

The :doc:`/api/app_catalog` also allows uploading of multiple YAML formatted
files together.

When using the YAML format, the user must use `yamllint
<https://yamllint.readthedocs.io/en/stable/>` to check the syntax of the YAML
files and the `YAML schema
<https://github.com/open-edge-platform/cluster-extensions/blob/main/catalog-orchestrator-0.1.schema.yaml>`_
to validate that the file is structured correctly. Many integrated development
environments (IDEs) allow importing a YAML schema to aid in the editing
process. These checks will also be applied by the API and UI when the files are
uploaded.

Create Deployment Packages in the Web UI
----------------------------------------

A deployment package is a bundle of pre-existing
:doc:`applications </user_guide/package_software/applications>` that are deployed together.
You can select individual applications and create a deployment package.

The following instructions describe how to create a deployment package.

1. On the **Deployment Packages** page, click the **Add Deployment Package**
   button. The **Create Deployment Package** appears.

   .. figure:: images/create_deploy_pack.png
      :scale: 50 %
      :alt: Create Deployment Package

#.  On the **Create Deployment Package** page, enter the following information about the deployment package:

    a.  In the **Name** field, enter the name of the deployment package.
        Intel recommends assigning a meaningful name that will help you to remember the package.
    #.  In the **Version** field, enter the version number of the deployment package.
    #.  In the **Description** field, enter a brief description of the deployment package.
    #.  Click **Next**.

#.  On the **Select Applications** page, choose the applications that you want
    to include in the deployment package and click **Next**.

    a.  The **Deployment Package Profiles** step appears.

#.  The **Deployment Package Profile** page shows the existing deployment
    profiles, where each includes profiles for each application within the deployment package.
    One of the deployment profiles is the default deployment profile, which can be used the
    deployment profile when a user deploys the deployment package with no deployment profile selected.

    If you want to use a different set of application profiles other than the existing
    deployment profiles, click **Add Profile** to add a Deployment Profile.
    To add a deployment profile, see
    :doc:`/user_guide/package_software/add_a_deploy_pkg_profile`.

    .. figure:: images/add_profile_package.png
        :scale: 70 %
        :alt: Add Profile

    .. note:: A default **Deployment Package Profile** will always be created
        that refers to the default profiles of the **Applications** that make up the **Deployment Package**.

#.  In the **Review Applications** page, you can review the details of your
    deployment package. If the details are correct, click **Add Deployment Package**.

A message appears confirming that the deployment package is created.
Once the deployment package creation is complete, the deployment
package appears on the **Deployment Package** list.
