import { ReactNode } from "react";
import { Link } from "../Link/Link";
import styles from "./DottedCardDetails.module.css";

type DottedCardDetailsProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  learnMoreLink: {
    text: string;
    href: string;
  };
};

export const DottedCardDetails = ({
  title,
  description,
  children,
  learnMoreLink,
}: DottedCardDetailsProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      {children}

      <Link href={learnMoreLink.href} label={learnMoreLink.text} />
    </div>
  );
};
