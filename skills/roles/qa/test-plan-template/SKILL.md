---
name: QA Test Plan Template
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-plan-template
description: Standard template for test plans (scope, schedule, resources, environments).
category: roles
metadata:
  labels: [qa, test-plan, planning]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [test plan, test schedule, qa plan]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Template Sections
- Scope
- Entry/Exit Criteria
- Environment
- Schedule
- Roles & Responsibilities

## References
- [Examples (Input/Output)](references/examples.md)
