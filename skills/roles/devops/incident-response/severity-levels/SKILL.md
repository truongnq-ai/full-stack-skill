---
name: Incident Severity Levels Matrix
description: A standardized matrix to objectively classify the impact of a production defect, governing the required SLA for response and resolution.
category: roles/devops
metadata:
  labels: [devops, incident-response, triage, sev1, sla]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [severity level, triage incident, sev1, sev2, sev3, priority]
---

# 🌡️ Incident Severity Levels

> **Use this skill when**: a bug or outage is reported, and the team needs an objective framework to decide whether to wake engineers up at 2 AM or fix it next Tuesday. Trigger: `/devops-severity`.
>
> **Out of scope**: This is for Triage classification. To actually manage the Severe incident, use `incident-commander/SKILL.md`.

---

## 🚫 Anti-Patterns

- **"Everything is SEV-1"**: The support desk defaults every single customer complaint to SEV-1. Result: Alert fatigue, engineers ignore pages.
- **Subjective Triage**: Arguing for 45 minutes about whether an issue is SEV-2 or SEV-3 based on how "annoying" it is, rather than using financial/impact metrics.
- **No Escalation Path**: Discovering a SEV-1 at midnight but having no automated PagerDuty system to wake the right people up.

---

## 🛠 Prerequisites & Tooling

1. PagerDuty, Opsgenie, or similar alerting system.
2. The company's defined SLA (Service Level Agreement) contracts (e.g., "We promise 99.9% uptime").

---

## 🔄 Execution Workflow

### Step 1 — Evaluate the Blast Radius
Assess the objective metrics:
1. **Financial Impact**: Are we currently losing money?
2. **User Impact**: Is it 1 user, 10%, or 100% of the platform?
3. **Core Functionality**: Is the broken feature the main value prop (Checkout), or a secondary feature (Profile Avatar upload)?

### Step 2 — Assign the Severity Level
Map the answers strictly to this matrix:

**🔴 SEV-1 (Critical / Outage)**
- *Criteria*: The core application is completely down, or core revenue paths (Checkout/Login) are fully blocked for >10% of users. Data loss is actively occurring.
- *Action*: Drop everything. Wake engineers up via PagerDuty. Establish Incident Commander immediately.

**🟠 SEV-2 (Major Degradation)**
- *Criteria*: Core app is alive, but extremely slow (latency > 5s). A major feature is broken but a workaround exists. A single enterprise client is fully blocked.
- *Action*: Drop current sprint work. Fix immediately during business hours. (Only wake people if explicitly defined in client SLAs).

**🟡 SEV-3 (Minor Bug / Glitch)**
- *Criteria*: A secondary feature is broken. Typo on the homepage. UI alignment is off.
- *Action*: Log into the backlog. Prioritize for the next available Sprint. No active alert needed.

**🟢 SEV-4 (Trivial / Request)**
- *Criteria*: Feature requests, internal tooling optimizations, non-visible tech debt.
- *Action*: Put it in the backlog indefinitely.

### Step 3 — Route based on SLA
Trigger the corresponding pipeline:
- If `SEV-1`, trigger `/devops-declare-incident` immediately.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Borderline SEV-1.5 | You can't decide if it's SEV-1 or SEV-2 | **Upgrade bias**. It is always safer to treat a SEV-2 as a SEV-1 initially, rather than downgrading a SEV-1 and letting the system burn. You can downgrade it 15 minutes later if the blast radius is confirmed small. |

---

## ✅ Done Criteria / Verification

Incident Severity triage is complete when:

- [ ] The bug/incident is explicitly stamped with `SEV-\d`.
- [ ] If SEV-1 or SEV-2, active personnel have been alerted via defined paging paths bypassing email (e.g., SMS/Phone call).
- [ ] Stakeholders understand *why* the severity was chosen based on the objective matrix (No emotional arguments).
