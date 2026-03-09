---
name: QA Gates
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/qa-gates
description: CI/CD QA gates and coverage policies.
category: roles
metadata:
  labels: [qa, gates, ci]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [quality gate, ci, coverage, test gate]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Gate Rules
- Unit tests pass
- Coverage ≥ threshold
- E2E smoke suite green

## References
- [Examples (Input/Output)](references/examples.md)
