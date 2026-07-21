---
name: DevOps CI/CD
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/ci-cd
description: CI/CD pipeline standards for build, test, and deployment automation.
category: roles
metadata:
  labels:
    - devops
    - ci-cd
    - pipelines
    - roles
  triggers:
    priority: high
    confidence: 0.8
    keywords:
      - pipeline
      - ci
      - cd
      - build
      - deploy
      - workflow
    files:
      - .github/workflows/*.yml
      - .gitlab-ci.yml
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

## Anti-Patterns
- Long-running, monolithic pipelines that are brittle and hard to debug.
- Manual approval steps in the middle of a continuous deployment flow.
- Deploying untested or unverified code directly to production branches.

## Tools
- GitHub Actions, GitLab CI/CD
- Jenkins, CircleCI
- ArgoCD, Flux (for GitOps)

## Verification
- Trigger a test pipeline and ensure it completes successfully.
- Verify that a failing test correctly blocks the deployment.
- Audit pipeline execution logs for unauthorized access or steps.
