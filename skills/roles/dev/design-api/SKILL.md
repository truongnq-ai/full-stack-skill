---
name: dev-design-api
description: Skill for dev to design-api.
metadata:
  priority: P1
  version: 1.0
---

# dev Skill: design-api

> **Use this skill when**: The workflow needs to execute design-api tasks.
> **Triggers**: `design-api`, `dev`

## 1. Goal
Execute design-api following best practices from industry standards (like crewAI/MetaGPT).

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
