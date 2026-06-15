import React from 'react';
import {useLocation} from '@docusaurus/router';
import {useVersions, useActiveVersion} from '@docusaurus/plugin-content-docs/client';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

// Always-on per-spoke version dropdown.
//
// The built-in `docsVersionDropdown` hides itself unless the active route
// is served by its docs plugin, so it disappears on non-doc pages such as
// the spoke's landing page (which is a content-page plugin route, not a
// docs route). We want the selector to be visible on every page under the
// spoke's `routeBasePath`, so we render our own dropdown driven by
// `useVersions(pluginId)` and gate it purely on `pathname.startsWith()`.
type Props = {
  docsPluginId: string;
  routePrefix: string;            // e.g. "/genai/" — base+rbp with trailing slash
  position?: 'left' | 'right';
  label?: string;
  className?: string;
};

export default function SpokeVersionDropdown({
  docsPluginId,
  routePrefix,
  position = 'right',
  label,
  className,
}: Props): React.JSX.Element | null {
  const {pathname} = useLocation();
  const versions = useVersions(docsPluginId);
  const activeVersion = useActiveVersion(docsPluginId);

  // Only show under this spoke's routes (landing + docs + samples + …).
  const trimmed = routePrefix.replace(/\/$/, '');
  const inSpoke = pathname === trimmed || pathname.startsWith(`${trimmed}/`);
  if (!inSpoke) return null;

  // Single-version installs: nothing meaningful to switch between.
  if (!versions || versions.length <= 1) return null;

  const dropdownLabel = label ?? activeVersion?.label ?? versions[0]?.label ?? 'Versions';

  const items = versions.map((v) => {
    const mainDoc = v.docs.find((d) => d.id === v.mainDocId) ?? v.docs[0];
    return {
      label: v.label,
      to: mainDoc?.path ?? v.path,
      isActive: () => activeVersion?.name === v.name,
    };
  });

  return (
    <DropdownNavbarItem
      position={position}
      label={dropdownLabel}
      items={items}
      className={className}
    />
  );
}
