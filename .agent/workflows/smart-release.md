---
description: Automatically prepare a release by analyzing changes, bumping versions, and updating changelog/readme.
---

# 🚀 Smart Release Workflow

> **Use this workflow when**: user wants to publish a new version, bump version numbers, or update changelog. Trigger phrases: "release new version", "bump version", "prepare release", `/smart-release`.
>
> **Out of scope**: Does not deploy to production or push Docker images — use `orchestrate` with `devops-engineer` agent for that. Does not create GitHub/GitLab releases — only prepares local artifacts.
>
> **Applicable rules**: `agent-skill-standard-rule` • `file-safety-rule` • `skill-integrity-rule` • `dependency-rule` • `commit-message-rule`

---

## Step 1 — Analyze Changes Since Last Release

```bash
# Get latest release tag
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~10")

# Changed files
git diff --name-only $LATEST_TAG..HEAD

# Commit log
git log $LATEST_TAG..HEAD --pretty=format:"- %s"
```

> **Fallback**: If no tags exist, run `git log --oneline -20` to get recent commits and ask user to identify the last stable point manually.

---

## Step 2 — Smart Version Detection

Analyze changed files to determine version bump type:

| Changed Area | Bump Type | Condition |
|-------------|-----------|-----------|
| `cli/` | **PATCH** | Bug fixes only |
| `cli/` | **MINOR** | New command or option added |
| `cli/` | **MAJOR** | Breaking change (removed flag, changed config format) |
| `skills/<category>/` | **PATCH** for that category | Any skill content change |
| `README.md` / docs only | **No bump** | Documentation only |

Present detected bump recommendation to user and ask to confirm.

---

## ⏸️ Checkpoint: Confirm Version

```
"Detected changes: [summary of areas changed]
Recommended bump: [MAJOR/MINOR/PATCH] → [current] → [new version]

Confirm? (Y = proceed / N = specify version manually)"
```

---

## Step 3 — Synchronize Metrics

// turbo
```bash
pnpm calculate-tokens
```

> **Fallback**: If `calculate-tokens` script not found, skip and note in changelog: "Token metrics not recalculated — run manually before next release."

---

## Step 4 — Update Release Artifacts

Apply edits to these files (use `view_file` before each edit):

| File | Change |
|------|--------|
| `cli/package.json` | Bump `version` field |
| `cli/src/index.ts` | Bump version constant if present |
| `skills/metadata.json` | Bump version + update `last_updated` |
| `CHANGELOG.md` | Add structured entry under new version tag |
| `README.md` | Update version badges in support table |

---

## Step 5 — Review & Commit

Present full diff of changes to user before committing:

```bash
git diff --stat
```

// turbo
```bash
git add . && git commit -m "chore(release): prepare release for [VERSION]"
```

**Done criteria:**

- [ ] Version bumped in all relevant files
- [ ] `CHANGELOG.md` updated with new entry
- [ ] Token metrics recalculated (or skipped with note)
- [ ] Commit created with `chore(release):` prefix
- [ ] User informed of next step: `git tag [tag] && git push origin [tag]`
