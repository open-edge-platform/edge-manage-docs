Begin Manual Installation
#########################

Verify environment readiness
----------------------------

Precheck ensures that your AWS cloud credentials are in place and not expired. It also checks the versions of software on the local PC for compatibility.

#. In a terminal, go to the ``pod-configs`` installation root directory.
   This is the directory where the infrastructure install package was extracted.
#. Run the precheck.

  .. code-block:: bash

     make precheck

If validation is successful, it shows the following message.

.. code-block:: text

    Ready to provision the infrastructure.

If validation fails, precheck provides an error log. Install any missing packages or update the AWS credentials, and run ``make precheck`` again.
