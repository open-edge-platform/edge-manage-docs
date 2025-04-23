Edge Orchestrator Configuration for Edge Node
################################################

Edge Orchestrator uses default settings for installation. If your network or services
require specific settings, see the information below.

- netIP - Set by default to dynamic. This is required to prevent communication problems
  with the Kubernetes cluster. This value can be set to static, but it is not recommended.
- firewallCfgAllow - Set the environment firewall to Allow. Retain the existing ports,
  ipVer and protocol configurations. Use a blank value (“”) or remove the elements if not
  required for firewall configuration.
- ntpServer - Update to the NTP server used by the environment. Reachable by the network.
