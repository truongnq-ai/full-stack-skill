---
name: QA Release Readiness
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/release-readiness
description: Release readiness checklist and QA gate.
category: roles
metadata:
  labels: [qa, release, readiness]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [release readiness, qa gate]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Gate Criteria
- 0 critical defects
- Regression suite passed
- Stakeholder sign-off

## References
- [Examples (Input/Output)](references/examples.md)
