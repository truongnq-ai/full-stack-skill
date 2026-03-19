---
description: Orchestrate BA → DEV → QA → DevOps for delivering a new feature using existing workflows.
---

# 🧩 Feature Delivery (BA → DEV → QA → DevOps)

**Goal:** Deliver a new feature from requirements to production release with clear handoffs.

## Steps

0) **PM — Project Intake / Context Setup** → scan repo skills/workflows/docs/config; list exists vs missing; ask only missing/confirm inputs; use `skills/roles/devops/infra-basics`, `skills/roles/devops/env-promotion`, `skills/roles/devops/secrets-management`, `skills/roles/dev/code-ownership-boundaries`
1) **BA — Requirements** → run `plan-feature` Step 1–2; use `skills/roles/ba/requirements-elicitation`, `skills/roles/ba/system-modeling`, `skills/roles/ba/story-splitting`
2) **Checkpoint** → confirm scope + priority + timeline
3) **DEV — Implementation Plan** → continue `plan-feature` Step 3–4; use `skills/roles/dev/design-review-checklist`, `skills/roles/dev/architecture-decision-records`, `skills/roles/dev/api-contract`
4) **DEV — Build** → execute tasks in `task.md`; use `skills/roles/dev/implementation-workflow`, `skills/roles/dev/unit-test-best-practices`, `skills/roles/dev/security-basics`
5) **QA — Test Plan** → derive test cases from AC; use `skills/roles/qa/test-plan-template`, `skills/roles/qa/test-strategy`, `skills/roles/qa/traceability-matrix`
6) **QA — Execute** → run functional + regression tests; use `skills/roles/qa/execution-checklist`, `skills/roles/qa/bug-reporting-standard`, `skills/roles/qa/regression-testing`
7) **DevOps — Release** → run `smart-release`; use `skills/roles/dev/release-notes`, `skills/roles/devops/release-strategy`
8) **DevOps — Deploy** → run `deploy`; use `skills/roles/devops/deploy-basics`, `skills/roles/devops/monitoring`, `skills/roles/devops/incident-runbook`
9) **Post-Release** → monitor health + summarize release notes; use `skills/roles/devops/monitoring`, `skills/roles/writer/summary`

## Output Template

```yaml
summary: "<status + links to PRD, plan, task, release notes>"
risks: ["<risk 1>"]
next_checks: ["<qa or deploy verification step>"]
```
