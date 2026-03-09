---
name: QA Flake Control
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/flake-control
description: Techniques to reduce flaky tests.
category: roles
metadata:
  labels: [qa, flake]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [flake, flaky test, retry]
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
- Avoid fixed sleeps.
- Use retries sparingly with logging.

## References
- [Examples (Input/Output)](references/examples.md)
