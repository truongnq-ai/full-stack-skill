---
description: Enforce meaningful, structured Git commit messages. Prevents vague, empty, or misleading commits that destroy project history readability.
globs: ["**/*"]
alwaysApply: true
---

# 📝 Commit Message Rule

**Priority**: LOW-MEDIUM — applies whenever agent prepares or executes a `git commit`.
**Conflict resolution**: Subordinate to all higher-priority rules. Apply after code changes are finalized.
**Risk addressed**: Agent commits with messages like "fix", "update", "wip", or empty strings — destroying project history and making audit/rollback impossible.

---

## Core Rules

**No vague messages**: NEVER use single-word or meaningless commit messages. Forbidden: `"fix"`, `"update"`, `"changes"`, `"wip"`, `"temp"`, `"test"`, `"asdf"`, or empty strings.

**Use Conventional Commits format**: Every commit MUST follow this format:
```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

**Allowed types**:
| Type | Use when |
|------|----------|
| `feat` | New feature added |
| `fix` | Bug fixed |
| `refactor` | Code restructured, no behavior change |
| `chore` | Maintenance, tooling, deps |
| `docs` | Documentation only |
| `test` | Tests added or changed |
| `perf` | Performance improvement |
| `style` | Formatting, no logic change |
| `ci` | CI/CD configuration |

**No false types**: Do NOT use `feat` for a bug fix, or `fix` for a new feature. Match accurately.

**Scope is optional but recommended**: Use file/module name when helpful: `feat(auth): add JWT refresh logic`.

**Description rules**:
- Use imperative mood: "add", "fix", "update" — NOT "added", "fixed", "updating"
- Max 72 characters for the first line
- Do not end with a period

---

## Examples

```
✅ feat(auth): add JWT refresh token rotation
✅ fix(payments): handle null response from Stripe webhook
✅ chore(deps): upgrade pnpm to 9.x
✅ refactor(users): extract UserService from UsersController

❌ fix
❌ updated stuff
❌ WIP - don't merge
❌ feat: did some things
```

---

## Scope Exceptions

Rule does NOT apply when: (1) user explicitly provides their own commit message format, (2) the commit is an automated revert (`git revert` — keep auto-generated message), (3) merge commits (keep default merge message).

---

## Enforceability

Before running `git commit`, agent must confirm:
- [ ] Message follows `type(scope): description` format
- [ ] Type is from the approved list
- [ ] Description is in imperative mood and ≤72 characters
- [ ] No forbidden vague terms used

**Pass**: Commit message can be parsed as `type(scope): description`.
**Fail**: Single-word or undescriptive message → rewrite before committing.
