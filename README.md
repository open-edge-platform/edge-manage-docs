# OpenVINO Documentation Hub

A central documentation platform that aggregates content from multiple
repositories ("spokes") into a single website. Each spoke owns its
documentation content; the hub owns the framework, theme, and deployment
pipeline.

---

## How it works

Each spoke repository contains a `docs/` folder with content (Markdown, MDX, TSX).
The hub clones the relevant spoke, builds a Docusaurus site from its
content, and deploys it. Spokes never need to install Docusaurus, manage
themes, or configure hosting.

### Responsibilities

| Concern | Owner |
|---|---|
| Content (Markdown, MDX, images) | Spoke |
| Versioning (cutting snapshots into `docs-versions/`) | Spoke |
| Theme, styles, shared components | Hub |
| Build pipeline and deployment | Hub |
| Landing page (per-spoke, via `docs/index.mdx`) | Spoke |
| Ecosystem-wide landing page (`/`) | Hub |
| Version dropdown rendering | Hub |
| CI trigger (dispatch to hub) | Spoke (one-line reusable workflow) |

---

## Connecting your repository

1. **Add an entry to [`spokes.yml`](spokes.yml)** in this repository:

```yaml
spokes:
  - repo: owner/your-repo
    ref: main
    id: your-repo
    routeBasePath: your-repo
    paths:
      - docs/
```

2. **Have a `docs/` folder** in your repository with Markdown, MDX, or TSX files.

3. **Add the trigger workflow** — a single reusable workflow call in your
   repository's CI that dispatches to the hub on PR label and tag events.

That's it. The hub handles the rest.

---

## Previewing changes

When you open a PR that touches documentation:

1. Add the `deploy-doc-preview` label to your PR.
2. The hub builds a preview of your spoke and posts a link as a PR comment.
3. Every subsequent push to that PR updates the preview automatically.
4. When the PR is closed, the preview is cleaned up.

The preview URL follows the pattern: `<preview-domain>/pr/<spoke>/<PR#>/`

> **Note:** Currently the preview builds all connected spokes alongside
> yours. This will be scoped to only the triggering spoke in a future update.

---

## Deploying to production

Two events trigger production deployments:

### On merge to default branch

When a PR is merged, the hub rebuilds your spoke and deploys it to
production. This updates the "next" (unreleased) version of your docs.
Previously released versions remain unchanged.

### On release tag

When you push a release tag:

1. Run `scripts/cut-doc-version.sh <version>` to snapshot the current
   `docs/` into `docs-versions/`.
2. Commit and tag the release.
3. Push — the hub rebuilds your spoke (all versions + next) and syncs
   the full site to production at `/<spoke>/`.

The Docusaurus version dropdown automatically picks up the new version.

> **Alternative under discussion:** Deploy only released versions to
> production (no "next"), making the release tag the sole gate to prod.

---

## Versioning

Each spoke manages its own versions in a `docs-versions/` folder:

```
your-repo/
├── docs/                      ← current (becomes "next" on the site)
└── docs-versions/
    ├── versions.json          ← ["v2.0", "v1.1", "v1.0"]
    └── versioned_docs/
        ├── version-v2.0/
        ├── version-v1.1/
        └── version-v1.0/
```

- The version format is up to the spoke (`v1.0`, `2024.1`, etc.).
- The hub renders whatever is in `docs-versions/` — it does not
  validate or enforce a format.
- Use `scripts/cut-doc-version.sh` to snapshot the current `docs/`
  into a new version. The script is provided in your spoke repo.

---

## Content conventions

- Write Markdown (`.md`) or MDX (`.mdx`) in `docs/`.
- Use **relative links** between documents (`../guides/setup.md`).
- Colocate images next to the docs that use them.
- Control sidebar order with `_category_.json` and frontmatter `sidebar_position`.
- Do not add `sidebars.ts`, `docusaurus.config.ts`, or `package.json` — the hub owns these.

For the full conventions guide (shared components, advanced MDX, generated
docs), see [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## Local development

```sh
# Symlink a local spoke checkout instead of cloning from GitHub.
./scripts/clone-spokes.sh \
  --use-local=openvinotoolkit/openvino.genai:/abs/path/to/openvino.genai

# Multi-spoke build (matches PR preview).
BUILD_ALL_SPOKES=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build

# Single-spoke build (matches merge / release pipeline). The spoke is
# mounted at /.
SPOKE=genai BASE_URL=/genai/v1.2/ SITE_URL=https://docs.example.com npm run build

# Hub-only build (matches deploy-hub.yml). Skips spoke cloning entirely.
HUB_ONLY=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contributor
workflow.
