---
name: Blue/Green Deployment Strategy
description: Orchestrates zero-downtime, instantaneous cutover deployments by maintaining two identical production environments.
category: roles/devops
metadata:
  labels: [devops, release-management, blue-green, zero-downtime, deployment]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [blue green, cutover deployment, zero downtime, instant rollback]
---

# 🟢🔵 Blue/Green Deployment Strategy

> **Use this skill when**: the business requires absolute zero-downtime deployments, and the ability to rollback instantly (in milliseconds) if a defect is discovered immediately after launch. Trigger: `/devops-blue-green`.
>
> **Out of scope**: This is NOT a Canary release (partial traffic routing - see `canary-release/SKILL.md`). Blue/Green is an all-or-nothing traffic flip.

---

## 🚫 Anti-Patterns

- **Database Breaking Changes**: Deploying a Blue/Green code swap where the "Green" environment requires dropping a database column the "Blue" environment is currently using. (This causes immediate catastrophic failure).
- **Hardcoded IPs**: Using hardcoded IP addresses in the frontline DNS configuration instead of using an abstracted Load Balancer to flip the traffic seamlessly.
- **Rushing the Teardown**: Immediately destroying the old "Blue" environment 5 seconds after cutover. (Keep it alive for at least 1-24 hours for instant rollback capability).

---

## 🛠 Prerequisites & Tooling

1. A Reverse Proxy or Load Balancer (AWS Route53, Nginx, ALB).
2. Infrastructure as Code to provision double the compute resources temporarily.
3. Database schemas must be strictly backwards compatible.

---

## 🔄 Execution Workflow

### Step 1 — The Steady State (Blue)
Currently, **Blue (V1)** is receiving 100% of Production internet traffic.

### Step 2 — Provision the Next State (Green)
Provision **Green (V2)**. This is an entirely fresh cluster of servers running the new code.
Do not send users to it yet.

### Step 3 — Hidden Smoke Test
Green is online but hidden from the public.
Run automated API health checks and E2E Smoke Tests directly against the internal IPs of the Green cluster.

### Step 4 — The Cutover (The Flip)
In the Load Balancer/DNS:
Change the routing rule from `Target Group: Blue` to `Target Group: Green`.
100% of user traffic is instantly routed to Green.
*Blue receives zero new traffic, but finishes processing active requests in its queue (Draining).*

### Step 5 — Stabilization Window & Teardown
Monitor Green error logs aggressively for 1 hour.
- If errors spike -> Instantly revert Load Balancer to Blue. (Rollback takes < 2 seconds).
- If stable -> De-provision the Blue servers to save AWS costs. Green is now the new Blue.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Schema Mismatch | Green requires a new DB schema that breaks Blue | You must decouple the DB migration from the Code deployment. Shift to a 3-step Deploy: 1) Deploy non-breaking DB schema. 2) Blue/Green Code Flip. 3) Teardown old DB schema hours later. |
| Sticky Sessions | Users complain they were logged out during the flip | The Load Balancer relies on Sticky Sessions tied to specific VM instances. Migrate session storage to centralized Redis, keeping compute entirely stateless. |

---

## ✅ Done Criteria / Verification

A Blue/Green pipeline is successfully executed when:

- [ ] Transitioning User traffic from V1 to V2 generates 0 HTTP 502/503 errors.
- [ ] A complete fallback environment remains idling for the designated stabilization window post-deployment.
- [ ] Database migrations were proven to be backwards-compatible before the traffic flip.
