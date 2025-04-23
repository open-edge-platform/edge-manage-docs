Data Flow
=========

The data flow in Edge Infrastructure Manager can be broken down into
declarative and discovery operations. This two fold nature of the APIs shows
that the controlled resources are a mix of declarative and discovered
abstractions. Not all the managed resources are modeled using this approach and
there are resources represented using a pure declarative model that provides
top-down policy.

The following image summarizes at high level the data flow in Edge Infrastructure
Manager in terms of the main components (see :doc:`hl_architecture`) and the
interactions between them. The following sections will provide a more detailed
description of the data flows.

.. figure:: ./images/eim_flow.drawio.svg
   :alt: High-Level data flow in Edge Infrastructure Manager
   :align: center

Reconciliation of User Intents
---------------------------------

1. **Stage 1: Input**: - Resource requests submitted via APIs or command-line
   tools by the user. User intents are conveyed through the resources using a
   desired state field.

2. **Stage 2: Processing and storage**: - Data are sent and preprocessed in
   Inventory. An event is generated and the listening clients are getting
   notified.

3. **Stage 3: Reconciling upon the received stimulus**: - Resource Managers are
   listening to the Inventory events and are reconciling the user intents with
   the actual state of the infrastructure.

4. **Stage 4: Execution**: - Resource Managers are sending commands to the Edge
   Node agents to perform the actual work on the edge infrastructure.  On
   success the current state is updated in Inventory to match the desired state
   which stops future reconciliation of this resource.

On errors new attempts might be re-scheduled by the Resource Manager if the
errors are recoverable. Otherwise, the system is left in an error state and the
requests will not be further reconciled until the user does not intervene.

Top-down Requests
------------------

1. **Stage 1: Input**: - Resource requests submitted via APIs or command-line
   tools by the user.

2. **Stage 2: Processing and storage**: - Data are sent and preprocessed in
   Inventory. An event is generated and the listening clients are getting
   notified.

3. **Stage 3: External notification and consumption**: - Other Resource
   Managers upon external stimulus might consume this data and act accordingly.

Bottom-up Discovery
--------------------

1. **Stage 1: Input**: - Resource Manager pushes data “Bottom Up” from the Edge
   into Inventory.

2. **Stage 2: Processing and storage**: - Data are sent and preprocessed in
   Inventory. An event is generated and the listening clients are getting
   notified.

3. **Stage 3: Reconciling upon the received stimulus**: - Resource Managers are
   listening to the Inventory events and might react accordingly

4. **Stage 4: User notification***: - Users are notified of the changes and the
   new data that have been learned from the infrastructure;
