---
description: Master workflow for Devs to orchestrate context ingestion, impact analysis, technical design, and TDD task planning before coding.
---

# 🏗️ Technical Implementation Planning

> **Use this workflow when**: A Developer needs to plan a technical task, feature, or bugfix before writing any code. Trigger: `/software-dev-plan-implementation` or `/plan-task`.
>
> **Out of scope**: Does not gather business requirements for new product features — use `/software-ba-gather-requirements`. Does not write the actual code — use `/software-team-orchestrate-agents` after plan is approved.
>
> **Activates skills**: `skills/common/questioning/SKILL.md`, `skills/common/impact-analysis/SKILL.md`, `skills/common/writing-plans/SKILL.md`

---

## Step 1 — Ingest Context & Requirements

**Persona**: Senior Developer / Technical Lead.

Determine the nature of the task:
- **If this is a major NEW Business Feature**: STOP. Ask the user if they have run `/software-ba-gather-requirements`. If not, recommend running it first to get the PRD/Specs.
- **If this is a Technical Task/Bugfix**: Proceed to read the provided issue ticket, user request, or related codebase files.

Load Questioning Skill:
```
view_file skills/common/questioning/SKILL.md
```

> **Rule**: If the requirements are ambiguous, underspecified, or lack technical clarity, you MUST use the `/question` format to ask multiple-choice clarifying questions before proceeding. Do not assume.

---

## Step 2 — Technical Impact Analysis

Before designing the solution, evaluate the blast radius of the proposed changes.

Load Impact Analysis Skill:
```
view_file skills/common/impact-analysis/SKILL.md
```

Perform the 5-Dimension scan:
1. API & Contract Impact (Breaking changes)
2. Database & State Impact (Migrations, locking)
3. Security & Privacy Impact (AuthZ, exposure)
4. Performance & Scalability (N+1, latency)
5. Dependencies & Operations (Env vars, conflicts)

Generate the **Technical Impact Analysis Report**. 
> **Checkpoint**: If any [Blocker] is found, halt and resolve with the user.

---

## Step 3 — Technical Architecture & Design

Define the "How" for the implementation:
- **Components**: Which modules, services, or UI components need to be created or modified?
- **Data Models**: What schema changes or DTOs are required?
- **API Contracts**: Define exact request/response payloads if creating new endpoints.

*(Optional)* If the change involves system-wide architecture, load system design standards:
```
view_file skills/common/system-design/SKILL.md
```

---

## Step 4 — Generate Implementation Plan

Convert the Technical Design into an actionable, bite-sized plan.

Load Writing Plans Skill:
```
view_file skills/common/writing-plans/SKILL.md
```

Generate `docs/implementation_plan.md` (or update existing) ensuring:
- **Zero Placeholders**: Explicit file paths, specific function names, no "TODOs".
- **TDD Bite-Sized Steps**: Each task must follow the "Write failing test → Implement → Pass → Commit" loop.
- **Verification**: Exact commands for automated tests and manual UI/UX checks.

---

## Step 5 — Plan Hardening & Approval

Apply the Review Plan workflow to audit the generated plan:

```
view_file workflows/review-plan.md
```

*(Run the 12-point checklist from the review plan workflow against your generated `implementation_plan.md` to self-correct any gaps).*

---

## ⏸️ Checkpoint: Await Plan Approval

```
"Implementation plan generated and self-audited: docs/implementation_plan.md

Review the Impact Analysis and the Plan above. 
Proceed to initialize task.md and begin coding? (Y / N — revise first)"
```

---

## Done Criteria

- [ ] Context ingested and ambiguities resolved.
- [ ] Technical Impact Analysis Report generated without active Blockers.
- [ ] `docs/implementation_plan.md` created with TDD bite-sized tasks.
- [ ] Plan approved by user.
