---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
triggers: plan, implement, spec, steps, multi-step
priority: P1
---

# Writing Plans

> **Goal**: Write comprehensive, bite-sized implementation plans assuming the executing engineer has zero context for the codebase and questionable taste.

## Process Flow

1. **Scope Check**: Check if the spec covers multiple independent subsystems; if so, break them into separate plans producing testable software.
2. **File Structure Analysis**: Map out which files will be created/modified to lock in decomposition decisions. Prefer smaller, focused files.
3. **Plan Header**: Every plan MUST start with a standardized header indicating goals, architecture, and tech stack.
4. **Bite-Sized Tasks**: Break tasks into 2-5 minute granular steps (Write failing test -> Run to fail -> Minimal implementation -> Run to pass -> Commit). See `references/task-structure.md` for the format.
5. **Plan Review Loop**: Dispatch a `plan-document-reviewer` subagent (`references/plan-document-reviewer-prompt.md`) to verify the plan before execution. Fix issues and re-dispatch if needed.
6. **Execution Handoff**: Provide the user with the choice of **Subagent-Driven** (recommended) or **Inline Execution**.

*(Save plans to `docs/plans/YYYY-MM-DD-<feature-name>.md` using `write_to_file`)*

## Anti-Patterns

- **No vague tasks**: Do write exact commands, clear expectations, and exact file paths in the plan.
- **No missing contexts**: Do assume the executing agent knows nothing about the project setup; provide all commands.
- **No omitting tests**: Do enforce Test-Driven Development implicitly within the plan steps.
- **No reviewing with session history**: Do dispatch the plan reviewer with ONLY the written plan and spec to avoid bias.

## Tools & Subskills
- `write_to_file` to save the markdown plan.
- **REQUIRED SUB-SKILL:** `superpowers:subagent-driven-development` or `superpowers:executing-plans` for the actual execution.
- Reviewer: use `references/plan-document-reviewer-prompt.md`.

## Verification

- [ ] I verified the scope can be implemented as a single cohesive unit.
- [ ] The generated plan includes a standardized header.
- [ ] Tasks are explicitly broken down into bite-sized TDD steps with exact commands.
- [ ] The `plan-document-reviewer` subagent passed the plan without issues.
- [ ] The plan is saved to disk and execution options were provided to the user.
