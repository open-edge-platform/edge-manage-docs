Deployment
==========

Edge Cluster Orchestrator is typically deployed as a set of microservices in a Kubernetes\*
cluster and it is part of the orchestrator services of Open Edge Platform along with Edge
Application Orchestrator and Edge Infrastructure Manager. It leverages the same set of
services provided by the Orchestration Platform Services, UI, and Observability framework.

In the overall scope of |software_prod_name| installation, the microservices are deployed
by Argo\*  CD, which is a GitOps continuous delivery tool that ensures the platform is brought
up quickly and reliably.

The Edge Cluster Orchestrator components can be deployed as standalone components for
development and testing purposes. For more details, see the README documents stored in the
Edge Cluster Orchestrator component repositories.
