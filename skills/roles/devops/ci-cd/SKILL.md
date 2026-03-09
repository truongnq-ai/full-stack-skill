---
name: DevOps CI/CD
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/ci-cd
description: CI/CD pipeline standards for build, test, and deployment automation.
category: roles
metadata:
  labels: [devops, ci-cd, pipelines]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [pipeline, ci, cd, build, deploy, workflow]
    files: ['.github/workflows/*.yml', '.gitlab-ci.yml']
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
- Always run tests before deploy.
- Require staging gate before production.
- Include rollback step.

## References
- [Examples (Input/Output)](references/examples.md)
