---
name: Test Coverage Matrix
description: Creates and analyzes traceability matrices linking Requirements/User Stories to specific Automated and Manual Test Cases.
category: roles/qa
metadata:
  labels: [qa, coverage, matrix, traceability, analysis]
  triggers:
    priority: low
    confidence: 0.8
    keywords: [coverage, rtm, traceability matrix, map tests]
---

# 📊 Test Coverage Matrix

> **Use this skill when**: the project requires validation that 100% of Acceptance Criteria in a specification have been mapped to actual QA Test Cases, exposing blind spots in testing. Trigger: `/qa-coverage-matrix`.
>
> **Out of scope**: This does not measure *Code Coverage* (line-by-line Istanbul/Jacoco percent). This measures *Requirement Coverage* (Business Traceability).

---

## 🚫 Anti-Patterns

- **Coverage Hallucination**: Claiming "100% coverage" because 50 tests exist, without verifying if a single test actually targets `US-042 Acceptance Criteria #4`.
- **Ignoring Edge Cases**: Documenting that a feature is covered when only the Happy Path has a tracked test case.
- **Manual Overhead**: Building giant Excel spreadsheets that instantly go out of date instead of parsing Markdown files or standard artifacts.

---

## 🛠 Prerequisites & Tooling

1. List of target specification files (`docs/specs/*.md`).
2. List of target Test Case definitions (`docs/qa/test-cases/*.md`).
3. Familiarity with `skills/common/id-registry/SKILL.md` for ID matching.

---

## 🔄 Execution Workflow

### Step 1 — Ingest Requirements
Run standard file parsing (`grep_search` or `node` script) to extract every defined Acceptance Criteria (AC) ID linked to a User Story.
Example output:
- `US-101`: [AC-1, AC-2, AC-3]
- `US-102`: [AC-1, AC-2, AC-3, AC-4]

### Step 2 — Ingest Test Cases
Scan all QA Test artifacts and automated E2E script headers for Traceability Links (e.g., `# Ref: US-101 AC-3`).

### Step 3 — Map the Requirements Traceability Matrix (RTM)
Generate a cross-reference table comparing Step 1 against Step 2.
Construct the artifact at `docs/qa/coverage-matrix.md`:

```markdown
# 📊 Requirements Traceability Matrix

## Feature: User Authentication

| User Story | Acceptance Criteria | Linked Test Case(s) | Coverage Status | Test Type |
|---|---|---|---|---|
| US-101    | AC-1 (Valid Login)   | `TC-001`, `TC-002` | 🟢 FULL        | Auto (E2E) |
| US-101    | AC-2 (Blocked Acct)  | `TC-003`           | 🟢 FULL        | Manual     |
| US-101    | AC-3 (Timeout)       | NONE               | 🔴 MISSING     | N/A        |
| US-102    | AC-1 (Reset Email)   | `TC-004`           | 🟢 FULL        | Auto (API) |
| US-102    | AC-2 (Spam Filters)  | `TC-005`           | 🟡 PARTIAL     | Manual     |
```

### Step 4 — Analyze & Report Blind Spots
Summarize the findings dynamically.
*Example Summary*:
> "Coverage is at 80%. We are completely missing tests for `US-101 AC-3` (Timeout Handling). Assigning task to QA to backfill TC for this AC."

Update `task.md` with action items to generate the missing tests.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| ID Disconnect | Tests exist but lack `# Ref` tags | Agent must manually read test descriptions, infer mapping using basic keyword similarity, tag as `🟡 INFERRED`, and flag for human review. |
| Endless ACs | Spec file uses un-numbered bullet points for AC | Break down the bullets into pseudo-IDs (Bullet 1, Bullet 2) and warn the BA to use concrete IDs next sprint. |

---

## ✅ Done Criteria / Verification

Matrix generation is complete when:

- [ ] 100% of defined Acceptance Criteria are explicitly listed in the matrix row.
- [ ] Every AC is definitively assigned a status (Full, Partial, Missing).
- [ ] Any `Missing` coverage results in a concrete Task added to the main `task.md` queue.
