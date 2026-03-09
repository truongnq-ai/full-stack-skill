---
name: DEV Handover to QA
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/handover-to-qa
description: Handover package from Dev to QA.
category: roles
metadata:
  labels: [dev, handover, qa]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [handover, qa, testing]
workflow_ref: battle-test
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<next step>"]
owner: "DEV"
handoff_to: "QA"
artifacts: ["PR-123", "US-123"]
story_id: "US-123"
```

## Handover Checklist
- Code merged
- Tests run
- Deployment notes

## References
- [Examples (Input/Output)](references/examples.md)
