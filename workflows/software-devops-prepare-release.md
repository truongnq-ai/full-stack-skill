---
description: DevOps prepares release artifacts — analyzes changes, bumps version, updates changelog, and creates release commit ready for deployment.
---

# 📦 DevOps Prepare Release

> **Use this workflow when**: DevOps needs to prepare a new version release with proper versioning and changelog. Trigger: `/software-devops-prepare-release`.
>
> **Out of scope**: Does not deploy — use `software-devops-deploy-release` after preparation. Does not create GitHub releases — only prepares local artifacts.
>
> **Activates skills**: `skills/roles/dev/release-notes/SKILL.md`, `skills/roles/devops/release-strategy/SKILL.md`

---

## Step 1 — Analyze Changes

```bash
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~10")
git diff --name-only $LATEST_TAG..HEAD
git log $LATEST_TAG..HEAD --pretty=format:"- %s"
```

> **Fallback**: If no tags, `git log --oneline -20` + ask user to identify last stable point.

---

## Step 2 — Detect Version Bump

| Changed Area | Bump |
|-------------|------|
| Bug fixes only | PATCH |
| New feature/command | MINOR |
| Breaking change | MAJOR |
| Docs only | No bump |

---

## ⏸️ Checkpoint: Confirm Version

```
"Changes detected: [summary]
Recommended: [MAJOR/MINOR/PATCH] → [current] → [new]
Confirm? (Y / N — specify manually)"
```

---

## Step 3 — Synchronize Metrics

```bash
pnpm calculate-tokens 2>/dev/null || echo "Token metrics skipped"
```

> **Fallback**: If script missing, note in changelog: "Token metrics not recalculated."

---

## Step 4 — Update Artifacts

| File | Change |
|------|--------|
| `package.json` | Bump `version` |
| `CHANGELOG.md` | Add entry under new version |
| `README.md` | Update version badges |

---

## Step 5 — Review & Commit

```bash
git diff --stat
git add . && git commit -m "chore(release): prepare v[VERSION]"
```

---

## Done Criteria

- [ ] Version bumped in all relevant files
- [ ] `CHANGELOG.md` updated
- [ ] Commit created with `chore(release):` prefix
- [ ] User informed: `git tag v[VERSION] && git push origin v[VERSION]`
