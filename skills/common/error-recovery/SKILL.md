---
name: Error Recovery FSM
description: FSM error handling for AI agents — classify errors as Recoverable, Needs Input, or Critical.
metadata:
  labels: [error-handling, recovery, safety]
  triggers:
    keywords: [error, failure, retry, recovery, rollback]
    task_types: [debugging, implementation]
workflow_ref: smart-release
---

# Error Recovery — Agent Error Handling FSM

## **Priority: P1 (OPERATIONAL)**

## Context

When an agent encounters an error mid-execution, it must classify the error and follow the correct recovery path. Never silently ignore errors or retry infinitely.

## Error Classification FSM

```
[Error Detected]
        ↓
[1. STOP — Do not continue to next step]
        ↓
[2. Classify Error]
        ↓
┌──────────────────┬──────────────────┬──────────────────┐
│ RECOVERABLE      │ NEEDS INPUT      │ CRITICAL         │
│ (self-fixable)   │ (user decision)  │ (full stop)      │
├──────────────────┼──────────────────┼──────────────────┤
│ Retry (≤2 times) │ Report to user:  │ STOP ALL         │
│ Light fix + retry│  - Error desc    │ Report to user:  │
│ Rollback last    │  - Options A/B/C │  - Error desc    │
│ step if needed   │  - Recommendation│  - Damage scope  │
│                  │                  │  - Rollback plan │
└────────┬─────────┴────────┬─────────┴────────┬─────────┘
         ↓                  ↓                   ↓
  [Retry success?]   [User decides]      [Wait for user]
  YES → Continue     → Execute           → Do nothing
  NO  → NEEDS INPUT
```

## Error Types

### ✅ RECOVERABLE (max 2 retries)

| Error                        | Fix                 | Retry Limit |
| ---------------------------- | ------------------- | ----------- |
| Lint/syntax error after edit | Fix specific error  | 2           |
| Build fail: missing import   | Add import, rebuild | 2           |
| Command timeout (<30s)       | Retry same command  | 1           |
| File not found (typo)        | Fix path, retry     | 1           |
| Test fail from recent change | Fix logic, re-test  | 2           |

### ⚠️ NEEDS INPUT (ask user)

- Build fail with unclear cause
- Test fails but logic seems correct
- Conflict between new and existing code
- Dependency version incompatibility
- Permission denied / access error

### 🔴 CRITICAL (full stop)

- File deleted/corrupted unintentionally
- Database error (schema mismatch, data loss)
- Deploy failure on production
- Secret/credential exposed
- Files modified outside approved scope

## Rules

1. **Max 2 retries** per error — then escalate
2. **Never catch and ignore** — all errors must be logged or reported
3. **Never change approach** mid-execution without user approval
4. **Check rollback before retry** — avoid duplicates (double insert, double create)
5. **Never continue to next step** when current step failed


## References

- [Examples (Input/Output)](references/examples.md)
