---
name: Defect Triage & Prioritization
description: Systematic process to evaluate incoming bugs, assessing Severity vs Priority, and assigning target fix versions.
category: roles/qa
metadata:
  labels: [qa, triage, prioritization, defect-management]
  triggers:
    priority: medium
    confidence: 0.85
    keywords: [triage, prioritize bug, assess severity, bug board]
---

# 🩺 Defect Triage & Prioritization

> **Use this skill when**: a backlog of reported bugs (`BUG-XXX`) exists and the team needs to determine *what to fix first* based on impact and capacity. Trigger: `/qa-triage-bugs`.
>
> **Out of scope**: This is NOT for writing the initial bug report (use `bug-reporting-standard/SKILL.md`). This is a management/QA lead organizational process.

---

## 🚫 Anti-Patterns

- **Severity == Priority Confusion**: Thinking a visual typo on the Homepage (Sev-3, Low impact) is low Priority. (It's Sev-3, but Priority-1 because it looks terrible to investors).
- **The "Everything is Critical" Trap**: Labeling 90% of bugs as S1/P1, neutralizing the meaning of Priority.
- **Hoarding Bugs**: Leaving hundreds of trivial, 3-year-old bugs open in the backlog. Triage requires closing "Won't Fix" bugs aggressively.

---

## 🛠 Prerequisites & Tooling

1. A list of active, un-triaged defect files (e.g., in `docs/qa/bugs/`).
2. The current sprint timeline or target Release version.

---

## 🔄 Execution Workflow

### Step 1 — Gather Un-Triaged Defects
Extract all open defect reports that lack a formal `Target_Release` or `Priority` rating.
(e.g., `grep_search -regex 'Priority: Unassigned' docs/qa/bugs/`)

### Step 2 — Define Severity (Technical Impact)
Evaluate the technical breakdown of the system for each bug.
- **S1 (Blocker)**: System crash, data loss, security breach. Cannot test further.
- **S2 (Critical)**: Core business flow is broken (e.g., checkout fails), no workaround exists.
- **S3 (Major)**: Core flow broken, but an easy workaround exists.
- **S4 (Minor)**: UI clipping, typos, non-critical edge cases.

### Step 3 — Define Priority (Business Impact)
Evaluate the urgency based on stakeholder needs.
- **P1 (Urgent)**: Fix today. Drop all feature work. (Typically S1/S2 issues).
- **P2 (High)**: Fix in current sprint.
- **P3 (Medium)**: Fix in next sprint or whenever capacity allows.
- **P4 (Low)**: Backlog indefinitely.

### Step 4 — Triage Decision matrix
Assign a status to the Bug Document:
- `ACCEPTED`: Marked for development (Assign to Target Version).
- `REJECTED (Not a bug)`: The system is working as intended relative to the AC.
- `DUPLICATE`: Same root cause as another logged BUG-XXX.
- `WONT FIX`: Impact is too low to justify developer cost.

### Step 5 — Update Tracker
Modify the bug report metadata:
```yaml
id: BUG-104
severity: S2
priority: P1
status: TRIAGED
target_release: v1.4.2-hotfix
assigned_dev: Pending
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Ambiguous Priority | PM and QA disagree on priority | Default to the higher Priority to be safe, append a `Needs-PO-Signoff` tag to force human decision. |
| Vague Report | Cannot determine severity because the report is empty | Push bug status to `NEEDS_INFO` and assign back to the original reporter. Do not attempt to guess. |

---

## ✅ Done Criteria / Verification

A Triage session is complete when:

- [ ] Every active bug evaluated has an explicitly assigned Severity (S1-S4) and Priority (P1-P4).
- [ ] At least 10% of "Nice to have" cosmetic bugs are aggressively deprioritized to P4.
- [ ] High Priority (P1) bugs are immediately communicated to the DevOps/Dev leads via Telegram/Sync.
