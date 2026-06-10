Prepare Environment for Installation
==================================================

Set Up Sudo Privileges
--------------------------------

If you do not have ``sudo`` privileges for this environment, set them up
before installation.

.. code-block:: shell
   :caption: Example sudo command

   sudo usermod -aG sudo <user_name>
   echo "<user_name> ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/<user_name>

Set Correct Time and Date
--------------------------------

.. code-block:: shell
   :caption: Example NTP command

   sudo ntpdate [options] [time_server]

Update the Package Information
--------------------------------

.. code-block:: shell

   sudo apt-get update
   sudo apt-get upgrade

