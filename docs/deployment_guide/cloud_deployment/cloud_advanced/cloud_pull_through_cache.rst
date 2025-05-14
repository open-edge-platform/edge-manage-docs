Set up Pull-through Cache for Cloud Deployment
===============================================

A pull-through cache is a caching mechanism that stores container images in your Amazon Elastic Container Registry\* (Amazon ECR\*).
This cache can be used to reduce the time it takes to download images from the Internet.
It also prevents rate limiting from certain registries such as Docker Hub\* or GitHub\* container registry.

This section describes how to set up a pull-through cache for your cloud deployment.


.. note::

  Alternatively, you can create a pull-through cache by referring to the `official AWS documentation <https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html>`_.

.. note::

  Intel uses the ``us-west-2`` region in this example. You can change the region in the AWS\* CLI commands and the Amazon ECR URL as per your requirement.

1. Prepare Pull-Through Cache Secrets
--------------------------------------

You need to prepare two secrets (type: "Other type of secret") in the AWS Secrets Manager:

- ``ecr-pullthroughcache/ghcr``: For GitHub Container Registry.
- ``ecr-pullthroughcache/dockerio``: For Docker Hub.

Each secret must contain the following fields:

- ``username``: The username for the registry.
- ``accessToken``: The access token for the registry.

2. Configure ECR Pull-Through Cache
------------------------------------

Repository Creation Template
`````````````````````````````

1. Navigate to **Private registry** > **Feature & Settings** > **Repository creation templates**.
2. Click **Create template**.
3. In the template details, select **Pull through cache** and choose **Any prefix in your ECR registry**.
4. In Repository settings, set **Image tag mutability** to **Mutable** and set **Encryption configuration** to **AES-256**.
5. Leave other fields empty and click **Create** on the last page.

Pull-Through Cache Rules
``````````````````````````

You need to create pull-through rules for following upstream registries:

- ``registry-1.docker.io``
- ``ghcr.io``
- ``registry.k8s.io``
- ``quay.io``

Do the following for each upstream registry:

1. Navigate to **Private registry** > **Features & Settings** > **Pull through cache**.
2. Click **Add rule**.
3. For authentication, select the secret you created in the previous step if prompted.
4. For **Cache namespace**, select **A specific prefix**. Use the following prefixes for the respective registries:

  - ``dockercache`` for ``registry-1.docker.io``
  - ``ghcrcache`` for ``ghcr.io``
  - ``k8scache`` for ``registry.k8s.io``
  - ``quaycache`` for ``quay.io``

5. For **Upstream namespace**, select **No prefix**.
6. Click **Create**.

3. Test the Pull-Through Cache
-------------------------------

To verify the setup:

1. Log in to the AWS CLI and authenticate with Docker login (replace ``[your account]`` with your AWS account ID):

.. code-block:: shell

  aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin [your account].dkr.ecr.us-west-2.amazonaws.com


2. Pull the Alpine Linux\* image from the Amazon ECR pull-through cache (replace ``[your account]`` with your AWS account ID):

.. code-block:: shell

  docker pull [your account].dkr.ecr.us-west-2.amazonaws.com/dockercache/library/alpine:3

3. Verify in the Amazon ECR UI that the image ``dockercache/library/alpine:3`` has been created.

4. Enable Pull-Through Cache to Edge Orchestrator Cluster
----------------------------------------------------------

To enable the pull-through cache for your Edge Orchestrator cluster, add ``--enable-cache-registry`` in the `Provision Required AWS Resources <#provision-required-aws-resources>`__ step.
