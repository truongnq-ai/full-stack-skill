---
name: DevOps Environment Promotion
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/env-promotion
description: Promote builds across dev → staging → prod.
category: roles
metadata:
  labels: [devops, promotion, release]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [promotion, staging, prod]
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
- Promote immutable artifacts only.
- Require QA gate between envs.

## References
- [Examples (Input/Output)](references/examples.md)
