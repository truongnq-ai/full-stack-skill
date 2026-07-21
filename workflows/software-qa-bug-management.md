---
description: "Manage Bugs: Triage, integrate with Jira, and sync with Zephyr."
---
# QA: Bug Management

> **Trigger**: Use when new defects are reported or a test run fails.
> **Tools**: Jira MCP, Zephyr MCP.

## Step 1 - Bug Triage
Analyze the bug report, confirm reproduction steps, and assign severity.
- **Skills**: skills/roles/tester/bug-triage-and-verify/SKILL.md
- **Fallback**: If repro steps are missing, return the ticket to the reporter immediately.

## Step 2 - Jira and Zephyr Integration
Log the defect in Jira and link it to the failed Zephyr test case.
- **Skills**: skills/roles/tester/jira-integration/SKILL.md, skills/roles/tester/zephyr-test-generation/SKILL.md

## Step 3 - Verification of Fixes
Once Dev marks a bug as resolved, verify the fix.
- **Checkpoint**: Ask user if they want to run the full regression suite or just the specific test case.

## Step 4 - Closure
- **Exit Criteria**: Bugs are triaged and logged, and verified fixes are closed in Jira.

> **Required Skill**: [bug-management](file:///D:/GitHub/skill/full-stack-skill/skills/roles/qa/bug-management/SKILL.md)
