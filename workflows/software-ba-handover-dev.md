---
description: BA creates a structured handover package for developers containing requirements, acceptance criteria, technical context, and test scenarios.
---

# 📦 BA Handover to Dev

> **Use this workflow when**: BA has completed requirements analysis and needs to formally hand over to the development team. Trigger: `/software-ba-handover-dev`.
>
> **Out of scope**: Does not gather requirements — use `software-ba-gather-requirements`. Does not create implementation plan — dev team does that via `software-po-plan-feature` Step 3.
>
> **Activates skill**: `skills/roles/ba/handover-to-dev/SKILL.md`

---

## Step 1 — Load Handover Skill

```
view_file skills/roles/ba/handover-to-dev/SKILL.md
view_file skills/roles/ba/handover-to-dev/references/examples.md
```

> **Fallback**: If skill missing, prepare handover manually covering: requirements doc, acceptance criteria, test scenarios, open questions, constraints.

---

## Step 2 — Verify Prerequisites

Check that all required artifacts exist:

```bash
ls docs/specs/requirements-*.md docs/specs/stories-*.md docs/specs/prd-*.md 2>/dev/null
```

| Required | File | Status |
|----------|------|--------|
| Requirements doc | `docs/specs/requirements-[feature].md` | ✅/❌ |
| User stories | `docs/specs/stories-[feature].md` | ✅/❌ |
| PRD | `docs/specs/prd-[feature].md` | ✅/❌ |

> **Fallback**: If any prerequisite missing, identify which and ask: "Run `software-ba-gather-requirements` or `software-ba-split-stories` first?"

---

## ⏸️ Checkpoint: Confirm Completeness

```
"Handover prerequisites:
- Requirements: [✅/❌]
- Stories: [✅/❌]
- PRD: [✅/❌]
- Open questions: [N] (must be 0)

Ready to generate handover package? (Y / N — complete prerequisites first)"
```

---

## Step 3 — Generate Handover Package

Compile all artifacts into a single handover document. Save to `docs/handover/handover-[feature_name].md`:

```
## Dev Handover — [Feature Name] — [Date]

### 1. Feature Summary
[2-3 sentence overview linking to PRD]

### 2. User Stories (Prioritized)
[Link to stories doc + summary table: ID, Title, Priority, Dependencies]

### 3. Acceptance Criteria (Complete)
[All AC extracted from stories, numbered sequentially]

### 4. Technical Context
- Affected modules: [list]
- Existing APIs to reuse: [list or none]
- Database changes required: [yes/no + summary]
- 3rd-party integrations: [list or none]

### 5. Test Scenarios for Dev
[Happy path + top 5 edge cases — dev should verify before handing to QA]

### 6. Constraints & Business Rules
[Rules that are non-obvious and must be enforced in code]

### 7. Out of Scope (Explicitly)
[What NOT to build in this iteration]

### 8. Open Risks
[Known risks with mitigation suggestions]
```

---

## Step 4 — Handover Review

Review the handover package against checklist:

- [ ] Every story has at least 1 acceptance criterion
- [ ] Technical context identifies affected modules
- [ ] Test scenarios cover happy path + ≥3 edge cases
- [ ] Out of scope section is explicit (not empty)
- [ ] No open questions remain (all resolved or escalated)

---

## Step 5 — Notify Dev Team

Present handover summary:

```
"📦 Handover package ready: docs/handover/handover-[feature].md

Next step: Dev team runs `/software-po-plan-feature` Step 3 to create implementation plan.

Recommended first story to implement: [Story ID] — [Title] (no dependencies, highest value)"
```

---

## Done Criteria

- [ ] `docs/handover/handover-[feature_name].md` saved
- [ ] All acceptance criteria included
- [ ] Test scenarios provided (≥5)
- [ ] Out of scope documented
- [ ] Dev team notified with recommended starting point
