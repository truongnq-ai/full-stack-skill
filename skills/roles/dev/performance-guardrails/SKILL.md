---
name: DEV Performance Guardrails
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/performance-guardrails
description: Performance pitfalls and guardrails.
category: roles
metadata:
  labels: [dev, performance]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [n+1, caching, memory leak]
workflow_ref: performance
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Avoid N+1 queries.
- Use caching for hot paths.

## References
- [Examples (Input/Output)](references/examples.md)
