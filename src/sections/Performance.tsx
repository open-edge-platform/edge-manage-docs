import { DottedCardDetails } from "../components/DottedCardDetails/DottedCardDetails";
import { Section } from "../components/Section/Section";
import styles from "./Performance.module.css";

export const Performance = () => {
  return (
    <Section>
      <Section.Icon>
        <img
          className={styles.icon}
          src="/img/performance.png"
          alt="performance"
        />
      </Section.Icon>

      <Section.Title>Performance that matters</Section.Title>

      <Section.Description>
        Choose the right performance mode — ultra‑low latency for
        <br /> real‑time responses or maximum throughput at scale.
      </Section.Description>

      <div className={styles.grid}>
        <div>
          <img src="/img/openvino-runtime.png" />
        </div>
        <DottedCardDetails
          title="Optimize for latency"
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={`compiled_model_latency = core.compile_model(
              model,
              "CPU",
              config={"PERFORMANCE_HINT": "LATENCY"})`}
        />

        <DottedCardDetails
          title={
            <>
              Optimize for <br /> throughput
            </>
          }
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={`compiled_model_throughput = core.compile_model(
              model,
              "CPU",
              config={"PERFORMANCE_HINT": "THROUGHPUT"})`}
        />
        <div>
          <img src="/img/throughput-runtime.png" />
        </div>
      </div>
    </Section>
  );
};
