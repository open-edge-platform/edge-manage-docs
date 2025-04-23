Amazon\* EKS Node Issues
=========================

This guide describes how to debug an Amazon Elastic Kubernetes Service\* (Amazon\* EKS) node that is not in the proper
running shape.

Symptom
^^^^^^^
There are a few typical issues we will notice when an Amazon EKS node is not in a
good shape:

- ``kubectl get nodes`` shows **NotReady**
- Some pods are stuck in bad states, and those pods happen to be scheduled on
  the same node
- ``kubectl get pods -o wide`` can be used to tell which node a pod is
  scheduled on

Cause
^^^^^

The cause needs to be determined by following a few steps.

.. note::
   Most of the steps on this page require AWS\* console access and full Kubernetes\* platform
   access to the Amazon EKS cluster. This should only be done by experienced
   SRE / DevOps engineers who have been granted those permissions.

1. Check if there is abnormal resource usage, then further dig into which
   process/container is not behaving correctly:

   - Log in to the Amazon EKS node from the AWS console
   - Check disk usage: ``df -h``
   - Check memory usage: ``free -h``
   - Check CPU and memory usage: ``top``

   From ``kubectl``:

   - ``kubectl top node``
   - ``kubectl top pod -A``

2. Check if Kubelet is running & if there's any error log:

   - Log in to the Amazon EKS node from the AWS console and run:

     - ``systemctl status kubelet``
     - ``sudo journalctl -xeu kubelet``

Solution
^^^^^^^^

1. First, try to restart any process/container that is misbehaving or
   consuming excessive resources.
2. Escalate to the component owner if the container still consumes excessive
   resources after being restarted.
3. Proceed to (2) if there is nothing consuming a lot of resources.
4. Restart Kubelet if it is not running or if there are some errors in the
   Kubelet log:

   - ``sudo systemctl restart kubelet``

   In some cases, the node is completely unresponsive to any restart command.
   Proceed to (5).

5. Reboot the entire Amazon EKS node:

   - This can be done on the Amazon Elastic Compute Cloud\* (Amazon EC2\*) console. It typically takes ~5 minutes
     for the node to come back up and report to Kubernetes.

6. Escalate if the issue persists.



