---
name: QA Gates & Milestones
description: Defines the required entry and exit criteria for code moving through the testing lifecycle.
category: roles/qa
metadata:
  labels: [qa, quality-gates, SDLC, process, lifecycle]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [qa gates, entry criteria, exit criteria, definition of done]
---

# 🚧 QA Quality Gates

> **Use this skill when**: arbitrating whether a feature is "ready to test" (Entry Gate) or "ready to release" (Exit Gate). Trigger: `/qa-check-gates`.
>
> **Out of scope**: This is a process definition skill. It does not execute the E2E tests, it merely checks if they were executed successfully.

---

## 🚫 Anti-Patterns

- **"Over the Wall" Toss**: A developer merges code without Unit Tests, pushing it to QA, assuming QA will catch everything. (Violates Entry Gate).
- **Ignoring Tech Debt**: Passing an Exit Gate when the feature works, but introduced 50 new warnings in the linter cache.
- **Silent Waivers**: Waiving a failed QA Gate requirement verbally ("It's fine, we'll fix it later") without recording the waiver in the Tracking Metadata.

---

## 🛠 Prerequisites & Tooling

1. Familiarity with the project's Definition of Done (DoD).
2. Read-access to CI pipeline statuses, PR descriptions, and `task.md`.

---

## 🔄 Execution Workflow

### Step 1 — Evaluate the QA Entry Gate (Dev -> QA)
Before QA wastes time provisioning data or writing execution checklists, enforce the Entry Gate on the PR or Feature Branch:
- [ ] **Peer Review**: Has it been approved by at least 1 other Developer?
- [ ] **Unit Tests**: Are unit tests passing with minimum coverage metrics?
- [ ] **Static Constraints**: Does it pass Linter, Prettier, and Type-checking?
- [ ] **Traceability**: Is the PR explicitly linked to a `US-XXX` or `BUG-XXX`?

*Action*: If any of these are missing, QA must **Reject** the ticket back to "In Progress".

### Step 2 — Evaluate the QA Exit Gate (QA -> UAT/Prod)
Before QA signs off on a feature (via `/qa-handoff-devops`), evaluate the Exit Gate:
- [ ] **Execution Completeness**: Have 100% of mapped Test Cases been executed?
- [ ] **Defect Resolution**: Are there 0 open `S1 / S2` bugs linked to this scope?
- [ ] **Automation Backfill**: Have E2E automation tests been written and merged for the new critical paths?
- [ ] **Documentation**: Has the README or API swagger definition been updated?

### Step 3 — Process Waivers (Exceptions)
If an Exit Gate fails (e.g., an S2 bug exists), the code CANNOT pass without a Waiver.
A Waiver requires explicitly tagging the PM/PO.
Generate waiver entry in `task.md`:
`[WAIVER] Gate bypassed: S2 Bug 104 accepted by @PM due to deadline constraint.`

### Step 4 — Gate Stamp
If all criteria are met, apply the official `QA PASSED` label via GitHub MCP or write the status cleanly into the system of record.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Partial Unit Tests | Coverage is 78%, but gate demands 80%. | Isolate what is missing. If it's UI glue code rarely tested via Unit, allow a 1-time tolerance or prompt Dev to write 1 more test. |
| Missing Dev Output | Dev branch has no tracked ID | Search commit logs to infer the User Story. Auto-link it, but warn Dev about SDLC violation. |

---

## ✅ Done Criteria / Verification

A QA Gate evaluation is complete when:

- [ ] Every checkbox in the target Gate (Entry or Exit) has been evaluated as True/False.
- [ ] Failures actively Halt the state transition (e.g., kicking the ticket back to To Do).
- [ ] Accepted risk/bypass logic is explicitly documented as a Formal Waiver.
