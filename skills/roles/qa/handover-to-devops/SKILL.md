---
name: QA Handover to DevOps
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/handover-to-devops
description: Handover package from QA to DevOps for release.
category: roles
metadata:
  labels: [qa, handover, devops]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [release handover, qa, devops]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<next step>"]
owner: "QA"
handoff_to: "DevOps"
artifacts: ["REL-123", "QA-REPORT"]
release_id: "REL-123"
```

## Handover Checklist
- QA report attached
- Release readiness approved

## References
- [Examples (Input/Output)](references/examples.md)
