import { useLocation } from "@docusaurus/router";
import { useSpokes } from "./use-spokes";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const useCurrentSpoke = () => {
  const spokes = useSpokes();
  const { pathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();

  const baseUrl = (siteConfig.baseUrl ?? "/").replace(/\/?$/, "/");
  const baseUrlFirstSegment = baseUrl.split("/").filter(Boolean)[0];

  const spokeFromBaseUrl = baseUrlFirstSegment
    ? spokes.find((s) => s.routeBasePath === baseUrlFirstSegment)
    : undefined;

  if (spokeFromBaseUrl) return spokeFromBaseUrl;

  const rest = pathname.startsWith(baseUrl)
    ? pathname.slice(baseUrl.length)
    : pathname;

  const spokeSegment = rest.split("/").filter(Boolean)[0];

  if (!spokeSegment) {
    return spokes.find(({ id }) => id === "openvino");
  }

  return spokes.find(({ routeBasePath }) => routeBasePath === spokeSegment);
};
