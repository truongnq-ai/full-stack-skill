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

## Anti-Patterns
- Hardcoding registry credentials in code or CI configs.
- Using `:latest` or mutable tags in production environments.
- Allowing public read access to private internal registries.
- No automated cleanup/retention policies leading to bloated storage.

## Tools
- AWS ECR, GCP Artifact Registry, Azure Container Registry
- JFrog Artifactory, Sonatype Nexus
- Docker Hub

## Verification
- Run a mock vulnerability scan against a pushed image.
- Verify that pushing a duplicate immutable tag fails.
- Audit IAM permissions for registry access.
