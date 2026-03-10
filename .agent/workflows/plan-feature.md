---
description: Interactive workflow to plan a new feature from scratch, from Interview to Task List.
---

# 🗺️ Feature Planning Workflow

> **Use this workflow when**: user has a new feature idea and needs structured planning before coding. Trigger phrases: "plan this feature", "let's design X", "I want to build Y", `/plan-feature`.
>
> **Out of scope**: Does not implement code — use `code-review` or `orchestrate` after planning is complete. Does not generate PRDs for existing features already in progress.

---

## Step 1 — Requirement Gathering (Interview)

**Persona**: PM / Business Analyst.

Load and apply `skills/common/product-requirements/SKILL.md`:

```
view_file skills/common/product-requirements/SKILL.md
```

> **Fallback**: If skill file missing, conduct interview manually covering: (1) Problem being solved, (2) Target users, (3) Core user stories, (4) Acceptance criteria, (5) Non-functional requirements (perf, security, scale).

Start **Discovery Phase**: ask clarifying questions until all ambiguity is resolved. Do not proceed while any acceptance criterion is unclear.

> **Rule**: A minimum of 5 clarifying questions must be asked and answered before generating the PRD.

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

Generate the PRD using the template:

```
view_file skills/common/product-requirements/references/prd-template.md
```

Save to `docs/specs/prd-[feature_name].md`.

Validate against checklist:

```
view_file skills/common/product-requirements/references/checklist.md
```

> **Fallback**: If template or checklist missing, generate PRD with these mandatory sections: Overview, User Stories, Acceptance Criteria, Out of Scope, Success Metrics.

---

## Step 3 — Implementation Planning

Convert "What" (PRD) → "How" (Technical Plan).

Create `docs/implementation_plan.md` with:

- **Technical components**: list each module/service to create or modify
- **File changes**: exact file paths to create, modify, or delete
- **Dependency order**: which component must be built first
- **Verification Plan**:
  - Automated: unit tests, E2E tests, commands to run
  - Manual: UI flows, edge cases to check by hand

> **Fallback**: If PRD is missing when this step runs, return to Step 1 immediately.

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

Initialize `task.md` from the approved implementation plan:

- Create granular checklist items (`- [ ]` format)
- First tasks must be setup/structural changes (no logic before scaffolding)
- Group by component with clear section headers
- Mark first actionable item as `[/]` (in progress)

**Done criteria** — workflow is complete when:

- [ ] `docs/specs/prd-[feature_name].md` exists and validated
- [ ] `docs/implementation_plan.md` exists and approved by user
- [ ] `task.md` initialized with all checklist items
- [ ] First task marked as in progress
