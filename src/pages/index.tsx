import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import { Ecosystem } from "../Sections/Ecosystem";
import { Performance } from "../Sections/Performance";
import { HomePageHeader } from "../Sections/HomePageHeader";
import { InstallOpenvino } from "../Sections/InstallOpenvino";

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
