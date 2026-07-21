---
description: "Standard end-to-end coding workflow: Write code applying TDD, use AI assistance, and wrap with Feature Flags."
---
# Dev: Implement Feature

> **Trigger**: Use when the user wants to implement a specific feature from a ticket or requirement document.
> **Tools**: 
un_command (test runner), file editing tools.

## Step 1 - Requirement Context and Setup
Read the handover document or Jira ticket.
- **Skills**: skills/roles/dev/implementation-workflow/SKILL.md
- **Fallback**: If requirements are ambiguous, immediately pause and clarify with the user.

## Step 2 - Test-First Implementation
Write failing unit tests defining the expected behavior.
- **Skills**: skills/roles/dev/test-first-discipline/SKILL.md
- Run the test suite using 
un_command (e.g., 
pm test, pytest) to verify they fail.

## Step 3 - AI-Assisted Code Generation
Implement the business logic to make the tests pass. Use AI best practices for code structuring.
- **Skills**: skills/roles/dev/ai-integration/SKILL.md
- Wrap new experimental code in Feature Flags if applicable.
- **Skills**: skills/roles/dev/feature-flag-practice/SKILL.md

## Step 4 - Verification Checkpoint
Run the test suite again. Ensure all tests pass.
- **Checkpoint**: Present the test output and the git diff to the user. Ask for approval to commit.

## Step 5 - Output and Exit
- **Exit Criteria**: Code is successfully written, tests pass, feature flag is configured, and changes are committed.

> **Required Skill**: [implement-feature](file:///D:/GitHub/skill/full-stack-skill/skills/roles/dev/implement-feature/SKILL.md)
