---
name: QA Test Data Management
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-data-management
description: Test data creation and reset guidelines.
category: roles
metadata:
  labels: [qa, test-data]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [test data, fixtures, seed]
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
- Use deterministic seed data.
- Reset state between tests.

## References
- [Examples (Input/Output)](references/examples.md)
