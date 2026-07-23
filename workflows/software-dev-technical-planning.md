---
description: DEV technical planning - analyzing requirements, reviewing source code, and creating an implementation plan.
---

# 🏗️ DEV Technical Planning

> **Use this workflow when**: BA has completed the requirements and UML, and DEV needs to create a technical implementation plan before coding. Trigger: `/software-dev-technical-planning`.
>
> **Out of scope**: Does not execute code — use `software-dev-execute-coding`.
>
> **Activates skills**: `skills/roles/dev/error-handling-architecture/SKILL.md` `skills/roles/dev/handover-to-qa/SKILL.md`, `skills/roles/dev/architecture-decision-records/SKILL.md`

---

## Step 1 — Requirement Handover

Review the documents created by the BA:

```bash
view_file docs/specs/requirements-[feature_name].md
```

Extract the key constraints, acceptance criteria, and sequence diagrams.

---

## Step 2 — Source Code Analysis & Convention Check

Explore the current repository to align the new feature with existing architecture:

1. Identify where this feature will be integrated.
2. Review surrounding code for design patterns, naming conventions, and file structure rules.
3. Determine if any new dependencies are required.

> **Rule**: Any newly introduced library or pattern must be documented and justified against the current architecture.

---

## Step 3 — Technical Design

Create a technical solution covering:
- **Architecture**: How components connect (Frontend, Backend, Database).
- **Data Models**: Any DB schema changes or API request/response structures.
- **File Impact**: Precise paths for [NEW], [MODIFY], [DELETE].
- **Testing Strategy**: How this will be unit tested.

---

## Step 4 — Generate Implementation Plan

Save to `docs/implementation_plan.md`:

```markdown
## Technical Implementation Plan — [Feature Name]

### 1. Architecture & Design Decisions
### 2. Database/API Changes
### 3. File Modifications
#### [MODIFY] path/to/file.ext
#### [NEW] path/to/new_file.ext
### 4. Unit Testing Strategy
### 5. Open Questions for BA/PO
```

---

## Done Criteria

- [ ] `docs/implementation_plan.md` created
- [ ] File modifications are granular and precise
- [ ] No ambiguities remain that would block execution

> **⏸️ Checkpoint**: Xin phép user trước khi hoàn tất.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/roles/dev/architecture-decision-records/SKILL.md`
