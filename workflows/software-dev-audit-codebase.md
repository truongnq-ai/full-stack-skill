---
description: Dev audits entire codebase health — security, architecture, testing coverage. Produces scored report with phased improvement roadmap.
---

# 🏗️ Dev Codebase Audit

> **Use this workflow when**: dev needs to assess overall project health, onboard to a new codebase, or audit code quality. Trigger: `/software-dev-audit-codebase`.
>
> **Out of scope**: Does not review individual PRs — use `software-dev-review-code`. Does not review skills/workflows — use `software-reviewer-audit-*`.
>
> **Activates skills**: `skills/common/system-design/SKILL.md`, `skills/common/security-standards/SKILL.md`

---

## Step 1 — Project Discovery

```bash
ls -F
cat package.json 2>/dev/null || cat go.mod 2>/dev/null || cat pubspec.yaml 2>/dev/null
find . -maxdepth 2 -not -path '*/.*' -not -path '*/node_modules/*'
```

> **Fallback**: If no manifest found, `find . -maxdepth 3 -name "*.json" -o -name "*.yaml" | head -10`.

---

## ⏸️ Checkpoint: Confirm Scan Scope

```
"Detected: [stack] project with ~[N] source files.
Full scan will read ≤3 representative files + run grep metrics.
Proceed? (Y / N)"
```

---

## Step 2 — Health Metrics

```bash
find . -name "*_test.*" -o -name "*.spec.*" | wc -l
grep -riE "TODO|FIXME" . --exclude-dir=node_modules | wc -l
find src lib -type f | xargs wc -l 2>/dev/null | awk '$1 > 1000'
grep -riE "password|secret|apiKey|token" . --exclude-dir=node_modules -l | head -10
```

---

## Step 3 — Security & Architecture Audit

```bash
grep -rE "\+.*SELECT|\+.*INSERT|query\(.*\+" . --include="*.ts" --include="*.go"
grep -rE "Repository\.|db\." src/controllers 2>/dev/null | wc -l
```

> **Fallback**: If specialized skills unavailable, flag findings as best-effort.

---

## Step 4 — Deep Dive (3 Representative Files)

Pick 1 file per layer (UI, Logic, Data). Assess: typing strictness, error handling, modularity.

> **Fallback**: If <3 layers, pick the 3 largest source files.

---

## Step 5 — Scored Report

Save to `docs/codebase-review.md`. Scoring: Security 40%, Architecture 30%, Testing 30%.

```
## Codebase Review — [Project] — [Date]
### 📊 Score: [X]/100
### 🔴 CRITICAL FINDINGS
### 🟠 HIGH FINDINGS
### 🗺️ Improvement Roadmap
| Phase | Focus | Actions |
```

---

## Done Criteria

- [ ] `docs/codebase-review.md` saved with score
- [ ] Critical findings documented
- [ ] Improvement roadmap with phased plan
