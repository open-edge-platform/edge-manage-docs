Helm* for Tutorial Server
-------------------------

In the previous step we created generic Helm\* Chart for the Tutorial Server.
In this step we will customize the Tutorial Server Deployment in the Helm
Chart and will do the same to the Tutorial Web UI in the next step.

Remove Unwanted Files
~~~~~~~~~~~~~~~~~~~~~~~

To simplify the deployment, you must remove the following files from the **templates** directory:

.. code:: shell

    cd tutorial-server
    rm templates/hpa.yaml
    rm templates/ingress.yaml

Modify the Deployment
~~~~~~~~~~~~~~~~~~~~~~~~

values.yaml
*************

#. Add Values: Add to **values.yaml** file the following variables to be used in the template:

   .. code:: yaml

        # Add this to the values.yaml file at the top before "replicaCount:"
        tutorialServer:
          greeting: "Deployed by Helm"
          initialCount: 0

#. Change Port: There is also a change in **service.port** needs to be made to the values.yaml file
   to match the port used in the Dockerfile and the FastAPI application.

   .. code:: yaml

        # Change this to the values.yaml file under "service:"
        service:
          type: ClusterIP
          port: 8000

   .. note::
      Here, you must leave the service type as **ClusterIP**. This is the default type and
      means that the service is only accessible from within the cluster. This is suitable for
      a backend server that is not exposed to the outside world.

#. Update Repository: The **image.repository** needs to be changed to match the container image:

   .. code:: yaml

        # Change this to the values.yaml file under "image:"
        image:
          repository: tutorial-server-image
          pullPolicy: IfNotPresent

#. Update Security Context: Update **securityContext** to secure the deployment:

   .. code:: yaml

       securityContext:
         capabilities:
           drop:
             - ALL
         readOnlyRootFilesystem: true
         runAsNonRoot: true
         runAsUser: 65534 # nobody


Chart.yaml
*************

#. Update AppVersion: Modify the **Chart.yaml** file changing the `appVersion` to match the tag **0.1.0** we will give the
   docker image in :doc:`../deploying-applications/pushing_charts_and_images`:

   .. code:: yaml

        # Change this to the Chart.yaml file under "appVersion:"
        appVersion: "0.1.0"

templates/deployment.yaml
**************************

The **deployment.yaml** file contains the Deployment definition for the Tutorial Server.

#. Add environment variables: Modify the **templates/deployment.yaml** file to use these variables:

   .. code:: yaml

        # Add this to the deployment.yaml file under "spec.template.spec.containers" after "imagePullPolicy:" indented by 10 spaces
        env:
          - name: TUTORIAL_GREETING
            value: {{ .Values.tutorialServer.greeting | quote }}
          - name: INITIAL_COUNT
            value: {{ .Values.tutorialServer.initialCount | quote }}

Checking the Helm chart
~~~~~~~~~~~~~~~~~~~~~~~

Running **helm lint** (while back out to the **tutorial-charts** directory) on the chart is recommended to check for
any errors.

.. code:: shell

    helm lint ./tutorial-server

Then run the helm template to check the output of the chart.

.. code:: shell

    helm -n tutorial template --release-name foobar ./tutorial-server --set image.tag=latest

The output under Deployment -> spec.templates.spec.containers should look like the following
where the environment variables, image, and port are set properly:

.. code:: yaml

      containers:
        - name: tutorial-server
          securityContext:
            {}
          image: "tutorial-server-image:latest"
          imagePullPolicy: IfNotPresent
          env:
            - name: TUTORIAL_GREETING
              value: "Deployed by Helm"
            - name: INITIAL_COUNT
              value: "0"
          ports:
            - name: http
              containerPort: 8000
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {}

.. note::
    Here the root endpoint **/** is the testing point for liveness and readiness. This will
    retrieve the greeting message. It does not matter what the content is, but if the status message
    is not 200, then Kubernetes\* platform will regard the pod as unhealthy and restart it.


Testing the Helm chart
~~~~~~~~~~~~~~~~~~~~~~

At this stage, it is possible to test the Helm chart by installing it on a Kubernetes cluster.

.. note::
    This level of testing is included for demonstration purposes. Many developers will be able to
    skip this step and go straight to the next step of deploying through |software_prod_name|.

There are many frameworks that allow you run Kubernetes cluster on your local machine. In this example, use
`KinD <https://kind.sigs.k8s.io/>`_

Once it is installed on your system, you can create a cluster with the command:

.. code:: shell

    kind version
    kind create cluster
    kubectl cluster-info
    kubectl get nodes

KinD does not have access to the local Container images so we need to load the image into the KinD cluster.

.. code:: shell

    kind load docker-image tutorial-server-image:latest

Then you can install the Helm chart on the KinD cluster.

.. code:: shell

    helm -n tutorial install --create-namespace tutorial-server ./tutorial-server --set image.tag=latest

This should deploy within a few seconds and we can check the status and get the service details:

.. code:: shell

    kubectl -n tutorial get all

    NAME                                  READY   STATUS    RESTARTS   AGE
    pod/tutorial-server-dc55b9b9f-87hnr   1/1     Running   0          5m24s

    NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
    service/tutorial-server   ClusterIP   10.96.218.220   <none>        8000/TCP   5m24s

    NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/tutorial-server   1/1     1            1           5m24s

    NAME                                        DESIRED   CURRENT   READY   AGE
    replicaset.apps/tutorial-server-dc55b9b9f   1         1         1       5m24s


At this stage, it is possible to test the application using curl or a web browser through a port-forward:

.. code:: shell

    kubectl -n tutorial port-forward service/tutorial-server 8000:8000

And in another terminal window, you can test the application with the command:

.. code:: shell

    curl -X GET http://localhost:8000/counter
    curl -X POST http://localhost:8000/increment

The next step create the Helm Chart for the Tutorial Web UI.
