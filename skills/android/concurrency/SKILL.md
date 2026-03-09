---
name: Android Concurrency
description: Standards for Coroutines, Flow, and Threading
metadata:
  labels: [android, concurrency, coroutines, flow]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.kt']
    keywords: ['suspend', 'viewModelScope', 'lifecycleScope', 'Flow']
workflow_ref: ui-ux-pro-max
---

# Android Concurrency Standards

## **Priority: P0**

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

## Implementation Guidelines

### Structured Concurrency

- **Scopes**: Always use `viewModelScope` (VM) or `lifecycleScope` (Activity/Fragment).
- **Dispatchers**: INJECT Dispatchers (`DispatcherProvider`) for testability. Do not hardcode `Dispatchers.IO`.

### Flow usage

- **Cold Streams**: Use `Flow` for data streams.
- **Hot Streams**: Use `StateFlow` (State) or `SharedFlow` (Events).
- **Collection**: Use `collectAsStateWithLifecycle()` (Compose) or `repeatOnLifecycle` (Views).

## Anti-Patterns

- **GlobalScope**: `**No GlobalScope**: Use structured scopes.`
- **Async/Await**: `**Avoid Async**: Prefer simple suspend functions unless parallel execution is needed.`

## References

- [Dispatcher Pattern](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
