Backup and Restore Edge Orchestrator On-Premises Environment
============================================================

This section describes how to back up and restore storage used by the Edge Orchestrator
on-premises environment.

It provides a script that uses MinIO as an S3-compatible storage backend and Velero for backup
and restore operations.

The backup and restore script is designed to be run on the Edge Orchestrator host machine or a
machine with access to the Kubernetes cluster where Edge Orchestrator is deployed. 
Ideally, this should be run on a machine other than the one where the Edge Orchestrator
is installed.
Before proceeding, ensure you have the necessary permissions and access to the
Edge Orchestrator environment.

The script performs the following operations:
- Installs Velero and its dependencies.
- Creates a backup of the specified namespaces in the Edge Orchestrator environment.
- Cleans up the namespaces that are to be restored.
- Restores the specified namespaces from the backup.

The script is available in the Edge Orchestrator repository [here](https://github.com/open-edge-platform/edge-manageability-framework/blob/main/on-prem-installers/onprem/storage_backup.sh).

Steps to Set Up Backup and Restore with MinIO and Velero
--------------------------------------------------------

1. **Deploy MinIO S3-Compatible Storage**

Before running the backup script, you need to deploy MinIO as an S3-compatible storage backend.
You can use Docker Compose to deploy MinIO easily. Ensure you have Docker and Docker Compose installed
on your machine.

If you do not have Docker installed, you can follow the instructions on the [Docker website](https://docs.docker.com/get-docker/).
If you do not have Docker Compose installed, you can follow the instructions on the [Docker Compose website](https://docs.docker.com/compose/install/).
You can also use any other S3-compatible storage backend if you prefer, but the script is tailored for MinIO.

Create a `docker-compose.yaml` file with the following content to deploy MinIO:

    .. code-block:: yaml

        version: '3'
        services:
          minio:
             image: quay.io/minio/minio
             container_name: minio
             command: server /data --console-address ":9001"
             environment:
                MINIO_ROOT_USER: admin
                MINIO_ROOT_PASSWORD: password
             ports:
                - "9000:9000"  # S3 API
                - "9001:9001"  # Web UI
             volumes:
                - minio-data:/data
        volumes:
          minio-data:

This will create a MinIO instance with the S3 API available on port 9000 and
the web UI on port 9001.

In this example, the user is set to `admin` and the password is set to `password`.
If these credentials are not suitable for your environment, change them accordingly.
If the credentials are changed, ensure that the same credentials
are used in the backup script `storage_backup.sh`.

To deploy MinIO, run the following command in the directory where the
`docker-compose.yaml` file is located:

    .. code-block:: bash

        docker-compose up -d

If you do not have `docker-compose` installed, you can install it using the
following command:

    .. code-block:: bash

        sudo apt-get install docker-compose

2. **Create a MinIO bucket**

In the MinIO web interface, create a bucket named `velero-backups`. The easiest way to do this is to
navigate to `http://<minio_host>:9001` in your web browser, where `<minio_host>` is the IP address
or hostname of the machine running MinIO.

Log in using the credentials specified in the `docker-compose.yaml`
file (default is `admin` and `password`). On the MinIO dashboard, click on the "Create Bucket" bucket button
and enter `velero-backups` as the bucket name. Click "Create" to create the bucket.

3. **Install depedencies**

Before preceeding with the backup and restore operations, you need to install the necessary dependencies.

Export the following environment variable to be able to connect to the MinIO bucket:

    .. code-block:: bash

        export MINIO_URL=<minio_host>:9000


Install the necessary dependencies for the backup script.
The command below will download and install Velero.

Before running the script, ensure you have `wget` and `tar` installed on your system.
Also, this script needs to be run with root privileges or with `sudo` to ensure
it has the necessary permissions to install software.

    .. code-block:: bash
        
        ./storage_backup.sh install

Wait for the installation to complete. Double-check that the Velero deployment is running:

    .. code-block:: bash

        kubectl logs deployment/velero -n velero 
        kubectl get deployments -n velero
      

4. **Disable syncing of namespaces**

Before running the backup script, you should disable the syncing of namespaces
to avoid conflicts during the backup process. 

You can modify the `namespaces` variable in the script to include which namespaces
you want to disable syncing for, otherwise all the namespaces attached to a volume will have syncing disabled.

You can do this by running the following command:

    .. code-block:: bash

        ./storage_backup.sh disable-sync

5. **Create a Backup of the selected namespace**

Create a backup of the namespaces provided in the `namespaces` variable. 
The backup will be stored in the MinIO bucket specified in the script.

You can modify the `namespaces` variable in the script to include any other namespaces
you want to back up, otherwise all the namespaces attached to a volume will be backed up.

Allow some time for the backup to complete, depending on the size of the namespaces
being backed up.

    .. code-block:: bash

        ./storage_backup.sh backup

6. **Cleanup the namespaces that are to be restored**

Before restoring the namespaces, you may want to clean up the existing namespaces
to avoid conflicts.

You can modify the `namespaces` variable in the script to include which namespaces
you want to clean up, otherwise all the namespaces attached to a volume will be cleaned up.
    
    .. code-block:: bash

        ./storage_backup.sh cleanup

Note that this step will delete the specified namespaces and their contents,
so ensure that you have a backup of any important data before proceeding.

7. **Restore the namespaces from Backup**

Restore the namespaces from the backup stored in the MinIO bucket.
Access to the MinIO bucket is required for this operation.

You can modify the `namespaces` variable in the script to include which namespaces
you want to restore, otherwise all the namespaces attached to a volume will be restored.

Allow some time for the restore operation to complete, depending on the size of the namespaces
being restored.

    .. code-block:: bash

        ./storage_backup.sh restore

8. **Verify the Restoration**

After the restore operation is complete, verify that the namespaces have been restored correctly.
You can do this by checking the status of the applications.

    .. code-block:: bash
        
        kubectl get applications -A

This command will list all applications across all namespaces and should show that
all the restored applications are Synced and Healthy.

9. **Re-enable syncing of namespaces**

After the restore operation is complete, you can re-enable the syncing of namespaces
to ensure that the namespaces are kept in sync with the Edge Orchestrator.

You can modify the `namespaces` variable in the script to include which namespaces
you want to re-enable syncing for, otherwise all the namespaces attached to a volume will have syncing
re-enabled.

To confirm that the restore operation was successful, you may run the following command:

    .. code-block:: bash

        velero restore get

If the restore was successful, you should see the status of the restore operation
as `Completed`.        

To sync the namespaces, you can run the following command:

    .. code-block:: bash

        ./storage_backup.sh enable-sync

Troubleshooting
---------------

If you encounter any issues during the backup or restore process, check the logs of the Velero pods
for more information:

    .. code-block:: bash

        kubectl logs -n velero -l app=velero

If you need to access the MinIO web interface, you can do so by navigating to
`http://<minio_host>:9001` in your web browser, where `<minio_host>` is the IP address or hostname 
of the machine running MinIO. Log in using the credentials specified in the `docker-compose.yaml` file
(default is `admin` and `password`).

In case of any issues with the Velero backup or restore operations, double check if these operations
have completed successfully by checking the status of the Velero backup and restore status:

    .. code-block:: bash

        # For backup status check that all say `Completed`
        velero backup get

        # For restore status check that all say `Completed`
        velero restore get

If an ongoing backup or restore operation is stuck or has failed, you can delete the
PodVolumeBackup or PodVolumeRestore resource associated with it to allow the operation to be retried or to clean up
the failed operation. You can find the PodVolumeRestore resource by running:

    .. code-block:: bash

        # See all the PodVolumeRestore resources
        kubectl -n velero get podvolumerestore 

        # Delete a specific PodVolumeRestore resource
        # For example, if the resource name is `orch-backup-20250717120313-nfrq6`
        kubectl -n velero patch  podvolumerestore orch-backup-20250717120313-nfrq6 -p '{"status":{"phase":"Failed"}}' --type merge

        # See all the PodVolumeBackup resources
        kubectl -n velero get podvolumebackup

        # Delete a specific PodVolumeBackup resource
        # For example, if the resource name is `orch-backup-20250717120313-nfrq6`
        kubectl -n velero patch  podvolumebackup orch-backup-20250717120313-nfrq6 -p '{"status":{"phase":"Failed"}}' --type merge

After this check that the status of the backup or restore operation has changed to `Failed` and then you can retry the backup or restore operation.

    .. code-block:: bash

        # For backup status says `Failed`
        velero backup get

        # For restore status says `Failed`
        velero restore get

If the vault is sealed, you may need to unseal it:

    .. code-block:: bash

        mage vault:unseal