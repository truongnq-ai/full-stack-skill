---
name: QA Traceability Matrix
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/traceability-matrix
description: Requirement → Story → Test Case → Bug → Release mapping.
category: roles
metadata:
  labels: [qa, rtm, traceability]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [traceability, rtm, mapping]
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
- Requirement ID
- User Story ID
- Test Case ID
- Defect ID
- Release ID

## References
- [Examples (Input/Output)](references/examples.md)
