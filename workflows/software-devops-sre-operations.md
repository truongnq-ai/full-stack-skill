---
description: "Daily SRE operations: SLA/SLO management, Capacity Planning, Chaos Engineering, Backup, and Policies."
---
# DevOps: SRE Operations

> **Trigger**: Use for routine system health checks, chaos experiments, or managing SLO error budgets.
> **Tools**: 
un_command (kubectl, chaos-mesh, cron), monitoring tools.

## Step 1 - SLO Management
Track Error Budgets and SLIs for the current month.
- **Skills**: skills/roles/devops/slo-sli-policy/SKILL.md, skills/roles/devops/site-reliability/slis-slos-slas/SKILL.md, skills/roles/devops/site-reliability/error-budgets/SKILL.md

## Step 2 - Capacity and Resilience
Plan for scaling and optionally run Chaos Engineering experiments during off-peak hours.
- **Skills**: skills/roles/devops/site-reliability/capacity-planning/SKILL.md, skills/roles/devops/site-reliability/chaos-engineering/SKILL.md
- **Fallback**: If chaos experiments destabilize the cluster uncontrollably, immediately kill the experiment agent.

## Step 3 - Maintenance Checkpoint
Perform routine backups, OS updates, and enforce policy as code.
- **Skills**: skills/roles/devops/policy-as-code/SKILL.md, skills/roles/devops/linux-ops/SKILL.md, skills/roles/devops/backup-recovery/SKILL.md, skills/roles/devops/devops-culture/SKILL.md
- **Checkpoint**: Present the backup status and planned OS patches to the user for approval.

## Step 4 - Output
- **Exit Criteria**: Error budgets are updated, backups verified, and system health is within SLA.

> **Required Skill**: `skills/roles/devops/sre-operations/SKILL.md`
