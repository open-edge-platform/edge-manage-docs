Onboard Edge Node Using LOC-A Assisted Boot
====================================================

.. note:: Before reading this guide, make sure you meet :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/prerequisites/lenovo_prerequisites`.

You will need to :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/3rd_party_examples/setup_loca`
before proceeding with the onboarding process.

.. include:: setup_loca.rst

Device Onboarding using LOC-A
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. LOC-A provides a near zero-touch onboarding experience through different means. See the LOC-A documentation for more details: `Lenovo ISG Support Plan - LOC-A (Lenovo Open Cloud Automation) <https://support.lenovo.com/us/en/solutions/ht509884-loc-a-lenovo-open-cloud-automation-for-vcf>`_. In this user guide, Intel assumes the use of either the device template registration spreadsheet or the built-in discovery functionality for device onboarding:

.. list-table::
   :widths: 20, 20, 20, 20, 20
   :header-rows: 1

   * - BMC IP
     - Site Name
     - BMC Username
     - BMC Password
     - BMC New Password

   * - 192.168.202.2
     - Intel
     -
     -
     -

   * - 192.168.202.3
     - Intel
     -
     -
     -

#. Assuming that this is the first device template, upload the device template by clicking the `upload` icon from the `Registered Devices` tab.
   Alternatively, you can add devices by clicking the `+` icon and through Device discovery, or manually entering the baseboard management controller (BMC) IP and credentials.

   For details on device onboarding, see the user guide at `Lenovo ISG Support Plan - LOC-A (Lenovo Open Cloud Automation)) <https://support.lenovo.com/us/en/solutions/ht509884-loc-a-lenovo-open-cloud-automation-for-vcf>`_.

   .. image:: ../../images/devices.png
      :alt: Upload Device Template
      :width: 750px

#. When the registration process completes, the device will be onboarded to the |software_prod_name|\ .

   .. image:: ../../images/loca-devices-complete.png
      :alt: Device Registered
      :width: 750px

.. _os_provisioning_loca_lenovo_350_360_450:

OS Provisioning using |software_prod_name|\
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the device has been onboarded, you can proceed with OS deployment.

#. Since |software_prod_name|\  automatically synchronizes devices, go to |software_prod_name|\,
click the **Infrastructure** tab, then click **Hosts** in the left menu and select the **Onboarded** filter.

#. Identify the host using the Host UUID and Serial Number.

#. Follow the :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` steps to trigger OS provisioning.
