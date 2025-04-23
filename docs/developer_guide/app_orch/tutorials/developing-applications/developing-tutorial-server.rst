Developing the Tutorial Server
==============================

Fast API First Steps
--------------------

First we develop a FastAPI\* application such that it can run and be tested locally.

.. note::
    In this tutorial commands are written for a Unix-like operating system. If you are using Windows\* OS, you may need to
    adjust the commands accordingly.

Ensure Python\* programming language is installed on your PC and create a new directory for the project.

.. code:: bash

    mkdir tutorial-server
    cd tutorial-server

Create a virtual environment and activate it.

.. code:: bash

    python3 --version
    python3 -m venv venv
    echo "venv" >> .gitignore
    source venv/bin/activate
    pip install --upgrade pip

Create a requirements file and install the required packages.

.. code:: bash

    echo "fastapi[standard]~=0.115.12" > requirements.txt
    echo "uvicorn~=0.34.0" >> requirements.txt
    pip install -r requirements.txt

.. note::
    You should see output showing the packages being installed. If you got an error along the way it is possible the
    version of Python you are using is not compatible with the versions of the packages. These versions in the
    requirements file are known to work with **Python 3.13** release. You might have multiple versions of Python installed on your
    computer - check with the command: **which -a python3**. If you have multiple versions, you can specify the version
    explicitly when creating the virtual env (venv) above.

Following `Fast API First Steps document <https://fastapi.tiangolo.com/tutorial/first-steps/>`_, copy the following code
into a file named `main.py` in the project directory.

.. code-block:: python
    :linenos:

    #!/usr/bin/python3

    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    async def read_root():
        return {"message": "Hello World"}

.. note::
    Ensure the code is indented correctly because Python programming is sensitive to indentation.


And run the program locally with the following command

.. code:: bash

    fastapi dev main.py

In another terminal, run the following command to test the application

.. code:: bash

    curl localhost:8000

and it should reply with:

.. code:: json

    {"message":"Hello World"}


Additions to the FastAPI Application
------------------------------------

Now that we have the basics in place we want to add our code to perform the functions related to the counter.

Update the `main.py` file with the following code:

.. code-block:: python
    :linenos:

    #!/usr/bin/python3

    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import os

    origins = [
        "http://localhost:3000",
    ]

    app = FastAPI()

    """Necessary to allow CORS (Cross-Origin Resource Sharing) for the web UI"""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET, POST"],
        allow_headers=["*"],
    )

    class Counter(BaseModel):
        count: int

    initial_value = int(os.environ.get('INITIAL_COUNT', '0'))
    counter = Counter(count=initial_value)

    @app.get("/")
    async def read_root():
        """Return a greeting message based on the environment variable TUTORIAL_GREETING"""
        tutorial_greeting = os.environ.get('TUTORIAL_GREETING', 'Hello World')
        return {"message": tutorial_greeting}

    @app.get("/counter")
    async def read_counter():
        """Return the current count"""
        return counter

    @app.post("/increment")
    async def increment_counter():
        """Increase the counter by 1 and return it"""
        counter.count += 1
        return counter

    @app.post("/decrement")
    async def decrement_counter():
        """Decrease the counter by 1 and return it"""
        counter.count -= 1
        return counter

    @app.post("/reinitialize")
    async def reinitialize_counter():
        """Reinitialize the counter to the initial value and return it"""
        counter.count = initial_value
        return counter

.. note::
    That's it - the server is now complete.
    This uses a simple counter in memory to maintain the count. In a real application this would
    require a database or other persistent storage, and would need an "atomic" operation to ensure
    the count is not corrupted by multiple requests.

Testing the Tutorial Server
---------------------------

Now that we have developed our Tutorial Server we want to test it.

In the code above we have modified the root endpoint to return a message based on the environment variable
`TUTORIAL_GREETING`. Also the counter is initialized through the INITIAL_COUNT environment variable, so that we can
control these at start up of the program. We will demonstrate how these can be controlled by the user on an Edge
Deployment later in this tutorial.

For the moment can set these variables and test the application. Start the server again with the following
command:

.. code:: bash

    TUTORIAL_GREETING="Welcome to the tutorial" INITIAL_COUNT=5 fastapi dev main.py

In a separate terminal, run the command:

.. code:: bash

    curl localhost:8000

and it should reply with:

.. code:: json

    {"message":"Welcome to the tutorial"}

The other endpoints can be tested in a similar way. For example, to increment the counter:

.. code:: bash

    curl -X POST localhost:8000/increment

and it should reply with:

.. code:: json

    {"count":6}

Because Fast API generates a REST API out of these specially annotated functions, it is easy to produce a client to
test it. Indeed opening a Web Browser and going to **http://localhost:8000/docs** will show the Swagger\* UI, which can be
used directly

The `OpenAPI 3.1 specification <https://spec.openapis.org/oas/v3.1.0.html>`_ for the Tutorial Server can be found at
**http://localhost:8000/openapi.json** and imported in to many tools such as
`Postman <https://www.postman.com/product/what-is-postman/>`_ or `Insomnia <https://insomnia.rest/>`_.
