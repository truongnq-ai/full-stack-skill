---
name: Alert Setup & Routing
description: Standards for defining meaningful, actionable alerts and routing them to the correct responding team to prevent alert fatigue.
category: roles/devops
metadata:
  labels: [devops, monitoring, alerting, opsgenie, pagerduty]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [alert setup, configure alerts, paging, datadog alert]
---

# 🚨 Alert Setup & Routing

> **Use this skill when**: deploying a new service or metric, and establishing the exact thresholds that should trigger an automated notification to a human. Trigger: `/devops-setup-alerts`.
>
> **Out of scope**: This is not for creating visual dashboards (`dashboard-design/SKILL.md`). Alerts are active; Dashboards are passive monitors.

---

## 🚫 Anti-Patterns

- **Alert Fatigue**: Creating an alert that texts an engineer at 3 AM because "CPU spiked to 80% for 3 seconds". The engineer will mute the channel and miss the real outage.
- **Routing to Everyone**: Sending a Database alert to the `#general` Slack channel where 500 people see it, assuming "someone will handle it". (Bystander Effect).
- **The Dead-End Alert**: An alert message that just says `ERROR 500`. It contains no context, no playbook link, and no environment tag.

---

## 🛠 Prerequisites & Tooling

1. Monitoring tool (Datadog, Prometheus, CloudWatch).
2. Routing/On-Call tool (PagerDuty, Opsgenie, Slack).
3. `roles/devops/incident-response/severity-levels/SKILL.md` (To categorize the alert).

---

## 🔄 Execution Workflow

### Step 1 — Symptom-Based Alerting (Not Cause-Based)
Alert on **SLIs (Symptoms)**, not internal causes.
- *Bad Alert*: `MySQL CPU > 90%`. (If CPU is 95% but users are checking out fine, nobody cares).
- *Good Alert*: `API 5xx Error Rate > 5% for 5 mins`. (The user is feeling pain. Wake someone up).

### Step 2 — Define the Threshold (The Trigger)
Set a sustained duration. An instant spike is noise.
- **Warning (Yellow)**: `Error Rate > 2% for 10 minutes`. (Send a message to a Slack channel during business hours).
- **Critical (Red)**: `Error Rate > 5% for 5 minutes`. (Page the On-Call phone immediately).

### Step 3 — Format the Alert Payload
Every alert MUST contain 4 pieces of context:
1. **What broke?**: `[Production] Payment Gateway 5xx Spike`.
2. **Impact**: `Users cannot complete checkout.`
3. **Current Value**: `Metric: 8.4%`.
4. **Runbook Link**: A direct URL to the Wiki document explaining exactly how to fix or mitigate this specific alert.

### Step 4 — Implement Exact Routing
Map the alert to the responsible team's PagerDuty rotation.
- **App Code Error** -> Page the Mobile/Web Team.
- **RDS Failover Action** -> Page the DBA/DevOps Team.

### Step 5 — Test the Alert
Manually trigger a mocked version of the alert via CLI or API to guarantee the PagerDuty schedule successfully calls the test phone.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Flapping Alert | An alert triggers, resolves 1 min later, triggers again | Increase the "Time to Resolve" delay. Force the metric to be stable for 15 minutes before closing the alert to prevent PagerDuty spam. |
| Dropped Pages | Alert triggers but nobody answers | Ensure **Escalation Policies** are set. If Tier 1 doesn't answer in 10 minutes, automatically page Tier 2 (Manager). |

---

## ✅ Done Criteria / Verification

An Alert implementation is complete when:

- [ ] It is mapped to a Symptom (User Pain), not an internal metric.
- [ ] A Warning vs. Critical threshold is explicitly delineated.
- [ ] It contains a direct link to a Mitigation Runbook.
- [ ] Routing logic strictly targets the owning team, avoiding global blast channels.
