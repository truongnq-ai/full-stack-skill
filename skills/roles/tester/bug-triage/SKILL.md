---
name: Defect Triage & Prioritization
description: Systematic process to evaluate incoming bugs, assessing Severity vs Priority, assigning target fix versions, and optionally syncing to issue trackers (e.g. GitHub) using MCP.
category: roles/tester
metadata:
  labels: [qa, triage, prioritization, defect-management, github, mcp, tester]
  triggers:
    priority: high
    confidence: 0.85
    keywords: [triage bug, prioritize bug, assess severity, bug board, verify issue, test bug report]
    context: ["user asks to triage incoming bugs", "user asks to verify a bug and push to github"]
---

# 🩺 Defect Triage & Prioritization

> **Use this skill when**: a backlog of reported bugs (`BUG-XXX`) exists and the team needs to determine *what to fix first* based on impact and capacity, or when a vague bug report needs verification and logging to an issue tracker (e.g., GitHub). Trigger: `/qa-triage-bugs`.
>
> **Out of scope**: This is NOT for writing the initial bug report manually (use `bug-reporting-standard/SKILL.md`). This is a management/QA lead organizational process.

---

## 🚫 Anti-Patterns

- **Severity == Priority Confusion**: Thinking a visual typo on the Homepage (Sev-3, Low impact) is low Priority. (It's Sev-3, but Priority-1 because it looks terrible to investors).
- **The "Everything is Critical" Trap**: Labeling 90% of bugs as S1/P1, neutralizing the meaning of Priority.
- **Hoarding Bugs**: Leaving hundreds of trivial, 3-year-old bugs open in the backlog. Triage requires closing "Won't Fix" bugs aggressively.
- **Logging Unverified Bugs**: Pushing a ticket to Dev without explicit "Steps to Reproduce".

---

## 🛠 Prerequisites & Tooling

1. A list of active, un-triaged defect files (e.g., in `docs/qa/bugs/`) OR a vague user report.
2. The current sprint timeline or target Release version.

**Required Tools**:
- Use `run_command` if needed to verify reproducibility on a local instance.
- Use `call_mcp_tool` for `github` (`mcp_github_create_issue`) to automatically log verified, triaged tickets directly to the engineering backlog.

---

## 🔄 Execution Workflow

### Step 1 — Gather & Verify (The MetaGPT Approach)
Read the vague user report or untriaged defect files.
Attempt reproduction: deduce the likely "Steps to Reproduce".
Check if it's a User Error (PEBKAC) or a System Error. A bug is not a bug until it is reproducible.

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

### Step 5 — Sync & Update (MCP-First)
Modify the local bug report metadata:
```yaml
id: BUG-104
severity: S2
priority: P1
status: TRIAGED
```

> **⏸️ Checkpoint**: 
> "Bug đã được Triage (Severity S2, Priority P1). Bạn có muốn tôi dùng MCP GitHub (`mcp_github_create_issue`) để tạo Issue thẳng lên kho chứa không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Ambiguous Priority | PM and QA disagree on priority | Default to the higher Priority to be safe, append a `Needs-PO-Signoff` tag to force human decision. |
| Vague Report | Cannot determine severity because the report is empty | Push bug status to `NEEDS_INFO` and assign back to the original reporter. Do not attempt to guess. |
| MCP Auth Failure | GitHub MCP tool returns 401/Unauthorized | Instruct the user to verify their GitHub Token config in `skills.json` or `.env`. Fallback to saving a local `.md` file. |

---

## ✅ Done Criteria / Verification

A Triage session is complete when:

- [ ] Every active bug evaluated has an explicitly assigned Severity (S1-S4) and Priority (P1-P4).
- [ ] At least 10% of "Nice to have" cosmetic bugs are aggressively deprioritized to P4.
- [ ] High Priority (P1) bugs are immediately communicated to the DevOps/Dev leads via Telegram/Sync.
- [ ] Verified bugs are pushed to the issue tracker via MCP (if approved).

---

## 📚 Cross-References

- **Bug Reporting Standard**: `roles/tester/bug-reporting-standard/SKILL.md` (For initial bug capture)
- **RCA Lite**: `roles/tester/rca-lite/SKILL.md` (For S1/S2 bugs requiring root cause analysis)
