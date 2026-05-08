import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Mirrors the shape produced by docusaurus.config.ts customFields.spokes.
export type SpokeSummary = {
  id: string;
  label: string;
  description?: string;
  routeBasePath: string;
  repo: string;
  href: string;
};

// Returns the absolute URL for a spoke by id, or `null` if no spoke with
// that id is configured in spokes.yml. Components use this to decide
// whether a product card is clickable; cards whose spokeId resolves to
// null render as disabled with a "Coming soon" badge.
export function useSpokeHref(spokeId: string | null): string | null {
  const { siteConfig } = useDocusaurusContext();
  if (!spokeId) return null;
  const spokes = (siteConfig.customFields?.spokes ?? []) as SpokeSummary[];
  return spokes.find((s) => s.id === spokeId)?.href ?? null;
}
