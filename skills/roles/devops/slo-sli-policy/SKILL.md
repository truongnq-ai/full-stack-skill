---
name: DevOps SLO/SLI Policy
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/slo-sli-policy
description: Define service level indicators and objectives.
category: roles
metadata:
  labels: [devops, reliability, slo]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [slo, sli, reliability]
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
- Define availability/latency SLOs.
- Track error budgets.

## References
- [Examples (Input/Output)](references/examples.md)
