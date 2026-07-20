---
name: Regression Testing Strategy
description: Master protocol for building, executing, and maintaining the suite of tests that protect legacy functionality against new code changes.
category: roles/qa
metadata:
  labels: [qa, regression, safeguard, suite-maintenance]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [regression, test suite, broke old feature, backwards compatibility]
---

# 🛡️ Regression Testing Strategy

> **Use this skill when**: compiling or executing the master set of tests designed to prove that newly merged code did not inadvertently break pre-existing features. Trigger: `/qa-run-regression`.
>
> **Out of scope**: This does not test NEW features (that is Feature/Acceptance Testing). Regression solely protects the OLD features.

---

## 🚫 Anti-Patterns

- **100% Manual Regression**: Forcing a human to manually click through 600 tests every 2 weeks. (Unsustainable; Regression must be heavily automated).
- **The Bloated Suite**: Never deleting outdated tests. If a feature was deprecated in v1.2, running its regression test in v2.0 wastes time and CI compute.
- **Skipping Regression**: Merging a "tiny CSS fix" straight to Prod without running the regression suite, only to find the CSS hid the "Pay Now" button globally.

---

## 🛠 Prerequisites & Tooling

1. `npm run test:e2e` or equivalent command suite available.
2. The Master Regression Test Case list (`docs/qa/regression-suite.md`).

---

## 🔄 Execution Workflow

### Step 1 — Define the Scope (Full vs. Sanity)
Decide on the execution depth based on the Release risk profile:
- **Sanity/Smoke (P1 Only)**: Tests only critical paths (Login, Checkout, Profile). Takes 5 mins. Use for minor hotfixes.
- **Full Regression (P1 + P2 + P3)**: Executes exhaustive checks across all modules. Takes ~1 hour. Mandatory for Release Candidates.

### Step 2 — Automated Execution Layer
Invoke the automated test suite first.
```bash
npm run test:e2e -- --grep "@regression"
```
Monitor output. Any failures here must be converted into immediate `BUG-XXX` SEV-1/SEV-2 tickets. Automation failures halt the regression process.

### Step 3 — Manual Execution Layer (Exploratory / Visual)
Not everything can be cleanly automated (e.g., UI clipping, CAPTCHAs, external Auth plugins).
QA Agents/Humans must manually execute the specific tests tagged `[Manual-Regression]` in the test tracker.

### Step 4 — Suite Maintenance (Pruning)
Every sprint, audit the Regression suite. If a test is failing because the Business Logic changed (not because the code broke), update the test assertion.
If the feature was removed, explicitly Delete the test case to maintain a lean, high-velocity suite.

### Step 5 — Regression Sign-Off
Update the release or run documentation with the definitive pass rate. Revert to `roles/qa/handover-to-devops/SKILL.md` to finalize the deployment if the suite is green.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Massive Failures | 40% of automation suite fails suddenly | Do not log 40 bugs. Analyze the Root Cause. Likely a global variable change, Auth token expiration, or CSS module refactor. Open 1 Master Bug. |
| Test Timeout | Suite takes 4 hours to run | The regression suite is too bloated. Implement parallelization (e.g., Playwright `--workers=4`) or shard the CI matrix. |

---

## ✅ Done Criteria / Verification

Regression testing is considered complete when:

- [ ] Automated E2E tags mapped to `@regression` run to 100% completion.
- [ ] Zero pre-existing P1/P2 functionality has degraded (or it has been documented via Bug IDs).
- [ ] No deprecated or "Won't Fix" features are lingering in the test baseline causing false-negative CI failures.
