---
description: "QA signs off on the build quality and hands it over to DevOps for deployment."
---
# QA: Handover to DevOps

> **Trigger**: Use when testing is complete and the RC (Release Candidate) is ready for production.
> **Tools**: CI/CD MCP, Git MCP.

## Step 1 - Final Quality Sign-off
Verify all tests pass and no blocker bugs remain.
- **Skills**: skills/roles/tester/handover-to-devops/SKILL.md

## Step 2 - Artifact Verification
Ensure the exact artifact (Docker tag, package version) is identified and immutable.
- **Fallback**: If artifacts are missing tags, reject the handover and notify Dev.

## Step 3 - Handover Checkpoint
Prepare the handover manifest.
- **Checkpoint**: Present the release candidate details to the user and request the final Go/No-Go decision.

## Step 4 - Dispatch to DevOps
Notify the DevOps team or trigger the deployment pipeline manually.
- **Exit Criteria**: Handover manifest approved, artifacts verified, and DevOps notified.
