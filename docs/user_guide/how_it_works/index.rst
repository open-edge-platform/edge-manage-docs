How it Works
============

Edge Manageability Framework is the primary solution to manage edge environments
efficiently and securely. It encompasses a range of features that cater to the
unique demands of edge computing, ensuring seamless integration and operation
across diverse hardware and software landscapes.

Edge Manageability Framework is designed to be the central hub for managing
edge infrastructure and edge application deployments at scale across
geographically distributed edge sites. It offers automated application
deployment based on customer-defined configuration & criteria, multitenancy
and identity & access management for tenants, observability & alerting
capabilities, dashboards for quick views of status & issue identification,
and management of all software deployments & infrastructure components including
edge nodes (i.e. hosts) and clusters.

At a high level, this is how you can use Edge Orchestrator.

  .. figure:: ./images/how_it_works2.png
      :alt: How it works

The :doc:`Get Started Guide </user_guide/get_started_guide/index>` provides
you with a step by step process to use the system.

If instead you are directly interested in one of the orchestrator functionality
you can use one of the following steps:

1. :doc:`/user_guide/set_up_edge_infra/index`: Leverage Edge Orchestrator’s fleet
management and cluster orchestration capabilities to onboard and configure
hosts and form them into clusters.

2. :doc:`/user_guide/package_software/index`: Use Edge Orchestrator’s application
orchestration features to import and package applications. Create profiles to
customize deploy-time environments. Configure conditions for automated
deployment.

3. **Deploy to Edge Automatically**: Packages are deployed to clusters based on
metadata, or to lists of custom targets. Edge Orchestrator automatically
distributes software updates and deploys the latest packages to new hosts as
they onboard.

4. :doc:`/user_guide/monitor_deployments/index`: Observability features are woven throughout Edge
Orchestrator. Performance monitoring and alerting highlight critical issues,
while the unified dashboard offers visibility across the entire edge stack.

 For more details, see:

•	:doc:`/user_guide/set_up_edge_infra/index`
•	:doc:`/user_guide/package_software/index`
•	:doc:`/user_guide/monitor_deployments/index`
