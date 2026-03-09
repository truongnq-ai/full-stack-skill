---
name: DevOps IaC Terraform
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/iac-terraform
description: Terraform modules, state, and plan/apply discipline.
category: roles
metadata:
  labels: [devops, terraform, iac]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [terraform, iac, state]
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
- Use remote state with locking.
- Review plan before apply.

## References
- [Examples (Input/Output)](references/examples.md)
