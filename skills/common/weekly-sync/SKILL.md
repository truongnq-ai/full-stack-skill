---
name: Weekly Sync Documenter
description: Aggregates weekly progress, blockers, and metrics into a standardized weekly sync report for team alignment.
category: common
metadata:
  labels: [agile, sync, meeting, team-alignment]
  triggers:
    priority: low
    confidence: 0.8
    keywords: [weekly sync, standup, summary, weekly report]
---

# 📅 Weekly Sync Documenter

> **Use this skill when**: the agent needs to generate a comprehensive Friday or Monday weekly summary, aggregate completed tasks, or prepare notes for a team retrospective. Trigger: `/core-weekly-sync`.
>
> **Out of scope**: This is NOT for daily standups (use `skills/roles/pm/status-sync/SKILL.md`). It does not execute the actual tasks or resolve the blockers mentioned in the report.

---

## 🚫 Anti-Patterns

- **Metric-less Summaries**: Simply saying "Fixed bugs" instead of "Fixed 5 bugs including #124 and #125".
- **Lost Blockers**: Documenting a blocker without assigning a directly responsible individual (DRI) to clear it.
- **Manual Data Copying**: Letting the user type out everything manually instead of auto-scanning `git log`, `task.md`, or JIRA feeds.
- **Cluttered Formats**: Creating multi-page documents that no one will read. Weekly syncs must be tightly scannable.

---

## 🛠 Prerequisites & Tooling

1. The target output directory and tracking file: `docs/meetings/weekly-sync-[YYYY-WW].md`.
2. Access to version control and task tracker files:
   - `task.md` or `implementation_plan.md`
   - Git commit history
3. Load reference formats:
```bash
view_file skills/common/weekly-sync/references/examples.md
```

If the meeting directory doesn't exist, create it:
```bash
mkdir -p docs/meetings
```

---

## 🔄 Execution Workflow

### Step 1 — Data Aggregation
Automatically gather the raw data from the past 7 days:
- Scan Git history: `git log --since="1 week ago" --oneline`
- Scan Task Tracker: parse `[x]` vs `[ ]` in `task.md`.
- Read active CI/CD status or Incident Logs from `docs/incidents/`.

### Step 2 — Categorize Outputs
Group the raw automated data into three core buckets:
- **🌟 Highlights / Shipped**: What reached production or was merged to master.
- **🚧 In Progress**: What is currently being worked on and carried over to next week.
- **🔥 Blockers / Risks**: What is preventing progress (Integrations, missing designs, etc.).

### Step 3 — Generate Sync Template
Create or update `docs/meetings/weekly-sync-[YYYY-WW].md` (replace WW with the week number).

```markdown
# Weekly Sync — Week [WW], [YYYY]

## 🌟 Highlights
- Shipped [Feature A] (PR #123)
- Resolved [N] issues from the backlog.

## 🚧 In Progress
- [Feature B] (80% complete - pending QA)

## 🔥 Blockers
- **Waiting on API**: Third-party payment gateway keys not provided. (DRI: @PM)

## 📊 Metrics & Quality
- Release Version: v1.4.2
- Test Coverage: 84% (+1%)
- Open S1/S2 Bugs: 0
```

### Step 4 — Distribute & Highlight
If required by the user, summarize the top highlights and send them directly to the team channel using `skills/common/telegram-interactive-messages/SKILL.md`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Automation Failure | Fallback Action |
|----------|--------------------|-----------------|
| No Git History | `git log` fails or repo is shallow | Prompt user to summarize manually or assume zero raw code shipped. Add note: *Git data unavailable*. |
| Missing Tasks | `task.md` empty | Rebuild task history by reading recent PR titles. |
| Duplicate Files | `weekly-sync-42.md` already exists | Append a new section with a timestamp instead of overwriting the previous Friday's notes. |

---

## ✅ Done Criteria / Verification

Check the following before closing the workflow:

- [ ] Weekly sync file created with the standard naming convention (`weekly-sync-[YYYY-WW].md`).
- [ ] At least one highlight and one metric included.
- [ ] All listed blockers have an identified DRI (Directly Responsible Individual).
- [ ] The file is clean, readable, and uses Markdown formatting efficiently.
