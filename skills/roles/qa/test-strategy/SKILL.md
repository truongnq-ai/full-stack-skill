---
name: QA Test Strategy
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-strategy
description: Define test strategy, scope, risks, and coverage objectives.
category: roles
metadata:
  labels: [qa, test-strategy, quality]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [test strategy, qa strategy, coverage, risk-based]
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
- Define scope (in/out).
- Identify high-risk areas first.
- Map test types to risks.

## References
- [Examples (Input/Output)](references/examples.md)
