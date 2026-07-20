---
name: QA Stress Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/performance-testing/stress-testing
description: Stress testing to identify system breakpoints.
category: roles
metadata:
  labels: [qa, performance, stress-testing]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [stress test, soak test]
workflow_ref: performance
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Increase load until failure.
- Capture failure modes.

## References
- [Examples (Input/Output)](references/examples.md)
