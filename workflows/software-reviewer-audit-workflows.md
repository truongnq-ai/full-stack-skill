---
description: Reviewer audits AI agent workflows against 8-dimension quality framework. Produces scored report with structural compliance, cross-cutting checks, and improvement plan.
---

# 🔍 Reviewer Audit Workflows

> **Use this workflow when**: reviewer needs to evaluate workflow quality, validate new workflows before merging, or benchmark repo-wide workflow health. Trigger: `/software-reviewer-audit-workflows`.
>
> **Out of scope**: Does not review skills — use `software-reviewer-audit-skills`. Does not review rules — use `software-reviewer-audit-rules`.

---

## Step 1 — Inventory & Scope

```bash
ls workflows/*.md | wc -l
for f in workflows/*.md; do desc=$(head -3 "$f" | grep "description:" | sed 's/description: //'); echo "| $(basename $f) | $desc |"; done
```

> Confirm scope with user before deep audit.

---

## Step 2 — Structural Compliance

| Check | Pass Criteria |
|-------|--------------|
| S1: YAML frontmatter | `---` block with `description:` |
| S2: Title heading | Exactly one `# Title` (H1) |
| S3: Step numbering | `## Step N` or `## N.` pattern |
| S4: Step count | 3–9 steps (sweet spot: 5–7) |
| S5: Line count | ≤150 lines total |

---

## Step 3 — Deep Quality Audit (8 dimensions, 0–10 each)

| # | Dimension | What to Check |
|---|-----------|--------------|
| D1 | Scope & Responsibility | Single clear goal, not overloaded |
| D2 | Trigger Clarity | Agent knows WHEN to use |
| D3 | Step Decomposition | Sequential, logical, right granularity |
| D4 | Tool & Command Usage | Explicit tools/commands per step |
| D5 | Error Handling | Fallbacks defined for failures |
| D6 | Output Contract | Clear deliverables and exit criteria |
| D7 | User Interaction | Checkpoint gates defined |
| D8 | Token Efficiency | Concise, imperative, no filler |

Grade: A (65+/80), B (50–64), C (35–49), D (20–34), F (<20).

---

## Step 4 — Cross-Cutting Checks

| Check | Issue if Failed |
|-------|----------------|
| X1: Overlap | Two workflows same use case → confusion |
| X2: Naming | Kebab-case, matches `<domain>-<role>-<action>-<result>` |
| X3: Modularity | References skills instead of hardcoding |
| X4: Security | No destructive auto-approve commands |
| X5: Idempotency | Running twice doesn't break state |

---

## Step 5 — Scored Report

```
╔═══════════════════════════════════════════════╗
║        🔍 WORKFLOW AUDIT REPORT               ║
║  Workflows: [N]    Score: [X/80]              ║
╚═══════════════════════════════════════════════╝

| Workflow | D1–D8 | Total | Grade |
### 🔴 Critical | 🟠 Important | 🟡 Suggestions
```

---

## Step 6 — Improvement Plan

For each workflow below B: concrete fix plan with priority, dimension, current/target score, action.

---

## Done Criteria

- [ ] All workflows in scope audited
- [ ] Structural compliance verified
- [ ] Cross-cutting checks completed
- [ ] Scored report with improvement plan generated
