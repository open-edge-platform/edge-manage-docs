# Edge Orchestrator Documentation - AI Agent Instructions

## Project Overview

This is a **Sphinx-based technical documentation repository** for Edge Orchestrator, Intel's edge computing management platform. The docs are written primarily in **reStructuredText (RST)** and built into HTML using Sphinx with custom configurations.

## Build & Development Workflow

### Essential Commands (via Makefile)
```bash
make serve          # Auto-rebuild + live reload (uses sphinx-autobuild)
make build          # Build HTML docs to out/ directory
make lint           # Run all linting (required before PR)
make generate       # Auto-generate IAM role docs from source configs
make clean          # Delete build artifacts
make clean-all      # Also remove virtualenv
```

### Python Environment
- **Python >=3.11.0** required with dependencies: `libbz2-dev`, `libncurses5-dev`, `libssl-dev`, `liblzma-dev`, `libsqlite3-dev`
- Virtualenv auto-created as `venv_edge-manage-docs/` when running make targets
- Custom docconf module (`docconf/`) installed into virtualenv - **delete venv after modifying it**

## Documentation Architecture

### Directory Structure
- `docs/` - All documentation content
  - `conf.py` - Sphinx config (imports from docconf module)
  - `substitutions.txt` - Global RST substitutions (e.g., `|software_prod_name|`)
  - `shared/` - Reusable content chunks included via `.. include::` directive
  - `api/openapi/` - OpenAPI YAML specs rendered via sphinxcontrib-openapi
  - User/developer/deployment guides organized by audience
- `docconf/` - Shared Sphinx configuration Python module
- `generate/` - Auto-generation scripts (see below)

### Shared Content Pattern
Frequently reused content lives in `docs/shared/shared_*.rst` files. Include them:
```rst
.. include:: ../../shared/shared_gs_iam.rst
```
Common shared files: IAM setup, troubleshooting, firewall config, prerequisites.

## Critical Conventions

### RST Style Rules (enforced by doc8)
- **79 character line limit** for prose (use editor rewrap features)
  - Exceptions: URLs, literal blocks, RST directives
- **Unix line endings (LF)**, UTF-8 encoding
- **No trailing whitespace**
- **Spaces only, no tabs**

### Product Name Substitution
Always use `|software_prod_name|` instead of hardcoding "Edge Orchestrator" - defined in `docs/substitutions.txt`:
```rst
|software_prod_name| provides automated cluster management...
```

### Cross-References
**Never manually define references** - `autosectionlabel` extension auto-creates refs from all headings:
```rst
See :doc:`/user_guide/get_started_guide/index` for setup.
See :ref:`deployment_guide/cloud_deployment/cloud_get_started/index:Prerequisites`
```
List all available refs: `make build && make listrefs`

### Admonitions
Use Sphinx directives consistently:
```rst
.. note::
   Info for users to be aware of.

.. warning::
   Critical information about potential issues.
```

### Code Blocks & Literal Text
Wrap all code/tool names in double backticks:
```rst
Run ``kubectl get pods`` to verify deployment.
The ``OrchCLI`` tool is required.
```

## Auto-Generated Content

### IAM Groups & Roles Documentation
**DO NOT manually edit** `docs/shared/shared_iam_groups.rst` or `docs/shared/group_role_xy.csv` - auto-generated via:
```bash
make generate  # Runs generate/role_docs.py
```

**Source files** (copy from edge-manageability-framework repo when updated):
- `generate/sources/platform-keycloak.yaml`
- `generate/sources/keycloak-tenant-controller.tpl`
- `generate/sources/iam_details.yaml` - Add role descriptions here

Uses Jinja2 templates from `generate/templates/` to produce RST + CSV files.

## Linting & Quality Checks

### Pre-PR Requirements
Run `make lint` which executes:
- `reuse lint` - License header compliance (SPDX)
- `yamllint` - YAML files (excludes `docs/api/openapi/`)
- `pylint` - Python code quality
- `black --check` - Python formatting
- `doc8` - RST style (line length, whitespace, encoding)
- `markdownlint` - README and GitHub templates
- `sphinx-spelling` - Spellcheck with custom dictionary

### Spell Check
Valid words go in `dict.txt` (alphabetical order). For code/tools, use inline code format:
```rst
Install ``kubectl`` and ``helm`` before proceeding.
```

### Link Checking
```bash
make sphinx-linkcheck  # Verify all external links
```
Add problematic URLs to `linkcheck_ignore` in `docconf/docconf/docconf.py`.

## Sphinx Configuration

### Two-Layer Config System
1. **docconf module** (`docconf/docconf/docconf.py`) - Common config across all docs
2. **docs/conf.py** - Imports from docconf, project-specific overrides

Key settings:
- `warning_is_error = True` - Strict mode, all warnings fail build
- PyData theme with custom header/navigation (falls back to pydata_sphinx_theme if spark_sphinx_theme unavailable)
- Extensions: autosectionlabel, openapi, mermaid, spelling, copybutton, design, asciinema

### Theme & Branding
- Theme options in `docconf/docconf/docconf.py`: `html_theme_options`
- Logo text: "Edge Orchestrator"
- Version switcher for multi-version docs (if `switcher_data.txt` exists)

## File Editing Guidelines

### When Editing RST Files
1. **Check line length** - Rewrap at 79 chars
2. **Use substitutions** - `|software_prod_name|` not "Edge Orchestrator"
3. **Verify includes** - Ensure shared content paths are correct
4. **Run doc8** - `doc8 path/to/file.rst` before committing
5. **Test locally** - `make serve` to preview changes

### When Adding New Files
- Place in appropriate guide directory (user_guide/, developer_guide/, etc.)
- Add to parent `index.rst` toctree
- Follow naming convention: lowercase_with_underscores.rst
- Include SPDX license headers (handled by REUSE.toml annotations)

## CI/CD Pipeline

### Pre-Merge Checks
- Runs on PRs to `main` or `release-*` branches
- Executes: version check, `make build`, `make lint`
- Uses shared workflow from `open-edge-platform/orch-ci` repo

### Publishing
- Manual workflow dispatch for `publish-docs.yml`
- Publishes to `docs.openedgeplatform.intel.com/edge-manage-docs/`
- Supports version switching via JSON switcher

## Common Pitfalls

1. **Editing generated files** - `shared_iam_groups.rst` is auto-generated, edit sources in `generate/sources/` instead
2. **Line length violations** - Auto-wrap prose, but don't break URLs/literals
3. **Missing spellcheck entries** - Add valid terms to `dict.txt`, wrap code in backticks
4. **Broken cross-refs** - Use `make listrefs` to find correct reference labels
5. **Virtualenv stale** - Run `make clean-all` after modifying docconf module

## External Dependencies

- Keycloak configs synced from `edge-manageability-framework` repo
- OpenAPI specs in `docs/api/openapi/*.yaml`
- Theme requires node.js/npm for markdownlint (`markdownlint-cli2`)
