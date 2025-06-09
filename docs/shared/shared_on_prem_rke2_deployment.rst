Other RKE2 Deployment Issues
============================

#. Pod Creation Fails

At the time of writing this document, this is a `known RKE2 issue <https://docs.rke2.io/known_issues#canal-and-ip-exhaustion>`_.

When checking the logs of the affected pods, you may observe the following error:

    .. code-block:: bash

       plugin type="portmap" failed (add): failed to open iptables: exec: "iptables": executable file not found in $PATH

To resolve this problem, please install `iptables`.
