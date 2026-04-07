---
description: Dev systematically debugs production errors — traces from log to root cause, applies minimal fix, verifies resolution, and documents prevention.
---

# 🐛 Dev Bug Fix

> **Use this workflow when**: dev needs to fix a production error, unexpected behavior, or stack trace. Trigger: `/software-dev-fix-bug`.
>
> **Out of scope**: Does not fix performance — use `software-dev-optimize-performance`. Does not redesign architecture — use `software-dev-audit-codebase`.
>
> **Activates skills**: `skills/common/systematic-debugging/SKILL.md`, `skills/common/debugging/SKILL.md`

> [!IMPORTANT]
> **Iron Law (from `systematic-debugging` skill)**: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST. If 3+ fixes fail → STOP and escalate. Do not attempt Fix #4 without architectural discussion.

---

## Step 1 — Capture Error Context

```bash
tail -n 100 logs/app.log 2>/dev/null || journalctl -u <service> -n 100 --no-pager
git log --oneline -10
git diff HEAD~1..HEAD --stat
```

Collect from user: full stack trace (exact copy), environment (local/staging/prod), trigger (deploy? config change? random?).

> **Fallback**: If no logs, ask user to run with verbose: `DEBUG=* npm start` or add `console.error(e)`.

---

## Step 2 — Classify Error

| Class | Signals | Action |
|-------|---------|--------|
| Runtime Exception | Stack trace with file:line | Step 3 |
| Silent Data Bug | Wrong output, no error | Trace data flow |
| Integration Failure | 3rd-party timeout/4xx/5xx | Check env vars + API status |
| Config/Env Error | `undefined` at startup | Verify `.env` + config loading |
| Race Condition | Flaky failures | Check async/await, concurrent writes |

---

## Step 3 — Trace Root Cause

1. `view_file` first user-owned file in stack trace (skip `node_modules`)
2. Read failing line + surrounding 20 lines
3. Identify proximate cause (what broke) vs root cause (why)

```bash
grep -rn "<error_keyword>" src/ --include="*.ts" | head -20
```

> **Rule**: Do NOT touch code until root cause is confirmed. Premature fixes create secondary bugs.

---

## ⏸️ Checkpoint: Confirm Root Cause

```
"Root cause identified:
- File: [file:line]
- Cause: [one sentence]
- Why: [context]
- Proposed fix: [brief]

Proceed? (Y / N — investigate further)"
```

---

## Step 4 — Apply Fix

`view_file` the full function before modifying. Apply minimal change. Add inline comment: `// Fix: [what was wrong]`.

> **3-Fix Limit**: Track fix attempts. If this is the **3rd failed fix**, STOP immediately. Do NOT attempt Fix #4. Escalate:
> - Ask user: "I've tried 3 fixes and each revealed a new problem — this may be architectural. Should we step back?"
> - Switch to `software-dev-audit-codebase` if root cause appears systemic.

> **Fallback**: If fix introduces secondary failures, `git checkout HEAD -- <file>` and re-debug from Step 3.

---

## Step 5 — Verify Fix

```bash
pnpm test -- --testPathPattern=<module>
```

> **Fallback**: If no tests, create regression test reproducing the bug scenario. If no test framework, ask user to manually verify.

---

## Step 6 — Post-Fix Report

Save to `docs/debug/debug-[YYYY-MM-DD]-[slug].md`:

```
## Debug Report — [Date]
### Error: [summary]
### Root Cause: [file:line] — [explanation]
### Fix: [what changed]
### Verification: Tests ✅/❌ | Manual ✅/⏳
### Prevention: [suggestion to avoid recurrence]
```

---

## Done Criteria

- [ ] Root cause confirmed before fix applied (Iron Law respected)
- [ ] Fix is minimal — no scope creep
- [ ] Fix attempts tracked — escalated if 3+ failed
- [ ] Tests pass (or regression test created)
- [ ] `docs/debug/` report saved
