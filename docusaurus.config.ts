import type * as Preset from '@docusaurus/preset-classic';
import type { Config, PluginConfig } from '@docusaurus/types';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';
import { load as yamlLoad } from 'js-yaml';
import { SPOKE_CATALOG } from './src/hub-catalog';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

type SpokeConfig = {
  repo: string;
  ref: string;
  id: string;
  routeBasePath: string;
  paths: string[];
};

type SpokesYml = {
  spokes: SpokeConfig[];
};

const REPO_ROOT = __dirname;
const SPOKES_DIR = 'spokes';

const allSpokes: SpokeConfig[] = (
  yamlLoad(readFileSync(path.join(REPO_ROOT, 'spokes.yml'), 'utf8')) as SpokesYml
).spokes;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs') as typeof import('fs');

// Exactly one of these three modes must be selected. No defaults, no fallbacks.
// Each mode emits a single self-contained Docusaurus bundle whose webpack
// `publicPath` is set by `baseUrl` below — so its assets live entirely under
// that prefix and never collide with bundles deployed at sibling prefixes:
//   HUB_ONLY=1         → hub landing only, baseUrl = /.
//   BUILD_ALL_SPOKES=1 → hub + every spoke (used by previews),
//                         baseUrl from $BASE_URL (e.g. /pr/<id>/<N>/).
//   SPOKE=<id>         → that spoke alone, baseUrl = /<rbp>/.
//
// Versioning is handled by Docusaurus' standard multi-version docs plugin.
// Each spoke owns its own `docs-versions/` (versions.json + versioned_docs/
// + versioned_sidebars/) which clone-spokes.sh symlinks into hub root with
// the appropriate `<id>_` prefix per plugin instance.
const HUB_ONLY = process.env.HUB_ONLY === '1';
const BUILD_ALL_SPOKES = process.env.BUILD_ALL_SPOKES === '1';
const SPOKE = (process.env.SPOKE ?? '').trim();

// Site origin (no trailing slash). Used for the canonical site URL and for
// cross-bundle navbar links (those need an absolute URL so Docusaurus treats
// them as external and skips baseUrl prefixing).
const SITE_URL = (process.env.SITE_URL ?? '').trim();
if (!SITE_URL) {
  throw new Error('SITE_URL must be set (e.g. https://docs.example.com).');
}
const SITE_ORIGIN = SITE_URL.replace(/\/+$/, '');

const modesSet = [HUB_ONLY, BUILD_ALL_SPOKES, !!SPOKE].filter(Boolean).length;
if (modesSet !== 1) {
  throw new Error(
    'Exactly one build mode must be set: HUB_ONLY=1, BUILD_ALL_SPOKES=1, or SPOKE=<id>.',
  );
}
const SPOKE_MODE = !!SPOKE;
const selectedSpoke = SPOKE_MODE ? allSpokes.find((s) => s.id === SPOKE) : undefined;
if (SPOKE_MODE && !selectedSpoke) {
  throw new Error(`SPOKE='${SPOKE}' not found in spokes.yml.`);
}

// Resolved baseUrl for this build. Reused by navbar links so cross-bundle
// hrefs include the correct prefix (e.g. /pr/<id>/<N>/<rbp>/ in previews).
const BASE_URL: string = SPOKE_MODE
  ? process.env.BASE_URL
    ? process.env.BASE_URL.replace(/\/?$/, '/')
    : `/${selectedSpoke!.routeBasePath}/`
  : process.env.BASE_URL
    ? process.env.BASE_URL.replace(/\/?$/, '/')
    : '/';

const spokes: SpokeConfig[] = HUB_ONLY
  ? []
  : BUILD_ALL_SPOKES
    ? allSpokes
    : [selectedSpoke!];

for (const s of spokes) {
  const dir = path.join(REPO_ROOT, SPOKES_DIR, s.repo.split('/').pop()!);
  if (!fs.existsSync(dir)) {
    throw new Error(`Spoke '${s.id}' (${s.repo}) not checked out at ${dir}.`);
  }
}

// In SPOKE mode the entire bundle is rooted at /<rbp>/[<v>/], so the spoke's
// docs sit at routeBasePath '/'. In BUILD_ALL_SPOKES mode each spoke mounts
// at its own <rbp> within a single hub bundle.
const effectiveRouteBasePath = (spoke: SpokeConfig): string =>
  SPOKE_MODE ? '/' : spoke.routeBasePath;

function spokeCheckoutDir(spoke: SpokeConfig): string {
  // Matches clone-spokes.sh: basename(repo) under spokes/.
  // Resolve symlinks so webpack's resolve.symlinks behaviour (which
  // normalises imported paths to their real path) still matches the
  // `include` list that plugins pass to the MDX loader.
  const relDir = path.join(SPOKES_DIR, spoke.repo.split('/').pop()!);
  const absDir = path.join(REPO_ROOT, relDir);
  try {
    return path.relative(REPO_ROOT, realpathSync(absDir));
  } catch {
    return relDir;
  }
}

function docsPluginId(spoke: SpokeConfig): string {
  // The first spoke is mounted via the classic preset (pluginId='default') so
  // theme features that default to pluginId="default" (404 page, search index,
  // etc.) have a docs instance to bind to.
  return spoke === spokes[0] ? 'default' : spoke.id;
}

function docsPluginOptions(spoke: SpokeConfig) {
  const spokeDir = spokeCheckoutDir(spoke);
  return {
    path: path.join(spokeDir, 'docs'),
    routeBasePath: effectiveRouteBasePath(spoke),
    sidebarPath: require.resolve('./sidebars/auto.ts'),
    editUrl: ({ docPath }: { docPath: string }) =>
      `https://github.com/${spoke.repo}/edit/${spoke.ref}/docs/${docPath}`,
    async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }: any) {
      const excludeCategories = args.item.customProps?.excludeCategories as
        | string[]
        | undefined;
      const items = await defaultSidebarItemsGenerator(args);
      return items.filter(
        (i: any) =>
          !(excludeCategories && i.type === 'category' && excludeCategories.includes(i.label)),
      );
    },
  };
}

function docsPlugin(spoke: SpokeConfig): PluginConfig {
  return [
    '@docusaurus/plugin-content-docs',
    { id: docsPluginId(spoke), ...docsPluginOptions(spoke) },
  ];
}

function landingPagePlugin(spoke: SpokeConfig): PluginConfig | null {
  // Optional landing page lives at `docs/_landing/` inside the spoke — the
  // leading underscore tells the docs plugin to ignore the folder, so a single
  // `docs/` tree holds both docs content and the landing page source.
  const landingDir = path.join(spokeCheckoutDir(spoke), 'docs', '_landing');
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('fs').statSync(path.join(REPO_ROOT, landingDir));
  } catch {
    return null;
  }
  return [
    '@docusaurus/plugin-content-pages',
    {
      id: `${spoke.id}-landing`,
      path: landingDir,
      routeBasePath: effectiveRouteBasePath(spoke),
    },
  ];
}

function samplesPlugin(spoke: SpokeConfig): PluginConfig | null {
  // Only wire the samples plugin for the GenAI spoke (it is GenAI-specific).
  if (spoke.id !== 'genai') return null;
  const spokeDir = spokeCheckoutDir(spoke);
  // In SPOKE mode the spoke owns '/' (the bundle is rooted at /<rbp>/[<v>/]),
  // so samples live at '/samples'. In BUILD_ALL_SPOKES they live at '/<rbp>/samples'.
  const docsRouteBase = SPOKE_MODE ? '/samples' : `/${spoke.routeBasePath}/samples`;
  return [
    require.resolve('./src/plugins/genai-samples-docs-plugin'),
    {
      // The spoke's `samples-list` component calls
      // `usePluginData('genai-samples-docs-plugin')`, which implicitly looks up
      // the 'default' instance id. Leave `id` unset so Docusaurus assigns it.
      samplesPath: path.join(spokeDir, 'samples'),
      docsOutPath: path.join(spokeDir, 'docs', 'samples'),
      readmeImportBase: `@site/${spokeDir}/samples`,
      githubBaseUrl: `https://github.com/${spoke.repo}/tree/${spoke.ref}/samples`,
      docsRouteBase,
    },
  ];
}

const [firstSpoke, ...otherSpokes] = spokes;

const spokePlugins: PluginConfig[] = [
  // The first spoke is wired via presets.classic.docs (below), so we only emit
  // docs plugins for additional spokes. In hub-only builds (no spoke
  // checkouts) `firstSpoke` is undefined and there's nothing to wire here.
  ...otherSpokes.map(docsPlugin),
  ...spokes.flatMap((spoke) =>
    [landingPagePlugin(spoke), samplesPlugin(spoke)].filter(
      (p): p is PluginConfig => p !== null,
    ),
  ),
];

const config: Config = {
  title: 'OpenVINO Documentation',
  favicon: 'img/favicon.png',

  // Production URL of the site. Override per deployment via $SITE_URL.
  url: SITE_ORIGIN,
  // URL prefix under which the site is served. The bundle owns this prefix
  // entirely (its assets are emitted under it). Each deploy mode picks a
  // disjoint baseUrl so multiple bundles can coexist on the same bucket
  // without `--delete` wiping each other's assets:
  //   HUB_ONLY=1         → / (or $BASE_URL).
  //   BUILD_ALL_SPOKES=1 → $BASE_URL (e.g. /pr/<id>/<N>/).
  //   SPOKE=<id>         → /<rbp>/ (or $BASE_URL for previews).
  baseUrl: BASE_URL,

  organizationName: 'open-edge-platform',
  projectName: 'edge-manage-docs',

  customFields: {
    // Exposed to client-side code (e.g. the hub landing page) via
    // useDocusaurusContext(). Always advertises every spoke so the hub
    // landing renders the same card grid regardless of build mode.
    // `href` is a fully-qualified absolute URL so cross-bundle links work
    // identically from hub and spoke builds (and across preview prefixes).
    spokes: allSpokes.map((s) => ({
      id: s.id,
      label: SPOKE_CATALOG[s.id]?.label ?? s.id,
      description: SPOKE_CATALOG[s.id]?.description,
      routeBasePath: s.routeBasePath,
      repo: s.repo,
      href: `${SITE_ORIGIN}${SPOKE_MODE ? '/' : BASE_URL}${s.routeBasePath}/`,
    })),
  },

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // S3 + CloudFront serves /foo/ as /foo/index.html but does NOT rewrite
  // /foo to /foo/index.html. Generating links with a trailing slash keeps
  // every internal nav working without a CloudFront Function.
  trailingSlash: true,

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: HUB_ONLY ? false : docsPluginOptions(firstSpoke),
        blog: false,
        // The hub landing under src/pages/ is only relevant for builds that
        // include the hub itself (HUB_ONLY, BUILD_ALL_SPOKES). In SPOKE mode
        // the bundle is the spoke alone and must not emit a hub landing.
        pages: SPOKE_MODE ? false : undefined,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  plugins: spokePlugins,

  themes: [
    // The search theme's <SearchBar> hooks into the docs plugin's global
    // data. In hub-only builds there's no docs plugin, so we drop the
    // search theme entirely (the hub landing has no content to search).

    ...(HUB_ONLY
      ? []
      : ([
          [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
              hashed: true,
              highlightSearchTermsOnTargetPage: true,
              searchBarShortcutHint: false,
              docsRouteBasePath: spokes.map((s) => effectiveRouteBasePath(s)),
              docsDir: spokes.map((s) =>
                path.join(spokeCheckoutDir(s), 'docs'),
              ),
            },
          ],
        ] as Config['themes'] & object[])),
  ],

  themeConfig: {
    colorMode: { disableSwitch: true, defaultMode: 'light' },
    navbar: {
      logo: { alt: 'Intel logo', src: 'img/intel-logo.svg' },
      items: SPOKE_MODE
        ? [
            // Cross-product switcher. Cards link to absolute URLs so they
            // work from inside this spoke's bundle.
            {
              type: 'custom-productGrid' as const,
              label: 'OpenVINO Runtime',
              position: 'left' as const,
            },
            // Hardcoded shortcut to the primary (openvino) spoke. Absolute
            // URL with target=_self so the spoke bundle doesn't prefix it
            // with its own baseUrl.
            {
              href: `${SITE_ORIGIN}/openvino/`,
              label: 'Documentation',
              position: 'right' as const,
              target: '_self',
            },
            // Built-in Docusaurus version dropdown. Reads versions.json /
            // versioned_docs/ from site root (symlinked into the hub by
            // clone-spokes.sh from the spoke's docs-versions/). Hides
            // automatically when there is only the current (next) version.
            {
              type: 'docsVersionDropdown' as const,
              position: 'right' as const,
            },
          ]
        : [
            // Hub bundle. The product-grid dropdown replaces the per-spoke
            // link group; cards inside it link to absolute spoke URLs.
            {
              type: 'custom-productGrid' as const,
              label: 'OpenVINO Runtime',
              position: 'left' as const,
            },
            // Hardcoded shortcut to the primary (openvino) spoke so visitors
            // can jump straight into docs from the landing page.
            {
              href: `${SITE_ORIGIN}${BASE_URL}openvino/`,
              label: 'Documentation',
              position: 'right' as const,
              target: '_self',
            },
            // One version dropdown per spoke, scoped by the spoke's URL
            // prefix via a small wrapper around `docsVersionDropdown`. The
            // wrapper hides itself on the hub landing and on routes
            // belonging to other spokes, so only the active spoke's
            // selector ever appears. Skip in HUB_ONLY builds because the
            // per-spoke docs plugins aren't registered there and the
            // wrapper's `useVersions(pluginId)` would crash SSG.
            ...(HUB_ONLY
              ? []
              : allSpokes.map((spoke) => ({
                  type: 'custom-spokeVersionDropdown' as const,
                  position: 'right' as const,
                  docsPluginId: docsPluginId(spoke),
                  routePrefix: `${BASE_URL}${spoke.routeBasePath}/`,
                }))),
          ],
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
    footer: {
      // Slim legal footer rendered on every page. The copyright field
      // takes HTML so we pack the © line and the three legal links into
      // a single flex row, avoiding Docusaurus' per-link-column layout.
      style: 'dark',
      copyright: `<div class="legal-footer">
        <span>\u00a9 ${new Date().getFullYear()} Intel Corporation</span>
        <span class="legal-footer__links">
          <a href="https://www.intel.com/content/www/us/en/legal/terms-of-use.html">Terms of Use</a>
          <a href="https://www.intel.com/content/www/us/en/privacy/intel-cookie-notice.html">Cookies</a>
          <a href="https://www.intel.com/content/www/us/en/privacy/intel-privacy-notice.html">Privacy Policy</a>
        </span>
      </div>`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
