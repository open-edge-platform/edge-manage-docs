Deploy Applications
===================

Once the Deployment Package has been created and imported into
|software_prod_name|, it can be deployed to an Edge Node cluster.

The process of deployment can be initiated from the Web UI and is described in
detail in the :doc:`/user_guide/package_software/setup_deploy`.

Deployments can also be performed through the
:doc:`/api/app_deployment_manager`

Manage Deployments
------------------

After a deployment has begun, the progress of deployment can be followed in the
|software_prod_name| Web UI (see
:doc:`/user_guide/package_software/deployment_details`).  It may take a minute
or two to get started and will show the combination of status from each of its
applications together in the same status field. These may change rapidly as
deployment proceeds.

The approach |software_prod_name| takes to deployment is to deploy the Helm\*
Charts that are not dependent on each other first, and then deploy the
dependent Helm Charts. If not marked as dependent, Helm Charts will be deployed
in parallel.

Within each Helm Chart deployment, the Helm Chart will be installed, and all
resources deployed to the Edge Node cluster in parallel. If some resources are
dependent on others, the resource may fail to come up initially but will be
retried until it is successful. Therefore the status of the deployment may
change rapidly as the deployment proceeds.

The Deployment page shows a "Running Instances" count that shows the number of
Edge Node clusters that the application is currently deployed successfully to
as a fraction of the total number of Edge Node clusters it should be deployed
to. This figure may change depending on whether the Deployment is a Manual or
Automatic type, and as Edge Node clusters are added, deleted or become
inaccessible on the |software_prod_name|.
