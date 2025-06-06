:orphan:

Registration Information Mismatch
=================================

.. note::

          If the edge device's reported information does not match the registered host's information, the status will become **Connected - Error** in the UI.

          The |software_prod_name| APIs (see :doc:`../api/index`) will report a status of **Host Registration Failed
          due to mismatch of UUID** or **Host Registration Failed due to mismatch of Serial Number**, depending on the type of mismatched information.

          You can also see the details in the logs of the `mi-onboarding-manager` component by searching for the
          `Device not found` and the `Node doesn't exist` strings through the cluster observability stack `Cluster Observability <../user_guide/monitor_deployments/grafana_content.html#cluster-observability>`__.


