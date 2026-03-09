---
name: QA Coverage Model
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/coverage-model
description: Define coverage by module, risk, and requirement.
category: roles
metadata:
  labels: [qa, coverage]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [coverage model, test coverage]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Coverage Dimensions
- Requirement coverage
- Risk coverage
- Module coverage

## References
- [Examples (Input/Output)](references/examples.md)
