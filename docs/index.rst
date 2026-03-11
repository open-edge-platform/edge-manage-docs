:html_theme.sidebar_secondary.remove:

|software_prod_name| Documentation
==================================

Explore documentation to set up and use Edge Orchestrator.

Deploy Edge Orchestrator
------------------------

Review system requirements and then select your deployment type: AWS\* Cloud or On-Premises.

.. grid:: 3

    .. grid-item-card:: Check System Requirements
        :link: system_requirements/index
        :link-type: doc
        :link-alt: clickable cards

        Review the minimum edge node hardware requirements and supported browsers.

    .. grid-item-card:: Deploy Edge Orchestrator on AWS* Cloud
        :link: deployment_guide/cloud_deployment/cloud_get_started/index
        :link-type: doc
        :link-alt: clickable cards

        Host Edge Orchestrator on a Cloud environment.

    .. grid-item-card:: Deploy Edge Orchestrator On-Premises
        :link: deployment_guide/on_prem_deployment/on_prem_get_started/index
        :link-type: doc
        :link-alt: clickable cards

        Host Edge Orchestrator on a single machine.


Use Edge Orchestrator
---------------------
Find everything you need to get up and running with Edge Orchestrator. Learn how it works, and then
prepare hardware for deployment, package and deploy applications, monitor the health of your network, and more.

.. grid:: 3

    .. grid-item-card:: Understand Edge Orchestrator
        :link: user_guide/how_it_works/index
        :link-type: doc
        :link-alt: clickable cards

        Learn about how Edge Orchestrator works as part of the Open Edge Platform.

    .. grid-item-card:: Get Started
        :link: user_guide/get_started_guide/index
        :link-type: doc
        :link-alt: clickable cards

        Follow the steps to get started using Edge Orchestrator.

    .. grid-item-card:: Set Up Infrastructure
        :link: user_guide/set_up_edge_infra/index
        :link-type: doc
        :link-alt: clickable cards

        Prepare hardware for deployment. Onboard and configure hosts and create clusters.

.. grid:: 3

    .. grid-item-card:: Package Applications
        :link: user_guide/package_software/index
        :link-type: doc
        :link-alt: clickable cards

        Import, package, and customize applications.

    .. grid-item-card:: Set Up a Deployment
        :link: user_guide/package_software/setup_deploy
        :link-type: doc
        :link-alt: clickable cards

        Once you have a working platform with at least one edge cluster, deploy your first application.

    .. grid-item-card:: Dashboards and Alerts
        :link: user_guide/monitor_deployments/index
        :link-type: doc
        :link-alt: clickable cards

        Monitor the health of hosts, applications, and deployments across your network.


Develop Edge Orchestrator
-------------------------
Intel welcomes and encourages the community to contribute to the project. In the Developer Guide,
you can find details about the high-level design and submit patches of your own.


.. grid:: 3

    .. grid-item-card:: Developer Guide
        :link: developer_guide/index
        :link-type: doc
        :link-alt: clickable cards

        Learn how to modify and extend the main components of Edge Orchestrator.

    .. grid-item-card:: Contributing
        :link: developer_guide/contributor_guide/index
        :link-type: doc
        :link-alt: clickable cards

        Find guidelines for contributing to the project, including submitting issues and code.

    .. grid-item-card:: APIs
        :link: api/index
        :link-type: doc
        :link-alt: clickable cards

        APIs offer Create, Read, Update, and Delete capabilities.


EMF Workflows
-------------
Step-by-step workflows organized by deployment phases. Learn how to execute common tasks
using the orch-cli command-line interface, from platform setup through infrastructure management and operations.

.. grid:: 3

    .. grid-item-card:: Day-0: Platform Readiness
        :link: workflows/day-0-platform-readiness/index
        :link-type: doc
        :link-alt: clickable cards

        Deploy and configure Edge Orchestrator. Set up composability profiles and validate the platform.

    .. grid-item-card:: Day-1: First Value
        :link: workflows/day-1-first-value/index
        :link-type: doc
        :link-alt: clickable cards

        Onboard infrastructure, create clusters, and deploy your first applications using orch-cli.

    .. grid-item-card:: Day-2: Operations
        :link: workflows/day-2-operations/index
        :link-type: doc
        :link-alt: clickable cards

        Manage platform operations, upgrades, scaling, and advanced troubleshooting scenarios.


Orch CLI Reference
------------------
Install, configure, and use the orchestrator command-line interface (orch-cli). Comprehensive reference
for all orch-cli commands, authentication methods, and command-line workflows.

.. grid:: 3

    .. grid-item-card:: Installation & Setup
        :link: orch-cli/installation
        :link-type: doc
        :link-alt: clickable cards

        Download, install, and verify the orch-cli tool. Configure your environment.

    .. grid-item-card:: Authentication & Configuration
        :link: orch-cli/authentication
        :link-type: doc
        :link-alt: clickable cards

        Set up authentication with JWT tokens and configure orch-cli with your orchestrator instance.

    .. grid-item-card:: Commands & Troubleshooting
        :link: orch-cli/index
        :link-type: doc
        :link-alt: clickable cards

        Reference for all command groups, syntax, and troubleshooting guidance.


.. toctree::
   :hidden:

   release_notes/index
   deployment_guide/index
   user_guide/index
   developer_guide/index
   api/index
   system_requirements/index
   workflows/index
   orch-cli/index


