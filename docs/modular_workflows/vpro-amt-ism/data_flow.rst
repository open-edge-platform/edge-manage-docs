Data Flow
=========

There are two primary flows of data in the modular vPro workflow:

1. **Top-down Requests**: These are driven by the user and are passed through
   the API or command line interface (CLI) through to the edge node.
2. **Bottom-up Discovery**: These are driven from the edge node and are passed
   to the orchestrator services and are used to report changes on the edge node
   on a periodic basis.

The following diagram outlines how information flows in the modular vPro workflow
between the agents and services at different stages:

.. note::

   AMT/vPro has two modes for configuring edge node devices and activating them,
   Client Control Mode (CCM) and Admin Control Mode (ACM). The flow below outlines
   how the modular vPro workflow activates an edge node device when using ACM.
   For activating device in CCM, there is no need to include the creation of the
   Domain Profile. For more details on activating edge node devices with CCM profiles
   please see the `CCM documentation <https://device-management-toolkit.github.io/docs/2.31/GetStarted/Cloud/createProfileCCM/>`_
   in the Device Management Toolkit (DMT) documentation and for ACM activation, please
   see the `ACM documentation <https://device-management-toolkit.github.io/docs/2.31/GetStarted/Cloud/createProfileACM/>`_.

.. mermaid::

   sequenceDiagram
   %%{wrap}%%
   autonumber

   participant us as User
   participant cli as CLI
   box LightCyan Orchestrator
   participant api as API
   participant inv as Inventory
   participant dm as Device Management Manager
   participant rps as Remote Provisioning Server (RPS)
   end
   box LightGreen Edge Node
   participant pma as Platform Manageability Agent (PMA)
   participant rpc as Remote Provisioning Client (RPC)
   end

   alt subscribe and listen for edge node creation events
       dm->>dm: Edge Node creation event received
       dm->>rps: Create CIRA configuration
       dm->>rps: Create CCM profile
       dm->>rps: Create ACM profile
   end
   note over pma: User updates edge node BIOS with DNS Suffix and MEBx Password
   us->>cli: Register the edge node
   note over cli: If no mode is specified by the user, CCM will be collected by default
   cli->>api: Register host with node serial number/hardware UUID as well as activation mode
   api->>inv: Create host and persist the host details in the inventory database
   inv->>api: Return response from host creation in inventory database
   api->>cli: Return response from host registration
   cli->>us: Return response from host registration
   note over pma: Periodically calls API to get activation request
   us->>cli: Activate AMT request for edge node
   cli->>api: Activate AMT request for edge node
   api->>inv: Set the Desired State for AMT for edge node to PROVISIONED
   inv->>api: Return response from activate AMT
   api->>cli: Return response from activate AMT
   cli->>us: Return response from activate AMT
   pma->>dm: Get AMT Activation Request
   dm->>inv: Query host to retrieve Activate AMT request from user
   inv->>dm: Return response from activate AMT with desired state
   dm->>pma: Return response with profile name and details for AMT activation
   pma->>rpc: Trigger activation command using rpc binary and received profile
   rpc->>pma: Return activation command result
   pma->>dm: Report AMT activation status
   note over us: After device activation is completed, user can invoke AMT out of band operations

Top-down Requests
-----------------

1. **Stage 1: Input**: User submits device onboarding/power on/power off requests via
   the CLI to the device management manager API.

2. **Stage 2: Processing and storage**: Data from user requests are sent to the inventory
   service and is processed and stored. An event is generated for the request and
   the modular vPro services are notified about the request.

3. **Stage 3: Service notifcation and consumption**: Services, during reconile stages, will
   detect the event created in the inventory service and act on the request as required.

Bottom-up Discovery
-------------------

1. **Stage 1: Input**: Edge Node Agents push HW data from node up to manager services, which
   process and sends them to the inventory service.

2. **Stage 2: Processing and storage**: The inventory service processes the information from
   the agents, stores it and generates new events for the modular vPro services.

3. **Stage 3: Reconciliation**: The manager services (Host Manager, Device Management Manager, etc.)
   detect the events from the inventory service and perform reconciliation between the event
   data and the current data.
