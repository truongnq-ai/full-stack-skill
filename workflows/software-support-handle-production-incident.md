---
description: "Rapid response for P0/P1 incidents: Severity assessment, Incident Commander coordination, and root cause investigation with Dev."
---
# Support: Handle Production Incident

> **Trigger**: Use IMMEDIATELY when a critical production issue is reported.
> **Tools**: PagerDuty/Slack MCP, Log aggregation tools, 
un_command (kubectl logs).

## Step 1 - Triage and Severity
Assess the severity level of the incoming incident.
- **Skills**: skills/roles/devops/incident-response/severity-levels/SKILL.md
- **Fallback**: If unsure, assume the highest severity until proven otherwise.

## Step 2 - Coordinate Checkpoint
Incident Commander establishes the response bridge and roles.
- **Skills**: skills/roles/devops/incident-response/incident-commander/SKILL.md
- **Checkpoint**: Announce the incident status to the user/stakeholders and ask if escalation is needed.

## Step 3 - Investigate and Mitigate
Joint L3/Dev investigation into production logs to apply temporary mitigations.
- **Skills**: skills/roles/l3-support/customer-one-call-investigation/SKILL.md, skills/roles/dev/production-debugging/SKILL.md

## Step 4 - Output
- **Exit Criteria**: Temporary mitigation is in place, service is restored (even if degraded), and incident is handed over to resolution phase.

> **Required Skill**: [handle-production-incident](file:///D:/GitHub/skill/full-stack-skill/skills/roles/support/handle-production-incident/SKILL.md)
