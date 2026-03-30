---
name: Capacity Planning
description: Principles for mathematically projecting hardware and cloud infrastructure requirements to prevent outages during traffic spikes (e.g., Black Friday).
category: roles/devops
metadata:
  labels: [devops, sre, capacity, scaling, infrastructure-planning]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [capacity planning, scale up, project traffic, handle load]
---

# 📈 Capacity Planning

> **Use this skill when**: the business projects a 5x increase in traffic for an upcoming marketing event, and you need to guarantee the cloud infrastructure will not collapse under the load. Trigger: `/devops-plan-capacity`.
>
> **Out of scope**: Writing the literal Terraform code to add the servers (Use `ias-terraform/SKILL.md`). This is the mathematical justification of *how many* servers to add.

---

## 🚫 Anti-Patterns

- **"Just Turn on Auto-Scaling"**: Assuming Auto-Scaling Groups (ASGs) will instantly fix a 10,000% spike. (ASGs take 3-5 minutes to boot a new VM. The server will crash in second 5).
- **Ignoring the Database**: Scaling the Web tier from 5 nodes to 50 nodes, but leaving the Database at 1 node. The 50 web nodes will instantly overwhelm the DB Connection Pool and crash the entire company.
- **Over-provisioning Forever**: Spinning up $50,000 worth of servers for a 1-day event, and then forgetting to turn them off for 6 months.

---

## 🛠 Prerequisites & Tooling

1. Baseline metrics from previous peak loads (Requests Per Second, CPU utilization).
2. Defined Business Target (e.g., "We expect 500,000 concurrent users at noon on Friday").
3. `roles/qa/performance-testing/load-testing/SKILL.md` (To validate the math).

---

## 🔄 Execution Workflow

### Step 1 — Establish the Baseline Metric (Throughput per Node)
Mathematically define what a single server can comfortably handle.
- *Node A*: m5.large (2 vCPU, 8GB RAM).
- Under load testing, Node A peaks at 80% CPU handling 500 Requests Per Second (RPS).
- **Golden Ratio**: `1 Node = 500 RPS`.

### Step 2 — Project the Target
Calculate the raw compute required for the Business Target.
- Target: 10,000 RPS.
- Raw Compute: `10000 / 500 = 20 Nodes`.
- Add a 20% Safety Buffer (N+2 redundancy): Plan for **24 Nodes**.

### Step 3 — Calculate the Bottleneck (The Database)
If 24 Web Nodes spin up, and each opens 50 DB connections, the DB must support 1,200 concurrent connections.
Check the PostgreSQL `max_connections` limit. If the limit is 500, the system WILL fail.
*Solution*: Introduce connection pooling (PgBouncer) or scale the DB vertically (larger memory instance) *before* the web tier spikes.

### Step 4 — Pre-Warming (The Spike Curve)
If the 10,000 RPS will hit exactly at 12:00:00 PM (e.g., a ticket sale drop):
Do not rely on reactive Auto-Scaling.
Schedule an AWS target-capacity increase at exactly 11:30:00 AM. (This is called Pre-Warming). All 24 nodes must be alive and accepting health checks before the clock strikes 12.

### Step 5 — The Teardown Plan
Schedule a teardown event. Once traffic normalization occurs (e.g., 4:00 PM), restore the ASG desired capacity back to Baseline (e.g., 3 nodes) to stop financial hemorrhaging.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| API Rate Limiting | External API (e.g. Stripe) rate-limits your 24 nodes | Even if your compute is infinite, external factors aren't. Introduce Queueing (Kafka/RabbitMQ) for checkout processing so requests are safely delayed, not dropped. |

---

## ✅ Done Criteria / Verification

A Capacity Plan is structurally sound when:

- [ ] A definitive `RPS-to-Node` mathematical ratio has been established.
- [ ] Database Connection limits have been audited against the maximum planned Web node count.
- [ ] Pre-warming automation is scheduled if the traffic pattern represents a "Spike" rather than a "Gradual Curve".
