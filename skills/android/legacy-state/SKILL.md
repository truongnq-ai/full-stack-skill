---
name: Android Legacy State
description: Standards for State integration with Views using Coroutines and Lifecycle
metadata:
  labels:
    - android
    - state
    - views
    - lifecycle
    - legacy-state
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*Fragment.kt'
      - '**/*Activity.kt'
    keywords:
      - repeatOnLifecycle
      - launchWhenStarted
workflow_ref: ui-ux-pro-max
---

# Android Legacy State Standards

## **Priority: P1**

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

### Flow Consumption

- **Rule**: ALWAYS use `repeatOnLifecycle(Lifecycle.State.STARTED)` to collect flows in Views.
- **Why**: Prevents crashes (collecting while view is destroyed) and saves resources (stops collecting in background).

### LiveData vs Flow

- **New Code**: Use `StateFlow` exclusively.
- **Legacy**: If using LiveData, observe with `viewLifecycleOwner` (Fragment), NOT `this`.

## Anti-Patterns

- **launchWhenX**: `**Deprecated**: Use repeatOnLifecycle.`
- **observe(this)**: `**Leak Risk**: Use viewLifecycleOwner in Fragments.`

## References

- [Flow Consumption Template](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
