---
name: po-review-progress
description: Product Owner reviews sprint/project progress — compares planned vs. actual delivery, identifies risks and deviations, and generates stakeholder-ready progress reports.
category: roles
metadata:
  labels: [po, progress, review, sprint-review, burndown, stakeholder-report]
  triggers:
    priority: high
    confidence: 0.85
    keywords: [review progress, sprint review, progress report, burndown, velocity, delivery status]
    file_patterns: ["task.md", "sprint-plan.md", "progress-report.md"]
    context: ["user asks to review sprint progress", "user asks for a status report"]
    negative: ["user asks to write code", "user asks to run tests"]
---

# 📈 Product Owner — Review Progress

> **Use this skill when**: PO needs to assess current sprint or project progress, compare planned vs. actual delivery, identify risks/deviations, and produce a stakeholder-ready progress report.
>
> **Out of scope**: Daily standup execution (use `po/status-sync`). Backlog grooming (use `po/manage-backlog`). Technical debugging (use Dev skills).

---

## **Priority: P0 (CRITICAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

---

## 🔄 Workflow

### Step 1 — Gather Delivery Data
Collect all relevant data sources:
- **Task Tracker**: Parse `task.md` or `sprint-plan.md` for `[x]`, `[/]`, `[ ]` statuses.
- **Git History**: `git log --since="<sprint_start>" --oneline --stat` for actual commits.
- **CI/CD**: Check build/deploy success rates during the sprint.

```bash
# Count completed vs. total tasks
echo "Done: $(grep -c '\[x\]' task.md)"
echo "In Progress: $(grep -c '\[/\]' task.md)"
echo "Pending: $(grep -c '\[ \]' task.md)"
```

### Step 2 — Calculate Key Metrics

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **Completion Rate** | Done / Total × 100 | Target: ≥80% |
| **Scope Change** | (Current Total - Original Total) / Original × 100 | Target: <10% |
| **Blocker Count** | Count of items tagged `[BLOCKED]` | Target: 0 |
| **Carry-Over Rate** | Items carried from previous sprint / Total | Target: <15% |

### Step 3 — Risk & Deviation Analysis
For each incomplete or blocked item:
1. **Root Cause**: Why is it behind? (Underestimated? Blocked? Scope creep?)
2. **Impact**: What downstream features or deadlines are affected?
3. **Mitigation**: What can be done to recover? (Descope? Add resources? Extend?)

> **⏸️ Checkpoint**:
> "I have analyzed the sprint progress. Here are the key findings. Shall I generate the full report? (Y/N)"

### Step 4 — Generate Progress Report
Write to `docs/reports/progress-report-YYYY-MM-DD.md`:

```markdown
# 📈 Sprint Progress Report — Sprint [N]

## Summary
- Sprint Goal: [Goal from sprint plan]
- Period: [Start] — [End]
- Completion Rate: [X]%

## Delivery Status
| Story | Priority | Status | Notes |
|-------|----------|--------|-------|
| US-101 | P0 | ✅ Done | Merged PR #42 |
| US-102 | P0 | 🟡 In Progress | 80% complete, ETA tomorrow |
| US-103 | P1 | 🔴 Blocked | Waiting on API from Team B |

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| US-103 blocked | Delays US-105 | Escalated to Team B lead |

## Recommendations
- [Action item 1]
- [Action item 2]
```

### Step 5 — Stakeholder Communication
Tailor the report for the audience:
- **Engineering**: Include technical details, blockers, and carry-over items.
- **Business/Leadership**: Focus on goal completion %, risks to timelines, and business impact.

---

## 🚫 Anti-Patterns
- **Happy Path Reporting**: Only reporting what went well while hiding blockers and delays. Stakeholders need the full picture.
- **Data-Free Opinions**: Saying "the sprint went well" without backing it up with completion rates, velocity, or concrete metrics.
- **Blame Culture**: Using progress reviews to assign blame instead of identifying systemic issues and actionable improvements.
- **Ignoring Trends**: Looking at one sprint in isolation instead of tracking velocity and completion trends over multiple sprints.
- **Report & Forget**: Generating reports that nobody reads. Ensure reports lead to concrete action items.

---

## 🛠️ Tools
- Jira, Linear (sprint boards and velocity charts)
- Notion, Confluence (report storage)
- Mermaid (burndown chart visualization)
- `view_file`, `write_to_file` (for file-based tracking)
- `git log` (for delivery verification)

---

## ⚠️ Error Handling

| Issue | Cause | Fallback Action |
|-------|-------|-----------------|
| No task file found | Sprint plan not documented | Reconstruct from git history and team communication |
| Inconsistent status markers | Mixed `[x]`/`[X]`/`Done` formats | Normalize to standard `[x]`, `[/]`, `[ ]` before parsing |
| Missing sprint goal | Sprint started without a defined goal | Flag as process improvement item; infer goal from P0 stories |

---

## ✅ Verification
- [ ] Completion rate is calculated accurately from task data.
- [ ] All blocked items have root cause and mitigation documented.
- [ ] Scope change is quantified (original vs. current total).
- [ ] Report is written and saved as an artifact.
- [ ] At least one action item is generated from the analysis.
- [ ] Report is tailored to the target audience.

---

## 📚 References
- [Scrum Guide — Sprint Review](https://scrumguides.org/scrum-guide.html#sprint-review)
- [Atlassian — Sprint Burndown Chart](https://www.atlassian.com/agile/tutorials/burndown-charts)
- [Mountain Goat — Velocity](https://www.mountaingoatsoftware.com/blog/know-exactly-what-velocity-means-to-your-scrum-team)
