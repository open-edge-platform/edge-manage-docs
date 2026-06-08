import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "../Link/Link";
import styles from "./DottedCardDetails.module.css";
import { Code } from "../Code/Code";

type CodeSnippet = {
  code: string;
  lang: string;
  label?: string;
};

type DottedCardDetailsProps = {
  title: ReactNode;
  code: CodeSnippet[];
  hideSingleTab?: boolean;
  description?: ReactNode;
  learnMoreLink: string;
};

export const DottedCardDetails = ({
  code,
  title,
  hideSingleTab = true,
  description,
  learnMoreLink,
}: DottedCardDetailsProps) => {
  const [activeLang, setActiveLang] = useState(code[0]?.lang ?? "python");

  const hideTabs = hideSingleTab && code.length === 1;
  const activeSnippet =
    code.find((snippet) => snippet.lang === activeLang) ?? code[0];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      {!hideTabs && (
        <div
          className={styles.languageTabs}
          role="tablist"
          aria-label="Language selector"
        >
          {code.map((snippet, index) => {
            const isActive = snippet.lang === activeLang;

            return (
              <button
                key={`${snippet.lang}-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.languageTab} ${isActive ? styles.activeLanguageTab : ""}`}
                onClick={() => setActiveLang(snippet.lang)}
              >
                {snippet.label ?? snippet.lang}
              </button>
            );
          })}
        </div>
      )}

      <Code code={activeSnippet?.code ?? ""} lang={activeSnippet?.lang} />

      <Link href={learnMoreLink} label="Learn more" />
    </div>
  );
};
