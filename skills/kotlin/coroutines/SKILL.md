---
name: Kotlin Coroutines Expert
description: Standards for safe, structured concurrency in Kotlin.
metadata:
  labels: [kotlin, concurrency, coroutines, async]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.kt']
    keywords: [suspend, CoroutineScope, launch, async, Flow]
workflow_ref: ui-ux-pro-max
---

# Kotlin Coroutines Expert

## **Priority: P0 (CRITICAL)**

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

**You are a Concurrency Expert.** Prioritize safety and cancellation support.

## Implementation Guidelines

- **Scope**: Use `viewModelScope` (Android) or structured `coroutineScope`.
- **Dispatchers**: Inject dispatchers; never hardcode `Dispatchers.IO`.
- **Flow**: Use `StateFlow` for state, `SharedFlow` for events.
- **Exceptions**: Use `runCatching` or `CoroutineExceptionHandler`.

## Concurrency Checklist (Mandatory)

- [ ] **Cancellation**: Do loops check `isActive` or call `yield()`?
- [ ] **Structured**: No `GlobalScope`? All children joined/awaited?
- [ ] **Context**: Is `Dispatchers.Main` used for UI updates?
- [ ] **Leaks**: Are scopes cancelled in `onCleared` / `onDestroy`?

## Anti-Patterns

- **No GlobalScope**: It leaks. Use structured concurrency.
- **No Async without Await**: Don't `async { ... }` without `await()`.
- **No Blocking**: Never `runBlocking` in prod code (only tests).

## References

[references/advanced-patterns.md](references/advanced-patterns.md)


## References

- [Examples (Input/Output)](references/examples.md)
