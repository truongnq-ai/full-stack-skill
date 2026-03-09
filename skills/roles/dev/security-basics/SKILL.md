---
name: DEV Security Basics
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/dev/security-basics
description: Security basics for developers (input validation, secrets).
category: roles
metadata:
  labels: [dev, security]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [security, input validation, secrets]
workflow_ref: deep-security-audit
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Validate all inputs.
- Never log secrets.

## References
- [Examples (Input/Output)](references/examples.md)
