import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import EcosystemSection from '@site/src/components/EcosystemSection';
import styles from './index.module.css';

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={`${siteConfig.title} — documentation for the OpenVINO ecosystem.`}
    >
      <Hero />
      <MarketingCards />
      <EcosystemSection />
    </Layout>
  );
}

function Hero(): React.JSX.Element {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Deploy AI anywhere.
          <br />
          Run it at full speed.
        </h1>
        <p className={styles.heroSubtitle}>
          An open-source toolkit for running AI models — from Generative AI
          to computer vision — optimized for maximum performance across
          CPU, GPU, and NPU. Build once, deploy anywhere.
        </p>
      </div>
    </section>
  );
}

// Hub-static marketing blocks; intentionally not data-driven.
function MarketingCards(): React.JSX.Element {
  return (
    <section className={styles.cards}>
      <div className={styles.mcard}>
        <h3 className={styles.mcardTitle}>One model · any Intel hardware</h3>
        <p className={styles.mcardDesc}>
          Run your model on CPU, GPU, and NPU without changing your code.
          Automatic device detection and fallback for maximum compatibility.
        </p>
      </div>
      <div className={styles.mcard}>
        <h3 className={styles.mcardTitle}>Built for Generative AI</h3>
        <p className={styles.mcardDesc}>
          Supports LLMs, multi-modal models, and vision-language models —
          with optimizations like int4/int8 compression and KV-cache for
          peak throughput.
        </p>
      </div>
      <div className={styles.mcard}>
        <h3 className={styles.mcardTitle}>Max performance, min footprint</h3>
        <p className={styles.mcardDesc}>
          Advanced model compression, int4/int8 inference, and precision
          tuning close the gap with GPU performance on embedded and mobile
          devices.
        </p>
      </div>
    </section>
  );
}
