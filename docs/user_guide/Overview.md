---
orphan: true
---

<!--
# How to Use This Template

This template is designed to help you create a developer-focused catalog detail page for a microservice. Follow these instructions:

1. **Purpose**:
   - Provide a concise overview of the microservice, highlighting its purpose and technical value.
   - Include a high-level system view diagram applied to a use case to help developers understand its role.

2. **Content Customization**:
   - Replace placeholders (e.g., `{{placeholder}}`) with specific details about your microservice.
   - Ensure the content aligns with developer workflows, addressing their needs through examples, technical benefits, and resources.

3. **Diagram Guidelines**:
   - Create a high-level system diagram that demonstrates how the microservice integrates into a broader system or use case.
   - Include inputs (e.g., sensors and data streams), processing steps (e.g., inference and filtering), and outputs (e.g., alerts and visualizations).

4. **Style Guidelines**:
   - Follow the **Microsoft Developer Writing Style Guide** for clarity, consistency, and accessibility.
   - Use short, active sentences and directly address the developer as “you.”
   - Include examples and ensure all images have descriptive alt text for accessibility.

5. **GitHub Copilot\* Software Can Help**:
   - **For Style Adherence**:
     - Use GitHub Copilot software to check if content aligns with the Microsoft style guide.
     - Let  GitHub Copilot software suggest improvements for clarity and engagement.
   - **To Validate Completeness**:
     -  GitHub Copilot software can cross-check user stories and acceptance criteria against the content.

6. **Validation**:
   - Test diagrams and explanations for technical accuracy.
   - Include expected outcomes (e.g., expected outputs for use cases) and ensure diagrams match the described workflows.

7. **Testing Your Guide**:
   - Review the content with a developer who is unfamiliar with the microservice to ensure clarity.
   - Verify that all links and resources are correct and accessible.
-->

<!-- This file provides the content for the Catalog card and detail page. Do not remove sections marked as required.-->

# Edge Orchestrator
<!--REQUIRED: Add a short description without including the name of the RI/Application/microservice in the description. Ensure it's at least 50 characters (excluding spaces) and doesn't exceed 150 characters (excluding spaces). This will enable the content to be properly displayed in the catalog's card layout.-->

Simplify edge infrastructure management and application deployment at scale across geographically distributed edge sites.  

<!--
**User Story US-1: Learning About the Microservice**
- **As a developer**, I want to understand the purpose and benefits of the microservice so that I can determine if it fits my project.

**Acceptance Criteria**:
1. A concise description of the microservice’s purpose.
2. A summary of its technical value and benefits.
-->

# Overview
<!--REQUIRED-->

**Key Benefits**
<!--
Guidance for Authors:
- Audience Expectation: Developers want to understand why this microservice is worth using and how it will help them meet their goals.
- Highlight the **value proposition** and **outcomes** of the microservice.
- Explain how it helps developers or solves end-user problems.
- Use clear, developer-focused language.
-->
- **Benefit 1**: Simplified hardware onboarding with the ability to onboard multiple systems, all at one time
- **Benefit 2**: Leverage cloud-like infrastructure at your edge sites to enable hardware management, cluster creation, and lifecycle management
- **Benefit 3**: Deploy applications at scale, configured to your specific business needs, all through Kubernetes-based technology
- **Benefit 4**: Onboard and configure your AI applications to leverage specific hardware features and capabilities
- **Benefit 5**: Monitor, configure, deploy, and lifecycle management activities are all available through a single pane of glass user interface


# How It Works
<!--REQUIRED-->
### High-Level System View Diagram
![High Level Component Diagram](https://github.com/open-edge-platform/edge-manageability-framework/blob/main/Edge_Manageability_Framework_Readme_Image.png)


## Key Features
<!--
Guidance for Authors:
- Audience Expectation: Developers want to know what the microservice does and how it works at a technical level.
- Focus on the **technical capabilities** of the microservice (what it does).
- Use developer-focused language, such as specific APIs or processing pipelines.
- Example Features:
  - Representational State Transfer (REST) and gRPC API support.
  - Modular architecture for extending components.
  - Pre-trained models optimized for specific use cases.
-->
**Feature 1**: Infrastructure management of your edge hardware systems, at scale
- Create a custom hierarchical data model that matches your organization’s business needs
- Manage hosts with policy-based management and monitor hosts across all your edge sites 
- Securely onboard and provision hosts

**Feature 2**: Cluster orchestration to manage, monitor, and operate Kubernetes\* clusters across hosts
  - Simplify cluster lifecycle management at all stages of operation
  - Streamline and standardize downstream cluster creation with Kubernetes templates

**Feature 3**: Application orchestration to easily package, deploy, and monitor cloud-native applications across distributed edge networks
- Simplify deployment of complex solutions with flexible packaging, profiles, and custom deploy-time environments
- Deploy, run, and manage container and virtual machine workloads side by side
- Deploy software automatically based on user-defined metadata, or to a list of known targets

## Supporting Resources
- Start by deploying your own orchestrator [in the cloud or on-premises](https://github.com/open-edge-platform/orch-docs/blob/main/docs/deployment_guide/index.rst)
- Read the latest [Release Notes](https://github.com/open-edge-platform/orch-docs/blob/main/docs/release_notes/index.rst) or explore the [User Guide](https://github.com/open-edge-platform/orch-docs/blob/main/docs/user_guide/index.rst)
- Learn about all components and usage of them in the [Developer Guide](https://github.com/open-edge-platform/orch-docs/blob/main/docs/developer_guide/index.rst)
- [Contribute](https://github.com/open-edge-platform/orch-docs/blob/main/docs/developer_guide/contributor_guide/index.rst) to the project
