---
name: DevOps Monitoring
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/monitoring
description: Monitoring and alerting standards for services and infrastructure.
category: roles
metadata:
  labels:
    - devops
    - monitoring
    - alerting
    - roles
  triggers:
    priority: high
    confidence: 0.8
    keywords:
      - monitoring
      - alert
      - prometheus
      - grafana
      - logs
      - metrics
    files:
      - '**/alerts/*.yml'
      - '**/grafana/*.json'
workflow_ref: orchestrate
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Define SLIs/SLOs for critical services.
- Alerts must be actionable and rate-limited.

## References
- [Examples (Input/Output)](references/examples.md)
