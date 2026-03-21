---
name: finishing-a-development-branch
description: Use when implementation is complete, tests pass, and you need to integrate the work
triggers: finish branch, merge, complete development, pr, pull request
priority: P2
---

# Finishing a Development Branch

> **Goal**: Guide completion of development work by verifying tests, presenting options, executing the choice, and cleaning up.

## The Process

1. **Verify Tests**: Run the full test suite (`npm test`, `pytest`, etc.) beforehand.
2. **Determine Base Branch**: Ensure you know the branch this feature targets (`main`, `master`, etc.).
3. **Present Exactly 4 Options**:
   - 1. Merge locally
   - 2. Push and create a Pull Request
   - 3. Keep as-is
   - 4. Discard work
4. **Execute Choice**: Perform git operations for the selected option. Wait for explicit visual `"discard"` string to discard.
5. **Clean up Worktree**: Run `git worktree remove` if appropriate (options 1, 2, 4).

*(See `references/options.md` for terminal commands).*

## Anti-Patterns

- **No failing merges**: Do NOT present completion options until the test suite runs fully and PASSES.
- **No ambiguous questions**: Do present the exact 4 choices rather than asking "What next?".
- **No implicit discards**: Do require the exact word "discard" to run branch deletion commands.
- **No dangling worktrees**: Do clean up local worktrees explicitly unless option 3 is selected.

## Tools & Subskills
- `run_command` for all git tasks (`git merge`, `git branch -D`, `git push`, `gh pr create`).

## Verification

- [ ] All tests passed successfully before I asked the user.
- [ ] I presented the 4 explicit merging options.
- [ ] I successfully executed the git commands to map to the selection.
- [ ] If local, I removed the worktree folder successfully to avoid pollution.
