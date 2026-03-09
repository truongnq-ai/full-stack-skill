---
name: QA Security Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/security-testing
description: OWASP-based security testing checklist.
category: roles
metadata:
  labels: [qa, security, owasp]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [security testing, owasp, injection, auth]
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
- Check auth/authorization.
- Test injection inputs.
- Validate sensitive data handling.

## References
- [Examples (Input/Output)](references/examples.md)
