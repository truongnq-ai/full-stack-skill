---
name: DEV Debugging Workflow
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/debugging-workflow
description: Step-by-step debugging for developers.
category: roles
metadata:
  labels: [dev, debugging]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [debug, error, bug]
workflow_ref: codebase-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Reproduce first.
- Isolate minimal failing case.
- Add regression test.

## References
- [Examples (Input/Output)](references/examples.md)
