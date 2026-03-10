---
name: Git & Collaboration Standards
description: Universal standards for version control, branching, commit messages, and team collaboration. Activates on git operations, PRs, and branching tasks.
metadata:
  labels: [git, collaboration, commits, branching, pr]
  triggers:
    files: ['.gitignore', '.husky/**', '.lefthook.yml', 'CHANGELOG.md']
    keywords: [commit, branch, merge, pull request, git, rebase, squash, cherry-pick, changelog, tag, release, hotfix]
    negative: ["user asks to write code — use framework skill", "user asks to deploy — use deploy workflow"]
---

# Git & Collaboration Standards

## **Priority: P0 (OPERATIONAL)**

**This skill does NOT**: deploy code or manage CI/CD pipelines — use `deploy` workflow for that. Does not review code content — use `code-review`.

**Compatible skills**: `code-review` (PR review process), `smart-release` workflow (release tagging), `commit-message-rule` (auto-enforced on commits).

## 📝 Commit Messages (Conventional Commits)

Format: `<type>(<scope>): <description>` — imperative, lowercase.

Types: `feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `chore`.

- **Atomic**: One commit = one logical change. Never "mega-commits."
- **Imperative mood**: "add feature" not "added feature."

> **Fallback**: If unsure of type, use `chore` and describe clearly. Never leave message as "wip" or "fix."

## 🌿 Branching

- **Naming**: `feat/`, `fix/`, `hotfix/`, `refactor/`, `docs/` prefixes required.
- **Branch for everything**: Never push directly to `main` or `develop`.
- **Sync early**: Pull before push. Rebase onto latest upstream before PR.
- **Linear history**: `git rebase -i` to squash messy commits before PR. No merge commits in feature branches.

> **Fallback**: If rebase causes conflicts beyond 3 files, use `git merge --no-ff` then document in PR description.

## 🤝 Pull Request Standards

- **Size**: <300 lines of change per PR. Split larger changes.
- **Description**: What changed + why + how to test. Link issues (`Closes #123`).
- **Self-review**: Check own PR before requesting peers.
- **CI gate**: All checks (lint, test, build) must pass before merge.

## 🛡 Security

- **No secrets**: Never commit `.env`, API keys, certificates. Use `.gitignore` strictly.
- **Git hooks**: Use `husky`/`lefthook` for pre-commit lint + test enforcement.
- **Tags**: SemVer (`vX.Y.Z`) for releases. Update `CHANGELOG.md` per release.

## 🚫 Anti-Patterns

**`No Direct Main Push`**: All changes via PR. No exceptions for "small fixes."

**`No Mega-Commits`**: One logical change per commit. Squash before pushing.

**`No WIP Messages`**: Every commit message must describe what changed. "wip" → rejected.

**`No Secrets in History`**: Use `git filter-repo` to purge. Prevention via hooks.

**`No Rebase on Shared Branches`**: Never force-push to branch with other contributors.

## ✅ Verification Checklist

- [ ] Commit message follows Conventional Commits format
- [ ] Branch has appropriate prefix (feat/, fix/, etc.)
- [ ] PR is <300 lines of diff
- [ ] CI passes (lint + test + build)
- [ ] No secrets, keys, or `.env` files committed

## 📚 References

- [Clean Linear History & Rebase Examples](references/CLEAN_HISTORY.md)
