Open Edge Platform Continuous Integration Logic
===============================================

`Open Edge Platform <https://github.com/open-edge-platform>`_ uses GitHub Actions as its CI engine. A dedicated repository called `orch-ci <https://github.com/open-edge-platform/orch-ci>`_ acts as the shared CI hub, providing reusable workflows and scripts that other repositories reference. These workflows automate:

- Build and Test: Compiling code and running unit/integration tests.
- Linting & Code Quality: Enforcing coding standards and static analysis.
- Security Scans: Tools like Trivy and ClamAV check for vulnerabilities.
- Versioning & Tagging: Scripts for consistent version control and Helm chart validation.
- Release Automation: Publishing artifacts (e.g., container images, Helm charts) after successful builds.


How It Works Across Repositories
--------------------------------
Each repo (e.g., edge-node-agents, edge-manageability-framework) includes workflow files that call reusable actions from orch-ci.
When you open a Pull Request (PR):

* Pre-Merge CI detects what's been modified and runs tests, linting, and security checks.
* Post-Merge CI triggers additional validations, signing and artifact publishing.


Developer Workflow
------------------
Fork the repo → Create a branch → Make changes → Push and open a PR.
CI validates the PR automatically.
If all checks pass, maintainers merge the PR, and release workflows publish artifacts to registries.


Advanced Features
-----------------
- Self-hosted runners for performance.
- Container-based builds for reproducibility.
- UI testing with Cypress for front-end components.
- Integration with security and compliance tools for enterprise readiness.

**This setup ensures consistency, security compliance, and fast releases across all Open Edge Platform projects.**
