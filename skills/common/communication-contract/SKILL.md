---
name: Communication Contract
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/common/communication-contract
description: Shared cross-role input/output schema for BA/DEV/QA/DevOps.
category: common
metadata:
  labels: [common, contract, communication]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [handover, contract, schema]
workflow_ref: orchestrate
---

## **Priority: P0 (CRITICAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<check 1>"]
owner: "<role/person>"
handoff_to: "<role/person>"
artifacts: ["<link/id>"]
requirement_id: "<REQ-123>"
story_id: "<US-123>"
test_case_id: "<TC-123>"
defect_id: "<BUG-123>"
release_id: "<REL-123>"
```

## Rules
- Always include IDs when available.
- If unknown, set "N/A" explicitly.

## References
- [Examples (Input/Output)](references/examples.md)
