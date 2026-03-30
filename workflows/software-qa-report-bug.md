---
description: QA reports bugs with standardized format — reproduction steps, severity classification, root cause analysis lite, and triage assignment.
---

# 🐞 QA Bug Report

> **Use this workflow when**: QA discovers a defect during testing and needs to document it properly. Trigger: `/software-qa-report-bug`.
>
> **Out of scope**: Does not fix bugs — use `software-dev-fix-bug`. Does not verify fixes — use `software-qa-execute-testplan`.
>
> **Activates skills**: `skills/roles/qa/bug-reporting-standard/SKILL.md`, `skills/roles/qa/bug-triage/SKILL.md`, `skills/roles/qa/rca-lite/SKILL.md`

---

## Step 1 — Load Bug Reporting Skill

```
view_file skills/roles/qa/bug-reporting-standard/SKILL.md
```

> **Fallback**: If skill missing, use template from Step 3 directly.

---

## Step 2 — Classify Severity

| Severity | Definition | Response |
|----------|-----------|----------|
| **S1 — Critical** | System crash, data loss, security breach | Fix immediately |
| **S2 — Major** | Core feature broken, no workaround | Fix this sprint |
| **S3 — Minor** | Feature works with workaround | Fix next sprint |
| **S4 — Cosmetic** | UI polish, typo | Backlog |

---

## Step 3 — Write Bug Report

Save to `docs/qa/bugs/bug-[YYYY-MM-DD]-[NNN].md`:

```
## Bug Report — [ID]

### Title: [One-line summary]
### Severity: S1/S2/S3/S4
### Environment: [local/staging/prod] — [browser/device]
### AC Reference: [AC-NNN] (if applicable)

### Steps to Reproduce
1. [Exact step]
2. [Exact step]
3. [Exact step]

### Expected Result
[What should happen]

### Actual Result
[What actually happened — include error message/screenshot]

### Evidence
- Screenshot: [path or inline]
- Log excerpt: [relevant lines]

### RCA Lite (Root Cause Hypothesis)
[QA's best guess at what's causing this]

### Suggested Assignee: [dev name or team]
```

---

## Step 4 — Apply RCA Lite

```
view_file skills/roles/qa/rca-lite/SKILL.md
```

Quick analysis: Where in the flow does it break? Is it data, logic, or integration issue?

> **Fallback**: If RCA skill missing, categorize as: Frontend / Backend / Database / Integration / Config.

---

## Step 5 — Triage Assignment

```
view_file skills/roles/qa/bug-triage/SKILL.md
```

Assign based on: S1/S2 → immediate sprint, S3 → next sprint, S4 → backlog.

---

## Done Criteria

- [ ] Bug report saved to `docs/qa/bugs/`
- [ ] Severity classified (S1–S4)
- [ ] Steps to reproduce are exact and repeatable
- [ ] RCA hypothesis documented
- [ ] Assignee suggested
