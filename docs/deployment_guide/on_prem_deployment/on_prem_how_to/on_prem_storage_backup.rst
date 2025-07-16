Backup and Restore Edge Orchestrator On-Premises Environment
============================================================

This section describes how to back up and restore storage used by the Edge Orchestrator
on-premises environment.

It provides a script that uses MinIO as an S3-compatible storage backend and Velero for backup
and restore operations.


Steps to Set Up Backup and Restore with MinIO and Velero
--------------------------------------------------------

1. **Deploy MinIO S3-Compatible Storage**

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



2. **Install depedencies**

Install the necessary dependencies for the backup script.
The command below will download and install Velero.

Before running the script, ensure you have `wget` and `tar` installed on your system.
Also, this script needs to be run with root privileges or with `sudo` to ensure
it has the necessary permissions to install software.

    .. code-block:: bash
        
        ./storage_backup.sh install


3. **Create a Backup of the `orch-database` Namespace**

Create a backup of the namespaces provided in the `namespaces` variable. 
The backup will be stored in the MinIO bucket specified in the script.

You can modify the `namespaces` variable in the script to include any other namespaces
you want to back up. You can comment out the namespaces you do not want to back up.

Allow some time for the backup to complete, depending on the size of the namespaces
being backed up.

    .. code-block:: bash

        ./storage_backup.sh backup

4. **Cleanup the namespaces that are to be restored**



    
5. **Restore the `orch-database` Namespace from Backup**

Restore the namespaces from the backup stored in the MinIO bucket.
Access to the MinIO bucket is required for this operation.

You can modify the `namespaces` variable in the script to include which namespaces
you want to restore. You can comment out the namespaces you do not want to restore.

Allow some time for the restore operation to complete, depending on the size of the namespaces
being restored.

    .. code-block:: bash

        ./storage_backup.sh restore

6. **Verify the Restoration**

After the restore operation is complete, verify that the namespaces have been restored correctly.
You can do this by checking the status of the applications.

    .. code-block:: bash
        
        kubectl get applications -A