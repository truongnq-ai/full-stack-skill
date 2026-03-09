---
name: QA Equivalence Partitioning
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/test-case-design/equivalence-partition
description: Split input space into valid/invalid partitions.
category: roles
metadata:
  labels: [qa, test-case, equivalence]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [equivalence partition, valid/invalid]
workflow_ref: plan-feature
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Choose 1 representative from each partition.

## References
- [Examples (Input/Output)](references/examples.md)
