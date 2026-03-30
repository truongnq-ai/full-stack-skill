---
description: Reviewer audits AI agent rules — evaluates behavioral constraints for LLM compliance, conflict detection, and enforcement reliability.
---

# 📏 Reviewer Audit Rules

> **Use this workflow when**: reviewer needs to evaluate rule files quality, detect conflicts between rules, or validate new rules. Trigger: `/software-reviewer-audit-rules`.
>
> **Out of scope**: Does not review workflows — use `software-reviewer-audit-workflows`. Does not review skills — use `software-reviewer-audit-skills`.

---

## Step 1 — Inventory & Discovery

```bash
find . -name "*.md" -path "*rules*" | sort
grep -rn "carefully\|appropriate\|when possible\|try to\|consider" .agent/rules/ 2>/dev/null
grep -rL "applies when\|only when\|scope:" .agent/rules/ 2>/dev/null
find .agent/rules/ -name "*.md" -exec awk 'END{if(NR>80) print FILENAME": "NR" lines"}' {} \;
```

> **Fallback**: If no rules directory, ask user to specify rule file paths.

---

## Step 2 — Structural Compliance

| Check | Pass Criteria |
|-------|--------------|
| S1: Scope defined | Has "applies when" or trigger context |
| S2: Constraints are imperative | Uses "MUST", "NEVER", not "should", "try to" |
| S3: Line count | ≤80 lines per rule file |
| S4: No vague language | No "carefully", "appropriate", "when possible" |
| S5: Testable criteria | Each constraint can be verified as pass/fail |

---

## Step 3 — Deep Quality Audit (6 dimensions, 0–10 each)

| # | Dimension | What to Check |
|---|-----------|--------------|
| D1 | **Scope Precision** | When does this rule activate? Clear boundaries? |
| D2 | **Constraint Strength** | Will LLM actually follow this? Imperative language? |
| D3 | **Conflict Safety** | Does it contradict other rules? Priority defined? |
| D4 | **Enforcement Mechanism** | How to verify compliance? Testable? |
| D5 | **Token Efficiency** | Concise? No repetitive instructions? |
| D6 | **Coverage** | Does it cover the intended scope without gaps? |

Grade: A (50+/60), B (38–49), C (26–37), D (15–25), F (<15).

---

## Step 4 — Conflict Detection

Cross-reference all rules for contradictions:

| Rule A | Rule B | Conflict | Resolution |
|--------|--------|----------|------------|
| [rule] | [rule] | [description] | [which takes priority] |

> **Rule**: If conflict found, flag as 🔴 CRITICAL. A conflicted rule set causes unpredictable LLM behavior.

---

## ⏸️ Checkpoint: Review Results

```
"Rules audited: [N]
Conflicts found: [N]
Rules below B grade: [N]
Proceed to report? (Y / N)"
```

---

## Step 5 — Scored Report

```
╔═══════════════════════════════════════════╗
║        📏 RULE AUDIT REPORT              ║
║  Rules: [N]    Score: [X/60]             ║
╚═══════════════════════════════════════════╝

| Rule | D1–D6 | Total | Grade |
### 🔴 Conflicts | 🟠 Vague Rules | 🟡 Suggestions
```

---

## Done Criteria

- [ ] All rules in scope audited
- [ ] Conflict detection completed
- [ ] Vague language flagged
- [ ] Scored report generated
