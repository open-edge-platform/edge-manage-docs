Application Developer Workflow
==============================

|software_prod_name| is a flexible and powerful platform that allows you
to configure and deploy applications at the Edge, that is, on to Edge Node
clusters. This guide provides an overview of the application developer
workflow including how to access all the features of the platform, for fast,
and efficient application development.

Overview
--------

Cloud Native Applications developed for the |software_prod_name| platform are
usually composed of multiple services (microservices), meant to be deployed
on a Kubernetes\* cluster, taking advantage of the platform's many features
and capabilities.

.. note::
   This guide does not cover the development of non-Cloud Native
   applications, which will often be packaged to run in a Virtual Machine
   (VM) that will be deployed to KubeVirt running on |software_prod_name|
   Edge Node. More information on this can be found in the
   :doc:`Virtualization documentation </user_guide/package_software/extensions/virtualization_package>`.

Cloud native applications are usually packaged as Container images and
designed to be run in a containerized environment. A `Dockerfile` is usually
used to define the container image, and when built it is usually pushed to a
Container Registry.

Cloud Native applications are deployed to a Kubernetes platform using Helm*
charts, which are a collection of Kubernetes built in Resources and optional
Custom Resources that control the deployment environment. Helm charts are
usually packaged as a tarball and published to a Registry.

.. note::
   |software_prod_name| platform comes with its own OCI compatible
   registry capable of storing and distributing Container images, Helm charts
   and other artifacts.

Tutorial
--------

There is a comprehensive :doc:`../app_orch/index` with step-by-step instructions
corresponding to the major steps in this Application Developer Workflow.

Architecture of Application Orchestration
------------------------------------------------

A description on the architecture of the Application Orchestration feature is
available in the :doc:`../app_orch/arch/index` section.


.. toctree::
   :hidden:

   developing-applications/index
   packaging-applications/index
   deployment-helm/index
   deployment-packages/index
   deploying-applications/index
   accessing-applications/index

