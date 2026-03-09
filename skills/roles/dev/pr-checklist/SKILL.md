---
name: DEV PR Checklist
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/pr-checklist
description: Pull request checklist for quality and consistency.
category: roles
metadata:
  labels: [dev, pr, checklist]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [pull request, pr checklist, review]
workflow_ref: code-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Checklist
- Risk gate (migrations, breaking changes, feature flags)
- Tests updated
- Lint passes
- Docs updated

## References
- [Examples (Input/Output)](references/examples.md)
