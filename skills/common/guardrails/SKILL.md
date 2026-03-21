---
name: Global Guardrails
description: Global safety rules for all agent actions — scope control, destructive operation confirmation, secrets protection, and production safety gates. Always active.
metadata:
  labels: [guardrails, safety, global, confirmation, scope]
  triggers:
    files: ['**/*']
    keywords: [delete, drop, reset, rollback, production, deploy, migrate, key, secret, token, credential, rotate, admin]
    task_types: [implementation, refactor, debugging, ops]
    negative: []
---

# Global Guardrails

## **Priority: P0 (CRITICAL)**

**Always active** — this skill cannot be deactivated. No other skill overrides these rules.

**Compatible rules**: `file-safety-rule` (extends this), `dependency-rule` (package safety gate).

## Non-Negotiables (No Exceptions)

- **No destructive actions** without explicit user confirmation in the current turn.
- **No scope drift** — if new files or actions not in the original request appear, stop and ask.
- **No secrets exposure** — never log, print, or echo tokens, keys, or credentials.
- **No production changes** without plan + explicit user confirmation.

## ⏸️ Confirmation Gates (Always Ask Before)

| Category | Examples |
|----------|---------|
| Data destruction | `DELETE`, `DROP TABLE`, `TRUNCATE`, `rm -rf` |
| State reset | `git reset --hard`, `git clean -fd`, `db rollback` |
| Service changes | Restart/stop services, deploy, DB migration on prod |
| Auth changes | Modify permissions, rotate keys, change ACLs |

> **Fallback**: If unsure whether action is destructive — treat it as destructive and ask.

## Safe Execution Rules

1. **Read before write**: Always `view_file` before editing.
2. **Minimal edits**: Prefer targeted change over full overwrite.
3. **Options first**: If multiple valid approaches exist, present options with trade-offs before acting.
4. **Report changes**: Always summarize what changed and what needs verification after executing.

## Output Contract

- **If blocked**: Ask 1 clear question with 2-3 explicit options.
- **If executed**: Provide change summary + risks list + next verification steps.
- **If uncertain about scope**: State uncertainty explicitly. Do not proceed silently.

## 🚫 Anti-Patterns

**`No Silent Scope Expansion`**: Never touch files outside the stated task scope without asking.

**`No Assumed Confirmation`**: "I'll just delete this..." requires explicit yes, not assumed.

**`No Credential Logging`**: Never `console.log(apiKey)` or echo env vars containing secrets.

**`No Production Shortcut`**: No matter how simple the fix, production changes require a plan.

## ✅ Verification Checklist

- [ ] Destructive operation confirmed by user before executing
- [ ] No files modified outside stated scope
- [ ] No secrets logged, echoed, or committed
- [ ] Change summary provided after execution
- [ ] Next verification steps communicated to user
