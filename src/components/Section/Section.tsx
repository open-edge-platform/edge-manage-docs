import { ReactElement, ReactNode } from "react";
import styles from "./Section.module.css";

type SectionBaseProps = {
  children: ReactNode;
};

type SectionPartProps = {
  children: ReactNode;
};

type SectionComponent = (({ children }: SectionBaseProps) => ReactElement) & {
  Icon: ({ children }: SectionPartProps) => ReactElement;
  Title: ({ children }: SectionPartProps) => ReactElement;
  Description: ({ children }: SectionPartProps) => ReactElement;
};

const SectionIcon = ({ children }: SectionPartProps) => {
  return <div className={styles.icon}>{children}</div>;
};

const SectionTitle = ({ children }: SectionPartProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};

const SectionDescription = ({ children }: SectionPartProps) => {
  return <p className={styles.description}>{children}</p>;
};

SectionIcon.displayName = "Section.Icon";
SectionTitle.displayName = "Section.Title";
SectionDescription.displayName = "Section.Description";

const SectionRoot = ({ children }: SectionBaseProps) => {
  return (
    <section className={styles.container}>
      <div>{children}</div>
    </section>
  );
};

export const Section = SectionRoot as SectionComponent;

Section.Icon = SectionIcon;
Section.Title = SectionTitle;
Section.Description = SectionDescription;
