---
name: DevOps Kubernetes Deployment
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/k8s-deployment
description: Kubernetes deployment standards (deployments, configs, probes).
category: roles
metadata:
  labels: [devops, kubernetes, k8s]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [kubernetes, deployment, probe, configmap]
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
- Define liveness/readiness probes.
- Use resource requests/limits.

## References
- [Examples (Input/Output)](references/examples.md)
