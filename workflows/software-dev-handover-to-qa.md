---
description: "Developer hands over the completed feature to QA/Tester with clear instructions."
---
# Dev: Handover to QA

> **Trigger**: Use when a developer finishes a feature and needs to prepare it for the QA team.
> **Tools**: Jira MCP, file editing tools for handover.md.

## Step 1 - Generate Release Notes
Summarize the code changes and business logic added in the current sprint.
- Use git log or commit history to gather context.

## Step 2 - Define Test Scenarios
Provide initial hints on what edge cases Devs think QA should test.
- **Skills**: skills/roles/dev/handover-to-qa/SKILL.md

## Step 3 - Review Handover Package
Compile the release notes, test hints, and configuration changes into a document.
- **Checkpoint**: Ask the Dev user to review the handover document before sending it to QA.

## Step 4 - Notify QA
Update the Jira ticket status or publish the handover document.
- **Fallback**: If Jira is unavailable, write the handover to a local Markdown file and instruct the user to ping QA on Slack.
- **Exit Criteria**: Handover document is complete, linked to the ticket, and QA is notified.
