---
name: DEV API Contract Discipline
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/api-contract
description: Enforce API contract with schema and DTOs.
category: roles
metadata:
  labels: [dev, api, contract]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [api contract, openapi, schema]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Validate request/response schema.
- Version API when breaking.

## References
- [Examples (Input/Output)](references/examples.md)
