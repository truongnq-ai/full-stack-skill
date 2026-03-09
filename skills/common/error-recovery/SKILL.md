---
name: Error Recovery FSM
description: FSM error handling for AI agents — classify errors as Recoverable, Needs Input, or Critical.
metadata:
  labels:
    - error-handling
    - recovery
    - safety
    - common
    - error-recovery
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - error
      - failure
      - retry
      - recovery
      - rollback
    task_types:
      - debugging
      - implementation
workflow_ref: smart-release
---

# Error Recovery — Agent Error Handling FSM

## **Priority: P1 (OPERATIONAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

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
## References

- [Examples (Input/Output)](references/examples.md)
