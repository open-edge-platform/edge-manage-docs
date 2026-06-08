import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DottedCardDetails } from "../components/DottedCardDetails/DottedCardDetails";
import { Section } from "../components/Section/Section";
import { useSpokeHref } from "../hooks/use-spoke-href";
import { OpenVINOHub } from "../hub-catalog";
import styles from "./Performance.module.css";
import { useAssetUrl } from "../hooks/use-asset-url";

export const Performance = () => {
  const assetUrl = useAssetUrl();
  const href = useSpokeHref(OpenVINOHub.spokeId);

  return (
    <Section>
      <Section.Icon>
        <img
          className={styles.icon}
          src={assetUrl("img/performance.png")}
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
          <img
            className={styles.blendModeLighten}
            src={assetUrl("img/openvino-runtime.png")}
          />
        </div>
        <DottedCardDetails
          title="Optimize for latency"
          learnMoreLink={String(href)}
          code={[
            {
              lang: "python",
              code: `compiled_model_latency = core.compile_model(
              model,
              "CPU",
              config={"PERFORMANCE_HINT": "LATENCY"})`,
            },
          ]}
        />

        <DottedCardDetails
          title={
            <>
              Optimize for <br /> throughput
            </>
          }
          learnMoreLink={String(href)}
          code={[
            {
              lang: "python",
              code: `compiled_model_throughput = core.compile_model(
              model,
              "CPU",
              config={"PERFORMANCE_HINT": "THROUGHPUT"})`,
            },
          ]}
        />
        <div>
          <img
            className={styles.blendModeLighten}
            src={assetUrl("img/throughput-runtime.png")}
          />
        </div>
      </div>
    </Section>
  );
};
