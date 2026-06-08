import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

import { openvinoTheme } from "./codeTheme";
import styles from "./Code.module.css";

type CodeProps = {
  code: string;
  lang?: string;
};

const removeIndent = (str: string) => str.replace(/^[ \t]+/gm, "").trim();

export const Code = ({ code, lang = "python" }: CodeProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    renderCode();
  }, [code, lang]);

  const renderCode = async () => {
    const highlighter = await createHighlighter({
      themes: [openvinoTheme],
      langs: [lang],
    });

    const result = highlighter.codeToHtml(removeIndent(code), {
      lang,
      theme: "openvino-dark",
    });

    setHtml(result);
  };

  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
