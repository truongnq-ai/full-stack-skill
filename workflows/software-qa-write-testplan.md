---
description: QA creates comprehensive test plan from acceptance criteria — maps test cases, defines coverage matrix, and prepares execution checklist.
---

# 📋 QA Write Test Plan

> **Use this workflow when**: QA needs to create test plan from requirements or acceptance criteria before testing begins. Trigger: `/software-qa-write-testplan`.
>
> **Out of scope**: Does not execute tests — use `software-qa-execute-testplan`. Does not gather requirements — use `software-ba-gather-requirements`.
>
> **Activates skills**: `skills/roles/qa/test-plan-template/SKILL.md`, `skills/roles/qa/test-strategy/SKILL.md`, `skills/roles/qa/traceability-matrix/SKILL.md`

---

## Step 1 — Load Prerequisites

```
view_file skills/roles/qa/test-plan-template/SKILL.md
view_file docs/specs/requirements-<feature>.md
view_file docs/handover/handover-<feature>.md
```

> **Fallback**: If no requirements doc, ask BA to run `software-ba-gather-requirements` first.

---

## Step 2 — Derive Test Cases

For each acceptance criterion:
- **Happy path**: Normal successful flow
- **Negative path**: Invalid input, unauthorized access
- **Edge cases**: Boundary values, empty state, concurrent access

Format per test case:

```
TC-[NNN]: [Title]
Precondition: [setup state]
Steps: [numbered actions]
Expected: [exact expected outcome]
Priority: P0/P1/P2
AC Reference: [AC-NNN]
```

---

## Step 3 — Build Traceability Matrix

```
view_file skills/roles/qa/traceability-matrix/SKILL.md
```

| AC ID | Test Case IDs | Coverage |
|-------|--------------|----------|
| AC-001 | TC-001, TC-002, TC-003 | ✅ Full |
| AC-002 | TC-004 | ⚠️ Partial |

> **Rule**: Every AC must have ≥1 test case. Any AC with 0 coverage = test plan is incomplete.

---

## ⏸️ Checkpoint: Approve Test Plan

```
"Test plan ready:
- Test cases: [N] (P0: [N], P1: [N], P2: [N])
- AC coverage: [N]/[N] (100%)
- Approve? (Y / N)"
```

---

## Step 4 — Save Test Plan

Save to `docs/qa/test-plan-[feature].md`:

```
## Test Plan — [Feature] — [Date]
### Test Strategy: [functional, regression, smoke]
### Test Cases: [full list]
### Traceability Matrix
### Environment Requirements
### Risks & Assumptions
```

---

## Done Criteria

- [ ] Every AC has ≥1 test case
- [ ] Traceability matrix shows 100% coverage
- [ ] `docs/qa/test-plan-[feature].md` saved
