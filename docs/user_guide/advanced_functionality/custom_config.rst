Custom Configuration
=========================

The custom config feature allows users to personalize the configuration of an edgenode by providing their own cloud-init file. During the provisioning
process, this user-supplied cloud-init file is applied, enabling tailored setup and initialization of the edgenode to meet specific requirements. This
approach offers flexibility and control over the environment, making it easier to automate and customize deployments.

The custom config feature is available to use through CLI or Orchestrator API's. the :doc:`orch-cli </user_guide/set_up_edge_infra/orch_cli/orch_cli_guide>` to add/delete a custom config file to the edgenode.
The custom config file is a cloud-init file that will be applied during the provisioning process.


#. To add your cloud-init through CLI, save the **cloud-init** file to your local machine and apply the below command.

    .. code-block:: bash

        orch-cli create customconfig <custom-config-name> </path/to/cloudinit.yaml> --project <your-project-name> --description "This is a cloud init file to ..."

    Once the custom-config file is created, it can be added with the host while configuring it.

    .. note::

        | - Ensure that the file begins with **#cloud-config**.
        | - The multiple cloud-init user-data files are merged together, so ensure to add `merge directives <https://cloudinit.readthedocs.io/en/latest/reference/merging.html>`_.

    .. warning::

      Use caution when modifying the cloud-init file, as incorrect settings may lead to provisioning failures or misconfigurations.

#. To list the custom configs, run the command:

    .. code-block:: bash

        orch-cli list customconfig --project <your-project-name>

    This will display all the custom configs available in the specified project.

#. To view any specific custom config, run the command:

    .. code-block:: bash

        orch-cli get customconfig <custom-config-name> --project <your-project-name>

    This will display the content of the specified custom config resource.

#. To delete a custom config, run the following command:

    .. code-block:: bash

        orch-cli delete customconfig <custom-config-name> --project <your-project-name>

#. Some example usecase of a cloud-init file for edgenode configuration

    a. To configure a specific proxy IP address for an edgenode, provide a cloud-init file similar to the example below.
    This will update the environment variables for HTTP and HTTPS proxies during provisioning and overwrite the default values:

        .. code-block:: yaml

            #cloud-config

            merge_how:
            - name: list
                settings: [ append ]
            - name: dict
                settings: [ no_replace, recurse_list ]

            runcmd:
            - sed -i '/http_proxy/d' /etc/environment
            - sed -i '/https_proxy/d' /etc/environment
            - echo 'http_proxy="http://proxy.example.com:888"' >> /etc/environment
            - echo 'https_proxy="http://proxy.example.com:888"' >> /etc/environment

    b. To assign a static IP address to a specific edgenode network interface, provide a cloud-init file similar to the example below.
    This configuration ensures that the designated interface (identified by its MAC address) is set up with a static IP, gateway, and DNS servers during provisioning:

        .. code-block:: yaml

            #cloud-config

            merge_how:
            - name: list
                settings: [ append ]
            - name: dict
                settings: [ no_replace, recurse_list ]

            network:
              version: 2
              ethernets:
                eth2:
                  match:
                    macaddress: "52:54:00:12:34:56"
                  set-name: eth2
                  dhcp4: no
                  addresses:
                    - 192.168.1.100/24
                  gateway4: 192.168.1.1
                  nameservers:
                    addresses:
                      - 8.8.8.8
                      - 8.8.4.4

#. To associate a custom config with an edgenode during its configuration, use the following command:

    .. code-block:: bash

        orch-cli create host <host-name> --import-from-csv <host-list-csv-file> --cloud-init <custom-config-resource-id> --other-flags ...

    This command links the specified custom config to the host, ensuring that the cloud-init file is applied during the provisioning process.
    Refer :doc:`orch-cli documentation </user_guide/set_up_edge_infra/orch_cli/orch_cli_guide>` for more options to manage host.