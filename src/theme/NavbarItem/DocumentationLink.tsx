import React from "react";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import { SpokeSummary, useSpokes } from "@site/src/hooks/use-spokes";
import { useCurrentSpoke } from "@site/src/hooks/use-current-spoke";

type Props = {
  label?: string;
  href?: string;
  to?: string;
  target?: string;
  position?: "left" | "right";
  className?: string;
  mobile?: boolean;
};

const getHref = (spoke?: SpokeSummary) => {
  if (spoke === undefined) {
    return "/";
  }

  if (spoke.id === "genai") {
    return `${spoke.href}getting-started/introduction/`;
  }

  if (spoke.id === "physicalai") {
    return `${spoke.href}getting-started/`;
  }

  return "/openvino";
};

// Registered as `custom-documentationLink`. This keeps the documentation
// navbar link configurable from docusaurus.config.ts while allowing a
// dedicated custom navbar item type.
export default function DocumentationLinkNavbarItem(
  props: Props,
): React.JSX.Element {
  const spoke = useCurrentSpoke();

  return <DefaultNavbarItem {...props} href={getHref(spoke)} />;
}
