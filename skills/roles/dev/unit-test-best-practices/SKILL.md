---
name: DEV Unit Test Best Practices
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/unit-test-best-practices
description: Unit test structure, naming, and isolation.
category: roles
metadata:
  labels: [dev, testing, unit]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [unit test, test isolation]
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
- Arrange/Act/Assert structure.
- Mock external dependencies.

## References
- [Examples (Input/Output)](references/examples.md)
