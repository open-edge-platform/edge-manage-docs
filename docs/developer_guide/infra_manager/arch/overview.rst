Overview
========

Edge Infrastructure Manager offers policy-based secure life cycle management
of a fleet of edge nodes/devices at scale, spread across distributed locations
allowing onboarding, provisioning, inventory management, upgrades and more.

It solves the following problems:

- Organize edge devices into a hierarchical structure of organizations,
  regions, and sites, and enforce policies with multi-tenancy support.

- Secure device onboarding and operating system provisioning. Supporting
  immutable Edge Microvisor Toolkit Operating System and Ubuntu LTS.

- Support for fleet level operating system upgrades.

- Policy based deep observability (Alerts, metrics, logs and telemetry) or
  hardware and software resources at fleet level .

- deploy on-cloud or on-premises.

At the same time, it provides the following benefits to developers who want
to integrate Edge Infrastructure Manager into their solutions:

- Built with model-based design and cloud-native principles for scalability,
  maintenance, and extensibility.

- Expose CRUD based North bound APIs for UI/User for managing resources.

- Expose APIs to cluster and application orchestrator to manage Kubernetes
  and application on fleet of devices.

The platform is designed to be modular and extensible, allowing for the
integration of new components and services.

It can also control and manage devices that are not directly connected to the
platform, by leveraging vendor specific extensions to interact with external
facing APIs exposed by the infrastructure.

Features
^^^^^^^^

- Onboard and provision OS for edge devices in under 7 minutes. Support
  concurrent onboarding of up to 50 edge devices.

- Support concurrent 10k edge devices for normal operations (day1 - steady
  state) and 1k edge devices OS upgrades.

- Allow atomic upgrade and rollback when upgrading Edge Microvisor Toolkit Operating
  System and provide packages based update for Ubuntu LTS.

- Ensure trusted nodes with secure boot and full disk encryption.

- Enable zero-touch onboarding and OS provisioning for edge devices without
  need for a keyboard and monitor. Also, supports both local USB and remote
  HTTPs based OS provisioning.

- Support a wide range of hardware based on Intel* Core and Intel® Xeon®
  platforms with single/multiple storage, Intel* GPU, and Ethernet NICs.
