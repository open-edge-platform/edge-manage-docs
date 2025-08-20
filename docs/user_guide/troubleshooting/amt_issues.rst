AMT Issues
======================

This section covers troubleshooting AMT issues for Edge Orchestrator.

Failure while activating the AMT from platform-managability-agent
-------------------------------------------------------------------

**Symptom:** Failure in AMT activation stage with an error incorrect user name or password or user account temporarily locked

**Solution:** For the 3.0 release, login to the edge node and then deactivate amt using below command

.. code-block:: bash

    sudo rpc deactivate -local

In orchestrator side we need to restart the rps service using the following command

.. code-block:: bash

    kubectl delete pod -n orch-infra rps-<pod-name>


AMT activation didn't complete by the expected time(2~3minute)
----------------------------------------------------------------

**Symptom:** AMT activation status is not completed or failed

**Solution:** For the 3.0 release, It is recommended to login to the edge node and then check the amtinfo logs for any errors or issues.

.. code-block:: bash

    sudo rpc amtinfo

If the above command gives "RAS Remote Status" as "connecting" then do following steps
to recover from the error.

.. code-block:: bash

    sudo rpc deactivate -local
    sudo systemctl restart platform-managability-agent.service

