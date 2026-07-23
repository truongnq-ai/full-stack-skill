---
name: Release Readiness & DevOps Handoff
description: Entry and Exit gates for the QA lifecycle. Assesses Release Candidate (RC) stability before testing (Readiness), and formally signs off for production deployment (Handoff).
category: roles/tester
metadata:
  labels: [qa, devops, release, sign-off, readiness, tester]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [qa sign off, handoff to devops, release readiness, qa go live, pre-flight, check readiness]
    context: ["user asks to assess a release candidate", "user asks to sign off for deployment"]
---

# 🚀 Release Readiness & DevOps Handoff

> **Use this skill when**: 
> 1. (Entry) A new Release Candidate (RC) is cut and needs pre-flight checks before full regression begins. Trigger: `/qa-check-readiness`.
> 2. (Exit) QA has completed execution and needs to formally hand control over to DevOps for Production Deployment. Trigger: `/qa-handoff-devops`.
>
> **Out of scope**: This is NOT the DevOps deployment script (use `roles/devops/deploy-release/SKILL.md`). This is purely the business authorization gate.

---

## 🚫 Anti-Patterns

- **Premature Testing (Readiness)**: Starting a 3-day regression suite when the `master` branch doesn't even compile or pass basic unit tests.
- **Ghost Approvals (Handoff)**: Saying "Ready for Prod!" without attaching the verifiable test execution metric report.
- **Ignoring Open S2s**: Approving a build with known Severity-2 bugs without explicit PM/PO sign-off indicating accepted risk.
- **Wrong Environment Signoff**: Testing `v1.0.0` on Staging but allowing DevOps to deploy `master` branch (which might have drifted).

---

## 🛠 Prerequisites & Tooling

1. The target Release Candidate tag (e.g., `v1.5.0-rc1`).
2. Read access to CI/CD pipeline outputs and the Master Test Plan document.

**Required Tools**: Use `run_command` with `git ls-remote` or similar commands to verify tags and commits if needed.

---

## 🔄 Execution Workflow

### Mode 1: Pre-flight Readiness (The Entry Gate)
Before running the 1000-case regression suite, explicitly run these sanity checks:
1. **Artifact Verification**: Confirm the exact Git Commit SHA matches the intended RC tag. Ensure QA is explicitly testing this exact hash.
2. **Pipeline Health Check**: Verify the upstream automated checks completed successfully (Unit Tests, Linting, Security Scans). If failed, REJECT the RC.
3. **Smoke Test (Sanity Pass)**: Can a user log in? Does the core critical path return 200 OK?
4. **State Transition**: If passed, transition status to `IN_QA_REGRESSION` and notify the team.

### Mode 2: Handoff to DevOps (The Exit Gate)
Once regression is complete, assert these facts before deploying to Prod:
1. **Metric Aggregation**: Are 100% of P1/P2 Regression tests passing? Did the CI pipeline e2e tests turn green?
2. **Open Defects Check**: Query for ANY active `BUG-` linked to this release that is Severity S1 or S2. If > 0, NO-GO unless explicitly waived by PO.
3. **Generate Sign-off Certificate**: Create a definitive markdown artifact (`docs/releases/signoff-[VERSION].md`).

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

> **⏸️ Checkpoint**: 
> "Chứng chỉ Sign-off (QA Release Sign-off Certificate) đã được tạo. Bạn có muốn tôi thực hiện bước Handoff cho DevOps Agent/Lead không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Fails Smoke Test | Login endpoint 500s | Immediately abort Readiness Check. Tag Dev. Create a `BUG-XXX` with SEV-1. |
| Accidental Go | QA finds a rogue S1 bug *after* sending the Sign-off | Instantly trigger `/devops-handle-incident` or message DevOps to abort the pipeline. Send `REVOKE SIGNOFF` notice. |
| Version Mismatch | QA signed off `rc2` but Devops asks to deploy `rc3` | STRICT REJECT. A completely new pass of the Regression suite is required for `rc3`. Do not bend. |

---

## ✅ Done Criteria / Verification

Handoff is complete when:

- [ ] (Readiness) RC Tag and Git SHA are definitively mapped, verified, and Smoke tests passed.
- [ ] (Handoff) A formal Sign-off Certificate is generated with exact versioning.
- [ ] (Handoff) Zero S1/S2 Blocker bugs are open without an explicit "Accepted Risk" override.
- [ ] DevOps constraints (DB migrations, Env vars) are clearly handed over in the payload.

---

## 📚 Cross-References

- **Regression Testing**: `roles/tester/regression-testing/SKILL.md` (To run the tests between Entry and Exit gates)
- **Bug Triage**: `roles/tester/bug-triage/SKILL.md` (To ensure open bugs are properly categorized before handoff)
