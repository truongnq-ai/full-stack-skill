---
name: PR Checklist (Author)
description: The rigorous pre-flight checklist a Developer must complete BEFORE requesting a peer to review their code, saving everyone time.
category: roles/dev
metadata:
  labels: [dev, pull-request, checklist, code-review]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [pr checklist, before a pr, create pr, submit code]
---

# ✅ Pull Request Checklist (Author)

> **Use this skill when**: you have finished coding and are about to click "Create Pull Request" on GitHub/GitLab. Trigger: `/dev-pr-checklist`.
>
> **Out of scope**: Reviewing *someone else's* PR. (That is `roles/reviewer/code-review/SKILL.md`). This skill is for the *Author* to police themselves.

---

## 🚫 Anti-Patterns

- **Outsourcing Linting to CI**: Pushing unformatted code and waiting 10 minutes for GitHub Actions to fail, fixing a typo, pushing again, and waiting another 10 minutes. Run it locally.
- **Title: "updates"**: Calling a PR "Fixed some stuff". (PR titles auto-generate Release Notes; they must be semantic).
- **The Mega-Diff**: Submitting a 2,000-line PR without any contextual comments, forcing the reviewer to guess how the architecture works.

---

## 🛠 Prerequisites & Tooling

1. Working local git branch pushed to origin.
2. Standard PR Templates in `.github/PULL_REQUEST_TEMPLATE.md`.

---

## 🔄 Execution Workflow

### Step 1 — The Self-Review (Mandatory)
Before assigning a reviewer, review your own code in the GitHub/GitLab UI diff viewer.
Look for:
- Leftover `console.log()`, `debugger`, or `TODO:` comments.
- Accidental changes (e.g., auto-formatting a file you didn't mean to touch).

### Step 2 — Metadata & Linkage
- **Title**: Semantic format (e.g., `feat(auth): enable Google OAuth login`).
- **Ticket Link**: Ensure the PR body literally links to Jira/Linear (e.g., `Resolves #AUTH-123`). This allows CI to auto-close the ticket.

### Step 3 — Context Cues for Reviewers
Help the reviewer understand your thought process.
- Leave proactive inline comments on your *own* PR: *"I chose a `for` loop here instead of `.reduce()` because profiling showed it runs 10x faster for arrays over 50k items."* (This prevents the reviewer from asking why).

### Step 4 — Visual Evidence
If the PR touches the User Interface:
Take a screenshot or a 10-second screen-recording GIF showcasing the new component functioning. Attach it directly to the PR description. (Reviewers love visual proof).

### Step 5 — Verify CI Greens
Do not assign a human reviewer until the automated CI pipeline (Linters, Unit Tests, SonarQube) glows green. Human time is too expensive to catch syntax errors.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Accidental Massive PR | You realize during self-review that your PR spans 40 files and 1,500 lines | Halt. Do not request review. Use `git reset` or `git cherry-pick` to split this mega-branch into 3 sequential, dependent PRs (e.g., PR 1: DB Schema, PR 2: Backend API, PR 3: Frontend UI). |

---

## ✅ Done Criteria / Verification

A PR is ready for human review when:

- [ ] The author has completed an inline self-review finding zero leftover debug artifacts.
- [ ] Automated tests and linters pass 100%.
- [ ] The PR body contains a clear summary, ticket links, and (if applicable) visual UI evidence.
