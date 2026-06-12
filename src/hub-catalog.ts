// Hub-owned content for each spoke (label and description). The hub
// landing page and navbar are the source of truth for how spokes are
// presented; spokes.yml only describes how to fetch and mount them.

export type SpokeCatalogEntry = {
  label: string;
  description: string;
};

export const SPOKE_CATALOG: Record<string, SpokeCatalogEntry> = {
  openvino: {
    label: "OpenVINO",
    description:
      "Open-source toolkit for deploying performant AI solutions in the cloud, on-prem, and on the edge.",
  },
  genai: {
    label: "OpenVINO GenAI",
    description: "Run and deploy generative AI models.",
  },
  physicalai: {
    label: "Physical AI",
    description:
      "Runtime documentation for PhysicalAI inference and deployment.",
  },
};

// Product cards rendered in the navbar "OpenVINO Runtime" dropdown and in
// the landing page Ecosystem section. A card is clickable iff `spokeId`
// matches an id in spokes.yml (looked up at render time via the
// site-config customField). Otherwise it renders disabled with a
// "Coming soon" badge.
export type ProductCard = {
  title: string;
  description: string;
  spokeId: string | null;
};

export const OpenVINOHub: ProductCard = {
  title: "OpenVINO Runtime",
  description: "Open-source toolkit for deploying performant AI solutions",
  spokeId: "openvino",
};

export const GenAIHub: ProductCard = {
  title: "OpenVINO GenAI",
  description: "Optimizing pipelines for running generative AI models",
  spokeId: "genai",
};

export const PhysicalAIHub: ProductCard = {
  title: "Physical AI",
  description: "Runtime documentation for PhysicalAI inference and deployment",
  spokeId: "physicalai",
};

export const PRODUCT_CARDS: readonly ProductCard[] = [OpenVINOHub, GenAIHub, PhysicalAIHub];
