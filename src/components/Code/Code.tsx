import { useEffect, useState } from "react";
import { createHighlighter, ThemeInput } from "shiki";

import { openvinoTheme } from "./codeTheme";
import styles from "./Code.module.css";
import clsx from "clsx";

type CodeProps = {
  code: string;
  lang?: string;
  theme?: ThemeInput;
  className?: string;
};

const removeIndent = (str: string) => str.replace(/^[ \t]+/gm, "").trim();

export const Code = ({
  code,
  lang = "python",
  theme: customTheme,
  className,
}: CodeProps) => {
  const [html, setHtml] = useState("");
  const theme = { ...openvinoTheme, ...customTheme };

  useEffect(() => {
    renderCode();
  }, [code, lang, theme]);

  const renderCode = async () => {
    const highlighter = await createHighlighter({
      themes: [theme],
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
      className={clsx(styles.container, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
