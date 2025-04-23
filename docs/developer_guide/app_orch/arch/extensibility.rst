Extensibility
=============

Every aspect of Application Orchestration system is designed to be extensible and
customizable.

- **Adding Components**:

  - Because of the granular cloud-native architecture of all of the Application
    Orchestration components it is possible to add new components to the system.
    This could be a new service that provides a new capability, or a new controller
    that manages existing or new CRDs.

- **Customizing Workflows**:

  - The workflows are designed to be broad and abstract to accommodate many different
    types of applications and deployment scenarios. The workflows can be customized
    by adding new steps or new policies to the existing steps.

- **Integration Points**:

  - All aspects of the Application Orchestration deployment workflow can be accessed
    through the Application Catalog API. This allows for integration with other
    systems, such as CI/CD pipelines, or other orchestration systems.

