---
name: DevOps Incident Runbook
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/incident-runbook
description: Standard incident runbook structure and actions.
category: roles
metadata:
  labels: [devops, incident, runbook]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [incident, runbook, outage]
workflow_ref: orchestrate
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Runbook Template
- Symptoms
- Immediate Actions
- Mitigation
- Rollback

## References
- [Examples (Input/Output)](references/examples.md)
