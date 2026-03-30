---
name: Rollback Strategy
description: Protocols for orchestrating database and code rollbacks simultaneously to instantly recover from a failed deployment.
category: roles/devops
metadata:
  labels: [devops, release-management, rollback, disaster-recovery]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [rollback, revert deploy, undo release, restore version]
---

# ⏪ Rollback Strategy

> **Use this skill when**: a newly deployed version breaks Production (SEV-1/SEV-2) and the Incident Commander orders an immediate reversion to the previous stable state. Trigger: `/devops-rollback`.
>
> **Out of scope**: Fixing the bug. A rollback is a blunt-force mitigation maneuver to restore availability, not a debugging session.

---

## 🚫 Anti-Patterns

- **"Fix Forward" Tunnel Vision**: Refusing to roll back because "I almost have the hotfix ready, give me 5 minutes" while the company loses $10,000 a minute.
- **Git Revert Only**: Running `git revert` and waiting 20 minutes for the CI pipeline to rebuild and deploy the old code. (Rollbacks should be instantaneous from pre-built artifacts).
- **Ignoring the Database**: Rolling back the Application Code to V1, but forgetting that V2 already dropped a Database column. (The app will instantly crash).

---

## 🛠 Prerequisites & Tooling

1. Immutable Versioned Artifacts (e.g., Docker Images tagged by Git SHA).
2. A declarative deployment tool (e.g., ArgoCD, Helm, AWS ECS Task Definitions).

---

## 🔄 Execution Workflow

### Step 1 — Verify Database Compatibility (CRITICAL)
Before touching the application servers, verify the Database state.
- *Did V2 run a destructive DB migration (`DROP TABLE`, `ALTER COLUMN`)?*
  - **Yes**: You CANNOT simply roll back the code. You must first run the specific "down" migration script to restore the DB schema, *then* roll back the code.
  - **No** (It was just additive or no DB changes): Proceed to Step 2.

### Step 2 — Re-tag the Infrastructure Route
Do not re-compile code. Point the infrastructure to the previous artifact.
- *Kubernetes*: `kubectl rollout undo deployment/api-server`
- *AWS ECS*: Revert to the previous Task Definition revision.
- *Vercel/Netlify*: Click "Instant Rollback" in the Dashboard.

### Step 3 — Monitor the Draining Process
Watch the Load Balancer. Ensure the broken V2 nodes are gracefully draining active connections while new traffic flows strictly to the V1 nodes.

### Step 4 — Declare Safe Harbor
Watch the Golden Signals (Datadog/Grafana). Once the Error Rate drops to pre-deployment levels, formally notify the Incident channel:
`"Rollback complete. System is stable on V1. Investigation can begin."`

### Step 5 — The Git Lock
To prevent the broken code from automatically redeploying:
1. Lock the `main` branch.
2. The developer must create a `Revert` PR to align the `main` branch source code with the actual V1 code currently running in Production.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Irreversible DBA | V2 encrypted a million plaintext passwords, V1 cannot read them | **Fix Forward is mandatory.** If the data transformation is 1-way, rolling back code will destroy the system. You must write an emergency Hotfix instead of rolling back. |
| Missing Artifact | The V1 Docker image was deleted by a cleanup script | You must fall back to the "Git Revert" anti-pattern. Run `git revert <broken_commit>`, push to main, and wait for the CI pipeline to compile it. |

---

## ✅ Done Criteria / Verification

A Rollback maneuver is complete when:

- [ ] Production traffic is flowing exclusively to the previous stable version.
- [ ] Database state matches the required schema for the previous stable version.
- [ ] The Git repository `main` branch explicitly reflects the rolled-back state to prevent accidental re-deployments.
