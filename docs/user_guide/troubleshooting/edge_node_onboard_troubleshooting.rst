Troubleshoot Edge Node Onboarding
==================================

This section describes some common errors and the best practices to
troubleshoot your edge node during the booting phase.

Registration Mismatch
---------------------

Two types of errors can happen during host registration, either the hosts
already exist or there is a mismatch between
information provided by the user and the data reported by an edge node
connecting to Edge Orchestrator.

* Host already exists for the provided information. If during registration the
  provided information,
  UUID or Serial Number already exists in the system, and error is reported
  similar to the following.
  Check the information and the existing hosts and proceed by either providing
  correct information or
  deleting existing hosts and re-starting the registration process.

  .. figure:: images/register_host_already_existing.png
      :alt: Register Host

* User and Edge Node information mismatch. If a host is not registered or
  registered with certain information
  but when a physical device connects the information matches only partially
  an error appears: **Connected - Error**:

  .. figure:: images/registered_hosts.png
     :alt: Register Host

  You can view the error in the **Actions** column and click the three-dot
  icon for the desired host, then click **View Error**.

  .. figure:: images/registered_host_view_error.png
     :alt: Register Host

  The error is similar to the following.

  .. figure:: images/registered_host_connection_error.png
     :alt: Register Host

  Therefore, check the information, note it down, then perform a delete host operation
  :doc:`/user_guide/set_up_edge_infra/delete_host`
  and register it again with the correct information.

Lenovo Open Cloud (LOC-A) Error Scenarios
------------------------------------------

This section contains some error scenarios when integrating
|software_prod_name|\  with Lenovo Open Cloud Automation (LOC-A).

Onboarding an EN using LOC-A
+++++++++++++++++++++++++++++

Devices are onboarded through LOC-A and eventually |software_prod_name|\  will
synchronize its inventory with LOC-A. If the devices are not getting onboarded
follow these steps:

#. Verify that host was successfully registered and is visible in the page
   `Registered devices` in LOC-A UI.

#. If the devices are not visible in the LOC-A UI, go under the `Tasks` page
   and check the associated add device failed task, download the service logs
   and report to your Lenovo representative for further troubleshooting

   .. image:: images/onboarding_error.png
      :alt: Onboarding error
      :width: 750px

#. Instead if the device is successfully onboarded in LOC-A and visible in
   LOC-A UI - verify it is listed in |software_prod_name|\  UI under the
   `Onboarded` page. The `Onboarding` status should be `Ready to be
   Provisioned`.

#. If the device is not getting reported, collect the logs of `loca-manager`
   deployment using
   :doc:`/user_guide/monitor_deployments/orchestrator_observability`.

#. Report the issue using the ticketing system.

Provisioning an EN using LOC-A
++++++++++++++++++++++++++++++

OS is installed by LOC-A, and as part of the deployment workflow in LOC-A,
additional agents and applications are installed on the edge devices. Once
installed, the agents start to report their status to |software_prod_name|\.

The latter will also learn from LOC-A the provisioning status of the devices to
detect any failure before the agents start.

If the OS provisioning process is not ending successfully and one of the
statuses in the host detail page of |software_prod_name|\  UI is not green,
follow the steps:

#. Verify that host is visible in the page `Registered devices` and shown as
   `Active` in LOC-A UI. Alternatively verify that the Instance status is
   reported as `Finished successfully` in the `Instances` page.

#. If one of the two condition is not met, go under the `Tasks` page, and check
   the `Save Instance Plan And Deploy` failed task, download the service logs
   and report to your Lenovo representative for further troubleshooting

   .. image:: images/provisioning_error.png
      :alt: Provisioning error
      :width: 750px

#. If the cloud plugin step failed means that Edge Infrastructure Manager
   Plugin* for LOC-A failed to complete the provisioning. Report the issue
   using the ticketing system.

#. When the device is successfully provisioned in LOC-A, it is visible in LOC-A
   UI. You can verify it in |software_prod_name|\  UI under the `Onboarded`
   page.

#. If the host is not in `Running` status on the host details page (that is,
   the status is not green), then collect the logs of the `loca-manager,`
   `host-manager,` `maintenance-manager,` deployments using
   :doc:`/user_guide/monitor_deployments/orchestrator_observability`.

#. Report the issue using the ticketing system.

Delete a Host from LOC-A
+++++++++++++++++++++++++

If the devices are onboarded and provisioned through LOC-A, the reconciliation
process requires an additional step to complete as the edge devices and the OS
instances running on these devices need to be removed from LOC-A as well.

#. Verify that the host was not removed from |software_prod_name|\  UI.

#. Login in to LOC-A UI, navigate to `Instances` page and verify that no
   instances are getting reported.

#. Navigate to `Registered devices` page and verify that the expected device is
   no longer registered in LOC-A.

#. If one of the two conditions is not met, go under the `Tasks` page and check
   status of `Remove Instance` and `Remove Device` tasks, download the service
   logs and report to your Lenovo representative for further troubleshooting.

#. If no tasks were created, collect the logs of `loca-manager` deployment
   using :doc:`/user_guide/monitor_deployments/orchestrator_observability`.

#. Report the issue using the ticketing system.

Create and Delete Site Metadata in LOC-A
++++++++++++++++++++++++++++++++++++++++++++

|software_prod_name|\ can automatically synchronize sites and Edge Orchestrator
cloud services with LOC-A.

    .. note:: You still need to manually configure IP ranges and network
              services in LOC-A using the cloud template. If you remove a site, LOC-A will
              automatically remove dependent services.

After running the instructions in
:doc:`/user_guide/set_up_edge_infra/location/add_site` or in
:doc:`/user_guide/set_up_edge_infra/location/delete_site`,
sites and cloud services will be reconciled with LOC-A.

#. Verify that the site was created (or removed) in |software_prod_name|\.

#. Log in to the LOC-A UI and navigate to the `Setup` page. Verify that
   expected sites metadata have been created (or purged).

#. If site metadata are missing or not getting deleted, go to the `Tasks` page
   and check the statuses of `Add Site`, `Remove Site`, and `Remove Cloud
   Services` tasks. Download the service logs and report to your Lenovo
   representative for further troubleshooting.

#. If no tasks were created, collect the logs of `loca-metadata-manager`
   deployment through the :doc:`/user_guide/monitor_deployments/orchestrator_observability`.

    .. note:: LOCA-A does not create the `Add Cloud Service` task when a cloud
              service is created.

#. Report the issue using the ticketing system.

Create an Instance Template in LOC-A
+++++++++++++++++++++++++++++++++++++++++++

This version of the |software_prod_name|\  is able to automatically convert OS
profiles into LOC-A instance templates.

    .. note:: LOC-A is not able to deploy all the OS profiles supported in the
             |software_prod_name|\.

#. Verify that the Lenovo Ubuntu 22.04.03 profile is visible in the OS profiles
   page as shown in :doc:`/user_guide/additional_howtos/view_os_profiles`.

#. Login in to LOC-A UI, navigate to `Templates` page, and verify that the
   expected instance templates has been created. One template per device model
   is created by |software_prod_name|\ .

#. If one of the template is missing, go under the `Tasks` page, and check
   status of `Create Template` tasks, download the service logs, and report to
   your Lenovo representative for further troubleshooting.

#. If no tasks were created, collect the logs of `loca-template-manager`
   deployment using :doc:`/user_guide/monitor_deployments/orchestrator_observability`.

#. Report the issue using the ticketing system.
