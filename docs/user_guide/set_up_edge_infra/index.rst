Set up Edge Infrastructure
==========================

In Edge Infrastructure, "infrastructure" refers to:

-	**Hosts**: Networked computing devices (edge nodes) that run workloads to provide applications or services.
-	**Clusters**: One or multiple hosts that are grouped and work as a single unit.

**Prerequisites**

Ensure that you have properly configured the :doc:`/user_guide/concepts/nztp`.

Before setting up your edge infrastructure within the service, you must onboard your
hosts by referring to the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard` section.
After onboarding your host(s), do the following to set up your edge infrastructure:

#. :doc:`View Onboarded Hosts </user_guide/set_up_edge_infra/onboarded_hosts>`
#. :doc:`/user_guide/set_up_edge_infra/provision_host` (not required in case of :doc:`Automated Onboarding and Provisioning </user_guide/set_up_edge_infra/edge_node_registration>`)
#. :doc:`/user_guide/set_up_edge_infra/create_clusters`

If you have access to your edge node’s UUID or serial number, you can :doc:`/user_guide/set_up_edge_infra/edge_node_registration`
to facilitate faster onboarding.

**Register Hosts**

Registered hosts are hosts registered to the orchestrator but not yet connected or onboarded.
Registered hosts appear on the :doc:`/user_guide/set_up_edge_infra/registered_hosts` page.
You must complete the onboarding before proceeding to the provisioning step.

For more information see :doc:`/user_guide/set_up_edge_infra/edge_node_registration`.

**Onboard Hosts**

Onboarding is completed with the attestation of the edge nodes and enables
the host to connect to the backend services. Onboarded hosts appear on the
:doc:`/user_guide/set_up_edge_infra/onboarded_hosts` page.
You must provision the hosts before adding them the cluster.

For more information about onboarding hosts, see
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard`.

**Provision Hosts**

To provision hosts, you must:

- Select an operating system (OS) profile for the host.
- Select Secure Boot and Full Disk Encryption, if required.
- Associate the host to a site.

Optionally:

- add host labels allowing for host or hardware-specific application targeting.
- add SSH key to the host for Remote Access.

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
:doc:`/user_guide/advanced_functionality/automated_deployment`.

For more information, see :doc:`/user_guide/set_up_edge_infra/create_clusters`.

.. toctree::
   :hidden:

   location_main
   edge_node_onboard
   registered_hosts
   onboarded_hosts
   provisioned_hosts_main
   clusters_main
