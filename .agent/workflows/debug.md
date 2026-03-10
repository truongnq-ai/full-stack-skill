---
description: Systematic production debugging workflow — traces errors from log to root cause, proposes fix, and verifies resolution.
---

# 🐛 Debug Workflow

> **Use this workflow when**: user reports a production error, sees unexpected behavior, gets a stack trace, or runs `/debug`. Trigger phrases: "fix this bug", "got an error", "something's broken", "why is this failing".
>
> **Out of scope**: Does not fix performance issues — use `performance` workflow. Does not redesign architecture — use `codebase-review`. Does not optimize DB queries — use `db-workflow`.

---

## Step 1 — Capture Error Context

Gather all available signals before touching any code:

```bash
# Recent application logs
tail -n 100 logs/app.log 2>/dev/null || journalctl -u <service> -n 100 --no-pager

# Recent git changes (what changed before the error appeared?)
git log --oneline -10
git diff HEAD~1..HEAD --stat
```

Ask user to provide:
- Full stack trace (copy-paste, not paraphrased)
- Environment: local / staging / production / which VPS
- When it started: after deploy? after config change? randomly?

> **Fallback**: If no logs accessible, ask user to run the failing operation with verbose mode: `DEBUG=* npm start` or add `console.error(e)` temporarily.

---

## Step 2 — Classify Error Type

| Error Class | Signals | First Action |
|-------------|---------|--------------|
| **Runtime Exception** | Stack trace with file:line | Go to Step 3 |
| **Silent Data Bug** | Wrong output, no error thrown | Check data flow → Step 4 |
| **Integration Failure** | 3rd-party API timeout/4xx/5xx | Check env vars + API status |
| **Config/Env Error** | `undefined`, `cannot read property of null` at startup | Verify `.env` + config loading order |
| **Race Condition** | Flaky — fails sometimes | Look for async without await, concurrent writes |
| **Memory/Resource** | OOM, process crash, high CPU | Profile → `performance` workflow |

---

## Step 3 — Trace Root Cause

Navigate the stack trace top-down:

1. `view_file` the **first user-owned file** in the stack trace (skip `node_modules`).
2. Find the exact failing line. Read surrounding 20 lines for context.
3. Identify the **proximate cause** (what broke) vs **root cause** (why it broke).

```bash
# Search for related code patterns
grep -rn "<error_keyword>" src/ --include="*.ts" | head -20

# Check if error is reproducible in isolation
# Ask user to run: npx ts-node scripts/reproduce-bug.ts (if applicable)
```

> **Rule**: Do NOT touch any code until root cause is confirmed. Premature fixes create secondary bugs.

---

## ⏸️ Checkpoint: Confirm Root Cause

```
"Root cause identified:
- File: [file:line]
- Cause: [one-sentence explanation]
- Why it happens: [context]

Proposed fix: [brief description]
Proceed? (Y / N — investigate further)"
```

---

## Step 4 — Apply Fix

Use `view_file` to re-read the full function before modifying.

- Apply the minimal change that fixes root cause — avoid refactoring scope creep.
- Add an inline comment: `// Fix: [one-line explanation of what was wrong]`.
- If fix touches error handling, apply `testing-rule` and `code-generation-rule`.

---

## Step 5 — Verify Fix

```bash
# Run targeted tests for the fixed module
pnpm test -- --testPathPattern=<module-name>

# If no tests exist, create a minimal regression test
# Reproduce the exact scenario that caused the bug → confirm it no longer fails
```

> **Fallback**: If no test framework available, ask user to manually trigger the failing scenario and confirm resolution.
> **Fallback**: If fix introduces secondary failures, revert with `git checkout HEAD -- <file>` and debug from Step 3.

---

## Step 6 — Post-Fix Report

```
## Debug Report — [Date]

### Error
[Original error message / stack trace summary]

### Root Cause
[File:line] — [Explanation]

### Fix Applied
[What changed and why]

### Verification
- Tests: ✅ Pass / ❌ Fail
- Manual check: ✅ Confirmed / ⏳ Pending

### Prevention
[Suggestion to prevent recurrence: add test, add validation, add monitoring]
```

Save to `docs/debug/debug-[YYYY-MM-DD]-[issue-slug].md` (create `docs/debug/` if missing) for audit trail and future reference.
