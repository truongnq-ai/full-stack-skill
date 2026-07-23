---
description: "Deploy applications (K8s/Helm) using advanced strategies (Blue-Green, Canary, Feature Flags) and Rollback mechanisms."
---
# DevOps: Deploy and Release

> **Trigger**: Use during production deployments requiring advanced rollout strategies to minimize downtime.
> **Tools**: 
un_command (kubectl, helm).

## Step 1 - Deployment Configuration
Prepare Kubernetes manifests or Helm charts for deployment.
- **Skills**: skills/roles/devops/k8s-deployment/SKILL.md, skills/roles/devops/helm-operations/SKILL.md

## Step 2 - Strategy Checkpoint
Apply Blue-Green, Canary, or Feature Flags depending on user preference.
- **Skills**: skills/roles/devops/release-management/blue-green/SKILL.md, skills/roles/devops/release-management/canary-release/SKILL.md, skills/roles/devops/release-management/feature-flags/SKILL.md
- **Checkpoint**: Present the proposed rollout strategy and request Go-ahead to shift traffic.

## Step 3 - Rollback Fallback
Monitor error rates immediately post-deployment.
- **Skills**: skills/roles/devops/release-management/rollback-strategy/SKILL.md
- **Fallback**: If error rates exceed threshold (e.g., 2%), trigger the rollback strategy automatically.

## Step 4 - Output
- **Exit Criteria**: Application is successfully deployed to production, traffic is routed correctly, and health checks pass.

> **Required Skill**: `skills/roles/devops/deploy-and-release/SKILL.md`
