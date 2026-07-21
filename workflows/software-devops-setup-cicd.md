---
description: "Design CI/CD pipelines (GitHub Actions), Docker, SBOM/Vulnerability scanning, and Secret management."
---
# DevOps: Setup CI/CD and Security Pipelines

> **Trigger**: Use when bootstrapping a new project, adding Docker support, or securing an existing pipeline.
> **Tools**: 
un_command (docker, github cli), file editing tools.

## Step 1 - Containerization
Define Dockerfile and docker-compose.yml for local and prod parity.
- **Skills**: skills/roles/devops/containerization/dockerfile/SKILL.md, skills/roles/devops/containerization/docker-compose/SKILL.md

## Step 2 - Pipeline Design
Set up automated build, test, and package pipelines using GitHub Actions.
- **Skills**: skills/roles/devops/ci-cd/SKILL.md, skills/roles/devops/ci-cd-pipelines/SKILL.md, skills/roles/devops/cicd/pipeline-design/SKILL.md, skills/roles/devops/cicd/github-actions/SKILL.md
- **Fallback**: If tests fail in pipeline but pass locally, investigate environment parity issues.

## Step 3 - Security Scan Checkpoint
Integrate SBOM and vulnerability scanning, and configure secrets securely.
- **Skills**: skills/roles/devops/security/vulnerability-scanning/SKILL.md, skills/roles/devops/security/secret-management/SKILL.md, skills/roles/devops/sbom-scan/SKILL.md
- **Checkpoint**: Present the first pipeline run output (including security scan results) to the user for approval.

## Step 4 - Artifact Registry
Push verified artifacts to the designated container registry.
- **Skills**: skills/roles/devops/artifact-registry/SKILL.md
- **Exit Criteria**: Pipeline is fully functional, artifacts are pushed, and no critical vulnerabilities exist in the SBOM.

> **Required Skill**: [setup-cicd](file:///D:/GitHub/skill/full-stack-skill/skills/roles/devops/setup-cicd/SKILL.md)
