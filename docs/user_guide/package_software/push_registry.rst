Push Image or Chart to the Registry
===============================================

Helm\* charts are pushed using the `helm push` command.

Docker\* images are pushed using the `docker push` command.

To push to the Internal Harbor registry, it is first necessary to
retrieve a CLI password through the Internal Harbor web UI. This
UI can also provide hints on how to push and pull from the registry
using these commands.

Other registries may be managed outside of the |software_prod_name| service,
and may require different credentials or methods to push images or charts.
Contact the registry owner for more details.

Procedure
---------

To login to the Internal Harbor registry, follow these steps:

#. In a web browser navigate to the Internal Harbor registry URL
   (for example, https://registry-oci.<CLUSTER_FQDN>).

#. At the Registry login page choose "Login with IAM" with a user
   that either has:

   - the group **<project-id>_Edge-Manager-Group** (gives read-write access)
   - or **<project-id>_Edge-Operator-Group** (gives read-only access).

#. This will give access to the private Harbor Projects corresponding to the
   multi-tenancy projects that the user has access to in the |software_prod_name|.
   The Harbor Project name is constructed like **catalog-apps-<org-id>-<project-id>**.

#. Click on the project name to access the Harbor project.

#. Click on the **PUSH COMMAND** button to see the commands to push an image or chart.

#. Click on the **User Profile** icon in the top right corner and copy the **CLI Secret**.

#. In a terminal window, use the command-line login to Helm with the
   username and CLI secret (as password, when prompted):

    .. code:: bash

      helm registry login registry-oci.${CLUSTER_FQDN} -u <username>

#. Login to Docker with the username and CLI secret (as password, when prompted):

    .. code:: bash

      docker login registry-oci.${CLUSTER_FQDN} -u <username>

#. Push the image or chart to the registry using the command provided in the Harbor UI.


.. note::
   See an example of this procedure in action in
   :doc:`/user_guide/package_software/quick_start_guide`.

   If the push process fails, contact a system administrator to check the following:

   * If the registry has the workspace/directory (for example, Project in Harbor).
   * The account has the right permission.

Also, if you push a new container image with the same image name, the existing image
could be overwritten with the new image. Intel recommends setting the image tag with the
unique version to avoid this issue.

