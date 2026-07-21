---
name: po-manage-backlog
description: Product Owner manages the product backlog — triages new items, refines stories, ensures INVEST compliance, and maintains a healthy, prioritized backlog ready for sprint planning.
category: roles
metadata:
  labels: [po, backlog, refinement, prioritization, grooming, agile]
  triggers:
    priority: high
    confidence: 0.85
    keywords: [manage backlog, groom backlog, refine stories, backlog refinement, triage items, prioritize backlog]
    file_patterns: ["backlog.md", "task.md", "sprint-plan.md"]
    context: ["user asks to clean up backlog", "user asks to refine or triage backlog items"]
    negative: ["user asks to write code", "user asks to write a PRD from scratch"]
---

# 📋 Product Owner — Manage Backlog

> **Use this skill when**: PO needs to triage incoming items, refine existing stories, re-prioritize the backlog, or ensure all items meet the Definition of Ready before sprint planning.
>
> **Out of scope**: Initial PRD creation (use `po/feature-discovery` or `po/prd-generation`). Sprint planning execution (use `po/backlog-management` Mode 2). Writing code or tests.

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

### Step 1 — Inventory Current Backlog
- Read `backlog.md` or `task.md` to load all existing items.
- Count total items, items per priority (P0/P1/P2), and items without acceptance criteria.

```bash
# Quick health check
grep -c "P0\|P1\|P2" backlog.md
grep -c "\[ \]" backlog.md
```

### Step 2 — Triage New Items
For each new/unprocessed item:
1. **Classify**: Assign priority (P0 = Must-have, P1 = Should-have, P2 = Nice-to-have).
2. **Size**: Estimate effort (S/M/L/XL) based on complexity and unknowns.
3. **Dependency Check**: Link to upstream/downstream dependencies.

> **⏸️ Checkpoint**:
> "I have triaged [N] new items. Here is the proposed prioritization. Shall I apply? (Y/N)"

### Step 3 — Refine Existing Stories
For each item already in the backlog:
1. **INVEST Check**: Is the story Independent, Negotiable, Valuable, Estimable, Small, Testable?
2. **Acceptance Criteria**: Ensure each story has ≥2 clear, testable acceptance criteria.
3. **Split Large Stories**: Any item estimated as XL must be split into ≤ L-sized sub-stories.

### Step 4 — Re-prioritize & Order
- Sort the backlog: P0 → P1 → P2, then by business value within each tier.
- Identify and flag any stale items (no update in >2 sprints) for archival review.

### Step 5 — Output Updated Backlog
Update `backlog.md` with a structured table:

| ID | Story | Priority | Size | Dependencies | Status |
|----|-------|----------|------|--------------|--------|
| US-101 | User login flow | P0 | M | None | Ready |
| US-102 | Profile settings | P1 | S | US-101 | Draft |

---

## 🚫 Anti-Patterns
- **Zombie Backlog**: Keeping hundreds of items that nobody will ever work on. Archive items untouched for >3 sprints.
- **Missing Acceptance Criteria**: Pushing items to "Ready" without testable criteria — blocks QA and Dev.
- **Priority Inflation**: Labeling everything P0. If everything is critical, nothing is critical.
- **Silent Re-prioritization**: Changing priorities without communicating the rationale to the team.
- **Scope Creep via Backlog**: Adding P2 items mid-sprint disguised as "small fixes".

---

## 🛠️ Tools
- Jira, Linear, Azure DevOps (backlog management)
- Notion, Confluence (documentation)
- `view_file`, `write_to_file` (for file-based backlogs)
- Mermaid (for dependency visualization)

---

## ⚠️ Error Handling

| Issue | Cause | Fallback Action |
|-------|-------|-----------------|
| No backlog file found | First-time setup | Create `backlog.md` from PRD requirements pool |
| Duplicate items | Copy-paste or merge conflicts | Deduplicate by story title and ID |
| Missing priority | Items imported without classification | Default to P2, flag for PO review |
| Circular dependency | Story A depends on B which depends on A | Flag as blocker, escalate to architect |

---

## ✅ Verification
- [ ] All backlog items have a priority (P0/P1/P2).
- [ ] All items marked "Ready" have ≥2 acceptance criteria.
- [ ] No XL-sized items remain unsplit.
- [ ] Stale items (>2 sprints untouched) are flagged or archived.
- [ ] Dependencies are explicitly documented.
- [ ] Updated backlog file is saved and committed.

---

## 📚 References
- [INVEST Principle for User Stories](https://www.agilealliance.org/glossary/invest/)
- [Scrum Guide — Product Backlog](https://scrumguides.org/scrum-guide.html#product-backlog)
- [Mike Cohn — User Stories Applied](https://www.mountaingoatsoftware.com/books/user-stories-applied)
