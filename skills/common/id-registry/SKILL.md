---
name: ID Registry
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/common/id-registry
description: Registry of cross-role IDs (REQ/US/TC/BUG/REL).
category: common
metadata:
  labels: [common, registry, ids]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [id registry, traceability]
workflow_ref: update-docs
---

## **Priority: P0 (CRITICAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<check 1>"]
```

## Registry Fields
- requirement_id
- story_id
- test_case_id
- defect_id
- release_id

## References
- [Examples (Input/Output)](references/examples.md)
