Checking Power State using DMT Specific API
===========================================

To check the power state of a host using the DMT-specific API, 
use the following `curl` command:

.. code-block:: bash

   curl -X "GET" "https://mps-wss.<orch-address>/api/v1/amt/power/state/<HOST_UUID>" \
     -H "accept: application/json" \
     -H "Authorization: Bearer ${JWT_TOKEN}"

Replace `<HOST_UUID>` with the UUID of your host and ensure `${JWT_TOKEN}` 
is set to a valid authentication token.

This API will return the current power state of the specified.
