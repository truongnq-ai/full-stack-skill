---
name: DevOps Incident Comms
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/incident-comms
description: Incident communication templates and stakeholder updates.
category: roles
metadata:
  labels: [devops, incident, communication]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [incident update, status update]
workflow_ref: update-docs
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Template
- Impact
- ETA
- Workaround
- Next update time

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Keeping stakeholders in the dark during an ongoing incident.
- Providing overly technical details to business stakeholders.
- Failing to establish a clear communication channel or incident commander.

## Tools
- Slack/Microsoft Teams
- PagerDuty, Opsgenie
- Statuspage
- Jira Service Management

## Verification
- Verify an incident communication channel is automatically created upon incident declaration.
- Check that a status page is updated promptly during simulated incidents.
- Review post-incident communication for clarity and timeliness.
