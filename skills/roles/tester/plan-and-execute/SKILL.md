---
name: tester-plan-and-execute
description: Skill for tester to plan-and-execute.
metadata:
  priority: P1
  version: 1.0
---

# tester Skill: plan-and-execute

> **Use this skill when**: The workflow needs to execute plan-and-execute tasks.
> **Triggers**: `plan-and-execute`, `tester`

## 1. Goal
Execute plan-and-execute following best practices from industry standards (like crewAI/MetaGPT).

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
