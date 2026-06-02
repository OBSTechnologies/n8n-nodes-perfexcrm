# Publishing n8n-nodes-perfexcrm

> **⚠️ Do NOT run `npm publish` by hand.** This package is a **verified n8n community node**.
> n8n re-reviews every npm version and requires it to be published from **GitHub Actions with
> provenance**, from public source that matches the repo. A manual `npm publish` drops provenance
> and can silently disqualify the version from n8n Cloud. Publishing is fully automated — see below.

## How publishing works (automated)

Publishing is handled by **`.github/workflows/publish.yml`** using npm **OIDC trusted publishing**
(`id-token: write` + `npm publish --provenance`). There is **no `NPM_TOKEN`**.

- **Triggers:** push to `main`, creating a GitHub Release, or manual `workflow_dispatch`.
- **Idempotency guard:** the publish step skips automatically if the version in `package.json` is
  already on npm, so re-pushes and releases never cause a duplicate-publish (E409) failure.

## To release a new version

1. Make changes on a branch and open a PR (or commit to `main`).
2. Bump `version` in `package.json` (plain semver, e.g. `0.1.36` → `0.1.37`).
3. Push to `main` — GitHub Actions builds and publishes to npm automatically.
4. (Recommended) Tag so npm versions map 1:1 to git refs:
   `git tag vX.Y.Z && git push origin vX.Y.Z`, and/or cut a GitHub Release.
5. Verify: `npm view n8n-nodes-perfexcrm version` and
   `gh run list --repo OBSTechnologies/n8n-nodes-perfexcrm --limit 3`.

## Keeping verified status (do not break these)

Every release must keep: **zero runtime dependencies** (only `peerDependencies`), **MIT license**,
**no env-var / filesystem access** in node code, the `n8n-community-node-package` keyword,
**English-only** UI/docs, and **GitHub-Actions + provenance** publishing from the public repo.
See `CLAUDE.md` for the full invariant list.

## Installing in n8n (for users)

- **Verified (recommended):** in n8n v1.94+, open the nodes panel → **More from the community** →
  search "Perfex" → install in one click (works on **n8n Cloud** and self-hosted).
- **Manual:** Settings → Community Nodes → Install → `n8n-nodes-perfexcrm`.

## Resources
- [npm package](https://www.npmjs.com/package/n8n-nodes-perfexcrm)
- [Install verified community nodes — n8n Docs](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)
- [Semantic Versioning](https://semver.org/)
