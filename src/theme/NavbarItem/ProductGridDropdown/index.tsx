import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useCurrentSpoke } from "@site/src/hooks/use-current-spoke";
import { useNavState } from "@site/src/hooks/use-nav-state";
import { useSpokeHref } from "@site/src/hooks/use-spoke-href";
import { PRODUCT_CARDS } from "@site/src/hub-catalog";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

// Navbar item registered as `custom-productGrid`. Renders the
// "OpenVINO Runtime" hover dropdown on desktop and a stacked card list
// inside the mobile drawer.
type Props = {
  label: string;
  position?: "left" | "right";
  mobile?: boolean;
  className?: string;
};

export default function ProductGridDropdownNavbarItem(
  props: Props,
): React.JSX.Element {
  return props.mobile ? <Mobile {...props} /> : <Desktop {...props} />;
}

// Mirrors @theme/NavbarItem/DropdownNavbarItem/Desktop's class structure
// so theme CSS handles hover-to-open. Menu content is replaced with a
// 552-wide gradient panel containing a 2x2 product card grid.
function Desktop({ position, className }: Props) {
  const spoke = useCurrentSpoke();
  const { productActive } = useNavState();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const label =
    spoke === undefined || spoke.id === "openvino"
      ? "OpenVINO Runtime"
      : spoke.label;

  useEffect(() => {
    const onPointerDown = (e: Event) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("focusin", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("focusin", onPointerDown);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("navbar__item", "dropdown", "dropdown--hoverable", {
        "dropdown--right": position === "right",
        "dropdown--show": open,
      })}
    >
      <a
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={clsx("navbar__link", className, {
          "navbar__link--active": productActive,
        })}
        onClick={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        {label}
      </a>
      <div className={clsx("dropdown__menu", styles.panel)}>
        <div className={styles.grid}>
          {PRODUCT_CARDS.map((card) => (
            <DesktopCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopCard({ card }: { card: (typeof PRODUCT_CARDS)[number] }) {
  const { siteConfig } = useDocusaurusContext();
  const spokeHref = useSpokeHref(card.spokeId);
  const href = card.spokeId === "openvino" ? siteConfig.baseUrl : spokeHref;

  if (href) {
    return (
      <a className={styles.card} href={href} target="_self">
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDesc}>{card.description}</div>
      </a>
    );
  }
  return (
    <div className={clsx(styles.card, styles.cardDisabled)}>
      <span className={styles.badge}>Coming soon</span>
      <div className={styles.cardTitle}>{card.title}</div>
      <div className={styles.cardDesc}>{card.description}</div>
    </div>
  );
}

// Inside the mobile drawer the navbar dropdown is rendered inline. We
// emit a flat list so each card sits on its own row and respects the
// drawer's width.
function Mobile({ label, className }: Props) {
  return (
    <li className={clsx("menu__list-item", className)}>
      <div className={styles.mobileHeader}>{label}</div>
      <ul className={clsx("menu__list", styles.mobileList)}>
        {PRODUCT_CARDS.map((card) => (
          <MobileCard key={card.title} card={card} />
        ))}
      </ul>
    </li>
  );
}

function MobileCard({ card }: { card: (typeof PRODUCT_CARDS)[number] }) {
  const { siteConfig } = useDocusaurusContext();
  const spokeHref = useSpokeHref(card.spokeId);
  const href = card.spokeId === "openvino" ? siteConfig.baseUrl : spokeHref;

  if (href) {
    return (
      <li className={styles.mobileItem}>
        <a className={styles.mobileLink} href={href} target="_self">
          <div className={styles.cardTitle}>{card.title}</div>
          <div className={styles.cardDesc}>{card.description}</div>
        </a>
      </li>
    );
  }
  return (
    <li className={styles.mobileItem}>
      <div className={clsx(styles.mobileLink, styles.cardDisabled)}>
        <span className={styles.badge}>Coming soon</span>
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDesc}>{card.description}</div>
      </div>
    </li>
  );
}
