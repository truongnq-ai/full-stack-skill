---
name: Test Coverage & Traceability Matrix
description: Creates and analyzes traceability matrices linking Requirements/User Stories to specific Automated and Manual Test Cases to prove 100% downstream linkage.
category: roles/tester
metadata:
  labels: [qa, coverage, matrix, traceability, analysis, rtm, compliance, tester]
  triggers:
    priority: medium
    confidence: 0.85
    keywords: [coverage, rtm, traceability matrix, map tests, test link matrix, traceability metric]
    context: ["user asks to check test coverage", "user asks to map requirements to test cases"]
---

# 📊 Test Coverage & Traceability Matrix (RTM)

> **Use this skill when**: the project requires validation that 100% of Acceptance Criteria in a specification have been mapped to actual QA Test Cases, exposing blind spots in testing. Regulatory compliance (e.g., SOC2, HIPAA, ISO) demands absolute proof of this mapping. Trigger: `/qa-traceability`.
>
> **Out of scope**: This does not measure *Code Coverage* (line-by-line Istanbul/Jacoco percent). This measures *Requirement Coverage* (Business Traceability).

---

## 🚫 Anti-Patterns

- **Coverage Hallucination**: Claiming "100% coverage" because 50 tests exist, without verifying if a single test actually targets `US-042 Acceptance Criteria #4`.
- **One-way Traceability**: Only linking Tests to Requirements, but failing to link Bugs back to the Tests that spawned them. (You need full 3-way traceability: Req -> Test -> Bug).
- **Overly Broad Mapping**: Linking a single Login E2E test to 17 different User Stories to artificially inflate the RTM coverage percentage.
- **Manual Overhead**: Building giant Excel spreadsheets that instantly go out of date instead of parsing Markdown files or standard artifacts.

---

## 🛠 Prerequisites & Tooling

1. List of target specification files (`docs/specs/*.md`).
2. List of target Test Case definitions (`docs/qa/test-cases/*.md`).
3. Familiarity with `roles/ba/id-registry/SKILL.md` (or general tracking IDs) for matching.

**Required Tools**: Use `grep_search` to dynamically rip IDs out of document metadata and test case files.

---

## 🔄 Execution Workflow

### Step 1 — Map Forward (Requirements to Tests)
Crawl the BA specifications directory (`docs/specs/`).
Extract all `REQ-XXX` or `US-XXX` identifiers and their Acceptance Criteria (AC).
Crawl the QA Test Database (`docs/qa/test-cases/`) or automated E2E script headers. Identify which tests cite the REQ/US/AC ID (e.g., `# Ref: US-101 AC-3`).

### Step 2 — Map Backward (Bugs to Tests)
Crawl the active Bug backlog (`docs/qa/bugs/`). Every Bug should cite the Test Case it failed, or the Requirement it violates.

### Step 3 — Compile the RTM Table
Generate a strict Excel-like markdown table that provides visual 3-way mapping.
Construct the artifact at `docs/qa/coverage-matrix.md`:

```markdown
# 🔗 Traceability Matrix (RTM)
**Generated**: 2026-03-30

| Biz Requirement | User Story & AC | Mapped Test Case | Current Status | Slipped Bugs |
|---|---|---|---|---|
| REQ-001 (Auth)  | US-101 AC-1 (Valid Login) | `TC-040` (Auto E2E) | 🟢 PASS | - |
| REQ-001 (Auth)  | US-101 AC-2 (Google)      | `TC-041` (Auto API) | 🔴 FAIL | `BUG-80` |
| REQ-002 (Cart)  | US-105 AC-1 (Add Item)    | `TC-045` (Manual)   | 🟡 PENDING | - |
| REQ-003 (Legal) | US-108 AC-1 (TOS Check)   | NONE (Missing)      | 🚧 BLOCKED | - |
```

### Step 4 — Coverage Math & Blind Spots
Calculate the fundamental Coverage Ratio:
`Tested Coverage % = (Total US/AC Mapped to Tests) / (Total US/AC Count)`

Summarize the findings dynamically.
*Example Summary*:
> "Coverage is at 80%. We are completely missing tests for `US-108 AC-1` (TOS Check). Assigning task to QA to backfill TC for this AC."

Update `task.md` with action items to generate the missing tests.

> **⏸️ Checkpoint**: 
> "Bảng RTM (Traceability Matrix) đã được sinh ra tại `docs/qa/coverage-matrix.md`. Tỉ lệ phủ (coverage) là 80%. Có 1 Requirement chưa được map test case. Bạn có muốn tôi ghi chú việc back-fill test case này vào task.md không? (Y/N)"

### Step 5 — Embed / Deliver (Compliance Handshake)
When preparing a Release, inject this matrix directly into the QA Sign-off Certificate to prove due diligence.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Metadata Scrubbed | Files do not contain `# Ref:` standard tags | Generate an Error Report listing all "Orphaned Files". Refuse to generate the RTM until the IDs are manually fixed, or infer mapping using keywords and tag as `🟡 INFERRED`. |
| Impossible Scale| 5000 tickets exist in text files | Recommend transitioning the master source of truth into an SQLite DB or SaaS tool like Jira/Zephyr. Do not attempt a 5000-line regex operation in Agent context. |
| Endless ACs | Spec file uses un-numbered bullet points for AC | Break down the bullets into pseudo-IDs (Bullet 1, Bullet 2) and warn the BA to use concrete IDs next sprint. |

---

## ✅ Done Criteria / Verification

An RTM sweep is successful when:

- [ ] 100% of defined Acceptance Criteria are explicitly listed in the matrix row.
- [ ] The generated Markdown table accurately reflects 3-way mapping (Req -> Test -> Bug).
- [ ] A definitive percentage score for overall Coverage is generated.
- [ ] Orphaned Requirements (0 tests) are distinctly highlighted for immediate action (added to `task.md`).

---

## 📚 Cross-References

- **Handover to DevOps**: `roles/tester/handover-to-devops/SKILL.md` (Embed RTM into release sign-off)
- **Bug Reporting Standard**: `roles/tester/bug-reporting-standard/SKILL.md` (Ensuring bugs cite tests/requirements)
