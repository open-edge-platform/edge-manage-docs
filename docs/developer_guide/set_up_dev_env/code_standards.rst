Code Standards
--------------

The project follows specific coding standards to ensure consistency and
readability. Please adhere to the following guidelines when contributing:

Golang
~~~~~~

- Follow the guidelines in Effective Go.
- Use gofmt to format your code.
- Write clear and concise comments for exported functions, types, and packages.
- Use idiomatic Go constructs and avoid unnecessary complexity.
- Ensure that your code is well-tested and includes unit tests for all
  functions.
- Use descriptive variable and function names that clearly convey their
  purpose.
- Avoid global variables and prefer dependency injection where possible.
- Handle errors gracefully and provide meaningful error messages.
- Code must pass mage ``lint:golang`` to ensure proper formatting.

Helm\*
~~~~~~

- Follow the Helm Best Practices.
- Use meaningful names for charts, templates, and values.
- Code must pass mage lint:helm to ensure proper formatting.

Markdown
~~~~~~~~

- Use proper Markdown syntax for headings, lists, links, and code blocks.
- Code must pass mage lint:markdown to ensure proper formatting.

Shell Script
~~~~~~~~~~~~

- Use #!/usr/bin/env bash at the top of your scripts to specify the shell.
- Always use set ``-o errexit`` to ensure the script exits on the first error.
- Use set ``-o nounset`` to treat unset variables as an error.
- Use set ``-o pipefail`` to catch errors in pipelines.
- Write clear and concise comments to explain the purpose of complex commands.
- Use functions to encapsulate and reuse code.
- Check the exit status of commands and handle errors appropriately.
- Avoid using hardcoded paths; use variables and configuration files instead.
- Ensure your scripts are idempotent and can be run multiple times without
  causing issues.
- Use the long form of commands (e.g., --verbose instead of -v) for clarity.
- Code must pass mage lint:shell to ensure proper formatting.

Terraform
~~~~~~~~~

- Follow the Terraform Style Guide.
- Code must pass mage lint:terraform to ensure proper formatting.

YAML
~~~~

- Use proper YAML syntax for indentation, lists, and key-value pairs.
- Ensure that your YAML files are valid and well-structured.
- Code must pass mage lint:yaml to ensure proper formatting.

Continuous Integration
~~~~~~~~~~~~~~~~~~~~~~

- Submit a pull request (PR) to the main branch of the repository.
- Wait for the CI to run and verify that all checks pass before merging.
- If your PR is a work in progress, mark it as a draft to indicate that it's
  not ready for review yet.
- Ensure that your code passes all continuous integration (CI) checks.
- Address any feedback or requested changes from the CI or code reviewers.
- If your PR introduces new features or changes existing functionality, ensure
  that it includes appropriate tests.  If it fixes a bug, include a test that
  demonstrates the bug and verifies the fix whenever possible.  This helps
  prevent the bug from reoccurring in the future.
- Use descriptive commit messages that clearly explain the changes made.
- Break down large changes into smaller, manageable commits to make it easier
  for reviewers to understand.
- Ensure that your code is well-documented and includes comments where
  necessary to explain complex logic or decisions.
- Keep your PR focused on a single change or feature to make it easier for
  reviewers to provide feedback.
- Respond to code reviews in a timely manner and be open to feedback.
- If your PR is related to a specific issue, reference that issue in the PR
  description to provide context.
- Pin all dependencies to a specific patch version at a minimum in your code to
  ensure reproducibility.
- Code should be reusable and portable across platforms.
  Avoid writing code that is tightly coupled to a specific CI environment.
  All code that runs in CI should be able to run locally as well.
- CI workflows should primarily be executing the same Mage commands that a
  developer would run locally.  There should not be any "magic" in the CI that
  is not also available locally.

Testing
-------

- Write unit, integration, and E2E tests for your code.
- Ensure all static analysis and tests pass before submitting a pull request.
- Aim for high test coverage to ensure code reliability.

Documentation
-------------

- Update the documentation to reflect your changes.
- Write clear and concise docstrings for all functions, classes, and modules.
