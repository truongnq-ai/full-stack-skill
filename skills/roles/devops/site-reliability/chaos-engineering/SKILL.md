---
name: Chaos Engineering Protocol
description: Strategic, controlled introduction of failures into a system to validate resiliency, fallback architectures, and team incident response capabilities.
category: roles/devops
metadata:
  labels: [devops, sre, chaos, failure-injection, resilience]
  triggers:
    priority: low
    confidence: 0.8
    keywords: [chaos monkey, chaos engineering, break the system, test resilience]
---

# 🌪️ Chaos Engineering Protocol

> **Use this skill when**: building a highly-available distributed system that claims to be "self-healing", and applying the scientific method to prove that claim before a real outage does. Trigger: `/devops-chaos`.
>
> **Out of scope**: This is NOT for destabilizing a fragile legacy system. If you know the system will crash when you turn off the DB, don't run a Chaos test to prove it. Fix the architecture first.

---

## 🚫 Anti-Patterns

- **Uncoordinated Destruction**: Taking a server offline in Production on a Tuesday morning without telling anyone, causing a SEV-1. (Chaos engineering is highly orchestrated).
- **Ignoring Blast Radius**: Triggering a chaos script that accidentally destroys 100% of the nodes instead of 10%. (Always cap the maximum destruction limit).
- **Chaos Before Stability**: Running Chaos tools on a system that already crashes twice a week on its own. (Achieve 99.9% uptime *first*, then start Chaos testing).

---

## 🛠 Prerequisites & Tooling

1. A highly stable baseline architecture with Auto-Scaling and Load Balancing.
2. Tools like Chaos Mesh, Gremlin, or AWS Fault Injection Simulator.
3. The "Game Day" participants (DevOps, Dev, QA Leads).

---

## 🔄 Execution Workflow

### Step 1 — Formulate the Hypothesis
Apply the scientific method. Do not just break things randomly.
- *Hypothesis*: "If we terminate 1 of our 3 Redis cache nodes, the Cluster will auto-elect a new master within 5 seconds, and user error rates will not exceed 1%."

### Step 2 — Define Abort Conditions
Establish an emergency kill switch.
- *Abort criteria*: "If HTTP 500 errors exceed 5%, or if checkout fails, we instantly halt the experiment and execute the repair playbook."

### Step 3 — The Game Day (Execution)
Run the experiment in a controlled environment (preferably Staging first, but mature teams do this in Production).
Inject the failure precisely.
- Inject 200ms of network latency.
- Kill a Pod.
- Block port 5432 (DB).

### Step 4 — Observe and Measure
Watch the Golden Metrics (`monitoring/dashboard-design/SKILL.md`).
- Did the alert fire correctly?
- Did the system auto-recover as hypothesized?
- Did the standby node take over?

### Step 5 — The Debrief (RCA)
Whether the system survived or failed, write a report.
If it failed, treat it as a formal outage: write Action Items to fix the Auto-Scaling script or the Circuit Breaker code logic.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Cascading Failure | Killing 1 node accidentally caused all 10 nodes to collapse from overload | Hit the Abort Switch instantly. The system lacks basic load-shedding capabilities. The architecture must be rewritten to implement Bulkheads. |
| Alert Silence | The system failed over perfectly, but Opsgenie didn't page anyone | The system architecture is excellent, but the Observability config is broken. Fix `alert-setup/SKILL.md` to trigger on failover events. |

---

## ✅ Done Criteria / Verification

A Chaos Engineering experiment is complete when:

- [ ] The blast radius was strictly defined and approved by Engineering Leadership prior to execution.
- [ ] A concrete Hypothesis was tested against objective metric thresholds.
- [ ] The experiment resulted in tangible architectural or observability Action Items added to the backlog.
