---
name: Blameless Root Cause Analysis (RCA) Protocol
description: The DevOps standard for investigating post-incident outages. Focuses strictly on systemic failure, eliminating human blame to foster psychological safety and genuine reliability engineering.
category: roles/devops
metadata:
  labels: [devops, incident-response, rca, post-mortem, blameless]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [rca, root cause, blameless, post-mortem, why did it break]
---

# 🕵️ Blameless Root Cause Analysis (RCA)

> **Use this skill when**: an incident has been resolved (Service Restored) and the team needs to investigate *why* it happened to prevent recurrence. Trigger: `/devops-run-rca`.
>
> **Out of scope**: This is NOT for actively fixing a broken server (Use `incident-commander/SKILL.md` for firefighting). This happens 24-48 hours *after* the fire is out.

---

## 🚫 Anti-Patterns

- **"Human Error"**: Concluding the RCA with "John accidentally deleted the database." Human error is the *start* of the investigation, not the conclusion. (Why did the system allow John to delete the database?)
- **Punishment**: Firing or reprimanding the engineer who made the mistake, which guarantees the next engineer will hide their mistakes instead of reporting them.
- **Action-less RCAs**: Writing a beautiful 10-page document explaining the outage, but creating zero JIRA tickets to actually fix the underlying systemic risk.

---

## 🛠 Prerequisites & Tooling

1. The raw timeline notes collected during the Incident.
2. Access to logs, Datadog traces, and Git commit history from the event window.

---

## 🔄 Execution Workflow

### Step 1 — Establish the Timeline
Reconstruct exactly what happened, minute by minute, using UTC timestamps.
- `10:01`: Alert fires (High CPU).
- `10:05`: Engineer A logs in.
- `10:15`: Engineer A executes rollback.
- `10:20`: Service Restored.

### Step 2 — The 5 Whys (Systemic Depth)
Ask "Why?" recursively until you hit a systemic/architectural flaw.
*Example Incident: The database crashed.*
1. **Why?** CPU hit 100%.
2. **Why?** A new complex SQL query was deployed.
3. **Why?** It bypassed the staging environment.
4. **Why?** The developer used the "Emergency Hotfix" pipeline flag.
5. **Why?** The standard CI pipeline takes 45 minutes, incentivizing developers to bypass it.
*Root Cause*: CI pipeline is too slow, causing dangerous behavior.

### Step 3 — Draft the Document
Generate the formal `docs/incidents/RCA-[YYYYMMDD].md`.
**Core Sections**:
1. Incident Summary (1 paragraph).
2. Impact (Who was affected, how much $ lost?).
3. Timeline.
4. Root Cause (The 5 Whys outcome).
5. Action Items (Crucial).

### Step 4 — Generate Action Items (Preventative)
Create explicit tasks assigned to specific engineers to harden the system.
- *Task 1*: Optimize CI pipeline to run < 10 mins. (Prevents the bypass incentive).
- *Task 2*: Implement Query Timeout on the DB so bad queries timeout at 5s instead of taking 100% CPU.

### Step 5 — Triage to Backlog
The RCA is meaningless if the action items are ignored. Escalate the Action Items to the Product Manager to be placed in the immediate next Sprint.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Defensive Team | An engineer refuses to speak out of fear of being fired | Stop the meeting. Have the CTO or Engineering Director explicitly state the "Blameless" mandate: "We are fixing the machine, not the operator." |
| Unknown Cause | After 3 days of digging, nobody knows why it broke | Accept the mystery. The Action Item becomes: "Implement better Distributed Tracing so we can catch it next time." Do not invent a fake root cause. |

---

## ✅ Done Criteria / Verification

A Blameless RCA is complete when:

- [ ] The document is published and shared transparently with the entire engineering organization.
- [ ] The root cause identifies a systemic or tooling failure, entirely avoiding the phrase "human error."
- [ ] At least one concrete Action Item is created in the PM tracker to prevent identical recurrence.
