---
name: qa-test-execution
description: Skill for qa to test-execution.
metadata:
  priority: P1
  version: 1.0
---

# qa Skill: test-execution

> **Use this skill when**: The workflow needs to execute test-execution tasks.
> **Triggers**: `test-execution`, `qa`

## 1. Goal
Execute test-execution following best practices from industry standards (like crewAI/MetaGPT).

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
