Kubernetes* Autoscaling Support
=================================

Kubernetes Cluster Autoscaler
-----------------------------

Kubernetes Cluster Autoscaler (CAS) is a tool that automatically scales Kubernetes cluster horizontally when one of the following conditions is true:

- There are pods that failed to schedule in the cluster because of insufficient resources.
- There are nodes in the cluster that have been underutilized for an extended period of time and their pods can be placed on other existing nodes.

You would need to add the following to the deployment to support autoscaling:

- **Terraform configuration**: this adds the required IAM policy for CAS to manage auto-scaling groups.
- **edge-manageability-framework**: An ArgoCD application called cluster-autoscaler that can use a Helm chart to deploy required resources such as the CAS pod and service account to the cluster.

To enable CAS on the cluster, add one profile to the cluster config under ``orch-config/cluster/your-cluster.yaml``:

.. code-block:: yaml

    - profiles/enable-autoscaling.yaml

This profile enables the cluster-autoscaler ArgoCD application.

Currently, Intel uses the default setting for CAS; we will revisit settings when we need to make finer tuning to it.

Vertical Pod Autoscaler
-----------------------

The vertical pod autoscaler (VPA) sets pod resources (for example, the CPU and memory) automatically based on usage.

VPA can down-scale pods that are over-requesting resources, and up-scale pods that are under-requesting resources based on their usage over time.

To enable VPA on the cluster, add one profile to the cluster config under ``orch-config/cluster/your-cluster.yaml``:

.. code-block:: yaml

    - profiles/enable-autoscaling.yaml

This profile enables the vertical-pod-autoscaler ArgoCD application.

To use VPA for your application or service, you need to:

- Ensure there are more than one replica for your service to ensure the service is
  available when VPA is updating the service. (See the following note)

- Create a VerticalPodAutoscaler resource, so that VPA knows which resource needs
  to be monitored and the minimum and maximum quantities for the resource.

.. note::

  VPA requires restarting of pods using the rolling upgrade policy. You need to review
  the Pod Disruption Budgets (PDB), pod anti-affinity, and other rules to do rolling upgrades.

.. tip::

  Starting from Kubernetes 1.27, you can enable ``InPlacePodVerticalScaling`` feature gate. This allows VPA to update the resource requests of a pod without evicting it.

See `examples of VerticalPodAutoscaler <https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler>`_.

Horizontal Pod Autoscaler (Built-in Feature)
--------------------------------------------

The horizontal pod autoscaler (HPA) is a built-in Kubernetes feature. You can enable HPA for your service by using the HorizontalPodAutoscaler resource, for example:

.. code-block:: yaml

    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: my-service
      namespace: orch-platform
    spec:
      maxReplicas: 5
      metrics:
      - resource:
          name: cpu
          target:
            averageUtilization: 70
            type: Utilization
        type: Resource
      minReplicas: 1
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: my-service

External Operators Managing the Amazon Elastic Kubernetes Service (Amazon EKS\*) Cluster with ``provision.sh``
--------------------------------------------------------------------------------------------------------------

The latest version of the ``provision.sh`` script introduces new flags that enable users to adjust the minimum (``--min-nodes``),
desired (``--desired-nodes``), and maximum (``--max-nodes``) number of nodes for the Amazon EKS cluster.

These enhancements facilitate the use of the cluster autoscaling feature.

To configure the autoscaling parameters using the script:

#. Set the minimum number of nodes with the ``--min-nodes`` flag.
#. Set the desired number of nodes with the ``--desired-nodes`` flag.
#. Set the maximum number of nodes with the ``--max-nodes`` flag.

For example, to configure the cluster with a minimum of 3 nodes, a desired state of 3 nodes, and a maximum of 10 nodes, run the script with the following options:

.. code-block:: bash

    ./provision.sh --min-nodes 3 --desired-nodes 3 --max-nodes 10 ...

These settings allow you to customize the scaling behavior of your Amazon EKS cluster to better align with your specific application needs and workload demands.
