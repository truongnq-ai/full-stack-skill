---
name: DevOps Cost Optimization
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/cost-optimization
description: Cloud cost guardrails and optimization strategies.
category: roles
metadata:
  labels: [devops, cost, optimization]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [cost, optimization, finops]
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
- Rightsize instances.
- Auto‑scale by demand.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Leaving unused resources (orphaned EBS volumes, idle EC2 instances) running.
- Over-provisioning resources 'just in case' without analyzing actual usage patterns.
- Ignoring reserved instances or savings plans for predictable workloads.

## Tools
- AWS Cost Explorer, GCP Billing
- Kubecost (for Kubernetes)
- Infracost (for Terraform)
- CloudHealth, Datadog Cloud Cost Management

## Verification
- Run a cost estimation tool (e.g. Infracost) on infrastructure changes.
- Review monthly billing alerts and budgets.
- Audit underutilized resources via CloudWatch/Stackdriver metrics.
