# CLAUDE.md — n8n-nodes-perfexcrm

Maintainer / AI-assistant notes for this repo. (User-facing docs live in `README.md`.)

## What this is
A **verified n8n community node** (`n8n-nodes-perfexcrm`) that connects PerfexCRM to n8n.
It is the client for the **PerfexCRM API & Webhooks** module sold at https://perfexapi.com.
- Main node: `nodes/PerfexCrm/PerfexCrm.node.ts` (REST CRUD — 19 resources, 171 operations)
- Trigger node: `nodes/PerfexCrm/PerfexCrmTrigger.node.ts` (99 webhook events)
- Credentials: `credentials/PerfexCrmApi.credentials.ts` (Header Auth: `X-API-KEY`, not JWT)

## ✅ n8n VERIFICATION — invariants that MUST stay true
This node was **verified by n8n** (verified community node, installable in one click on n8n Cloud
and self-hosted). n8n re-reviews **every new npm version**. Breaking any of these silently
disqualifies the *update* from being promoted to Cloud — so never change them without intent:

1. **Zero runtime dependencies.** `package.json` must have NO `dependencies` block — only
   `peerDependencies` (`n8n-workflow`) and `devDependencies`. Do not add a runtime dep "for convenience."
2. **License stays MIT** (`package.json` `"license": "MIT"` + `LICENSE` file).
3. **No env-var or filesystem access** in node code. All inputs come from node parameters.
4. **Keyword `n8n-community-node-package`** must remain in `package.json` `keywords`.
5. **English only** — node UI strings, descriptions, errors, and README.
6. **Published via GitHub Actions with provenance** (see below). n8n will NOT verify a version
   published from a local machine, and requires the **public repo source to match the npm release**
   (this is the "make changes transparent in your GitHub repository" requirement from n8n).
7. The package must keep passing `npx @n8n/scan-community-package n8n-nodes-perfexcrm`.

## Publishing (do NOT run `npm publish` by hand)
- **Trigger:** push to `main` (and `release: created`, and manual `workflow_dispatch`) →
  `.github/workflows/publish.yml` builds and publishes via **npm OIDC trusted publishing**
  (`id-token: write`, `--provenance`). There is **no `NPM_TOKEN`** anymore.
- **Idempotency guard:** the publish step skips if the `package.json` version is already on npm,
  so a docs-only push or a GitHub Release won't cause a duplicate-publish (E409) failure.
- **To release:** bump `version` in `package.json`, commit, push to `main`. CI does the rest.
  Check status: `gh run list --repo OBSTechnologies/n8n-nodes-perfexcrm --limit 3`.
- **Versioning:** plain semver — after `0.1.x` reaches `.9`, go to `0.2.0` (no `0.1.10`-style for the
  PerfexCRM *module*; this NODE repo is plain npm semver and `0.1.36`+ is fine).

## Tags & releases
- Lightweight git tags `vX.Y.Z` exist for each published version (backfilled). Keep tagging new
  releases so npm versions map 1:1 to git refs (the form n8n verifiers prefer).
- GitHub Releases are optional polish; thanks to the publish guard they won't re-trigger a publish.

## Local dev
`npm run dev` (tsc --watch) · `npm run build` · `npm run lint` · `npm test`.
After publishing, the user's local n8n must be updated separately — see the root
`C:\Users\malak\Herd\CLAUDE.md` "Updating Community Node on Localhost".
