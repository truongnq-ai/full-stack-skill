---
name: Daily Status Sync Protocol
description: Standardized PM daily standup — aggregates blockers, updates task trackers, and prepares the operational status report.
category: roles/pm
metadata:
  labels: [pm, standup, agile, daily-sync, status]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [daily sync, standup, blocker, status update, pm sync]
---

# 📅 Daily Status Sync Protocol

> **Use this skill when**: acting as a Project Manager or Scrum Master tasked with running the daily standup, summarizing yesterday's output, and identifying today's blockers. Trigger: `/core-status-sync` or `/setup-standup`.
>
> **Out of scope**: This is NOT for the massive end-of-week reporting (use `skills/common/weekly-sync/SKILL.md`). It does not execute the actual blocked tasks—it only tracks them.

---

## 🚫 Anti-Patterns

- **Status Spam**: Emitting 45 lines of raw git commit logs instead of grouping by Feature/Story.
- **Ignoring Blockers**: Failing to aggressively flag and tag the Owner of a blocking dependency.
- **Lost Context**: Updating `task.md` with "Done" but forgetting to link the PR/Commit that resolved it.
- **Micromanagement**: Asking agents for byte-by-byte syntax status instead of feature-level status.

---

## 🛠 Prerequisites & Tooling

1. Ensure the agile tracker file exists: `task.md` or `implementation_plan.md`.
2. Familiarity with `git log` to extract the last 24 hours of activity.
3. Access to `skills/common/telegram-interactive-messages/SKILL.md` for team broadcasting.

---

## 🔄 Execution Workflow

### Step 1 — Gather Raw Activity
Query the exact changes from the last 24 hours:
- Source Code: `git log --since="24 hours ago" --oneline`
- Task Boards: Auto-parse `task.md` for recently checked `[x]` items.
- CI/CD constraints: Verify if the nightly build succeeded or failed (e.g., check `d:\GitHub\...`).

### Step 2 — Identify Discrepancies
Compare what was mapped as "In Progress" yesterday versus what actually shipped.
- Did a task scheduled for yesterday carry over to today? Mark it as `Carrie Over`.
- Is there an open PR waiting for review? Tag it as `Review Blocked`.

### Step 3 — Compile the PM Status Report
Generate a highly structured Markdown output `docs/meetings/daily-sync-YYYY-MM-DD.md`.

```markdown
# 🌅 Daily Standup — [YYYY-MM-DD]

## 🟢 Shipped / Completed
- `[US-102]` User Profile Dashboard (Merged: PR #42)
- Fixed `[BUG-15]` Login Timeout

## 🟡 In Progress (Today's Focus)
- `[US-105]` Payment Gateway Integration (Dev: Active)

## 🔴 BLOCKERS
- 🚨 **Infrastructure**: Missing AWS RDS credentials for staging.
  - **DRI (Owner)**: @DevOps
  - **Impact**: Holding up `[US-105]` testing.
```

### Step 4 — Action the Tracker
Update the root `task.md`:
- Move completed items to the bottom/completed stack.
- Inject a `[BLOCKED]` tag next to any frozen item.

### Step 5 — Broadcast (Optional)
If running autonomously for a team, compress the Markdown into HTML and invoke the Telegram Broadcasting skill to push the standup to the PM channel.

---

## ⚠️ Error Handling (Fallback)

| Issue | Cause | Fallback Action |
|-------|-------|-----------------|
| Zero Activity | Nobody coded/committed | Document explicitly: "No commits detected in the last 24h. Awaiting manual updates." |
| No Task File | `task.md` missing | Run initialization phase to create a skeletal Task file based on project `README.md` or Git history. |
| Parse Error | Corrupted markdown checkboxes | Re-format the `task.md` using standard `- [ ]` syntax before parsing. |

---

## ✅ Done Criteria / Verification

Before terminating the workflow, PM must ensure:

- [ ] Daily sync Markdown file is committed or saved in `docs/meetings/`.
- [ ] At least one active task is logged under "In Progress".
- [ ] All blockers are explicitly assigned a DRI (Directly Responsible Individual).
- [ ] The core `task.md` tracker perfectly reflects the summarized reality.
