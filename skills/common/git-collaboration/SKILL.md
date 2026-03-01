---
name: Git & Collaboration Standards
description: "🚨 Universal standards for version control, branching, PR workflows, and merge strategies. Never push directly to protected branches."
metadata:
  labels: [git, collaboration, commits, branching]
  triggers:
    keywords: [commit, branch, merge, pull-request, git]
---

# Git & Collaboration — Enhanced Standards

## Branch Convention (default)

```
main/master     ← production, NEVER push directly
develop         ← integration branch
│
├─ feature/<slug>   e.g. feature/add-export-report
├─ fix/<slug>       e.g. fix/order-null-discount
├─ hotfix/<slug>    e.g. hotfix/payment-timeout
├─ chore/<slug>     e.g. chore/upgrade-dependencies
└─ release/<ver>    e.g. release/2026.03
```

> If project has custom convention → follow project convention, don't invent.

## Commit Messages (Conventional Commits)

- **Format**: `<type>(<scope>): <description>`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- **Atomic**: One commit = One logical change
- **Imperative mood**: "add feature" not "added feature"

## PR Standards

1. Base branch correct: `feature → develop`, `hotfix → main`
2. Title: `<type>(<scope>): <description>`
3. Body required: `Closes #<issue>`, summary, testing steps
4. Don't self-merge in team — wait for reviewer approval
5. Resolve all review comments before merge
6. Keep PRs < 300 lines for effective review

## Merge Strategy (default)

```
feature → develop:  Squash merge
develop → main:     Merge commit
hotfix → main:      Merge commit + cherry-pick to develop
```

## ⚠️ Auto-Accept Safety — Git Operations

These commands **MUST NOT auto-run** without explicit confirmation:

| Command                   | Risk                          |
| ------------------------- | ----------------------------- |
| `git push origin main`    | Push directly to production   |
| `git reset --hard HEAD~N` | Lose commits, hard to recover |
| `git push --force`        | Rewrite public history        |
| `git branch -D`           | Delete branch                 |

## PR Checklist

```
[ ] Pulled latest from base branch?
[ ] Branch named per convention?
[ ] No credentials/secrets in commits?
[ ] No debug logs / commented-out code?
[ ] PR title follows Conventional Commits?
[ ] PR body has issue link and testing steps?
[ ] CI passes?
```

## Security

- **No Secrets**: Never commit `.env`, keys, or certs. Use `.gitignore` strictly.
- **Git Hooks**: Use `husky` or `lefthook` for local enforcement.
- **Tags**: SemVer (`vX.Y.Z`) for releases.

## References

- [Clean Linear History & Rebase Examples](references/CLEAN_HISTORY.md)
