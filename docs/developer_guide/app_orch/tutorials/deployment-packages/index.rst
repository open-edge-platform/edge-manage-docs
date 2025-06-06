Deployment Package
==================

As outlined in the Developer Workflow :doc:`/developer_guide/application_developer_workflow/deployment-packages/index`,
a Deployment Package is a collection of Applications, each linked to one Helm\* chart.

In this step you will write a Deployment Package to deploy the Tutorial Server and the Tutorial Web UI.

Create the Application
----------------------

Create a new directory at the top level called **tutorial-deployment** and then create the Application
as **tutorial-server-app.yaml** in the same directory with the following content for Tutorial Server:

.. code:: yaml

    specSchema: Application
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    name: tutorial-server
    version: "0.1.1"
    description: "Tutorial Server"

    imageRegistry: "harbor-docker-oci"
    helmRegistry: "harbor-helm-oci"
    chartName: "tutorial-server"
    chartVersion: "0.1.0"

    profiles:
    - name: "default"
      valuesFileName: "tutorial-server-values-default.yaml"
    - name: "alternate"
      valuesFileName: "tutorial-server-values-alternate.yaml"
    - name: "alternate-pt"
      valuesFileName: "tutorial-server-values-alternate-pt.yaml"
      parameterTemplates:
      - name: "tutorialServer.greeting"
        displayName: Greeting message
        default: "Deployed by Application Orchestration (pt)"
        type: string
      - name: "tutorialServer.initialCount"
        displayName: Initial count
        default: "0"
        type: string

The format of the Application YAML file is described in detail in
:doc:`/developer_guide/application_developer_workflow/deployment-packages/application-yaml-reference`.

Here you have three profiles: one for the default values and two for alternate values. This provides two ways to override
the Helm chart values at deployment time - a) by having different values files and b) by having values parameter templates
that can be chosen at deployment time.

.. note::
    The **imageRegistry: harbor-docker-oci** is the Registry object pointing to where the Tutorial Server image can be
    retrieved by the Edge Node. Later, you will push the image to this registry. This statement is only necessary if
    the image is not in a public registry. Full details on the registry can be found at :doc:`/user_guide/package_software/registry`.

    Likewise, the **helmRegistry: harbor-helm-oci** is the Registry object pointing to where the Tutorial Server Helm chart
    will be retrieved from. This statement is always necessary even in the case of public registries. Both OCI and traditional
    Helm registries can be referred to. If the registry requires authentication, the credentials can be added to the Registry
    object.

Add another file **tutorial-web-ui-app.yaml** in the same directory with the following content for Tutorial Web UI:

.. code:: yaml

    specSchema: Application
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    name: tutorial-web-ui
    version: "0.1.1"
    description: "Tutorial Server"

    imageRegistry: "harbor-docker-oci"
    helmRegistry: "harbor-helm-oci"
    chartName: "tutorial-web-ui"
    chartVersion: "0.1.0"

    profiles:
     - name: "default"
       valuesFileName: "tutorial-web-ui-values.yaml"


Create Values Files
-------------------

Create four values files in the same directory (tutorial-deployment) with the following content:

Create **tutorial-server-values-default.yaml**:

.. code:: yaml

    fullnameOverride: tutorial-server
    tutorialServer:
      greeting: "Deployed by Application Orchestration (default)"
      initialCount: 10
    image:
      #  Will update the placeholder with the rootUrl of the imageRegistry
      repository: "%ImageRegistryURL%/tutorial-server-image"
    imagePullSecrets:
    - name: "%GeneratedDockerCredential%"

The **fullnameOverride** is important here as it drives the name the services and pods are given. The default
is to include the "release name" the chart is installed with. Since Application Orchestration will use a
UUID in the release name, the services and pods will have a random name. By setting the name to
a fixed value, it means the Tutorial Web UI will be able to reference this service by this name in a predictable
manner.

.. note::
    The `image.repository` is the OCI registry where the Tutorial Server image is stored and includes a placeholder to
    use the imageRegistry `rootUrl`. In the next step we will push the image to this registry.
    The `imagePullSecrets` has an automatically generated Secret that will allow the deployment to pull
    the image from the OCI registry.
    See :doc:`../../../application_developer_workflow/deployment-packages/reference-placeholders` for more details on the
    placeholders used here.

Create **tutorial-server-values-alternate.yaml**:

.. code:: yaml

    fullnameOverride: tutorial-server
    tutorialServer:
      greeting: "Deployed by Application Orchestration (alternate)"
      initialCount: 5
    image:
      #  Will update the placeholder with the rootUrl of the imageRegistry
      repository: "%ImageRegistryURL%/tutorial-server-image"
    imagePullSecrets:
    - name: "%GeneratedDockerCredential%"

.. note::
    You varied the initialCount and the greeting message to show the flexibility the profiles feature brings.


Create **tutorial-server-values-alternate-pt.yaml**:

.. code:: yaml

    fullnameOverride: tutorial-server
    tutorialServer:
      greeting: "Deployed by Application Orchestration (alternate-pt)"
      initialCount: 0
    image:
      #  Will update the placeholder with the rootUrl of the imageRegistry
      repository: "%ImageRegistryURL%/tutorial-server-image"
    imagePullSecrets:
    - name: "%GeneratedDockerCredential%"

Create **tutorial-web-ui-values.yaml**:

.. code:: yaml

    fullnameOverride: tutorial-web-ui
    image:
      #  Will update the placeholder with the rootUrl of the imageRegistry
      repository: "%ImageRegistryURL%/tutorial-web-ui-image"
    imagePullSecrets:
    - name: "%GeneratedDockerCredential%"
    service:
        annotations:
            service-proxy.app.orchestrator.io/ports: "8080"

The service-proxy annotation is used to tell the Application Orchestrator to expose the web UI service,
as described **Service Link Support** section of in
:doc:`/user_guide/package_software/package_create_helm`.

Create the Deployment Package
-----------------------------

To bring it all together, add a **deployment-package.yaml** file containing
the Deployment Package:

.. code:: yaml

    specSchema: DeploymentPackage
    schemaVersion: "0.1"
    $schema: "https://schema.intel.com/catalog.orchestrator/0.1/schema"

    description: Application Orchestration Tutorial Deployment Package
    name: app-orch-tutorial-dp
    displayName: "Tutorial DP"
    version: "0.1.1"

    applications:
    - name: tutorial-server
      version: "0.1.1"
    - name: tutorial-web-ui
      version: "0.1.1"

    deploymentProfiles:
      - name: "default-profile"
        displayName: "Default Configuration"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "default"
          - application: "tutorial-web-ui"
            profile: "default"
      - name: "alternate"
        displayName: "Alternate Configuration"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "alternate"
          - application: "tutorial-web-ui"
            profile: "default"
      - name: "alternate-pt"
        displayName: "Alternate with Parameter Templates"
        applicationProfiles:
          - application: "tutorial-server"
            profile: "alternate-pt"
          - application: "tutorial-web-ui"
            profile: "default"

    defaultNamespaces:
        tutorial-server: tutorial
        tutorial-web-ui: tutorial

The format of the Deployment Package YAML file is described in detail in
:doc:`/developer_guide/application_developer_workflow/deployment-packages/deployment-package-yaml-reference`.

This is where the power of the Deployment Package can be seen, bringing together the Applications. It allows you to
define which Applications (and their versions) to include, and to define the Deployment Profiles combining the
different Application Profiles. It also allows you to set the **namespace** that the Application will be deployed to. If
this is left out, a default namespace will be created for each Application.

.. note::
    In this case, you are using the same namespace for both, so they can call each other without needing to use the full
    DNS name.


