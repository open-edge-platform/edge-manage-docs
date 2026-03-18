Headlamp Package
=============================================================

The Headlamp cluster extension is a diagnostic tool that may be deployed to the edge.
Headlamp allows you to see the full set of Kubernetes resources that are deployed to the edge it is deployed
on. It may also be used to deploy applications directly, though doing so will cause those applications to not be managed
by the Edge Orchestrator and is therefore not recommended.

Documentation for Headlamp itself may be found at
`Headlamp <https://headlamp.dev/docs/latest/>`_.

.. note::
   The dashboard is deployed to and runs directly on the Edge Node.
   The Edge Orchestrator provides a link that can tunnel your web browser directly to the dashboard once it is deployed.

Deploying the Dashboard
-------------------------------------------------------------

Use the `Extensions` tab of the `Deployment Packages` page to select the Headlamp extension and deploy it to
the edge(s) of your choosing.

No configuration options are required.

For more information, see
:doc:`/user_guide/package_software/extensions/deploy_extension_package`.

Accessing the Dashboard
--------------------------------------------------------------

Once deployed, dashboard may be accessed as follows:

#. Navigate to the Deployments page
#. Select the `Headlamp` deployment that you created
#. There will be a list of clusters. Pick the cluster that you want to use.
#. On the cluster page, expand the set of Workloads and Endpoints. You will see one endpoint marked `headlamp`.
   This endpoint will have a clickable port 443. Click that port.
#. The dashboard will open in your browser.

.. note::
   The browser's Application Service Proxy (ASP) only allows one application to be tunneled to at a time.
   If you have used ASP to tunnel to another application, and then try to tunnel to the dashboard, your tunnel
   to the other application will not longer be usable.

Authenticating to the Dashboard
-------------------------------------------------------------

The dashboard requires a token for authentication.
The resources to support the token are automatically created when the dashboard is installed to an edge node, but you must create and retrieve a token using the
`kubectl` command line tool. Follow instructions at :doc:`/user_guide/set_up_edge_infra/clusters/accessing_clusters`.

Once the kubeconfig file is downloaded, execute the following:

.. code:: bash

    kubectl create token headlamp -n headlamp

The above will print out a long string. This is your token. Copy it to your clipboard, save it in a safe place, and you
may use it to authenticate to the dashboard. Do not share the token with anyone else.
