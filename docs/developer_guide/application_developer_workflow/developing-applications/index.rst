Develop Applications
====================

Applications developed for the |software_prod_name| platform are written as
Cloud Native applications that run in a containerized environment.

.. note::

   This page focuses on developing new applications. If you have already
   developed an application and want to deploy it, then move on to the
   :doc:`../packaging-applications/index` page.

Containerized environments are usually Linux-based execution environments that
run applications in isolated containers, relying only on the host OS kernel
and low-level OS libraries (in Linux). Containers are lightweight and portable,
and can be run on any system that supports the container runtime.

A variety of different languages and frameworks can be used to develop
applications for the |software_prod_name| platform, as long as they can be
configured to run in a Linux containerized environment. The most common
languages and frameworks used are Go\*, Java\*, Python\*, and JavasScript\* (on
Node.js). Each of these languages has its own set of tools and frameworks
that can be packaged into the container at packaging time.

Architecture and Design
-----------------------

It is important to have an architectural plan, high-level design, and low-level
design for your application before developing it. This is usually done while
choosing the development language and framework.

Many cloud-native applications are designed to be microservices rather than
monolithic applications. Microservices are small independent services that work
together to form a larger application. Each microservice is responsible for a
specific function and communicates with other microservices using APIs.
Therefore, depending on your needs, the application may be architected as a
number of microservices. Developers are encouraged to explore the `Cloud Native
Computing Foundation Projects <https://cncf.io/projects>`_ to find
microservices that you can reuse in your application, to prevent duplicating
effort.

Cloud-native applications perform best when they are scalable, resilient, and
fault-tolerant. This means they can handle a large number of requests, recover
from failures, and continue to operate when parts of the application fail. The
Kubernetes platform has many built-in features that can help you build
scalable, resilient, and fault-tolerant applications. For instance, when
deploying, you can use `Horizontal Pod Autoscaler` to automatically scale the
number of instances of your application running in a multi-node Edge Node
cluster (for more, see the :doc:`../deployment-helm/index`).

Microservices like `etcd` can be used to attain consensus of stored data
between nodes.

Libraries like `Prometheus` can be used to monitor the health and performance
of your applications.

Kubernetes features like Persistent Volumes can be used to store data that
needs to be persisted between restarts of your application.

While many of these features are chosen in the deployment metadata (Helm
Charts), it is important to design your application to take advantage of these
features natively.

The `12 Factor App <https://12factor.net/>`_ methodology gives useful
guidance on designing your application.

Best Practices for Development
------------------------------

Best development practices include:

* Persisting code in a version control system like Git.

* Having accompanying Unit Tests to ensure functions in the code work as
  expected.

* Linting and formatting code to ensure it is readable and maintainable.

* Having clear and concise documentation to help others understand the code.

* Using a Continuous Integration/Continuous Deployment (CI/CD) pipeline to
  automate the building, testing, and deployment of the application.

An Integrated Development Environment (IDE) is a great aid to following
these good practices. Many are integrated with AI tools that help with code
completion and code understanding, which can speed development. Recommending
one is beyond the scope of this document, but a search on the public
internet will reveal many options.

There are many tutorials, courses, and documentation on the internet that can
help you learn how to develop applications in an appropriate language or
framework.

Edge Applications
-----------------

It is important to consider why the cloud-native application you are
developing is planned to be deployed on the Edge (and not some hyper-scaler
cloud environment). Reasons may include:

1. The laws of physics - the latency of the network transport might mean that
   your application needs to be at the Edge close to sensors and actuators for
   fast and reliable responses.

2. The law of the land - data sovereignty laws might mean that data collected
   by your application must be stored and processed in a specific location.

3. The law of economics - the cost of sending data to a cloud data center
   might be prohibitive, and it might be cheaper to process the data at the
   Edge.

These factors may feed into the design of your application, and the way it is
developed and deployed.
