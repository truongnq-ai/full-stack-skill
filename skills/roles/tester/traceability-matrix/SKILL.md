---
name: Requirements Traceability Matrix (RTM) Gen
description: Automatically generates and parses an artifact proving 100% downstream linkage from Epic -> User Story -> Test Case -> Defect.
category: roles/qa
metadata:
  labels: [qa, rtm, traceability, matrix, compliance]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [rtm, traceability metric, track mapping, test link matrix]
---

# 🔗 Requirements Traceability Matrix (RTM)

> **Use this skill when**: Regulatory compliance (e.g., SOC2, HIPAA, ISO) demands absolute proof that every documented business requirement was specifically tested and passed by QA. Trigger: `/qa-traceability`.
>
> **Out of scope**: This focuses purely on the artifact generation linking IDs. It does not measure the *quality* of the tests themselves, just the *existence of the mapping*.

---

## 🚫 Anti-Patterns

- **Broken Links**: Having a test case stating `# Ref: US-999` when `US-999` doesn't exist in the BA documentation folder.
- **One-way Traceability**: Only linking Tests to Requirements, but failing to link Bugs back to the Tests that spawned them. (You need full 3-way traceability).
- **Overly Broad Mapping**: Linking a single Login E2E test to 17 different User Stories to artificially inflate the RTM coverage percentage.

---

## 🛠 Prerequisites & Tooling

1. Active usage of `skills/common/id-registry/SKILL.md` uniformly across all project markdown files.
2. Search capabiliy (`grep_search` or parsing script) to dynamically rip IDs out of document metadata.

---

## 🔄 Execution Workflow

### Step 1 — Map Forward (Requirements to Tests)
Crawl the BA specifications directory (`docs/specs/`).
Extract all `REQ-XXX` or `US-XXX` identifiers.
Crawl the QA Test Database (`docs/qa/test-cases/`). Identify which tests cite the REQ/US ID.

### Step 2 — Map Backward (Bugs to Tests)
Crawl the active Bug backlog. Every Bug should cite the Test Case it failed, or the Requirement it violates.

### Step 3 — Compile the RTM Table
Create a strict Excel-like markdown table that provides visual 3-way mapping.

```markdown
# 🔗 Traceability Matrix (RTM)
**Generated**: 2026-03-30

| Biz Requirement | User Story | Mapped Test Case | Current Status | Slipped Bugs |
|---|---|---|---|---|
| REQ-001 (Auth)  | US-101 (Login) | `TC-040` | 🟢 PASS | - |
| REQ-001 (Auth)  | US-102 (Google) | `TC-041` | 🔴 FAIL | `BUG-80` |
| REQ-002 (Cart)  | US-105 (Add Item) | `TC-045` | 🟡 PENDING | - |
| REQ-003 (Legal) | US-108 (TOS Check) | NONE (Missing) | 🚧 BLOCKED | - |
```

### Step 4 — Coverage Math
Calculate the fundamental Coverage Ratio:
`Tested Coverage % = (Total US Mapped to Tests) / (Total US Count)`
*If Coverage < 100%, alert the QA Lead to back-fill the missing Test Cases for the unmapped User Stories.*

### Step 5 — Embed / Deliver (Compliance Handshake)
When preparing a Release, inject this matrix directly into the QA Sign-off Certificate (`roles/qa/handover-to-devops/SKILL.md`) to prove due diligence.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Metadata Scrubbed | Files do not contain `# Ref:` standard tags | Generate an Error Report listing all "Orphaned Files". Refuse to generate the RTM until the IDs are manually fixed. |
| Impossible Scale| 5000 tickets exist in text files | Recommend transitioning the master source of truth into an SQLite DB or SaaS tool like Jira/Xray. Do not attempt a 5000-line regex operation in Agent context. |

---

## ✅ Done Criteria / Verification

An RTM sweep is successful when:

- [ ] The generated Markdown table accurately reflects 3-way mapping (Req -> Test -> Bug).
- [ ] A definitive percentage score for overall Coverage is generated.
- [ ] Orphaned Requirements (0 tests) are distinctly highlighted for immediate action.
