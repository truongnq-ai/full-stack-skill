---
description: "Developer flow for self-testing, unit testing, and debugging errors during development while ensuring basic security."
---
# Dev: Test and Debug

> **Trigger**: Use when encountering a bug during development, or when tasked to increase test coverage.
> **Tools**: 
un_command (debugger/test runner), log viewing tools.

## Step 1 - Bug Reproduction and Isolation
Run the application locally or view test logs to isolate the error.
- **Skills**: skills/roles/dev/production-debugging/SKILL.md
- **Fallback**: If the bug cannot be reproduced, ask the user for exact input data or environment state.

## Step 2 - Write Failing Test
Write a unit test that specifically reproduces the bug.
- **Skills**: skills/roles/dev/unit-test-best-practices/SKILL.md

## Step 3 - Apply Fix with Security in Mind
Fix the logic error, ensuring no new security vulnerabilities (like SQLi or XSS) are introduced.
- **Skills**: skills/roles/dev/security-basics/SKILL.md

## Step 4 - Verification Checkpoint
Run the newly added test and the full test suite.
- **Checkpoint**: Show the user the fix and the passing test. Request permission to commit.

## Step 5 - Finalize
- **Exit Criteria**: Bug is fixed, regression test is merged, and pipeline is green.

> **Required Skill**: `skills/roles/dev/production-debugging/SKILL.md`
