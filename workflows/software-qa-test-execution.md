---
description: "Run tests (Automation E2E, Exploratory), control flaky tests, and generate daily reports."
---
# QA: Test Execution

> **Trigger**: Use during active test execution phases, daily regression runs, or exploratory testing sessions.
> **Tools**: CI/CD logs, 
un_command (Cypress/Playwright), report generator.

## Step 1 - Automated Test Execution
Run the automated E2E and integration suites.
- **Skills**: skills/roles/tester/automation-testing/SKILL.md, skills/roles/tester/automation-e2e/SKILL.md
- **Fallback**: If the CI environment fails to spin up, run tests locally using 
un_command.

## Step 2 - Exploratory Testing
Perform manual exploratory testing on edge cases.
- **Skills**: skills/roles/tester/exploratory-testing/SKILL.md

## Step 3 - Flake Management Checkpoint
Analyze failing tests to determine if they are flaky or real bugs.
- **Skills**: skills/roles/tester/flake-control/SKILL.md
- **Checkpoint**: Present failing tests to the user to classify as Flaky (quarantine) or Bug (report).

## Step 4 - Daily Reporting
Generate and send out the daily test execution report.
- **Skills**: skills/roles/tester/daily-test-report/SKILL.md

## Step 5 - Finalize Run
- **Exit Criteria**: Automation completed, flakes quarantined, manual tests executed, and report dispatched.

> **Required Skill**: [test-execution](file:///D:/GitHub/skill/full-stack-skill/skills/roles/qa/test-execution/SKILL.md)
