---
description: DEV executes the technical implementation plan, writes code, and performs unit testing.
---

# 💻 DEV Execute Coding

> **Use this workflow when**: The technical implementation plan is approved and DEV is ready to start coding. Trigger: `/software-dev-execute-coding`.
>
> **Out of scope**: Does not plan the architecture — use `/software-dev-technical-planning`. Does not deploy — use `/software-devops-deploy-release`.
>
> **Activates skills**: `skills/roles/dev/implementation-coding/SKILL.md`, `skills/roles/dev/unit-testing/SKILL.md`, and any framework-specific skill (e.g., React, Python).

---

## Step 1 — Load Plan and Tech Stack

1. Read the approved implementation plan:
```bash
view_file docs/implementation_plan.md
```
2. Identify the technology stack (e.g., React, Node, Python, Java) from the plan or repository setup.
3. Load the corresponding language/framework skills (e.g., `skills/react/component-patterns/SKILL.md`).

---

## Step 2 — Initialize Task List

Convert the implementation plan into granular, executable steps in `task.md`.

- Mark the first task as `[/]` (In Progress).
- Work through the tasks one by one.

---

## Step 3 — Coding Execution

For each component/file:
1. Implement the logic according to the specifications and the loaded skill standards.
2. Adhere to project naming conventions and style guides.
3. Keep code modular, dry, and clean.

> **Rule**: If a technical hurdle requires deviating from the implementation plan, STOP and discuss with the user/PO before proceeding.

---

## Step 4 — Unit Testing

Apply `skills/roles/dev/unit-testing/SKILL.md`:
1. Write unit tests covering the newly added or modified logic.
2. Ensure edge cases identified in the PRD/Requirements are tested.
3. Run the tests.
```bash
## Example
npm run test
## OR
pytest
```

---

## Done Criteria

- [ ] All code changes in `docs/implementation_plan.md` are completed
- [ ] Code compiles/builds successfully
- [ ] Unit tests are written and pass
- [ ] `task.md` is updated with all items marked as `[x]`
