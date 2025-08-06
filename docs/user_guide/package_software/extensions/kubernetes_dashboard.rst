Kubernetes Dashboard Package
=============================================================

The Kubernetes Dashboard cluster extension is a diagnostic tool that may be deployed to the edge.
The Kubernetes Dashboard allows you to see the full set of Kubernetes resources that are deployed to the edge it is deployed
on. It may also be used to deploy applications directly, though doing so will cause those applications to not be managed
by the Edge Orchestrator and is therefore not recommended.

Documentation for the Kubernetes Dashboard itself may be found at
`Kubernetes Dashboard <https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/>`_.

.. note::
   The Kubernetes Dashboard is deployed to and runs directly on the Edge Node.
   The Edge Orchestrator provides a link that can tunnel your web browser directly to the dashboard once it is deployed.

Deploying the Kubernetes Dashboard
-------------------------------------------------------------

Use the `Extensions` tab of the `Deployment Packages` page to select the Kubernetes Dashboard extension and deploy it to
the edge(s) of your choosing.

No configuration options are required.

For more information, see
:doc:`/user_guide/package_software/extensions/deploy_extension_package`.

Accessing the Kubernetes Dashboard
--------------------------------------------------------------

Once deployed, the Kubernetes Dashboard may be accessed as follows:

#. Navigate to the Deployments page
#. Select the `Kubernetes Dashboard` deployment that you created
#. There will be a list of clusters. Pick the cluster that you want to use.
#. On the cluster page, expand the set of Workloads and Endpoints. You will see an endpoint marked `kong-proxy`.
   This endpoint will have a clickable port 443. Click that port.
#. The Kubernetes dashboard will open in your browser.

.. note::
   The browser's Application Service Proxy (ASP) only allows one application to be tunneled to at a time.
   If you have used ASP to tunnel to another application, and then try to tunnel to the Kubernetes Dashboard, your tunnel
   to the other application will not longer be usable.

Authenticating to the Kubernetes Dashboard
-------------------------------------------------------------

The Kubernetes Dashboard requires a token for authentication.
The token is automatically created when the dashboard is installed to an edge node, but you must retrieve it using the
`kubectl` command line tool. Follow instructions at :doc:`/user_guide/set_up_edge_infra/clusters/accessing_clusters`.

Once the kubeconfig file is downloaded, execute the following:

.. code:: bash

    kubectl -n kubernetes-dashboard get secrets admin-user-token -o json | jq -r ".data.token" | base64 -d && echo

The above will print out a long string. This is your token. Copy it to your clipboard, save it in a safe place, and you
may use it to authenticate to the Kubernetes Dashboard. Do not share the token with anyone else.
