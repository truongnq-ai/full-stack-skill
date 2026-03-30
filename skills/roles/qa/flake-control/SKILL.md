---
name: Flake Control & Quarantine
description: Processes for identifying, quarantining, and resolving flaky automated E2E tests to restore CI pipeline trust.
category: roles/qa
metadata:
  labels: [qa, automation, flaky-tests, ci-cd, reliability]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [flaky test, test fails sometimes, quarantine, fix automation]
---

# 🍂 Flake Control & Quarantine

> **Use this skill when**: the automated CI/CD pipeline fails intermittently due to a test that passes locally but fails randomly in the cloud (a "Flaky Test"). Trigger: `/qa-quarantine`.
>
> **Out of scope**: This is NOT for fixing legitimate code bugs. This is for stabilizing the *Test Implementation* itself.

---

## 🚫 Anti-Patterns

- **The "Re-run it" Mentality**: Hitting "Restart Pipeline" 5 times until the flaky test randomly passes, then merging the code. (This destroys trust in the pipeline).
- **Ignoring Timestamps**: Assuming a failure is a flake without checking if a background cronjob or server backup locked the DB at that exact second.
- **Blind Skips**: Using `.skip()` on a test and abandoning it for 6 months, permanently losing test coverage.

---

## 🛠 Prerequisites & Tooling

1. The exact Test ID or test name that fluctuated.
2. CI/CD logs (e.g., GitHub Action traces, Playwright video artifacts).
3. Access to `roles/qa/bug-reporting-standard/SKILL.md` to track the technical debt.

---

## 🔄 Execution Workflow

### Step 1 — Identification & Verification
Identify the offending test.
Run it locally using a stress command (e.g., `pytest --count=20` or Playwright `--repeat-each 10`).
If it fails 2 out of 10 times, you have mathematically proven it is a Flake.

### Step 2 — Quarantine (Stop the Bleeding)
A flaky test degrades team velocity because it blocks innocent PRs.
1. Immediately edit the E2E script and append the framework's skip method (`test.skip(...)` or `@pytest.mark.skip(reason="Flaky: BUG-201")`).
2. **Never** skip without mapping it to a newly created Bug ID.

### Step 3 — Root Cause Analysis of the Test
Investigate the Flake:
- **Race Condition**: Is the test clicking a button before the JavaScript hydration is complete? (Fix: Wait for `data-status="ready"`).
- **Shared State**: Is another test running in parallel mutating the DB row you are asserting against? (Fix: Generate unique ID per test `run_${UUID}`).
- **Network Latency**: Did an API call take 3000ms but the test timeout was brutally set to 2000ms? (Fix: Implement explicit `waitForResponse`).

### Step 4 — Refactoring & Un-Quarantine
Rewrite the test using dynamic assertions (refer to `roles/qa/automation-e2e/SKILL.md`).
Re-run the stress test (`--repeat-each 20`).
If it passes 20/20, remove the `.skip()` tag, commit the fix, and close the Flake Bug ticket.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Not a Flake | Stress test passes 50/50 times locally, but fails 100% on CI | It's an Environment constraint. CPU throttling on CI, or missing environment variables. Investigate CI Docker config, do not blame the test code. |
| Core Flow Skipped | The Flake is literally `Login.spec.js` | You cannot quarantine the most critical path of the app. Halt all Dev work and escalate to an immediate SEV-1 Swarm to fix the automation. |

---

## ✅ Done Criteria / Verification

Flake Control is complete when:

- [ ] The flaky test is quarantined (skipped) to unblock the main branch CI.
- [ ] A formal Tech Debt `BUG-XXX` ticket is issued explicitly stating the Flake behavior.
- [ ] The test is stress-tested post-refactor (minimum 20 iterations pass cleanly) before re-entering active execution rotation.
