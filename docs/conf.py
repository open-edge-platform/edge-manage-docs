# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

"""Edge Orchestrator Documentation"""

import os

# import common documentation config
if os.environ.get("SIMPLE_MODE") == "true":
    from docconf import docconf_simple as docconf
else:
    from docconf.docconf import version, release, project, author, copyright, warning_is_error, extensions, templates_path, exclude_patterns, source_suffix, source_encoding, language, master_doc, rst_epilog, myst_substitutions, autosectionlabel_prefix_document, autosectionlabel_maxdepth, linkcheck_ignore, linkcheck_request_headers, linkcheck_timeout, linkcheck_retries, linkcheck_exclude_documents, spelling_word_list_filename, spelling_filters, spelling_exclude_patterns, html_theme, html_baseurl, html_favicon, html_static_path, html_show_sourcelink, html_show_sphinx, html_context, html_theme_options, myst_heading_anchors, suppress_warnings, myst_enable_extensions

# sphinx doesn't use UPPER_CASE naming style for constants
# pylint: disable=invalid-name


###### Common variables from docconf ######
#
# You generally should *not* override or replace the values below -  instead
# make changes to the docconf module - see the repo README for further
# instructions.

## Use direct imports for local builds
## (see import above)

## Remove all references to 'docconf.' prefix for local builds
source_suffix = source_suffix
source_encoding = source_encoding
language = language
master_doc = master_doc
rst_epilog = rst_epilog
myst_substitutions = myst_substitutions
autosectionlabel_prefix_document = autosectionlabel_prefix_document
autosectionlabel_maxdepth = autosectionlabel_maxdepth
linkcheck_ignore = linkcheck_ignore
linkcheck_request_headers = linkcheck_request_headers
linkcheck_timeout = linkcheck_timeout
linkcheck_retries = linkcheck_retries
linkcheck_exclude_documents = linkcheck_exclude_documents
spelling_word_list_filename = spelling_word_list_filename
spelling_filters = spelling_filters
spelling_exclude_patterns = spelling_exclude_patterns
html_theme = html_theme
html_baseurl = html_baseurl
html_favicon = html_favicon
html_static_path = html_static_path
html_show_sourcelink = html_show_sourcelink
html_show_sphinx = html_show_sphinx
html_context = html_context
html_theme_options = html_theme_options
myst_heading_anchors = myst_heading_anchors
suppress_warnings = suppress_warnings
myst_enable_extensions = myst_enable_extensions
