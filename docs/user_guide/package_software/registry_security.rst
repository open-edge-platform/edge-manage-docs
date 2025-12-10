Registry Credential Security
============================

Registry credentials in |software_prod_name| are managed through a secure storage architecture
designed to protect sensitive authentication information while providing necessary access for
authorized operations.

Credential Transmission
^^^^^^^^^^^^^^^^^^^^^^^

**CLI Transmission**
  * Credentials are transmitted over HTTPS to the API endpoints without additional encryption
  * The CLI relies on HTTPS transport layer encryption for security during transmission
  * No client-side encryption occurs in the CLI layer
  * The CLI does not store credentials locally

**UI Transmission**
  * Credentials are transmitted over HTTPS through the web interface
  * Same API endpoints and security model as CLI
  * Browser security policies provide additional protection layers

Storage Architecture
^^^^^^^^^^^^^^^^^^^^

Both CLI and UI use identical server-side storage mechanisms:

**Vault-based Storage** (Recommended)
  When ``UseSecretService = true``:

  * Credentials are Base64-encoded and stored as secrets in Vault
  * Access is controlled through Kubernetes service account tokens
  * All sensitive data (username, password/auth_token, certificates, URLs) is encrypted at rest

**Database Storage** (Alternative)
  When ``UseSecretService = false``:

  * Registry data including credentials are Base64-encoded and stored in an encrypted database
  * All sensitive fields are encrypted using database-level encryption

Access Control
^^^^^^^^^^^^^^

* Credentials are accessible to users with appropriate read permissions within the project scope
* Access is governed by the platform's Role-Based Access Control (RBAC) system
* Write access is required for credential updates and registry modifications

**CLI Access Control**
  * Use ``--show-sensitive-info`` flag to view actual credential values
  * Default behavior masks credentials with "********" for security
  * Example:

    .. code-block:: bash

        # Shows masked credentials (default)
        ./orch-cli get registry my-registry

        # Shows actual credential values (requires explicit flag)
        ./orch-cli get registry my-registry --show-sensitive-info

**Important Security Implications**
  * Anyone with read access can retrieve actual credentials using the show-sensitive flag
  * Monitor and audit who accesses sensitive registry information
  * Consider limiting read access to registries containing critical credentials

Security Best Practices
^^^^^^^^^^^^^^^^^^^^^^^^

**Credential Management**
  * Use short-lived authentication tokens when supported by your container registry
  * Implement regular credential rotation schedules using update functionality
  * Avoid exposing credentials in command history (use environment variables if needed)
  * Monitor credential usage and access patterns

**CLI Security Practices**
  * Be cautious when using ``--show-sensitive-info`` flag in shared environments
  * Clear command history containing credentials
  * Use secure terminals when entering credential information
  * Consider using registry tokens instead of passwords when available

**Access Control**
  * Follow the principle of least privilege when assigning user permissions
  * Regularly review and audit user access to registry credentials
  * Use project-level isolation to limit credential exposure
  * Monitor audit logs for credential access and modification activities

**Network Security**
  * Ensure HTTPS is properly configured and certificates are valid
  * Use secure networks when transmitting credentials
  * Consider network-level access controls for sensitive registries

**Token Security**
  * Prefer registry-specific authentication tokens over personal passwords
  * Configure token expiration policies where supported
  * Revoke unused or compromised tokens immediately
  * Rotate tokens according to your organization's security policies

Updates and Rotation
^^^^^^^^^^^^^^^^^^^^

Registry credentials can be updated without recreating the registry configuration:

* Username and password/token updates are fully supported
* Updates maintain the same security level as initial credential storage
* No service interruption during credential rotation
* Audit logs track all credential modification activities

For implementation details, see the respective GUI and CLI documentation sections.
