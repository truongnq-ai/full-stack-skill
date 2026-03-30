---
description: QA executes test plan — runs functional, regression, and smoke tests, tracks pass/fail, and generates execution report.
---

# ▶️ QA Execute Test Plan

> **Use this workflow when**: QA has an approved test plan and needs to execute test cases systematically. Trigger: `/software-qa-execute-testplan`.
>
> **Out of scope**: Does not write test plan — use `software-qa-write-testplan`. Does not fix bugs — use `software-dev-fix-bug`.
>
> **Activates skills**: `skills/roles/qa/execution-checklist/SKILL.md`, `skills/roles/qa/regression-testing/SKILL.md`

---

## Step 1 — Load Test Plan

```
view_file docs/qa/test-plan-<feature>.md
view_file skills/roles/qa/execution-checklist/SKILL.md
```

> **Fallback**: If no test plan, run `software-qa-write-testplan` first.

---

## Step 2 — Setup Test Environment

Verify: correct branch deployed, database seeded, test accounts ready, API endpoints accessible.

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/health
```

> **Fallback**: If health check fails, confirm environment setup with DevOps.

---

## Step 3 — Execute Test Cases

Run each test case. Record per case:

| TC ID | Status | Actual Result | Notes |
|-------|--------|--------------|-------|
| TC-001 | ✅ PASS | As expected | — |
| TC-002 | ❌ FAIL | Got 500 instead of 201 | Screenshot attached |
| TC-003 | ⏭️ BLOCKED | Depends on TC-002 | — |

> **Rule**: On FAIL, immediately document: actual vs expected, screenshot/log, steps to reproduce.

---

## Step 4 — Regression Test

```
view_file skills/roles/qa/regression-testing/SKILL.md
```

Run regression suite for features adjacent to changes:

```bash
pnpm test 2>/dev/null || npm test
```

> **Fallback**: If no automated regression, manually verify top 5 critical paths.

---

## ⏸️ Checkpoint: Test Cycle Complete

```
"Execution results:
- Total: [N] | ✅ Pass: [N] | ❌ Fail: [N] | ⏭️ Blocked: [N]
- Pass rate: [X]%
- Blockers found: [N]

Proceed to report? (Y / N — re-test failed cases)"
```

---

## Step 5 — Generate Execution Report

Save to `docs/qa/execution-[feature]-[date].md`:

```
## Test Execution Report — [Feature] — [Date]
### Summary: [N] total | [N] pass | [N] fail | [%] rate
### Failed Test Cases: [detail per failure]
### Blocked Test Cases: [detail]
### Regression Results: [pass/fail]
### Recommendation: Go / No-Go for release
```

---

## Done Criteria

- [ ] All test cases executed or marked blocked
- [ ] Failed cases documented with reproduction steps
- [ ] Regression suite passed
- [ ] `docs/qa/execution-*.md` report saved
- [ ] Go/No-Go recommendation provided
