import { ReactNode } from "react";
import styles from "./CardDetails.module.css";

type CardDetailsProps = {
  title: ReactNode;
  iconUrl: string;
  maxIconWidth: string | number;
  description: string;
};

export const CardDetails = ({
  title,
  iconUrl,
  description,
  maxIconWidth,
}: CardDetailsProps) => {
  return (
    <div className={styles.container}>
      <img style={{ maxWidth: maxIconWidth }} src={iconUrl} />

      <h3 className={styles.title}>{title}</h3>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
