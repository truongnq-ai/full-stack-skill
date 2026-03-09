---
name: DevOps Artifact Registry
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/artifact-registry
description: Manage artifact repositories and image registries.
category: roles
metadata:
  labels: [devops, artifact, registry]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [registry, artifact, docker registry]
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
- Use immutable tags.
- Retention policy.

## References
- [Examples (Input/Output)](references/examples.md)
