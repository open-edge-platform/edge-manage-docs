Set up Edge Infrastructure
==========================

In Edge Infrastructure, "infrastructure" refers to:

- **Hosts**: Networked computing devices (edge nodes) that run workloads to provide applications or services.
- **Clusters**: One or multiple hosts that are grouped and work as a single unit.

.. toctree::
   :maxdepth: 2
   :caption: Set Up Edge Infrastructure

   edge_node_onboard/index
   edge_node_states/index
   clusters/index
   location/index

**Prerequisites**

Ensure that you have properly configured the :doc:`/user_guide/concepts/nztp`.

Before setting up your edge infrastructure within the service, you must onboard your hosts by referring to the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/index` section. After onboarding your host(s), do the following to set up your edge infrastructure:

#. :doc:`View Onboarded Hosts </user_guide/set_up_edge_infra/edge_node_states/onboarded_hosts>`
#. :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` (not required in case of :doc:`Automated Onboarding and Provisioning </user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration>`)
#. :doc:`/user_guide/set_up_edge_infra/clusters/create_clusters`

If you have access to your edge node’s UUID or serial number, you can :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/edge_node_registration` to facilitate faster onboarding.
:doc:`/user_guide/set_up_edge_infra/location/index`.

For more information on provisioning hosts, see the following sections:

* :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host`
* :doc:`/user_guide/set_up_edge_infra/edge_node_states/provisioned_hosts`

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

For more information, see :doc:`/user_guide/set_up_edge_infra/clusters/create_clusters`.

.. toctree::
   :hidden:

   location/index
   edge_node_onboard/index
   edge_node_states/index
   edit_host
   delete_host
   deauthorize_host
   reprovision_host
   clusters/index
