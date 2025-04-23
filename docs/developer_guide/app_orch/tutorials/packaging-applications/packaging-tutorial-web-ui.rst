Packaging Tutorial Web UI
=========================

Setup for static output
-----------------------

By default, the Next.js framework creates a server-side rendered application. For the Tutorial Web UI we want the output to be
static files that can be served by a web server. We will use NGINX* web server for this.

To do this we need to set the `output` option in the `next.config.ts` file to `export`.

.. code:: typescript

    const nextConfig = {
        output: 'export',
    }

This will allow us to use the `npx next build` command to create the production ready static files in the Dockerfile.

Creating a Dockerfile
---------------------

Similar to the Tutorial Server, the Tutorial Web UI application needs to be
packaged in a Container image.

We want it to serve the static files from the Next.js application, but we want the
Node.js* server available to minify these files in the first place. We don't need
to have the Node.js server running in the final image, so we will use a multi-stage
build to create the final image.

The first stage will build the application and the second stage will copy the
results in to a minimal NGINX image.

.. note::
    The NGINX image is much smaller than the Node.js image, and so the final image will be smaller.
    Again we only take base images from reputable sources.

Add the following to a file `Dockerfile` in the `tutorial-web-ui` directory.

.. code:: dockerfile

    # Stage 1: Build the application
    FROM node:22 AS build

    WORKDIR /app

    COPY package.json package-lock.json next-env.d.ts postcss.config.mjs tsconfig.json next.config.ts ./

    RUN npm install

    COPY app app
    COPY public public

    RUN npx next build

    # Stage 2: Serve the application
    FROM nginxinc/nginx-unprivileged:alpine-perl

    EXPOSE 8080

    USER nginx

    COPY --from=build /app/out /usr/share/nginx/html


Build the Container image
--------------------------

Build the Container image using the Dockerfile.

.. code:: bash

    docker build --platform=linux/amd64 -t tutorial-web-ui-image .

Examining the Container image shows is 1/10th the size of the Tutorial Server image
because we were able to use a multi-stage build.

.. code:: bash

    ~ $ docker images | grep "tutorial.*image"

.. code::

   tutorial-web-ui-image   latest    979019e086eb   47 minutes ago   87.2MB
   tutorial-server-image   latest    16bc7692277d   50 minutes ago   563MB


Testing the Container image
-----------------------------

.. code:: bash

    docker run -p 8080:8080 tutorial-web-ui-image

Open your web browser to **http://localhost:8080** to see the default page.

The Tutorial Web UI application is now running in a Container image but is
not yet connected to the Tutorial Server.

In the development stage we had a special mapping that pointed to the API
at **http://localhost:8000**. This is not available in the final image, and now we
are in **production** mode, so it expects to access the API at the
same URL from which the HTML, CSS, and JavaScript\* files are served.

We will see how to set this up in the next section.

.. note::
    This is a security feature of modern browsers to prevent cross-site scripting.


Understanding the Container image
---------------------------------

Similar to the Tutorial Server, we can jump in to this container image to inspect it.

.. code:: bash

    docker run -it --platform=linux/amd64 --entrypoint /bin/sh tutorial-web-ui-image

Running some commands in this shows that the base container is based on the Alpine Linux\* distribution.

.. code:: bash

    ~ $ cat /etc/issue
    Welcome to Alpine Linux 3.21
    Kernel \r on an \m (\l)

    ~ $ uname -a
    "Linux 2337e849911f 6.10.14-linuxkit #1 SMP Fri Nov 29 17:22:03 UTC 2024 x86_64 Linux"

    ~ $ ls /usr/share/nginx/html
    404.html     50x.html     _next        favicon.ico  file.svg     globe.svg    index.html   index.txt    next.svg     vercel.svg   window.svg
    ~ $ ls /etc/nginx/conf.d/default.conf
    /etc/nginx/conf.d/default.conf

    ~ $ nginx -V
    nginx version: nginx/1.27.4
    built by gcc 14.2.0 (Alpine 14.2.0)
    built with OpenSSL 3.3.2 3 Sep 2024 (running with OpenSSL 3.3.3 11 Feb 2025)
    TLS SNI support enabled
    ...

    ~ $ whoami
    nginx
    ~ $
