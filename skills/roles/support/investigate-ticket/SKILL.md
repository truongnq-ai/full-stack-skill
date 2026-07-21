---
name: support-investigate-ticket
description: Skill for support to investigate-ticket.
metadata:
  priority: P1
  version: 1.0
---

# support Skill: investigate-ticket

> **Use this skill when**: The workflow needs to execute investigate-ticket tasks.
> **Triggers**: `investigate-ticket`, `support`

## 1. Goal
Execute investigate-ticket following best practices from industry standards (like crewAI/MetaGPT).

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
