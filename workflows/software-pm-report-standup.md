---
description: PM generates daily standup, end-of-day, sprint review, blocker triage, or project health reports from git history and task files.
---

# 📋 PM Standup & Project Reporting

> **Use this workflow when**: PM needs daily standup, EOD report, sprint review, blocker triage, or project health check. Trigger: `/software-pm-report-standup`.
>
> **Out of scope**: Does not implement features — use `software-po-plan-feature`. Does not write PRDs — use `software-po-plan-feature`.
>
> **Activates skill**: `skills/roles/pm/product-manager/SKILL.md`, `skills/roles/pm/status-sync/SKILL.md`

---

## Step 1 — Select Report Mode

| Mode | Trigger | Go to |
|------|---------|-------|
| **Daily Standup** | Morning check-in | Step 2 |
| **End-of-Day Report** | EOD summary | Step 3 |
| **Sprint Review** | Weekly retrospective | Step 4 |
| **Blocker Triage** | Something is stuck | Step 5 |
| **Project Health** | Status snapshot | Step 6 |

---

## Step 2 — Daily Standup

```bash
git log --since="yesterday" --until="now" --oneline --all --author="$(git config user.name)"
git diff --stat "HEAD@{yesterday}"
```

Check `task.md`: `[x]` = Done, `[/]` = In Progress, `[ ]` = Today's Focus.

> **Fallback**: If git empty, check `task.md` for recently marked `[x]` items.

Save to `docs/standup/standup-[YYYY-MM-DD].md`:

```
## Daily Standup — [Date]
### ✅ Yesterday (Done)
### 🔄 Today (Plan)
### 🔴 Blockers
### 📊 Metrics
```

---

## Step 3 — End-of-Day Report

```bash
git log --since="6am" --oneline --author="$(git config user.name)"
```

Compare morning plan vs actual. Document carryover items with slip reason.

Save to `docs/standup/eod-[YYYY-MM-DD].md`:

```
## EOD Report — [Date]
### Completed Today
### Carried Over
### Time Estimate Accuracy: Planned [N] | Done [N] | [%]
```

---

## Step 4 — Sprint Review (Weekly)

```bash
git log --since="7 days ago" --oneline --all --author="$(git config user.name)"
grep -rn "TODO\|FIXME\|HACK" src/ | wc -l
```

Assess: Velocity, Quality, Focus, Blocker resolution, Tech debt.

Save to `docs/sprint-review/sprint-[YYYY-WNN].md`.

---

## Step 5 — Blocker Triage

Classify: Technical → `software-dev-fix-bug` | Dependency → escalate | Decision → schedule sync | External → risk log | Resource → file request.

Generate Blocker Card with: item, since, type, impact, owner, ETA, workaround, escalation flag.

---

## Step 6 — Project Health Check

```bash
gh issue list --state open 2>/dev/null | wc -l
grep -rn "TODO\|FIXME" src/ | wc -l
git log --since="30 days" --oneline | wc -l
```

Generate health dashboard: 🟢/🟡/🔴 per dimension (delivery, debt, coverage, blockers, issues).

---

## Done Criteria

- [ ] Report saved to `docs/standup/` or `docs/sprint-review/`
- [ ] `task.md` updated if applicable
- [ ] Blockers documented with resolution path
