---
name: QA RCA Lite
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/rca-lite
description: Lightweight root cause analysis template for recurring defects.
category: roles
metadata:
  labels: [qa, rca, defect-analysis]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [root cause analysis, rca]
workflow_ref: codebase-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Template
- Problem
- Root Cause
- Fix
- Preventive Action

## References
- [Examples (Input/Output)](references/examples.md)
