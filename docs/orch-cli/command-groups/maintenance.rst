.. SPDX-FileCopyrightText: (C) 2026 Intel Corporation
.. SPDX-License-Identifier: Apache-2.0

Maintenance & Operations
========================

Manage OS updates, scheduling, AMT (Active Management Technology), and host lifecycle operations.

OS Update Profiles
------------------

**Create OS update policy (Ubuntu):**

.. code-block:: bash

   orch-cli create osupdatepolicy <POLICY_NAME> ./path/to/osupdatepolicy.yaml

**Create OS update policy (EMT):**

.. code-block:: bash

   orch-cli create osupdatepolicy <POLICY_NAME> ./path/to/osupdatepolicy-emt.yaml

**List OS update policies:**

.. code-block:: bash

   orch-cli list osupdatepolicies

**Get OS update policy:**

.. code-block:: bash

   orch-cli get osupdatepolicy <POLICY_ID>

**Set OS update policy for host:**

.. code-block:: bash

   orch-cli set host <HOST_ID> --osupdatepolicy <POLICY_ID>

**Delete OS update policy:**

.. code-block:: bash

   orch-cli delete osupdateprofile <POLICY_ID>

Scheduling
----------

**Scheduling Syntax Notes:**

- ``--day-of-week``: Day numbers 0-6 (0=Sunday); use ranges (1-3) or lists (1,3,5)
- ``--day-of-month``: Day numbers 1-31; use ranges (1-3) or lists (1,15,28)
- ``--months``: Month numbers 1-12; use ranges (2-4) or lists (1,6,12)
- ``--frequency-type``: Either ``repeated`` or ``single``
- ``--maintenance-type``: Either ``maintenance`` or ``osupdate``

**Create maintenance schedule (weekly, repeated):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type repeated \
     --maintenance-type maintenance \
     --target <HOST_ID> \
     --frequency weekly \
     --start-time "10:10" \
     --day-of-week "1-3,5" \
     --months "2,4,7-8" \
     --duration 3600

**Create maintenance schedule (monthly, repeated):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type repeated \
     --maintenance-type maintenance \
     --target <HOST_ID> \
     --frequency monthly \
     --start-time "10:10" \
     --day-of-month "1-3,14" \
     --months "2,4,7-8" \
     --duration 3600

**Create maintenance schedule (single occurrence):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type single \
     --maintenance-type maintenance \
     --target <HOST_ID> \
     --start-time "2026-12-01 20:20" \
     --end-time "2027-12-01 20:20"

**Create OS update schedule (weekly, repeated):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type repeated \
     --maintenance-type osupdate \
     --target <HOST_ID> \
     --frequency weekly \
     --start-time "10:10" \
     --day-of-week "1-3,5" \
     --months "2,4,7-8" \
     --duration 3600

**Create OS update schedule (monthly, repeated):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type repeated \
     --maintenance-type osupdate \
     --target <HOST_ID> \
     --frequency monthly \
     --start-time "10:10" \
     --day-of-month "1-3,14" \
     --months "2,4,7-8" \
     --duration 3600

**Create OS update schedule (single occurrence):**

.. code-block:: bash

   orch-cli create schedules <SCHEDULE_NAME> \
     --timezone GMT \
     --frequency-type single \
     --maintenance-type osupdate \
     --target <HOST_ID> \
     --start-time "2026-12-01 20:20" \
     --end-time "2027-12-01 20:20"

**List schedules:**

.. code-block:: bash

   orch-cli list schedules

**Get schedule details:**

.. code-block:: bash

   orch-cli get schedule <SCHEDULE_ID>

**Delete schedule:**

.. code-block:: bash

   orch-cli delete schedule <SCHEDULE_ID>

OS Update Operations
--------------------

**One-click OS update (uses existing policy):**

.. code-block:: bash

   orch-cli update-os host <HOST_ID>

**One-click OS update with new policy:**

.. code-block:: bash

   orch-cli update-os host <HOST_ID> --osupdatepolicy <POLICY_ID>

**Generate CSV for bulk OS updates:**

.. code-block:: bash

   orch-cli update-os host --generate-csv > bulk-update.csv

**Bulk OS update from CSV:**

.. code-block:: bash

   orch-cli update-os host --import-from-csv bulk-update.csv

**List OS update runs:**

.. code-block:: bash

   orch-cli list osupdaterun

**Get OS update run details:**

.. code-block:: bash

   orch-cli get osupdaterun <RUN_ID>

**Delete OS update run:**

.. code-block:: bash

   orch-cli delete osupdaterun <RUN_ID>

Active Management Technology (AMT)
----------------------------------

**Create AMT profile:**

.. code-block:: bash

   orch-cli create amtprofile <PROFILE_NAME> \
     --cert ./path/to/cert.pfx \
     --cert-pass <PASSWORD> \
     --cert-format pkcs12 \
     --domain-suffix example.com

**List AMT profiles:**

.. code-block:: bash

   orch-cli list amtprofiles

**Get AMT profile details:**

.. code-block:: bash

   orch-cli get amtprofile <PROFILE_NAME>

**Enable AMT on host:**

.. code-block:: bash

   orch-cli set host <HOST_ID> --amt-state provisioned

**Check AMT status:**

.. code-block:: bash

   orch-cli get host <HOST_ID>

**Disable AMT on host:**

.. code-block:: bash

   orch-cli set host <HOST_ID> --amt-state unprovisioned

**Generate CSV for bulk AMT enable/disable:**

.. code-block:: bash

   orch-cli set host --generate-csv > amt-bulk.csv

**Preview bulk AMT changes:**

.. code-block:: bash

   orch-cli set host --import-from-csv amt-bulk.csv --dry-run

**Apply bulk AMT changes:**

.. code-block:: bash

   orch-cli set host --import-from-csv amt-bulk.csv

**Power cycle via AMT (off):**

.. code-block:: bash

   orch-cli set host <HOST_ID> --power off

**Power cycle via AMT (on):**

.. code-block:: bash

   orch-cli set host <HOST_ID> --power on

**Delete AMT profile:**

.. code-block:: bash

   orch-cli delete amtprofile <PROFILE_NAME>

Quick OS Updates
----------------

**Update single host now:**

.. code-block:: bash

   orch-cli update-os host <HOST_ID>

**Update host with specific policy:**

.. code-block:: bash

   orch-cli update-os host <HOST_ID> --osupdatepolicy <POLICY_ID>

**Generate CSV for bulk OS updates:**

.. code-block:: bash

   orch-cli update-os host --generate-csv > update-hosts.csv

**Preview bulk OS updates (dry-run):**

.. code-block:: bash

   orch-cli update-os host --import-from-csv update-hosts.csv --dry-run

**Apply bulk OS updates:**

.. code-block:: bash

   orch-cli update-os host --import-from-csv update-hosts.csv

**List OS update runs:**

.. code-block:: bash

   orch-cli list osupdaterun

**Get update run details:**

.. code-block:: bash

   orch-cli get osupdaterun <RUN_ID>

See Also
--------

- :doc:`infra` — Infrastructure and host management
- :doc:`clusters` — Cluster management
- :doc:`applications` — Application deployments
- :doc:`iam` — User and organization management
