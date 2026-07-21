---
name: ba-gather-requirements
description: Skill for ba to gather-requirements.
metadata:
  priority: P1
  version: 1.0
---

# ba Skill: gather-requirements

> **Use this skill when**: The workflow needs to execute gather-requirements tasks.
> **Triggers**: `gather-requirements`, `ba`

## 1. Goal
Execute gather-requirements following best practices from industry standards (like crewAI/MetaGPT).

## 2. Best Practices
- Focus on actionable outcomes.
- Provide clear checkpoints for user approval.

## 3. Anti-Patterns
- Silently making decisions without user context.
- Generating overly complex or unreadable metrics.

## 4. Required Tools
- `read_file`, `write_to_file`

## 5. Verification
- Ensure the output aligns with the project PRD or goals.
