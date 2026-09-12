---
name: Coding Discipline FSM
description: Disciplined coding FSM — analyze first, execute second. 7-step workflow with mandatory checkpoints.
metadata:
  labels:
    - workflow
    - discipline
    - process
    - common
    - coding-discipline
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - plan
      - scope
      - clarify
      - coding discipline
      - workflow
    task_types:
      - implementation
      - refactor
      - debugging
workflow_ref: update-docs
---

# Coding Discipline — 7-Step FSM

## **Priority: P1 (OPERATIONAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Context

Every coding task must follow a disciplined workflow. Never skip analysis or execute without scope confirmation.

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

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

**Step 5 — Declare Plan**: Simple tasks (≤2 files, ≤20 lines, no side effects) → execute directly. Complex multi-step tasks → **invoke `writing-plans` skill first** to create a bite-sized TDD plan, then declare it and wait for confirmation.

**Step 6 — Execute**: Only modify declared files. Prefer `replace_file_content` over full overwrite. Mid-execution discovery of additional files needed → **STOP, declare, wait**.

**Step 7 — Report**: Summarize changes. Flag anything needing manual verification.

## Prohibitions

- ❌ Modify undeclared files even if "clearly needed"
- ❌ Self-choose approach when ≥2 valid options exist
- ❌ Auto-create documentation files not requested
- ❌ Rename/delete/move files not in the plan
- ❌ Run side-effect commands (DB migrate, deploy, restart) without confirmation
- ❌ Start coding a complex multi-step task without first running the `writing-plans` skill to create a structured TDD plan


## Red Flags (LLM Rationalizations)

These thoughts mean STOP—you're rationalizing and bypassing discipline:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |

## References

- [Examples (Input/Output)](references/examples.md)
