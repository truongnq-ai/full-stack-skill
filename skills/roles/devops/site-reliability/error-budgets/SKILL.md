---
name: Error Budgets & Deployment Freezes
description: A governance framework that bridges Product Management and Site Reliability, using mathematical downtime allowances to dictate whether a team is allowed to release new features.
category: roles/devops
metadata:
  labels: [devops, sre, error-budgets, slo, governance, reliability]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [error budget, code freeze, deployment freeze, slo penalty]
---

# 📉 Error Budgets

> **Use this skill when**: arbitrating the eternal war between Developers (who want to ship features 100 times a day) and DevOps Operations (who want to freeze the code so nothing breaks). Trigger: `/devops-error-budget`.
>
> **Out of scope**: Calculating the raw baseline metrics. This assumes the SLOs (Service Level Objectives) are already defined via `slis-slos-slas/SKILL.md`.

---

## 🚫 Anti-Patterns

- **Zero Tolerance**: Demanding 100% uptime. (100% uptime is mathematically impossible without spending an infinite amount of money. 99.9% gives you a budget to work with).
- **Budget Without Consequences**: Tracking an Error Budget, dropping into the negative (failing the SLA), but the Product Manager forces the team to ship 10 new features anyway.
- **Punishing the Engineers**: Linking Error Budgets to developer bonuses or performance reviews, causing them to hide outages to protect their paychecks.

---

## 🛠 Prerequisites & Tooling

1. Defined SLO (e.g., 99.9% availability per month).
2. Advanced APM Tooling (Datadog/NewRelic) tracking the Burn Rate of the objective.

---

## 🔄 Execution Workflow

### Step 1 — Establish the Budget
If the SLO is 99.9% uptime over a 30-day month (43,200 minutes):
The **Error Budget** is exactly `43.2 minutes` of allowable downtime per month.

### Step 2 — Track the Burn Rate
If an incident takes the site down for `10 minutes`:
`10 / 43.2 = 23%`. The team just burned 23% of their monthly Error Budget.
The remaining budget is `33.2 minutes`.

### Step 3 — Daily Governance (The Green State)
If the Error Budget is positive (e.g., we have 30 minutes left this month):
**Action**: Deploy freely. Engineers are encouraged to take risks, deploy fast, and push new user features.

### Step 4 — Exhaustion Protocol (The Red State)
If the Error Budget hits 0 (or goes negative):
**Action**: The system automatically enforces a **Deployment Freeze**.
- No new product features are allowed to be merged.
- 100% of engineering bandwidth MUST be redirected to Reliability (Fixing tech debt, migrating to larger databases, improving test coverage).

### Step 5 — The Reset
The Error Budget operates on a rolling window (e.g., 28 days or 30 days).
As old outages naturally fall out of the trailing 30-day window, the budget regenerates. Once the budget returns to a positive state, the Deployment Freeze is lifted.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Executive Override | The Budget is empty, but the CEO demands a critical marketing feature goes live today | An Executive explicitly documents a **Budget Override**. They assume full liability if the deployment causes another outage. |
| Third-Party Outage | AWS goes down, draining your entire error budget | Nullify the burn calculation if the Root Cause is contractually out of the Engineering team's control. Do not punish the devs for AWS dropping a datacenter. |

---

## ✅ Done Criteria / Verification

An Error Budget framework is functional when:

- [ ] It calculates allowable downtime as a strict Mathematical formula `(100% - SLO)`.
- [ ] Product and Engineering leadership have formally agreed to physically halt feature deployments when the budget hits zero.
- [ ] Burn Rate alerts notify the team when they are consuming the budget too rapidly.
