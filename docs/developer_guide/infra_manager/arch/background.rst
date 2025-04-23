Background
==========

In the simplest terms, Edge Infrastructure Manager is responsible for
maintaining operating systems of a target type and version as needed to meet
operational requirements of applications and services while informing higher
level services such as Application and Cluster Orchestration about hardware
capabilities and computing resources available at the edge.

Target Audience
~~~~~~~~~~~~~~~

The target audience for this guide includes developers, architects, and who are
interested in understanding, modifying, extending, or contributing to the Edge
Infrastructure Manager of the Open Edge Platform. Additionally, this
guide is meant to support System Integrator (SI) Installer, System/IT Admin,
Field Tech, and Software Engineer/QA Validation. All these personas may not
contribute to the project but they all need to understand the architecture and
data flow of the system.

- **SI Installer** installs for the SI or for the Managed Service Provider
  (MSP) the Edge Infrastructure Manager Backend services (Day 0). May intervene
  on behalf of other users if needed (Day 1 and Day 2) for all sites and all
  tenants.

- **System/IT Admin** manages operation, including provisioning new nodes, new
  sites, (Day 1) applying patches, incident response etc (Day 2), for a tenant
  across all sites/Edge locations.

- **Field Tech** a technician typically contracted, authorized for on-site
  installation (Day 1), maintenance and incident response (Day 2).

- **Software Engineer/QA Validation Engineer** personas that are from SI or
  Cloud Providers who consume Open Edge Platform software and build
  their own Backend service based on in (Day 0). They may also be involved in
  troubleshooting and debugging issues (Day 2).

Finally, end users who want to deploy, manage, and monitor applications on the
edge using Open Edge Platform will also find the User Guide and API
Guide useful.

Concepts
~~~~~~~~~~~

Refer to the User Guide for information on :doc:`/user_guide/concepts/index`.
