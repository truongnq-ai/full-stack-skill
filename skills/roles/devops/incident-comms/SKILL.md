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
