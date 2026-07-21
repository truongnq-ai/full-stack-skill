---
description: "Provision and manage infrastructure as code (IaC Terraform), optimize costs, and secure servers."
---
# DevOps: Provision Infrastructure

> **Trigger**: Use when creating new environments, scaling clusters, or updating infrastructure configurations.
> **Tools**: 
un_command (terraform, aws/gcloud cli).

## Step 1 - IaC Design and Review
Write or review Terraform manifests for the new infrastructure.
- **Skills**: skills/roles/devops/iac-terraform/SKILL.md, skills/roles/devops/infrastructure/ias-terraform/SKILL.md

## Step 2 - Cost and Security Audit
Review the planned changes for cost efficiency and security hardening.
- **Skills**: skills/roles/devops/cost-optimization/SKILL.md, skills/roles/devops/security-hardening/SKILL.md

## Step 3 - Provisioning Checkpoint
Generate the Terraform execution plan.
- **Skills**: skills/roles/devops/infrastructure/provisioning/SKILL.md
- **Fallback**: If 	erraform plan fails, correct the HCL syntax and retry.
- **Checkpoint**: Output the 	erraform plan to the user and explicitly require approval before running 	erraform apply.

## Step 4 - Apply and Verify
Apply the changes and verify the new resources are healthy.
- **Exit Criteria**: Infrastructure is provisioned, secured, and running as defined in the state file.

> **Required Skill**: [provision-infrastructure](file:///D:/GitHub/skill/full-stack-skill/skills/roles/devops/provision-infrastructure/SKILL.md)
