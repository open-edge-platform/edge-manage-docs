import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const useAssetUrl = () => {
  const { siteConfig } = useDocusaurusContext();
  const siteOrigin = siteConfig.url.replace(/\/+$/, "");

  return (assetPath: string) =>
    `${siteOrigin}${siteConfig.baseUrl}${assetPath.replace(/^\/+/, "")}`;
};
