---
name: executing-plans
description: Use when you have a written implementation plan to execute in a single session with review checkpoints
triggers: execute plan, run plan, implement tasks, inline execution
priority: P1
---

# Executing Plans

> **Goal**: Load a plan, review it critically, execute all its tasks sequentially, and report when complete.

*(Note: If subagents are available, prefer `superpowers:subagent-driven-development` over this skill for higher quality and context-isolation.)*

## Process Flow

1. **Load and Review Plan**: Read the plan file. Identify concerns. If there are critical gaps, stop and ask the human. If clear, proceed.
2. **Setup Environment**: Ensure you are in an isolated workspace (e.g., git worktree or branch).
3. **Execute Tasks**: For each task:
   - Mark as `in_progress`.
   - Follow each granular step exactly as written (write test -> fail -> implement -> pass).
   - Run verifications as specified.
   - Commit and mark as `completed`.
4. **Halt on Blockers**: STOP immediately if you hit a blocker (missing dependency, failing test, unclear instruction). Ask for clarification rather than guessing.
5. **Complete Development**: After all tasks are done and verified, hand off to `superpowers:finishing-a-development-branch`.

## Anti-Patterns

- **No guessing**: Do NOT push through blockers or guess ambiguous instructions; stop and ask the user.
- **No skipping tests**: Do NOT skip the verification steps specified in the plan.
- **No main branch execution**: Do NOT start implementation on the main/master branch without explicit user consent.
- **No silent modifications**: Do NOT silently alter the plan's architectural decisions; raise concerns before executing.

## Tools & Subskills
- `read_text_file` to load the plan.
- `run_command` to execute tests and git commits.
- **REQUIRED SUB-SKILL:** `superpowers:finishing-a-development-branch`.

## Verification

- [ ] I have read and critically reviewed the entire implementation plan before starting.
- [ ] I am executing on a dedicated branch or worktree, not main.
- [ ] For every task, I ran the tests and verified they passed before moving to the next task.
- [ ] I stopped and asked the user when hitting a blocker.
- [ ] I invoked the finishing workflow after all tasks were completed.
