---
description: Benchmark AI skill effectiveness by measuring implementation quality against legacy constraints. The agent auto-selects a Legacy Trap and grades output against active skills. Works on any tech stack.
---

# 📊 Skill Benchmark Workflow

> **Use this workflow when**: user wants to measure how much active skills improve code quality, verify skills are triggering correctly, or validate `.skillsrc` configuration. Trigger phrases: "benchmark my skills", "are skills working?", "test skill effectiveness", `/skill-benchmark`.
>
> **Out of scope**: Does not audit skill content quality — use `skill-review` for that. Does not review workflows or rules.
>
> **Applicable rules**: `agent-skill-standard-rule` • `file-safety-rule` • `skill-integrity-rule` • `commit-message-rule`

---

## Step 1 — Discover Project & Active Skills

```bash
cat AGENTS.md | head -80                      # list active skills
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l 2>/dev/null | sort -rn | head -20  # largest files
```

> **Fallback**: If `AGENTS.md` not found, run `find . -name ".skillsrc" | head -5` to locate skill config. If neither found, ask user to specify active skills manually.

---

## Step 2 — Auto-Select Legacy Trap

Agent picks the worst file automatically. Rank candidates by anti-pattern severity:

| Priority | Signal |
|----------|--------|
| P0 | Hardcoded secrets / API keys |
| P0 | Business logic inside UI components |
| P1 | Wrong Router pattern (App vs Pages mismatch) |
| P1 | Global state used for local/URL-driven concerns |
| P1 | Hardcoded pixel values or missing design tokens |
| P2 | Raw user-facing strings (i18n violations) |

> Report: State selected file and justification before proceeding.

---

## Step 3 — Build Scorecard & Refactor

Build scorecard from active P0/P1 skills, then refactor. For each change, cite the exact skill rule applied.

| Skill | P-Level | Failure Pattern | Success Pattern |
|-------|---------|-----------------|-----------------|
| Security | P0 | Hardcoded secrets | `process.env.*` or vault |
| Architecture | P0 | Fetch/logic in UI | Service layer or hook |
| Pages Router | P0 | `app/` patterns in pages | Stays in `pages/` |
| State Management | P1 | Bare `useSelector` | Typed domain hook |
| Styling | P1 | Hardcoded `px` values | CSS variables / tokens |
| i18n | P1 | Raw JSX strings | `FormattedMessage` / `t()` |

> **Rule**: Use `view_file` to read the affected file before any modification.

---

## Step 4 — Benchmark Report

Save to `docs/skill-benchmark-report.md` (create `docs/` if missing):

```
## Skill Benchmark — [File] — [Date]

| Criteria | P-Level | Before | After | Evidence |
|----------|---------|--------|-------|----------|
| [Skill] | P0/P1 | ❌ | ✅ | [One-line note] |

Compliance Score:
- Before: X/N = X%
- After:  Y/N = Y%
- Δ Delta: +Z% 🚀
```

---

## Step 5 — Skill Applicability Report

Evaluate every skill in `AGENTS.md` against the actual project:

| Skill | Applicable? | Reason | Recommendation |
|-------|------------|--------|----------------|
| [skill] | ✅ YES / ⚠️ PARTIAL / ❌ NO | [Evidence] | Keep / Exclude |

Generate suggested `.skillsrc` exclusions:

```yaml
nextjs:
  exclude:
    - skill-name # reason: not applicable because [X]
```

> ⚠️ Never exclude P0 security or architecture skills without strong justification.

---

## Step 6 — Root Cause Analysis

For every `❌ FAIL` in Steps 4-5, identify root cause:

| Failure | Root Cause | Fix |
|---------|-----------|-----|
| Skill ignored | Trigger not matching file | Refine `packages`/`files` in registry |
| Rule too vague | Anti-pattern unclear | Run `skill-review` on offending skill |
| Pattern missing | No reference code | Add to `references/` folder |
| Skills conflict | Two skills contradict | Ensure P0 overrides P1 |

> **Fallback**: If root cause is unclear, run `battle-test` workflow for full skill audit.
