---
name: DevOps Security Hardening
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/security-hardening
description: Hardening practices (CIS, least privilege, patching).
category: roles
metadata:
  labels: [devops, security, hardening]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [hardening, cis, least privilege]
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
- Disable unused ports.
- Enforce least privilege.

## References
- [Examples (Input/Output)](references/examples.md)
