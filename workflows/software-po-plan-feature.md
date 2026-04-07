---
description: PO/PM plans a new feature from discovery interview through PRD generation to implementation planning and task initialization.
---

# 🗺️ Feature Planning — Product Owner

> **Use this workflow when**: PO/PM has a new feature idea and needs structured planning before development. Trigger: `/software-po-plan-feature`.
>
> **Out of scope**: Does not implement code — use `software-dev-review-code` or `software-team-orchestrate-agents` after planning. Does not gather detailed requirements — use `software-ba-gather-requirements` for deep BA analysis.
>
> **Activates skills**: `skills/roles/pm/product-manager/SKILL.md`, `skills/roles/pm/product-requirements/SKILL.md`

---

## Step 1 — Discovery Interview

**Persona**: Product Owner.

Load skill:

```
view_file skills/roles/pm/product-manager/SKILL.md
```

Ask clarifying questions covering:

1. Problem being solved
2. Target users and personas
3. Core user stories (minimum 3)
4. Acceptance criteria per story
5. Non-functional requirements (performance, security, scale)

> **Rule**: Minimum 5 clarifying questions must be asked and answered before proceeding.
> **Fallback**: If skill file missing, conduct interview manually using the 5 areas above.

---

## ⏸️ Checkpoint: Confirm Requirements

```
"Requirements gathered:
- Problem: [summary]
- Users: [summary]
- Core stories: [N] stories
- Acceptance criteria: [N] items

Proceed to PRD generation? (Y / N — revise first)"
```

---

## Step 2 — PRD Generation

Generate PRD using template:

```
view_file skills/roles/pm/product-manager/references/prd-template.md
```

Save to `docs/specs/prd-[feature_name].md`.

Validate against prioritization checklist:

```
view_file skills/roles/pm/product-manager/references/prioritization.md
```

**Mandatory PRD sections**: Overview, User Stories, Acceptance Criteria, Out of Scope, Success Metrics.

> **Fallback**: If template missing, generate PRD with the 5 mandatory sections above.

---

## Step 3 — Implementation Planning

Convert PRD ("What") → Technical Plan ("How").

Load skill for bite-sized task format:

```
view_file skills/common/writing-plans/SKILL.md
```

Create `docs/implementation_plan.md` with:

- **Technical components**: modules/services to create or modify
- **File changes**: exact paths to create, modify, or delete
- **Dependency order**: build sequence
- **Bite-Sized TDD Tasks**: Each task = Write failing test → Run to fail → Implement → Pass → Commit (use `writing-plans` format)
- **Verification Plan**:
  - Automated: unit tests, E2E tests, exact commands with expected output
  - Manual: UI flows, edge cases

> **No Placeholders**: Every task must have exact file paths, commands, and code. No TBD, TODO, or "add appropriate handling".
> **Fallback**: If PRD missing, return to Step 1 immediately.

---

## ⏸️ Checkpoint: Approve Plan

```
"Implementation plan ready: docs/implementation_plan.md

Approve to proceed?
- Y → Initialize task.md and begin execution
- N → Revise plan first"
```

---

## Step 4 — Task Initialization

Initialize `task.md` from approved plan:

- Create granular checklist items (`- [ ]` format)
- Group by component with clear section headers
- First tasks = setup/structural changes (scaffolding before logic)
- Mark first actionable item as `[/]` (in progress)

---

## Done Criteria

- [ ] `docs/specs/prd-[feature_name].md` exists and validated
- [ ] `docs/implementation_plan.md` exists and approved
- [ ] `task.md` initialized with all checklist items
- [ ] First task marked as in progress
