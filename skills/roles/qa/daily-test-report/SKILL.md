---
name: QA Daily Test Report
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/daily-test-report
description: Daily QA report template (executed, passed, failed, blockers).
category: roles
metadata:
  labels: [qa, report, daily]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [daily test report, qa report]
workflow_ref: update-docs
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Template
- Test cases executed
- Passed/Failed
- Blockers
- Risks

## References
- [Examples (Input/Output)](references/examples.md)
