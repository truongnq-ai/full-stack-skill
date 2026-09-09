---
description: Rigorous plan review and hardening workflow before execution on IDE or agents.
---

# 🛡️ Plan Review & Hardening Workflow (`/review-plan`)

> **Use this workflow when**: User or agent has drafted an implementation plan and needs a strict Tech Lead audit before coding. Trigger phrases: `/review-plan`, "review plan", "kiểm tra plan".
>
> **Activates skill**: `skills/common/review-plan/SKILL.md`

---

## Step 1 — Ingest & Scan Plan Against 12-Point Checklist

Target plan: explicit path, active IDE document, or latest `implementation_plan.md` / `docs/plans/*.md`.

Load checklist and scan the target plan:

```
view_file skills/common/review-plan/references/checklist.md
```

- Flag placeholders (`TODO`, `TBD`, "implement later", "add tests").
- Check edge cases, rollback scripts, and error recovery paths.

---

## Step 2 — Cross-System Impact & Regression Analysis

Analyze dependencies and potential breakages:

- API contract breaking changes.
- Database schema locking or migration hazards.
- Authentication, authorization, and secret leaks.

---

## Step 3 — Ambiguity Check & Fail-Safe Gate

If resolving any finding requires picking an architecture or guessing user intent:

- **HALT EXECUTION**: Do not assume.
- Activate `skills/common/questioning/SKILL.md` using the `/question` format.
- Wait for user decision before proceeding to Step 4.

---

## Step 4 — Generate Hardened Revised Plan

Synthesize report and deliver drop-in Revised Plan using template:

```
view_file skills/common/review-plan/references/review-template.md
```

- Decompose tasks into atomic 2–5 min TDD steps (test fail → pass → commit).
- Present output clearly for user confirmation.

---

## ⏸️ Checkpoint: Await Plan Approval

```
"Hardened plan ready. Proceed to execution? (Y / specify changes)"
```

---

## Output (Strict)

```yaml
summary: "<summary of gaps fixed and plan status>"
risks: ["<remaining external risk 1>"]
next_checks: ["<first execution task to run>"]
```
