Package Applications
====================

Once development is complete, the application is ready to be packaged as a
container image.

The `docker build` command is used to build the container image from a
definition in a `Dockerfile <https://docs.docker.com/reference/dockerfile/>`_.
The `docker push` command is used to push the image to a container registry.

.. note::
    While it could be possible to run your docker container with the `docker
    run` command after building, it will be of little value if it depends on
    other microservices. Similarly while `docker compose` can create an
    environment supporting multiple services in a complex way, this will
    still not offer the sophistication of the Kubernetes\* platform, and so
    will hold little value except in the simplest of cases.

OCI Registries
--------------
Docker\* images can be stored locally, or pushed to a container registry.

Open Container Initiative (`OCI <https://opencontainers.org/>`_) is a standard
for container images and runtimes. The Docker command line tool is capable of
dealing with OCI registries as well as traditional Docker registries.

.. note:: |software_prod_name| platform comes with its OCI Registry that
   is capable of storing and distributing Container images, Helm charts and
   other artifacts.

The next step :doc:`../deployment-helm/index` requires that your
Application container is pushed to a registry, that will be available to the
|software_prod_name|. See more about pushing to the |software_prod_name|
registry in the :doc:`User Guide </user_guide/package_software/push_registry>`.

Cross Platform
--------------

Docker build command has the capability to do cross platform builds in a
Linux environment. For most compiled languages the Docker image you create
must be compatible with the platform you are deploying it to. Building a
docker image containing go code must be built for x86_64 platform if you want
to run it on x86_64.

Adding metadata
----------------

To help tagging artifacts in the OCI registry it can be helpful to add
metadata to the image. This can be done in the Dockerfile by adding a label,
with the values passed in as build arguments.

.. code:: bash

    ARG org_oci_version=unknown
    ARG org_oci_source=unknown
    ARG org_oci_revision=unknown
    ARG org_oci_created=unknown

    LABEL org.opencontainers.image.version=$org_oci_version \
          org.opencontainers.image.source=$org_oci_source \
          org.opencontainers.image.revision=$org_oci_revision \
          org.opencontainers.image.created=$org_oci_created

Image size
----------

There are many techniques used with Dockerfiles to optimize the size of the
container image, such as using `multi-stage builds <https://docs.docker.com/build/building/multi-stage/>`_,
and using a minimal base image. Reducing the size of the image has great
benefits in terms of speed of deployment.

Some languages (for example, Go\*, C\*, and Rust\*) create binaries that are
statically linked, which means that the container image can be very small.
Other languages (for example, Java\*, Python\*, and JavaScript\*) require a runtime
to be installed in the container, which can mean it's harder to create a
small image.

Image Security
--------------

Dockerfile security best practices are crucial for ensuring the safety and
integrity of containerized applications. Some key practices include:

- Use trusted base images: Utilize official or verified images from trusted
  sources to minimize the risk of introducing malicious software.
- Run as non-root: Avoid running containers as the root user to limit the
  impact of potential security breaches.
- Secure communication: Implement secure communication protocols between
  containers to protect sensitive data.
- Avoid privileged containers: Do not run containers in privileged mode, as
  it grants excessive privileges and poses security risks.
- Limit inter-container communication: Control network traffic between
  containers to prevent lateral movement in case of a compromise.
- Don't expose unnecessary ports: Only expose necessary ports to limit the
  attack surface of containers.
- Use a read-only filesystem: Mount the container filesystem as read-only to
  prevent unauthorized modifications.
- Drop capabilities: Drop unnecessary Linux capabilities to reduce the attack
  surface of containers.
- Regularly scan images for vulnerabilities: Integrate vulnerability scanning
  tools into the development and deployment pipeline to identify and address
  security issues in container images.
- Apply security updates promptly: Apply security patches and updates to
  container images and the underlying operating system to mitigate known
  vulnerabilities.
- Use multi-stage builds: Employ multi-stage builds to minimize the size of
  the final image and reduce the attack surface.
- Avoid storing secrets in Dockerfile: Do not hardcode sensitive information
  like passwords or API keys in the Dockerfile. Use environment variables or
  secret management tools instead.

There are many online guides with more details on these practices.

The `Trivy\* <https://trivy.dev/latest/>`_ tool can be used to scan images for
vulnerabilities. It can be installed locally or added to a CI check. The following
command will scan the image:

.. code:: bash

    trivy image <image_name> --severity HIGH,CRITICAL
