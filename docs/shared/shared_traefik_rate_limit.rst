Configure Traefik\* Rate Limit
----------------------------------------

.. warning::
   You must configure the Traefik\* rate limit based on the resources and expected load of each Edge Orchestrator system.

Rate Limit is applicable to each individual cluster. See the `Traefik Rate Limit Docs <https://doc.traefik.io/traefik/middlewares/http/ratelimit/>`__ for information about configuring this feature.  A typical edge node can have a peak of 2,000 requests per minute. The following example shows how to configure the rate limit for Traefik.  These values can be adjusted based on the expected load of the system.

.. code-block:: yaml

   traefik:
     rateLimit:
       average: 2000
       period: 1m
       burst: 1000
