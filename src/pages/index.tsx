import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EcosystemSection from "@site/src/components/EcosystemSection";
import Layout from "@theme/Layout";
import React from "react";
import { HomePageHeader } from "../sections/HomePageHeader";

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={`${siteConfig.title} — documentation for the OpenVINO ecosystem.`}
    >
      <HomePageHeader />

      <EcosystemSection />
    </Layout>
  );
}
