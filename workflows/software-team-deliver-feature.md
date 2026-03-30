---
description: Team orchestrates full feature delivery from BA requirements through DEV implementation, QA testing, to DevOps deployment with clear role handoffs.
---

# 🧩 Team Deliver Feature

> **Use this workflow when**: team needs to deliver a complete feature from requirements to production with structured role handoffs. Trigger: `/software-team-deliver-feature`.
>
> **Out of scope**: Does not handle single-domain tasks — use the relevant role-specific workflow directly.

---

## Step 0 — PM Project Intake

Scan repo: skills, workflows, docs, config. List what exists vs missing.

Use: `skills/roles/devops/infra-basics`, `skills/roles/dev/code-ownership-boundaries`

---

## Step 1 — BA Requirements

Run `software-ba-gather-requirements` (Steps 1–5).

Use: `skills/roles/ba/requirements-elicitation`, `skills/roles/ba/system-modeling`

---

## ⏸️ Checkpoint: Confirm Scope

```
"Requirements gathered. Confirm scope + priority + timeline? (Y / N)"
```

---

## Step 2 — PO Planning

Run `software-po-plan-feature` (Steps 1–4).

Use: `skills/roles/dev/design-review-checklist`, `skills/roles/dev/architecture-decision-records`

---

## Step 3 — DEV Build

Execute tasks in `task.md`.

Use: `skills/roles/dev/implementation-workflow`, `skills/roles/dev/unit-test-best-practices`, `skills/roles/dev/security-basics`

---

## Step 4 — QA Test

Run `software-qa-write-testplan` → `software-qa-execute-testplan`.

Use: `skills/roles/qa/test-plan-template`, `skills/roles/qa/execution-checklist`, `skills/roles/qa/regression-testing`

---

## Step 5 — DevOps Release

Run `software-devops-prepare-release` → `software-devops-deploy-release`.

Use: `skills/roles/devops/deploy-basics`, `skills/roles/devops/monitoring`

---

## Step 6 — Post-Release

Monitor health 30 min. Summarize release notes.

Use: `skills/roles/devops/monitoring`, `skills/roles/writer/summary`

---

## Done Criteria

```yaml
summary: "<status + links to PRD, plan, task, release notes>"
risks: ["<risk 1>"]
next_checks: ["<qa or deploy verification step>"]
```

- [ ] Requirements documented
- [ ] Implementation plan approved
- [ ] All tasks completed
- [ ] QA sign-off obtained
- [ ] Deployed and healthy
