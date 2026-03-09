---
name: QA Bug Triage
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/bug-triage
description: Triage defects by severity, priority, and impact.
category: roles
metadata:
  labels: [qa, triage, defects]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [bug triage, defect triage]
workflow_ref: codebase-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Severity based on user impact.
- Priority based on business urgency.

## References
- [Examples (Input/Output)](references/examples.md)
