---
name: QA to DevOps Handoff (Release Readiness)
description: Final QA gate protocol to certify that a Release Candidate (RC) has passed regression, lacks blockers, and is cleared for production deployment.
category: roles/qa
metadata:
  labels: [qa, devops, release, sign-off, readiness]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [qa sign off, handoff to devops, release readiness, qa go live]
---

# 🚀 QA to DevOps Handoff

> **Use this skill when**: QA has completed execution of the test plan for a specific Release Candidate (RC), and needs to formally hand control over to DevOps for Production Deployment. Trigger: `/qa-handoff-devops`.
>
> **Out of scope**: This is NOT the DevOps deployment script (use `roles/devops/deploy-release/SKILL.md`). This is purely the business authorization gate.

---

## 🚫 Anti-Patterns

- **Ghost Approvals**: Saying "Ready for Prod!" without attaching the verifiable test execution metric report.
- **Ignoring Open S2s**: Approving a build with known Severity-2 bugs without explicit PM/PO sign-off indicating accepted risk.
- **Wrong Environment Signoff**: Testing `v1.0.0` on Staging but allowing DevOps to deploy `master` branch (which might have drifted).
- **Missing Rollback Check**: Failing to verify if a database rollback plan exists for the deployment.

---

## 🛠 Prerequisites & Tooling

1. The Master Test Plan document (e.g., `docs/qa/plans/Release-v1.4.md`).
2. Familiarity with `skills/common/communication-contract/SKILL.md` (Payload formatting standards).

---

## 🔄 Execution Workflow

### Step 1 — Metric Aggregation (The QA Gate)
Before touching DevOps, the QA Agent must assert the following facts automatically:
1. `Pass Rate`: Are 100% of P1/P2 Regression tests passing?
2. `Open Defects`: Query for ANY active `BUG-` linked to this release that is Severity S1 or S2.
3. `Automation Status`: Did the CI pipeline e2e tests turn green?

### Step 2 — The "Go / No-Go" Decision
- If Open S1/S2 Bugs > 0 => **NO-GO**. Immediately reject handoff.
- If Automation Pipeline Failed => **NO-GO**. Immediately reject handoff.
- If everything passes => Proceed to Step 3.

### Step 3 — Generate Sign-off Certificate
Create a definitive Release Sign-off markdown artifact (`docs/releases/signoff-[VERSION].md`).

```markdown
# 🛡️ QA Release Sign-off Certificate

**Release Version**: `v1.4.2-rc3`
**Target Environment**: `Production`
**Sign-off Status**: 🟢 APPROVED FOR DEPLOYMENT

### Execution Summary
- **Total Test Cases Executed**: 142
- **Pass Rate**: 98.4% (140 Pass / 2 Fail)
- **Known Outstanding Issues**:
  - `BUG-108` (S4) - Header logo pixelated on iPhone SE. (Accepted Risk).

### DevOps Deployment Requirements
- **DB Migrations Required**: YES (`migrations/004_auth.sql`)
- **Env Vars Required**: YES (Added `NEW_STRIPE_KEY` to vault).
```

### Step 4 — Execute the Handoff Payload
Tag the DevOps agent or Human Lead. Formally transition state.
Example: Update `implementation_plan.md` or `task.md`:
`- [x] QA Sign-off complete. Handoff to @DevOps for Prod Push.`

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Accidental Go | QA finds a rogue S1 bug *after* sending the Sign-off | Instantly trigger `/devops-handle-incident` or message DevOps to abort the pipeline. Send `REVOKE SIGNOFF` notice. |
| Version Mismatch | QA signed off `rc2` but Devops asks to deploy `rc3` | STRICT REJECT. A completely new pass of the Regression suite is required for `rc3`. Do not bend. |

---

## ✅ Done Criteria / Verification

Handoff is complete when:

- [ ] A formal Sign-off Certificate is generated with exact versioning.
- [ ] Zero S1/S2 Blocker bugs are open without an explicit "Accepted Risk" override.
- [ ] DevOps constraints (DB migrations, Env vars) are clearly handed over in the payload.
