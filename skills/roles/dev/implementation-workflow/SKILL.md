---
name: Implementation Workflow
description: The disciplined step-by-step developer loop for safely contributing code, avoiding regressions, and maintaining momentum from Ticket to Merge.
category: roles/dev
metadata:
  labels: [dev, workflow, daily-loop, productivity, feature-development]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [implementation workflow, write code, developer loop, feature development]
---

# 💻 Implementation Workflow

> **Use this skill when**: you pull a new Jira Ticket from the sprint board and sit down to write code. This governs the micro-routines of your daily development cycle. Trigger: `/dev-implement`.
>
> **Out of scope**: Architectural planning (`design-review-checklist/SKILL.md`) or handing over the code (`handover-to-qa/SKILL.md`). This is the execution phase in the IDE.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Cowboy Coding** — Opening a file, typing 500 lines without understanding the business requirement. | Halfway through you realize the requirement was wrong; time wasted. |
| **P0** | **The Monstrous Commit** — 4 days of work in one `git commit -m "added feature"` with 40 files. | Impossible to review, revert, or bisect. |
| **P1** | **"It Works On My Machine"** — Code relying on local `C:\temp\config.json`. | Fails immediately in CI/staging/production. |

---

## 🛠 Prerequisites & Tooling

1. A clear Jira Ticket with acceptance criteria (See `roles/pm/product-requirements/SKILL.md`).
2. Local Development Environment matching production as closely as possible (Docker).

### Required Tools

| Tool | Purpose |
|------|--------|
| `run_command` | Execute git, tests, linters, and build scripts. |
| `view_file` | Read ticket acceptance criteria and existing code. |
| `grep_search` | Understand codebase context before modifying. |
| `replace_file_content` | Apply code changes surgically. |
| `call_mcp_tool` → `github/create_pull_request` | Create PR when code is ready. |

---

## 🔄 Execution Workflow

### Step 1 — Fresh Foundation
Always start from the latest stable baseline.
```bash
git checkout main
git pull origin main
git checkout -b feat/JIRA-123-add-cart-button
```

### Step 2 — TDD / Test Scaffold (Optional but Recommended)
Before writing the business logic, write a failing Unit Test (`unit-test-best-practices/SKILL.md`) that asserts what the function *should* do. If TDD is not your style, write the empty function signatures and document the expected inputs/outputs.

### Step 3 — The Iterative Loop (Code, Verify, Commit)
Write a small, logical piece of the feature (e.g., just the Database Query).
1. Verify it works locally.
2. Stage **only** the relevant files (`git add .` is dangerous, use `git add -p` to review).
3. Commit with semantic intent: `feat(db): add cart fetch query`.
*Repeat this loop rapidly. Commits should be granular.*

### Step 4 — Continuous Self-Correction
Every 4 hours: Run the local test suite. Run the linter.
Never allow code to pile up "waiting for the end of the week" to run tests. Catch regressions the minute you type them.

### Step 5 — Prepare for PR (Rebase & Polish)
Before opening a PR, ensure your branch is not stale.
```bash
git fetch origin
git rebase origin/main
```
Resolve any conflicts locally, ensuring your feature lays perfectly on top of the newest codebase. Then generate the PR.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Rabbit Hole | You have been debugging a single Redux state mutation for 6 hours with zero progress | Timebox your struggles. If you are stuck for > 90 minutes, trigger `/dev-debugging-workflow` and ping a Senior Dev for a 15-minute pairing session. Do not burn a whole day spinning your wheels. |

---

## ✅ Done Criteria / Verification

A feature is implemented when:

- [ ] It fully satisfies the ticket's Acceptance Criteria.
- [ ] The Git history is composed of small, semantic, reversible commits.
- [ ] Local linters and unit tests pass before the PR is opened.
- [ ] Branch is rebased on latest `main` (no stale merge conflicts).
- [ ] PR is ready for review (see `pr-checklist`).

---

## 📚 References

- [Implementation Coding Skill](../implementation-coding/SKILL.md) — CodeAct methodology for the coding phase.
- [PR Checklist Skill](../pr-checklist/SKILL.md) — Pre-flight checks before requesting review.
- [Handover to QA Skill](../handover-to-qa/SKILL.md) — Transferring to QA after merge.
- [Unit Test Best Practices](../unit-test-best-practices/SKILL.md) — TDD scaffold (Step 2).
- Trunk-Based Development: https://trunkbaseddevelopment.com/
