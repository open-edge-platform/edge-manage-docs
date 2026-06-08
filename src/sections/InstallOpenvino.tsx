import { DottedCardDetails } from "../components/DottedCardDetails/DottedCardDetails";
import { Link } from "../components/Link/Link";
import { Section } from "../components/Section/Section";
import { useSpokeHref } from "../hooks/use-spoke-href";
import { OpenVINOHub } from "../hub-catalog";
import styles from "./InstallOpenvino.module.css";

export const InstallOpenvino = () => {
  const href = useSpokeHref(OpenVINOHub.spokeId);

  return (
    <Section>
      <Section.Icon>
        <img className={styles.icon} src="/img/install.png" alt="install" />
      </Section.Icon>

      <Section.Title>Install OpenVINO™</Section.Title>

      <Section.Description>
        <>
          Unlock the power of OpenVINO™ for Your projects.
          <br />
          Get started with seamless installation now!
        </>
      </Section.Description>

      <div className={styles.containerOptions}>
        <a
          className={styles.installButton}
          href={`${href}#installing-openvino-runtime`}
        >
          pip install openvino
        </a>

        <Link
          href={`${href}#installing-openvino-runtime`}
          label="Advanced installation options"
        />
      </div>

      <div className={styles.twoColumnsFiveRowsGrid}>
        <div className={styles.row1}>
          <DottedCardDetails
            title="Bring your model to OpenVINO"
            learnMoreLink={String(href)}
            code={[
              {
                lang: "python",
                code: `import openvino as ov
                    
                import numpy as np
                import nncf
                import torch
                import torchvision.models as models

                model = torchvision.models.resnet50(weights='DEFAULT')model.eval()
                ov_model = ov.convert_model(model)`,
              },
            ]}
          />

          <img className={styles.blendModeLighten} src="/img/openvino-ir.png" />
        </div>

        <div className={styles.row2}>
          <img src="/img/left-right-connector.svg" />
        </div>

        <div className={styles.row3}>
          <img
            className={styles.blendModeLighten}
            src="/img/optimize-model.png"
          />

          <DottedCardDetails
            title="Optimize your model"
            learnMoreLink={String(href)}
            code={[
              {
                lang: "python",
                code: `calibration_data = [torch.randn(1, 3, 224, 224) for _ in range(00)]
                calibration_dataset = nncf.Dataset(calibration_data)
                quantized_model = nncf.quantize(ov_model, calibration_dataset)`,
              },
            ]}
          />
        </div>

        <div className={styles.row4}>
          <img src="/img/right-left-connector.svg" />
        </div>

        <div className={styles.row5}>
          <DottedCardDetails
            title="Run and infer"
            learnMoreLink={String(href)}
            code={[
              {
                lang: "cpp",
                label: "Run in C++",
                code: `#include <openvino/openvino.hpp>
                      #include <vector>
                      #include <random>
                      #include <iostream>`,
              },
              {
                lang: "python",
                label: "Run in Python",
                code: `core = ov.Core()
                  compiled_model = core.compile_model(quantized_model, "CPU")
                  input_data = np.random.randn(1, 3, 224, 224).astype(np.float32)
                  output = compiled_model(input_data)predictions = output[0]`,
              },
              {
                lang: "javascript",
                label: "Run in JavaScript",
                code: `const ov = require('openvino-node');
                      const core = new ov.Core();
                      const compiledModel = core.compileModel(quantizedModel, 'CPU');`,
              },
            ]}
          />

          <img
            className={styles.blendModeLighten}
            src="/img/run-and-infer.png"
          />
        </div>
      </div>
    </Section>
  );
};
