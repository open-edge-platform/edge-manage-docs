Deauthorize a Node with Deployed Cluster and Applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

How to deauthorize a node with deployed cluster and applications.

**Issue**: A host assigned to a cluster has been deauthorized through the user
interface and appears in the **Deauthorized Hosts** tab. A user wants to delete
the host, but it fails with the ``Waiting on inst-XXXXXXXX deletion`` status
message. The host cannot be deleted, because it is still assigned to a cluster.

**Preconditions**

You have assigned the host to a cluster that was deleted:

* At the same time as the host assignment.
* Before the cluster was deleted.
* Before removing the host from the cluster.

**Recovery**:
To recover from this situation, remove the host from the cluster:

1. Go to the "Clusters" tab, find the cluster that the host is assigned to.
2. Click on **Actions**> **Edit**.
3. Scroll down to find the host you want to delete and click "Remove from
   Cluster".
4. If this is the only host in the cluster, you must delete the entire cluster
   by clicking **Actions**>**Delete**. Confirm the deletion when being asked.

After you remove the host from the cluster or delete the cluster, Edge
Orchestrator will delete the host. Therefore, the host will be deleted and
removed from the **Deauthorized Hosts** tab.
