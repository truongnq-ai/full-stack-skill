---
name: DevOps Deployment Basics
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/deploy-basics
description: "Deployment strategies: blue/green, canary, rollback."
category: roles
metadata:
  labels: [devops, deployment, release]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [deploy, rollback, canary, blue green]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Always define rollback plan.
- Monitor after deploy.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- 'Big Bang' deployments without rollback strategies.
- Deploying manually from a developer's local machine.
- Inconsistent configuration between staging and production environments.

## Tools
- Ansible, Chef, Puppet
- ArgoCD, Flux
- AWS CodeDeploy, Octopus Deploy

## Verification
- Verify application health endpoints return 200 OK after deployment.
- Execute a rollback test and ensure the previous version is restored seamlessly.
- Check deployment logs for errors or warnings.
