---
name: DevOps CI/CD Pipelines
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/ci-cd-pipelines
description: CI/CD pipeline stages, gates, and rollback safety.
category: roles
metadata:
  labels: [devops, ci-cd, pipelines]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [pipeline, ci, cd, workflow]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Tests before deploy.
- Require rollback step.

## References
- [Examples (Input/Output)](references/examples.md)
