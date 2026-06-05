# OpenVINO Documentation Hub

Hub-spoke Docusaurus platform. The hub owns the framework, theme, and deployment. Spokes own their content.

## Architecture

The hub and each spoke are **independent self-contained websites**, each with its own S3 prefix. They share a domain and a common theme but are built and deployed separately — a spoke deploy never touches the hub prefix, and vice versa.

Spokes are repos with a `docs/` folder. The hub clones a spoke at build time, produces a standalone Docusaurus bundle for it, and deploys that bundle to `/<routeBasePath>/`. The hub itself builds separately and deploys to `/`. Spokes need no Docusaurus config.

| Concern | Owner |
|---|---|
| Content (Markdown, MDX, images) | Spoke |
| Versioning (`docs-versions/`) | Spoke |
| CI dispatch to hub | Spoke |
| Theme, components, build, hosting | Hub |

Spokes are registered in [`spokes.yml`](spokes.yml).

## Deployment model

All deploys target a single S3 bucket.

| Trigger | What deploys | Where |
|---|---|---|
| Spoke PR labeled `deploy-doc-preview` | Hub + changed spoke | `pr/<spoke>/<PR#>/` |
| Hub PR labeled `deploy-doc-preview` | Hub + all spokes | `pr/hub/<PR#>/` |
| Spoke PR merged to main | That spoke | `/<rbp>/` |
| Push to hub `main` | Hub only | `/` |
| PR closed | — | Preview prefix deleted |

**Release:** no special trigger. Snapshot versions into `docs-versions/`, merge to main — the normal merge flow deploys to prod.

## PR previews

Add `deploy-doc-preview` to your PR. The hub posts a preview link as a PR comment and updates it on each push. Preview is cleaned up when the PR closes.

- **Spoke PR:** builds hub + the triggering spoke only. Other spoke nav links resolve to prod.
- **Hub PR:** builds hub first, then all spokes in parallel.

## Versioning

```
your-repo/
├── docs/                    ← next (unreleased)
└── docs-versions/
    ├── versions.json        ← ["v2.0", "v1.1"]
    └── versioned_docs/
        ├── version-v2.0/
        └── version-v1.1/
```

Run `scripts/cut-doc-version.sh <version>` to snapshot `docs/` into a new version, then merge to main.

## Local development

```sh
npm install

# Hub + all spokes
BUILD_ALL_SPOKES=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build

# Hub + one spoke (two builds — matches spoke PR preview)
HUB_ONLY=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build
SPOKE=genai BASE_URL=/genai/ SITE_URL=https://docs.example.com npm run build

# Single spoke at its prod path
SPOKE=genai BASE_URL=/genai/ SITE_URL=https://docs.example.com npm run build

# Hub only
HUB_ONLY=1 BASE_URL=/ SITE_URL=https://docs.example.com npm run build

# Use a local spoke checkout instead of cloning from GitHub
./scripts/clone-spokes.sh --use-local=owner/repo:/abs/path/to/checkout

npm run serve   # serve build/ at localhost:3000
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for spoke content conventions and how to register a new spoke.
