---
name: writer-documentation-sprint
description: Skill for writer to documentation-sprint.
metadata:
  priority: P1
  version: 1.0
---

# writer Skill: documentation-sprint

> **Use this skill when**: The workflow needs to execute documentation-sprint tasks.
> **Triggers**: `documentation-sprint`, `writer`

## 1. Goal
Execute documentation-sprint following best practices from industry standards (like crewAI/MetaGPT).

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
