Deploy the Tutorial
-------------------

You can deploy the Tutorial Server and the Tutorial Web UI on the Deployments page. The process is described
in detail in the User Guide in :doc:`/user_guide/package_software/deployments`.

To show the flexibility of the Application Orchestration, we will deploy the Tutorial
Server with the `alternate-pt` profile, and will give it a custom greeting message:



.. figure:: ../images/app-orch-deploy-tutorial-2.png
   :alt: Choose Alternate-PT Deployment Profile while deploying
   :align: center

When prompted, enter values for the parameters in the form - we defined these in
:doc:`../deployment-packages/index`.

.. figure:: ../images/app-orch-deploy-tutorial-3.png
   :alt: Fill in Parameter Templates for Tutorial Server while deploying
   :align: center

Then continue with the deployment by clicking **Deploy**.

.. figure:: ../images/app-orch-deploy-tutorial-6.png
   :alt: Deploy Tutorial Server with Alternate-PT Deployment Profile
   :align: center

Note that you can deploy and undeploy in less than a minute. Therefore, you can try out the different profiles.

.. note::
    The first time you deploy the Tutorial Server, it will take a few minutes to pull the tutorial server image
    because of its size. The tutorial-web-ui may restart multiple time in this period because it depends on the
    tutorial-server service to be available. This is normal behavior.

Inspecting the deployment is covered in the next section.
