---
name: Writer Documentation
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/writer/docs
description: Technical documentation standards and structure.
category: roles
metadata:
  labels:
    - writer
    - documentation
    - docs
    - roles
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - documentation
      - readme
      - guide
      - how-to
      - docs
    files:
      - README.md
      - '**/docs/**/*.md'
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
- Prefer clear structure (Overview → Setup → Usage → Troubleshooting).
- Use consistent headings and short paragraphs.

## References
- [Examples (Input/Output)](references/examples.md)
