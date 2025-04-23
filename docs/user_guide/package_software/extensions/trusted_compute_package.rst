Trusted Compute Extension
========================================

Trusted Compute is a set of Software Defined Security extensions that utilize hardware security capabilities on the Open Edge Manageability Framework.

UserFlows
~~~~~~~~~~~~~~~
- **Host & Cluster**
- **Apps & Packages**
- **Deployments**

Host & Cluster
~~~~~~~~~~~~~~~
- **Provisioning:** make sure that we have edge node onboarded with Secureboot and Full Disk Encryption enabled.  
- **Cluster Creation** - Create a cluster using  privileged default-extension. from web-ui go to Infrastructure->clusters->Create Cluster-> provide Cluster Name and select privileged template and Version 
     click on next button select site click on next and select host and metadata -> create complete.    
- **Trusted Compute Compatible** - Cluster and hosts are tagged as "TrustedCompute Compatible"

Apps & Packages
~~~~~~~~~~~~~~~
- **Build Container Image:** For applications & Packages (workloads) that requires higher levels of isolation, add configuration to application’s Helm* chart to change runtime for container execution.
    here is sample templates.yaml file contents

    |  apiVersion: v1
    |  kind: Pod
    |  metadata:
    |    labels:
    |    name: {{ .Values.podName }}
    |    annotations:
    |  spec:
    |    containers:
    |      - image: <application name:<version>
    |        name: nginx
    |    runtimeClassName: {{ .Values.runtimeClassName }}

    here is value.yaml file contents 

    | runtimeClassName: kata-qemu
    | podName: <application-default>

- **Create Deployment Package:** Create deployment Package

Deployments
~~~~~~~~~~~~~~~
- **Deploy Trusted Compute Software Infrastructure** - To deploy the trusted compute extension, navigate to Deployment -> Deployment Packages -> Extensions -> Select the Trusted Compute package and deploy it to the desired cluster.
- **View Deployment status** - goto Deployments-> select your deployment -> check the deployment status.
- **Deploy customer/user application** - create a application deployment pckage using trusted compute extension requirement. add "runtimeClassName: kata-qemu" in "templates/<application>.yaml" file of application helm chart. once the application deployment package is created. got to deployments -> Deployment Packages -> select the application deployment package and deploy it to the desired cluster. 
- **View Deployment status** - goto Deployments-> select your deployment -> check the deployment status.

Continuous Monitoring Status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- **View Attestation Monitoring status** - goto Infrastructure-> select host you have added trusted compute extension -> check  Attestation