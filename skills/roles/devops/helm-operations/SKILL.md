---
name: DevOps Helm Operations
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/helm-operations
description: Helm chart operations and release practices.
category: roles
metadata:
  labels: [devops, helm, kubernetes]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [helm, chart, release]
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
- Use values files per env.
- Pin chart versions.

## References
- [Examples (Input/Output)](references/examples.md)
