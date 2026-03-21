---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace
triggers: new feature, isolate workspace, git worktree, new branch
priority: P2
---

# Using Git Worktrees

> **Goal**: Create isolated workspaces sharing the same repository with directory selection and safety verification.

## The Process

1. **Select Directory**: Use `.worktrees/` or `worktrees/` first. If neither exists, check `CLAUDE.md`. If none, ask the human.
2. **Safety Verification**: Run `git check-ignore` on `[.]worktrees`. If it's NOT ignored, append it to `.gitignore` and commit immediately.
3. **Create Worktree**: `git worktree add <dir>/<branch> -b <branch>`
4. **Project Setup**: Run `npm install`, `cargo build`, etc., if applicable.
5. **Test Baseline**: Run the project tests on the fresh state. If they fail, report and ask for permission before modifying files.

*(See `references/process.md` for detection scripts and details).*

## Anti-Patterns

- **No skipped ignores**: Do NOT create project-local worktrees without verifying the folder is explicitly ignored by `git`.
- **No skipped baseline tests**: Do run the full test suite when initialized; do not assume the branch works out-of-the-box.
- **No hardcoded installs**: Do auto-detect package managers (`package.json`, `Cargo.toml`, `requirements.txt`) rather than hardcoding them.
- **No ambiguous dir creation**: Do ask the user on first-run if `.worktrees/` does not already exist and isn't specified in `CLAUDE.md`.

## Tools & Subskills
- `run_command` with bash/git tools.
- `superpowers:finishing-a-development-branch` to resolve the branch when work is done.

## Verification

- [ ] I located or configured the worktrees directory in `.gitignore`.
- [ ] I created a dedicated branch in the worktree path.
- [ ] I installed appropriate dependencies dynamically.
- [ ] I ran the test suite on the pristine state and reported the baseline to the user.
