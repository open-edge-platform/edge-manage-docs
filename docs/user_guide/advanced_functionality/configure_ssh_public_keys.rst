Remote SSH Access
==================

Edge Manageability Framework allows you to add **public SSH keys** into a host during the provisioning stage, so that you can access the node's console later on.

#. To add your public key, go to the **Admin** section of the web UI, using the Gear option on the top-level menu. Click **SSH Keys** from the left menu:

   .. figure:: images/ssh_key_menu.png
      :alt: Public SSH keys

#. You can edit and run the following example commands on a Linux\* or Mac\* machine to generate the SSH key pair:

   .. code-block:: bash

      ssh-keygen -t ed25519 -f ~/your_key_name  # Generates in ed25519 format
      ssh-keygen -t ecdsa -b 521 -f ~/your_key_name # Generates in ecdsa-sha2-nistp521 format

   .. note::

      | Only **public key**-based authentication with the following SSH key algorithms are supported:
      | * **ed25519**
      | * **ecdsa-sha2-nistp521**

#. Click **Add Key** to open the menu, add the **Key Name** and SSH **Public Key**, then click **Add**:

   .. figure:: images/add_ssh_key_menu.png
      :alt: Add SSH public key

   .. note::

      The SSH **Key Name** will be used to establish the user account on the host.
      Ensure that the provided name does not conflict with any restricted usernames (example: root, admin, and etc.)
      in the Linux or Mac OS.

   .. warning::
      The user account created with the SSH key will have passwordless sudo privileges on the host.


   Once the key is added to the SSH key list, you can add it to a host when configuring it. Follow the
   :doc:`/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host` instructions to enable this.

#. To delete an SSH key, click the **Delete** option under the **Actions** column next to the key you want to delete.
   A confirmation dialog will appear. Click **Delete** to confirm the deletion:

    .. note:: You cannot delete the SSH key if it is associated with a provisioned host.

   .. figure:: images/delete_ssh_key_menu.png
      :alt: Delete SSH public key

#. To view the list of hosts using the SSH key, click the **View Details** option under the **Actions** column next to the SSH key. A list of hosts currently using the SSH key will be displayed:

   .. figure:: images/ssh-key-using-host.png
      :alt: View hosts using SSH public key

#. To access the host's console using SSH, run the following command:

   .. code-block:: bash

      ssh -i ~/your_private_key <key-name>@<host_ip_address>

   .. note::
      * **<key-name>** is the name provided when you add the SSH key.
      * **<host_ip_address>** is the IP address of the host. You can get the IP address through the **host** `View I/O Devices Details <./../set_up_edge_infra/provisioned_host_details.html#view-i-o-devices-details>`__ page of the web UI.
   
   .. warning::
      EMF does not support the lifecycle management (updating, deleting, rotate ssh keys) of the ssh keys installed on the edge node. If you need to rotate or remove the ssh keys, you will need to do it manually on the edge node before the key expires or is no longer needed. Same procedure can be followed to add more ssh keys to the edge node.
