---
name: support-handle-production-incident
description: Skill for support to handle-production-incident.
metadata:
  priority: P1
  version: 1.0
---

# support Skill: handle-production-incident

> **Use this skill when**: The workflow needs to execute handle-production-incident tasks.
> **Triggers**: `handle-production-incident`, `support`

## 1. Goal
Execute handle-production-incident following best practices from industry standards (like crewAI/MetaGPT).

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
