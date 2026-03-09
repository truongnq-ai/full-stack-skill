---
name: QA Regression Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/regression-testing
description: Regression test selection and execution guidelines.
category: roles
metadata:
  labels: [qa, regression]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [regression test, regression suite]
workflow_ref: battle-test
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Select tests by changed modules.
- Always include auth/payments.

## References
- [Examples (Input/Output)](references/examples.md)
