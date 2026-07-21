---
name: DevOps Helm Operations
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/helm-operations
description: Helm chart operations and release practices.
category: roles
metadata:
  labels: [devops, helm, kubernetes]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [helm, chart, release]
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
- Use values files per env.
- Pin chart versions.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Hardcoding values in `templates/` instead of `values.yaml`.
- Not versioning Helm charts.
- Applying charts manually with `helm install` instead of using a GitOps tool.

## Tools
- Helm v3
- ArgoCD (Helm integration)
- FluxCD
- Helmfile

## Verification
- Run `helm lint` and `helm template` to validate chart syntax.
- Deploy a test release and run `helm test`.
- Verify chart version increments upon changes.
