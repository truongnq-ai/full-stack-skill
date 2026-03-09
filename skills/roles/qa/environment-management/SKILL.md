---
name: QA Environment Management
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/environment-management
description: Test environment readiness, resets, and version alignment.
category: roles
metadata:
  labels: [qa, environment, test-env]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [test environment, staging, reset, seed]
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
- Ensure environment version matches target release.
- Reset DB and caches before runs.

## References
- [Examples (Input/Output)](references/examples.md)
