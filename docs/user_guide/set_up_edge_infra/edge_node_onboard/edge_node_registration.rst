Register Edge Nodes in |software_prod_name|
============================================

|software_prod_name| supports the following registration methods:

#. UI-assisted registration
#. Bulk import of edge devices through the `orch-cli`

.. note:: When you use the **LOC-A software**, you must register the device there using one of the available methods. You do not need to register the device through |software_prod_name|.

Register Using the User Interface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To register your edge node(s) through the User Interface (UI), you must be a member
of the `Edge Manager Group <./../../shared/shared_iam_groups.html#project-id-host-manager-group>`__. Then:


#. Manual onboarding and provisioning.
#. Automated onboarding and manual provisioning.
#. Automated onboarding and provisioning.

.. note:: The first two registration options with manual provisioning assumes that Near Zero Touch Provisioning (nZTP) has been disabled. To confirm if nZTP is disabled, verify that nZTP has been disabled in the provider configuration.
   For details on nZTP, see :doc:`Near Zero Touch Provisioning </user_guide/concepts/nztp>`.

Manual Onboarding and Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Go to the **Infrastructure tab**, click **Hosts** on the left menu. The **Hosts** page appears.

#. On the **Hosts** page, click the **Register Hosts** option. The **Register Hosts** page appears:

   .. figure:: ../images/register_host.png
      :alt: Register Host

#. Enter in a user-friendly name in the **Host Name** field and either the serial number or UUID in the respective fields.
   At least one between the serial number or the UUID must be provided.

   .. note:: The serial number and UUID are typically on a sticker on the device or in the device's BIOS. Other vendors make this information available through the Base Management Controller (BMC).

#. To select manual onboarding, deselect the **Onboard Automatically** field.

#. Leave the **Provision Automatically** field deselected to enable manual provisioning.

#. If multiple edge nodes are to be registered, you can add additional fields using the **+** option below the host table.

#. Click **Register Hosts** to submit the edge node(s); a redirect will happen to the list of nodes with a successful notification:

   .. figure:: ../images/register_host_success.png
      :alt: Registration successful

The Host will show `Status` as `Unknown`, waiting for the edge node to attempt to connect.

Once a connecting edge node reports a UUID or serial number that matches the registered information, the status will become **Registered**.

You can proceed to **onboard** the host by following the
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/onboard_host` instructions.

To **provision** the host after it is onboarded, follow the
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` instructions.

Refer to :doc:`Registered Host Mismatch </shared/shared_registration_info_mismatch>` for any issues in encountered during set up.

Automated Onboarding and Manual Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Go to the **Infrastructure tab**, click **Hosts** on the left menu. The **Hosts** page appears.

#. On the **Hosts** page, click the **Register Hosts** option. The **Register Hosts** page appears.

   .. figure:: ../images/register_host_automatic.png
      :alt: Register Host

#. Enter in a user-friendly name in the **Host Name** field and either the serial number or UUID in their proper fields.
   You must provide either the serial number or the UUID.

   .. note:: The serial number and UUID are typically on a sticker on the device or in the device's BIOS. Other vendors make this information available through the Base Management Controller (BMC).

#. Select **Onboarding Automatically** if appropriate for your usage. By selecting this field, the node will automatically go through
   the onboarding process when connected. By default, the option is `enabled`.

#. Leave the **Provision Automatically** field deselected to enable manual provisioning.

#. If multiple edge nodes are to be registered, you can add additional fields using the **+** option below the host table.

#. Click **Register Hosts** to submit the edge node(s), a redirect will happen to the list of nodes with a successful notification.

   .. figure:: ../images/register_host_success.png
      :alt: Registration successful

The host will show the `Status` as `Unknown`; waiting for the edge node to attempt to connect.

Once a connecting edge node reports a UUID or serial number that matches the registered information, the status will become **Onboarded**.
It will then be automatically moved to the Onboarded tab of the **Hosts** page.

To **provision** the host after it is onboarded, follow the
:doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` instructions.

Automated Onboarding and Provisioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Go to the **Infrastructure tab**, click **Hosts** on the left menu. The **Hosts** page appears.

#. On the **Hosts** page, click the **Register Hosts** option. The **Register Hosts** page appears:

   .. figure:: ../images/register_host_automatic_provision.png
      :alt: Register Host

#. Enter in a user-friendly name in the **Host Name** field and either the serial number or UUID in the respective fields.
   You must provide either the serial number or the UUID.

   .. note:: The serial number and UUID are typically on a sticker on the device or in the device's BIOS. Other vendors make this information available through the Base Management Controller (BMC).

#. Select **Onboarding Automatically** if appropriate for your usage. By selecting this field, the node will automatically go through
   the onboarding process when connected. By default, the option is `enabled`.

#. Select **Provision Automatically** if appropriate for your usage. By selecting this field, the node will automatically go through
   the provisioning process when connected. By default, the option is `disabled`.

#. If multiple edge nodes are to be registered, you can add additional fields by clicking the **+** option.

#. Click **Continue** to configure the provisioning settings. This follows the
   :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` instructions.

#. After completing and reviewing the provisioning settings, click **Provision** to submit the edge node(s),
   a redirect will happen to the list of nodes with a successful notification.

   .. figure:: ../images/register_host_success_automatic_provision.png
      :alt: Registration successful

The Host will show `Status` as `Unknown`, waiting for the edge node to attempt to connect.

Once a connecting edge node reports a UUID or serial number that matches the registered information, the node is onboarded and provisioning starts.
It will then be automatically moved to the Provisioned tab of the **Hosts** page.

Orch-CLI - Bulk Import Edge Devices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The orch-cli tool facilitates registration of a set of hardware devices as edge nodes through a comma-separated value (CSV) file:

#. orch-cli supports the creation of an empty template, and/or tests the validity of a given CSV file for it to be used during creation the host resources.
#. orch-cli facilitates the import of the edge nodes present in a CSV file to the Edge Orchestrator.

Download Tools
~~~~~~~~~~~~~~

The tool ``orch-cli`` is publicly available for release in
Open Container Initiative\* (OCI\*) compliant registries. Intel recommends using the ``oras`` client to interact with it.
Ensure that you have ``oras`` available on your system or follow the instructions in the
`public documentation <https://oras.land/docs/installation>`_ to install it.

Download the tool  as follows:

The tool is made available in the public AWS* Elastic Container Registry. It can be pulled without any credentials using commands like below:

.. code-block:: bash

   oras pull registry-rs.edgeorchestration.intel.com/edge-orch/files/orch-cli:3.1

The package will be an archive which needs to be unpacked to access the binary.

For more information about the orch-cli tool and how to use it to create and view other Edge Orchestrator resources, refer to the:
:doc:`/user_guide/set_up_edge_infra/orch_cli/orch_cli_guide`

Login to the Edge Orchestrator
------------------------------

Go to the directory where the downloaded orch-cli tool resides (for example, ~), to run the login command.
The *username* must be provided as and argument followed by *--keycloak* flag pointing to the Keycloak service of the Edge Orchestrator.
This is followed by the password prompt:

.. code-block:: bash

   cd ~
   chmod +x orch-cli

   orch-cli login <USER> --keycloak https://keycloak.<CLUSTER_FQDN>/realms/master
   Enter Password:

Generate a .csv File
--------------------

This section guides through the creation of a formatted `.csv` file with all the entries. This is optional if you already have a correct `.csv` file.

Go to the directory where the downloaded orch-cli tool resides (for example, ~), to run it:

.. code-block:: bash

   ./orch-cli create host  --api-endpoint <CLUSTER_FQDN>  --project <PROJECT_NAME>  --generate-csv=<FILENAME>.csv

Now, you can populate the `.csv` file by appending details of systems.
Do not change the first line `Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,AMTEnable,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill`
because that is the expected format.
The `Serial`, `UUID`, `OSProfile` and `Site` columns must be filled, with the serial number and UUID of the edge node(s) you want to register as well as the OSProfile
name/resource ID, and the site resource ID.
The other columns are optional - for more information seek help with `-h` flag.
The following is an example:

.. code-block:: bash

   Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,AMTEnable,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
   2500JF3,4c4c4544-2046-5310-8052-cac04f515233,"Edge Microvisor Toolkit 3.0.20250808",site-b05caf24
   ICW814D,4c4c4544-4046-5310-8052-cac04f515233,"ubuntu-22.04-lts-generic",site-b05caf24
   FW908CX,4c4c4544-0946-5310-8052-cac04f515233,"Edge Microvisor Toolkit 3.0.20250717",site-a053abcd

Check the CSV File
------------------

You can now validate the CSV file that you have created yourself or through generation by attempting a dry run deployment.
.. code-block:: bash

   ./orch-cli create host  --api-endpoint <CLUSTER_FQDN>  --project <PROJECT_NAME>  --import-from-csv <FILENAME>.csv --dry-run

orch-cli
~~~~~~~~

This section shows how to use a CSV file to import a series of devices as edge nodes,
the utility provides a set of override flags that can be used to globally override the arguments throughout the CSV file:

.. code-block:: bash

   Flags:
  -a, --amt                                Override the AMT feature configuration provided in CSV file for all hosts
  -j, --cloud-init string                  Override the cloud init metadata provided in CSV file for all hosts
  -f, --cluster-config string              Override the cluster configuration provided in CSV file for all hosts
  -c, --cluster-deploy string              Override the cluster deployment flag provided in CSV file for all hosts
  -t, --cluster-template string            Override the cluster template provided in CSV file for all hosts
  -d, --dry-run                            Verify the validity of input CSV file
  -g, --generate-csv string[="test.csv"]   Generates a template CSV file for host import
  -h, --help                               help for host
  -i, --import-from-csv string             CSV file containing information about to be provisioned hosts
  -m, --metadata string                    Override the metadata provided in CSV file for all hosts
  -o, --os-profile string                  Override the OSProfile provided in CSV file for all hosts
  -r, --remote-user string                 Override the metadata provided in CSV file for all hosts
  -x, --secure string                      Override the security feature configuration provided in CSV file for all hosts
  -s, --site string                        Override the site provided in CSV file for all hosts

CSV file fields:
The fields `OSProfile`, `Site`, `Secure`, `RemoteUser`, `CloudInitMeta`,  and `Metadata` are used for provisioning configuration of the Edge Node.
The fields accept both name and resource IDs, with an exception of site which only accepts resource IDs.
The `Secure` field is a boolean value that can be set to `true` or `false`. The `Metadata` field is a key-value pair separated by an `=` sign, and multiple key-value pairs are separated by an `&` sign.
The `AMTEnable` enables the AMT feature in supported edge nodes and is by default a boolean value of `false`.
The `K8sEnable` enables the auto creation of single node K3s cluster and is by default a boolean `false`. When enabled additional configuration must
be provided via `K8sClusterTemplate` which expects the template name and version in format `<name>:<version>`, and optional config `K8sConfig` in format
`role:<roles>;name:<name>;labels:<name=value>&<name2=value2>`


#. Do the following before running the `create host` command with the `orch-cli`:

   i. Complete the CSV file with the provisioning details for the edge nodes you want to register. `OSProfile` and `Site` are a mandatory fields without which provisioning configuration cannot be completed. Also, be aware that the `OSProfile` and `Secure` fields are related. If `Secure` is set to `true`, the `OSProfile` must support it. If left blank, `Secure` defaults to `false`.
      The values in other fields are validated before consumption though an empty string is allowed for all of them. If a column is not filled in but followed but value in other column it should be left blank followed by nex column ie. `value,,value2`.
      The following is an example:

      .. code-block:: bash

         Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,AMTEnable,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
         2500JF3,4c4c4544-2046-5310-8052-cac04f515233,os-7d650dd1,site-08c1e377,true,localaccount-9dfb57cb,key1=value1&key2=value2,,custom-config
         ICW814D,4c4c4544-4046-5310-8052-cac04f515233,ubuntu-22.04-lts-generic,site-08c1e377,true,myuser-key,key1=value1&key2=value2,
         FW908CX,4c4c4544-0946-5310-8052-cac04f515233,os-7d650dd1,site-08c1e377,true,myuser-key,key1=value1&key2=value2,,,true,baseline:v1.0.0,role:all;name:mycluster;labels:sample-label=samplevalue&sample-label2=samplevalue2

   #. Authenticate with Edge Orchestrator before importing hosts.

      #. **Interactive shell** - The default way to authenticate with Edge Orchestrator is to log in by providing username as first argument and using an interactive prompt
         The prompt will ask for password. Upon login the JWT access token will be cached on the system, it expires after one hour, after this time user needs to logout and log in again:

         .. code-block:: bash

            cd ~
            chmod +x orch-cli

            orch-cli login <USER> --keycloak https://keycloak.<CLUSTER_FQDN>/realms/master
            Enter Password:

      #. **Password argument** - Alternatively the password can be provided as a second command line argument - the recommended way is to use prompt based login above.
         When using this method, be cautious as the password may be exposed in the command line history. If using this method exporting the password as an environment variable is recommended.

         .. code-block:: bash

            cd ~
            chmod +x orch-cli

            orch-cli login <USER> <PASSWORD> --keycloak https://keycloak.<CLUSTER_FQDN>/realms/master

#. Run the bulk import tool. Go to the directory where you have downloaded the file (e.g. ~).
   The URL in the command is a mandatory argument that points the tool towards the Edge Orchestrator where the devices will be registered.
   Replace test.csv with your CSV filename, and CLUSTER_FQDN with the name of the domain used during installation, and the PROJECT_NAME with an actual project created in the Edge Orchestrator for a given user:

   .. code-block:: bash

      cd ~
      chmod +x orch-cli
      ./orch-cli create host  --api-endpoint <CLUSTER_FQDN>  --project <PROJECT_NAME>  --import-from-csv test.csv

#. The orch-cli validates the input file again, similar to the dry-run tool, and generates an error report if validation fails.
   If validation passes, the bulk import tool proceeds to the registration phase.
   For each host registration that succeeds, expect output similar to the following at the console:

   .. code-block:: bash

      ✔ Host Serial number : 2500JF3  UUID : 4c4c4544-2046-5310-8052-cac04f515233 registered. Name : host-a835ac40
      ✔ Host Serial number : ICW814D  UUID : 4c4c4544-4046-5310-8052-cac04f515233 registered. Name : host-17f57696
      ✔ Host Serial number : FW908CX  UUID : 4c4c4544-0946-5310-8052-cac04f515233 registered. Name : host-7bd98ae8
      CSV import successful

#. If there are errors during registration, a new CSV file with the name ``import_error_timestamp_filename`` is generated with each failed line having a corresponding error message.

Example of invocation and failure:

   .. code-block:: bash

      ./orch-cli create host  --api-endpoint <CLUSTER_FQDN>  --project <PROJECT_NAME>  --import-from-csv test.csv
      Importing hosts from file: test.csv to server: https://api.CLUSTER_FQDN
      Onboarding is enabled
      Checking CSV file: test.csv
      Generating error file: import_error_2025-08-15T18:28:44+05:30_test.csv
      error: Failed to import all hosts


      $ cat import_error_2025-08-15T18\:28\:44+05\:30_test.csv
      Serial,UUID,OSProfile,Site,Secure,RemoteUser,Metadata,AMTEnable,CloudInitMeta,K8sEnable,K8sClusterTemplate,K8sConfig,Error - do not fill
      FW908CX,4c4c4544-0946-5310-8052-cac04f515233,os-7d650dd1,site-abcd1234,true,myuser-key,key1=value1&key2=value2,Host already registered
