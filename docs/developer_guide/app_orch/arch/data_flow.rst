Data Flow
=========

The data flow in Application Orchestration can be broken down into Day 0, Day 1 and
Day 2 operations. Day 0 operations are the development and packaging of applications.
Day 1 operations are the deployment of applications, and Day 2 operations are the
monitoring and lifecycle management of the deployed applications.

Workflow Stages
----------------

1. **Day 0: Development and Packaging**:

   - Applications can be developed and packaged using Helm\* Charts and Container
     (Docker\*) Images.
   - The Helm Charts and Container (Docker) Images can be pushed to an OCI Registry
     (either within |software_prod_name| or an external registry).
   - For each application a Deployment Package can be created that includes the
     Application and its configuration and deployment profiles (see :doc:`data_model`).
     Alternatively, the Deployment Package can be created directly in the
     |software_prod_name| Web UI.
   - The Deployment Package can be uploaded to the Application Catalog Service, either
     through the Application Catalog API or the |software_prod_name| Web UI.

2. **Day 1: Deployment**:

   - Deployment Packages can be deployed to one or more Edge Node clusters using the
     Application Deployment Manager.
   - The parameters for deployment are provided through the |software_prod_name| Web UI
     or the Application Deployment Manager API, which gives control over the clusters to
     deploy to and the profile to use and any possible overrides.
   - The Application Deployment Manager will deploy the Deployment Package suitable Edge
     Node clusters using the Fleet Agent running on the Edge Node clusters.

3. **Day 2: Output**:

   - Application Deployment Manager monitors the lifecycle of clusters, ensuring that
     the deployment is updated as clusters are added or removed.
   - It provides a summary of the deployment status, per-cluster status, and
     per-application status and allows for upgrades and uninstalls of the Deployment
     Package.

Multi-Tenancy Data Flow
-----------------------

At a higher level, Application Orchestration also participates in the Day 0, 1 and 2
operations of the |software_prod_name| by monitoring of the tenant-related events in the
Tenant Provisioner. It is responsible for creating and deleting resources in the
Application and Cluster Orchestration components in response to the creation and
deletion of multi-tenant Projects.

Specifically, on Project creation the Tenant Provisioner will create:

* Application Extensions in the Application Catalog
* A new project in the OCI Harbor Registry

or on deletion of a Project the Tenant Provisioner will delete:

* The Application Extensions in the Application Catalog
* The project in the OCI Harbor Registry
* Any Deployments that had been made in that project
