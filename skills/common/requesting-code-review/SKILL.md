---
name: requesting-code-review
description: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
triggers: request review, code review, merge, finish task
priority: P1
---

# Requesting Code Review

> **Goal**: Dispatch a subagent to catch issues before they cascade using precisely crafted context for evaluation.

## The Process

1. **Get git SHAs**: Find the `BASE_SHA` and `HEAD_SHA` for the completed work.
2. **Dispatch Subagent**: Delegate `references/code-reviewer.md` to a fresh `code-reviewer` subagent. Provide exactly what was implemented, the requirements, SHAs, and a description.
3. **Act on feedback**:
   - Fix *Critical* issues immediately.
   - Fix *Important* issues before proceeding.
   - Note *Minor* issues.
   - Push back technically if the reviewer is wrong.

*(See `references/process.md` for examples and workflow integration).*

## Anti-Patterns

- **No passing session history**: Do dispatch the subagent using only the exact template context, NEVER the whole chat history.
- **No ignoring feedback**: Do fix all critical and important issues before moving to the next task.
- **No skipping reviews**: Do mandate subagent review after each task in subagent-driven development.
- **No mindless compliance**: Do push back against the reviewer with technical reasoning if the feedback is incorrect.

## Tools & Subskills
- `run_command` to get SHAs via `git rev-parse`.
- `write_to_file` to pass contexts to the subagent logic.

## Verification

- [ ] I captured the base and head SHAs of the work.
- [ ] I dispatched the `code-reviewer` subagent with a clean context.
- [ ] The subagent provided feedback.
- [ ] I've fixed all critical/important issues raised.
