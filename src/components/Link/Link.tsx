import styles from "./Link.module.css";

type LinkProps = {
  href: string;
  label: string;
};

export const Link = ({ href, label }: LinkProps) => {
  return (
    <a className={styles.link} href={href}>
      {label}
    </a>
  );
};
