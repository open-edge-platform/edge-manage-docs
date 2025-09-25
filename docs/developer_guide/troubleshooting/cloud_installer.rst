#### Elastic ip limit reached
```
Regions are given 5 Eips by default.
7 is needed for the orchestrator.
To request more you need to contact amazon support.
This can done on externel accounts.
hibrid accounts require extra configeration to use private vpc ip address
```

#### Error: no matching Route 53 Hosted Zone found
```
Error: no matching Route 53 Hosted Zone found

  with module.route53_orch.data.aws_route53_zone.parent_public[0],
  on ../../module/orch-route53/main.tf line 13, in data "aws_route53_zone" "parent_public":
  13: data "aws_route53_zone" "parent_public" {
```
Need to create hosted zone manually that matches root domain

#### Error: Variable TF_VAR_tls_key is not set
```
add option --autocert
```
#### The installer hangs on s3 bucket pull
```
make sure the no_proxy is set, even when using externel deployments
```
#### Acme challenge fail
````
Hint: The Certificate Authority failed to verify the DNS TXT records created by --dns-route53. Ensure the above domains have their DNS hosted by AWS Route53.

Some challenges have failed.
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.
````
To fix go to route53 registered domains and buy a new domain, or change to one thats already there.

#### can't start ssh tunnel
```
orchestrator-admin:~$ curl -L -4 iprs.fly.dev
<public ip address>
orchestrator-admin:~$ ./start-tunnel.sh 
Info: Starting SSH tunnel...
Info: SSH tunnel created.
orchestrator-admin:~$ 
```
Get public ip address, and through the AWS web ui, add it to the inbound security rules of your jumphost with /32 eg 134.<>.<>.<>/32 allow ssh
Or if you have your public ip address before install, add it to the `--jumphost-ip-allow-list` option of the provision.sh


