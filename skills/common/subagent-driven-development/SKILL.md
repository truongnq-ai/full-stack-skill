---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
triggers: sdd, implement plan, subagent, delegate, independent tasks
priority: P0
---

# Subagent-Driven Development

> **Goal**: Execute plan by dispatching a fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

## The Process
**Core principle:** Fresh subagent per task + two-stage review = high quality, fast iteration.

1. **Extract Tasks**: Read the plan, extract all tasks with full text, and note context.
2. **Dispatch Implementer**: Delegate task to an implementer subagent using `references/implementer-prompt.md`.
    - Provide full task text and context to the subagent to prevent context pollution.
    - If the subagent is `BLOCKED` or `NEEDS_CONTEXT`, provide context using `notify_user` or read files for it.
3. **Dispatch Spec Reviewer**: Once implementation is complete, delegate to a spec compliance reviewer using `references/spec-reviewer-prompt.md`.
    - If the reviewer finds non-compliance, have the implementer fix it.
4. **Dispatch Code Quality Reviewer**: ONLY AFTER spec compliance is ✅, delegate to a code quality reviewer using `references/code-quality-reviewer-prompt.md`.
    - If the reviewer finds issues, have the implementer fix it.
5. **Complete Task**: Mark task complete and move to the next.
6. **Final Review**: Dispatch final code reviewer subagent for entire implementation.

*(Reference: See `references/process.md` for model selection and implementer status handling).*

## Anti-Patterns

- **No mixed contexts**: Do ensure every subagent starts with a fresh, clean context and only the task text.
- **No skipping reviews**: Do execute both spec compliance and code quality reviews for every task.
- **No ignoring subagent questions**: Do answer questions from subagents clearly before they proceed with implementation.
- **No parallel implementation agents**: Do process one task implementation at a time to prevent conflicts.
- **No wrong order**: Do ensure spec compliance review ALWAYS happens before code quality review.

## Tools & Context
- Use `write_to_file` to pass prompts to subagents or simply instruct the underlying system to spin up isolated execution threads if capable.
- Do NOT make subagents read the plan file directly; you extract and pass the exact text.

## Verification

- [ ] I have extracted individual independent tasks from the implementation plan.
- [ ] For this task, the implementer subagent has finished with a `DONE` status.
- [ ] The Spec Reviewer subagent has confirmed 100% spec compliance.
- [ ] The Code Quality Reviewer subagent has approved the code.
- [ ] No review steps were skipped.
