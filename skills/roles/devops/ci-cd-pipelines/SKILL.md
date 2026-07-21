---
name: DevOps CI/CD Pipelines
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/ci-cd-pipelines
description: CI/CD pipeline stages, gates, and rollback safety.
category: roles
metadata:
  labels: [devops, ci-cd, pipelines]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [pipeline, ci, cd, workflow]
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
- Tests before deploy.
- Require rollback step.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Not utilizing caching mechanisms, leading to slow build times.
- Hardcoding environment-specific variables instead of injecting them at runtime.
- Lack of parallelization in independent testing stages.

## Tools
- GitHub Actions
- GitLab CI
- Jenkins
- Tekton
- CircleCI

## Verification
- Check pipeline execution time against baselines.
- Verify successful artifact generation and storage.
- Ensure all stages report status correctly back to the VCS.
