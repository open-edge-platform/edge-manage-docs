import { ReactNode } from "react";
import styles from "./DottedCardDetails.module.css";

type DottedCardDetailsProps = {
  title: ReactNode;
  description: ReactNode;
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
      <p className={styles.description}>{description}</p>

      {/* <div className={styles.content}>{children}</div> */}
      {children}

      <a href={learnMoreLink.href} className={styles.learnMore}>
        {learnMoreLink.text}
      </a>
    </div>
  );
};
