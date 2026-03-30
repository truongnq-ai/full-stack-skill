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

- **Cowboy Coding**: Opening a file, typing 500 lines of logic, and realizing halfway through that you don't actually understand the business requirement.
- **The Monstrous Commit**: Working for 4 days locally, and then typing `git commit -m "added feature"` combining 40 files, 3 bug fixes, and a linter formatting pass into one atomic bomb of a commit.
- **"It Works On My Machine"**: Pushing code that relies on your local `C:\temp\config.json` file.

---

## 🛠 Prerequisites & Tooling

1. A clear Jira Ticket with acceptance criteria (See `roles/pm/product-requirements/SKILL.md`).
2. Local Development Environment matching production as closely as possible (Docker).

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
