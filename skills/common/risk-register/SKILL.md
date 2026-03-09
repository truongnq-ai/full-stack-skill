---
name: Risk Register
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/common/risk-register
description: Cross-role risk register template.
category: common
metadata:
  labels: [common, risk, register]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [risk register, risks]
workflow_ref: orchestrate
---

## **Priority: P0 (CRITICAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"]
next_checks: ["<check 1>"]
```

## Fields
- Risk ID
- Description
- Impact
- Mitigation
- Owner

## References
- [Examples (Input/Output)](references/examples.md)
