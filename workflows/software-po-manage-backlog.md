---
description: "PO/BA manages and grooms the Backlog, evaluates impact of new features."
---
# BA: Backlog Management and Impact Analysis

> **Trigger**: Use this workflow when a user requests to plan a new sprint, groom the backlog, or analyze the impact of a new feature before implementation.
> **Tools**: Jira MCP, Markdown editor, grep_search.

## Step 1 - Inventory and Review Backlog
Fetch the current backlog from Jira or the local acklog.md.
- Ensure issues are categorized and prioritized.
- **Skills**: skills/roles/po/backlog-management/SKILL.md
- **Fallback**: If Jira is down, fallback to reviewing local Markdown task lists.

## Step 2 - Feature Impact Analysis
For the top prioritized features, analyze their technical and business impact.
- Trace dependencies in code using grep_search.
- **Skills**: skills/roles/ba/feature-impact-analysis/SKILL.md

## Step 3 - Sprint Preparation Checkpoint
Prepare the user stories with clear Acceptance Criteria.
- **Checkpoint**: Pause execution. Ask the user to review the drafted sprint plan and approve before moving issues to "In Progress".

## Step 4 - Output Generation
Generate the final sprint_plan.md artifact.
- **Exit Criteria**: All stories for the sprint are fully specified, impact is documented, and user approval is received.

> **Required Skill**: [manage-backlog](file:///D:/GitHub/skill/full-stack-skill/skills/roles/po/manage-backlog/SKILL.md)
