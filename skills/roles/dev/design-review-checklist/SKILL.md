---
name: DEV Design Review Checklist
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/design-review-checklist
description: Checklist for reviewing design before implementation.
category: roles
metadata:
  labels: [dev, design, review]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [design review, architecture review]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Checklist
- Scalability
- Failure modes
- Backward compatibility

## References
- [Examples (Input/Output)](references/examples.md)
