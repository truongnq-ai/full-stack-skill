---
name: QA Boundary Value Analysis
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-case-design/boundary-value
description: Boundary value analysis for numeric and range-based inputs.
category: roles
metadata:
  labels: [qa, test-case, boundary-value]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [boundary value, edge cases, limits]
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
- Test min-1, min, min+1, max-1, max, max+1.

## References
- [Examples (Input/Output)](references/examples.md)
