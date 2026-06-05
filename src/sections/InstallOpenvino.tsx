import Button from "../components/Button";
import { Code } from "../components/Code/Code";
import { DottedCardDetails } from "../components/DottedCardDetails/DottedCardDetails";
import { Link } from "../components/Link/Link";
import { Section } from "../components/Section/Section";
import styles from "./InstallOpenvino.module.css";

export const InstallOpenvino = () => {
  return (
    <Section>
      <img className={styles.icon} src="/img/install.png" alt="install" />
      <h2 className={styles.title}>Install OpenVINO™</h2>

      <p className={styles.description}>
        Unlock the power of OpenVINO™ for Your projects.
        <br />
        Get started with seamless installation now!
      </p>

      <div className={styles.containerOptions}>
        <button className={styles.installButton}>pip install openvino</button>

        <Link href="#" label="Advanced installation options" />
      </div>

      <div className={styles.twoColumnsFiveRowsGrid}>
        <div className={styles.row1}>
          <DottedCardDetails
            title="Bring your model to OpenVINO"
            learnMoreLink={{
              text: "Learn more",
              href: "/docs/ecosystem/openvino-genai",
            }}
          >
            <Code
              code={`import openvino as ov
                    
                import numpy as np
                import nncf
                import torch
                import torchvision.models as models

                model = torchvision.models.resnet50(weights='DEFAULT')model.eval()
                ov_model = ov.convert_model(model)`}
            />
          </DottedCardDetails>

          <img src="/img/openvino-ir.png" />
        </div>

        <div className={styles.row2}>
          <img src="/img/left-right-connector.svg" />
        </div>

        <div className={styles.row3}>
          <img src="/img/optimize-model.png" />

          <DottedCardDetails
            title="Optimize your model"
            learnMoreLink={{
              text: "Learn more",
              href: "/docs/ecosystem/openvino-genai",
            }}
          >
            <Code
              code={`calibration_data = [torch.randn(1, 3, 224, 224) for _ in range(00)]
                calibration_dataset = nncf.Dataset(calibration_data)
                quantized_model = nncf.quantize(ov_model, calibration_dataset)`}
            />
          </DottedCardDetails>
        </div>

        <div className={styles.row4}>
          <img src="/img/right-left-connector.svg" />
        </div>

        <div className={styles.row5}>
          <DottedCardDetails
            title="Run and infer"
            learnMoreLink={{
              text: "Learn more",
              href: "/docs/ecosystem/openvino-genai",
            }}
          >
            <Code
              code={`core = ov.Core()
                  compiled_model = core.compile_model(quantized_model, "CPU")
                  input_data = np.random.randn(1, 3, 224, 224).astype(np.float32)
                  output = compiled_model(input_data)predictions = output[0]`}
            />
          </DottedCardDetails>

          <img src="/img/run-and-infer.png" />
        </div>
      </div>
    </Section>
  );
};
