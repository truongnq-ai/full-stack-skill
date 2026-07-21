---
name: qa-bug-management
description: Skill for qa to bug-management.
metadata:
  priority: P1
  version: 1.0
---

# qa Skill: bug-management

> **Use this skill when**: The workflow needs to execute bug-management tasks.
> **Triggers**: `bug-management`, `qa`

## 1. Goal
Execute bug-management following best practices from industry standards (like crewAI/MetaGPT).

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
