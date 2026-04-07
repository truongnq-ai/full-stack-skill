---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching any code. Creates bite-sized TDD implementation plans assuming zero codebase context.
triggers: plan, implement, spec, steps, multi-step, implementation plan, task breakdown
priority: P1
---

# Writing Plans

> **Goal**: Write comprehensive, bite-sized implementation plans assuming the executing engineer has **zero** context for the codebase and **questionable taste**. Document everything they need: which files to touch, exact code, tests, commands, expected output.

**Announce at start:** "I'm using the `writing-plans` skill to create the implementation plan."

## Process Flow

1. **Scope Check** — If the spec covers multiple independent subsystems, break into separate plans. Each plan must produce working, testable software on its own.
2. **File Structure Analysis** — Map out files to create/modify before writing tasks. Lock in decomposition decisions. Prefer smaller, focused files over large ones.
3. **Plan Header** — Every plan MUST start with the standardized header (Goal + Architecture + Tech Stack). See format below.
4. **Bite-Sized Tasks** — Break into 2–5 minute steps using TDD: Write failing test → Run to confirm fail → Write minimal implementation → Run to confirm pass → Commit. See `references/task-structure.md`.
5. **Plan Self-Review** — Check spec coverage, placeholder scan, type consistency. Fix issues inline.
6. **Execution Handoff** — Offer the user: **Subagent-Driven** (recommended) or **Inline Execution**.

*(Save plans to `docs/plans/YYYY-MM-DD-<feature-name>.md` using `write_to_file`)*

## Mandatory Plan Header

Every plan MUST start with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## No Placeholders Law

The following are **plan failures** — never write them:

- `TBD`, `TODO`, `"implement later"`, `"fill in details"`
- `"Add appropriate error handling"` / `"add validation"` / `"handle edge cases"` (without actual code)
- `"Write tests for the above"` (without actual test code)
- `"Similar to Task N"` (repeat the code — engineer may read tasks out of order)
- Steps that describe what to do without showing how (code blocks are required for code steps)
- References to types, functions, or methods not defined anywhere in the plan

## Bite-Sized Task Granularity

Each step is **one action (2–5 minutes)**:

- "Write the failing test" — step
- "Run it to confirm it fails with expected error" — step
- "Write minimal implementation to make test pass" — step
- "Run tests to confirm passing" — step
- "Commit with message `feat: <description>`" — step

See `references/task-structure.md` for full template with code examples.

## Plan Self-Review Checklist

After writing the complete plan:

1. **Spec coverage**: Can you point to a task for every requirement in the spec?
2. **Placeholder scan**: Search for any pattern from the No Placeholders Law above.
3. **Type consistency**: Do types, method signatures, and property names match across all tasks?

Fix issues inline. No need to re-review.

## Anti-Patterns

- **No vague tasks**: Every step must include exact commands, exact file paths, and actual code.
- **No missing context**: Assume the executing agent knows nothing about the project setup.
- **No omitting tests**: TDD is implicit in every plan — failing test before implementation.
- **No placeholders**: See No Placeholders Law above. Every violation is a plan failure.

## Tools & Sub-Skills

- `write_to_file` — Save the markdown plan.
- Reviewer: use `references/plan-document-reviewer-prompt.md` for plan review.
- For execution: `subagent-driven-development` (recommended) or `executing-plans`.

## Verification

- [ ] Scope verified — can be implemented as a single cohesive unit.
- [ ] Plan includes the mandatory standardized header.
- [ ] Tasks are broken down into TDD bite-sized steps with exact commands.
- [ ] No Placeholders Law respected — no TBD, TODO, or vague steps anywhere.
- [ ] Plan self-review passed (spec coverage, placeholder scan, type consistency).
- [ ] Plan saved to disk and execution options provided to the user.
