# Contributing

## Spoke content structure

Features are opt-in by folder layout. All tiers start with `docs/`.

### Markdown only

```
your-repo/
└── docs/
    ├── getting-started/
    │   ├── _category_.json
    │   └── introduction.md
    └── guides/
        └── setup.md
```

### MDX + colocated images

```
docs/
└── concepts/
    ├── img/
    │   └── architecture.svg
    └── overview.mdx
```

### Custom TSX components

Place components in `_`-prefixed folders — the docs plugin ignores them as content, but MDX can import them:

```
docs/
├── _components/
│   └── models-table/
│       └── index.tsx
└── models/
    └── index.mdx   // import ModelsTable from '../_components/models-table';
```

Constraints: relative imports only; import from `@docusaurus/...`, `@theme/...`, `react` — not `@site/src/...`.

### Landing page

`docs/_landing/index.tsx` is served at `/<routeBasePath>/`. Link to docs with relative paths.

```
docs/
├── _landing/
│   ├── index.tsx
│   └── index.module.css
└── getting-started/
    └── introduction.mdx
```

### Generated docs (samples plugin)

Currently GenAI-specific. Add `samples/` to your spoke's `paths` in `spokes.yml` and see `src/plugins/` + `docusaurus.config.ts`.

## Conventions

**Sidebar** — auto-generated from the filesystem. Use `_category_.json` per directory and `sidebar_position` frontmatter per file. No `sidebars.ts`.

**Links** — relative paths between Markdown files (`../guides/setup.md`). Avoid absolute paths (`/genai/...`) — they break if `routeBasePath` changes.

**Images** — colocate next to the MDX that references them. No top-level `static/`.

**Shared MDX components** (available without import):

| Component | Purpose |
|---|---|
| `Button` | Styled link button |
| `LanguageTabs` | Tab group container |
| `TabItemPython`, `TabItemCpp`, `TabItemJS`, `TabItemC` | Language tab items |
| `OptimumCLI` | CLI command generator |

**Don't commit:** `docusaurus.config.ts`, `package.json`, `sidebars.ts`, `src/pages/`, `src/theme/`, `src/css/`, top-level `static/`, build-generated files.

## Adding a spoke

1. Add to `spokes.yml`:

```yaml
spokes:
  - repo: owner/your-repo
    ref: main
    id: your-repo          # unique; first entry = default docs plugin instance
    routeBasePath: your-repo
    label: Your Project
    paths:
      - docs/
      # - docs-versions/   # add if the spoke uses versioning
      # - samples/         # add if the spoke uses the samples plugin
```

2. Add the dispatch trigger to your repo's CI (one-line reusable workflow call).

3. Test locally:

```sh
./scripts/clone-spokes.sh --use-local=owner/your-repo:/abs/path/to/checkout
BUILD_ALL_SPOKES=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build
npm run serve
```

## Local development

```sh
npm install

# Build everything
BUILD_ALL_SPOKES=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build

# Build against a specific branch or commit (without editing spokes.yml)
./scripts/clone-spokes.sh --override=owner/your-repo:my-branch
BUILD_ALL_SPOKES=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build

npm run serve       # serve build/ at localhost:3000
npm start           # hot-reload dev server (BUILD_ALL_SPOKES=1 required)
```

Exactly one build mode env var must be set (`BUILD_ALL_SPOKES`, `SPOKE`, or `HUB_ONLY`) or the build aborts.

Requirements: Node 22, `git`, `git-lfs` (if any spoke uses LFS).

## How the dispatch flow works

Spoke CI dispatches `deploy-preview` to the hub with `{ repo, branch, pr_number, sha }`.

**Preview mode** (branch ≠ main/master):
1. Hub validates sender and payload.
2. Builds hub (`HUB_ONLY`) + the triggering spoke (`SPOKE=<id>`), each with `BASE_URL=/pr/<spoke>/<PR#>/[<rbp>/]`.
3. Deploys both to `pr/<spoke>/<PR#>/`.
4. Posts a preview link as a PR comment; updates it on each push.

**Merge mode** (branch = main/master):
1. Hub builds the spoke (`SPOKE=<id>`) at its `routeBasePath`.
2. Deploys to `/<rbp>/`.

**Close:** spoke CI dispatches `close-preview`; hub deletes `pr/<spoke>/<PR#>/`.

**Hub PR preview:** triggered by the `deploy-doc-preview` label on a hub repo PR. Builds hub first, then all spokes in parallel, deploys to `pr/hub/<PR#>/`. Cleaned up when the PR closes.
