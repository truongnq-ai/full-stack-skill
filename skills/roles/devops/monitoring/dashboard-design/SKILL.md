---
name: Monitoring Dashboard Design
description: Principles for designing at-a-glance operational dashboards that provide immediate situational awareness to engineering teams without cognitive overload.
category: roles/devops
metadata:
  labels: [devops, monitoring, dashboards, datadog, grafana, observability]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [dashboard design, grafana dashboard, datadog view, monitor system]
---

# 📊 Monitoring Dashboard Design

> **Use this skill when**: creating a Grafana, Datadog, or CloudWatch dashboard to visualize the health of a new microservice or architecture. Trigger: `/devops-design-dashboard`.
>
> **Out of scope**: Writing the underlying code instrumentation to generate the metrics. This governs how to *display* the metrics that already exist.

---

## 🚫 Anti-Patterns

- **The Vanity Dashboard**: 40 different pie charts showing "Total Users Signed Up Since 2018". (That's a Business dashboard, not an Operational Ops dashboard).
- **Metric Soup**: Placing 50 unlabelled line charts on one page, requiring an engineer during an active crisis to scroll for 3 minutes to find the CPU utilization.
- **No Baselines**: Showing a latency spike at `800ms`, but omitting a baseline marker to show that normal is `200ms`. Without the baseline, the spike is meaningless.

---

## 🛠 Prerequisites & Tooling

1. A visualization platform (Grafana, Datadog, Kibana).
2. The RED/USE telemetry methodologies.

---

## 🔄 Execution Workflow

### Step 1 — Define the Audience
Is this dashboard for the On-Call Engineer (Needs deep technicals) or the CTO (Needs high-level availability SLA %)?
Create separate dashboards rather than mixing them.

### Step 2 — The Golden Signals (Top Row)
The top 25% of the screen must answer: **Is the system broken right now?**
Use the **RED Methodology**:
1. **R**ate (Requests per second).
2. **E**rrors (HTTP 5xx rate).
3. **D**uration (p95 Latency latency).

Display these as massive, color-coded single numbers (Stat Panels) or extremely clear line charts.

### Step 3 — Resource Utilization (Middle Row)
Use the **USE Methodology** for the infrastructure supporting the code:
1. **U**tilization (CPU/Memory % used).
2. **S**aturation (Queue length, thread pool exhaustion).
3. **E**rrors (Disk dropouts, OOM kills).

### Step 4 — Dependency Health (Bottom Row)
If your app talks to Stripe, the DB, and Redis, put their health at the bottom.
If the Top row *Errors* spike, the engineer looks directly at the Bottom row to see if *Stripe* spiked at the exact same time.

### Step 5 — Annotations & Templating
- **Templating**: Add a dropdown filter at the very top for `Environment` (Prod vs Staging) and `Region`.
- **Annotations**: Configure the dashboard to automatically overlay vertical lines when a GitHub CI Deployment occurred. This instantly correlates a performance drop to a specific code push.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Cardinality Explosion | The database query powering the chart crashes the monitoring tool | You grouped the chart by `User_ID`. Never group operational metrics by millions of absolute values. Group by `Route` or `Region`. |
| Color Confusion | Using Green for "High Latency" and Red for "High Throughput" | Strictly standardize colors. Red = Bad (Errors). Green/Blue = Good/Neutral. Traffic volume should be neutral. |

---

## ✅ Done Criteria / Verification

An operational dashboard is complete when:

- [ ] It fits on a standard 1080p monitor without scrolling to see the core RED metrics.
- [ ] Variables/Dropdowns allow switching between `Prod` and `Staging` effortlessly.
- [ ] Direct visual thresholds (red dotted lines) exist on charts to indicate SLA limits.
