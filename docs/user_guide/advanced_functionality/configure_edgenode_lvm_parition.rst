Configure LVM size during provisioning the OS
===============================================

User should be able to configure the LVM size in case of edge node has
single disk. If edge node has 2 disks then one disk with lower disk size
is used for OS partition and other disk is used for LVM partition.
LVM size parameter is host specific and user shall be able to configure
during registration of host using orch-cli.

If user doesn't provide the LVM partition then default value is set to 0
and EN shall get more space for rootfs and persistent volume(user applications)

#. How to configure the LVM size during registration of edge node.

Here are the steps to configure the LVM size using orch-cli during
registration of host/edge node.


#. How to use the LVM partition for RKE cluster

