---
name: QA Decision Table Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-case-design/decision-table
description: Create decision tables for rule-based logic.
category: roles
metadata:
  labels: [qa, test-case, decision-table]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [decision table, rule-based tests]
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
- Enumerate conditions and outcomes.
- Ensure full combination coverage.

## References
- [Examples (Input/Output)](references/examples.md)
