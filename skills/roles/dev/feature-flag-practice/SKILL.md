---
name: DEV Feature Flag Practice
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/feature-flag-practice
description: Safe rollout using feature flags and gradual exposure.
category: roles
metadata:
  labels: [dev, feature-flag, rollout]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [feature flag, rollout, canary]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Default off for new flags.
- Add kill switch.

## References
- [Examples (Input/Output)](references/examples.md)
