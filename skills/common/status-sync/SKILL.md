---
name: Status Sync
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/common/status-sync
description: Standard daily/weekly status sync format.
category: common
metadata:
  labels: [common, status, sync]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [status update, standup]
workflow_ref: update-docs
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<next step>"]
```

## Format
- Yesterday
- Today
- Blockers

## References
- [Examples (Input/Output)](references/examples.md)
