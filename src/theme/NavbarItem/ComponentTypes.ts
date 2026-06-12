import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import SpokeVersionDropdown from "@site/src/theme/NavbarItem/SpokeVersionDropdown";
import ProductGridDropdown from "@site/src/theme/NavbarItem/ProductGridDropdown";
import DocumentationLink from "@site/src/theme/NavbarItem/DocumentationLink";

// Register custom navbar item types so docusaurus.config.ts can wire them
// by `type: 'custom-...'`.
//   custom-spokeVersionDropdown — route-scoped per-spoke version dropdown.
//   custom-productGrid          — "OpenVINO Runtime" product card dropdown.
//   custom-documentationLink    — top-level documentation nav link.
export default {
  ...ComponentTypes,
  "custom-spokeVersionDropdown": SpokeVersionDropdown,
  "custom-productGrid": ProductGridDropdown,
  "custom-documentationLink": DocumentationLink,
};
