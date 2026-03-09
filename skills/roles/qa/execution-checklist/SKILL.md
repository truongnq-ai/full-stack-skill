---
name: QA Execution Checklist
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/execution-checklist
description: Checklist for executing manual tests consistently.
category: roles
metadata:
  labels: [qa, execution, checklist]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [execution checklist, manual testing]
workflow_ref: battle-test
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Checklist
- Environment ready
- Test data prepared
- Run test cases in order
- Capture evidence (screens/logs)

## References
- [Examples (Input/Output)](references/examples.md)
