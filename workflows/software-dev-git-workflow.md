---
description: "Manage Git version control: branching strategy, commits, PR creation/review, conflict resolution, worktrees, and release tagging."
---

# 🔀 Dev: Git Workflow & Collaboration

> **Use this workflow when**: Developer needs to manage version control tasks — creating branches, writing commits, opening/reviewing PRs, resolving merge conflicts, using worktrees, or tagging releases. Trigger: `/software-dev-git-workflow`.
>
> **Out of scope**: Does not review code quality — use `/software-dev-review-code`. Does not prepare release artifacts — use `/software-devops-prepare-release`. Does not set up CI/CD — use `/software-devops-setup-cicd`.
>
> **Activates skills**: `skills/common/git-collaboration/SKILL.md`, `skills/common/using-git-worktrees/SKILL.md`, `skills/common/finishing-a-development-branch/SKILL.md`

---

## Step 1 — Load Skills & Identify Task

```
view_file skills/common/git-collaboration/SKILL.md
```

Identify git task type from this table:

| Task type | Go to |
|---|---|
| New branch / commit | Step 2 |
| PR lifecycle / conflict | Step 3 |
| Parallel work (worktree) | Step 4 |
| Release tag | Step 5 |

---

## Step 2 — Branch & Commit

**Branching**:
```bash
git checkout -b feat/<ticket-id>-<short-description> main
```

**Commit (Conventional Commits)**:
```bash
git add -p                     # Staged review — never git add .
git commit -m "feat(scope): short description"
# Footer: "Refs: #<issue-id>" | "BREAKING CHANGE: <description>"
```

---

## Step 3 — PR Lifecycle & Conflict Resolution

**PR Creation checklist**:
- [ ] Branch up-to-date with base (`git rebase origin/main`)
- [ ] All tests pass locally
- [ ] PR description: What changed / Why / How to test
- [ ] Linked issue / ticket ID in title or description

**Conflict Resolution**:
```bash
git fetch origin
git rebase origin/main         # Preferred over merge for feature branches
# Resolve each conflict: keep ours / theirs / both
git add <resolved-file>
git rebase --continue
```

> **Fallback**: If rebase conflicts cannot be resolved cleanly:
> ```bash
> git rebase --abort             # Return to pre-rebase state
> git merge origin/main          # Fall back to merge strategy
> ```

## ⏸️ Checkpoint: Before Push

```
"Pre-push checklist:
- [ ] Commit messages follow Conventional Commits
- [ ] No debug code, console.log, or TODO left staged
- [ ] Tests pass: [Y/N]
- [ ] Branch rebased on latest main: [Y/N]

Push and open PR? (Y / N)"
```

---

## Step 4 — Git Worktree (Parallel Work)

```
view_file skills/common/using-git-worktrees/SKILL.md
```

```bash
# Create worktree for parallel branch
git worktree add ../project-hotfix hotfix/<issue>
# Work in ../project-hotfix independently
# Remove when done
git worktree remove ../project-hotfix
```

---

## Step 5 — Finish Branch & Tag Release

```
view_file skills/common/finishing-a-development-branch/SKILL.md
```

**Release Tag**:
```bash
git tag -a v<MAJOR.MINOR.PATCH> -m "Release v<version>: <summary>"
```

## ⏸️ Checkpoint: Before Tag Push

```
"Release tag: v<version>
Summary: <message>
All tests pass: [Y/N]

Push tag to origin? (Y / N)"
```

```bash
git push origin v<MAJOR.MINOR.PATCH>
```

---

## Done Criteria

- [ ] Branch name follows convention (`feat/`, `fix/`, `chore/`)
- [ ] All commits follow Conventional Commits format
- [ ] PR linked to issue with description and test instructions
- [ ] No merge conflicts remaining
- [ ] Release tags pushed with annotated message

> **Required Skill**: `skills/common/git-collaboration/SKILL.md`
