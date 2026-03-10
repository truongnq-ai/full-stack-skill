---
description: PM daily standup, project tracking, sprint review, and blocker management workflow. Generates structured reports from git history, task files, and team context.
---

# 📋 PM Daily Standup & Project Tracking Workflow

> **Use this workflow when**: PM needs daily standup report, project status update, sprint review, or blocker triage. Trigger phrases: "daily standup", "what did we do yesterday", "project status", "what's blocked", "sprint summary", `/pm-standup`.
>
> **Out of scope**: Does not implement features — use `plan-feature` or `orchestrate` for that. Does not write PRDs — use `plan-feature` workflow.

---

## 🌅 Mode Selection

Choose report type at startup:

| Mode | Trigger | Go to |
|------|---------|-------|
| **Daily Standup** | Morning check-in, day planning | Phase 1 |
| **End-of-Day Report** | EOD summary for stakeholders | Phase 2 |
| **Sprint Review** | Weekly/bi-weekly retrospective | Phase 3 |
| **Blocker Triage** | Stuck on something, need help | Phase 4 |
| **Project Health Check** | Overall project status snapshot | Phase 5 |

---

## Phase 1 — Daily Standup (Morning)

### Step 1.1 — Scan Yesterday's Work

```bash
# Git activity since yesterday
git log --since="yesterday" --until="now" --oneline --all --author="$(git config user.name)"

# Files changed
git diff --stat "HEAD@{yesterday}"

# PRs merged (if using GitHub)
gh pr list --state merged --limit 10 2>/dev/null | head -10
```

> **Fallback**: If git history is empty (no commits yesterday), check `task.md` for items marked `[x]` most recently.

### Step 1.2 — Check `task.md` Status

```bash
# Read current task tracker
cat task.md 2>/dev/null || find . -name "task.md" | head -3
```

Analyze:
- Items marked `[x]` since yesterday → **Done**
- Items marked `[/]` → **In Progress**
- Items marked `[ ]` at top of priority → **Today's Focus**
- Items with no progress for >2 days → **Potential Blockers**

### Step 1.3 — Check Open Issues & PRs

```bash
# GitHub (if configured)
gh issue list --state open --assignee @me --limit 10 2>/dev/null
gh pr list --state open --assignee @me 2>/dev/null
```

> **Fallback**: If GitHub CLI not configured, ask user for active ticket/issue numbers to look up.

### Step 1.4 — Generate Standup Report

Save to `docs/standup/standup-[YYYY-MM-DD].md`:

```
## Daily Standup — [Date] [Time]

### ✅ Yesterday (Done)
- [Item from git log / task.md]
- [Item from git log / task.md]

### 🔄 Today (Plan)
- [ ] [Next priority from task.md]
- [ ] [Next priority from task.md]
- [ ] [Next priority from task.md]

### 🔴 Blockers
- [Blocker description] — blocked since [date] — needs: [what's needed to unblock]
  (None if no blockers)

### 📊 Metrics (optional)
- PRs merged: N
- Issues closed: N
- Commits: N
```

---

## Phase 2 — End-of-Day Report

### Step 2.1 — Summarize Day's Work

```bash
git log --since="6am" --oneline --author="$(git config user.name)"
git diff --stat "HEAD@{8 hours ago}" 2>/dev/null
```

### Step 2.2 — Update task.md

- Mark all completed items as `[x]`
- Unmark `[/]` items that weren't finished → revert to `[ ]` or keep `[/]`
- Add newly discovered tasks identified during the day
- Reprioritize top 3 items for tomorrow

### Step 2.3 — Identify What Slipped

Compare morning plan (`standup-[today].md`) vs actual:
- What was planned but NOT done? → Document as carryover
- Why did it slip? → Time estimate off / unexpected bug / dependency blocked

### Step 2.4 — Generate EOD Report

```
## EOD Report — [Date]

### Completed Today
- [x] [Item] — [commit SHA if applicable]
- [x] [Item]

### Carried Over to Tomorrow
- [ ] [Item] — slipped because: [reason]

### Discoveries / New Tasks Added
- [ ] [Unexpected task that came up]

### Time Estimate Accuracy
Planned: [N] items | Done: [N] items | Accuracy: [%]
```

---

## Phase 3 — Sprint Review (Weekly)

### Step 3.1 — Aggregate Weekly Activity

```bash
# Full week's commits
git log --since="7 days ago" --oneline --all --author="$(git config user.name)"

# Week's stats
git diff --stat "HEAD@{7 days}"
```

### Step 3.2 — Review All Standups

```bash
ls docs/standup/ | tail -7
# Read each standup file from this week
```

### Step 3.3 — Sprint Health Assessment

Assess across 5 dimensions:

| Dimension | Score (1-5) | Evidence |
|-----------|------------|---------|
| **Velocity** | | Planned vs completed items ratio |
| **Quality** | | Bugs introduced vs bugs fixed |
| **Focus** | | % of work aligned to sprint goals |
| **Blocker resolution** | | Average days to unblock |
| **Technical debt** | | New `TODO`s added vs resolved |

```bash
# Count tech debt signals
grep -rn "TODO\|FIXME\|HACK\|XXX" src/ | wc -l
```

### Step 3.4 — Sprint Review Report

Save to `docs/sprint-review/sprint-[YYYY-WNN].md`:

```
## Sprint Review — Week [N] — [Date Range]

### 📊 Velocity
- Committed: [N] items
- Delivered: [N] items ([%] completion rate)
- Carryover: [N] items

### 🏆 Key Achievements
1. [Major feature/fix shipped]
2. [Major feature/fix shipped]

### 🔴 What Slipped & Why
1. [Item] — Reason: [estimation error / dependency / scope creep]

### 🚨 Recurring Blockers
- [Pattern]: occurred [N] times this week

### 📈 Next Week Focus (Top 3)
1. [ ] [Priority 1]
2. [ ] [Priority 2]
3. [ ] [Priority 3]

### 💡 Process Improvement
[One concrete change to make next sprint better]
```

---

## Phase 4 — Blocker Triage

When something is blocked, run structured triage:

### Step 4.1 — Classify Blocker

| Blocker Type | Owner | Resolution Path |
|-------------|-------|----------------|
| **Technical** (can't solve bug) | Agent | Run `debug` workflow |
| **Dependency** (waiting for teammate) | Team | Escalate to stakeholder |
| **Decision** (need product clarity) | PM/Stakeholder | Schedule sync, document question |
| **External** (3rd-party downtime, API issue) | External | Add to risk log, find workaround |
| **Resource** (missing access, tool) | Ops | File request, track ETA |

### Step 4.2 — Blocker Resolution Card

For each blocker, generate:

```
## Blocker Card — [Date]

**Blocked item**: [task or feature name]
**Blocked since**: [date]
**Blocker type**: [Technical / Dependency / Decision / External / Resource]
**Impact**: [What cannot proceed until this is resolved]
**Owner**: [Who needs to act]
**Expected resolution**: [Date or condition]
**Workaround**: [Is there a partial path forward? Y/N]
**Escalation**: [Does PM/stakeholder need to be notified? Y/N]
```

---

## Phase 5 — Project Health Check

Full project status snapshot. Run when: kick-off, milestone check, or monthly review.

### Step 5.1 — Collect Signals

```bash
# Open issues
gh issue list --state open | wc -l

# Tech debt
grep -rn "TODO\|FIXME" src/ | wc -l

# Test coverage signal
pnpm test --coverage 2>/dev/null | grep "All files"

# Recent activity
git log --since="30 days" --oneline | wc -l
```

### Step 5.2 — Health Dashboard

```
## Project Health — [Project Name] — [Date]

### 🚦 Status: [🟢 On Track / 🟡 At Risk / 🔴 Off Track]

| Dimension | Status | Signal |
|-----------|--------|--------|
| Delivery pace | 🟢/🟡/🔴 | [N] commits/week |
| Technical debt | 🟢/🟡/🔴 | [N] TODO/FIXME |
| Test coverage | 🟢/🟡/🔴 | [%] |
| Open blockers | 🟢/🟡/🔴 | [N] |
| Open issues | 🟢/🟡/🔴 | [N] |

### 🎯 Milestone Progress
- [ ] [Milestone 1] — [progress %]
- [x] [Milestone 2] — ✅ Done [date]

### ⚠️ Risk Register
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| [Risk 1] | H/M/L | H/M/L | [Plan] |

### 💬 Recommendation
[PM's one-paragraph assessment and next key action]
```

---

> [!TIP]
> **PM best practice**: Run Phase 1 at task start of each day, Phase 2 before logging off, Phase 3 on Fridays. Keep all reports in `docs/standup/` and `docs/sprint-review/` for historical reference and stakeholder sharing.
