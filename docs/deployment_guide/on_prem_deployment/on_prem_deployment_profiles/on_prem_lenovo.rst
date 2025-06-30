Lenovo Deployment Profile
=========================

Download and Install Lenovo\* Open Cloud Automation (LOC-A)
-----------------------------------------------------------

For details on the LOC-A installation process and setup, see the
`Lenovo\* ISG Support Plan - LOC-A (Lenovo Open Cloud Automation) <https://support.lenovo.com/us/en/solutions/ht509884-loc-a-lenovo-open-cloud-automation-for-vcf>`_.

This Edge Orchestrator version is compatible with LOC-A version 3.3.x. To get a
valid license, contact your Lenovo representative.

Assuming that all sanity checks have passed and LOC-A installation is complete,
the next step is to install the Edge Infrastructure Manager Plugin* for LOC-A

#. Clone the Edge Infrastructure Manager External GitHub repository and navigate to the ``loca-plugin`` directory.
#. Modify ``configs.yml`` according to your environment. Ensure ``locaUrl`` points to the  LOC-A instance you are setting up.
#. Find the ``plugin-tool`` binary in the package provided by Lenovo under the obtained license and copy it in the current directory.
#. Locate the ``decrypt.py`` script in the Lenovo package and move it to the ``edge-node/filter_plugins`` directory.
#. Create a virtual environment and install the required dependencies.

   .. note:: Ensure you have Python 3.x installed before proceeding.

   .. code-block:: shell

      make venv_locaplugin

#. Activate the virtual environment created in the previous step to ensure that all dependencies are correctly isolated and available for the plugin build process.

   .. code-block:: shell

      source venv_locaplugin/bin/activate

#. Run ``create-loca-plugin.sh`` script that is present in the repository.
#. When asked to encrypt the LOC-A plugin, type in ``yes`` and provide a password for decryption.
#. Provide the password to access the LOC-A machine.
#. Exit the virtual environment by running the ``deactivate`` command.

Now you are ready to bootstrap the information to integrate Edge Orchestrator with LOC-A:

1. Save and encode using the base64 machine-to-machine (M2M) credentials
   generated for the administrative access of LOC-A REST APIs. These are the same to access LOC-A UI.

#. Get the LOC-A Certificate Authority (CA) from the deployment using the
   following command:

   .. code-block:: shell

      openssl s_client -connect LOCA_IP:443

You will need the LOC-A CA as input to the profile ``enable-lenovo.yaml``. You must repeat this process for all LOC-A
instances that need to be integrated with the Edge Orchestrator.

Next, you will deploy Edge Orchestrator on the target machine as defined in the pre-requisite steps.

