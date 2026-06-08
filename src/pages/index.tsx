import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import { Ecosystem } from "../sections/Ecosystem";
import { HomePageHeader } from "../sections/HomePageHeader";
import { InstallOpenvino } from "../sections/InstallOpenvino";
import { Performance } from "../sections/Performance";

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={`${siteConfig.title} — documentation for the OpenVINO ecosystem.`}
    >
      <HomePageHeader />

      <InstallOpenvino />
      <Performance />
      <Ecosystem />
    </Layout>
  );
}
