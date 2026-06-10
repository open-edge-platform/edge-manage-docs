import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Mirrors the shape produced by docusaurus.config.ts customFields.spokes.
export type SpokeSummary = {
  id: string;
  label: string;
  description?: string;
  routeBasePath: string;
  repo: string;
  href: string;
};

export const useSpokes = () => {
  const { siteConfig } = useDocusaurusContext();

  return (siteConfig.customFields?.spokes ?? []) as SpokeSummary[];
};
