import { useCurrentSpoke } from "@site/src/hooks/use-current-spoke";
import { useNavState } from "@site/src/hooks/use-nav-state";
import { SpokeSummary, useSpokes } from "@site/src/hooks/use-spokes";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import clsx from "clsx";

type Props = {
  label?: string;
  href?: string;
  to?: string;
  target?: string;
  position?: "left" | "right";
  className?: string;
  mobile?: boolean;
};

const getTo = (spoke: SpokeSummary) => {
  // Use only the pathname so DefaultNavbarItem treats this as an internal
  // route rather than an external `href`. This prevents Docusaurus from appending the external-link SVG icon.
  const base = new URL(spoke.href).pathname;

  // Docs live one segment below the spoke's landing, under `<rbp>/docs/`.
  if (spoke.id === "genai") {
    return `${base}docs/getting-started/introduction/`;
  }

  if (spoke.id === "physicalai") {
    return `${base}docs/getting-started/`;
  }

  return `${base}docs/`;
};

// Registered as `custom-documentationLink`. This keeps the documentation
// navbar link configurable from docusaurus.config.ts while allowing a
// dedicated custom navbar item type.
export default function DocumentationLinkNavbarItem(props: Props) {
  const spoke = useCurrentSpoke();
  const spokes = useSpokes();
  const { docsActive } = useNavState();
  const fallbackSpoke = spokes.find(({ id }) => id === "openvino") ?? spokes[0];
  const to = getTo(spoke ?? fallbackSpoke);

  return (
    <DefaultNavbarItem
      {...props}
      to={to}
      className={clsx(props.className, {
        "navbar__link--active": docsActive,
      })}
    />
  );
}
