Set up Edge Infrastructure
==========================

In Edge Infrastructure, "infrastructure" refers to:

-	**Hosts**: Networked computing devices (edge nodes) that run workloads to provide applications or services.
-	**Clusters**: One or multiple hosts that are grouped and work as a single unit.

**Prerequisites**

Ensure that you have properly configured or disabled zero-touch provisioning. If you want
to change the configuration, follow the steps in :doc:`/shared/shared_update_provider`.

Before setting up your edge infrastructure within the service, you must onboard your
hosts by referring to the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard` section.
After onboarding your host(s), do the following to set up your edge infrastructure:

#. :doc:`View Onboarded Hosts </user_guide/set_up_edge_infra/onboarded_hosts>`
#. :doc:`/user_guide/set_up_edge_infra/provision_host`
#. :doc:`/user_guide/set_up_edge_infra/create_clusters`

**Onboarded Hosts**

Onboarding is completed using cloud-based onboarding that installs edge nodes and
enables the host to connect to the service. Onboarded hosts appear on the
:doc:`/user_guide/set_up_edge_infra/onboarded_hosts` page.
You must configure the hosts before adding them the cluster.

For more information about onboarding hosts, see
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard`.

**Configure Hosts**

To configure hosts, you must:

- Select an operating system (OS) profile for the host.
- Select Secure Boot and Full Disk Encryption, if required.
- Associate the host to a site.
- Optionally, add host labels allowing for host or hardware-specific application targeting.

Each host must be associated with a single site. Sites represent real-world locations and
can be grouped into regions. Regions can also be grouped, creating hierarchies, and helping
you to organize and manage your deployments.

Intel recommends planning your region hierarchies ahead of time. See
:doc:`/user_guide/set_up_edge_infra/location_main`.

For more information on provisioning hosts, see the following sections:

* :doc:`/user_guide/set_up_edge_infra/provision_host`
* :doc:`/user_guide/set_up_edge_infra/provisioned_hosts_main`

**Create Clusters**

There are two options for completing the configuration process:

-	**Create a single host cluster** that consists of a single host.
-	**Create multiple-host cluster** consisting of two or more hosts.

Use the **Create Cluster** option within the "Clusters" page to create a cluster.
Add one or more hosts to the cluster. All the hosts in the cluster must come from
the same site. Then, add deployment metadata to your cluster, which is needed to
enable automated deployment. Deployment metadata takes the form of key-value pairs
and matches target clusters with the deployment package during
:doc:`/user_guide/how_it_works/automated_deployment`.

For more information, see :doc:`/user_guide/set_up_edge_infra/create_clusters`.

.. toctree::
   :hidden:

   location_main
   edge_node_onboard
   registered_hosts
   onboarded_hosts
   provisioned_hosts_main
   clusters_main
