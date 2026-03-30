---
name: Code Review Etiquette
description: Guidelines for conducting empathy-driven, rigorous, and efficient PR reviews. Focuses on constructive feedback loops to elevate code quality without degrading team morale.
category: roles/dev
metadata:
  labels: [dev, code-review, pr, etiquette, communication]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [code review, pr review, review etiquette, how to review]
---

# 🤝 Code Review Etiquette & Philosophy

> **Use this skill when**: a developer is assigned to critique another developer's Pull Request. Trigger: `/dev-review-etiquette`.
>
> **Out of scope**: This is about the *human communication and philosophy* of reviewing. For the mechanical checklist of what to look for (e.g., Memory Leaks, O(N) loops), use `roles/reviewer/code-review/SKILL.md`.

---

## 🚫 Anti-Patterns

- **The Rubber Stamp (LGTM)**: Approving a 4,000-line PR after looking at it for 2 minutes with a simple "LGTM" (Looks Good To Me) because you don't want to deal with it.
- **Nitpick Torture**: Blocking a critical SEV-2 bug-fix PR because the author used double quotes instead of single quotes on line 42. (Let the Linter handle style; Humans review Logic).
- **Toxic Phrasing**: Leaving comments like "Why did you do this? This is terribly inefficient." (Assumes incompetence instead of missing context).
- **The Infinite Ping-Pong**: Sending a PR back and forth 15 times over 4 days instead of just jumping on a 5-minute Zoom call to resolve the fundamental architectural disagreement.

---

## 🛠 Prerequisites & Tooling

1. A clear separation of concerns (Linters MUST run automatically before human review).
2. The team's `roles/common/communication-contract/SKILL.md`.

---

## 🔄 Execution Workflow

### Step 1 — Empathy and Tone (The Golden Rule)
Critique the *code*, never the *coder*.
- *Bad*: "You forgot to close the database connection."
- *Good*: "This database connection remains open. Can we add a `finally` block to close it to prevent connection leaks?"
Always frame questions as collective team ownership ("we") or objective system behavior.

### Step 2 — Categorize Feedback (Prefixing)
Eliminate ambiguity. The reader must know if a comment is blocking or optional. Use prefixes:
- **[BLOCKER]**: Causes a bug, security flaw, or severe performance drop. MUST fix.
- **[NIT]**: Minor suggestion, renaming a variable. (Author can ignore or fix).
- **[Q] / [QUESTION]**: I don't understand this logic. Please explain. (Blocker until answered).
- **[PRAISE]**: Explicitly call out incredibly elegant or thoughtful code. (Crucial for morale).

### Step 3 — The "Why" Requirement
Never demand a change without explaining the rationale or providing a link to the relevant Best Practice documentation.
- *Bad*: "Extract this to a helper function."
- *Good*: "Extract this to a helper. We use this exact regex in the `Auth` module too, so putting it in `utils` keeps us DRY."

### Step 4 — Respond to PRs Rapidly
Code Review is a Tier-1 activity. If a teammate requests a review, prioritize it over writing your own new code. Stale PRs cause nasty merge conflicts and destroy velocity. Aim for < 4 hours latency.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Mega-PR | Author submits a 3,000 line PR covering 5 different features | Do not review it. Reject the PR gracefully. "Hey, this is too large to safely review for edge cases. Can you split this into 3 smaller, discrete PRs?" |
| Bitter Disagreement | Author and Reviewer are fighting in the PR comments | Halt async text communication immediately. Escalate to a live pair-programming call with a neutral Tech Lead to arbitrate using an ADR (`architecture-decision-records/SKILL.md`). |

---

## ✅ Done Criteria / Verification

A high-quality code review session is complete when:

- [ ] All comments are strictly prefixed (e.g., `[BLOCKER]`, `[NIT]`).
- [ ] Zero comments target the author's ability or intent.
- [ ] If the PR contains > 3 complex fundamental flaws, the Reviewer proactively scheduled a live sync instead of typing a wall of text.
