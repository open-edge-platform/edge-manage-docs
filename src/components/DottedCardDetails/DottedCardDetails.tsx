import { ReactNode } from "react";
import { Link } from "../Link/Link";
import styles from "./DottedCardDetails.module.css";
import { Code } from "../Code/Code";

type DottedCardDetailsProps = {
  title: ReactNode;
  code: string;
  lang?: string;
  description?: ReactNode;
  learnMoreLink: string;
};

export const DottedCardDetails = ({
  code,
  title,
  lang,
  description,
  learnMoreLink,
}: DottedCardDetailsProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      <Code code={code} lang={lang} />

      <Link href={learnMoreLink} label="Learn more" />
    </div>
  );
};
