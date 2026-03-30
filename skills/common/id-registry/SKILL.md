---
name: Universal ID Registry
description: Standardizes prefix conventions and formatting for User Stories, Bugs, Test Cases, and Releases across the team.
category: common
metadata:
  labels: [registry, ids, agile, traceability]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [id, identifier, registry, prefix, traceability]
---

# 🔗 Universal ID Registry

> **Use this skill when**: generating any new tracking artifact (Requirement, Test Case, Bug, Version). Enforces strict ID traceability to link BA, Dev, QA, and DevOps tools natively. Trigger: `/core-id-registry`.
>
> **Out of scope**: Does not act as an entire ticketing system (Jira/Linear). It simply enforces formatting rules *within* Markdown files and code commits.

---

## 🚫 Anti-Patterns

- **Naked Subject Lines**: Committing code with `"fixed login bug"` instead of `"fix(auth): resolve BUG-042 on login"`.
- **Divergent Formats**: Using `Test_42`, `TC-42`, and `case-42` interchangeably across documents.
- **Lost Branches**: Creating git branches like `new-feature` instead of `feature/US-102-new-dashboard`.
- **Magic Numbers**: Referencing "issue 4" without defining if it's a BUG, US, or AC.

---

## 🛠 Prerequisites & Tooling

1. Knowledge of `grep_search` to verify if IDs are already claimed in the repository (especially in `docs/`).
2. Familiarity with standard Regex patterns.

---

## 🔄 Execution Workflow

### Step 1 — Identify the Domain Category
Select the appropriate Prefix based on the entity being created:

| Entity Type | Prefix | Pad | Example | Responsibility |
|-------------|--------|-----|---------|----------------|
| Business Req | `REQ-` | 3 | `REQ-001` | BA |
| User Story | `US-` | 3 | `US-045` | PO / BA |
| Acceptance Crit| `AC-` | 3 | `AC-102` | BA |
| Test Case | `TC-` | 3 | `TC-200` | QA |
| Bug / Defect | `BUG-` | 3 | `BUG-014` | QA |
| Risk Entry | `R-` | 3 | `R-005` | PM / All |
| Release / Tag | `v` | SemVer | `v1.4.2` | DevOps |

### Step 2 — Auto-Increment Protocol
When generating a new entity:
1. Grep the target directory: `grep_search -regex 'TC-[0-9]{3}' docs/qa/`
2. Parse the highest numerical suffix.
3. Increment by 1. Ensure zero-padding is maintained. (e.g., 099 -> 100).

### Step 3 — Enforce Strict Cross-Linking (Traceability)
Whenever an downstream entity is created, it MUST reference its upstream parent ID.
- A **Bug** must reference the **Test Case** or **User Story** it failed on.
- A **Test Case** must map 1:1 or 1:N to an **Acceptance Criteria (AC)**.
- A **Code Commit** must prefix the **User Story** or **Bug** ID.

*Syntax Requirement*: `[Linked: US-045]` or `# Ref: BUG-012`

### Step 4 — Git Branching Standard Integration
If the ID workflow involves code changes, enforce branch naming based on the ID:
- Feature: `feat/US-<NNN>-short-desc`
- Bugfix: `fix/BUG-<NNN>-short-desc`
- Hotfix: `hotfix/BUG-<NNN>-short-desc`

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| ID Collision | Agent generates an ID that is already in use by another merged file | Implement a pre-commit duplicate check. If collision detected, run re-index and pick max ID + 1. |
| Legacy Format | Old docs use unpadded/random formats | Do NOT rewrite legacy documents unless explicitly tasked. Apply the strict Standard ONLY to new artifacts moving forward. |

---

## ✅ Done Criteria / Verification

An ID generation procedure is verified when:

- [ ] The generated ID strictly matches the Prefix and Pad requirements.
- [ ] The ID has been verified as completely unique within its specific domain sequence.
- [ ] Traceability to its parent ID (if any) is statically written in the file context.
