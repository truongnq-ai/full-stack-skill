---
name: QA Bug Reporting Standard
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/bug-reporting-standard
description: Standard format for bug reports (steps, expected, actual, severity).
category: roles
metadata:
  labels: [qa, bug-report, defects]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [bug report, defect, severity, priority]
workflow_ref: codebase-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Bug Report Template
- Title
- Steps to Reproduce
- Expected vs Actual
- Severity & Priority
- Environment

## References
- [Examples (Input/Output)](references/examples.md)
