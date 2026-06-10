import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type Props = {
  alt?: string;
  src: string;
  target?: string;
  className?: string;
  mobile?: boolean;
};

// Registered as `custom-intelLogo`. This renders the brand logo via
// navbar items so docusaurus.config.ts can fully control logo wiring.
export default function IntelLogoNavbarItem({
  alt = "Intel logo",
  src,
  target = "_self",
  className,
  mobile,
}: Props) {
  const logoSrc = useBaseUrl(src);
  const { siteConfig } = useDocusaurusContext();

  if (mobile) return null;

  return (
    <a
      href={siteConfig.baseUrl}
      target={target}
      className={`navbar__brand ${className ?? ""}`.trim()}
    >
      <img className="navbar__logo" src={logoSrc} alt={alt} />
    </a>
  );
}
