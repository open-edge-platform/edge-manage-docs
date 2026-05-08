import React from 'react';
import { PRODUCT_CARDS } from '@site/src/hub-catalog';
import { useSpokeHref } from '@site/src/hooks/use-spoke-href';
import styles from './styles.module.css';

export default function EcosystemSection(): React.JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Ecosystem</h2>
        <p className={styles.subtitle}>
          A unified toolkit for building, optimizing, and deploying AI
          across diverse workloads and domains.
        </p>
        <div className={styles.grid}>
          {PRODUCT_CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: (typeof PRODUCT_CARDS)[number] }) {
  const href = useSpokeHref(card.spokeId);

  // Plain <a> with target=_self for cross-bundle navigation: each spoke is
  // its own Docusaurus bundle and SPA routing inside the hub bundle would
  // 404 until the user refreshes.
  if (href) {
    return (
      <a className={styles.card} href={href} target="_self">
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDesc}>{card.description}</div>
      </a>
    );
  }

  return (
    <div className={`${styles.card} ${styles.cardDisabled}`}>
      <span className={styles.badge}>Coming soon</span>
      <div className={styles.cardTitle}>{card.title}</div>
      <div className={styles.cardDesc}>{card.description}</div>
    </div>
  );
}
