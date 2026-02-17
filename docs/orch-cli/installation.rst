Installation
============

.. code-block:: bash

   oras pull registry-rs.edgeorchestration.intel.com/edge-orch/files/orch-cli:v2025.2.0
   tar xf orch-cli-package.tar.gz
   cosign verify-blob --bundle cosign.bundle.json --certificate-oidc-issuer https://token.actions.githubusercontent.com orch-cli
   sudo cp orch-cli /usr/local/bin/
