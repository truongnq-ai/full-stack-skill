---
description: "Workflow for addressing Technical Debt: performance optimization, restructuring code, updating dependencies, and logging ADRs."
---
# Dev: Refactor and Tech Debt

> **Trigger**: Use when tasked with improving performance, resolving SonarQube alerts, or restructuring legacy code.
> **Tools**: Code editing tools, 
un_command (linters/profilers).

## Step 1 - Debt Identification and Profiling
Profile the codebase or read lint/performance reports to identify bottlenecks and boundary violations.
- **Skills**: skills/roles/dev/performance-engineering/SKILL.md, skills/roles/dev/code-ownership-boundaries/SKILL.md
- **Fallback**: If profiler is unavailable, rely on static analysis via grep_search.

## Step 2 - Refactoring Strategy Checkpoint
Draft a plan detailing which files will change and how dependencies will be updated.
- **Skills**: skills/roles/dev/refactor-techdebt/SKILL.md, skills/roles/dev/dependency-update-policy/SKILL.md
- **Checkpoint**: Pause and ask the user to approve the refactoring strategy before modifying any code.

## Step 3 - Safe Execution
Execute the refactor step-by-step. Run tests after every file modification.
- **Fallback**: If tests fail after a step, revert the specific file and re-evaluate.

## Step 4 - Document Architectural Decisions
Record the changes in an Architecture Decision Record (ADR).
- **Skills**: skills/roles/dev/architecture-decision-records/SKILL.md

## Step 5 - Completion
- **Exit Criteria**: Code is refactored, tests pass, dependencies are updated safely, and an ADR is written.
