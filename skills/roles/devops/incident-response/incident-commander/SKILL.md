---
name: Incident Commander Protocol
description: Defines the formal roles, communication loops, and containment strategies required to manage a live Production crisis (SEV-1/SEV-2).
category: roles/devops
metadata:
  labels: [devops, incident-response, commander, emergency, sev1]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [production is down, declare incident, sev-1, sev1, emergency]
---

# 🚨 Incident Commander Protocol

> **Use this skill when**: a critical production outage occurs (SEV-1 or SEV-2) and organized chaos-management is required to restore the system. Trigger: `/devops-declare-incident`.
>
> **Out of scope**: This is for the live firefighting phase. To investigate *why* it happened later, use `blameless-rca/SKILL.md`.

---

## 🚫 Anti-Patterns

- **The Swarm of Silence**: 5 engineers join a Zoom call, all mute their mics, and silently type in different terminals. Nobody knows what the others are doing.
- **Hero Syndrome**: One lone engineer tries to fix the database, communicate with the CEO, and tweet to customers simultaneously. (They will fail).
- **Fixing the Bug**: Trying to perfectly debug and write a patch for the root cause during an outage. (The goal is *Mitigation*, not perfection. Roll back the bad code).

---

## 🛠 Prerequisites & Tooling

1. Defined severity levels (`incident-response/severity-levels/SKILL.md`).
2. Access to external Status Pages (e.g., Atlassian Statuspage).
3. A dedicated real-time communication channel (e.g., `#incident-active` on Slack).

---

## 🔄 Execution Workflow

### Step 1 — Declare & Assemble
1. Announce the incident loudly. Create a dedicated Slack channel or Zoom bridge.
2. Establish the **Incident Commander (IC)**. The IC is the boss. Their only job is coordination. They do *not* look at code.

### Step 2 — Assign Formal Roles
The IC immediately delegates:
- **Operations Lead**: The person actually typing in the terminal (restarting servers, rolling back git tags).
- **Communications Lead (Scribe)**: Updates stakeholders, updates the Status Page, keeps notes for the RCA timeline.

### Step 3 — Containment & Mitigation
Prioritize restoring service over finding the core bug.
1. Did we deploy in the last 60 minutes? -> **Immediate Rollback**.
2. Is the DB overwhelmed? -> **Turn off non-critical background workers**.
3. Are we under a DDoS? -> **Enable Cloudflare Under Attack mode**.

### Step 4 — The Loop (Update Cadence)
The IC enforces a strict timeline loop. Every 15 minutes:
1. IC asks Ops Lead: "What is your current theory and what are you trying?"
2. IC asks Comms Lead: "Have we updated the Status Page?"
3. If Ops Lead is stuck for 30 mins, IC escalates and pages Senior Engineering Leads.

### Step 5 — Resolution (Stand Down)
When metrics normalize:
1. IC formally declares "Incident Mitigated".
2. Comms Lead posts final Status Page update: "Systems Operational."
3. Ops Lead archives the logs for the next day's RCA.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Executive Intrusion | The CEO joins the Zoom call demanding answers, distracting the Ops Lead | The IC's job is to protect the Ops Lead. The IC calmly intercepts the CEO: "We are currently executing a rollback. I will provide a full brief in 15 minutes. Please allow the Ops team to focus." |
| Ops Tunnel Vision | Ops Lead says "Give me 5 more minutes" four times in a row | Timeboxing failure. The IC must enforce the hard limit. "Times up. We are aborting the fix and deploying the backup static site instead." |

---

## ✅ Done Criteria / Verification

Incident Command is successful when:

- [ ] A clear Incident Commander was designated who did not type code themselves.
- [ ] Restoration of service (Mitigation) was prioritized over debugging (Root Cause).
- [ ] Stakeholders were updated at predictable intervals (e.g., every 15 mins) preventing executive panic.
