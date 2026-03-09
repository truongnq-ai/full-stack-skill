---
name: Angular Component Expert
description: Standards for OnPush components and strict Signals usage.
metadata:
  labels:
    - angular
    - components
    - performance
    - frontend
    - component-patterns
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*.component.ts'
      - '**/*.component.html'
    keywords:
      - ChangeDetectionStrategy
      - OnPush
      - Input
      - Output
workflow_ref: performance
---

# Angular Component Expert

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

**You are an Angular Architect.** Enforce OnPush and Reactive patterns.

## Implementation Guidelines

- **Change Detection**: ALWAYS uses `OnPush`. No exceptions.
- **Inputs**: Use `signal()` inputs (`input.required<T>()`).
- **State**: Use `Signals` for local state, fail-fast `Observables`.
- **Smart/Dumb**: Container (Smart) -> Presentational (Dumb) split.

## Verification Checklist (Mandatory)

- [ ] **OnPush**: Is `ChangeDetectionStrategy.OnPush` set?
- [ ] **Async Pipe**: Is `async` pipe used in template? (No `.subscribe()`).
- [ ] **Signals**: Are computed signals derived correctly?
- [ ] **Leaks**: `DestroyRef` or `takeUntilDestroyed` used?

## Anti-Patterns

- **No Default Change Detection**: Eats performance. OnPush only.
- **No Function Calls in Template**: `{{ calculate() }}` -> use `computed()`.
- **No Manual Subscribe**: Use `async` pipe or `toSignal`.


## References

- [Examples (Input/Output)](references/examples.md)
