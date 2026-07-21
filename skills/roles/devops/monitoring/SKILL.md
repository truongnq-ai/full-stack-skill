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

## Anti-Patterns
- Monitoring only infrastructure metrics (CPU/RAM) and ignoring application metrics.
- Creating too many alerts, leading to alert fatigue.
- Dashboards that are too complex and hard to understand at a glance.

## Tools
- Prometheus, Grafana
- Datadog, New Relic
- AWS CloudWatch

## Verification
- Verify key metrics (USE/RED methods) are being collected.
- Trigger a test alert and ensure it routes to the correct channel.
- Check dashboard rendering and data accuracy.
