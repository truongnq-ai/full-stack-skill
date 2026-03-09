---
name: DevOps Secrets Management
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/secrets-management
description: "Secrets handling: vault, rotation, least exposure."
category: roles
metadata:
  labels: [devops, secrets, security]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [secrets, vault, rotation, kms]
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
- Never store secrets in repo.
- Rotate on exposure.

## References
- [Examples (Input/Output)](references/examples.md)
