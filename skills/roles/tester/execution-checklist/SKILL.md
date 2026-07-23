---
name: Test Execution Checklist & Reporting
description: Organizes and executes manual testing sessions uniformly, ensuring no acceptance criteria are skipped. Includes generation of Daily Test Reports.
category: roles/tester
metadata:
  labels: [qa, testing, checklist, execution, manual, report, daily-test-report, tester]
  triggers:
    priority: medium
    confidence: 0.85
    keywords: [execute tests, manual run, test checklist, test pass, daily test report, qa report]
    context: ["user asks to execute a test suite manually", "user asks for a daily QA report"]
---

# ✅ Test Execution Checklist & Reporting

> **Use this skill when**: a QA Agent or Human is preparing to manually execute a mapped Test Plan against a new Feature or Release Candidate, or when you need to generate a Daily Test Report aggregating execution results. Trigger: `/qa-execute-tests`.
>
> **Out of scope**: This is NOT for writing the initial Test Plan (use `roles/tester/test-plan-template/SKILL.md`). This is the *act of passing/failing* already written tests and reporting on them.

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
3. Familiarity with `roles/tester/bug-reporting-standard/SKILL.md` in case of failure.

**Required Tools**: Use `run_command` if testing requires executing local bash scripts or APIs via curl.

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

### Step 4 — Generate Daily Test Report
Once the matrix is completed (or at the end of the day), aggregate the final numbers into a structured Daily Test Report format:

```yaml
summary: "Executed Auth module regression on Staging"
metrics:
  total: 30
  passed: 25
  failed: 5
  blocked: 0
blockers: []
risks: ["Login API latency spikes observed during TC-002 execution"]
next_checks: ["Retest failed login scenarios tomorrow after hotfix"]
```

> **⏸️ Checkpoint**: 
> "Kiểm thử thủ công đã hoàn tất. Báo cáo Daily Test Report (định dạng YAML) đã được sinh ra. Bạn có muốn tôi ghi kết quả này vào file báo cáo của dự án không? (Y/N)"

### Step 5 — State Decision
If Failed > 0 (especially on critical paths), reject the feature/PR and notify the Developer. If Passed == Total, mark the feature as `QA_APPROVED` in the main workflow tracker.

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
- [ ] The final execution summary metrics and Daily Test Report are accurately tallied.
- [ ] The outcome (Approve/Reject) is communicated back to the core workflow tracker.

---

## 📚 Cross-References

- **Bug Reporting Standard**: `roles/tester/bug-reporting-standard/SKILL.md` (To log failures)
- **QA Release Readiness**: `roles/tester/handover-to-devops/SKILL.md` (If this execution is the final gate)
