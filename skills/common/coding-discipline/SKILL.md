---
name: Coding Discipline FSM
description: Disciplined coding FSM — analyze first, execute second. 7-step workflow with mandatory checkpoints.
metadata:
  labels: [workflow, discipline, process]
  triggers:
    keywords: [plan, scope, clarify, coding discipline, workflow]
    task_types: [implementation, refactor, debugging]
workflow_ref: update-docs
---

# Coding Discipline — 7-Step FSM

## **Priority: P1 (OPERATIONAL)**

## Context

Every coding task must follow a disciplined workflow. Never skip analysis or execute without scope confirmation.

## Mandatory FSM

```
[1. Read & understand requirement]
        ↓
[2. Survey codebase — NEVER guess]
        ↓
[3. Identify change scope]
        ↓
[4. Ambiguity detected?] ──YES──→ [STOP — Clarification]
        │ NO                                    ↓
        ↓                            [Wait for user decision]
[5. Declare plan + file list → User confirms]
        ↓
[6. Execute file by file per plan]
        ↓
[7. Report results]
```

> Steps 4 and 5 are **mandatory checkpoints** — cannot be skipped even in Auto-Accept mode.

## Step Details

**Step 1 — Read & Understand**: Summarize the requirement in your own words before doing anything. If vague terms found ("improve", "refactor", "optimize") → stop and ask.

**Step 2 — Survey Codebase**: Use `view_file`, `view_file_outline`, `grep_search`, `find_by_name`. Never guess structure. **Read at least 3 related files** before deciding what to change.

**Step 3 — Identify Scope**: List all files to modify/create. If scope > 5 files or uncertain → ask clarification first.

**Step 4 — Ambiguity Checkpoint**: See `common/clarification` skill. Auto-Accept does NOT exempt this step.

**Step 5 — Declare Plan**: Simple tasks (≤2 files, ≤20 lines, no side effects) → execute directly. Complex tasks → declare plan, wait for confirmation.

**Step 6 — Execute**: Only modify declared files. Prefer `replace_file_content` over full overwrite. Mid-execution discovery of additional files needed → **STOP, declare, wait**.

**Step 7 — Report**: Summarize changes. Flag anything needing manual verification.

## Prohibitions

- ❌ Modify undeclared files even if "clearly needed"
- ❌ Self-choose approach when ≥2 valid options exist
- ❌ Auto-create documentation files not requested
- ❌ Rename/delete/move files not in the plan
- ❌ Run side-effect commands (DB migrate, deploy, restart) without confirmation


## References

- [Examples (Input/Output)](references/examples.md)
