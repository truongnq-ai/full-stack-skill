---
description: Reviewer audits AI agent skills — quick review, deep battle test, or benchmark mode. Evaluates SKILL.md quality across 10 dimensions with scored reports.
---

# 🧠 Reviewer Audit Skills

> **Use this workflow when**: reviewer needs to evaluate SKILL.md quality, test skill effectiveness, or benchmark skill compliance. Trigger: `/software-reviewer-audit-skills`.
>
> **Out of scope**: Does not review workflows — use `software-reviewer-audit-workflows`. Does not review rules — use `software-reviewer-audit-rules`.

---

## Step 1 — Select Audit Mode

| Mode | Scope | Go to |
|------|-------|-------|
| **Quick Review** | Single SKILL.md structural check + 10-dimension score | Step 2 |
| **Battle Test** | Deep audit of entire skills directory against Skill Creator standard | Step 3 |
| **Benchmark** | Measure skill effectiveness on actual project code | Step 4 |

---

## Step 2 — Quick Review (Single Skill)

```bash
f="path/to/SKILL.md"
echo "Lines: $(wc -l < $f)"
grep -c 'Use this skill when\|triggers:' $f
grep -c 'Anti-Pattern\|anti-pattern' $f
grep -c 'P0\|P1\|P2' $f
```

Score 10 dimensions (0–10, total 100): Purpose, Triggers, Anti-Patterns, Workflow, Tools, Error Handling, Verification, References, Token Efficiency, Modularity.

Grade: A (85+), B (65–84), C (45–64), D (25–44), F (<25).

For skills below B: simulate LLM behavior (activation, scope drift, hallucination, safety tests).

---

## Step 3 — Battle Test (Full Directory)

```bash
find . -name "SKILL.md" | sort
find . -name "SKILL.md" | wc -l
```

Per skill: structural check (frontmatter, triggers, anti-patterns, checklist, priority, line count).

Aggregate scores into directory-level report. Identify: missing skills, redundant skills, conflicting skills.

---

## Step 4 — Benchmark (Project Code)

```bash
cat AGENTS.md | head -80
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -rn | head -20
```

Auto-select worst file by anti-pattern severity. Build scorecard from active skills. Refactor and measure compliance delta.

Generate `.skillsrc` exclusion suggestions for non-applicable skills.

---

## ⏸️ Checkpoint: Confirm Scope

```
"Audit mode: [Quick/Battle/Benchmark]
Skills in scope: [N]
Proceed? (Y / N)"
```

---

## Step 5 — Generate Report

```
╔═══════════════════════════════════════════╗
║         🧠 SKILL AUDIT REPORT            ║
║  Skills: [N]    Score: [X/100]            ║
╚═══════════════════════════════════════════╝

| Skill | D1–D10 scores | Total | Grade |
### 🔴 Critical | 🟠 Important | 🟡 Suggestions
### Improvement Plan (per skill below B)
```

---

## Step 6 — Follow-up

Ask: (1) Fix critical now? (2) Generate task.md? (3) Deep-dive category? (4) Run battle-test?

---

## Done Criteria

- [ ] All skills in scope audited
- [ ] Scored report generated
- [ ] Critical findings documented
- [ ] Improvement plan for skills below B grade
