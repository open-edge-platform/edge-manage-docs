import { useSpokes } from "./use-spokes";

// Returns the absolute URL for a spoke by id, or `null` if no spoke with
// that id is configured in spokes.yml. Components use this to decide
// whether a product card is clickable; cards whose spokeId resolves to
// null render as disabled with a "Coming soon" badge.
export const useSpokeHref = (spokeId: string | null): string | null => {
  const spokes = useSpokes();

  if (!spokeId) return null;

  return spokes.find((s) => s.id === spokeId)?.href ?? null;
};
