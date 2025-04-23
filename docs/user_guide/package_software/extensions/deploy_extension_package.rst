Deploy Extension Package
=============================================================

You can deploy the extension packages manually or automatically, based
on your requirements:

* :ref:`deploy_manually`
* :ref:`deploy_automatically`


.. _deploy_manually:

Deploy Extension Package Manually
-------------------------------------------------

You can manually deploy pre-curated deployment packages in the catalog, like any
other deployment package in the |software_prod_name|\ .

The extension packages will be visible in a separate tab called
**Extensions** in **Deployment Packages** page. For more information on
deploying a package, refer to :doc:`/user_guide/package_software/setup_deploy`.

The extension applications will also be visible in a separate tab called
**Extensions** in **Applications** page.

If you need to deploy a dependency package and its associated applications before deploying the user application, ensure the dependent deployment packages are successfully installed on all edge clusters.

If you want to deploy dependent packages manually, you do not have to include a `deploymentRequirements` section in the user application profile.

The |software_prod_name| will check if the extension or dependency deployment package is already deployed. If it is, the |software_prod_name| will reuse the existing dependency deployment instead of creating a new one.

Currently, you cannot create or delete extension deployment packages or
extension applications; extension applications are pre-curated for use in extension deployment packages.

You can select from different pre-configured profiles when editing an extension
deployment package, but you cannot edit an extension application.

Extension deployment packages provide options to override certain values as
needed. If you need to change the pre-curated extension deployment packages, contact Intel customer support.

Follow these steps to deploy a dependency deployment package manually:

1. Go the **Deployments** tab and click **Deployment Packages** from the
   left pane.

#. Click the **Extensions** tab in the **Deployment Packages** page.

#. Click the three-dot button that corresponds to the package you want to
   deploy, and select **Deploy**. In this example, you are deploying the Virtualization dependency deployment package.

#. Select the profile and click **Next** to override profile values.

#. Review the overriding values and click **Next** to select the deployment profile.

#. Select **Automatic** and click **Next** to provide the deployment details.

#. Specify the deployment details for the Virtualization Extension and click **Next**.

#. Review the deployment details and click **Deploy**.

#. Click **Deployments** from the left pane and note the
   :doc:`/user_guide/package_software/extensions/virtualization_package` being deployed and run.


.. _deploy_automatically:

Deploy Package Automatically through Dependency
-------------------------------------------------

You can establish a dependency between a user application and a deployment package.
In this scenario, you need to deploy the primary deployment package. The dependent deployment
package will be automatically deployed to all clusters where the user application will
be deployed.

If you use automatic deployment for dependent deployment packages, you do not
have to include the `deploymentRequirements` section in the user application profile.

Each user application can have a list of dependent deployment packages. When deploying
a user application, all dependent deployment packages will be deployed in parallel with
the user application.

When two or more user applications depend on a specific extension or dependency deployment
package, |software_prod_name| will check if the extension or dependency deployment package
is already deployed. If it is, |software_prod_name| will reuse the existing dependency
deployment instead of creating a new one.

The `forbidsMultipleDeployments` flag allows the |software_prod_name| to determine whether
multiple instances of the dependency deployment package can run simultaneously.
For pre-curated extension deployment packages, the `forbidsMultipleDeployments` flag is set
to true, by default. If the flag is set to true,` AppOrch` does not allow creating multiple
Deployments for this package. Any clusters that require this package will be automatically
added to the target cluster list of the existing deployment.

You can include pre-curated extension deployment packages as part of your target application
or create your own.

When upgrading deployments, you can upgrade dependency packages by updating the version of
the dependency deployment package in the application profile.

Deleting user deployments must come first before deleting dependency extension deployments.

For example, to illustrate the various steps of automatic deployment of extension packages,
consider a scenario where you want to deploy a deployment package for a virtual machine
application, which must be deployed after Virtualization and CDI.

In this case, you can create the deployment package or use the pre-curated
:doc:`/user_guide/package_software/extensions/virtualization_package`. You can then add the
deployment package information to the list of dependent deployment packages in the virtual
machine application. After you have deployed the deployment package for the virtual machine
application, Virtualization and CDI will be deployed, followed by the virtual machine
application.

To define a dependency, you need to write the application and deployment package yaml files
and import them into the user interface:

#. Create the dependent deployment packages (`dependent-deployment-package.yaml`) and their
   applications (`dependent-application.yaml`). For details, refer to
   :doc:`/user_guide/package_software/add_deploy_pack` and
   :doc:`/user_guide/package_software/add_applications`.

   **"dependent-application.yaml" file**:

   .. code:: yaml

      specSchema: "Application"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: <application_name>
      version: <application_version>
      description: <application_description>

      # User can use pre-created helm registry name which is a part of
      # Edge Orchestrator and
      # load the helm chart of the application to this registry.
      # For more details, see :doc:`/user_guide/package_software/push_registry`.
      # User can optionally create new registry in UI and use that name in this
      # section. For more details, see :doc:`../add_registry`.
      helmRegistry: <helm_registry_name>
      chartName: <chart_name>
      chartVersion: <chart_version>

      # If user application docker image is part of a private repo, then user will
      # need to add the imageRegistry details per application in this file.
      # User can use pre-created docker image registry "harbor-docker-oci". To create
      # registry see :ref:`add_registry`.
      # For more details on how to push images to the registry, see :doc:`/user_guide/package_software/push_registry`.
      imageRegistry: "harbor-docker-oci"

      # Application Profiles are collections of settings that are used when launching an application.
      # These settings are application-specific and are typically known to the developer.
      # Profiles allow the developer to take this bundle of settings and
      # give it a convenient name which can be used to deploy the application.
      profiles:
         - name: <application_profile_name>
            displayName: <application_profile_display_name>
            valuesFileName: /path/to/values.yaml
            # If the user wants to use dependent extension deployment_packages for applications, then
            # the below section should be added. For more details on extension packages see :doc:`/user_guide/package_software/extensions/deploy_extension_package`
            # application. The dependent deployment package should be uploaded
            # to the catalog before uploading the user deployment package.
            deploymentRequirements:
            - name: <dependent_deployment_package_name>
               version: <dependent_deployment_package_version>
               deploymentProfileName: <dependent_deployment_package_profile>
            - name: <dependent_deployment_package_name>
               version: <dependent_deployment_package_version>
               deploymentProfileName: <dependent_deployment_package_profile>

      #example

      specSchema: "Application"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: nginx
      version: 1.1.3
      description: "Nginx for Kubernetes"

      helmRegistry: "rs-helm"
      chartName: "edge/edge-node/nginx"
      chartVersion: "1.1.3"

      profiles:
         - name: default
            displayName: "Default"
            valuesFileName: "values-nginx-default.yaml"

   .. note::

      /path/to/values.yaml contains the overriding values for the Helm\* chart.


   **"dependent-deployment-package.yaml" file**:

   .. code:: yaml

      specSchema: "DeploymentPackage"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: <deployment_package_name>
      displayName: <deployment_package_display_name>
      description: <deployment_package_description>
      version: <deployment_package_version>

      # User can add multiple applications in a deployment package
      applications:
            - name: <application_name>
            version: <application_version>

      # Deployment profile consists of application profiles for each
      # application which is part of the deployment package. Application
      # profiles contain the helm chart values which the user wants to update.

      # User can create multiple deployment profiles. These will be
      # available as options to choose from when user deploys this package through UI
      deploymentProfiles:
            - name: <deployment_profile_name>
            displayName: <deployment_profile_display_name>
            applicationProfiles:
               - application: <application_name>
               profile: <application_profile_name>

      # This flag decides if multiple deployments of the deployment
      # package is allowed or not
      forbidsMultipleDeployments: <true/false>

      # This field lets user choose the namespace in which the various
      # applications will be deployed. If this field is not set, then orchestrator
      # generates unique namespace for each deployment and all applications of the
      # deployment package are deployed in this namespace. Some system
      # namespaces are forbidden to be used for user application E.g: kube-system.
      defaultNamespaces:
         <application_1_name>: namespace_1
         <application_2_name>: <namespace_1/namespace_2>
      forbidsMultipleDeployments: <flag_forbids_multiple_deployments>

      # example
      specSchema: "DeploymentPackage"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: "nginx-pkg"
      description: "nginx support for k8s cluster"
      version: 0.0.12
      forbidsMultipleDeployments: true

      applications:
         - name: nginx
            version: 1.1.3

      defaultNamespaces:
         nginx: nginx

      deploymentProfiles:
         - name: "default-profile"
            displayName: "Default Configuration"
            applicationProfiles:
            - application: "nginx"
               profile: "default"

	.. note::
      To ensure that the deployment of the dependent package is not
      duplicated, set `forbidsMultipleDeployments: true`
      (default value is false, which means duplicated deployment is allowed).


   **"profile.yaml" file**:

   .. code:: yaml

      #example

      # User can add any or all of the fields of the helm chart values file in the profile file for the application.
      # Each application should have a separate profile.yaml file. Each application can have multiple profile.yaml files with unique names.
      image:
         containerDisk:
            registry: <registry-name>
            repository: <repo-name>
            tag: <image-tag>

   .. note::
      You can create the deployment-package.yaml, application.yaml, and
      profile.yaml files and import these together to create a deployment-package in the catalog.

#. Create the target deployment package and its application.

   **"target-application.yaml" file**:

   .. code:: yaml

      specSchema: "Application"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: <application_name>
      version: <application_version>
      description: <application_description>

      helmRegistry: <helm_registry_name>
      chartName: <chart_name>
      chartVersion: <chart_version>

      profiles:
      - name: <application_profile_name>
         displayName: <application_profile_display_name>
         valuesFileName: /path/to/values.yaml
         deploymentRequirements:
            - name: <dependent_deployment_package_name>
              version: <dependent_deployment_package_version>
              deploymentProfileName: <dependent_deployment_package_profile>
            - name: <dependent_deployment_package_name>
               version: <dependent_deployment_package_version>
               deploymentProfileName: <dependent_deployment_package_profile>

      # example
      specSchema: "Application"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: my-example-app
      version: 1.0.0
      description: "My application"

      helmRegistry: "harbor-helm-oci"
      chartName: "my-example-app"
      chartVersion: "1.0.0"

      imageRegistry: "harbor-docker-oci"

      profiles:
         - name: "default"
         displayName: "Default"
         valuesFileName: "values.yaml"
         deploymentRequirements:
            - name: "nginx-pkg"
               version: "0.0.12"
               deploymentProfile: "default-profile"

   .. note::
      Application Profile has `deploymentRequirements` that is the list of
      dependent deployment packages. Each element of this list has `name`, `version`, and `profile` of the dependent deployment package.

   **"target-deployment-package.yaml" file**:

   .. code:: yaml

      specSchema: "DeploymentPackage"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: <deployment_package_name>
      displayName: <deployment_package_display_name>
      description: <deployment_package_description>
      version: <deployment_package_version>

      applications:
      - name: <application_name>
         version: <application_version>

      deploymentProfiles:
      - name: <deployment_profile_name>
         displayName: <deployment_profile_display_name>
         applicationProfiles:
            - application: <application_name>
              profile: <application_profile_name>


      # example
      specSchema: "DeploymentPackage"
      schemaVersion: "0.1"
      $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

      name: "my-example-package"
      displayName: "My example package"
      description: "Package with my application"
      version: "1.0.0"

      applications:
         - name: my-example-app
         version: 1.0.0

      deploymentProfiles:
         - name: "default"
         displayName: "Default"
         applicationProfiles:
            - application: "my-example-app"
               profile: "default"

#. Import the yaml files to the |software_prod_name|\ . For more information on
   importing yaml files, refer to :doc:`/user_guide/package_software/import_deployment`.

The nginx-pkg package will be deployed automatically when "my-example-package" is deployed.

When you try to delete the extension deployment package (`nginx-pkg`) when the
primary deployment package is running, you will see an error message. Follow these steps to delete the primary deployment package (`my-example-package`) without deleting the extension package:

#. Go the **Deployments** tab and click **Deployments** from the left pane.
#. Click the three-dot button corresponding to `my-example-package`, and
   select **Delete**.
#. In the confirmation prompt, click **Delete**.

Now, follow these steps to delete the extension deployment package
(`nginx-pkg`):

#. Go to the **Deployments** tab and click **Deployments** from the left pane.
#. Click the three-dot button corresponding to `nginx-pkg`, and
   select **Delete**.
#. In the confirmation prompt, click **Delete**.
