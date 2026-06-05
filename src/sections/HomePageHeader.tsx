import { CardDetails } from "../components/CardDetails";
import styles from "./HomePageHeader.module.css";
import { Section } from "@site/src/components/Section/Section";

export const HomePageHeader = () => {
  return (
    <Section>
      <h1 className={styles.heroTitle} data-text="Deploy AI anywhere">
        Deploy AI anywhere
      </h1>
      <h1 className={styles.heroSubtitle}>Run it at full speed</h1>
      <p className={styles.description}>
        An open-source toolkit for running AI models — from Generative AI to
        computer vision — optimized for maximum performance across CPU, GPU, and
        NPU. Build once, deploy anywhere.
      </p>

      {/* Hub-static marketing blocks; intentionally not data-driven. */}
      <div className={styles.cards}>
        <CardDetails
          maxIconWidth={78}
          iconUrl="/img/hardware.png"
          title={"One model - any Intel hardware"}
          description="Run your model on CPU, GPU, and NPU without changing your code. Automatic device detection and fallback for maximum compatibility."
        />

        <CardDetails
          maxIconWidth={60}
          iconUrl="/img/ai.png"
          title={<>Built for {<br />}Generative AI</>}
          description="Supports LLMs, multi-modal models, and vision-language models — with optimizations like int4/int8 compression and KV-cache for peak throughput."
        />

        <CardDetails
          maxIconWidth={70}
          iconUrl="/img/performance.png"
          title={<>Max performance, {<br />}min footprint</>}
          description="Advanced model compression, int4/int8 inference, and precision tuning close the gap with GPU performance on embedded and mobile devices."
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.architecture}>
        <h2>OpenVINO Architecture overview</h2>
        <p>
          From popular frameworks to optimized inference across heterogeneous
          hardware. All through a unified OpenVINO stack.
        </p>

        <video
          loop
          muted
          autoPlay
          src="/video/energy_flows.mp4"
          controls={false}
        />
      </div>
    </Section>
  );
};
