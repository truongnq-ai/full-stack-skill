---
name: DevOps Infrastructure Basics
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/infra-basics
description: "Infrastructure fundamentals: network, compute, storage, DNS."
category: roles
metadata:
  labels: [devops, infrastructure, networking]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [vpc, subnet, dns, load balancer, storage]
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
- Always map traffic flow (client → LB → app → DB).
- Separate public/private subnets.

## References
- [Examples (Input/Output)](references/examples.md)
