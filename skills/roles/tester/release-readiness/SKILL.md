---
name: QA Release Readiness Assessment
description: Pre-flight checklist to verify all tests and environments are stable before formal Release Candidate deployment.
category: roles/qa
metadata:
  labels: [qa, readiness, checklist, pre-flight]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [release ready, pre-flight, qa check, readiness]
---

# 🛫 QA Release Readiness Assessment

> **Use this skill when**: the development team announces a code freeze and preparing an RC (Release Candidate), and QA needs to assess if the build is even stable enough to begin formal testing. Trigger: `/qa-check-readiness`.
>
> **Out of scope**: This does NOT sign off the release for Production (use `roles/qa/handover-to-devops/SKILL.md`). This is the *Entry Gate* to start QA regression.

---

## 🚫 Anti-Patterns

- **Premature Testing**: Starting a 3-day regression suite when the `master` branch doesn't even compile or pass basic unit tests.
- **Environment Drift**: Assessing readiness on `Staging` using the database schema from `Production`, leading to false positives.
- **Ignoring Dependency Lock**: Accepting a build where `package.json` dependencies bumped major versions without Dev acknowledging it.

---

## 🛠 Prerequisites & Tooling

1. The target Release Candidate tag (e.g., `v1.5.0-rc1`).
2. Read access to CI/CD pipeline outputs (via API or provided markdown log).
3. The QA Test Plan generated from `skills/roles/qa/test-plan-template/SKILL.md`.

---

## 🔄 Execution Workflow

### Step 1 — Artifact Verification
Confirm the exact Git Commit SHA matches the intended RC tag.
```bash
git ls-remote --tags origin | grep "v1.5.0-rc1"
```
Ensure QA is explicitly testing this exact hash.

### Step 2 — Pipeline Health Check
Verify the upstream automated checks completed successfully:
- Unit Tests: 100% Passed.
- Linting/Static Analysis: Passed.
- Security Scans (e.g., Dependabot/Snyk): No Critical CVEs introduced in this branch.

If any of these failed, **Reject the RC** immediately and bounce back to Development.

### Step 3 — Smoke Test (Sanity Pass)
Before running the 1000-case regression suite, explicitly run a 5-minute manual or automated Smoke Test:
1. Does the app boot up?
2. Can a user log in?
3. Does the core critical path (e.g., checkout, API core endpoint) return 200 OK?

### Step 4 — State Transition
If Step 1-3 pass, update the RC state in the tracking system:
```yaml
status: IN_QA_REGRESSION
rc_version: v1.5.0-rc1
start_date: 2026-03-30
primary_qa: Agent
```

### Step 5 — Notify Team
Broadcast via Telegram or Slack that the environment is locked and Regression has begun. No further commits are allowed to this RC without invalidating the test.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Fails Smoke Test | Login endpoint 500s | Immediately abort Readiness Check. Tag Dev. Create a `BUG-XXX` with SEV-1. |
| Bad Environment | Staging contains dummy data interfering with tests | Invoke `roles/qa/environment-management/SKILL.md` to flush and reseed the DB before continuing. |

---

## ✅ Done Criteria / Verification

Readiness is complete when:

- [ ] RC Tag and Git SHA are definitively mapped and verified.
- [ ] Unit test and CI pipelines are confirmed Green (Passed).
- [ ] Smoke tests passed without incident.
- [ ] Regression testing is explicitly approved to begin.
