---
name: QA API Testing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/qa/api-testing
description: API testing standards (Postman/Newman).
category: roles
metadata:
  labels: [qa, api-testing]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [api test, postman, newman]
workflow_ref: battle-test
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Validate status, schema, and error payloads.

## References
- [Examples (Input/Output)](references/examples.md)
