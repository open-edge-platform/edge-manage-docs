Package Tutorial Server
=======================

Create a Dockerfile
-------------------

The Tutorial Server application is built using the Python\* programming language and therefore requires a Python release to be present in the container.

.. note::

   The Python image is quite large, and so the container will be larger than a Go\* or Rust\* application.
   This is a common issue with Python applications, and is one of the reasons some cloud developers
   prefer to develop in Go or Rust for their microservices.

The **docker build** command requires a **Dockerfile** to define the recipe for the image.

For the Tutorial Server, you will use a base image that includes the Python release and FastAPI\* framework.
There are many available at `Docker\* Hub <https://hub.docker.com/search?q=fastapi>`_; the tutorial uses the `Demisto\* FastAPI image <https://hub.docker.com/r/demisto/fastapi>`_ as the base because it
is from a reputable company and is up to date.

Create a file called `Dockerfile` in the `tutorial-server` directory with the following content:

.. code:: dockerfile

    # Use the FastAPI image from Docker Hub
    FROM demisto/fastapi:0.115.9.2587379

    # Set the working directory
    WORKDIR /app

    # Copy the requirements file into the container
    COPY main.py ./

    # Expose the port the app runs on
    EXPOSE 8000

    # Run as a non-root user
    USER nobody

    # Run the application
    ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0"]

This copies over the file `main.py` from the local directory into the container and sets the working directory to `/app`.
Run the `uvicorn` command to start the FastAPI application. The command will run as a non-root user for
security reasons.

Build the Container Image
-------------------------

First check that Docker\* platform is installed on your system and running.

.. code:: bash

   docker --version
   docker ps

Then build the Container image using the Dockerfile.

.. code:: bash

   docker build --platform=linux/amd64 . -t tutorial-server-image

This creates the Docker image and saves it in your local Docker repository with the name `tutorial-server-image`.

.. note::

   The `--platform=linux/amd64` option is required to ensure the image is built for the correct architecture.
   This is because the base image is built for `linux/amd64` and so the final image must be built for the same.
   This is important if you are using a Mac\* OS with the Apple\* silicon (M1 or M2) as the default architecture is `linux/arm64`.
   You can check the architecture of your system with the command: **uname -m**.

Check the image is there with the command:

.. code:: bash

   docker images

Test the Container Image
------------------------

Now you can run the container image and test it.

.. code:: bash

   docker run --platform=linux/amd64 -p 8000:8000 tutorial-server-image

This runs the container and maps port 8000 on the host to port 8000 in the container.

In another terminal window, test the application with the command:

.. code:: bash

   curl localhost:8000/counter

Understand the Container Image
------------------------------

To help understand this container, it is useful to run it using the bash shell that is built into it.

.. code:: bash

   docker run -it --platform=linux/amd64 --entrypoint /bin/sh tutorial-server-image

Running some commands in this shows that the base container is based on Alpine Linux\* distribution and Python 3.11 release, and
contains the FastAPI and Uvicorn packages.

.. code:: bash

   /app $ cat /etc/issue
   Welcome to Alpine Linux 3.20
   Kernel \r on an \m (\l)

   /app $ python --version
   Python 3.11.10
   /app $ uvicorn --version
   Running uvicorn 0.34.0 with CPython 3.11.10 on Linux
   /app $ ls
   main.py
   /app $

Exiting the shell will terminate the container. See the
`Docker documentation <https://docs.docker.com/reference/cli/docker/container/run/>`_ for more information.
