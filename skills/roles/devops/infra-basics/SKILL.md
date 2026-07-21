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

## Anti-Patterns
- ClickOps (manual configuration in cloud console) instead of Infrastructure as Code.
- Flat network topologies without proper segmentation (VPCs, Subnets).
- Running databases on public subnets.

## Tools
- Terraform, CloudFormation
- AWS VPC, GCP VPC
- Ansible

## Verification
- Verify infrastructure is defined in code.
- Check network routing tables and security groups for least privilege access.
- Ensure private resources cannot be accessed directly from the public internet.
