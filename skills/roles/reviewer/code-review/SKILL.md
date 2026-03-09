---
name: Reviewer Code Review
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/reviewer/code-review
description: Structured code review standards for correctness, security, and maintainability.
category: roles
metadata:
  labels: [reviewer, code-review, quality]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [review, code review, pr review]
workflow_ref: code-review
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Flag correctness and security issues as BLOCKER.
- Provide minimal, actionable fixes.

## References
- [Examples (Input/Output)](references/examples.md)
