Retrieve Deployed Containers
======================================================

In certain scenarios, you may need to restore or retrieve the deployed container.

To retrieve the deployed cluster containers, do the following:

1. Start the Edge Orchestrator installation with this command:

   .. code-block::

      ./start-orchestrator-installation

#. Enter the same information as used during the initial setup.

#. Start the tunnel with this command:

   .. code-block::

      ./start-tunnel.sh

#. Update the Kubernetes configuration using the following command:

   .. code-block::

      aws eks --region us-west-2 update-kubeconfig --name "demo1"

#. Export the Kubernetes configuration file using the following command:

   .. code-block::

      export KUBECONFIG=/root/.kube/config

#. Retrieve deployed container details using the following command:

   .. code-block::

      kubectl get pods -A

