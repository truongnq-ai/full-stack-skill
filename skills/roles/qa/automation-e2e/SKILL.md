---
name: QA Automation E2E
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/automation-e2e
description: End-to-end automation standards (Playwright/Cypress).
category: roles
metadata:
  labels: [qa, automation, e2e]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [e2e, playwright, cypress, ui automation]
workflow_ref: battle-test
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Selector Strategy
- Prefer: role/text → data-testid → CSS selectors

## Core Rules
- Prefer stable locators (role/text).
- Avoid flaky waits; use explicit conditions.

## References
- [Examples (Input/Output)](references/examples.md)
