Data Flow
=========

The data flow of the Edge Orchestrator on-premise can be broken down into Day 0, Day 1  and Day2.
Day 0 consists of operations required to deploy the on-prem Edge Orchestrator such a provisioning of the infrastructure, configuring the deployment environment and running the on-prem installer.
Day 1 consists of onboarding edge nodes. Day 2 operations are the monitoring and life-cycle management of the deployed customer applications.

- **Day 0: Edge Orchestrator Deployment**

The Edge Orchestrator installation consists of several steps:
   - Provision an on-premise server with sufficient compute resources.
   - Provision the required scripts to install the Edge Orchestrator.
   - Configuring Identity and Access Management (IAM) prepares the Edge Orchestrator deployment for user authentication and authorization.
     The Edge Orchestrator IAM uses Keycloak\* solution, an OpenID\* Connect (OIDC) identity provider
   - Create The OS profile sets the following configurations:
      -- Customization such as kernel parameters and upstream packages.
      -- Any packages additional to the default, Intel-provided, edge node agents.
      -- OS profiles are used both by onboarding and the Maintenance Manager to perform updates to an instance with the Platform Update Agent

- **Day 1: Onboarding Edge Nodes and customer applications**

Create Organizations, tenants. Enable concurrent onboarding of edge nodes. Create applications on each Edge Orchestrator.

- **Day 2: Monitoring customer applications.**

- Constant monitoring: If the SRE (Service Reliability Engineering) exporter service is enabled in Edge Orchestrator,
  it exports SLI (Service Level Indicator) metrics allowing constant monitoring of Edge Orchestrator cluster availability and the health of edge node hosts using an external monitoring system.
  The metrics are sent every time interval (default 30 seconds) to the external SRE Destination Endpoint.

- Configure email notifications Enable Mail Server (SMTP) for notifications.
