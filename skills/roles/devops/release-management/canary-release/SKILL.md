---
name: Canary Release Strategy
description: Orchestrates risk-mitigated deployments by routing a small percentage of live production traffic to a new version, monitoring closely before scaling up.
category: roles/devops
metadata:
  labels: [devops, release-management, canary, traffic-splitting, progressive-delivery]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [canary release, traffic splitting, gradual rollout, 10% deploy]
---

# 🐤 Canary Release Strategy

> **Use this skill when**: deploying a high-risk backend algorithm or major architectural overhaul where you want to test the blast radius on 5% of real users before exposing 100%. Trigger: `/devops-canary`.
>
> **Out of scope**: This is not Blue/Green (which is a 100% instant flip). Canary is a mathematically measured, progressive traffic shift.

---

## 🚫 Anti-Patterns

- **Deploying on Friday at 4 PM**: Starting a 12-hour Canary rollout right before the DevOps team goes home for the weekend.
- **Ignoring the Baseline**: Routing 5% to the Canary, but having no automated monitoring comparing the 5% error rate against the 95% baseline (The Canary is useless if nobody is watching it).
- **Session Splitting**: Routing a user's `Page 1` request to Canary, and their `Page 2` request to Stable. (This causes catastrophic state bugs. Canaries absolutely must map permanently via User ID or Session Token).

---

## 🛠 Prerequisites & Tooling

1. Advanced Traffic Router (e.g., AWS ALB Weighted Target Groups, Kubernetes Istio, Nginx Split Clients).
2. Advanced Observability comparing Metric `Version=V1` against `Version=V2`.

---

## 🔄 Execution Workflow

### Step 1 — Deployment & Routing Config
Deploy the New Version (V2) servers.
Configure the Ingress Router to weight traffic:
- **Target `Stable`**: 95%
- **Target `Canary`**: 5%

*Crucial*: Implement "Sticky Routing". Once User 123 hits the Canary, append a Cookie or read their JWT so they are locked into Canary. Do not bounce them between versions.

### Step 2 — The Evaluation Window
Set a defined temporal window (e.g., 2 hours).
Observe the RED metrics (Rate, Error, Duration).
Is Canary's HTTP 500 rate mathematically worse than Stable's HTTP 500 rate?

### Step 3 — Progressive Stepping
If the 5% Canary is stable, do not jump to 100%. Progress geometrically:
- Shift to `20%` Canary. Wait 2 hours.
- Shift to `50%` Canary. Wait 2 hours.
- Shift to `100%` Canary (Cutover).

### Step 4 — Automated Rollback (Progressive Delivery)
Configure the pipeline (e.g., using ArgoCD or Flagger) to automatically revert traffic back to 100% Stable if the Canary metrics breach the defined SLO threshold. Never rely on a human to manually click "Revert" if 5% of users are experiencing hard crashes.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Data Corruption | The 5% canary writes corrupted data to the production DB | Canary releases limit the *blast radius*, but they don't prevent DB corruption. You must immediately run a DB rollback script targeting the specific User IDs caught in the Canary blast zone. |
| Inconclusive Test | Only 10 users hit the 5% Canary partition | 5% of zero is zero. The Canary validation window must be extended until absolute traffic volume generates statistical significance to prove stability. |

---

## ✅ Done Criteria / Verification

A Canary sequence is successfully complete when:

- [ ] Traffic weighting was strictly enforced and users were session-locked to their designated partition.
- [ ] Explicit metric comparison occurred during the validation window.
- [ ] At 100% cutover, the old instances were gracefully drained and deprovisioned.
