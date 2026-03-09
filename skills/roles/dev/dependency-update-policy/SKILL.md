---
name: DEV Dependency Update Policy
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/dependency-update-policy
description: Semver rules and dependency update cadence.
category: roles
metadata:
  labels: [dev, dependencies, semver]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [dependency update, semver]
workflow_ref: orchestrate
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Patch updates auto.
- Major updates require review.

## References
- [Examples (Input/Output)](references/examples.md)
