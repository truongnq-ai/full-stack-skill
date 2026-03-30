---
description: QA verifies release readiness — confirms all tests pass, blockers resolved, UAT approved, and quality gates met before deployment.
---

# ✅ QA Verify Release

> **Use this workflow when**: QA needs to sign off on a release candidate, verify all quality gates are met. Trigger: `/software-qa-verify-release`.
>
> **Out of scope**: Does not deploy — use `software-devops-deploy-release`. Does not fix bugs — use `software-dev-fix-bug`.
>
> **Activates skills**: `skills/roles/qa/release-readiness/SKILL.md`, `skills/roles/qa/qa-gates/SKILL.md`, `skills/roles/qa/uat-process/SKILL.md`

---

## Step 1 — Collect Release Artifacts

```bash
ls docs/qa/execution-*.md docs/qa/test-plan-*.md docs/qa/bugs/ 2>/dev/null
git log --oneline -20
```

Verify: latest test execution report exists, all S1/S2 bugs resolved.

> **Fallback**: If no execution report, run `software-qa-execute-testplan` first.

---

## Step 2 — Quality Gate Check

```
view_file skills/roles/qa/qa-gates/SKILL.md
```

| Gate | Criteria | Status |
|------|----------|--------|
| **Functional** | All P0 test cases pass | ✅/❌ |
| **Regression** | No regression introduced | ✅/❌ |
| **Bugs** | Zero S1/S2 open bugs | ✅/❌ |
| **Performance** | No degradation >10% | ✅/❌ |
| **Security** | No critical vulnerabilities | ✅/❌ |

> **Rule**: Any ❌ on a gate = release blocked until resolved.

---

## Step 3 — UAT Verification

```
view_file skills/roles/qa/uat-process/SKILL.md
```

Confirm with stakeholder: core user flows work as specified, acceptance criteria met.

---

## ⏸️ Checkpoint: Release Decision

```
"Release verification:
- Quality gates: [N]/[N] passed
- Open S1/S2 bugs: [N]
- UAT: [Approved/Pending]
- Recommendation: GO / NO-GO

Confirm release? (Y / N)"
```

---

## Step 4 — Sign-Off Report

Save to `docs/qa/release-signoff-[version].md`:

```
## Release Sign-Off — [Version] — [Date]
### Quality Gates: [all gate statuses]
### Test Summary: [total/pass/fail from execution report]
### Open Bugs: [count by severity]
### UAT Status: [Approved by/Pending]
### Decision: GO / NO-GO
### Signed by: [QA lead]
```

---

## Done Criteria

- [ ] All quality gates evaluated
- [ ] Zero S1/S2 bugs open
- [ ] UAT sign-off obtained
- [ ] `docs/qa/release-signoff-*.md` saved
- [ ] GO/NO-GO decision documented
