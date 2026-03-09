---
name: Reviewer Content Audit
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/reviewer/content-audit
description: Audit content for accuracy, tone, and compliance.
category: roles
metadata:
  labels: [reviewer, audit, content]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [audit, review content, compliance]
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
- Verify factual claims.
- Flag compliance issues.

## References
- [Examples (Input/Output)](references/examples.md)
