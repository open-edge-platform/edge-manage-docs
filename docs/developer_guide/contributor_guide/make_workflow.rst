Local and CI Workflow using make
================================

This document describes the workflow a developer working on individual
components would use to perform tasks like building and testing code.

To standardize developers and CI will interact with the codebase, the ``make``
tooling was selected as the primary interface in most repos, which is a well
known and efficient tool for capturing tooling invocation and dependency-based
software builds.

This workflow has the following goals:

- Create consistency of UX across repos. Developers should not be surprised or
  have their muscle memory broken when moving between different codebases.

- Encapsulate complex or non-trivial tool invocations into build targets, so
  there is consistency between a developer manually invoking a target and CI
  invoking the same target.

- Provide help text to document targets that can be invoked.

- Allow configuration as needed for target invocations

``make`` has the concept of "targets" in ``Makefile``, which are lists
of commands that can be invoked.

An example can be found at the end of this document, at `Example
Makefile <#example-makefile>`__.

In what context are targets invoked?
------------------------------------

There are 3 primary contexts where ``make`` targets will be invoked:

1. Developers who are making or testing code changes, who will manually
   invoke the targets via a CLI.

2. As a part of tools that building artifacts which consume both code
   and build instructions.

   - For example, including Makefile in the Docker\* image build context
     and then calling targets in the Dockerfile.

3. CI automation that runs in two scenarios:

   1. To verify pre-committed changes during code review
   2. To publish artifacts on post-committed code

Care should be taken to not prioritize one of these contexts over the
others, or to create too much specialization - a set of "CI targets"
that are separate and function differently from "developer targets" may
result in confusion or undesired behavior.

CI should in nearly all cases invoke make targets, and avoid running
commands separately. There may be some exceptions to this - see `Tools
that can only be run in CI <#tools-that-can-only-be-run-in-ci>`__.

Typical Usage
-------------

The following are examples of how the make targets would typically be
invoked during development or CI.

Developer loop
~~~~~~~~~~~~~~

A developer would typically check out the code - either an initial ``git
clone`` or ``git pull`` to update the local copy - and then make desired
changes to the code.

The typical set of invocations would be:

- ``make check``: check that developers system suitable and ready for
  development by verifying that all needed tooling with correct versions
  is available, or downloading it. This target is run infrequently.

- ``make lint``: check that the code passes all lint/static checking

- ``make test``: check that all code generation, unit and other tests
  pass.

  - This also should run any ``lint`` and ``generate`` steps.

- ``make build``: build a local copy of the code

If modifying the distribution mechanism

- ``make docker-build``: Check that changes to Dockerfiles still result
  in a buildable image

CI validation
~~~~~~~~~~~~~

These are the steps run by CI to validate a code submission (GitHub pull
request). It runs most of the same targets as a developer, but with
additional interim checks. A typical CI testing run would be:

- ``git clone`` the repo

- Set any variables, for example, the `Docker
  Configuration <#docker-configuration>`__ ones.

- ``make check``: check that the CI environment has all the correct
  versions of required tooling available, or downloading it as needed.

- ``make test``: run all lint, generation, test targets.

- Check with ``git diff`` that no code was modified, for example if the
  developer failed to run a ``make generate`` step (which is included in
  ``make test``).

- Verify that the artifacts are buildable. This might be a
  ``make build`` or a ``make docker-build``. Failure at this point might
  be due to changes in the build steps.

- Perform any steps to publish all test results, which are found in the
  `Output Directory <#output-directory>`__.

CI publish
~~~~~~~~~~

These are the CI steps run after code has been merged into a branch.

All the CI Validation steps may be run, but in additional publish
commands such as the following would be run:

- Creating Git tags if a new version is released

- Setting variables that are used to tag artifacts with version
  information

- Building artifacts for distribution with that tag/version information

- Artifact publishing - for example, the ``make docker-push`` target
  would be invoked to push a Docker image to a registry.

Variables and Configuration
---------------------------

To configure a Makefile, the most typical method is to use environmental
variables which override the default values set in the Makefile.

The following are required variables that must be used for conformity in
the CI process.

Output Directory
~~~~~~~~~~~~~~~~

All output of the build process, including binaries and artifacts,
output of unit tests, and similar temporary non-code files, should be
stored in a directory named ``out``, which is referred to by the
variable named ``OUT_DIR``.

This name is selected because it will not conflict with target names
(for example a ``build`` directory name conflicts with a ``make build``
target).

The output directory should be in the ``.gitignore`` file to prevent
artifacts from being checked into git.

Docker Configuration
~~~~~~~~~~~~~~~~~~~~

Docker has a fairly complex set of variables, and these are frequently
overridden by both developers and CI, primarily to configure which OCI
registries container images are pushed to.

The following variables are frequently used for configuring Docker
container image names:

- ``DOCKER_REGISTRY``- the DNS name of the registry. Example:
  ``registry-rs.edgeorchestration.intel.com``.

- ``DOCKER_REPOSITORY`` - the name of the repository (also sometimes
  called a project) within the Registry. Example:
  ``edge-orch``.

These are less frequently changed and should generally be set by
commands in the Makefile:

- ``DOCKER_IMG_NAME`` - the name of the container image. Example:
  ``inventory``.

- ``DOCKER_VERSION`` - the version tag of the image. It should usually be
  derived from the ``VERSION`` file in the repo. Example: ``1.0.0``.  See
  :doc:`versioning` for more information on the versioning process and the use
  of ``VERSION`` files.

These variables are combined into a full Docker container image name:

.. code:: shell

   $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_IMG_NAME):$(DOCKER_VERSION)

Which for the examples above would be:

.. code:: text

   registry-rs.edgeorchestration.intel.com/edge-orch/inventory:1.0.0

There are additional variables used for configuring Docker image for the
environment, for example:

- ``DOCKER_NETWORKING_FLAGS`` - used to configure networking specific to
  Docker-in-Docker scenarios.

- ``DOCKER_ENV`` - used to enable BuildKit or other features

Targets
-------

Note that not all targets may be needed in all cases. At a minimum, the
``make test`` and ``make build`` targets should exist for all repos, but
what they invoke may differ depending on the contents of the repo.

Check targets
~~~~~~~~~~~~~

The ``make check`` target is used to check that prerequisite tools
required to build and perform development are available, with the
correct versions. This helps reduce the amount of "it works on my
machine" due to a developer using a different version of tools than are
used in CI or on another developers system. This most commonly occurs
with compilers, lint, and test tools.

These checks are usually accomplished by running the tool and having it
report it's version, then comparing it with a known value in the
Makefile:

.. code:: make

   check: go-version

   VER_GO_WANT := 1.23.2
   VER_GO_HAVE := $(shell go version)

   go-version:
       @grep -q "$(VER_GO_WANT)" <<< "$(VER_GO_HAVE)" || \
       (echo "go version mismatch - have: $(VER_GO_HAVE), want: $(VER_GO_WANT)" && exit 1)

Additionally, some systems may attempt to download prerequisite tools
during the check process. For example, if Python\* virtualenvs are used,
the ``make check`` target should be used to create the virtualenv.

Testing targets
~~~~~~~~~~~~~~~

The ``make test`` test target should run all of the testing type targets
that are available in the repository, which are listed below.

Typically the ``make test`` target will not have any specific commands
listed under the target, but only have a list of dependent targets.

License checks
""""""""""""""

The license check tooling we use is `REUSE <https://reuse.software>`__
which checks that all files in a repository have appropriate licensing.

It uses the following files as configuration, which are specific to the
repo contents:

``REUSE.toml`` - follows the `REUSE 3.3
spec <https://reuse.software/spec-3.3/#reusetoml>`__ or later, for
applying licenses to files that cannot or must not have a license header,
for example binaries, JSON, etc.

``LICENSES/*`` - Contains all the licenses used with REUSE.

Linting and Formatting checks
"""""""""""""""""""""""""""""

These targets focus on conforming to a specific code style, or are free
of any formatting or correctness errors.

All of the lint type targets should be included in a ``make lint``
target, that includes all linters specific to the contents of the
repository, so they can be more easily run by developers.

Typical formatting tools are ``gofmt`` (for Go) or ``black`` (for
Python).

Typical linting tools frequently have ``lint`` in the name, such as
``yamllint`` (for YAML), ``golangci-lint`` (for Go), ``pylint`` (for
Python), or ``hadolint`` (for Dockerfiles).

Spellchecking of documentation also falls under context of linting.

Unit tests
""""""""""

Unit tests are run with a test runner that is specific to the language
and types of test. How these are invoked goes beyond the scope of this
document.

Unit tests should create machine-readable output in ``OUT_DIR``, where
an CI process can consume it. Typically the unit test output is expected
to be in JUnit format. Coverage information should also be provided,
typically in Cobertura format.

Generation checks
"""""""""""""""""

If there is machine-generated code in the repository, then a
``make generate`` target should be included, and be included as a
dependency of ``make test``.

Examples of this include, but are not limited to:

- Running a protobuf or gRPC compiler
- Automatic code generation

Having generation specific target makes the development loop faster when
running generation over and over.

Additionally, in CI there should be verification that the generation was
run, by doing to following:

- Re-run the generation toolchain (should be included in ``make test``)
- Checks for any differences after generation - usually using
  ``git diff``

This verifies that the generation was run properly by the developer who
is submitting code.

Artifact targets
~~~~~~~~~~~~~~~~

These targets generate an artifact - usually the output of a build
process, such as:

- Compiled binaries
- OS Packages (.deb, .rpm, or similar)
- Docker images
- Archives in specific formats (for example Helm\* chart ``.tgz`` files)
- Documentation that has been converted to web or PDF format

A code repository need only include the artifact targets suitable for
the types of artifacts it generates - a OS package repo may not need the
Docker artifact targets, and vice-versa.

Artifact targets also includes distribution focused targets:

- Creating ``.zip`` or ``.tgz`` archives for distribution
- Uploading (pushing) a docker image to an OCI repository

Build target
""""""""""""

All repos should have a ``make build`` which generates a locally usable
copy of artifacts. For example, a service may only be deployed in
Docker, but the service's binary should be able to be built separately,
which provides a faster compile check for the developer.

Docker targets
""""""""""""""

Docker has it's own set of targets:

- ``make docker-build`` - create a Docker container image on the local
  system

- ``make docker-push`` - push the Docker container image to an external
  OCI repository. Note that this should depend on ``docker-build``, as
  in CI it is common to run ``docker-push`` multiple times with
  different variables set to allow applying different tags (typically a
  version tag and branch name as tag), and Docker's cache will avoid a
  rebuild.

- ``make docker-list`` - generates YAML that includes Docker container images
  names that are built from this repo, as well as tag and make target
  information for each image. This is used to enable rebuilding of all
  containers in an efficient manner - see the `buildall README
  <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/buildall/README.md>`_
  for the format.

These used the variables defined in `Docker Configuration
<#docker-configuration>`__.

Helm targets
""""""""""""

Helm charts have their own set of targets:


- ``make helm-build`` - builds Helm charts for the repo, which are created as a
  ``.tgz`` file. Typically this should be put in the ``OUT_DIR``.

- ``make helm-push`` - pushes the Helm chart to an OCI repo.

- ``make helm-list`` - print information on all Helm charts created by this
  repo in YAML format. This is used by the buildall automation - see the
  `buildall README
  <https://github.com/open-edge-platform/edge-manageability-framework/blob/main/buildall/README.md>`_
  for the format.

Clean targets
~~~~~~~~~~~~~

There should also be targets that clean up the repo - typically:

- ``make clean``, which cleans up any built artifacts
- ``make clean-all`` which also cleans up any downloaded or temporary
  tools

Help target
~~~~~~~~~~~

The help target (``make help``) typically is a set of commands that
parses the makefile and lists all targets, usually with explanations
given as a comment on the makefile. In most cases it should be the
default target which is run when make is invoked without a target - this
can be done by adding this line to the Makefile:

.. code:: make

   .DEFAULT_GOAL := help

There are many different implementation of the help target, but the
following is recommended:

.. code:: make

   help: ## Print help for each target
       @echo $(PROJECT_NAME) make targets
       @echo "Target               Makefile:Line    Description"
       @echo "-------------------- ---------------- -----------------------------------------"
       @grep -H -n '^[[:alnum:]%_-]*:.* ##' $(MAKEFILE_LIST) \
       | sort -t ":" -k 3 \
       | awk 'BEGIN  {FS=":"}; {sub(".* ## ", "", $$4)}; {printf "%-20s %-16s %s\n", $$3, $$1 ":" $$2, $$4};'

Help text is placed at the end of each line containing a target that
should provide help, add after two hashes (ie ``## help text``).

This implementation provides more features and less downsides that other
options:

- It supports finding targets across multiple Makefiles, and lists the
  line numbers of where the target was found.

- It avoids the use of ``sed``, which has compatibility issues depending
  on which implementation (Gnu/BSD) of sed is in use.

Other targets
~~~~~~~~~~~~~

This list is by no means comprehensive - if additional targets are
needed, for example to enable a complex developer process that is not
needed by CI, by all means add it to the Makefile.

Modularity Example
------------------

The Makefile format supports including other Makefiles, which provides
modularity and the ability to split up makefiles into more focused
files. The suffix used is for identifying these non-primary Makefiles is
``.mk``.

An example of how this is used can be found in the `Infra-Core repo
<https://github.com/open-edge-platform/infra-core>`__, which has a Makefile
that includes both a ``common.mk`` and ``version.mk``, by using the ``include
<filename>`` directive.

In a typical scenario, the ``common.mk`` and ``version.mk`` contain common
invocations and are not specific to the repository - if a change needed to
happen across multiple repos, it could be implemented in these files, and then
the whole file copied into other repositories to update them.

common.mk
~~~~~~~~~

This includes many common API generation, docker, and lint targets. Note
that many of these targets are called from the primary Makefile.

version.mk
~~~~~~~~~~

This contains many tool version checks, as would be used in a `make
check <#check-targets>`__ target. This is a separate file so that it can
be copied between repos when tools are changed/updated.

Writing Makefiles
-----------------

Makefiles in the Edge Manageability Framework project use `GNU
make <https://www.gnu.org/software/make/manual/html_node/index.html>`__.
Here are some manual sections that are useful to understand when reading
and creating Makefiles:

- ``=:`` - `Simple Expanded Variable
  Assignment <https://www.gnu.org/software/make/manual/html_node/Simple-Assignment.html>`__,
  which expands the left side when the variable is defined.

- ``=?`` - `Conditional Variable
  Assignment <https://www.gnu.org/software/make/manual/html_node/Conditional-Assignment.html>`__,
  which assigns only when the variable has not previously been set.

- `Pattern
  Rules <https://www.gnu.org/software/make/manual/html_node/Pattern-Intro.html>`__,
  to understand the use of ``%`` in target names.

- `Automatic
  Variables <https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html>`__,
  which covers commonly used variables like ``$@``, ``$%`` and so on.

- `Text Transformation
  Functions <https://www.gnu.org/software/make/manual/html_node/Functions.html>`__,
  which are frequently used on filenames, strings, and so on.

- `Phony
  Targets <https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html>`__,
  used to indicate targets that don't create files.

- `Types of
  Prerequisites <https://www.gnu.org/software/make/manual/html_node/Prerequisite-Types.html>`__,
  for a target, which in normal or order-only (after a ``|``) target
  prerequisites, useful when creating directories as targets.

Makefile Style Guide
~~~~~~~~~~~~~~~~~~~~

When referring to variables, generally you should wrap them with smooth
parentheses, such as: ``$(VAR_NAME)``. While curly braces will work as well,
it can be more easily confused with shell substitutions, and mixing the
smooth/curly within a Makefile can result in errors when running
``make``.

The shell used with a Makefile should be set to use `strict
defaults <http://redsymbol.net/articles/unofficial-bash-strict-mode/>`__
that will exit on error - this can be done by setting the ``SHELL``
variable:

.. code:: make

   SHELL := bash -eu -o pipefail

``make`` uses tabs to start lines within a target, and will run a
separate shell invocation for every line. If you need to run commands in
succession, for example after setting an environmental variable, you can
continue in the same shell by adding a backslash (``\``) at the end of a
line. If you need to run multiple commands in the same shell, use either
``;`` or ``&&`` to separate commands.

Continuation results in shorter lines which makes code easier to read,
and results in cleaner diffs which simplifies code review.

When creating continuation lines, start the new line with spaces and not
tabs - in most editors, this will highlighting editing mistakes when a
backslash is missing.

When creating targets that run a lint or similar testing tool, print the
version first so that comparisons can be made between versions run in in
CI and on a local workstation - an example:

.. code:: make

   # https://github.com/koalaman/shellcheck
   SH_FILES := $(shell find . -type f \( -name '*.sh' \) -print )
   shellcheck: ## lint shell scripts with shellcheck
       shellcheck --version
       shellcheck -x -S style $(SH_FILES)

Tools that can only be run in CI
--------------------------------

In the general case, if a tool can be run locally/offline by a
developer, it should be in a Makefile target. This allows a developer to
check locally before submitting code.

If a tool can only be run in a hosted/CI environment (for example, due
to licensing or permission reasons), then a Makefile target is not
required. To support these tools:

- Create a shared GitHub Action that runs the tool in CI.

- Describe in detail what the tool and GitHub Action does and how to
  view the job's output and address any failures that arise.

Example Makefile
----------------

Below is an example Makefile. It assumes that:

- The version is stored in a VERSION file in the repo.
- Some python based tools may be installed in a local venv and are
  specified in a ``requirements.txt``.

.. code:: make

   # Example Makefile

   # SPDX-FileCopyrightText: (C) 2025 Intel Corporation
   # SPDX-License-Identifier: Apache-2.0

   # default goal to show help
   .DEFAULT_GOAL := help

   # these targets don't create files, so are marked PHONY
   .PHONY: help build test lint license check version-go docker-build docker-push docker-list clean clean-all

   # use shell safe mode
   SHELL         := bash -eu -o pipefail

   ### configuration variables ###
   # project configuration
   PROJECT_NAME  := example
   VERSION       := $(shell cat VERSION) # read from VERSION file

   # docker configuration
   DOCKER_NETWORKING_FLAGS ?=
   DOCKER_ENV              ?=
   DOCKER_REGISTRY         ?= example-registry.com
   DOCKER_REPOSITORY       ?= example-repo
   DOCKER_IMG_NAME         ?= $(PROJECT_NAME)
   DOCKER_VERSION          ?= $(VERSION)

   # Path variables
   OUT_DIR       := out

   # If out dir does not exist, create it
   $(OUT_DIR):
       mkdir -p $(OUT_DIR)

   ### check targets ###

   # tool version checks
   VER_GO_WANT := 1.23.3
   VER_GO_HAVE := $(shell go version)

   version-go:
       @grep -q "$(VER_GO_WANT)" <<< "$(VER_GO_HAVE)" || \
     (echo "go version mismatch - have: $(VER_GO_HAVE), want: $(VER_GO_WANT)" && exit 1)

   # Python virtualenv, for python-based tools
   VENV_NAME     := venv_$(PROJECT_NAME)

   # virtualenv activate script has undefined variables, disable then re-enable in bash
   $(VENV_NAME): requirements.txt
       python3 -m venv $@ ;\
     set +u; . ./$@/bin/activate; set -u ;\
     python -m pip install --upgrade pip ;\
     python -m pip install -r requirements.txt

   check: version-go | $(VENV_NAME) ## Check for and/or install prerequisite tools

   ### test targets ###
   test: lint unittest

   lint: license ## Check lint

   license: $(VENV_NAME) ## Check licensing with the reuse tool
       set +u; . ./$</bin/activate; set -u ;\
     reuse --version ;\
     reuse --root . lint

   unittest: $(OUT_DIR) ## Run unit tests
       echo "Add unit test invocation here, all output should go in $(OUT_DIR)"

   ### build targets ###
   build: $(OUT_DIR)/example-bin ## build code

   $(OUT_DIR)/example-bin: | $(OUT_DIR)
       echo "Add build invocation here, should create $@"

   ### docker targets ###
   DOCKER_TAG := $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_IMG_NAME):$(DOCKER_VERSION)

   docker-build: ## build Docker image
       echo "Add docker build ... invocation here"

   docker-push: docker-build ## tag and push Docker image
       echo "Add docker push ... invocation here"

   docker-list: ## list docker image names + tags
       @echo $(DOCKER_TAG)

   ### cleanup targets ###
   clean: ## delete all build artifacts
       rm -rf $(OUT_DIR)

   clean-all: clean ## delete all built artifacts and downloaded tools
       rm -rf $(VENV_NAME)

   ### help target ###
   help: ## Print help for each target
       @echo $(PROJECT_NAME) make targets
       @echo "Target               Makefile:Line    Description"
       @echo "-------------------- ---------------- -----------------------------------------"
       @grep -H -n '^[[:alnum:]%_-]*:.* ##' $(MAKEFILE_LIST) \
       | sort -t ":" -k 3 \
       | awk 'BEGIN  {FS=":"}; {sub(".* ## ", "", $$4)}; {printf "%-20s %-16s %s\n", $$3, $$1 ":" $$2, $$4};'

