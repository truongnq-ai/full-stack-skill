---
name: BA Handover to Dev
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/ba/handover-to-dev
description: Handover package from BA to Dev.
category: roles
metadata:
  labels: [ba, handover, dev]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [handover, requirements, dev]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<next step>"]
owner: "BA"
handoff_to: "DEV"
artifacts: ["REQ-123", "US-123"]
requirement_id: "REQ-123"
story_id: "US-123"
```

## Handover Checklist
- Requirements complete
- AC clear
- Assumptions listed

## References
- [Examples (Input/Output)](references/examples.md)
