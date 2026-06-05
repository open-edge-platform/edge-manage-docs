import { Code } from "../components/Code/Code";
import { DottedCardDetails } from "../components/DottedCardDetails/DottedCardDetails";
import { Section } from "../components/Section/Section";
import styles from "./Ecosystem.module.css";

export const Ecosystem = () => {
  return (
    <Section>
      <Section.Icon>
        <img className={styles.icon} src="/img/ecosystem.png" alt="Ecosystem" />
      </Section.Icon>

      <Section.Title>Ecosystem</Section.Title>

      <Section.Description>
        <>
          A unified toolkit for building, optimizing, and deploying AI across
          <br /> diverse workloads and domains.
        </>
      </Section.Description>

      <div className={styles.grid}>
        <DottedCardDetails
          title="OpenVINO GenAI"
          description="Simplify GenAI model deployment"
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={[
            {
              lang: "python",
              code: `import openvino genai as ov genai

                  pipe = ov_genai.LLMPipeline("TinyLlama_1_1b_v1_ov", "CPU")
                  print(pipe.generate("What is OpenVINO?", max_new_tokens=100))`,
            },
          ]}
        />

        <DottedCardDetails
          title="OpenVINO Physical AI"
          description="Real-time inference for robotics and autonomous systems (TBU)"
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={[
            {
              lang: "python",
              code: `from physicalai import InferenceModel

                      policy = InferenceModel("./exports/act_policy")
                      action = policy.select_action(observation)`,
            },
          ]}
        />

        <DottedCardDetails
          title={
            <>
              NNCF{" "}
              <span className={styles.titleDetails}>
                Neural Network Compression Framework
              </span>
            </>
          }
          description="A suite of post-training and training-time algorithms for optimizing inference"
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={[
            {
              lang: "python",
              code: `import nncf
              import openvino as ov
              import torch

              # Load your OpenVINO model
              model = ov.convert_model(your_torch_model,example_input=torch.randn(1, 3, 224, 224))

              # Prepare calibration data
              calibration_data = [torch.randn(1, 3, 224, 224) for _ in range(100)]
              calibration_dataset = nncf.Dataset(calibration_data)
              
              # Quantize the model
              quantized_model = nncf.quantize(model, calibration_dataset)
              
              # Save or use the quantized model
              ov.save_model(quantized_model, "quantized_model.xml")`,
            },
          ]}
        />

        <DottedCardDetails
          title="OpenVINO Model Server"
          description="A scalable inference server for models optimized with OpenVINO"
          learnMoreLink="/docs/ecosystem/openvino-genai"
          code={[
            {
              lang: "dockerfile",
              code: `docker run -d --rm -p 9000:9000 \\

              -v /path/to/models:/models \\
              openvino/model_server:latest \\
              --model_name resnet \\
              --model_path /models/resnet \\
              --port 9000`,
            },
          ]}
        />
      </div>
    </Section>
  );
};
