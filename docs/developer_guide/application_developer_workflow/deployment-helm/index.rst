Deploy Helm* Charts
===================

`Helm <https://helm.sh/>`_ is a powerful package manager for Kubernetes\* that
provides a way to define, install, and upgrade cloud-native applications.
Helm\* uses a packaging format called Charts, which are a collection of files
that describe an application's deployment.

There are many online guides and tutorials on how to create Helm Charts, and
the `Helm documentation <https://helm.sh/docs/chart_template_guide/getting_started/>`_
is a good place to start.

Development Process
-------------------

The following steps outline the development process for creating Helm Charts:

#. Create a new Helm Chart using the Helm CLI. This is a pretty complex NGINX\*
   chart and can be simplified for your application. Change directory into
   the newly created chart directory.

   .. code:: bash

      helm create mychart
      cd mychart

#. Customize the Helm **Chart.yaml** and **values.yaml** to point to your
   application container image.

#. Add, remove, or adjust the templated definitions of Kubernetes\* resources
   in the **templates** folder.

#. Check the Helm chart syntax using:

   .. code:: bash

      helm lint .

#. Examine the Helm chart rendered format with the `helm template` command.
   This will reveal how values are applied to the templates in the Chart.

   .. code:: bash

      helm -n test template --release-name foobar .

   .. note::
      With Helm commands like `template` and `install`, additional override
      values.yaml can be imposed with **-f override-values.yaml**. This can
      be useful for testing different configurations of the Helm Chart, and
      is the method used by the |software_prod_name| to handle Profiles (see
      :doc:`../../app_orch/arch/data_model`).

#. Try out the Helm chart on a Kubernetes cluster (`RKE2\* <https://docs.rke2.io/>`_
   is recommended). Ensure you can use the `kubectl` command. Ensure the `test`
   namespace exists. Use the command `helm -n test install foobar .`

   .. code:: shell

      kubectl get node
      kubectl create namespace test
      helm -n test install foobar .

#. Check the Helm chart is installed correctly using `helm list`. If the
   chart is not installed correctly, use `helm uninstall` to remove the chart.

   .. code:: shell

      helm -n test list
      helm -n test uninstall foobar

   .. note::
      The Helm Chart could be tested on the Edge Node cluster before it is
      pushed to the |software_prod_name| platform. The User guide describes
      how to access the KUBECONFIG file of an Edge Node cluster, which will
      allow testing. While this is an experimental approach, it can help with
      development and may give further insights into how the application will
      behave when deployed on the |software_prod_name| platform.

#. Once you have a working Helm Chart, you can package it up and distribute
   it to other users. This can be done by packaging the chart with the Helm
   CLI. This will create a tarball of the Helm Chart, taking the name and
   version from the Chart.yaml file, and includes the values.yaml file.

   .. code:: shell

      helm package .

#. It can be pushed to a Helm repository with:

   .. code:: shell

      helm push mychart-0.1.0.tgz oci://registry name/registry project

   .. note::
      The |software_prod_name| platform comes with its own OCI-compatible
      registry capable of storing and distributing Helm charts and other
      artifacts.

Deploy Applications Through |software_prod_name|
------------------------------------------------

The |software_prod_name| uses a Deployment Package to describe the deployment
of an application (Helm Chart), covered in
:doc:`../deployment-packages/index`.

Helm Chart Best Practices
-------------------------

When deploying an application onto Edge Node clusters through the
|software_prod_name| platform, it is deployed using `Fleet <https://fleet.rancher.io/>`_
controller. This deploys Helm Charts using a built-in version of the Helm
command.

It also has the additional advantage that it tracks the lifecycle of each
Kubernetes resource deployed, so that when it comes time to upgrade or delete
the Helm Chart, it is done seamlessly.

There are some caveats though that need to be observed to make this flow work
properly:

#. The Helm chart must restrict Jobs and Hooks that will change the values in
   resources that were deployed. This is because |software_prod_name|
   monitors the state of resources *it* deployed on the Edge Node cluster, to
   check their values are as expected. If something else is changing the
   values, then the deployment will not complete. This only applies to resources
   specified in the chart, and does not apply to **new** resources that might be
   created by a Job or Hook. They will be owned by whatever created them. See
   `ignoredResources` in :doc:`../deployment-packages/application-yaml-reference`
   for a way to ignore certain resources that are created by the Helm Chart.

#. It is not recommended to create a namespace in the Helm chart.
   |software_prod_name| has a method to manage namespaces outside of the Helm
   Chart that ensures they are cleaned up properly on delete. Neither should you
   specify the namespace in resources in your Helm\* Chart unless completely
   necessary. Helm\* will populate the namespace when none is specified.

#. If the Helm Chart includes Custom Resource Definitions (CRDs), please
   follow the `Helm best practices document <https://helm.sh/docs/chart_best_practices/custom_resource_definitions/>`_.

#. If deploying to :doc:`Edge Microvisor Toolkit </user_guide/additional_howtos/host_update_immutable_os>`
   please be aware that it features an immutable root file system, and this may require additional effort to ensure that
   your application does not use Host Paths or other features that might attempt to write to the immutable partition.

#. Lint the helm chart with **helm lint** before deploying it. This will check for
   common mistakes and issues in the chart. Use **helm template** to do a visual inspection of how the
   helm chart values files are applied to the templates.

   .. code:: shell

      helm lint .
      helm -n testns template --release-name foobar . -f <values.yaml from deployment package>

#. Be aware of the preinstalled network policies applied to various namespaces on the Edge Node cluster.
   These can be seen in `network-policies  <https://github.com/open-edge-platform/cluster-extensions/tree/main/helm/network-policies/templates>`_
   or by running `kubectl` on the Edge Node:

   .. code:: shell

      kubectl get networkpolicy -A
      kubectl get globalnetworkpolicies.crd.projectcalico.org -A
      kubectl get networkpolicies.crd.projectcalico.org -A

   Do not install a Helm resources in to the `default` or `kube-system` namespaces.

#. Try to reuse the **preinstalled** facilities of the Edge Node where possible, rather than deploying your own.
   For example the Edge Node standard installation includes these preinstalled facilities:

   * cert-manager
   * prometheus
   * openebs

   See `base-extensions <https://github.com/open-edge-platform/cluster-extensions/tree/main/deployment-package/base-extensions>`_
   for the full list.

#. Try to reuse the **optional** Extensions that can be used alongside your application on the Edge Node.
   These are listed in detail in :doc:`/user_guide/package_software/extension_package`
   Examples include:

   * Load Balancer - includes MetalLB\* and NGINX\* ingress controller
   * Intel® GPU - a Kubernetes device plugin for Intel® GPUs
   * SRIOV - a Kubernetes device plugin for SRIOV devices

#. Be aware of the different :doc:`/user_guide/additional_howtos/set_up_a_cluster_template`
   that are in effect on the Edge Node(s) that you are deploying to.

   The **Privileged** cluster template is the most permissive template but also provides the least secure enforcement.
   While choosing `Privileged` may lead to a successful deployment, a more thorough evaluation of the templates and your
   application’s may allow you to use **BaseLine** or **Restricted** instead and will lead to a more secure experience
   for our customers.

   The following rules apply:

   * `Restricted` - if your application can work with `Restricted` cluster template then it will work with Edge Node
     clusters that have been setup with any cluster template.
   * `Baseline` - if your application requires `Baseline` it will work only with Edge Node clusters that have been setup
     with `Baseline` or `Privileged`.
   * `Privileged` - if your application requires `Privileged` it will work only with Edge Node clusters that have been
     setup with `Privileged`.

   The Cluster Template also covers some of the networking configuration including CNI. If the application is not
   dependent on any specific configuration, then default configuration can be left as is.

#. Scan the Helm Chart for security vulnerabilities. This can be done using
   `Trivy <https://trivy.dev/latest/>`_.

   .. code:: shell

      trivy config . --severity HIGH,CRITICAL

Service Link Support
--------------------

|software_prod_name| has a feature called Service Link (Application Service Proxy)
that allows the deployed application to be launched directly from the |software_prod_name|
Web UI. This is done by configuring the Kubernetes Service with an extra annotation
that will be handled in a special way by the |software_prod_name|. See
:doc:`Service Link Support </user_guide/package_software/package_create_helm>`
for more details.
