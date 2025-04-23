#!/usr/bin/env python3

# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

"""
role_docs.py
converts role config files into docs
"""

import csv
import json
import re
import os
import argparse

import jinja2
from ruamel.yaml import YAML

# globals
all_groups = {}
all_roles = {}
details = {}

# common yaml parser
yaml = YAML(typ="safe")


def parse_gotpl_yaml(in_filename):
    """
    Parse a yaml file, removing any go template tags
    """

    clean = ""

    # read input file, but strip golang template tags
    with open(in_filename, "r", encoding="utf-8") as infile:
        lines = infile.readlines()
        for line in lines:
            cl = re.sub("{{.*}}", "", line)
            if cl:  # skip blank lines
                clean += cl

    return yaml.load(clean)


def add_keycloak_realm_master_groups(in_groups):
    """
    Collect all groups/roles from Keycloak config into global vars
    """
    # input is json, but the keycloak config has trailing commas, so use yaml
    # loader which handles them
    rmj = yaml.load(in_groups)

    for group in rmj["groups"]:

        gname = group["name"]

        # filter out internal-only m2m groups by name
        if re.match(".*m2m|.*M2M", gname):
            pass

        else:
            if "realmRoles" in group:

                groles = group["realmRoles"]
                all_groups[gname] = groles

                # add all new roles to all_roles dict
                for role in groles:
                    if re.match(".*m2m|.*M2M", role):
                        pass
                    if role not in list(all_roles):
                        all_roles[role] = [gname]
                    else:
                        all_roles[role].append(gname)


def add_ktc_groups(in_group):
    """
    Collect all groups/roles from KTC config into global vars
    """

    groups = json.loads(in_group)

    for group, roles in groups.items():
        # filter out internal-only m2m groups by name
        if re.match(".*m2m|.*M2M", group):
            pass

        else:
            all_groups[group] = roles

            # add all new roles to all_roles dict
            for role in roles:
                if re.match(".*m2m|.*M2M", role):
                    pass
                if role not in list(all_roles):
                    all_roles[role] = [group]
                else:
                    all_roles[role].append(group)


def jinja_environment(templates_dir):
    """
    create jinja environment for .rst generation
    """

    env = jinja2.Environment(
        autoescape=False,  # otherwise will HTML escape
        loader=jinja2.FileSystemLoader(templates_dir),
        lstrip_blocks=True,
        trim_blocks=True,
        undefined=jinja2.StrictUndefined,
    )

    def underline(value, replacement='"'):
        """
        used for underlining w/same width text
        replace every character in input w/replacement character
        """
        return re.sub(".", replacement, value)

    def reffmt(value, replacement=""):
        """
        make into a sphinx ref compatible string by removing every non-word
        character in input, and converting to lowercase
        """
        return re.sub(r"\W", replacement, value).lower()

    env.filters["underline"] = underline
    env.filters["reffmt"] = reffmt

    return env


def jinja_save(jenv, data, template, outpath):
    """
    Create output file from jinja template
    """

    jtpl = jenv.get_template(template)

    with open(outpath, "w", encoding="utf-8") as output_file:
        output_file.write(jtpl.render(data))


def sort_prio(sortstring):
    """
    Sort helper to put simpler role names earlier, by prefixing them with
    a digit for order.
    """
    if "-" not in sortstring:
        return "0" + sortstring
    if "/" not in sortstring and "<" not in sortstring:
        return "1" + sortstring
    if "<" not in sortstring:
        return "2" + sortstring
    return "3" + sortstring


def csv_write(columns, rows, outpath):
    """
    Takes two dicts where keys of one is value of other, make a CSV file with
    X's in rows where column matches.
    """
    with open(outpath, "w", encoding="utf-8") as csvfile:

        cw = csv.writer(csvfile, quoting=csv.QUOTE_NONNUMERIC, lineterminator="\n")

        # sorted list of all columns, with space for row heading
        cols = sorted(columns, key=lambda a: sort_prio(a[1]))

        # write header row, space for row headers
        cw.writerow(["Role"] + cols)

        # iterate over all rows
        for rrow, rcol in sorted(rows.items(), key=lambda a: sort_prio(a[0])):

            # create list of X's to add after row, and index
            exes = []

            # of times row is used
            rcount = 0

            # iterate over all columns
            for col in cols:

                # if this column is in rows
                if col in rcol:
                    exes.append("X")
                    rcount += 1
                else:
                    exes.append(" ")

            cw.writerow([rrow] + exes)


if __name__ == "__main__":

    GENERATE_PATH = "generate"

    # parse args
    ap = argparse.ArgumentParser()
    ap.add_argument("k_yaml")
    ap.add_argument("ktc_yaml")
    ap.add_argument("groups_rst")
    ap.add_argument("groups_csv")
    args = ap.parse_args()

    # parse platform keycloak config
    krm = parse_gotpl_yaml(args.k_yaml)

    add_keycloak_realm_master_groups(
        krm["keycloakConfigCli"]["configuration"]["realm-master.json"]
    )

    # parse keycloak tenant controller config
    ktcv = parse_gotpl_yaml(args.ktc_yaml)

    # add_ktc_groups(ktcv["keycloak_si_groups"]) - not currently used
    add_ktc_groups(ktcv["keycloak_org_groups"])
    add_ktc_groups(ktcv["keycloak_proj_groups"])

    # extra detail about roles/groups to add
    with open(
        GENERATE_PATH + "/sources/iam_details.yaml", "r", encoding="utf-8"
    ) as nfile:
        details = yaml.load(nfile)

    # create jinja environment
    jinja_env = jinja_environment(GENERATE_PATH + "/templates")

    # binding data to variables for use in jinja
    jinja_data = {
        "groups": all_groups,
        "roles": dict(sorted(all_roles.items(), key=lambda a: sort_prio(a[0]))),
        "details": details,
        "csv_out_path": os.path.basename(args.groups_csv),  # assume in same dir as rst
        "autogen_warning": ".. AUTOGENERATED, DO NOT EDIT",  # header
    }

    jinja_save(
        jinja_env,
        jinja_data,
        "shared_iam_groups.rst.j2",
        args.groups_rst,
    )

    csv_write(all_groups, all_roles, args.groups_csv)
