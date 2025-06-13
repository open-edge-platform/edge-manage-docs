# Edge Orchestrator Documentation

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/open-edge-platform/edge-manage-docs/badge)](https://scorecard.dev/viewer/?uri=github.com/open-edge-platform/edge-manage-docs)

## Overview

This repository contains documentation for the Edge Orchestrator.

The repository root contains configuration and build tools; and the `docs/`
the directory contains the documentation text.

## Create new content

To develop the documents locally, you must have a supported Python\* 3
software release.

Serve the document from a local server using `make` from the root directory:

- `make serve` will watch the files and automatically rebuild when something changes.
  It will also automatically reload the browser.

## Build

To build and develop the documents locally, you must have a supported Python\* 3
software release. The minimum required version of Python is 3.11.

Build the docs with `make` from the root directory:

- `make build` will build all documentation to the HTML format.  You can find
  the output in the `out` directory.

- `make lint` will check both documentation and supporting code.  This will
  also be run in CI. You must run it before submitting the code.

## Documentation Conventions

### Format

Use Unix\* line endings and UTF-8 text. The `doc8` linter will enforce
this as well as line lengths to allow easier code review.

Common Errors:

- `D001 Line too long` - wrap the text to 79 columns.  Most editors can
  automate this task - examples:

  - In VSCode, the [Rewrap for VSCode](https://stkb.github.io/Rewrap/), can
    perform this action on a selection.
  - In vim, `gq` or `gw` from normal mode, or with a selection

  This length limit doesn't apply to long URLs or unbroken by whitespace,
  literal text blocks, or rST directives.

- `D002 Trailing whitespace` - There is trailing whitespace at the end of a
  line. To see these invisible characters in a text editor:

  - In VSCode, go to `View -> Appearance -> Render Whitespace`
  - In vim, use the command `match ErrorMsg '\s\+$'` to highlight EOL
    whitespace as an error

- `D003 Tabulation` - Tab characters are used to indent, which can cause
  undesirable behavior. Replace the tabs with space characters.  See the D002
  example for how to view invisible characters.

- `D004 Found literal carriage return` - file has DOS format line endings
  (CRLF), when Unix line endings  (LF) are required.  This can frequently be
  changed in an editor setting or by using tools like `dos2unix`. Git can also
  convert these automatically via the `.gitattributes` file.

### Spell check

The spelling checker for Sphinx tool is enabled, and can be run with `make
sphinx-spelling`.

If a valid human language word or phrase needs to be added, add it to
`dict.txt` in alphabetical order.

Sometimes, words that include "curly" or "smart" quotes in contractions will be
marked as invalid - for example, if you get a spelling error for a word like
`doesn`, delete the quote character and replace with a normal, non-curly quote.

If the word is not human language - for example code, variable names, command
line tool names, and so on you should wrap them with the rST code quote double
backticks:

    ``variable_name``
    ``kubectl``

### Link checking

The link checker for Sphinx tool is enabled, and can be run with `make
sphinx-linkcheck`.

This will check for dead or bad links, and can sometimes fail for external links
when the item being linked to moves or is changed, in which case the link
must be fixed or replaced.

For example or other invalid URLs that should not be checked for validity, wrap
them with the rST code quote double backticks:

    ``https://placeholder_link.<domain>``

Sometimes linkcheck can fail if an external webserver is down, so there may be
intermittent failures of this tool. Check if the site is down in a conventional
web browser when this happens.

Certain web servers will disallow linkcheck to access them, and return a `403`
or similar errors. In this case, you may want to add the web address to the
`linkcheck_ignore` list given in the `conf.py`.

### Markdownlint

To ensure the quality and consistency of our documentation, we include a markdown
linter check as part of our continuous integration process. This step will help us
automatically identify andcorrect common markdown issues, ensuring we adhere
to best practices.

Requirements

Before running the markdown linting checks, make sure you have the following installed:

- Node.js (version 12 or higher)
- npm (Node package manager)
- markdownlint-cli2

You can install markdownlint-cli2 via npm with the following command:

    npm install -g markdownlint-cli2

### References

For references, avoid defining references manually because
[autosectionlabel](https://www.sphinx-doc.org/en/master/usage/extensions/autosectionlabel.html)
is enabled, and automatically creates `doc` references.

To list all references and labels, run `make build` once, then run `make
listrefs`.

The first column is a list of labels in the site, and will contain both
documents and sub-headings within those documents. It's a long list, so piping
it to grep with a part of the path or heading text can be useful to find the
ref you're looking for.

## Common Config

You can find configuration across all Sphinx invocations under docconf.

`docconf` is a Python module that is included in the virtualenv, so if you
modify it, you must delete and recreate the virtualenv `make clean-all` will
delete, and targets that used the virtualenv will recreate it.

## License

The Edge Orchestration documentation is licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
