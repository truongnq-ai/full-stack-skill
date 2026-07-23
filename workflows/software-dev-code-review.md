---
description: "Strict Pull Request review process, including checklist verification, design, and security scans."
---
# Dev: Code Review

> **Trigger**: Use when asked to review a Pull Request, a diff, or a specific set of newly changed files.
> **Tools**: GitHub MCP, iew_file.

## Step 1 - Fetch Diff and PR Context
Retrieve the PR details and the code diff.
- **Skills**: skills/roles/dev/pr-checklist/SKILL.md, skills/roles/reviewer/code-review/SKILL.md
- **Fallback**: If diff is too large, use grep_search to review file by file instead of loading the whole diff.

## Step 2 - Architectural and Security Scan
Review the diff against architectural design patterns and security rules.
- **Skills**: skills/roles/dev/design-review-checklist/SKILL.md, skills/roles/dev/code-review-security/SKILL.md

## Step 3 - Draft Constructive Feedback
Formulate review comments. Ensure tone is polite and actionable.
- **Skills**: skills/roles/dev/code-review-etiquette/SKILL.md

## Step 4 - Review Checkpoint
- **Checkpoint**: Present the drafted comments to the user before submitting them to GitHub. Ask for final approval or manual edits.

## Step 5 - Submit Review
Submit the approved review via GitHub MCP.
- **Exit Criteria**: PR is either Approved or marked as "Changes Requested" with clear actionable items.

> **Required Skill**: `skills/roles/dev/code-review-etiquette/SKILL.md`
