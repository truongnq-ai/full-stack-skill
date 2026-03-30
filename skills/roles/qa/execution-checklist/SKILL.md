---
name: Test Execution Checklist
description: Organizes and executes manual testing sessions uniformly, ensuring no acceptance criteria are skipped during execution.
category: roles/qa
metadata:
  labels: [qa, testing, checklist, execution, manual]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [execute tests, manual run, test checklist, test pass]
---

# ✅ Test Execution Checklist

> **Use this skill when**: a QA Agent or Human is preparing to manually execute a mapped Test Plan against a new Feature or Release Candidate. Trigger: `/qa-execute-tests`.
>
> **Out of scope**: This is NOT for writing the initial Test Plan (use `roles/qa/test-plan-template/SKILL.md`). This is the *act of passing/failing* already written tests.

---

## 🚫 Anti-Patterns

- **"Looks Good" Tick-offs**: Marking a test case as Passed without actually going into the UI/API and firing the specific payload.
- **Ignoring Evidence**: Failing a test but not capturing the exact payload, timestamp, or console log as evidence of the failure.
- **Deviation from Scope**: Going rogue and testing feature X when the checklist explicitly demands feature Y. (Exploratory testing is valuable, but should be tracked separately).
- **Environment Ignorance**: Executing the checklist on `localhost` and clearing the ticket, ignoring that the final deployment is on `staging`.

---

## 🛠 Prerequisites & Tooling

1. Locate the structured Test Execution instance file: `docs/qa/runs/RUN-2026-03-30.md`.
2. Target browser or REST client depending on the testing medium.
3. Reference to `roles/qa/bug-reporting-standard/SKILL.md` in case of failure.

---

## 🔄 Execution Workflow

### Step 1 — Setup Workspace
Generate the blank Execution Form if it doesn't exist, copied from the Master Test Plan.
Format:
```markdown
# Execution Run: [Feature Name] - [Env: Staging]
**Date**: YYYY-MM-DD
**Agent**: QA Orchestrator
```

### Step 2 — Sequential Execution (The Loop)
Iterate over each `TC-XXX` (Test Case) exactly as written:
1. **Read Given/When/Then**.
2. **Execute literally**. Do not skip steps.
3. **Record Result**.

### Step 3 — Documenting Fails
If a test fails the `Then` assertion, mark the row `🔴 FAIL`.
Immediately pause the execution loop to log a formal `BUG-XXX` via the Bug Reporting skill.
Attach the new `BUG-XXX` ID directly into the checklist row.

```markdown
| TC ID | Description | Status | Evidence / Bug ID |
|---|---|---|---|
| TC-001 | Valid Login logs user in | 🟢 PASS | Checked JWT |
| TC-002 | Invalid User shows HTTP 401 | 🔴 FAIL | `BUG-109` (Shows 500 instead) |
| TC-003 | SQL injection string rejected | 🟢 PASS | - |
```

### Step 4 — Generate Execution Summary
Once the matrix is completed, aggregate the final numbers at the top of the file:
- **Total Tests**: 30
- **Passed**: 25
- **Failed**: 5
- **Blocked**: 0

### Step 5 — State Decision
If Failed > 0 (especially on critical paths), reject the feature/PR and notify the Developer. If Passed == Total, mark the feature as `QA_APPROVED` in the main `task.md`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Blocked Path | TC-001 fails, meaning TC-002 through TC-010 physically cannot be reached | Mark TC-001 as `🔴 FAIL`. Mark 002-010 as `🚧 BLOCKED` citing `BUG-XXX` from 001. Do not mark them Fail. |
| Vague TC | TC simply says "Test the button" | Mark TC as `🚧 BLOCKED (Bad Spec)`. Route back to QA Lead/BA to clarify the required explicit assertion. |

---

## ✅ Done Criteria / Verification

The execution phase is finished when:

- [ ] Every listed `TC-XXX` in the batch has a final state (Pass, Fail, or Blocked).
- [ ] Every `🔴 FAIL` explicitly links to a newly generated `BUG-XXX` defect ID.
- [ ] The final execution summary metrics are accurately tallied.
- [ ] The outcome (Approve/Reject) is communicated back to the core workflow tracker.
