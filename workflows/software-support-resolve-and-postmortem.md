---
description: "Permanent incident resolution (data patching) and Blameless RCA reports."
---
# Support: Resolve and Postmortem

> **Trigger**: Use after a production incident has been mitigated to find the root cause and apply permanent fixes.
> **Tools**: Database querying tools, text editor.

## Step 1 - Permanent Fix
Apply permanent code changes or data patches to resolve the underlying issue.
- **Skills**: skills/roles/l3-support/data-patch-scripting/SKILL.md
- **Fallback**: Do not run data patches without backing up the affected tables first.

## Step 2 - Blameless RCA Checkpoint
Conduct a blameless Post-Mortem investigation with the team.
- **Skills**: skills/roles/devops/incident-response/blameless-rca/SKILL.md
- **Checkpoint**: Present the drafted RCA document to the user for review and sign-off.

## Step 3 - Action Items
Follow up on prevention tasks and add them to the backlog.

## Step 4 - Output
- **Exit Criteria**: RCA published, data patched, and preventive action items created.

> **Required Skill**: `skills/roles/support/resolve-and-postmortem/SKILL.md`
