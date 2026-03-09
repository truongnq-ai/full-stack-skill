---
name: Writer Summary
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/writer/summary
description: Summarize long content into concise bullet points.
category: roles
metadata:
  labels: [writer, summary, distillation]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [summary, summarize, tl;dr, digest]
workflow_ref: update-docs
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Keep 5–7 bullets maximum.
- Preserve facts; no speculation.

## References
- [Examples (Input/Output)](references/examples.md)
