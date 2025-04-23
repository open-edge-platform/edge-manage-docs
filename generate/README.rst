.. copyright:
   SPDX-FileCopyrightText: (C) 2025 Intel Corporation
   SPDX-License-Identifier: Apache-2.0

Documentation Autogeneration
============================

This directory contains code for automatically generating documentation files.

It leverages `Jinja2 engine <https://jinja.palletsprojects.com>`_ for templates, which
are found in the templates/ dir.

To perform all generation, run ``make generate`` in the repository root.

Group and Role Documentation
----------------------------

This automatically generates the role information from the Keycloak\* solution and Keycloak
Tenant Controller configuration, which is found in the
`https://github.com/open-edge-platform/edge-manageability-framework
<https://github.com/open-edge-platform/edge-manageability-framework>`_
repository.

The files:

- ``argocd/applications/custom/keycloak-tenant-controller.tpl``
- ``argocd/applications/configs/platform-keycloak.yaml``

must be copied into the ``sources`` directory when they are changed, as they
are used to generate the Group and Role documentation.

Extra information about the groups and roles is given in
``/sources/iam_details.yaml``, add description there as needed.
