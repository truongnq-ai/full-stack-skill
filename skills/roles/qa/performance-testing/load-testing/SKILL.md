---
name: QA Load Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/performance-testing/load-testing
description: Load testing standards and baseline metrics.
category: roles
metadata:
  labels: [qa, performance, load-testing]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [load test, performance test, k6]
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
- Establish baseline RPS/latency.
- Measure p95/p99.

## References
- [Examples (Input/Output)](references/examples.md)
