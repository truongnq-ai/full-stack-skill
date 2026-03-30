---
name: SLIs, SLOs, and SLAs
description: The baseline vocabulary and mathematical framework mapping user happiness to technical metrics.
category: roles/devops
metadata:
  labels: [devops, sre, metrics, slo, sla, observability]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [slo, sla, sli, service level, reliability metrics]
---

# 📏 SLI, SLO, SLA Definitons

> **Use this skill when**: the business asks "How reliable is our system?" and you need to translate their vague desires into hard engineering metrics. Trigger: `/devops-slo`.
>
> **Out of scope**: This defines the metrics. Enforcing the punishment for violating them is covered by `error-budgets/SKILL.md`.

---

## 🚫 Anti-Patterns

- **SLA Confusion**: Applying SLAs (Financial penalties) to internal microservices. (SLAs are legal contracts with paying customers. SLOs are internal goals).
- **Targeting 100%**: Promising a 100% SLO requires infinite budget and zero future code deployments. It kills innovation.
- **Monitoring Garbage**: Setting an SLI based on "Disk Space Available". The user doesn't care if disk space is at 99%, they only care if their image uploads successfully.

---

## 🛠 Prerequisites & Tooling

1. A clear understanding of the critical User Journeys.
2. Analytics/APM tools capable of dividing `Good Events` by `Total Events`.

---

## 🔄 Execution Workflow

### Step 1 — Define the SLI (Indicator)
The **Service Level Indicator** is the raw metric answering: "What are we measuring?"
It must be phrased as: `(Good Events / Total Events) * 100`.
- *Example 1 (Availability)*: `(HTTP 200 requests) / (Total HTTP requests)`
- *Example 2 (Latency)*: `(Requests completed < 300ms) / (Total Requests)`

### Step 2 — Define the SLO (Objective)
The **Service Level Objective** is the internal target for the SLI.
It answers: "How good is good enough to keep the user happy without wasting engineering budget?"
- *Example*: `99.9% of HTTP requests will return a 200 OK across a rolling 30-day window.`
- *Example*: `95% of API responses will return in < 300ms across a rolling 30-day window.`

### Step 3 — Define the SLA (Agreement)
The **Service Level Agreement** is the legal/financial contract tied to the SLO. It is generally handled by the Legal/Sales team, not Engineering.
It answers: "What happens if we fail?"
*Rule of Thumb*: The SLA should always be looser than the SLO.
- *SLO (Internal Goal)*: 99.9%
- *SLA (Client Contract)*: 99.5% (If we drop below 99.5%, we refund the client 10% of their bill).

### Step 4 — Publish and Alert
Map the SLO directly into the Monitoring dashboard (`alert-setup/SKILL.md`).
If the 30-day rolling aggregate drops to `99.95%` (approaching the `99.9%` boundary), trigger a `WARN` alert so the team can slow down feature deployments.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Misaligned SLI | The SLO says 99.9% green, but customers are complaining furiously on Support | You are measuring the wrong Indicator. You might be measuring the Login API, but the Payment API is completely down. Audit and expand the SLIs to cover all Critical User Journeys. |

---

## ✅ Done Criteria / Verification

Service Level governance is established when:

- [ ] SLIs are strictly defined as proportions (Good vs Total).
- [ ] SLOs are agreed upon by both Product and Engineering.
- [ ] Internal SLO targets are mathematically stricter than outward-facing client SLAs to provide a safety buffer against financial penalties.
