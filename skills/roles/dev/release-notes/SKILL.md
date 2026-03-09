---
name: DEV Release Notes
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/release-notes
description: Release notes format and content.
category: roles
metadata:
  labels: [dev, release-notes]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [release notes, changelog]
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
- List breaking changes.
- Highlight fixes and features.

## References
- [Examples (Input/Output)](references/examples.md)
