# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

"""docconf_simple.py - common configuration for simple docs sites"""

# this file contains common configuration
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# pylint - sphinx doesn't use UPPER_CASE naming style for constants
# pylint: disable=invalid-name

import os
import pathlib
from docconf import docconf

###### Common variables from docconf ######

project = "Open Edge Platform Documentation"
version = "1.1"
release = docconf.release
author = docconf.author
copyright = docconf.copyright  # pylint: disable=redefined-builtin

warning_is_error = docconf.warning_is_error

extensions = docconf.extensions

templates_path = docconf.templates_path
exclude_patterns = docconf.exclude_patterns

# Allow RestructuredText and Markdown
source_suffix = [".rst", ".md"]
source_encoding = docconf.source_encoding

language = docconf.language
# Change default top-level doc
master_doc = "toc"
rst_epilog = docconf.rst_epilog

autosectionlabel_prefix_document = docconf.autosectionlabel_prefix_document
autosectionlabel_maxdepth = docconf.autosectionlabel_maxdepth

linkcheck_ignore = docconf.linkcheck_ignore
linkcheck_request_headers = docconf.linkcheck_request_headers
linkcheck_timeout = docconf.linkcheck_timeout
linkcheck_retries = docconf.linkcheck_retries

spelling_word_list_filename = docconf.spelling_word_list_filename
spelling_filters = docconf.spelling_filters

html_theme = docconf.html_theme
html_title = "Open Edge Platform Documentation"

html_baseurl = docconf.html_baseurl
html_favicon = docconf.html_favicon
html_static_path = ["_static"]
html_show_sourcelink = docconf.html_show_sourcelink
html_show_sphinx = docconf.html_show_sphinx

html_context = docconf.html_context
html_theme_options = docconf.html_theme_options
html_theme_options["logo"]["text"] = "Open Edge Platform"

# Add extra extensions
extensions_append = [
    #    "sphinxcontrib.images",
    "sphinxcontrib.video",
    "sphinxcontrib.contentui",
    "sphinx_tabs.tabs",
    "myst_parser",
    "swagger_plugin_for_sphinx",
]
extensions.extend(extensions_append)

# Configure myst_parser
myst_heading_anchors = 5
suppress_warnings = ["myst.xref_missing"]
myst_enable_extensions = [
    "attrs_inline",
    "attrs_block",
    "substitution",
    "colon_fence",
]

# Allow appending to linkcheck_ignore
linkcheck_ignore_append = []
linkcheck_ignore_append_file = str(pathlib.Path.cwd()) + "/linkcheck_ignore_append.txt"
if os.path.isfile(linkcheck_ignore_append_file):
    with open(linkcheck_ignore_append_file) as file:
        linkcheck_ignore_append = [line.strip() for line in file if line.strip()]

# Allow appending to substitutions
substitutions_file = str(pathlib.Path.cwd()) + "/substitutions.txt"
substitutions_append_file = str(pathlib.Path.cwd()) + "/substitutions_append.txt"
d_sub = {}
myst_substitutions = {}
substitutions_ordered = []
# Read append last to ensure redefined substitutions override existing
with open(substitutions_file) as file:
    substitutions_ordered = [line.strip() for line in file if line.strip()]
if os.path.isfile(substitutions_append_file):
    with open(substitutions_append_file) as file:
        substitutions_ordered.extend([line.strip() for line in file if line.strip()])
for sub in substitutions_ordered:
    try:
        key = sub.split("|")[1]
        value = sub.split("|")[2]
        replace = sub.split("::")[1]
        d_sub[key] = value.strip()
        myst_substitutions[key] = replace.strip()
    except Exception:
        pass
# Overwrite substitutions file with ordered substitutions
with open(substitutions_file, "w") as file:
    for key, value in d_sub.items():
        file.write(f".. |{key}| {value}\n")
