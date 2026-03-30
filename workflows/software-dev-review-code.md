---
description: Dev runs AI-assisted code review on PR diffs, specific files, or full project. Generates scored report with BLOCKER/MAJOR/NIT findings.
---

# 🔍 Dev Code Review

> **Use this workflow when**: dev needs to review code changes, a PR, or specific files before merging. Trigger: `/software-dev-review-code`.
>
> **Out of scope**: Does not review skill/workflow/rule files — use `software-reviewer-audit-*`. Does not auto-fix — generates report only.
>
> **Activates skills**: `skills/common/code-review/SKILL.md`, framework-specific skill if detected

---

## Step 1 — Define Review Scope

| Mode | Action |
|------|--------|
| **Diff Review** | `git fetch origin <base> && git diff origin/<base>...HEAD` |
| **Specific Files** | User provides paths → `view_file` each |
| **Full Project** | `list_dir src/` → review in batches of ≤10 files |

> **Fallback**: If `git diff` returns empty, run `git log --oneline -10` and ask user to confirm base branch.

---

## Step 2 — Load Skills & Detect Framework

```bash
view_file skills/common/code-review/SKILL.md
list_dir src/
```

**Persona**: Principal Engineer. **Focus order**: Logic → Security → Architecture (P0), then Style (P1).

> **Fallback**: If skill missing, review through: logic correctness, auth/injection security, layer coupling, code style.

---

## Step 3 — Generate Report

Save to `docs/code-review.md`:

```
## Code Review Report — [Date] — [Scope]
### 🔴 BLOCKER
- **[FILE:LINE]** [Finding] — [Why] — [Fix]
### 🟠 MAJOR
- **[FILE:LINE]** [Finding] — [Fix]
### 🟡 NIT
- **[FILE:LINE]** [Suggestion]
### ✅ Summary
BLOCKERs: N | MAJORs: N | NITs: N | Files: N
```

---

## Step 4 — Implementation Planning

Ask: _"Implement feedback now?"_

- **YES** → Parse BLOCKERs/MAJORs into `task.md` checklist. Apply `skills/common/tdd/SKILL.md` for logic changes.
- **NO** → End. Report saved to `docs/code-review.md`.

---

## Step 5 — Skill Feedback Sweep

For each BLOCKER/MAJOR: _"Was there an active skill that should have prevented this?"_

- **YES** → Report skill gap with: skill-id, finding, expected instruction, actual behavior, suggestion.
- **NO** → Note: consider creating skill via `software-dev-create-skillset`.

---

## Done Criteria

- [ ] `docs/code-review.md` saved with all findings
- [ ] Skill feedback sweep completed for all BLOCKERs
- [ ] Implementation plan created if user chose YES
